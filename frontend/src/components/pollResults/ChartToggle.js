const ChartToggle = ({setChartType}) => {
    return (
        <div>
            <button onClick={() => setChartType('bar')}>Bar Chart</button>
            <button onClick={() => setChartType('pie')}>Pie Chart</button>
            <button onClick={() => setChartType('doughnut')}>Doughnut Chart</button>
        </div>
    )
}

export default ChartToggle
