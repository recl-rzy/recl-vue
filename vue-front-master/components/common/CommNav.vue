<template>
  <!-- 顶部导航栏 -->
    <header>
      <!-- logo图标 -->
      <div class="logo">忆心 RECL</div>
      <!-- 功能栏 -->
      <nav>
        <a href="/" class="active">首页</a>
        <a href="/consult/reservation/own" v-if="userInfo.isCounselor || userInfo.isListener">用户预约</a>
        <a href="/chat">AI小忆</a>
        <a href="#">忆心咨询</a>
        <a :href="'/fm/' + userInfo.id ">心理FM</a>
        <a href="/scale/list">量表测评</a>
        <a href="/user/main">个人主页</a>
        <a href="/article/list">"忆"文</a>
        <a href="/login" v-if="!userInfo.id">登录</a>
        <a href="/user/info" class="login" v-if="userInfo.id">
          <img :src="userInfo.avatar" alt="">
        </a>
        <a href="#" @click="loginOut" v-if="userInfo.id" class="login-out">注销</a>
      </nav>
      <!-- 图标 -->
      <div class="burger">
        <div class="burger-line1"></div>
        <div class="burger-line2"></div>
        <div class="burger-line3"></div>
      </div>
    </header>
</template>

<script>
import cookie from 'js-cookie'

export default {
    props: {
      userInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        own: false
      }
    },
    methods: {
      loginOut() {
        //情空cookie
        cookie.set("recl_token",'', {domain: 'localhost'})
        cookie.set("recl_ucenter",'', {domain: 'localhost'})
        this.userInfo = {}
        this.$router.push({ path: '/' })
      }
    },
    mounted() {
      // const oScript = document.createElement('script')
      // oScript.type = 'text/javascript'
      // oScript.src = '~/assets/js/scrollReveal/scrollreveal.min.js'
      // document.body.appendChild(oScript)

      const headerEl = document.querySelector("header")
      const burgerEl = document.querySelector(".burger")

      burgerEl.addEventListener("click", ()=> {
        headerEl.classList.toggle("open");
      })

      window.addEventListener("scroll", () => {
        
        let height = headerEl.getBoundingClientRect().height

        if(window.pageYOffset - height > 600) {
          if(!headerEl.classList.contains("sticky")) {
            headerEl.classList.add("sticky")
          }
        } else {
          headerEl.classList.remove("sticky")
        }
      })
    }
}
</script>

<style scoped>

header {
  width: 100%;
  height: 80px;
  display: grid;
  padding: 0 0px;

  grid-template-columns: 1fr 3fr;
  align-items: center;
  position: relative;
  z-index: 200;
  background: rgba(0, 0, 0, 0);
  box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.2);
}

header.sticky {
  position: fixed;
  background-color: white;
  box-shadow: 0 0 18px rgba(0, 0, 0, 0.2);
  animation: dropDown 0.5s ease-in-out forwards;
}

header.sticky .logo,
header.sticky nav i {
  color: #12e712;;
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
  color: #0bbdf5;
  margin-left: 20px;
}

header {
  height: 55px;
  z-index: 200;
  background-color: #fff;
}

header nav {
  justify-self: center;
}

header nav a {
  color: #424242;
  text-decoration: none;
  margin: 0 24px;
}

header nav a:hover,
header nav .active {
  color: #009fe9;
}

header .burger {
  display: block;
  position: absolute;
}

@media (max-width: 1370px) {
    header nav {
        display: none;
    }

    header {
      grid-template-columns: repeat(2, 1fr);
    }

    header .burger {
        display: block;
        width: 20px;
        height: 6px;
        justify-self: end;
        margin-right: 40px;
        cursor: pointer;
    }

    .burger-line1, 
    .burger-line2, 
    .burger-line3 {
        width: 20px;
        height: 2px;
        background-color: #317cee;
    }

    .burger-line1 {
      position: absolute;
      top: -6px
    }

    .burger-line3 {
      position: absolute;
      top: 6px
    }

    header.open .login {
      right: 15px;
    }

    header.open nav {
      display: grid;
      position: absolute;
      right: 0;
      top: 0;
      width: 18%;
      height: 100vh;
      /* background: url("//12598375.s61i.faiusr.com/2/AD0I5-iABhACGAAgqr37wwUovOeosgQw5AM4vAI.jpg") no-repeat;
      background-size: 100% 100%; */
      box-shadow: 0px 0px 36px rgba(0, 0, 0, 0.1);
      background-color: rgba(65, 81, 101, 0.9);
      object-fit: cover;
      grid-auto-rows: max-content;
      justify-items: start;
      padding: 0 10px;
      margin-top: 55px;
      animation: sildeDown 0.6s ease-out forwards;
    }

    header.open nav > * {
      color: #faf9f9;
      animation: showMenu 0.5s linear forwards 0.4s;
      font-size: 15px;
      margin: 10px auto;
      opacity: 0;
    }

    header.open .burger-line1, 
    header.open .burger-line2,
    header.open .burger-line3,
    header.sticky .burger-line1, 
    header.sticky .burger-line2,
    header.sticky .burger-line3 {
      background-color: #409EFF;
      transition: 0.4s ease;
    }

    header.open .burger-line1 {
      transform: rotate(45deg) translate(3px, 5px);
    }

    header.open .burger-line2 {
      transform: translateX(5px);
      opacity: 0;
    }

    header.open .burger-line3 {
      transform: rotate(-45deg) translate(3px, -5px);
    }

    header.open .logo {
      z-index: 40;
      color: #0bbdf5;
    }

    @keyframes slideDown {
      from {
        height: 0;
        opacity: 0;
      }
      to {
        height: 100vh;
        padding-top: 80px;
        opacity: 1;
      }
    }

    @keyframes showMenu {
      from {
        opacity: 0;
        transform: translateY(-1vh);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
}

@media (max-width: 700px) {
    header nav {
        display: none;
    }

    header {
      grid-template-columns: repeat(2, 1fr);
    }

    header .burger {
        display: block;
        width: 20px;
        height: 6px;
        justify-self: end;
        margin-right: 40px;
        cursor: pointer;
    }

    .burger-line1, 
    .burger-line2, 
    .burger-line3 {
        width: 20px;
        height: 2px;
        background-color: #317cee;
    }

    .burger-line1 {
      position: absolute;
      top: -6px
    }

    .burger-line3 {
      position: absolute;
      top: 6px
    }

    header.open nav {
      display: grid;
      position: absolute;
      right: 0;
      top: 0;
      width: 18%;
      height: 100vh;
      box-shadow: 0px 0px 36px rgba(0, 0, 0, 0.1);
      background-color: rgba(65, 81, 101, 0.9);
      object-fit: cover;
      grid-auto-rows: max-content;
      justify-items: start;
      padding: 0 10px;
      margin-top: 55px;
      animation: sildeDown 0.6s ease-out forwards;
    }

    header.open nav > * {
      color: #faf9f9;
      animation: showMenu 0.5s linear forwards 0.4s;
      font-size: 15px;
      margin: 10px auto;
      opacity: 0;
    }

    header.open .burger-line1, 
    header.open .burger-line2,
    header.open .burger-line3,
    header.sticky .burger-line1, 
    header.sticky .burger-line2,
    header.sticky .burger-line3 {
      background-color: #1bd7f0;
      transition: 0.4s ease;
    }

    header.open .burger-line1 {
      transform: rotate(45deg) translate(3px, 5px);
    }

    header.open .burger-line2 {
      transform: translateX(5px);
      opacity: 0;
    }

    header.open .burger-line3 {
      transform: rotate(-45deg) translate(3px, -5px);
    }

    header.open .logo {
      z-index: 40;
      color: #12e712;
    }

    @keyframes slideDown {
      from {
        height: 0;
        opacity: 0;
      }
      to {
        height: 100vh;
        padding-top: 80px;
        opacity: 1;
      }
    }

    @keyframes showMenu {
      from {
        opacity: 0;
        transform: translateY(-1vh);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
}

.login {
    position: relative;
    bottom: 5px;
}

.login img {
    width: 32px;
    height: 32px;
    object-fit: cover;
    border-radius: 50%;
    margin-bottom: 13px;
    position: absolute;
}


</style>