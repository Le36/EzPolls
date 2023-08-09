import React from 'react'
import ChartToggle from './ChartToggle'
import AnimatedChart from './AnimatedChart'
import styles from './ResultsList.module.css'
import ToolTip from '../common/ToolTip'

const ResultsList = ({options}) => {
    const [chartType, setChartType] = React.useState('bar')

    return (
        <div>
            <ChartToggle chartType={chartType} setChartType={setChartType} />
            <div className={styles.container}>
                <h2 className={styles.resultsTitle}>
                    Results
                    <ToolTip tip="The primary prompt for your poll. Be clear and concise to ensure participants understand what you're asking." />
                </h2>
                <AnimatedChart optionsPoll={options} chartType={chartType} />
            </div>
        </div>
    )
}

export default ResultsList
