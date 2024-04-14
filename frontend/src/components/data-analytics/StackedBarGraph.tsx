import React, { useState, useEffect } from "react";
import dynamic from 'next/dynamic'
import useWindowSize from './window-size';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

function StackedBarChart({ questionType, men, women, other }) {
    // can only rerender if the the prop change, so we need to add a prop to change/rerender the component
    const { width } = useWindowSize();
    const containerWidth = width > 900 ? width*2/3 : width*5/6;

    const [questions, setQuestions] = useState<string[]>([]);

    // we still need this to set the question
    useEffect(() => {
        // Update questions based on the global question type
        const updatedQuestions = (questionType === "When was the last time you spoke with a counselor?")
            ? ['Within the last month', 'Within the last 6 months', 'Within the last year', 'Over a year ago', 'I have never spoken with a counselor/therapist before.']
            : ['my relationships', 'addiction', 'suicidal thoughts', 'family distress', 'substance abuse', 'academic distress', 'social anxiety', 'depression', 'other'];

        // Set the updated questions array
        setQuestions(updatedQuestions);
    }, [questionType]);


    if (typeof window !== 'undefined') {
        return (
            <React.Fragment>
                <div>
                    <Chart
                        type="bar"
                        width={containerWidth}
                        height={300}
                        series={[
                            {
                                name: "men",
                                data: men,
                                color: '#7392c1'
                            },
                            {
                                name: "women",
                                data: women,
                                color: '#d47cbc'
                            },
                            {
                                name: "other",
                                data: other,
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
                            xaxis: {
                                title: {
                                    text: ""
                                },
                                categories: questions,
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