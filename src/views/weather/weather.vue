<template>
    <div class="weather">
        <video width="100%"  class="video" loop="loop" autoplay="autoplay" muted="muted">
            <source src="http://cdn.moji.com/websrc/video/winter20181129.mp4" type="video/mp4">
            <!-- <source src="@/assets/images/weather/winter20181129.mp4" type="video/mp4"> -->
        </video>
        <div class="card">
            <p><input class="input" v-model="city" @keyup.enter="submit" placeholder="请输入城市然后按下Enter" /></p>
            <div class="week">
                <div v-for="(item, index) in weatherData" :key="index">
                    <p>{{item.week}}</p>
                    <p>{{item.date}}</p>
                    <p>{{item.temperature}}</p>
                    <P><img :src=newStatus(item.weather) alt=""></P>
                    <!-- <P><img src="@/assets/images/weather/w7.png" alt=""></P> -->
                    <p>{{item.weather}}</p>
                    <p>{{item.wind}}</p>
                </div>
            </div>
        </div>
        <div class="today-wea">
            <p class="today-title">这里是<Icon type="md-pin" size="20" color="#2D8CF0" /><span class="today-city">{{todayWeaData.city}}</span> </p>
            <p>今天是 <span>{{todayWeaData.date_y}}</span> <span>{{todayWeaData.week}}</span> </p>
            <p>当地温度 <span>{{todayWeaData.temperature}}</span> <span>{{todayWeaData.dressing_index}}</span> </p>
            <P><img :src=newStatus(todayWeaData.weather) alt=""></P>
            <p class="suggest"><span>{{todayWeaData.dressing_advice}}</span> </p>
        </div>
        <div class="wea">
            <p class="title">天气改变命运</p>
            <p>Weather Change Your Destiny</p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            city:'重庆',
            weatherData: {
                day1: {date: '2019/3/09',temperature: '9℃~15℃',weather: '晴',week: '星期六',wind: '微风'},
                day2: {date: '2019/3/10',temperature: '9℃~15℃',weather: '阴转多云',week: '星期日',wind: '微风'},
                day3: {date: '2019/3/11',temperature: '9℃~15℃',weather: '阴转多云',week: '星期一',wind: '微风'},
                day4: {date: '2019/3/12',temperature: '9℃~15℃',weather: '阴转多云',week: '星期二',wind: '微风'},
                day5: {date: '2019/3/13',temperature: '9℃~15℃',weather: '阴转多云',week: '星期三',wind: '微风'},
                day6: {date: '2019/3/14',temperature: '9℃~15℃',weather: '阴转多云',week: '星期四',wind: '微风'},
                day7: {date: '2019/3/15',temperature: '9℃~15℃',weather: '阴转多云',week: '星期五',wind: '微风'},
            },
            todayWeaData: {
                city: "重庆",
                date_y: "2019年03月15日",
                dressing_advice: "建议着厚外套加毛衣等服装。年老体弱者宜着大衣、呢外套加羊毛衫。",
                dressing_index: "较冷",
                temperature: "11℃~14℃",
                weather: "小雨转阴",
                week: "星期五",
                wind: "持续无风向微风",
            }
        }
    },
    computed:{
        /**
        * 封装进行状态修改的方法
        * @param {Object} obj 当前渲染的对象
        */
        newStatus(){
            return function(obj) {
                if(obj == '晴'){
                    return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACgCAYAAACLz2ctAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyppVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUuNSAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowREQ1MEI1QUU0NzMxMUU2OTJEOUIwMzFCMUJDRjBCRCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDowREQ1MEI1QkU0NzMxMUU2OTJEOUIwMzFCMUJDRjBCRCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjBERDUwQjU4RTQ3MzExRTY5MkQ5QjAzMUIxQkNGMEJEIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjBERDUwQjU5RTQ3MzExRTY5MkQ5QjAzMUIxQkNGMEJEIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+H4IpdAAADIVJREFU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';
                }
                 else if (obj == '阴转多云' || obj == '多云') {
                    return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACgCAYAAACLz2ctAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyppVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUuNSAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo0RjFENjkwM0U0NzUxMUU2OTJEOUIwMzFCMUJDRjBCRCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo0RjFENjkwNEU0NzUxMUU2OTJEOUIwMzFCMUJDRjBCRCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjRGMUQ2OTAxRTQ3NTExRTY5MkQ5QjAzMUIxQkNGMEJEIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjRGMUQ2OTAyRTQ3NTExRTY5MkQ5QjAzMUIxQkNGMEJEIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+aQeCMQAAERtJREFU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';
                } else if (obj == '阴') {
                    return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACgCAYAAACLz2ctAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyppVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUuNSAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo0RjFENjhGRkU0NzUxMUU2OTJEOUIwMzFCMUJDRjBCRCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo0RjFENjkwMEU0NzUxMUU2OTJEOUIwMzFCMUJDRjBCRCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjRGMUQ2OEZERTQ3NTExRTY5MkQ5QjAzMUIxQkNGMEJEIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjRGMUQ2OEZFRTQ3NTExRTY5MkQ5QjAzMUIxQkNGMEJEIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+YL0CfAAADT9JREFU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';
                } else if (obj == '多云转阴') {
                    return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACgCAYAAACLz2ctAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyppVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUuNSAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo4NkQ1NTA5OEU0NzUxMUU2OTJEOUIwMzFCMUJDRjBCRCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo4NkQ1NTA5OUU0NzUxMUU2OTJEOUIwMzFCMUJDRjBCRCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjRGMUQ2OTA1RTQ3NTExRTY5MkQ5QjAzMUIxQkNGMEJEIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjRGMUQ2OTA2RTQ3NTExRTY5MkQ5QjAzMUIxQkNGMEJEIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+CN0rUgAAEKdJREFU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';
                } else {
                    return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAMAAAAOusbgAAAAdVBMVEVMaXH19fV/3//////////+/v76+vrr6+v////////v7+////////+F2f/////z8/Ps7Ozt7e38/Pzw8PCF2v+D2/+F2v+F2f+E2v+F2v+E2f+E2f////+H1//////s7OyE2v/////t7e2F2v/9/f339/fw8PAn+v2MAAAAIXRSTlMAmBAQYDAgQEDvEIDfv79W78mieHpAz++vmDBbryDP39+ERGrqAAACSElEQVR42u3X246bMBCAYTsG1pwTIBvYHLa2Q9//EdtVpIxUSOvDDFUr/5e5+eKxDQmLxWKxWCz2r5e1Zdk0DS+TdENVdpWC8kuyDZs8VbBLQc62D3ZJ07Liol51o9zsNFe/KaHbXXBX41Su+lPdxnOGegJX5MoiiQ83yqZckG8w/TanUspMVMoyiWKWTa4ca4LVrKyUT1kg2ynPeJBb5sq3PGS5NxVQXwQ8o0KaNc82dQHWui+2d9Vd/+wzdd5fcH3TX+1bR/imwuFHbnKpEGAPOVOIsH6zhxtUeF/YuimGe9fPOlu4Q4Jdhy0URrOGDnZwggJ/185L7vBhbgVXWJOG9lawQoJdZy3xzjTUbwDDgh3PdYuyYA+4RDzS0DbXeNY+sEQeND0Mrh8sQl3YYMcnSIW1XtfXxAXpXDk/rBO0MUM96fv4PutXZcymCzarP5lV0gOdYcjOk4aakLMEuf/OlB53J2TBEN92wZCoEF3dOv1LxRs0Zy4lnk+LZYeChcj0Lsj5ti6UVuH724HrkOAvWct71DPPZLPqznZj5hnzT3aL1dqxe2A9E0lXuaoH3hYMJfnoza6CxWKeXa9spQ9ydzATW7QbzZHYnYypl0N4N2ag8WBlxpwWYz4ZYyZS9918teaamt41u4ULMKVrjgsXYDIXYHAfUZ7nJbz7Zqjhq1mDB0MOn4E4w6cjPTwAMcCn9X+84h0Qu7WvMxK+HWDS0POOfTDq+zSt3e7TmRF2HOt6PP66BUNd19OVxWKxWCwWi8Vif7UfVqUcqYdw8egAAAAASUVORK5CYII=';
                }
            };
        }
    },
    methods: {
        submit () {
            // this.$axios.get('/wea/index?key=db56c2d4874ec941e15710323df153e4&cityname='+this.city)
            this.$axios.get('/wea/index',{
                params:{
                    key:'db56c2d4874ec941e15710323df153e4',
                    cityname:this.city
                }
            })
            .then(data => {
                console.log(data.data.result.future);
                this.weatherData = data.data.result.future;
                this.todayWeaData = data.data.result.today;
            })
            .catch(() => {
                this.$Message.error('请求失败');
                return;
            })
            ;
        }
    },

}
</script>

<style lang="less" scoped>
.weather {
    position: relative;
}
.video {
    position: fixed;
    width: 100%;
    height: 100%;
    object-fit: fill;
}
.card {
    position: absolute;
    top: 40px;
    right: 10px;
    width: 650px;
    height: 300px;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 5px;
    p{
        border-radius: 10px;
        margin: 5px 50px;
    }
    .input {
        padding-left: 20px;
        background-color: rgba(0, 0, 0, 0.5);
        border: 0;
        width: 100%;
        height: 30px;
        outline: none;
        color: white;
        border-radius: 10px;
    }
    .week {
        display: flex;
        justify-content:center;
        flex-wrap: nowrap;
        width: 100%;
        height: 250px;
        font-size: 14px;
        color: white;
        div {
            width: 20%;
            border-right: 1px solid rgb(189, 187, 187);
            flex: auto;
            p {
                width: 100%;
                margin: 0;
                text-align: center;
                padding-top: 10px;
            }
            img {
                width: 40px;
            }
        }
        div:nth-child(7) {
            border: none;
        }
        p:nth-child(6) {
            font-size: 12px;
            margin-top: 20px;
        }
    }
}
.wea {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 500px;
    height: 100px;
    border-radius: 5px;
    p {
        font-size: 24px;
        color: white;
        text-align: center;
        line-height: 50px;
    }
    .title {
            letter-spacing:20px;
    }
}
.today-wea {
    position: absolute;
    top: 40px;
    right: 700px;
    width: 500px;
    height: 400px;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    text-align: center;
    font-size: 16px;
    border-radius: 5px;
    line-height: 50px;
    .today-title {
        padding: 10px 0;
        font-size: 18px;
        color: rgba(209, 209, 209, 1);
    }
    .today-city {
        color: antiquewhite;
        font-size: 24px;
    }
    .suggest {
        font-size: 12px;
    }
    img {
        width: 140px;
    }
}
</style>