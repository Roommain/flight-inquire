<template>
    <div class="user-message">
        <div class="user-message-header utils-menu-header-style">
            <h2 class="user-header">
                <span>我的个人</span>
            </h2>
            <div class="user-menu-bar">
                <Menu
                    @on-select="selectMenu"
                    :active-name="activeName"
                    width="320px"
                >
                    <MenuItem name="/userinfo"><Icon type="md-contact" />&nbsp;我的信息</MenuItem>
                    <MenuItem name="/changePassword"><Icon type="md-lock" />&nbsp;修改密码</MenuItem>
                </Menu>
            </div>
        </div>
        <div class="user-view">
            <h2 class="utils-view-header-style">
                {{$route.name}}
            </h2>
            <router-view class="user-main-view"></router-view>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeName:'/userinfo'
        };
    },
    created() {
        this.selectRouter();
    },
    methods: {
        /**
         * 跳转路由
         */
        selectMenu(name){
            if (!name) {
                return;
            }
            this.$router.push({path:name});
        },
        /**
         * 选择路由跳转
         */
        selectRouter() {
            this.activeName = this.$route.path;
        }
    },
    watch: {
        $route() {
            this.selectRouter();
        }
    }
};
</script>

<style lang="less">
.user-message {
    // width: 100%;
    // height: 100%;
    .user-header {
        padding-left: 30px;
        color: #26342e;
        font-size: 16px;
        height: 50px;
        border-bottom: 1px solid #ddd;
        line-height: 50px;
    }
    .user-message-header {
        position: absolute;
        top: 66px;
        left: 0;
        width: 360px;
        height: calc(100vh - 67px);
        border-right: 1px solid #ddd;
        background-color: #eff2f7;

        .user-menu-bar {
            height: calc(100vh - 120px);
            padding: 20px;
            overflow: auto;
        }
    }
    .utils-view-header-style {
        height: 50px;
        border-bottom: 2px solid #2d8cf0;
        line-height: 50px;
        font-size: 16px;
        color: #26342e;
    }
    .user-view {
        height: calc(100vh - 67px);
        margin-left: 360px;
        padding: 0 20px 0 40px;
        overflow: auto;
        background-color: #fff;

        .user-main-view {
            padding: 22px 0 22px 22px;
        }
    }
}
</style>

