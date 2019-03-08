<template>
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
        }
    },
    created() {
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
</style>



