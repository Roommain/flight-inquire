<template>
    <div class="particulars">
        <search/>
        <Card class="card">
            <p class="clearfloat"> <span class="particulars-flight">东方航空 MU5183</span><span class="particulars-state">到达</span> </p>
            <div class="path">
                <!-- <Progress :percent="45" status="active" /> -->
                <div class="progress">
                    <p class="whole">全程<span>117</span>公里&nbsp;&nbsp;时长<span>112</span>分钟 </p>
                    <span class="start">上海</span>
                    <Progress :percent="100" hide-info status="active" />
                    <span class="over"><Icon type="ios-plane" size="40" />&nbsp;&nbsp;重庆</span>
                    <p class="whole">
                        机型：<span>AIRBUSA321-211</span>&nbsp;&nbsp;&nbsp;&nbsp;
                        机龄：<span>12.5</span>年&nbsp;&nbsp;&nbsp;&nbsp;
                        历史准点率：<span>96.77%</span>&nbsp;&nbsp;&nbsp;&nbsp;
                    </p>
                </div>
            </div>
        </Card>
        <Card class="card">
            <div class="start-box">
                <p class="start-time">
                    <span class="site"><img src="@/assets/images/weather/start.png" alt=""> 上海T2</span> <span class="time">2019-03-08 周五 计划起飞07:35</span>
                </p>
                <ul class="clearfloat">
                    <li>
                        <img class="weather" src="@/assets/images/weather/duoyun.png" alt="天气" width="62" height="62">
                        <p>-2°/13°	C 多云</p>
                        <p>PM2.5：76</p>
                    </li>
                    <li>
                        <p>实际起飞</p>
                        <p class="practical-time">07:04</p>
                    </li>
                    <li>
                        <p>登记口</p>
                        <p class="suggest">30</p>
                    </li>
                </ul>
            </div>
        </Card>
        <Card class="card">
            <div class="start-box">
                <p class="start-time">
                    <span class="site"><img src="@/assets/images/weather/end.png" alt=""> 重庆T3</span> <span class="time">2019-03-08 周五 计划到达09:35</span>
                </p>
                <ul class="clearfloat">
                    <li>
                        <img class="weather" src="@/assets/images/weather/duoyun.png" alt="天气" width="62" height="62">
                        <p>-2°/13°	C 多云</p>
                        <p>PM2.5：76</p>
                    </li>
                    <li>
                        <p>实际到达</p>
                        <p class="practical-time">09:04</p>
                    </li>
                    <li>
                        <p>到达口</p>
                        <p class="suggest">--</p>
                    </li>
                </ul>
            </div>
        </Card>
        <div class="attention">
            <Button size="large" @click="attentionSubmit" type="primary" style="width: 100%;height: 42px;">关注</Button>
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
        }
    },
    created() {
        // this.weather();
    },
    methods: {
        weather () {
            this.$axios.get('/wea/weather/index?key=db56c2d4874ec941e15710323df153e4&cityname='+this.cityname)
            .then(data => {
                console.log(data);
            }).catch(() => {
                this.$Message.error('请求失败');
                return;
            });
        },
        attentionSubmit () {
            this.$Message.success('关注成功');
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
            .weather {
                // float: left;
            }
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