<template>
    <div class="weather">
        <video width="100%"  class="video" loop="loop" autoplay="autoplay" muted="muted">
            <!-- <source src="http://cdn.moji.com/websrc/video/winter20181129.mp4" type="video/mp4"> -->
            <source src="@/assets/images/weather/winter20181129.mp4" type="video/mp4">
        </video>
        <div class="card">
            <p><input class="input" v-model="city" @keyup.enter="submit" placeholder="请输入城市然后按下Enter" /></p>
            <div></div>
        </div>
        <div class="wea">
            <p class="title">天气改变命运</p>
            <p>Weather Change Your Destiny</p>
        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            city:'重庆'
        }
    },
    methods: {
        submit () {
            this.$Message.error('请输入搜索条件');
        }
    },

}
</script>

<style lang="less" scoped>
.video {
    position: fixed;
    width: 100%;
    height: 100%;
    object-fit: fill;
}
.card {
    position: absolute;
    top: 100px;
    right: 20px;
    width: 600px;
    height: 400px;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 5px;
    p{
        border-radius: 10px;
        margin: 5px 50px;
    }
    .input {
        padding-left: 20px;
        background-color: rgba(0, 0, 0, 0.5);
        border: 0;
        width: 100%;
        height: 30px;
        outline: none;
        color: white;
        border-radius: 10px;
    }
}
.wea {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 500px;
    height: 100px;
    // background-color: rgba(0, 0, 0, 1);
    border-radius: 5px;
    p {
        font-size: 24px;
        color: white;
        text-align: center;
        line-height: 50px;
    }
    .title {
            letter-spacing:20px;
    }
}
</style>