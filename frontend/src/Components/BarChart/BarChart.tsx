import React from 'react';
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
const axios = require('axios');
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

type props = {
    username: string,
    chartName: string
}

export default function BarChart({username, chartName}: props) {
    // const labels = Utils.months({ count: 7 });
    // const getDetails = async () => {
    //     try {
    //         const resp = await axios.post("http://localhost:3001/getUserDetails", {username: "keith"}, {headers: {"Access-Control-Allow-Origin": "*"}});
    //         console.log(resp.data)
    //     } catch (err){
    //         console.log(err);
    //     }
    // };
    // getDetails();
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
    const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
    const data = {
        labels: labels,
        datasets: [{
            labels,
            data: [65, 59, 80, 81, 56, 55, 40],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
            ],
            borderWidth: 1
        }]
    };
    return (
        <Bar options={options} data={data}/>
    )
}

