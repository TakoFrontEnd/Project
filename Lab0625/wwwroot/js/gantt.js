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

            let arr = [];

            // 將 Completed 標籤的資料過濾並推入 dataset
            arr.push({
                label: 1,
                data: data.filter(item => item.label == "Completed")
            });

            // 如果還有其他標籤，可以依照同樣的方法處理
            // 例如，如果有 "Ongoing" 標籤的資料
            arr.push({
                label: 2,
                data: data.filter(item => item.label == "Ongoing")
            });

            arr.push({
                label: 3,
                data: data.filter(item => item.label == "Paused")
            });

            console.log('test:', arr);

            const config = {
                type: 'bar',
                data: {
                    datasets: arr
                },
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
                            
                        },
                        y: {
                            stacked: true,
                            beginAtZero: true,
                        }
                    }
                }
            };

            console.log(config.data.datasets[0]);

            new Chart(ctx, config);
        };

        const fetchData = () => {
            axios.get('/api/Gantt')
                .then(response => {
                    console.log(response.data);
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