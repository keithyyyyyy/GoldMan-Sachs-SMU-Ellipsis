import React from "react";
import { Bubble } from "react-chartjs-2";

type props = {
    chartName: string
}

export default function BubbleChart({chartName}: props) {
    const labels = ["Loaner 1", "Loaner 2"];
    const data = {
        label: labels,
        datasets: [{
            labels: labels,
            data: [{
                x: 20, // loan amount
                y: 30, // credit rating
                r: 10 // size of dot
            }, {
                x: 40,
                y: 10,
                r: 10
            }],
            backgroundColor: 'rgb(255, 99, 132)'
        }]
    };

    const options: any = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: chartName,
                color: "black",
                font: {
                    size: 15
                }
            },
        }
    };
    return <Bubble data={data} options={options}></Bubble>
}