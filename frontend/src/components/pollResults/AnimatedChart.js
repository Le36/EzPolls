import {ArcElement, BarElement, CategoryScale, Chart, Legend, LinearScale, Tooltip} from 'chart.js'
import {Bar, Doughnut, Pie} from 'react-chartjs-2'
import {useEffect, useState} from 'react'
import styles from './AnimatedChart.module.css'

const AnimatedChart = ({optionsPoll, chartType}) => {
    Chart.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement)

    const [fontSize, setFontSize] = useState(12)

    const adjustFontSize = () => {
        if (window.innerWidth <= 320) {
            setFontSize(6)
        } else if (window.innerWidth <= 480) {
            setFontSize(9)
        } else if (window.innerWidth <= 600) {
            setFontSize(11)
        } else if (window.innerWidth <= 768) {
            setFontSize(13)
        } else {
            setFontSize(15)
        }
    }

    useEffect(() => {
        adjustFontSize()
        window.addEventListener('resize', adjustFontSize)
        return () => {
            window.removeEventListener('resize', adjustFontSize)
        }
    }, [])

    const wrapText = (text, maxChar) => {
        let newText = ''
        while (text.length > maxChar) {
            let prevSpace = text.lastIndexOf(' ', maxChar)
            if (prevSpace === -1) prevSpace = maxChar
            newText += text.substring(0, prevSpace) + '\n'
            text = text.substring(prevSpace + 1)
        }
        newText += text
        return newText.split('\n')
    }

    const sortedOptions = optionsPoll.sort((a, b) => b.voteCount - a.voteCount)
    const labels = sortedOptions.map((option) => wrapText(option.optionText, 25))
    const dataPoints = sortedOptions.map((option) => option.voteCount)
    const anyOptionWrapped = labels.some((label) => label.length > 1)

    const stringToColor = (str, opacity = 1) => {
        let hash = 0
        for (let i = 0; i < str.length; i++) {
            hash = (str.charCodeAt(i) * 139241) ^ (hash * 17)
        }

        const hue = Math.abs(hash) % 360
        const saturation = (hash % 25) + 70
        const lightness = ((hash * 3) % 10) + 45

        return `hsl(${hue}, ${saturation}%, ${lightness}%, ${opacity})`
    }

    const colors = sortedOptions.map((option) => {
        return {
            background: stringToColor(option.optionText, 0.7),
            border: stringToColor(option.optionText),
        }
    })

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Votes',
                data: dataPoints,
                backgroundColor: colors.map((color) => color.background),
                borderColor: colors.map((color) => color.border),
                borderWidth: 3,
            },
        ],
    }

    const getTooltipTitle = (tooltipItem) => {
        const labelArray = labels[tooltipItem[0].dataIndex]
        if (Array.isArray(labelArray)) {
            return labelArray.join(' ')
        }
        return labelArray
    }

    const optionsBar = {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    title: function (tooltipItem) {
                        return getTooltipTitle(tooltipItem)
                    },
                },
            },
        },
        scales: {
            x: {
                type: 'linear',
                title: {
                    display: true,
                    text: 'Votes',
                    color: '#eaeaea',
                },
                grid: {
                    color: '#555',
                },
                ticks: {
                    color: '#eaeaea',
                    stepSize: 1,
                    precision: 0,
                },
            },
            y: {
                type: 'category',
                grid: {
                    color: '#555',
                },
                ticks: {
                    color: '#eaeaea',
                    font: {
                        size: fontSize,
                    },
                    autoSkip: false,
                },
            },
        },
        animation: {
            duration: 1000,
            easing: 'easeInOutQuart',
        },
    }

    const optionsCircle = {
        responsive: true,
        plugins: {
            legend: {
                display: !anyOptionWrapped,
                position: 'top',
                labels: {
                    color: '#eaeaea',
                    font: {
                        size: fontSize,
                    },
                },
            },
        },
        animation: {
            duration: 1000,
            animateRotate: true,
            animateScale: true,
        },
    }

    if (chartType === 'pie') {
        return (
            <div className={styles.chartContainer}>
                <Pie data={data} options={optionsCircle} />
            </div>
        )
    }

    if (chartType === 'bar') {
        const baseHeightPerLine = 50
        const additionalHeightForWrappedLine = 40

        const chartHeight = labels.reduce((acc, label) => {
            let heightForThisOption = baseHeightPerLine
            if (label.length > 1) {
                heightForThisOption += additionalHeightForWrappedLine * (label.length - 1)
            }
            return acc + heightForThisOption
        }, 0)

        return (
            <div style={{minHeight: `${chartHeight}px`}}>
                <Bar data={data} options={optionsBar} />
            </div>
        )
    }

    if (chartType === 'doughnut') {
        return (
            <div className={styles.chartContainer}>
                <Doughnut data={data} options={optionsCircle} />
            </div>
        )
    }

    if (chartType === 'list') {
        return (
            <ol className={styles.orderedList}>
                {sortedOptions.map((option, index) => (
                    <li
                        key={index}
                        style={{
                            padding: '8px',
                            borderBottom: index !== sortedOptions.length - 1 ? '1px solid #555' : 'none',
                        }}
                    >
                        {labels[index].join(' ')}: <strong>{option.voteCount}</strong> votes
                    </li>
                ))}
            </ol>
        )
    }

    return null
}

export default AnimatedChart
