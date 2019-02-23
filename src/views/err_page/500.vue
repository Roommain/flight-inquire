<template>
    <div class="error-500">
        <div class="error-content">
            <img width="578" height="352" src="../../assets/images/hint/500-reminder.png" data-pinit="registered">
            <h2>抱歉,服务器出错了!</h2>
            <router-link to="/main"><button type="button" class="utils-save-btn ivu-btn ivu-btn-primary">返回首页</button></router-link>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        // return {
        //     time:30,
        //     timeDevice:'',
        // };
    },
    created(){
        // this.timeDevice = setInterval(() => {
        //     this.time--;
        //     if(this.time <= 0){
        //         this.$router.go(-1);
        //         clearInterval(this.timeDevice);
        //     }
        // },1000);
    },
    beforeDestroy() {
        // if(this.timeDevice !== ''){
        //     clearInterval(this.timeDevice);
        // }  
    },
};
</script>
<style lang="less">
    .error-500{
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        background-color: #eee;
        overflow: hidden;
        height: 100%;
        background-color: #fff;
        .error-content{
            >h2{
                padding: 35px 0;
                font-size: 24px;
                color: #999;
            }
            >p{
                padding: 0 0 20px;
                font-size: 16px;
                .time{
                    color: orange;
                }
            }
            .utils-save-btn {
                padding: 12px 35px;
                border-radius: 0;
                width: auto;
                height: 100%;
            }
        }
    }
</style>