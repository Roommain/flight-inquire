<template>
  <div class="register">
    <div class="register-main">
      <Card class="card">
          <h1>快速注册</h1>
          <Form class="form" ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="用户名" prop="userName">
                <Input size="large" v-model="formValidate.userName" placeholder="请输入你的用户名"></Input>
            </FormItem>
            <FormItem label="E-mail" prop="email">
                <Input size="large" v-model="formValidate.email" placeholder="请输入你的e-mail"></Input>
            </FormItem>
            <FormItem label="手机号码" prop="telPhone">
                <Input size="large" v-model="formValidate.telPhone" placeholder="请输入你的手机号码"></Input>
            </FormItem>
            <FormItem label="密码" prop="password">
                <Input type="password" size="large" v-model="formValidate.password" placeholder="请输入你的密码"></Input>
            </FormItem>                 
            <FormItem>
                <Button class="register-button" type="primary" @click="handleSubmit('formValidate')" style="width: 110px">注册</Button>
                <Button class="register-button" @click="handleReset('formValidate')" style="margin-left: 8px;width: 110px">重置</Button>
            </FormItem>
            <div class="">
                <router-link class="register-login" to="login" tag="span">前往登录</router-link>
            </div>
        </Form>
      </Card>   
    </div>
  </div>
</template>

<script>
export default {
  name: 'register',
    data () {
      const valphone = (rule, value, callback) => {
          if (!/^1[3-9]\d{9}$/.test(value)) {
              callback(new Error('请正确输入电话号码'));
          } else {
              callback();
          }
      };
      return {
          formValidate: {
              userName: '',
              email: '',
              telPhone: '',
              password: ''
          },
          ruleValidate: {
              userName: [
                  { required: true, message: '请输入你的用户名称', trigger: 'blur' }
              ],
              email: [
                  { required: true, message: '请输入你的邮箱', trigger: 'blur' },
                  { type: 'email', message: '请正确输入邮箱', trigger: 'blur' }
              ],
              telPhone: [
                  { required: true, message: '请输入你的手机号码', trigger: 'blur' },
                  { validator: valphone, trigger: 'blur' }
              ],
              password: [
                  { required: true, message: '请输入你的密码', trigger: 'blur' },
                  { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
              ],
          }
      }
  },
  methods: {
      handleSubmit (name) {
          this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$axios
                        .post('api/user/register',this.formValidate)
                        .then(data => {
                            console.log(data);
                            if (data.data.code == 200) {
                                this.$Message.success('注册成功，前往登录');
                                this.$router.push({ name: '登录' });
                                
                            }else {
                                this.$Message.error(data.data.msg);
                            }
                        });
                } else {
                    this.$Message.error('Fail!');
                }
          })
      },
      handleReset (name) {
          this.$refs[name].resetFields();
      }
  }
}
</script>

<style  lang="less" scoped>
.register {
    width: 100%;
    height: 100%;
    font-size: 16px;
    background: url('../../assets/images/bg.jpg') no-repeat center/cover;
    .register-main {
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
        height: 450px;
        padding: 20px;
        h1 {
            font-size: 20px;
        }
        .form {
            margin-top: 30px;
        }
        .register-button {
            height: 40px;
            font-size: 16px;
        }
        .register-login {
           cursor: pointer;
        }
        .register-login:hover {
          color: rgb(45, 140, 240);
        }
    }
}
</style>