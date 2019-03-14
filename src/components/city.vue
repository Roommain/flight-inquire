<template>
    <AutoComplete
        v-model="value"
        size="large"
        placeholder="请输入城市"
        @on-change="cityChange"
        >
        <div class="city-box">
            <Tabs value="name1" size="small">
                <TabPane label="热门城市" name="name1" class="city">
                    <Option v-for="(item,index) in hotData" :key="index" :value="item.name">
                        <span>{{ item.name }}</span>
                    </Option>
                </TabPane>
                <TabPane label="ABCD" name="name2" class="city">
                    <Option v-for="(item1,index) in citysData.C" :key="index" :value="item1.name">
                        <span>{{ item1.name }}</span>
                    </Option>
                </TabPane>
                <TabPane label="EFGH" name="name3" class="city">
                    <Option v-for="(item,index) in citysData.F" :key="index" :value="item.name">
                        <span>{{ item.name }}</span>
                    </Option>
                </TabPane>
                <TabPane label="JKLM" name="name4" class="city">
                    <Option v-for="(item,index) in citysData.K" :key="index" :value="item.name">
                        <span>{{ item.name }}</span>
                    </Option>    
                </TabPane>
                <TabPane label="NOPQRS" name="name5" class="city">
                    <Option v-for="(item,index) in citysData.P" :key="index" :value="item.name">
                        <span>{{ item.name }}</span>
                    </Option>
                </TabPane>
                <TabPane label="TUVWXYZ" name="name6" class="city">
                    <Option v-for="(item,index) in citysData.Z" :key="index" :value="item.name">
                        <span>{{ item.name }}</span>
                    </Option>
                </TabPane>
            </Tabs>
        </div>
    </AutoComplete>
</template>
<script>
    export default {
        data () {
            return {
                value: '',
                hotData:[],
                citysData:[],
            }
        },
        created() {
            this.getCityInfo();
        },
        methods: {
            getCityInfo () {
                this.$axios.get('static/city.json')
                        .then(data => {
                            this.hotData = data.data.data.hotCities;
                            this.citysData = data.data.data.cities;
                        }).catch(() => {
                            this.$Message.error('获取城市失败');
                            return;
                        });
            },
            cityChange () {
                this.$emit('city-change',this.value);
            },
            childMethod (val) {
                this.value = val;
            }
        },
    }
</script>

<style lang="less" scoped>
.city-box {
    width: 400px;
    height: 200px;
    .city li{
        float: left;
        clear: none;
        font-size: 12px;
    }
}
</style>
