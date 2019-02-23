<template>
    <div class="main">
        <header class="header">
            <Menu mode="horizontal" :theme="theme1" active-name="2">
                <MenuItem name="1">
                    <img class="logo" src="../assets/images/fei.png" alt="">
                </MenuItem>
                <MenuItem name="2">
                    <Icon type="md-home"/>
                    首页
                </MenuItem>
                <Submenu name="3">
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
                theme1: 'dark'
            }
    },
};
</script>

<style lang="less">
.logo {
    height: 50px;
    margin-top: 5px;
}
</style>

