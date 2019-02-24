<template>
    <div class="statistical-main">
        <header class="header">
            <Menu @on-select="selectMenu" mode="horizontal" :theme="theme1" active-name="main">
                <MenuItem name="logo">
                    <img class="logo" src="../../assets/images/fei.png" alt="">
                </MenuItem>
                <MenuItem name="main">
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
        <Card class="card">
            <div class="filtrate">
                <Select v-model="searchValue" size="large" style="width:200px;">
                    <Option v-for="item in searchType" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <!-- 航班号查询 -->
                <Input v-show="flightNumShow" prefix="ios-plane" size="large" placeholder="请输入航班号" style="width: auto" />
                <!-- 两地之间查询 -->
                <span v-show="cityShow">
                    <Input prefix="ios-pin" v-model="value" size="large" placeholder="出发城市" style="width: 120px" />
                        <span class="change"><Icon type="ios-plane-outline" /></span>
                    <Input prefix="ios-pin" v-model="value" size="large" placeholder="到达城市" style="width: 120px" />     
                </span>
                <DatePicker type="date" size="large" :options="options" placeholder="请选择日期" style="width: 220px"></DatePicker>
                <Button type="primary" @click="search">航班查询</Button>
            </div>
        </Card>
        <Card class="table">
            <Table stripe :columns="columns" :data="data"></Table>
        </Card>
        <!-- <router-view class="main-iview"></router-view> -->
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
                columns: [
                    // {
                    //     type: 'index',
                    //     title: '序号',
                    //     width: 80,
                    //     align: 'center',
                    //     tooltip:true,
                    // },
                    {
                        title: '航班信息',
                        key: 'flightInformation',
                        align: 'center',
                        tooltip:true,
                    },
                    {
                        title: '起飞时间',
                        key: 'takeOffTime',
                        align: 'center',
                        tooltip:true,
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
                    },
                ],
                data: [
                    {
                        flightInformation: '国航CA155',
                        takeOffTime: '09:45',
                        placeOfDeparture: '重庆',
                        arrivalTime: '11:53',
                        placeOfDestination: '北京',
                        onTimeRate : '100%',
                        status : '到达'
                    },
                    {
                        flightInformation: '国航CA155',
                        takeOffTime: '09:45',
                        placeOfDeparture: '重庆',
                        arrivalTime: '11:53',
                        placeOfDestination: '北京',
                        onTimeRate : '100%',
                        status : '到达'
                    },
                    {
                        flightInformation: '国航CA155',
                        takeOffTime: '09:45',
                        placeOfDeparture: '重庆',
                        arrivalTime: '11:53',
                        placeOfDestination: '北京',
                        onTimeRate : '100%',
                        status : '到达'
                    },
                ]
            }
    },
    // created() {
    //     this.$axios
    //         .get('')
    //         .then(data => {
    //             console.log(data.data.subjects);
    //         });
    // },
    methods:{
        search () {
            console.log('点击了搜索');
            this.$router.push({ name: '数据' });
        },
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
.logo {
    height: 50px;
    margin-top: 5px;
}
.card {
    // margin: 10px 200px;
    background-color: rgba(255, 255, 255, 0.3);
    .filtrate {
        margin: 10px 200px;
    }
    .change {
        margin: 0 10px;
        font-size: 20px;
        cursor: pointer;
    }
}
.table {
    margin: 10px 50px;
}
</style>



