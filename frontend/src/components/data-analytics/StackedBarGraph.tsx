import React from "react";
import dynamic from 'next/dynamic'
import useWindowSize from './window-size';


const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

function StackedBarChart() {
    const { width } = useWindowSize();
    const containerWidth = width > 1178 ? 800 : width > 893 ? width - 350 : width - 80;
    if (typeof window !== 'undefined') {
        return (
            <React.Fragment>
                <div className="container-fluid mb-3">
                    <Chart
                        type="bar"
                        width={containerWidth}
                        height={300}
                        series={[
                            {
                                name: "men",
                                data: [345, 578, 898, 532, 465, 578, 898, 532, 465],
                                color: '#7392c1'
                            },
                            {
                                name: "women",
                                data: [190, 321, 112, 537, 333, 321, 112, 537, 333],
                                color: '#d47cbc'
                            },
                            {
                                name: "other",
                                data: [560, 121, 675, 907, 233, 121, 675, 907, 233],
                                color: '#c4c5c6'
                            }


                        ]}

                        options={{
                            title: {
                                text: ""
                            },
                            chart: {
                                stacked: true,
                                toolbar: {
                                    show: true,
                                    tools: {
                                        download: false
                                    }
                                }
                            },
                            plotOptions: {
                                bar: {
                                    horizontal: true,
                                    columnWidth: '100%',
                                }
                            },
                            stroke: {
                                width: 1,
                            },
                            xaxis: {
                                title: {
                                    text: ""
                                },
                                categories: ['my relationships', 'addiction', 'suicidal thoughts', 'family distress', 'substance abuse', 'academic distress', 'social anxiety', 'depression', 'other'],
                                axisBorder: {
                                    show: true,
                                    offsetX: -1,
                                    color: '#000000',
                                }
                            },
                            yaxis: {
                                title: {
                                    text: ""
                                },
                                axisBorder: {
                                    show: true,
                                    offsetY: 0,
                                    color: '#000000',
                                }
                            },
                            legend: {
                                position: 'bottom'
                            },
                            dataLabels: {
                                enabled: false,
                            },
                            grid: {
                                show: true,
                                xaxis: {
                                    lines: {
                                        show: true
                                    }
                                },
                                yaxis: {
                                    lines: {
                                        show: false
                                    }
                                }

                            },
                        }}

                    />
                </div>
            </React.Fragment>
        );
    }
    return (<div></div>)
}

export default StackedBarChart;