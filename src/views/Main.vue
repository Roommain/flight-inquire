<template>
    <div class="main">
        <header class="header">
            <div class="main-logo">
              <img class="logo" src="../assets/images/fei.png" alt=""><span class="logo-title">飞途在线</span> 
            </div>
            <nav class="main-nav">
                <router-link tag="li" to="/mainShow" active-class="active"><Icon type="md-home"/>&nbsp;&nbsp;首页</router-link>
                <router-link tag="li" to="/attention"><Icon type="md-heart-outline"/>&nbsp;&nbsp;关注航班</router-link>
                <router-link tag="li" to="/weather"><Icon type="md-cloud" />&nbsp;&nbsp;了解天气</router-link>
                <router-link v-show="adminShow" tag="li" to="/addFlight"><Icon type="ios-create-outline"/>&nbsp;&nbsp;航班管理</router-link>
            </nav>
            <div class="main-user-message">
                <!-- <Icon type="md-notifications" /> -->
                <Icon type="md-person" />
                <Dropdown trigger="hover">
                    <a href="javascript:void(0)" @click="login">
                        {{userName || '登录/注册'}}
                        <Icon type="ios-arrow-down"/>
                    </a>
                    <DropdownMenu slot="list" v-show="logoutShow">
                        <DropdownItem>
                            <router-link to="userinfo" >我的信息</router-link>
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
        <Modal
            v-model="modalLogin"
            title="登录"
            :footer-hide=true
            width=400>
            <Login @register-change="registerChange" @closeLogin-change="getUserName" @findPassword-change="findPasswordChange"/>
        </Modal>
        <Modal
            v-model="modalRegister"
            title="快速注册"
            :footer-hide=true
            width=460>
            <Register @registerSuccess-change="alertLogin"/>
        </Modal>
        <Modal
            v-model="modalFindPassword"
            title="找回密码"
            :footer-hide=true
            width=600>
            <FindPassword @find-password="alertLogin"/>
        </Modal>
        <router-view class="main-iview"></router-view>
    </div>
</template>


<script>
import Login from '@/views/logins/login'
import FindPassword from '@/views/find-password/findPassword'
import Register from '@/views/register/register'
import interlayer from '@/interlayer/interlayer'
export default {
    components: {
        Login,
        Register,
        FindPassword,
    },
    data() {
        return {
            modalLogin: false,
            modalRegister: false,
            modalFindPassword: false,
            userName:'',
            isAdmin: '',
            adminShow: false,
            logoutShow: false,
        };
    },
    created(){
        this.getUserName();
        interlayer.$on('active', item => {
            this.userName = item;
            this.getUserName();
        })
    },
    methods:{
        /**
         * 登录
         */
        login() {
            if(this.userName == ''){
                this.modalLogin = true;
            }
        },
        /**
         * 登出
         */
        logout() {
            this.$axios
            .post('api/user/logout')
            .then(data => {
                if (data.data.code == 200) {
                    this.$cookie.remove('userName');
                    this.$cookie.remove('token');
                    this.$cookie.remove('isAdmin');
                    this.$router.push({ name: '首页' });
                    this.getUserName();
                }else {
                    this.$Message.error(data.data.msg);
                }
            }).catch(() => {
                this.$Message.error('退出失败');
                return;
            });
        },
        /**
         * 获取cookie，用户昵称
         */
        getUserName () {
            this.modalLogin = false;
            this.userName = this.$cookie.get('userName') || '';
            this.isAdmin = this.$cookie.get('isAdmin') || '';
            if(this.isAdmin == '1'){
                this.adminShow = true;
            }else {
                this.adminShow = false;
            }
            if (this.userName != '') {
                this.logoutShow = true;
            }else {
                this.logoutShow = false;
            }
        },
        registerChange () {
            this.modalLogin = false;
            this.modalRegister = true;
        },
        findPasswordChange () {
            this.modalLogin = false;
            this.modalFindPassword = true;         
        },
        alertLogin () {
            this.modalLogin = true;
            this.modalRegister = false;
            this.modalFindPassword = false;
        },
        // closeLogin (userName) {
        //     this.modalLogin = false;
        //     this.userName = userName;
        // }
    }
};
</script>

<style lang="less" scoped>
.main {

    height: 100%;
    li {
        list-style:none; 
    }
    .header {
        width: 100%;
        padding-right:30px;
        height: 66px;
        background-color: #444c58;
        display: block;
        .main-logo {
            float: left;
            width: 360px;
            padding: 0 51px;
            height: 66px;
            line-height: 66px;
            text-align: left;
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
            // margin-left: 50px;
            > li {
                height: 100%;
                padding: 0 40px;
                color: rgba(209, 209, 209, 1);
                float: left;
                font-size: 14px;
                width: 160px;
                cursor: pointer;
            }
            > li:hover {
                color:white;
            }
            .active {
                color:white;
            }
        }
        .main-user-message {
            float: right;
            color: rgba(209, 209, 209, 1);
            height: 100%;
            .ivu-icon-md-person {
                float: left;
                height: 100%;
                line-height: 66px;
                padding-right: 10px;
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
}
</style>

