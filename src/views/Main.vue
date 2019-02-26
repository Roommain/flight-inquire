<template>
    <div class="main">
        <header class="header">
            <div class="main-logo">
              <img class="logo" src="../assets/images/fei.png" alt=""><span class="logo-title">飞途在线</span> 
            </div>
            <nav class="main-nav">
                <router-link tag="li" to="main"><Icon type="md-home"/>&nbsp;&nbsp;首页</router-link>
                <router-link tag="li" to="attention"><Icon type="md-heart-outline"/>&nbsp;&nbsp;关注我们</router-link>
                <router-link tag="li" to="flightManage"><Icon type="ios-create-outline"/>&nbsp;&nbsp;航班管理</router-link>
            </nav>
            <div class="main-user-message">
                <Icon type="md-notifications" />
                <Dropdown trigger="hover">
                    <a href="javascript:void(0)">
                        {{userName || '登录/注册'}}
                        <Icon type="ios-arrow-down"/>
                    </a>
                    <DropdownMenu slot="list">
                        <DropdownItem>
                            <router-link to="userinfo">我的信息</router-link>
                        </DropdownItem>
                        <DropdownItem>
                            <router-link to="changePassword">修改密码</router-link>
                        </DropdownItem>
                        <DropdownItem>
                            <div @click="logout">退出</div>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </header>
        <router-view class="main-iview"></router-view>
    </div>
</template>


<script>
export default {
    data() {
        return {
            userName:'',
        };
    },
    created(){
        // this.getUserMessage();
        this.userName = this.$cookie.get('userName');
    },
    methods:{
        /**
         * 登出
         */
        logout(){
            this.$http.get(this.$api.LOGOUT,null,true).then(res=>{
                if(res.code){
                    return;
                }
                //清空cookie
                this.$cookie.remove('token');
                this.$cookie.remove('refreshToken');
                this.$cookie.remove('tokenTime');
                this.$cookie.remove('dssap');
                window.location.href='/#/login';
                this.$store.commit('setBMapStatus',false);//将地图清除
                
            });
        },
        // /**
        //  * 获取信息
        //  */
        // getUserMessage(){
        //     this.$store.dispatch('getUserMessage').then(res => {
        //         this.userName = res.data.username;
        //     });
        // }
    }
};
</script>

<style lang="less">
.main {

    height: 100%;
    li {
        list-style:none; 
    }
    .header {
        padding-right:30px;
        height: 66px;
        background-color: #444c58;
        display: block;
        .main-logo {
            float: left;
            width: 260px;
            padding: 0 51px;
            height: 66px;
            line-height: 66px;
            text-align: center;
            .logo {
                height: 50px;
                margin-top: 8px;
            }
            .logo-title {
              vertical-align: 30%;
              font-size: 16px;
              color: rgba(209, 209, 209, 1);
              
            }            
        }
        .main-nav {
            float: left;
            overflow: hidden;
            height: 100%;
            line-height: 66px;
            > li {
                height: 100%;
                padding: 0 20px;
                color: rgba(209, 209, 209, 1);
                float: left;
                font-size: 14px;
                width: 120px;
                cursor: pointer;
            }
            > li:hover {
                color:white;
            }
        }
        .main-user-message {
            float: right;
            color: rgba(209, 209, 209, 1);
            height: 100%;
            .ivu-icon-md-notifications {
                float: left;
                height: 100%;
                line-height: 66px;
                padding-right: 20px;
                font-size: 18px;
                color: rgba(209, 209, 209, 1);
                cursor: pointer;
            }
            .ivu-dropdown {
                text-align: center;
                font-weight: 600;
                height: 100%;
                float: left;
                .ivu-dropdown-rel {
                    > a {
                        height: 100%;
                        line-height: 66px;
                        display: block;
                        color: rgba(209, 209, 209, 1);
                    }
                }
                a {
                    color: #495060;
                }
            }
        }
    }
    // .main-iview {
    //     display: block;
    //     height: 100%;
    // }
}
</style>

