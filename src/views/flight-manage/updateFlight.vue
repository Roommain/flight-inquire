<template>
    <div class="updateflight">
        <div class="search">
            <Input v-model="flightValue" prefix="ios-plane" size="large" placeholder="请输入航班号" style="width: auto" />
            <DatePicker type="date" v-model="datevalue" size="large" placeholder="请选择日期" style="width: 220px"></DatePicker>
            <Button type="primary" @click="search">航班号查询</Button>
        </div>
        <Table stripe :loading="loading" :columns="columns" :data="pageData" :height="tableHeight"></Table>
        <div class="page">
            <Page :total="pantectTotalSize" :current=page :page-size="size" @on-change="changePage" @on-page-size-change="changeSize" show-elevator show-sizer show-total/>
        </div>
        <Modal
            v-model="modal"
            title="航班信息修改"
            width=700
            :draggable="true"
            :footer-hide="true">
            <div>
                <Form ref="flightData" :model="flightData">
                    <FormItem>
                        <Row>
                            <Col span="3" style="text-align: right">航班号：</Col>
                            <Col span="8">
                                <FormItem prop="flightInformation">
                                    <Input v-model="flightData.flightInformation" size="large" placeholder="请输入航班号 如：华夏航空G56552"></Input>
                                    <!-- <Cascader :data="flightInformationData" v-model="flightData.flightInformation" size="large" :render-format="flightInformationFormat"></Cascader> -->
                                </FormItem>
                            </Col>
                            <Col span="3" style="text-align: right">飞行日期：</Col>
                            <Col span="8">
                                <FormItem prop="takeOffDate">
                                    <DatePicker type="date" size="large" placeholder="请选择日期 如：2018-01-01" v-model="flightData.takeOffDate"></DatePicker>
                                </FormItem>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem>
                        <Row>
                            <Col span="3" style="text-align: right">起飞时间：</Col>
                            <Col span="8">
                                <FormItem prop="takeOffTime">
                                    <TimePicker type="time" size="large" format="HH:mm" placeholder="请选择时间" v-model="flightData.takeOffTime" style="width: 180px"></TimePicker>
                                </FormItem>
                            </Col>
                            <Col span="3" style="text-align: right">到达时间：</Col>
                            <Col span="8">
                                <FormItem prop="arrivalTime">
                                    <TimePicker type="time" size="large" format="HH:mm" placeholder="请选择时间" v-model="flightData.arrivalTime" style="width: 180px"></TimePicker>
                                </FormItem>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem>
                        <Row>
                            <Col span="3" style="text-align: right">起飞城市：</Col>
                            <Col span="8">
                                <FormItem prop="placeOfDeparture">
                                    <Input v-model="flightData.placeOfDeparture" size="large" placeholder="请输入城市 如：重庆"></Input>
                                    <!-- <City @city-change="cityChange" ref="city"/> -->
                                </FormItem>
                            </Col>
                            <Col span="3" style="text-align: right">到达城市：</Col>
                            <Col span="8">
                                <FormItem prop="placeOfDestination">
                                    <Input v-model="flightData.placeOfDestination" size="large" placeholder="请输入城市 如：深圳"></Input>
                                    <!-- <City @city-change="cityChange2" ref="city2"/> -->
                                </FormItem>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem>
                        <Row>
                            <Col span="3" style="text-align: right">准点率：</Col>
                            <Col span="8">
                                <FormItem prop="onTimeRate">
                                    <Input v-model="flightData.onTimeRate" size="large" placeholder="请输入航班准点率 如：88%"></Input>
                                </FormItem>
                            </Col>
                            <Col span="3" style="text-align: right">登机口：</Col>
                            <Col span="8">
                                <FormItem prop="departureGate">
                                    <Input v-model="flightData.departureGate" size="large" placeholder="请输入登机口 如：06"></Input>
                                </FormItem>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem>
                        <Row>
                            <Col span="3" style="text-align: right">值机柜台：</Col>
                            <Col span="8">
                                <FormItem prop="checkinCounters">
                                    <Input v-model="flightData.checkinCounters" size="large" placeholder="请输入值机柜台 如：D"></Input>
                                </FormItem>
                            </Col>
                            <Col span="3" style="text-align: right">行李转盘：</Col>
                            <Col span="8">
                                <FormItem prop="baggageCarousel">
                                    <Input v-model="flightData.baggageCarousel" size="large" placeholder="请输入行李转盘 如：01"></Input>
                                </FormItem>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem>
                        <Row>
                            <Col span="3" style="text-align: right">机型：</Col>
                            <Col span="8">
                                <FormItem prop="aircraftType">
                                    <Input v-model="flightData.aircraftType" size="large" placeholder="请输入机型 如：BOEING787-8"></Input>
                                    <!-- <Cascader :data="aircraftTypeData" v-model="flightData.aircraftType" size="large" :render-format="aircraftTypeFormat"></Cascader> -->
                                </FormItem>
                            </Col>
                            <Col span="3" style="text-align: right">机龄：</Col>
                            <Col span="8">
                                <FormItem prop="aircraftAge">
                                    <Input v-model="flightData.aircraftAge" size="large" placeholder="请输入城市 如：08"></Input>
                                </FormItem>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem>
                        <Row>
                            <Col span="3" style="text-align: right">全程：</Col>
                            <Col span="8">
                                <FormItem prop="wholeJourney">
                                    <Input v-model="flightData.wholeJourney" size="large" placeholder="请输入城市 如：117公里"></Input>
                                </FormItem>
                            </Col>
                            <Col span="3" style="text-align: right">时长：</Col>
                            <Col span="8">
                                <FormItem prop="duration">
                                    <Input v-model="flightData.duration" size="large" placeholder="请输入城市 如：80分钟"></Input>
                                </FormItem>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem>
                        <Row>
                            <Col span="3" style="text-align: right">航班状态：</Col>
                            <Col span="8">
                                <FormItem prop="status">
                                    <Input v-model="flightData.status" size="large" placeholder="计划-0／起飞-1／到达-2／延误-3／取消-4"></Input>
                                </FormItem>
                            </Col>
                            <Col span="3" style="text-align: right">航班状态：</Col>
                            <Col span="8">
                                <FormItem>
                                    	计划-0／起飞-1／到达-2／延误-3／取消-4
                                        <input type="hidden" v-model="flightData.status"/>
                                </FormItem>
                            </Col>
                        </Row>
                    </FormItem>
                    <div class="update-submit">
                        <Button type="primary" @click="updateSubmit()" style="width:400px;height: 40px;">确认修改</Button>
                    </div>
                </Form>  
            </div>
        </Modal>
    </div>
</template>


<script>
export default {
    data() {
        return {
            loading: true,//是否加载状态
            tableHeight: '',//table高度
            pageData:[],//分页数据
            pantectTotalSize: 200,//总数据
            page:1,
            size:20,
            flightValue:'',
            datevalue:'',
            columns: [
                {
                    type: 'index',
                    title: '序号',
                    width: 70,
                    align: 'center'
                },
                {
                    title: '航班号',
                    key: 'flightInformation',
                    align: 'center',
                    ellipsis:true,
                    tooltip:true,
                },
                {
                    title: '航班日期',
                    key: 'takeOffDate',
                    align: 'center',
                    ellipsis:true,
                    tooltip:true,
                },
                {
                    title: '起飞时间',
                    key: 'takeOffTime',
                    align: 'center',
                    tooltip:true,
                    render: (h, params) => {
                        return h('div', [
                            params.row.takeOffTime.slice(0,5)
                        ]);
                    }
                },
                {
                    title: '出发地',
                    key: 'placeOfDeparture',
                    align: 'center',
                    tooltip:true,
                },
                {
                    title: '到达时间',
                    key: 'arrivalTime',
                    align: 'center',
                    tooltip:true,
                    render: (h, params) => {
                        return h('div', [
                            params.row.arrivalTime.slice(0,5)
                        ]);
                    }
                },
                {
                    title: '到达地',
                    key: 'placeOfDestination',
                    align: 'center',
                    tooltip:true,
                },
                {
                    title: '准点率',
                    key: 'onTimeRate',
                    align: 'center',
                    tooltip:true,
                },
                {
                    title: '状态',
                    key: 'status',
                    align: 'center',
                    tooltip:true,
                    render: (h, params) => {
                        return h('div', [
                            params.row.status === 0 &&  h(
                                'span',
                                {
                                    props: {
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px',
                                        color: '#2d8cf0'
                                    },
                                },
                                '计划' 
                            ),
                            params.row.status === 1 &&  h(
                                'span',
                                {
                                    props: {
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px',
                                        color: 'red'
                                    },
                                },
                                '飞行' 
                            ),
                            params.row.status === 2 &&  h(
                                'span',
                                {
                                    props: {
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px',
                                        color: '#19be6b'
                                    },
                                },
                                '到达' 
                            ),
                            params.row.status === 3 &&  h(
                                'span',
                                {
                                    props: {
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px',
                                        color: '#ff9900'
                                    },
                                },
                                '延误' 
                            ),
                            params.row.status === 4 &&  h(
                                'span',
                                {
                                    props: {
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px',
                                        color: 'red'
                                    },
                                },
                                '取消' 
                            ),
                        ]);
                    }
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 100,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h(
                                'Button',
                                {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.updatedFlight(params.row.flightId);
                                        }
                                    }
                                },
                                '修改'
                            )
                        ]);
                    }
                }
            ],
            data: [],
            modal:false,
            flightData: {
                flightInformation:'',//航班号
                takeOffDate:'',//起飞日期
                takeOffTime:'',//起飞时间
                arrivalTime:'',//到达时间
                placeOfDeparture:'', //出发城市
                placeOfDestination:'',//到达城市
                onTimeRate:'',//准点率
                departureGate:'',//登机口
                checkinCounters:'',//值机柜台
                baggageCarousel:'',//行李转盘
                aircraftType:'',//机型
                aircraftAge:'',//机龄
                wholeJourney:'',//全程
                duration:'',//时长
                status:'', //航班状态
                flightId: ''
            },
        }
    },
    created() {
        var day = new Date();
        this.datevalue = day;
        this.getFlightData();  
    },
    computed: {
       //飞行状态
        newStatus(){
            return function(obj) {
                if(obj == 0){
                    return '计划';
                }
                 else if (obj == 1) {
                    return '飞行';
                } else if (obj == 2) {
                    return '到达';
                } else if (obj == 3) {
                    return '延误';
                } else if (obj == 4) {
                    return '取消';
                }
            };
        },
    },
    methods:{
        getFlightData () {
            this.$axios.get('api/flight/queryAll')
            .then(data => {
                this.loading = false;
                if(data.data.code == 200){
                    this.data = data.data.data || [];
                    this.pantectTotalSize = data.data.data.length;
                    this.paging(this.data,this.page,this.size);
                }else {
                    this.$Message.error(data.data.msg);
                }
            }); 
        },
        updateSubmit() {
            const params = {
                flightInformation: this.flightData.flightInformation,
                takeOffDate: this.flightData.takeOffDate,
                takeOffTime: this.flightData.takeOffTime + ':00',
                arrivalTime: this.flightData.arrivalTime + ':00',
                placeOfDeparture: this.flightData.placeOfDeparture,
                placeOfDestination: this.flightData.placeOfDestination,
                onTimeRate: this.flightData.onTimeRate,
                departureGate: this.flightData.departureGate,
                checkinCounters: this.flightData.checkinCounters,
                baggageCarousel: this.flightData.baggageCarousel,
                aircraftType: this.flightData.aircraftType,
                aircraftAge: this.flightData.aircraftAge,
                wholeJourney: this.flightData.wholeJourney,
                duration: this.flightData.duration,
                status: this.flightData.status,
                flightId:this.flightData.flightId,
            };
            this.$axios.put('api/flight/updateFlightInfo',params)
                .then(data => {
                    if(data.data.code == 200){
                        this.modal = false;
                        this.$Message.success('修改成功');
                        this.flightData = {},
                        this.getFlightData(); 
                    }else {
                        this.$Message.error(data.data.msg);
                    }
                });
        },
        // 控制表分页
        paging (number,page,size) {
            var startIndex = (page-1) * size;
            var endIndex = page * size;
            this.pageData = number.slice(startIndex,endIndex);
            if(this.pageData.length > 12){
                this.tableHeight = 600;
            }else{
                this.tableHeight = 0;
            }
        },
        // 改变page
        changePage (val) {
            console.log(val);
            this.page = val;
            this.paging (this.data,this.page,this.size);
        },
        //改变size
        changeSize (val) {
            console.log(val);
            this.size = val;
            this.paging (this.data,this.page,this.size);
        },
        //修改航班
        updatedFlight (id) {
            console.log(id);
            this.modal = true;
            var params = {
                flightId: id,
            }
            this.$axios.post('api/flight/queryInfoByFlightId',params)
            .then(data => {
                if(data.data.code == 200) {
                    this.flightData = data.data.data;
                }
            }).catch(() => {
                this.$Message.error('请求失败');
                return;
            });
        },
        //按航班号搜索
        search () {
            var params = {
                flightInformation:this.flightValue,
                takeOffDate:this.datevalue,
            }
            this.$axios.post('api/flight/queryFlightInfo',params)
                .then(data => {
                    if(data.data.code == 200){
                        this.data = data.data.data || [];
                        this.pantectTotalSize = data.data.data.length;
                        this.paging(this.data,this.page,this.size);
                    }else {
                        this.$Message.error(data.data.msg);
                    }
                });
        }
    },
}
</script>

<style lang="less" scoped>
.page {
    margin-top: 10px;
    text-align: center;
}
.search {
    text-align: center;
    margin-bottom: 15px;
}
.update-submit {
    text-align: center;
}
</style>