<template>
    <div class="attention">
        <div class="card" @click="cardParticulars" v-for="(item, index) in flightData" :key="index">
            <p>
                <span>{{item.flightNum}}</span>
                <span class="empty0"></span>
                <span>{{item.time}}</span>
            </p>
            <p>
                <span>{{item.stratSite}}</span>
                <span class="icon"><Icon type="ios-plane" size="60" color="#2D8CF0"/></span>
                <span>{{item.endSite}}</span>            
            </p>
            <p>
                <span>{{item.stratTime}}</span>
                <span class="empty"></span>
                <span>{{item.endTime}}</span>   
            </p>
        </div>
        <Footer/>
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
            flightData:{
                flight1:{flightNum:'海南航空G9679',time:'2019-03-05',stratSite:'海南',endSite:'深圳',stratTime:'07:40',endTime:'08:50'},
                flight2:{flightNum:'民航航空G9679',time:'2019-04-05',stratSite:'北京',endSite:'上海',stratTime:'05:40',endTime:'08:50'},
                flight3:{flightNum:'重庆航空G9679',time:'2019-05-05',stratSite:'重庆',endSite:'深圳',stratTime:'15:40',endTime:'16:50'},
                flight4:{flightNum:'四川航空G9679',time:'2019-06-05',stratSite:'四川',endSite:'深圳',stratTime:'18:40',endTime:'20:50'},
                flight5:{flightNum:'四川航空G9679',time:'2019-06-05',stratSite:'四川',endSite:'深圳',stratTime:'18:40',endTime:'20:50'},
                flight6:{flightNum:'四川航空G9679',time:'2019-06-05',stratSite:'四川',endSite:'深圳',stratTime:'18:40',endTime:'20:50'},
            }
        }
    },
    methods: {
        cardParticulars () {
            this.$router.push({ name: '航班详情' });
        }
    },

}
</script>

<style lang="less" scoped>
.attention {
    position: absolute;
    width: 100%;
    // height: 100%;
    object-fit: fill;
    background-image: url('../../assets/images/bg3.jpg');
    .card {
        width: 700px;
        height: 150px;
        margin: 20px auto 0;
        margin-bottom: 30px;
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
            padding: 0 255px;
        }
        .empty0 {
            padding: 0 210px;
        }
        .empty {
            padding: 0 280px;
        }
    }
    .card:hover {
        width: 704px;
    }
}

</style>