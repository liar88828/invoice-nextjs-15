'use client'
import React from 'react';
import { Pie } from "react-chartjs-2";
import { ResponseChartType } from "@/interface/chart";
import { ArcElement, CategoryScale, Chart as ChartJS, Legend, Title, Tooltip } from 'chart.js';

const chartColors = [
    "#336699",
    "#99CCFF",
    "#999933",
    "#666699",
    "#CC9933",
    "#006666",
    "#3399FF",
    "#993300",
    "#CCCC99",
    "#666666",
    "#FFCC66",
    "#6699CC",
    "#663366",
    "#9999CC",
    "#CCCCCC",
    "#669999",
    "#CCCC66",
    "#CC6600",
    "#9999FF",
    "#0066CC",
    "#99CCCC",
    "#999999",
    "#FFCC00",
    "#009999",
    "#99CC33",
    "#FF9900",
    "#999966",
    "#66CCCC",
    "#339966",
    "#CCCC33",
    "#003f5c",
    "#665191",
    "#a05195",
    "#d45087",
    "#2f4b7c",
    "#f95d6a",
    "#ff7c43",
    "#ffa600",
    "#EF6F6C",
    "#465775",
    "#56E39F",
    "#59C9A5",
    "#5B6C5D",
    "#0A2342",
    "#2CA58D",
    "#84BC9C",
    "#CBA328",
    "#F46197",
    "#DBCFB0",
    "#545775"
];

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

export function ProductChart({ item }: { item: ResponseChartType[] }) {

    return (
        <div className=" bg-base-200   rounded-4xl p-5">
            <h2 className="card-title">Product</h2>
            <div className=" h-[300px]">
                <Pie
                    data={ {
                        labels: item.map(i => i.title),
                        datasets: [
                            {
                                label: 'Product Quantity',
                                backgroundColor: chartColors,
                                data: item.map(i => i.count),
                            }
                        ]
                    } }
                    options={ {
                        responsive: true,
                        maintainAspectRatio: false,
                    } }
                />
            </div>
        </div>
    );
}

