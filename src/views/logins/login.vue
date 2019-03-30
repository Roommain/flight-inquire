<template>
    <div class="login">
        <div class="login-main">
            <div class="card">
                <!-- <h1>飞途登录</h1> -->
                <Form class="form" ref="formInline" :model="formInline" :rules="ruleInline" inline>
                    <FormItem prop="telPhone">
                        <Input type="text" size="large" v-model="formInline.telPhone" :maxlength="11" placeholder="手机号码" style="width: 300px">
                            <Icon type="ios-person-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem prop="password">
                        <Input type="password" size="large" v-model="formInline.password" placeholder="密码" style="width: 300px">
                            <Icon type="ios-lock-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <div class="login-memory-password">
                        <Checkbox @on-change="rememberValue" v-model="memoryPassword">&nbsp;&nbsp;记住密码</Checkbox>
                    </div>
                    <br>
                    <FormItem>
                        <Button class="login-button" type="primary" @click="handleSubmit('formInline')" style="width: 300px">登录</Button>
                    </FormItem>
                    <div class="login-register">
                        <!-- <router-link class="orget-the-password" to="findPassword" tag="span">忘记密码</router-link>
                        <router-link class="quick-registration" to="register" tag="span">快速注册</router-link> -->
                        <span class="orget-the-password" @click="findPassword">忘记密码</span>
                        <span class="quick-registration" @click="registerSubmit">快速注册</span>
                    </div>
                </Form>
            </div>   
        </div>
    </div>
</template>

<script>
import interlayer from '@/interlayer/interlayer'
import md5 from 'js-md5';
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
            localStorageMemory: '',
            memoryPassword: false, //记住密码
            userName:'',
            token: 1,
            formInline: {
                telPhone: '',
                password: ''
            },
            ruleInline: {
                telPhone: [
                    { required: true, message: '你的手机号码错误', trigger: 'blur' },
                    { validator: valphone, trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请正确输入密码', trigger: 'blur' },
                    { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
                ]
            }
        };
    },
    created(){
        this.getlocalStorage();
    },
    methods: {
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.rememberValue();
                    const params = {
                        telPhone : this.formInline.telPhone,
                        password : md5(this.formInline.password)
                    };
                    this.$axios
                        .post('api/user/login',params)
                        .then(data => {
                            if (data.data.code == 200) {
                                this.userName = data.data.data.userName;
                                this.$cookie.set('userName',this.userName);
                                this.$cookie.set('isAdmin',data.data.data.isAdmin);
                                this.$cookie.set('token',this.token);
                                this.closeLogin();
                                // this.$router.push({name: '首页'});
                            }else {
                                this.$Message.error(data.data.msg);
                            }
                        }).catch(() => {
                            this.$Message.error('登录失败');
                            return;
                        });
                } else {
                    this.$Message.error('账号密码有误');
                }
            })
        },
        registerSubmit () {
            this.$emit('register-change');
            interlayer.$emit('active-register');
        },
        findPassword () {
            this.$emit('findPassword-change');
        },
        closeLogin () {
            this.$emit('closeLogin-change',this.userName);
        },
        /**
         * 记住密码
         */
        rememberValue(value){
            if(this.memoryPassword == true) {
                localStorage.setItem('telPhone',this.formInline.telPhone);
                localStorage.setItem('password',this.formInline.password);
                localStorage.setItem('memoryPassword','true');
            }else {
                localStorage.setItem('password','');
                localStorage.setItem('memoryPassword','false');
            }
        },
        /**
         * 获取记住的账号密码
         */
        getlocalStorage () {
            this.formInline.telPhone = localStorage.getItem('telPhone');
            this.formInline.password = localStorage.getItem('password');
            this.localStorageMemory = localStorage.getItem('memoryPassword');
            if (this.localStorageMemory == 'true') {
                this.memoryPassword = true;
            }else {
                this.memoryPassword = false;
            }
        },

    }

};
</script>


<style lang="less" scoped>
.login {

    .card {
        width: 400px;
        padding: 20px;
        h1 {
            font-size: 20px;
        }
        .login-button {
            height: 40px;
            font-size: 16px;
        }
        .login-register {
            cursor: pointer;
        }
        .orget-the-password:hover {
            color: rgb(45, 140, 240);
        }
        .quick-registration:hover {
            color: rgb(45, 140, 240);
        }
    }

}
</style>

