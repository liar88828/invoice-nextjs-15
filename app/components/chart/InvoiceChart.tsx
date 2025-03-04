'use client'
import React from 'react';
import { Line } from "react-chartjs-2";
import { ResponseChartType } from "@/interface/chart";
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale);

export function InvoiceChart({ item }: { item: ResponseChartType[] }) {

    return (
        <div className="rounded-2xl bg-base-200   p-5 ">
            <h2 className="card-title">Invoice</h2>
            {/*<div className="w-full max-w-[500px] h-[400px]">*/}
                <Line
                    data={ {
                        labels: item.map(i => i.title), // Display weeks
                        datasets: [
                            {
                                data: item.map(i => i.count),
                                label: 'Total Invoice per Week',
                                borderColor: '#42A5F5',
                                backgroundColor: 'rgba(66, 165, 245, 0.2)',
                                fill: true,
                            }
                        ]
                    }
                    }
                    options={ {
                        // maintainAspectRatio: false,
                        responsive: true,
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    } }
                />
            {/*</div>*/}

        </div>
    );
}

