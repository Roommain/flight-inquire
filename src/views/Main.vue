<template>
    <div class="main">
        <header class="header">
            <Menu @on-select="selectMenu" mode="horizontal" :theme="theme1" active-name="statistical">
                <MenuItem name="logo">
                    <img class="logo" src="../assets/images/fei.png" alt="">
                </MenuItem>
                <MenuItem name="statistical">
                    <Icon type="md-home"/>
                    首页
                </MenuItem>
                <MenuItem name="data">
                    <Icon type="ios-analytics"/>
                    数据分析
                </MenuItem>
                <Submenu name="user">
                    <template slot="title">
                        <Icon type="ios-people" />
                        用户信息
                    </template>
                        <MenuItem name="3-1">查看信息</MenuItem>
                        <MenuItem name="3-2">修改密码</MenuItem>
                        <MenuItem name="3-3">退出</MenuItem>
                </Submenu>               
            </Menu>
        </header>
        <router-view class="main-iview"></router-view>
    </div>
</template>
<script>
export default {
    data() {
        return {
                theme1: 'dark',
            }
    },
    methods:{
        /**
         * 跳转路由
         */
        selectMenu(name){
            if (!name) {
                return;
            }
            this.$router.push({path:name});
        },
    },
};
</script>

<style lang="less" scoped>
.main {
    width: 100%;
    height: 100%;
    font-size: 16px;
}
.logo {
    height: 50px;
    margin-top: 5px;
}
.card {
    height: 200px;
    margin: 200px 200px;
    background-color: rgba(255, 255, 255, 0.3);
    .title{
        font-size: 20px;
        color: #000;
    }
}
</style>

