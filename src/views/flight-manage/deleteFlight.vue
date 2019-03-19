<template>
    <div class="deleteflight">
        <div class="search">
            <Input v-model="flightValue" prefix="ios-plane" size="large" placeholder="请输入航班号" style="width: auto" />
            <DatePicker type="date" v-model="datevalue" size="large" placeholder="请选择日期" style="width: 220px"></DatePicker>
            <Button type="primary" @click="search">航班号查询</Button>
        </div>
        <div class="batch">
            <!-- <DatePicker type="date" placeholder="可输入删除日期" style="width: 200px"></DatePicker> -->
            <Button type="warning" @click="batchButton(flightids)">批量删除</Button> 
        </div>
        <Table stripe :loading="loading" :columns="columns" :data="pageData" :height="tableHeight" @on-selection-change="getFlightIds"></Table>
        <div class="page">
            <Page :total="pantectTotalSize" :current=page :page-size="size" @on-change="changePage" @on-page-size-change="changeSize" show-elevator show-sizer show-total/>
        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            loading: true,//是否加载状态
            tableHeight: '',//table高度
            pageData:[],//分页数据
            pantectTotalSize: 200,//总数据
            page:1,
            size:20,
            flightValue:'',
            datevalue:'',
            columns: [
                {
                    type: 'selection',
                    width: 30,
                    align: 'center'
                },
                {
                    type: 'index',
                    title: '序号',
                    width: 70,
                    align: 'center'
                },
                {
                    title: '航班号',
                    key: 'flightInformation',
                    align: 'center',
                    ellipsis:true,
                    tooltip:true,
                },
                {
                    title: '航班日期',
                    key: 'takeOffDate',
                    align: 'center',
                    ellipsis:true,
                    tooltip:true,
                },
                {
                    title: '起飞时间',
                    key: 'takeOffTime',
                    align: 'center',
                    tooltip:true,
                    render: (h, params) => {
                        return h('div', [
                            params.row.takeOffTime.slice(0,5)
                        ]);
                    }
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
                    render: (h, params) => {
                        return h('div', [
                            params.row.arrivalTime.slice(0,5)
                        ]);
                    }
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
                    render: (h, params) => {
                        return h('div', [
                            params.row.status === 0 &&  h(
                                'span',
                                {
                                    props: {
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px',
                                        color: '#2d8cf0'
                                    },
                                },
                                '计划' 
                            ),
                            params.row.status === 1 &&  h(
                                'span',
                                {
                                    props: {
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px',
                                        color: 'red'
                                    },
                                },
                                '飞行' 
                            ),
                            params.row.status === 2 &&  h(
                                'span',
                                {
                                    props: {
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px',
                                        color: '#19be6b'
                                    },
                                },
                                '到达' 
                            ),
                            params.row.status === 3 &&  h(
                                'span',
                                {
                                    props: {
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px',
                                        color: '#19be6b'
                                    },
                                },
                                '延误' 
                            ),
                            params.row.status === 4 &&  h(
                                'span',
                                {
                                    props: {
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px',
                                        color: '#19be6b'
                                    },
                                },
                                '取消' 
                            ),
                        ]);
                    }
                },
            ],
            data: [],
            flightids:[]
        }
    },
    created() {
        var day = new Date();
        this.datevalue = day;
        this.getFlightData();  
    },
    methods:{
        getFlightData () {
            this.$axios.get('api/flight/queryAll')
            .then(data => {
                this.loading = false;
                if(data.data.code == 200){
                    this.data = data.data.data || [];
                    this.pantectTotalSize = data.data.data.length;
                    this.paging(this.data,this.page,this.size);
                }else {
                    this.$Message.error(data.data.msg);
                }
            }); 
        },
        // 控制表分页
        paging (number,page,size) {
            var startIndex = (page-1) * size;
            var endIndex = page * size;
            this.pageData = number.slice(startIndex,endIndex);
            if(this.pageData.length > 10){
                this.tableHeight = 520;
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
        },
        //修改航班
        updatedFlight (id) {
            console.log(id);
        },
        //按航班号搜索
        search () {
            var params = {
                flightInformation:this.flightValue,
                takeOffDate:this.datevalue,
            }
            this.$axios.post('api/flight/queryFlightInfo',params)
                .then(data => {
                    if(data.data.code == 200){
                        this.data = data.data.data || [];
                        this.pantectTotalSize = data.data.data.length;
                        this.paging(this.data,this.page,this.size);
                    }else {
                        this.$Message.error(data.data.msg);
                    }
                });
        },
        batchButton(flightids) {
            console.log(flightids);
            var params = {
                flightid:flightids,
                takeOffDate:'',
            }
            this.$axios.post('api/flight/deleteFlightInfo',params)
                .then(data => {
                    if(data.data.code == 200){

                    }else {
                        this.$Message.error(data.data.msg);
                    }
                });   
        },
        getFlightIds (value) {
            this.flightids = [];
            value.forEach(item => {
                this.flightids.push(item.flightId);
            });
            console.log(this.flightids);
        }
    },
}
</script>

<style lang="less" scoped>
.batch {
    margin-bottom: 10px;
    text-align: right;
}
.page {
    margin-top: 10px;
    text-align: center;
}
.search {
    text-align: center;
    margin-bottom: 15px;
}
</style>