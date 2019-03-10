<template>
    <div class="main-show">
        <Carousel class="icon" autoplay v-model="value" loop :autoplay-speed=5000>
            <CarouselItem>
                <div class="demo-carouse">
                    <img src="../../assets/images/bg.jpg" alt="">
                </div>
            </CarouselItem>
            <CarouselItem>
                <div class="demo-carouse">
                    <img src="../../assets/images/bg2.jpg" alt="">
                </div>
            </CarouselItem>
            <CarouselItem>
                <div class="demo-carouse">
                    <img src="../../assets/images/bg3.jpg" alt="">
                </div>
            </CarouselItem>
            <CarouselItem>
                <div class="demo-carouse">
                    <img src="../../assets/images/login/bg-login.jpg" alt="">
                </div>
            </CarouselItem>
        </Carousel>
        <div class="search">
            <Search />
        </div>
        <div class="select-box">
            <ul>
                <li>
                    <p class="title">精准预测起降时间</p>
                    <img src="../../assets/images/weather/ico_tt.png" alt="">
                    <p class="txt">精准预测航班起降时间，查询航班历史准点率情况</p>
                </li>
                <li>
                    <p class="title">航班天气分析</p>
                    <img src="../../assets/images/weather/ico_tw.png" alt="">
                    <p class="txt">专业智能的航班天气分析，通过数据深度剖析航班延误情况</p>
                </li>
                <li>
                    <p class="title">航班动态查询</p>
                    <img src="../../assets/images/weather/ico_th.png" alt="">
                    <p class="txt">提供准确可靠的航班起降、延误、取消等实时动态信息查询</p>
                </li>
                <li>
                    <p class="title">关注航班动态</p>
                    <img src="../../assets/images/weather/ico_tf.png" alt="">
                    <p class="txt">一键关注航班动态信息，帮助飞行旅客跟踪航班实时动态</p>
                </li>
            </ul>
        </div>
        <Footer/>
    </div>
</template>

<script>
import Search from '@/components/search';
import Footer from '@/components/footer';
export default {
    components: {
        Search,
        Footer,
    },
    data () {
        return {
            value: 0
        }
    }
}
</script>

<style lang="less" scoped>
.main-show {
    .icon {
        position: relative;
        .demo-carouse {
            width: 100%;
            height: 700px;
            img {
                width: 100%;
                height: 100%;
            }
        }
    }
    .search {
        position: absolute;
        width: 100%;
        // height: 100px;
        top: 300px;
    }
    .select-box {
        height: 300px;
        margin: 10px 50px;
        // background-color: aquamarine;
        ul {
            li {
                width: 25%;
                float: left;
                list-style: none;
                // line-height: 300px;
                text-align: center;
                .title {
                    padding-top: 50px;
                    padding-bottom: 20px;
                    font-size: 20px;
                    font-weight: 800;
                    color: #2d3133;
                }
                .txt {
                    padding: 20px 40px;
                    font-size: 16px;
                }
            }
        }
    }
}

</style>

