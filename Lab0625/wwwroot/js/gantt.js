const { createApp, ref, onMounted } = Vue;

createApp({
    setup() {
        const myChart = ref(null);
        const createChart = (data) => {
            const ctx = myChart.value.getContext('2d');

            const annotation2 = {
                type: 'line',
                xMin: '2024-06-01',
                xMax: '2024-07-20',
                borderColor: 'rgb(255, 99, 132)',
                borderWidth: 10,
                draggable: true,
            };

            const zoomOptions = {
                pan: {
                    enabled: true,
                    modifierKey: 'ctrl',
                },
                zoom: {
                    wheel: {
                        enabled: true,
                        speed: 0.1,
                    },
                    pinch: { enabled: true },
                    drag: { enabled: true },
                    mode: 'x',
                },
            };

            const config = {
                type: 'bar',
                data,
                options: {
                    parsing: {
                        xAxisKey: 'timeRange',
                        yAxisKey: 'device',
                    },
                    plugins: {
                        zoom: zoomOptions,
                        annotation: {
                            drawTime: 'afterDraw',
                            events: ['click'],
                            annotations: {
                                //annotation2,
                            }
                        },
                        tooltip: {
                            enabled: true,
                            padding: 10,
                            displayColors: true,
                            callbacks: {
                                label: (context) => {
                                    const startTime = new Date(context.dataset.data[context.dataIndex].start).toLocaleDateString();
                                    const endTime = new Date(context.dataset.data[context.dataIndex].end).toLocaleDateString();
                                    const status = context.dataset.label;
                                    const statusColor = context.dataset.backgroundColor;
                                    return [
                                        `Status: ${status}`,
                                        `StatusColor: ${statusColor}`,
                                        `StartEnd: ${startTime} ~ ${endTime}`
                                    ];
                                }
                            }
                        }
                    },
                    indexAxis: 'y',
                    scales: {
                        x: {
                            min: '2024-06-01',
                            position: 'bottom',
                            type: 'time',
                            stacked: false,
                            time: {
                                unit: 'day',
                                displayFormats: {
                                    hour: 'HH:mm',
                                    minute: 'HH:mm',
                                    second: 'HH:mm:ss',
                                }
                            },
                            ticks: {
                                autoSkip: true,
                                autoSkipPadding: 50,
                                maxRotation: 0,
                                major: { enabled: true },
                                align: 'start',
                            }
                        },
                        y: {
                            stacked: true,
                            beginAtZero: true,
                        }
                    }
                }
            };

            new Chart(ctx, config);
        };

        const fetchData = () => {
            axios.get('/api/Gantt')
                .then(response => {
                    console.log(response.data)
                    createChart(response.data);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        };

        onMounted(() => {
            fetchData();
        });

        return { myChart };
    }
}).mount('#app');