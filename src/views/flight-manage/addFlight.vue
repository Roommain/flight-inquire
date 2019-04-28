<template>
    <div class="add-flight">
        <Form ref="flightData" :model="flightData" :rules="ruleValidate" :label-width="80">
            <FormItem>
                <Row>
                    <Col span="3" style="text-align: right">航班号：</Col>
                    <Col span="9">
                        <FormItem prop="flightInformation">
                            <!-- <Input v-model="flightData.flightInformation" size="large" placeholder="请输入航班号 如：华夏航空G56552"></Input> -->
                            <Cascader :data="flightInformationData" v-model="flightData.flightInformation" size="large" :render-format="flightInformationFormat"></Cascader>
                        </FormItem>
                    </Col>
                    <Col span="3" style="text-align: right">飞行日期：</Col>
                    <Col span="9">
                        <FormItem prop="takeOffDate">
                            <DatePicker type="date" size="large" placeholder="请选择日期 如：2019-01-01" v-model="flightData.takeOffDate"></DatePicker>
                        </FormItem>
                    </Col>
                </Row>
            </FormItem>
            <FormItem>
                <Row>
                    <Col span="3" style="text-align: right">起飞时间：</Col>
                    <Col span="9">
                        <FormItem prop="takeOffTime">
                            <TimePicker type="time" size="large" format="HH:mm" placeholder="请选择时间" v-model="flightData.takeOffTime" style="width: 180px"></TimePicker>
                        </FormItem>
                    </Col>
                    <Col span="3" style="text-align: right">到达时间：</Col>
                    <Col span="9">
                        <FormItem prop="arrivalTime">
                            <TimePicker type="time" size="large" format="HH:mm" placeholder="请选择时间" v-model="flightData.arrivalTime" style="width: 180px"></TimePicker>
                        </FormItem>
                    </Col>
                </Row>
            </FormItem>
            <FormItem>
                <Row>
                    <Col span="3" style="text-align: right">起飞城市：</Col>
                    <Col span="9">
                        <FormItem prop="placeOfDeparture">
                            <!-- <Input v-model="flightData.placeOfDeparture" size="large" placeholder="请输入城市 如：重庆"></Input> -->
                            <City @city-change="cityChange" ref="city"/>
                        </FormItem>
                    </Col>
                    <Col span="3" style="text-align: right">到达城市：</Col>
                    <Col span="9">
                        <FormItem prop="placeOfDestination">
                            <!-- <Input v-model="flightData.placeOfDestination" size="large" placeholder="请输入城市 如：深圳"></Input> -->
                            <City @city-change="cityChange2" ref="city2"/>
                        </FormItem>
                    </Col>
                </Row>
            </FormItem>
            <FormItem>
                <Row>
                    <Col span="3" style="text-align: right">准点率：</Col>
                    <Col span="9">
                        <FormItem prop="onTimeRate">
                            <Input v-model="flightData.onTimeRate" size="large" placeholder="请输入航班准点率 如：98%"></Input>
                        </FormItem>
                    </Col>
                    <Col span="3" style="text-align: right">登机口：</Col>
                    <Col span="9">
                        <FormItem prop="departureGate">
                            <Input v-model="flightData.departureGate" size="large" placeholder="请输入登机口 如：06"></Input>
                        </FormItem>
                    </Col>
                </Row>
            </FormItem>
            <FormItem>
                <Row>
                    <Col span="3" style="text-align: right">值机柜台：</Col>
                    <Col span="9">
                        <FormItem prop="checkinCounters">
                            <Input v-model="flightData.checkinCounters" size="large" placeholder="请输入值机柜台 如：D"></Input>
                        </FormItem>
                    </Col>
                    <Col span="3" style="text-align: right">行李转盘：</Col>
                    <Col span="9">
                        <FormItem prop="baggageCarousel">
                            <Input v-model="flightData.baggageCarousel" size="large" placeholder="请输入行李转盘 如：01"></Input>
                        </FormItem>
                    </Col>
                </Row>
            </FormItem>
            <FormItem>
                <Row>
                    <Col span="3" style="text-align: right">机型：</Col>
                    <Col span="9">
                        <FormItem prop="aircraftType">
                            <!-- <Input v-model="flightData.aircraftType" size="large" placeholder="请输入机型 如：BOEING787-8"></Input> -->
                            <Cascader :data="aircraftTypeData" v-model="flightData.aircraftType" size="large" :render-format="aircraftTypeFormat"></Cascader>
                        </FormItem>
                    </Col>
                    <Col span="3" style="text-align: right">机龄：</Col>
                    <Col span="9">
                        <FormItem prop="aircraftAge">
                            <Input v-model="flightData.aircraftAge" size="large" placeholder="请输入城市 如：08"></Input>
                        </FormItem>
                    </Col>
                </Row>
            </FormItem>
            <FormItem>
                <Row>
                    <Col span="3" style="text-align: right">全程：</Col>
                    <Col span="9">
                        <FormItem prop="wholeJourney">
                            <Input v-model="flightData.wholeJourney" size="large" placeholder="请输入城市 如：117公里"></Input>
                        </FormItem>
                    </Col>
                    <Col span="3" style="text-align: right">时长：</Col>
                    <Col span="9">
                        <FormItem prop="duration">
                            <Input v-model="flightData.duration" size="large" placeholder="请输入城市 如：80分钟"></Input>
                        </FormItem>
                    </Col>
                </Row>
            </FormItem>
            <FormItem>
                <Row>
                    <Col span="12" style="text-align: center">
                        <Button type="primary" @click="handleSubmit('flightData')" style="width: 200px;height: 40px;">提交</Button>
                    </Col>
                    <Col span="12" style="text-align: center">
                        <Button type="warning" @click="handleReset('flightData')" style="width: 200px;height: 40px;">重置</Button>
                    </Col>
                </Row>
                
            </FormItem>
        </Form>    
    </div>
</template>


<script>
import City from '@/components/city';
    export default {
        components: {
            City,
        },
        data () {
            return {
                flightData: {
                    flightInformation:[],//航班号
                    takeOffDate:'',//起飞日期
                    takeOffTime:'',//起飞时间
                    arrivalTime:'',//到达时间
                    placeOfDeparture:'', //出发城市
                    placeOfDestination:'',//到达城市
                    onTimeRate:'',//准点率
                    departureGate:'',//登机口
                    checkinCounters:'',//值机柜台
                    baggageCarousel:'',//行李转盘
                    aircraftType:[],//机型
                    aircraftAge:'',//机龄
                    wholeJourney:'',//全程
                    duration:'',//时长
                },
                aircraftTypeData:[
                    {
                        value: '波音系列',
                        label: '波音系列',
                        children: [
                            {
                            value: '波音202',
                            label: '波音202',
                            code: 202
                            },
                            {
                            value: '波音211',
                            label: '波音221',
                            code: 221
                            },
                            {
                            value: '波音334',
                            label: '波音334',
                            code: 334
                            },
                            {
                            value: '波音707',
                            label: '波音707',
                            code: 707
                            },
                            {
                            value: '波音717',
                            label: '波音717',
                            code: 717
                            },
                            {
                            value: '波音787',
                            label: '波音787',
                            code: 787
                            },
                        ]
                    },
                    {
                        value: 'A310系列',
                        label: 'A310系列',
                        children: [
                            {
                            value: 'A310B',
                            label: 'A310B',
                            code: 200,
                            },
                            {
                            value: 'A310C',
                            label: 'A310C',
                            code: 300,
                            },
                            {
                            value: 'A310V',
                            label: 'A310V',
                            code: 400,
                            },
                        ]
                    },
                    {
                        value: 'EMBRAERERJ系列',
                        label: 'EMBRAERERJ系列',
                        children: [
                            {
                            value: 'EMBRAERERJZ',
                            label: 'EMBRAERERJZ',
                            code: 190,
                            },
                            {
                            value: 'EMBRAERERJX',
                            label: 'EMBRAERERJX',
                            code: 300,
                            },
                        ]
                    },
                    {
                        value: 'MIX系列',
                        label: 'MIX系列',
                        children: [
                            {
                            value: 'MIXB',
                            label: 'MIXB',
                            code: 200,
                            },
                            {
                            value: 'MIXC',
                            label: 'MIXC',
                            code: 402,
                            },
                        ]
                    },
                    {
                        value: 'A340系列',
                        label: 'A340系列',
                        children: [
                            {
                            value: 'A340B',
                            label: 'A340B',
                            code: 200,
                            },
                            {
                            value: 'A340C',
                            label: 'A340C',
                            code: 300,
                            },
                        ]
                    },
                ],
                flightInformationData:[
                    {
                        value: '中国国际航空',
                        label: '中国国际航空',
                        children: [
                            {
                            value: '中国国际航空CA1432',
                            label: '中国国际航空CA1432',
                            },
                            {
                            value: '中国国际航空CA1835',
                            label: '中国国际航空CA1835',
                            },
                            {
                            value: '中国国际航空CA2121',
                            label: '中国国际航空CA2121',
                            },
                            {
                            value: '中国国际航空CA4536',
                            label: '中国国际航空CA4536',
                            },
                        ]
                    },
                    {
                        value: '中国南方航空',
                        label: '中国南方航空',
                        children: [
                            {
                            value: '中国南方航空CZ2334',
                            label: '中国南方航空CZ2334',
                            },
                            {
                            value: '中国南方航空CZ8424',
                            label: '中国南方航空CZ8424',
                            },
                            {
                            value: '中国南方航空CZ8232',
                            label: '中国南方航空CZ8232',
                            },
                            {
                            value: '中国南方航空CZ3438',
                            label: '中国南方航空CZ3438',
                            },
                        ]
                    },
                    {
                        value: '海南航空',
                        label: '海南航空',
                        children: [
                            {
                            value: '海南航空HU2331',
                            label: '海南航空HU2331',
                            },
                            {
                            value: '海南航空HU7675',
                            label: '海南航空HU7675',
                            },
                            {
                            value: '海南航空HU5782',
                            label: '海南航空HU5782',
                            },
                        ]
                    },
                    {
                        value: '深圳航空',
                        label: '深圳航空',
                        children: [
                            {
                            value: '深圳航空SZ3231',
                            label: '深圳航空SZ3231',
                            },
                            {
                            value: '深圳航空SZ6754',
                            label: '深圳航空SZ6754',
                            },
                            {
                            value: '深圳航空SZ9763',
                            label: '深圳航空SZ9763',
                            },
                        ]
                    },
                    {
                        value: '四川航空',
                        label: '四川航空',
                        children: [
                            {
                            value: '四川航空3U3421',
                            label: '四川航空3U3421',
                            },
                            {
                            value: '四川航空3U6456',
                            label: '四川航空3U6456',
                            },
                            {
                            value: '四川航空3U9178',
                            label: '四川航空3U9178',
                            },
                        ]
                    },
                    {
                        value: '厦门航空',
                        label: '厦门航空',
                        children: [
                            {
                            value: '厦门航空MF3424',
                            label: '厦门航空MF3424',
                            },
                            {
                            value: '厦门航空MF8535',
                            label: '厦门航空MF8535',
                            },
                            {
                            value: '厦门航空MF2323',
                            label: '厦门航空MF2323',
                            },
                        ]
                    },
                    {
                        value: '重庆航空',
                        label: '重庆航空',
                        children: [
                            {
                            value: '重庆航空OQ3242',
                            label: '重庆航空OQ3242',
                            },
                            {
                            value: '重庆航空OQ8892',
                            label: '重庆航空OQ8892',
                            },
                            {
                            value: '重庆航空OQ6392',
                            label: '重庆航空OQ6392',
                            },
                        ]
                    },
                ],
                ruleValidate: {
                    flightInformation: [
                        { required: true, type: 'array', message: '请选择航班号', trigger: 'change' },
                    ],
                    takeOffDate: [
                        { required: true, type: 'date', message: '请选择航班日期', trigger: 'change' },
                    ],
                    takeOffTime: [
                        { required: true, message: '请选择起飞时间', trigger: 'change' }
                    ],
                    arrivalTime: [
                        { required: true, message: '请选择到达时间', trigger: 'change' }
                    ],
                    placeOfDeparture: [
                        { required: true, message: '请输入城市', trigger: 'change' },
                    ],
                    placeOfDestination: [
                        { required: true, message: '请输入城市', trigger: 'change' }
                    ],
                    onTimeRate: [
                        { required: true, message: '请输入准点率', trigger: 'change' }
                    ],
                    departureGate: [
                        { required: true, message: '请输入登机口', trigger: 'change' },
                    ],
                    checkinCounters: [
                        { required: true, message: '请输入值机柜台', trigger: 'change' }
                    ],
                    baggageCarousel: [
                        { required: true, message: '请输入行李转盘', trigger: 'change' }
                    ],
                    aircraftType: [
                        { required: true, type: 'array', message: '请选择航班机型', trigger: 'change' },
                    ],
                    aircraftAge: [
                        { required: true, message: '请输入机龄', trigger: 'change' }
                    ],
                    wholeJourney: [
                        { required: true, message: '请输入航班全程', trigger: 'change' }
                    ],
                    duration: [
                        { required: true, message: '请输入航班时长', trigger: 'change' },
                    ],
                }
            }
        },
        created() {
            // this.getCityInfo();
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        const params = {
                            flightInformation: this.flightData.flightInformation[1] || '',
                            takeOffDate: this.flightData.takeOffDate,
                            takeOffTime: this.flightData.takeOffTime + ':00',
                            arrivalTime: this.flightData.arrivalTime + ':00',
                            placeOfDeparture: this.flightData.placeOfDeparture,
                            placeOfDestination: this.flightData.placeOfDestination,
                            onTimeRate: this.flightData.onTimeRate,
                            departureGate: this.flightData.departureGate,
                            checkinCounters: this.flightData.checkinCounters,
                            baggageCarousel: this.flightData.baggageCarousel,
                            aircraftType: this.flightData.aircraftType[1] || '',
                            aircraftAge: this.flightData.aircraftAge,
                            wholeJourney: this.flightData.wholeJourney,
                            duration: this.flightData.duration,
                        };
                        console.log(params);
                        this.$axios.post('api/flight/insertFlightInfo',params)
                            .then(data => {
                                if(data.data.code == 200) {
                                    this.$Message.success(data.data.msg);
                                }
                                else {
                                    this.$Message.error(data.data.msg);
                                }
                            }).catch(() => {
                                this.$Message.error('录入失败');
                                return;
                            });
                    } else {
                        this.$Message.error('请录入完成再提交!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
                this.$refs.city.childMethod(this.flightData.placeOfDeparture); 
                this.$refs.city2.childMethod(this.flightData.placeOfDestination); 
            },
            aircraftTypeFormat (labels, selectedData) {
                const index = labels.length - 1;
                const data = selectedData[index] || false;
                if (data && data.code) {
                    return labels[index] + ' - ' + data.code
                }
                return labels[index]
            },
            flightInformationFormat (labels, selectedData) {
                const index = labels.length - 1;
                const data = selectedData[index] || false;
                return labels[index]
            },
            cityChange (val) {
                this.flightData.placeOfDeparture = val;
            },
            cityChange2 (val) {
                this.flightData.placeOfDestination = val;
            },
        }
    }
</script>


<style lang="less" scoped>
.add-flight {
    width: 80%;
    // height: 40px;
    margin: 20px 0;
    // text-align: center;
}
</style>
