<template>
    <div class="particulars">
        <search/>
        <Card class="card">
            <p class="clearfloat"> <span class="particulars-flight">{{flightPartData.flightInformation}}</span><span class="particulars-state">{{newStatus(flightPartData.status)}}</span> </p>
            <div class="path">
                <!-- <Progress :percent="45" status="active" /> -->
                <div class="progress">
                    <p class="whole">全程<span>{{flightPartData.wholeJourney}}</span>公里&nbsp;&nbsp;时长<span>{{flightPartData.duration}}</span>分钟 </p>
                    <span class="start">{{flightPartData.placeOfDeparture}}</span>
                    <Progress :percent=flightStatus(flightPartData.status) hide-info status="active" />
                    <span class="over"><Icon type="ios-plane" size="40" />&nbsp;&nbsp;{{flightPartData.placeOfDestination}}</span>
                    <p class="whole">
                        机型：<span>{{flightPartData.aircraftType}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                        机龄：<span>{{flightPartData.aircraftAge}}</span>年&nbsp;&nbsp;&nbsp;&nbsp;
                        历史准点率：<span>{{flightPartData.onTimeRate}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                    </p>
                </div>
            </div>
        </Card>
        <Card class="card">
            <div class="start-box">
                <p class="start-time">
                    <span class="site"><img src="@/assets/images/weather/start.png" alt=""> {{flightPartData.placeOfDeparture}}</span> <span class="time"> <span>{{flightPartData.takeOffDate}}</span> 计划起飞{{flightTime(flightPartData.takeOffTime)}}</span>
                </p>
                <ul class="clearfloat">
                    <li>
                        <!-- <img class="weather" src="@/assets/images/weather/duoyun.png" alt="天气" width="62" height="62"> -->
                        <p>值机柜台</p>
                        <p class="suggest">{{flightPartData.checkinCounters}}</p>
                    </li>
                    <li>
                        <p>{{showPlantakeOff(flightPartData.status)}}</p>
                        <p class="practical-time">{{flightTime(flightPartData.takeOffTime)}}</p>
                    </li>
                    <li>
                        <p>登机口</p>
                        <p class="suggest">{{flightPartData.departureGate}}</p>
                    </li>
                </ul>
            </div>
        </Card>
        <Card class="card">
            <div class="start-box">
                <p class="start-time">
                    <span class="site"><img src="@/assets/images/weather/end.png" alt="">{{flightPartData.placeOfDestination}}</span> <span class="time"> <span>{{flightPartData.takeOffDate}}</span> 计划到达{{flightTime(flightPartData.arrivalTime)}}</span>
                </p>
                <ul class="clearfloat">
                    <li>
                        <!-- <img class="weather" src="@/assets/images/weather/duoyun.png" alt="天气" width="62" height="62"> -->
                        <p>行李转盘</p>
                        <p class="suggest">{{flightPartData.baggageCarousel}}</p>
                    </li>
                    <li>
                        <p>{{showPlanArrival(flightPartData.status)}}</p>
                        <p class="practical-time">{{flightTime(flightPartData.arrivalTime)}}</p>
                    </li>
                    <li>
                        <p>到达口</p>
                        <p class="suggest">--</p>
                    </li>
                </ul>
            </div>
        </Card>
        <div class="attention">
            <Button size="large" @click="attentionSubmit" type="primary" style="width: 100%;height: 42px;">{{msg}}</Button>
        </div>
        <Footer/>
    </div>
</template>

<script>
import Search from '@/components/search';
import Footer from '@/components/footer';
export default {
    components: {
        Search,
        Footer,
    },
    data() {
        return {
            cityname:'重庆',
            flightId:'',
            flightPartData:{
                aircraftAge: 9,
                aircraftType: "波音707",
                arrivalTime: "04:03:00",
                baggageCarousel: 5,
                checkinCounters: "G",
                departureGate: 5,
                duration: 90,
                flightId: "68N028",
                flightInformation: "重庆航空OQ3242",
                onTimeRate: "98%",
                placeOfDeparture: "西安",
                placeOfDestination: "重庆",
                status: 0,
                takeOffDate: "2019-03-15",
                takeOffTime: "02:02:00",
                wholeJourney: 156,
            },
            msg:'未关注',
        }
    },
    created() {
        this.getParticularsData();
        // this.flightId = this.$route.params.flightId || '';
        // console.log(this.flightId);
    },
    methods: {
        // weather () {
        //     this.$axios.get('/wea/weather/index?key=db56c2d4874ec941e15710323df153e4&cityname='+this.cityname)
        //     .then(data => {
        //         console.log(data);
        //     }).catch(() => {
        //         this.$Message.error('请求失败');
        //         return;
        //     });
        // },
        attentionSubmit () {
            var params = {
                flightId: this.flightId,
            }
            this.$axios.post('api/flight/insertFollow',params)
            .then(data => {
                console.log(data.data);
                if(data.data.code == 200) {
                    this.$Message.success(data.data.msg);
                    this.msg = '已关注';
                }
            }).catch(() => {
                this.$Message.error('请求失败');
                return;
            });
        },
        getParticularsData () {
            this.flightId = this.$route.params.flightId || '';
            console.log(this.flightId);
            var params = {
                flightId: this.flightId,
            }
            this.$axios.post('api/flight/queryInfoByFlightId',params)
            .then(data => {
                console.log(data.data);
                if(data.data.code == 200) {
                    this.flightPartData = data.data.data;
                    this.msg = data.data.msg;
                }

            }).catch(() => {
                this.$Message.error('请求失败');
                return;
            });
        }
    },
    computed:{
        /**
        * 封装进行状态修改的方法
        * @param {Object} obj 当前渲染的对象
        */
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
        //飞行进度条
        flightStatus(){
            return function(obj) {
                if(obj == 0){
                    return 0;
                }
                 else if (obj == 1) {
                    return 50;
                } else if (obj == 2) {
                    return 100;
                } else if (obj == 3) {
                    return 0;
                } else if (obj == 4) {
                    return 0;
                }
            };
        },
        //截取时间
        flightTime(){
            return function(obj) {
                return obj.slice(0,5);
            };
        },
        //通过航班状态展示是 计划起飞还是 实际起飞
        showPlantakeOff() {
            return function(obj) {
                if(obj == 0){
                    return '计划起飞';
                }
                 else if (obj == 1) {
                    return '实际起飞';
                } else if (obj == 2) {
                    return '实际起飞';
                }else {
                    return '计划起飞';
                }
            };
        },
        //通过航班状态展示是 计划到达 还是 实际到达
        showPlanArrival() {
            return function(obj) {
                if(obj == 0){
                    return '计划到达';
                }
                 else if (obj == 1) {
                    return '计划到达';
                } else if (obj == 2) {
                    return '实际到达';
                }else {
                    return '计划到达';
                }
            };
        }
    },
}
</script>

<style lang="less" scoped>
.card {
    margin: 10px 50px;
    background-color: rgba(255, 255, 255, 0.3);
}
.path {
    position: relative;
    width: 100%;
    height: 160px;
    background-color: #dbe2ec;
    .start {
        position: absolute;
        left: 16%;
        font-size: 18px;
    }
    .over {
        position: absolute;
        left: 80%;
        top: 43px;
        font-size: 18px;
    }
}
.particulars-flight {
    padding-left: 50px;
    font-size: 18px;
    font-weight: 700;
}
.particulars-state {
    float: right;
    padding-bottom: 10px;
    padding-right: 50px;
    font-size: 18px;
    font-weight: 900;
    color: #00a44e;
}
.progress {
    width: 60%;
    height: 100px;
    margin: 1px auto;
}
.clearfloat:after{
    display:block;
    clear:both;
    content:"";
    visibility:hidden;
    height:0
}
.whole {
    padding-top: 30px ;
    text-align: center;
    color: #999;
}
.start-box {
    color: #999;
    .start-time {
        padding: 10px 0;
        border-bottom: 2px solid rgb(236, 235, 235);
        .site {
            font-size: 24px;
            color: black;
        }
        .time {
            float: right;
        }
    }
    ul {
        padding-top: 20px;
        li {
            float: left;
            width: 33%;
            height: 100px;
            list-style: none;
            text-align: center;
            .practical-time {
                margin-top: 20px;
                font-size: 30px;
                color: #2b8cff;
            }
            .suggest {
                margin-top: 20px;
                font-size: 30px;
                color: #2b8cff;
            }
        }
    }
    
}
.attention {
    margin: 10px 50px;
}
</style>