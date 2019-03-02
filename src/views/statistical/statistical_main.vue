<template>
    <div class="statistical-main">
        <Card class="card">
            <div class="filtrate">
                <Select v-model="searchValue" size="large" style="width:200px;">
                    <Option v-for="item in searchType" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <!-- 航班号查询 -->
                <Input v-show="flightNumShow" v-model="flightValue" prefix="ios-plane" size="large" placeholder="请输入航班号" style="width: auto" />
                <!-- 两地之间查询 -->
                <span v-show="cityShow">
                    <AutoComplete
                        v-model="departValue"
                        class="autocomplete"
                        icon="ios-pin"
                        :data="cityData"
                        :filter-method="filterMethod"
                        placeholder="出发地"
                        style="width:120px">
                    </AutoComplete>
                    <!-- <Input prefix="ios-pin" v-model="departValue" size="large" placeholder="出发城市" style="width: 120px" /> -->
                        <span class="change" @click="transform"><Icon type="md-swap" /></span>
                    <!-- <Input prefix="ios-pin" v-model="arriveValue" size="large" placeholder="到达城市" style="width: 120px" />   -->
                    <AutoComplete
                        v-model="arriveValue"
                        class="autocomplete"
                        icon="ios-pin"
                        :data="cityData"
                        :filter-method="filterMethod"
                        placeholder="目的地"
                        style="width:120px">
                    </AutoComplete>
                </span>
                <DatePicker type="date" size="large" :options="options" placeholder="请选择日期" style="width: 220px"></DatePicker>
                <Button type="primary" @click="search">航班查询</Button>
            </div>
        </Card>
        <Card class="table">
            <Table stripe :loading="loading" :columns="columns" :data="pageData" :height="tableHeight"></Table>
            <div class="page">
                <Page :total="pantectTotalSize" :current=page :page-size="size" @on-change="changePage" @on-page-size-change="changeSize" show-elevator show-sizer show-total/>
            </div>
        </Card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            cityData: ['重庆', '成都', '深圳'],
            loading: true,
            searchValue: '按航班号搜索',
            flightNumShow: true,
            cityShow: false,
            tableHeight: '',
            flightValue: '',
            departValue: '',
            arriveValue: '',
            pageData:[],
            pantectTotalSize: 200,
            page:1,
            size:20,
            
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
                {
                    title: '操作',
                    key: 'action',
                    width: 100,
                    align: 'center',
                    // fixed: 'right',
                    render: (h, params) => {
                        return h('div', [
                            h(
                                'Button',
                                {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            // this.particulars(params);
                                        }
                                    }
                                },
                                '详情'
                            )
                        ]);
                    }
                }
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
                }
            ]
        }
    },
    created() {
        this.$axios
            .get('https://www.easy-mock.com/mock/5c00cea7b5ca4f6a533ac6d0/example/flightInformation')
            .then(data => {
                this.loading = false;
                console.log(data);
                this.data = data.data.list || [];
                this.paging(this.data,this.page,this.size);
            });
    },
    methods:{
        filterMethod (value, option) {
                return option.toUpperCase().indexOf(value.toUpperCase()) !== -1;
        },
        transform () {
            [this.departValue,this.arriveValue] = [this.arriveValue,this.departValue];
        },
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
        // 控制表分页
        paging (number,page,size) {
            var startIndex = (page-1) * size;
            var endIndex = page * size;
            this.pageData = number.slice(startIndex,endIndex);
            if(this.pageData.length > 12){
                this.tableHeight = 600;
            }else{
                this.tableHeight = 0;
            }
        },
        // 改变page
        changePage (val) {
            console.log(val);
            this.page = val;
            this.paging (this.data,this.page,this.size);
        },
        //改变size
        changeSize (val) {
            console.log(val);
            this.size = val;
            this.paging (this.data,this.page,this.size);
        }
    },
    /**
     * 监听搜索条件是按航班号还是按起降城市
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

.card {
    margin: 10px 50px;
    background-color: rgba(255, 255, 255, 0.3);
    .filtrate {
        text-align: center;
        .autocomplete {
            text-align: left;
        }
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
.page {
    margin-top: 10px;
    // margin-left: 30%;
    text-align: center;
}
</style>



