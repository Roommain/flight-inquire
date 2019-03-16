<template>
    <div class="attention">
        <div class="attention-box">
            <div class="card" @click="cardParticulars(item.flightId)" v-for="(item, index) in flightData" :key="index">
                <p>
                    <span>{{item.flightInformation}}</span>
                    <!-- <span class="empty0"></span> -->
                    <span class="att-right">{{item.takeOffDate}}</span>
                </p>
                <p>
                    <span>{{item.placeOfDeparture}}</span>
                    <span class="icon"><Icon type="ios-plane" size="60" color="#2D8CF0"/></span>
                    <span>{{item.placeOfDestination}}</span>            
                </p>
                <p>
                    <span>{{flightTime(item.takeOffTime)}}</span>
                    <!-- <span class="empty"></span> -->
                    <span class="att-right">{{flightTime(item.arrivalTime)}}</span>   
                </p>
            </div>            
        </div>
        <Footer class="footer"/>
    </div>
</template>


<script>
import Footer from '@/components/footer';
export default {
    components: {
        Footer,
    },
    data() {
        return {
            flightData:[]
        }
    },
    created() {
        this.getAttentionData();
    },
    methods: {
        cardParticulars (id) {
            this.$router.push({
                name: '航班详情',
                params: {
                    flightId: id
                }
            });
        },
        getAttentionData () {
            this.$axios.get('api/flight/queryFlyInfoByFlights')
            .then(data => {
                console.log(data);
                if(data.data.code == 200) {
                    this.flightData = data.data.data;
                }
            }).catch(() => {
                this.$Message.error('请求失败');
                return;
            });
        }
    },
    computed: {
        //截取时间
        flightTime(){
            return function(obj) {
                return obj.slice(0,5);
            };
        },
    },

}
</script>

<style lang="less" scoped>
.attention {
    position: fixed;
    width: 100%;
    height: 100%;
    object-fit: fill;
    // overflow-y: auto;
    background: url('../../assets/images/bg3.jpg') no-repeat;
    background-size: cover;
    .attention-box {
        width: 750px;
        max-height: 80%;
        overflow-y: auto;
        margin: 10px auto;
    }
    .card {
        width: 700px;
        height: 150px;
        margin: 10px auto;
        font-size: 20px;
        color: rgba(209, 209, 209, 1);
        padding: 10px;
        border-radius: 10px;
        background-color: rgba(0, 0, 0, 0.3);
        cursor: pointer;
        .time {
            text-align: center;
        }
        .icon {
            padding: 0 262px;
        }
        .empty0 {
            padding: 0 180px;
        }
        .empty {
            padding: 0 200px;
        }
    }
    .card:hover {
        background-color: rgba(0, 0, 0, 0.4);
    }
    .footer {
        width: 100%;
        position: absolute;
        left: 0;
        bottom: 66px;
    }
}
.att-right {
    float: right;
}
</style>