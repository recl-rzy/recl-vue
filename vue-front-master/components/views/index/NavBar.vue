<template>
  <div>
        <!-- 顶部导航栏 -->
        <header>
        <!-- logo图标 -->
        <div class="logo">忆心 RECL</div>
        <!-- 功能栏 -->
        <nav>
            <a href="/" class="active">首页</a>
            <a href="/chat">AI小忆</a>
            <a href="/consult/reservation/own" v-if="userInfo.isCounselor || userInfo.isListener">用户预约</a>
            <a href="#">忆心咨询</a>
            <a :href="'/fm/' + userInfo.id ">心理FM</a>
            <a href="/scale/list">量表测评</a>
            <a href="/user/main">个人主页</a>
            <a href="/article/list">"忆"文</a>
            <a href="/login" v-if="!userInfo.id">登录</a>
            <a href="/user/info" class="login" v-show="userInfo.id" v-cloak>
            <img :src="userInfo.avatar" alt="">
            </a>
            <a href="#" @click="loginOut" v-show="userInfo.id" class="login-out" v-cloak>注销</a>
        </nav>
        <!-- 图标 -->
        <div class="burger">
            <div class="burger-line1"></div>
            <div class="burger-line2"></div>
            <div class="burger-line3"></div>
        </div>
        </header>
  </div>
</template>

<script>
import '~/assets/css/index/NavBar.css'
import cookie from 'js-cookie'

export default {
    methods: {
        loginOut() {
            //情空cookie
            cookie.set("recl_token",'', {domain: 'localhost'})
            cookie.set("recl_ucenter",'', {domain: 'localhost'})
            this.userInfo = {}
            this.$router.push({path: '/'})
        },
        init() {
            this.getUserInfoByCookie()
        },
        getUserInfoByCookie() {
        
            var userInfoStr = cookie.get('recl_ucenter')
            if(userInfoStr) {
                //将用户信息字符串转json对象
                this.userInfo = JSON.parse(userInfoStr)
                console.log(this.userInfo)
            }
        }
    },
    mounted() {
        this.init()
    },
    data() {
        return {
            userInfo: {}
        }
    },
    watch: {
    $route(to, from) {
        this.init()
    }
  }
}
</script>

<style>

header {
    width: 100vw;
    height: 80px;
    display: grid;
    padding: 0 40px;
  
    grid-template-columns: 1fr 3fr;
    align-items: center;
    position: relative;
    z-index: 200;
    background: rgba(0, 0, 0, 0);
}
  
header.sticky {
    position: fixed;
    background-color: rgba(242, 245, 248, 1);
    box-shadow: 0 0 18px rgba(0, 0, 0, 0.2);
    animation: dropDown 0.5s ease-in-out forwards;
}

header.open nav a {
    margin-top: 20px;
}
  
header.sticky .logo,
header.sticky nav i {
    color: #409EFF;
}

header.sticky nav a {
    color: #2b2929;
    margin-top: 20px;
}
  
@keyframes dropDown {
    from {
      transform: translateY(-100px);
    }
    to {
      transform: translateY(0);
    }
}
  
.logo {
    font-size: 24px;
    font-weight: 600;
    color: #ffffff;
}
  
header {
    height: 55px;
}
  
header nav {
    justify-self: center;
    width: 100%;
}
  
header nav a {
    color: #ffffff;
    text-decoration: none;
    margin: 0 24px;
    font-size: 15px;
    letter-spacing: 1px;
}
  
header nav a:hover,
header nav .active {
    color: #009fe9;
}
  
header .burger {
    display: block;
    position: absolute;
}

.login {
    position: relative;
}

.login img {
    width: 30px;
    height: 30px;
    object-fit: cover;
    border-radius: 50%;
    margin-bottom: 10px;
    position: absolute;
}

.login span {
    text-align: right;
    font-size: 14px;
    margin-left: 40px;
    color: #F56C6C;
    font-weight: 600;
}

</style>