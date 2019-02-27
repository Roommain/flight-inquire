<template>
    <Card class="modify-password" data-automation="password">
        <Form
            class="modify-password-form utils-from-location-style"
            data-automation="modifyPwdForm"
            ref="modifyPwdForm"
            :model="modifyPwdForm"
            :rules="modifyPwdRule"
            :label-width="120"
        >
            <FormItem
                label="旧密码："
                prop="oldPass"
            >
                <Input
                    type="password"
                    v-model="modifyPwdForm.oldPass"
                    placeholder="请输入旧密码"
                />
            </FormItem>
            <FormItem
                label="新密码："
                prop="passwd"
            >
                <Input
                    type="password"
                    v-model="modifyPwdForm.passwd"
                    placeholder="请输入新密码"
                />
                <div class="password-strength">
                    <ul class="strength-bar">
                        <li :class="strength.left"></li>
                        <li :class="strength.center"></li>
                        <li :class="strength.right"></li>
                    </ul>
                </div>
            </FormItem>
            <FormItem
                label="确认新密码："
                prop="passwdCheck"
            >
                <Input
                    type="password"
                    v-model="modifyPwdForm.passwdCheck"
                    placeholder="请输入确认新密码"
                />
            </FormItem>
            <FormItem>
                <Button
                    class="utils-save-btn"
                    type="primary"
                    @click="handleSubmit('modifyPwdForm')"
                >保存</Button>
            </FormItem>
        </Form>
    </Card>
</template>

<script>

import md5 from 'js-md5';
export default {
    data() {
        const lengthlimit = '输入6至30个字符';
        // 旧密码自定义验证器
        const validateOldPass = (rule, value, callback) => {
            if (value.length < 6 || value.length > 30) {
                return callback(new Error(lengthlimit));
            }
            callback();
        };
        // 新密码自定义验证器
        const validatePass = (rule, value, callback) => {
            let strength = this.$rule.strength(value);
            let flag = this.setPasswdStrength(strength);
            if (flag === -1) {
                return callback(new Error(lengthlimit));
            }
            if (flag === 1) {
                return callback(new Error('密码太简单，建议密码由英文字母、数字或特殊符号组成'));
            }
            callback();
        };
        // 确认新密码自定义验证器
        const validatePassCheck = (rule, value, callback) => {
            if (value !== this.modifyPwdForm.passwd) {
                callback(new Error('两次输入的密码不一致'));
            } else {
                callback();
            }
        };
        return {
            // 修改密码表单绑定值
            modifyPwdForm: {
                oldPass: '',
                passwd: '',
                passwdCheck: ''
            },
            // 修改密码表单验证规则
            modifyPwdRule: {
                oldPass: [
                    { required: true, message: '请输入旧密码', trigger: 'blur' },
                    { validator: validateOldPass, trigger: 'blur' }
                ],
                passwd: [
                    { required: true, message: '请输入新密码', trigger: 'blur' },
                    { validator: validatePass, trigger: 'change' }
                ],
                passwdCheck: [
                    { required: true, message: '请输入新密码', trigger: 'blur' },
                    { validator: validatePassCheck, trigger: 'change' }
                ]
            },
            // 密码强度样式类名
            strength: {
                left: 'strength-left',
                center: 'strength-center',
                right: 'strength-right'
            }
        };
    },
    methods: {
        /**
         * 设置密码强度
         */
        setPasswdStrength(strength) {
            // 0 1 2 3级密码强度
            let strengthZero = {
                left: 'strength-left',
                center: 'strength-center',
                right: 'strength-right'
            };
            let strengthOne = {...strengthZero, left: 'strength-left left-reach'};
            let strengthTwo = {...strengthOne, center: 'strength-center center-reach'};
            let strengthThree = {...strengthTwo, right: 'strength-right right-reach'};
            if (strength === -1 || strength === 0) {
                this.strength = strengthZero;
                return -1;
            }
            if (strength === 1) {
                this.strength = strengthOne;
                return 1;
            }
            if (strength === 2) {
                this.strength = strengthTwo;
                return 2;
            }
            if (strength === 3) {
                this.strength = strengthThree;
                return 3;
            }
        },
        /**
         * 修改密码
         */
        handleSubmit(formName) {
            this.$refs[formName].validate((valid) => {
                if (!valid) {
                    this.$Message.error('保存失败!');
                }
                if (valid) {
                    // md5加密
                    const params = {
                        oldPwd: md5(this.modifyPwdForm.oldPass),
                        newPwd: md5(this.modifyPwdForm.passwd)
                    };
                    this.$http.post(this.$api.UPDATE_PWD, params).then(res => {
                        if (res.code !== 0) {
                            return this.$Message.error(res.message);
                        } else {
                            this.$Message.success(res.message);
                            this.logout(); // 暂定登出 后面掉vuex方法即可
                        }
                    });
                }
            });
        },
        /**
         * 登出
         */
        logout() {
            this.$http.get(this.$api.LOGOUT, null, true).then(res => {
                if (res.code) {
                    return;
                }
                //清空cookie
                this.$cookie.remove('token');
                this.$cookie.remove('refreshToken');
                this.$cookie.remove('tokenTime');
                this.$cookie.remove('dssap');
                this.$router.push({
                    path:'/login'
                });
            });
        }
    }
};
</script>

<style lang="less" scoped>
.modify-password {
    width: 480px;
    margin: 100px auto;
    padding-top: 20px;
    .modify-password-form {
        width: 420px;
    }

    .password-strength {
        width: 180px;
        margin-top: 8px;
        font-size: 12px;
        color: #666;
        text-align: center;

        ul {
            display: table;
            table-layout: fixed;
            width: 100%;

            li {
                display: table-cell;
            }
        }
        // 密码强度条样式
        .strength-bar {
            border: 1px solid #aaa;
            border-radius: 14px;
            background-color: #ccc;

            li {
                height: 12px;
                border: 2px solid #fff;
            }

            li.strength-left {
                border-left-width: 3px;
                border-top-left-radius: inherit;
                border-bottom-left-radius: inherit;
            }

            li.left-reach {
                background: #ec3701;
            }

            li.center-reach {
                background: #f78115;
            }

            li.right-reach {
                background: #6ba001;
            }

            li.strength-right {
                border-right-width: 3px;
                border-top-right-radius: inherit;
                border-bottom-right-radius: inherit;
            }
        }
    }
}
</style>

