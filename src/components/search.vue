<template>
    <Card class="card">
        <div class="filtrate">
            <Select v-model="searchValue" size="large" @on-change="searchChange" style="width:200px;">
                <Option v-for="item in searchType" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <!-- 航班号查询 -->
            <Input v-show="flightNumShow" v-model="flightValue" prefix="ios-plane" size="large" placeholder="请输入航班号" style="width: auto" />
            <!-- 两地之间查询 -->
            <span v-show="cityShow">
                <City @city-change="cityChange" ref="city" style="width:200px"/>
                    <span class="change" @click="transform"><Icon type="md-swap" /></span>
                <City @city-change="cityChange2" ref="city2" style="width:200px"/>
            </span>
            <DatePicker type="date" v-model="datevalue" size="large" :options="options" placeholder="请选择日期" style="width: 220px"></DatePicker>
            <Button type="primary" @click="search">航班查询</Button>
        </div>
    </Card>
</template>

<script>
import City from '@/components/city';
import { getFullDate } from '@/libs/tools.js';
export default {
    components: {
        City,
    },
    data() {
        return {
            searchValue: '按航班号搜索',
            flightNumShow: true,
            cityShow: false,
            flightValue: '',
            departValue: '',
            arriveValue: '',
            datevalue: '',
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
        var day = new Date();
        this.datevalue = day;
        this.searchValue = sessionStorage.getItem('searchValue') || '按航班号搜索';
    },
    methods:{
        transform () {
            [this.departValue,this.arriveValue] = [this.arriveValue,this.departValue];
            this.childMethodChange();
        },
        search () {
            if(this.flightValue != '' || (this.departValue != '' && this.arriveValue != '')) {
                this.getFlightData ();
                return this.$router.push({ name: '数据' });
            }else {
                return this.$Message.warning('请输入搜索条件');
            }
            
        },
        cityChange (val) {
            this.departValue = val;
        },
        cityChange2 (val) {
            this.arriveValue = val;
        },
        searchChange () {
            console.log(this.searchValue);
            sessionStorage.setItem('searchValue',this.searchValue);
        },
        //搜索数据
        getFlightData () {
            var params = {
                takeOffDate: this.datevalue,
                placeOfDeparture: this.departValue,
                placeOfDestination: this.arriveValue,
                flightInformation: this.flightValue,
            }
            this.datevalue = getFullDate(this.datevalue,'year');
            sessionStorage.setItem('takeOffDate',this.datevalue);
            sessionStorage.setItem('placeOfDeparture',this.departValue);
            sessionStorage.setItem('placeOfDestination',this.arriveValue);
            sessionStorage.setItem('flightInformation',this.flightValue);

            this.$axios.post('api/flight/queryFlightInfo',params)
                .then(data => {
                    if(data.data.code == 200){
                        console.log(data);
                        var flightData = data.data.data || [];
                        this.$emit('flight-data',flightData);
                    }else {
                        this.$Message.error(data.data.msg);
                    }
                }); 
        },
        childMethodChange () {
            this.$refs.city.childMethod(this.departValue); 
            this.$refs.city2.childMethod(this.arriveValue); 
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
                this.departValue = '';
                this.arriveValue = '';
            }else if (this.searchValue == '按起降城市搜索') {
                this.flightNumShow = false;
                this.cityShow = true;
                this.flightValue = '';
            }
            this.childMethodChange();
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



