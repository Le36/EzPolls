import {Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement} from 'chart.js'
import {Pie, Bar, Doughnut} from 'react-chartjs-2'

const AnimatedChart = ({optionsPoll, chartType}) => {
    ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement)

    const sortedOptions = optionsPoll.sort((a, b) => b.voteCount - a.voteCount)
    const labels = sortedOptions.map((option) => option.optionText)
    const dataPoints = sortedOptions.map((option) => option.voteCount)

    const stringToColor = (str) => {
        let hash = 0
        for (let i = 0; i < str.length; i++) {
            hash = (str.charCodeAt(i) * 139241) ^ (hash * 17)
        }

        const hue = Math.abs(hash) % 360
        const saturation = (hash % 25) + 70
        const lightness = ((hash * 3) % 10) + 45

        return `hsl(${hue}, ${saturation}%, ${lightness}%)`
    }

    const data = {
        labels: labels,
        datasets: [
            {
                data: dataPoints,
                backgroundColor: sortedOptions.map((option) => stringToColor(option.optionText)),
            },
        ],
    }

    const options = {
        indexAxis: 'y',
        scales: {
            x: {
                type: 'linear',
                title: {
                    display: true,
                    text: 'Votes',
                },
                ticks: {
                    stepSize: 1,
                    precision: 0,
                },
            },
            y: {
                type: 'category',
                title: {
                    display: true,
                    text: 'Options',
                },
            },
        },
        animation: {
            duration: 1000,
            easing: 'easeInOutQuart',
        },
    }

    if (chartType === 'pie') {
        return <Pie data={data} />
    }

    if (chartType === 'bar') {
        return <Bar data={data} options={options} />
    }

    if (chartType === 'doughnut') {
        return <Doughnut data={data} />
    }

    return null
}

export default AnimatedChart
