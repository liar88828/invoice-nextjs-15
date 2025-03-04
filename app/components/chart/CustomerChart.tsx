'use client'
import React from 'react';
import { Bar } from "react-chartjs-2";
import { ResponseChartType } from "@/interface/chart";
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);


export function CustomerChart({ item }: { item: ResponseChartType[] }) {
    return (
        <div className="rounded-4xl p-5 bg-base-200      ">
                <h2 className="card-title">Customer</h2>
                <div className="  h-[300px]">
                    <Bar
                        data={ {
                            labels: item.map(i => i.title),
                            datasets: [
                                {
                                    label: 'Users per City',
                                    backgroundColor: '#42A5F5',
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

