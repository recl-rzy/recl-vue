<template>
    
    <div class="statistics">
    <el-form :inline="true" class="demo-form-inline" style="margin-top: 20px; margin-left: 20px">

        <el-form-item label="查询日期">

            <el-date-picker

            v-model="searchQuery.currentDate"

            type="date"

            placeholder="选择开始时间"

            value-format="yyyy-MM-dd"

            />

        </el-form-item>

        <el-form-item>

            <el-select v-model="searchQuery.type" clearable placeholder="图形样式">

            <el-option :value="1" label="玫瑰饼状图"/>

            <el-option :value="2" label="折线柱状图"/>

            </el-select>

        </el-form-item>

        <el-button type="primary" icon="el-icon-search" @click="getChartData()">查询</el-button>
        <el-button type="default" @click="reset()">清空</el-button>


    </el-form>

    <div class="chart-container">
    
        <div id="chart" class="chart" style="height:630px; width:100%"/>
    
    </div>

    </div>

</template>

<script>
import echarts from 'echarts'
import statisticsApi from '@/api/edu/statistics.js'


export default {
    data() {
        return {
            searchQuery: {},
            chart: null,
            circleChartData: [],
            poleChartData: [],
            poleTitle: [] 
        }
    },
    mounted() {
        this.setCircleChart()
    },
    methods: {
        // 设置图标参数
        setCircleChart() {
            this.chart = echarts.init(document.getElementById('chart'))
            statisticsApi.getEduStatistics(this.searchQuery)
                .then(response => {
                    this.circleChartData = response.data.circleChartData
                        var option = {
                            tooltip: {
                                trigger: 'item'
                            },
                            title: {
                                text: '服务访问量',
                                left: 'center',
                                top: '20'
                            }, 
                            legend: {
                                orient: 'vertical',
                                left: '50'
                            },
                            label: {
                                show: false,
                                position: 'center',
                                emphasis: {
                                show: true
                                }
                            },
                            labelLine: {
                                show: false
                            },
                            emphasis: {
                                label: {
                                show: true,
                                fontSize: '20',
                                fontWeight: 'bold'
                                }
                            },
                            series: [
                                {
                                    type: 'pie',
                                    data: response.data.circleChartData,
                                    roseType: 'area'
                                }
                            ],
                            color: [
                                '#37A2DA',
                                // '#32C5E9',
                                // '#67E0E3',
                                'rgb(14, 199, 7)',
                                // '#9FE6B8',
                                '#FFDB5C',
                                '#ff9f7f',
                                // '#fb7293',
                                'rgb(179, 0, 0)',
                                '#E062AE',
                                // '#E690D1',
                                // '#e7bcf3',
                                // '#9d96f5',
                                '#8378EA',
                                '#96BFFF'
                            ],
                            radius: '90%'
                        };
                        this.chart.setOption(option)
                })
        },
        showCircleChart() {
            statisticsApi.getEduStatistics(this.searchQuery)
                .then(response => {
                    this.circleChartData = response.data.circleChartData
                })
            this.chart = echarts.init(document.getElementById('chart'))
            var option = {
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: '50'
                },
                label: {
                    show: false,
                    position: 'center',
                    emphasis: {
                    show: true
                    }
                },
                labelLine: {
                    show: false
                },
                emphasis: {
                    label: {
                    show: true,
                    fontSize: '20',
                    fontWeight: 'bold'
                    }
                },
                series: [
                    {
                        type: 'pie',
                        data: this.circleChartData,
                        roseType: 'area'
                    }
                ],
                color: [
                    '#37A2DA',
                    // '#32C5E9',
                    // '#67E0E3',
                    'rgb(14, 199, 7)',
                    // '#9FE6B8',
                    '#FFDB5C',
                    '#ff9f7f',
                    // '#fb7293',
                    'rgb(179, 0, 0)',
                    '#E062AE',
                    // '#E690D1',
                    // '#e7bcf3',
                    // '#9d96f5',
                    '#8378EA',
                    '#96BFFF'
                ],
                radius: '90%'
            };
            this.chart.setOption(option)
        },
        reset() {
            this.searchQuery = {}
            this.setCircleChart()
        },
        showPoleChart() {
            this.chart = echarts.init(document.getElementById('chart'))
            var option = {
                xAxis: {
                    type: 'category',
                    data: this.poleTitle
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        data: this.poleChartData,
                        type: 'bar',
                        showBackground: true,
                        backgroundStyle: {
                            color: 'rgba(180, 180, 180, 0.2)'
                        }
                    }
                ]
            };
            this.chart.setOption(option)
        },
        getChartData() {
           statisticsApi.getEduStatistics(this.searchQuery)
                .then(response => {
                    if(this.searchQuery.type == 1) {
                        this.circleChartData = response.data.circleChartData
                        this.showCircleChart()
                    } else {
                        this.poleChartData = response.data.poleChartData
                        this.poleTitle = response.data.poleTitle
                        this.showPoleChart()
                    }
                }) 
        }
    }
}
</script>

<style>

.class {
    color: rgb(14, 199, 7);
}

</style>