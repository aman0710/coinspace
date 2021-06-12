import React, { useEffect, useRef, useState } from 'react'
import Chartjs from 'chart.js'
import { historyOptions } from '../chartConfigs/chartConfigs'


const HistoryChart = ({ data }) => {

    const chartRef = useRef()
    const { day, week, month, semiyear, year, detail } = data
    const [timeFormat, setTimeFormat] = useState("24h")

    const determineTimeFormat = () => {
        switch (timeFormat) {
            case "24h":
                return day
            case "7d":
                return week
            case "30d":
                return month
            case "180d":
                return semiyear
            case "1y":
                return year
            default:
                return day
        }
    }

    useEffect(() => {
        if (chartRef && chartRef.current && detail) {

            const chartInstance = new Chartjs(chartRef.current,
                {
                    type: 'line',
                    data: {
                        datasets: [{
                            label: `${detail.name} Price`,
                            data: determineTimeFormat(),
                            backgroundColor: 'rgba(174, 305, 194, 0.5)',
                            borderColor: "rgba(135, 211, 124, 1)",
                            pointRadius: 0,
                            borderWidth: 2,
                            fill: true,
                        }]
                    },
                    options: { ...historyOptions }
                }
            )
            
            console.log(chartInstance)

        }
    },)



    const renderPrice = () => {
        if (detail) {
            return (
                <>
                    <p className="my-0">₹{detail.current_price.toLocaleString()}</p>
                    <p className={
                        detail.price_change_24h < 0 ?
                            "text-danger my-0"
                            : "text-success my-0"
                    }>
                        {detail.price_change_percentage_24h.toFixed(2)}%
                    </p>
                </>
            )
        }
    }



    return (
        <div className="bg-white border mt-2 rounded p-3">
            <div>
                {renderPrice()}
            </div>
            <div>
                <canvas ref={chartRef} id="myChart" width={250} height={250}></canvas>
            </div>
            <div className="chart-button mt-1">
                <button onClick={() => setTimeFormat("24h")} className="btn btn-outline-secondary btn-sm">1 day</button>
                <button onClick={() => setTimeFormat("7d")} className="btn btn-outline-secondary btn-sm mx-1">1 week</button>
                <button onClick={() => setTimeFormat("30d")} className="btn btn-outline-secondary btn-sm ">1 month</button>
                <button onClick={() => setTimeFormat("180d")} className="btn btn-outline-secondary btn-sm mx-1">6 months</button>
                <button onClick={() => setTimeFormat("1y")} className="btn btn-outline-secondary btn-sm">1 year</button>
            </div>
        </div>
    )
}

export default HistoryChart
