import styles from './ChartToggle.module.css'
import ToolTip from '../common/ToolTip'
import React from 'react'

const ChartToggle = ({setChartType}) => {
    return (
        <div className={styles.container}>
            <h2 className={styles.toggleTitle}>
                Chart Type
                <ToolTip tip="The primary prompt for your poll. Be clear and concise to ensure participants understand what you're asking." />
            </h2>
            <div className={styles.buttonContainer}>
                <button className={styles.button} onClick={() => setChartType('bar')}>
                    Bar
                </button>
                <button className={styles.button} onClick={() => setChartType('pie')}>
                    Pie
                </button>
                <button className={styles.button} onClick={() => setChartType('doughnut')}>
                    Doughnut
                </button>
                <button className={styles.button} onClick={() => setChartType('list')}>
                    List
                </button>
            </div>
        </div>
    )
}

export default ChartToggle
