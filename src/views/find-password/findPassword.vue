<template>
    <div class="find-password">
        <Card class="box">
            <Breadcrumb class="title">
                <BreadcrumbItem to="/login">登录</BreadcrumbItem>
                <BreadcrumbItem to="/findPassword">找回登录密码</BreadcrumbItem>
            </Breadcrumb>
            <Steps :current=current>
                <Step title="输入账号" icon="ios-contact"></Step>
                <Step title="输入邮箱" icon="ios-mail"></Step>
                <Step title="重获密码" icon="ios-construct"></Step>
                <Step title="操作完成" icon="ios-checkmark-circle"></Step>
            </Steps>
            <Form class="form" ref="formInlinePhone" :model="formInlinePhone" :rules="ruleInlinePhone" v-show="phoneShow" inline>
                <FormItem prop="telPhone">
                    <Input type="text" size="large" v-model="formInlinePhone.telPhone" :maxlength="11" placeholder="手机号码" style="width: 300px"></Input>
                </FormItem>
                <br>
                <FormItem>
                    <Button class="phone-button" type="primary" @click="handlePhoneSubmit('formInlinePhone')" style="width: 300px;height: 44px">确认</Button>
                </FormItem>
            </Form>
            <Form class="form" ref="formInlineEmail" :model="formInlineEmail" :rules="ruleInlineEmail" v-show="emailShow" inline>
                <FormItem prop="email">
                    <AutoComplete
                        v-model="formInlineEmail.email"
                        class="autocomplete"
                        @on-search="emailHandleSearch"
                        placeholder="请输入邮箱"
                        size="large"
                        style="width: 300px">
                        <Option v-for="item in emailData" :value="item" :key="item">{{ item }}</Option>
                    </AutoComplete>
                    <!-- <Input type="email" size="large" v-model="formInlineEmail.email" placeholder="邮箱" style="width: 300px"></Input> -->
                </FormItem>
                <br>
                <FormItem>
                    <Button class="email-button" type="primary" @click="handleEmailSubmit('formInlineEmail')" style="width: 300px;height: 44px">确认</Button>
                </FormItem>
            </Form>
            <div class="gain-button">
                <Button type="primary" @click="gainSubmit()" v-show="gainShow" style="width: 300px;height: 44px">重获密码</Button>
            </div>
            <div class="hint" v-show="hintShow">
                <p>{{hint}}</p>
                <Button class="again-button" type="primary" v-show="againShow" @click="againSubmit()" style="width: 100px">点我重新输入</Button>
                <Button class="again-button" type="primary" v-show="loginShow" @click="loginSubmit()" style="width: 100px">点我前往登录</Button>
            </div>
        </Card>
    </div>
</template>

<script>
export default {
    data() {
        const valphone = (rule, value, callback) => {
            if (!/^1[3-9]\d{9}$/.test(value)) {
                callback(new Error('请正确输入电话号码'));
            } else {
                callback();
            }
        };
        return {
            emailData: [],
            current:0,
            phoneShow: true,
            emailShow: false,
            gainShow: false,
            hintShow: false,
            againShow: false,
            loginShow: false,
            hint: '正在处理，请等待。。。',
            formInlinePhone: {
                telPhone: ''
            },
            formInlineEmail: {
                email: ''
            },
            ruleInlinePhone: {
                telPhone: [
                    { required: true, message: '你的手机号码错误', trigger: 'blur' },
                    { validator: valphone, trigger: 'change' }
                ],
            },
            ruleInlineEmail: {
                email: [
                    { required: true, message: '请输入你的邮箱', trigger: 'blur' },
                    { type: 'email', message: '请正确输入邮箱', trigger: 'change' }
                ],
            }
        }
    },
    methods: {
        handlePhoneSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$Message.success('成功');
                    this.current = 1;
                }
            })
        },
        handleEmailSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$Message.success('成功');
                    this.current = 2;
                }
            })
        },
        gainSubmit () {
            this.current = 3;
            this.hintShow = true;
            this.$Message.success('成功');
            const params = {
                telPhone: this.formInlinePhone.telPhone,
                email: this.formInlineEmail.email,
            }
            this.$axios.post('api/user/findPassword',params)
                .then(data => {
                    console.log(data);
                    if (data.data.code == 200) {
                        this.$Message.success(data.data.msg);
                        this.$cookie.remove('userName');
                        this.$cookie.remove('token');
                        this.hint = data.data.msg;
                        this.loginShow = true;
                    }else {
                        this.hint = data.data.msg;
                        this.againShow = true;
                    }
                }).catch(() => {
                    this.$Message.error('找回失败');
                    this.againShow = true;
                    return;
                });
        },
        againSubmit () {
            this.phoneShow = true;
            this.emailShow = false;
            this.gainShow = false;
            this.hintShow = false;
            this.againShow = false;
            this.hint = '正在处理，请等待。。。';
            this.current = 0;
        },
        loginSubmit () {
            this.$router.push({ name: '登录' });
        },
        emailHandleSearch (value) {
            this.emailData = !value || value.indexOf('@') >= 0 ? [] : [
                value + '@qq.com',
                value + '@foxmail.com',
                value + '@163.com'
            ];
        }
    },
    watch: {
        current: function () {
            if(this.current == 0){
                this.phoneShow = true;
                this.emailShow = false;
            }else if (this.current == 1) {
                this.phoneShow = false;
                this.emailShow = true;
            }else if (this.current == 2) {
                this.phoneShow = false;
                this.emailShow = false;
                this.gainShow = true;
            }else if (this.current == 3) {
                this.phoneShow = false;
                this.emailShow = false;
                this.gainShow = false;
            }
        },
    }
    
}
</script>

<style lang="less" scoped>
.find-password {
    width: 100%;
    height: 100%;
    font-size: 16px;
    background: url('../../assets/images/bg.jpg') no-repeat center/cover;
    .box {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        width: 700px;
        height: 400px;
        // border: 1px solid red;
        background-color: white;
        .title {
        font-size: 18px;
        padding: 20px 0;
        }
        .form {
            margin-top: 50px;
            text-align: center;
            .autocomplete {
                text-align: left;
            }
        }
        .gain-button {
            margin-top: 80px;
            text-align: center;
        }
        .hint {
            margin-top: 20px;
            text-align: center;
        }
        .again-button {
            margin-top: 20px;
        }
    }
}

</style>

