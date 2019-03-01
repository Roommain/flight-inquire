<template>
    <div class="find-password">
        <div class="box">
            <p class="title">找回登录密码</p>
            <Steps :current=current>
                <Step title="输入账号" icon="ios-contact"></Step>
                <Step title="输入邮箱" icon="ios-mail"></Step>
                <Step title="完成" icon="ios-checkmark-circle"></Step>
            </Steps>
            <Form class="form" ref="formInlinePhone" :model="formInlinePhone" :rules="ruleInlinePhone" v-show="phoneShow" inline>
                <FormItem prop="telPhone">
                    <Input type="text" size="large" v-model="formInlinePhone.telPhone" placeholder="手机号码" style="width: 300px"></Input>
                </FormItem>
                <br>
                <FormItem>
                    <Button class="phone-button" type="primary" @click="handlePhoneSubmit('formInlinePhone')" style="width: 300px;height: 44px">确认</Button>
                </FormItem>
            </Form>
            <Form class="form" ref="formInlineEmail" :model="formInlineEmail" :rules="ruleInlineEmail" v-show="emailShow" inline>
                <FormItem prop="email">
                    <Input type="email" size="large" v-model="formInlineEmail.email" placeholder="邮箱" style="width: 300px"></Input>
                </FormItem>
                <br>
                <FormItem>
                    <Button class="email-button" type="primary" @click="handleEmailSubmit('formInlineEmail')" style="width: 300px;height: 44px">确认</Button>
                </FormItem>
            </Form>
            <div class="gain-button">
                <Button type="primary" @click="gainSubmit()" v-show="gainShow" style="width: 300px;height: 44px">重获密码</Button>
            </div>
        </div>
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
            current:0,
            phoneShow: true,
            emailShow: false,
            gainShow: false,
            formInlinePhone: {
                telPhone: '18223070173'
            },
            formInlineEmail: {
                email: '1182930079@qq.com'
            },
            ruleInlinePhone: {
                telPhone: [
                    { required: true, message: '你的手机号码错误', trigger: 'blur' },
                    { validator: valphone, trigger: 'blur' }
                ],
            },
            ruleInlineEmail: {
                email: [
                    { required: true, message: '请输入你的邮箱', trigger: 'blur' },
                    { type: 'email', message: '请正确输入邮箱', trigger: 'blur' }
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
                        this.$router.push({ name: '登录' });
                    }else {
                        this.$Message.error(data.data.msg);
                    }
                }).catch(() => {
                    this.$Message.error('找回失败');
                    return;
                });
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
    .box {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        width: 70%;
        height: 80%;
        .title {
        // text-align: center;
        // width: 500px;
        // margin: 20px auto;
        font-size: 20px;
        padding: 20px 0;
        }
        .form {
            width: 500px;
            margin: 50px auto;
        }
        .gain-button {
            width: 500px;
            margin: 60px auto;
        }
    }
}

</style>

