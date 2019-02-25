<template>
    <div class="login">
        <div class="login-main">
            <Card class="card">
                <h1>飞途登录</h1>
                <Form class="form" ref="formInline" :model="formInline" :rules="ruleInline" inline>
                    <FormItem prop="user">
                        <Input type="text" size="large" v-model="formInline.user" placeholder="手机号码" style="width: 300px">
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
                        <router-link class="orget-the-password" to="changePassword" tag="span">忘记密码</router-link>
                        <router-link class="quick-registration" to="register" tag="span">快速注册</router-link>
                    </div>
                </Form>
            </Card>   
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
            memoryPassword: false, //记住密码
            formInline: {
                user: '',
                password: ''
            },
            ruleInline: {
                user: [
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
        // this.memoryPassword = this.$cookie.getJSON('remember');
        // if(this.$cookie.getJSON('remember')){
        //     this.formLogin.userName = this.$cookie.getJSON('userName') || '';
        //     this.formLogin.password = this.$cookie.getJSON('dssap') || '';
        // }
    },
    methods: {
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    // alert(this.formInline.user);
                    if(this.formInline.user == '18223070173' && this.formInline.password == '111111'){
                        this.$router.push({ name: '数据' });
                        this.$Message.success('Success!');
                    }else {
                        alert('请检查账号密码是否正确');
                    }
                } else {
                    this.$Message.error('Fail!');
                }
            })
        },
        /**
         * 记住密码
         */
        rememberValue(value){
            this.$cookie.set('remember',value);
        },
    }

};
</script>


<style lang="less" scoped>
.login {
    width: 100%;
    height: 100%;
    font-size: 16px;
    background: url('../../assets/images/bg.jpg') no-repeat center/cover;
    .login-main {
        width: 100%;
        height: 100%; 
    }
    .card {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        width: 400px;
        height: 360px;
        padding: 20px;
        h1 {
            font-size: 20px;
        }
        .form {
            margin-top: 30px;
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

