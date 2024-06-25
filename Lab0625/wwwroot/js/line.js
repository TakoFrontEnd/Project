const { createApp, ref, onMounted } = Vue;

createApp({
    setup() {
        const myChart = ref(null);
        const chartInstance = ref(null);
        const startDate = ref('');
        const endDate = ref('');

        const createChart = (data) => {
            const ctx = myChart.value.getContext('2d');
            const formattedData = data.map(item => ({
                x: new Date(item.date), 
                y: item.value
            }));

            const config = {
                type: "line",
                data: {
                    datasets: [{
                        label: 'Dataset 1',
                        data: formattedData,
                        borderColor: 'rgba(54, 162, 235, 1)',
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        fill: true,
                    }]
                },
                options: {
                    plugins: {
                        annotation: {
                            annotations: {
                                line1: {
                                    type: 'line',
                                    yMin: 10,
                                    yMax: 10,
                                    borderColor: 'green',
                                    borderWidth: 2,
                                },
                                line2: {
                                    type: 'line',
                                    yMin: 20,
                                    yMax: 20,
                                    borderColor: 'red',
                                    borderWidth: 2,
                                },
                                label1: {
                                    type: 'label',
                                    textAlign: 'center',
                                    yValue: 10,
                                    backgroundColor: 'rgba(245,245,245)',
                                    content: ['Min : 10'],
                                    font: {
                                        size: 18
                                    }
                                },
                                label2: {
                                    type: 'label',
                                    textAlign: 'center',
                                    yValue: 20,
                                    backgroundColor: 'rgba(245,245,245)',
                                    content: ['Max : 20'],
                                    font: {
                                        size: 18
                                    }
                                },
                            }
                        }
                    },
                    scales: {
                        x: {
                            type: 'timeseries',
                            time: {
                                unit: 'day'
                            }
                        },
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            };

            if (chartInstance.value) {
                chartInstance.value.destroy();
            }
            chartInstance.value = new Chart(ctx, config);
        };

        const fetchData = () => {
            axios.get('/api/example')
                .then(response => {
                    createChart(response.data);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        };

        const searchData = (event) => {
            event.preventDefault();
            axios.get('/api/example')
                .then(response => response.data)
                .then(data => {
                    console.log(data);
                    const filteredData = data.filter(item => {
                        const itemDate = new Date(item.date);
                        return (!startDate.value || itemDate >= new Date(startDate.value)) &&
                            (!endDate.value || itemDate <= new Date(endDate.value));
                    });
                    createChart(filteredData);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        };

        onMounted(() => {
            fetchData();
            
        });



        return { myChart, startDate, endDate, searchData };
    }
}).mount('#app');