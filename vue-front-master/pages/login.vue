<template>
  <div>
        <div class="login-box">
            <h3 class="title">忆心-基于循环神经网络（LSTM）的心理健康平台</h3>
            <div class="login-form">
                <div class="head">
                     <div class="tags" v-show="showLogin">
                        <div class="tag js-tab active" @click="changeLogin()">登录</div>
                        <div class="tag js-tab" @click="changeLogin()">注册</div>
                    </div>
                </div>

                <div class="head" v-show="!showLogin">
                     <div class="tags">
                        <div class="tag js-tab" @click="changeLogin()">登录</div>
                        <div class="tag js-tab active" @click="changeLogin()">注册</div>
                    </div>
                </div>
                <!-- 登录部分 -->
                <div class="body" v-show="showLogin">
                    <div class="input-group">
                        <input type="text" v-model="userInfo.mobile" placeholder="账号" class="input-wapper" :class="{'error':formRules.cac}" :key="1"/>
                    </div>
                    <p class="phone-tip" v-show="formRules.cac">请输入11位电话号码</p>
                    <div class="input-group">
                        <input type="password" v-model="userInfo.password" placeholder="密码" class="input-wapper" :class="{'error':formRules.cpw}"/>
                    </div>
                    <p class="password-tip" v-show="formRules.cpw">请输入6位及以上数字与字母组成的密码</p>
                    <button class="login-btn" @click="submitLogin">点击登录</button>
                    <span class="forget">忘记密码</span>
                    <div class="cut-line"></div>
                </div>
                <div class="bottom" v-show="showLogin">
                    <h4 class="bottom-title">第三方登录</h4>
                    <ul class="svg">
                        <li>
                            <img src="~/assets/imges/qq.svg" alt="">
                            <div class="ni">QQ</div>
                        </li>
                        <li>
                            <img src="~/assets/imges/weixin.svg" alt="">
                            <div class="ni">微信</div>
                        </li>
                    </ul>
                </div>
                <!-- 注册部分 -->
                <div class="body" v-show="!showLogin">
                    <div class="input-group">
                        <input type="text" v-model="userInfo.nickName" placeholder="昵称" class="input-wapper" :class="{'error':formRules.cna}"/>
                    </div>
                    <p class="nickname-tip" v-show="formRules.cna">请输入2到6字中文昵称</p>
                    <div class="input-group">
                        <input type="password" v-model="userInfo.mobile" placeholder="账号" class="input-wapper" :class="{'error':formRules.cac}" :key='2'/>
                    </div>
                    <p class="phone-tip" v-show="formRules.cac">请输入11位电话号码</p>
                    <div class="input-group">
                        <input type="password" v-model="userInfo.password" placeholder="密码" class="input-wapper" :class="{'error':formRules.cpw}"/>
                    </div>
                    <p class="password-tip" v-show="formRules.cpw">请输入6位及以上密码</p>
                    <div class="input-group">
                        <input type="password" v-model="userInfo.code" placeholder="输入6位验证码" class="input-wapper code" :class="{'error':formRules.cco}"/>
                        <a href="#" class="codeBtn" @click="getCodeFun()" :value="codeText">{{codeText}}</a>
                    </div>
                    <p class="code-tip" v-show="formRules.cco">验证码错误</p>
                    <div class="agree-tip">
                        <input type="checkbox"/>同意《忆心用户协议》
                    </div>
                    <button class="login-btn" v-show="showLogin" @click="submitLogin()">点击登录</button>
                    <button class="login-btn" v-show="!showLogin" @click="submitRegister()">点击注册</button>
                    <span class="forget">忘记密码</span>
                    <div class="cut-line"></div>
                </div>
                <div class="bottom" v-show="!showLogin">
                    <h4 class="bottom-title">第三方登录</h4>
                    <ul class="svg">
                        <li>
                            <img src="~/assets/imges/qq.svg" alt="">
                            <div class="ni">QQ</div>
                        </li>
                        <li>
                            <img src="~/assets/imges/weixin.svg" alt="">
                            <div class="ni">微信</div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
import registerApi from '@/api/register.js'
import loginApi from '@/api/login.js'
import cookie from 'js-cookie'

export default {
    data() {
        return {
            userInfo: {},
            showLogin: false,
            formRules: {
                cac: false,
                cpw: false,
                cna: false,
                cco: false
            },
            codeText: '获取验证码',
            sending: true,      //是否发送验证码
            second: 60     //倒计时间
        }
    },
    methods: {
        getCodeFun() {
            if(this.checkPhone()){
                registerApi.sendCode(this.userInfo.mobile)
                    .then(response => {
                        this.sending = false
                        this.timeDown()
                    })
            }
        },
        timeDown() {

            let result = setInterval(() => {
            --this.second;
            this.codeText = this.second
            if (this.second < 1) {

                clearInterval(result);
                this.sending = true;
                //this.disabled = false;
                this.second = 60;
                this.codeText = "获取验证码"
            }
            }, 1000);
        },
        changeLogin() {
            this.showLogin = !this.showLogin
            this.userInfo = {}
        },
        checkNickName() {
            const cnickname = /^[\u4e00-\u9fa5]{2,6}$/
            if(!cnickname.test(this.userInfo.nickName)) {
                this.formRules.cna = true
                return false
            }
            this.formRules.cna = false
            return true
        },
        checkPhone() {
            const cphone = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
            if(!cphone.test(this.userInfo.mobile)) {
                this.formRules.cac = true
                return false
            }
            this.formRules.cac = false
            return true
        },
        checkPassword() {
            const cpassword = /^(?![0-9]+$)(?![a-zA-Z]+$)(?!([^(0-9a-zA-Z)]|[])+$)([^(0-9a-zA-Z)]|[]|[a-zA-Z]|[0-9]){6,}$/
            if(!cpassword.test(this.userInfo.password)) {
                this.formRules.cpw = true
                return false
            }
            this.formRules.cpw = false
            return true
        },
        checkCode() {
            const ccode = /^\d{6}$/
            if(!ccode.test(this.userInfo.code)) {
                this.formRules.cco = true
                return false
            }
            this.formRules.cco = false
            return true
        },
        checkAgree() {
            if(agree == null) {
                return false
            }

            return true
        },
        submitLogin() {
            if(this.checkPhone() && this.checkPassword()) {
                loginApi.loginUser(this.userInfo)
                    .then(response => {
                        if(response.data.data.token == null) {

                            this.$message({
                                showClose: true,
                                type: 'error',
                                message: "登录失败"
                            })
                        } else {

                            //提示登录成功
                            this.$message({
                                showClose: true,
                                type: 'success',
                                message: "登录成功"
                            })
                            //获取token放入cookie
                            cookie.set("recl_token",response.data.data.token, {domain: 'localhost'})
                            //根据token获取用户信息并放入cookie
                            loginApi.getUserInfo()
                                .then(response => {
                                    cookie.set("recl_ucenter",JSON.stringify(response.data.data.userInfo), {domain: 'localhost'})
                                })
                                this.$router.push({path: '/'})
                            }                      
                    })
                    .catch(error => {
                        console.log(error)
                        this.$message({
                            type: 'error',
                            message: "登录失败"
                        })
                    })
            }
        },
        submitRegister() {
            if(this.checkNickName() && this.checkPhone() && this.checkPassword() && this.checkCode()) {
                registerApi.registerUser(this.userInfo)
                    .then(response => {
                        //提示注册成功
                        this.$message({
                            type: 'success',
                            message: "注册成功"
                        })
                    })
                    .catch(error => {
                        this.$message({
                            type: 'error',
                            message: error.data.data.message
                        })
                    })
            }
        }
    }
}
</script>

<style scoped>

a {
    text-decoration: none;
}

.login-box {
    display: grid;
    justify-content: center;
}

.login-form {
    width: 300px;
    margin: 20px auto;
    background-color: white;
    box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.2);
}

.tags {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-around;
}

.tag {
    height: 60px;
    width: 50%;
    text-align: center;
    line-height: 57px;
    font-size: 16px;
    color: #A8B4BB;
    border-bottom: 2px solid rgb(209, 208, 208);
    cursor: pointer;
}

.active {
    border-bottom: 5px solid rgb(69, 155, 226);
    color: #3169B0;
}

.input-wapper {
    display: inline-block;
    border: 1px solid #BBC7CE;
    height: 23px;
    line-height: 23px;
    padding: 7.5px;
    border-radius: 3px;
    outline-color: #3AA8E8;
    width: 80%;
}

.input-group {
    text-align: center;
    margin: 15px auto;
}

.code {
    width: 45%;
}

.codeBtn {
    display: inline-block;
    width: 98px;
    height: 38px;
    line-height: 38px;
    border: 1px solid #76BCF5;
    background: #f2f5f7;
    border-radius: 3px;
    font-size: 14px;
    color: #3984E6;
    text-align: center;
}

.agree-tip {
    font-size: 14px;
    color: #2B343A;
    line-height: 1px;
}

.body {
    text-align: center;
}

.login-btn {
    outline: none;
    width: 80%;
    height: 40px;
    line-height: 40px;
    background: #3169B0;
    font-size: 16px;
    color: #fff;
    border-radius: 3px;
    text-align: center;
    transition: box-shadow .5s;
    box-shadow: 0 0 6px #ccc;
    margin-top: 20px;
}

.forget {
    display: block;
    color: #0b8bff;
    text-align: left;
    margin: 20px 20px;
    font-size: 14px;
}

.cut-line {
    display: block;
    margin: 0px 30px 0;
    border-bottom: 1px dashed #eee;
}

.bottom-title {
    font-size: 15px;
    text-align: center;
}

.svg {
    display: flex;
    list-style: none;
    justify-content: flex-start;
    margin-left: 40px;
}

.svg li {
    margin-left: 20px;
}

.ni {
    color: #5A6266;
    font-size: 14px;
    text-align: center;
}

.body p {
    min-width: 10px;
    height: 10px;
    padding-left: 5px;
    line-height: 20px;
    font-size: 12px;
    color: #F1625D;
    text-align: left!important;
    margin-left: 15px;
}

.error {
    border: 1px solid #F86D68;
}

.title {
    text-align: center;
}

</style>