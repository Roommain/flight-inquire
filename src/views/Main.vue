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
                <MenuItem name="3">
                    <Icon type="ios-analytics"/>
                    数据分析
                </MenuItem>
                <Submenu name="4">
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
        <Card class="card">
            <span class="title">飞途——随时了解你的航班状态</span>
            <div class="filtrate">
                <Select v-model="searchValue" size="large" style="width:200px;">
                    <Option v-for="item in searchType" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <!-- 航班号查询 -->
                <Input v-show="flightNumShow" v-model="flightValue" prefix="ios-plane" size="large" placeholder="请输入航班号" style="width: auto" />
                <!-- 两地之间查询 -->
                <span v-show="cityShow">
                    <Input prefix="ios-pin" v-model="departValue" size="large" placeholder="出发城市" style="width: 120px" />
                        <span class="change"><Icon type="ios-plane-outline" /></span>
                    <Input prefix="ios-pin" v-model="arriveValue" size="large" placeholder="到达城市" style="width: 120px" />     
                </span>
                <DatePicker type="date" size="large" :options="options" placeholder="请选择日期" style="width: 220px"></DatePicker>
                <Button type="primary" @click="search">航班查询</Button>
            </div>
        </Card>
        <router-view class="main-iview"></router-view>
    </div>
</template>
<script>
export default {
    data() {
        return {
                theme1: 'dark',
                searchValue: '按航班号搜索',
                flightNumShow: true,
                cityShow: false,
                flightValue: '',
                departValue: '',
                arriveValue: '',
                searchType: [
                    {
                        value: '按航班号搜索',
                        label: '按航班号搜索',
                    },
                    {
                        value: '按起降城市搜索',
                        label: '按起降城市搜索',
                    }
                ],
                options: {
                    disabledDate (date) {
                        return date && date.valueOf() < Date.now() - 86400000;
                    }
                },
            }
    },
    methods:{
        search () {
            console.log('点击了搜索');
            this.$router.push({ name: '数据' });
        }
    },
        /**
     * 监听搜索条件是按昨天还是月份
     */
    watch: {
        searchValue: function () {
            if(this.searchValue == '按航班号搜索'){
                this.flightNumShow = true;
                this.cityShow = false;
            }else if (this.searchValue == '按起降城市搜索') {
                this.flightNumShow = false;
                this.cityShow = true;
            }
        },
    }
};
</script>

<style lang="less" scoped>
.main {
    width: 100%;
    height: 100%;
    font-size: 16px;
    background: url('../assets/images/bg.jpg') no-repeat;
    background-size: 100%;
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
    .filtrate {
        margin-top: 20px;
    }
    .change {
        margin: 0 10px;
        font-size: 20px;
        cursor: pointer;
    }
}
</style>

