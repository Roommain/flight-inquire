<template>
    <div class="statistical-main">
        <search @flight-data="flightData"/>
        <Card class="table">
            <Table stripe :loading="loading" :columns="columns" :data="pageData" :height="tableHeight"></Table>
            <div class="page">
                <Page :total="pantectTotalSize" :current=page :page-size="size" @on-change="changePage" @on-page-size-change="changeSize" show-elevator show-sizer show-total/>
            </div>
        </Card>
    </div>
</template>

<script>

import Search from '@/components/search';
export default {
    components: {
        Search,
    },
    data() {
        return {
            loading: true,
            tableHeight: '',

            takeOffDate: '',//起飞日期
            placeOfDeparture: '',//起飞城市
            placeOfDestination: '',//降落城市

            pageData:[],//分页数据
            pantectTotalSize: 200,//总数据
            page:1,
            size:20,
        
            columns: [
                {
                    title: '航班号',
                    key: 'flightInformation',
                    align: 'center',
                    ellipsis:true,
                    tooltip:true,
                    render: (h, params) => {
                        return h('div', [
                            h('Icon',{
                                props:{
                                    type: 'ios-plane'
                                },
                                style: {
                                    width: '34px',
                                    height: '34px',
                                    marginRight: '5px',
                                    color: '#fff',
                                    fontSize: '34px',
                                    backgroundColor: '#2D8CF0',
                                    borderRadius: '50%',
                                    textAlign: 'center',
                                    transform: 'rotate(-45deg)'
                                }
                            }),
                            params.row.flightInformation
                        ]);
                    }
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
                        ]);
                    }
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 100,
                    align: 'center',
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
                                            this.particulars(params);
                                        }
                                    }
                                },
                                '详情'
                            )
                        ]);
                    }
                }
            ],
            data: []
        }
    },
    created() {
        this.getFlightData();  
    },
    methods:{
        flightData (val) {
            this.data = val;
            this.pantectTotalSize = val.length;
            this.loading = false;
            this.paging(this.data,this.page,this.size);
        },
        getFlightData () {
            var searchParams = {
                takeOffDate: sessionStorage.getItem('takeOffDate'),
                placeOfDeparture: sessionStorage.getItem('placeOfDeparture'),
                placeOfDestination: sessionStorage.getItem('placeOfDestination'),
                flightInformation: sessionStorage.getItem('flightInformation'),
            }
            this.$axios.post('api/flight/queryFlightInfo',searchParams)
            .then(data => {
                this.loading = false;
                if(data.data.code == 200){
                    console.log(data.data.data);
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
        },
        particulars (params) {
            this.$router.push({
                name: '航班详情',
                params: {
                    flightId: params.row.flightId
                }
            });
        }
    },
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
    text-align: center;
}
</style>



