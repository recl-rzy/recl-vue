<template>
  <div id="index">
    
    <NavBar/>
    
    <Carousel/>

    <!-- 关于我们部分 -->
    <div class="content-wapper">
      
      <Article/>

      <!-- 服务项目 -->
      <section class="service-prove section-bg1">
        <h2 class="title1">服务项目</h2>
        <p class="intro">
          我们拥有先进的技术、高端的服务设备和产品，专注高端心理健康服务
        </p>
        <div class="features">
          <div class="feature">
            <img src="//12598375.s61i.faiusr.com/4/AD0I5-iABhAEGAAgvbj7wwUo4rv61gEwTThN.png.webp" alt=""/>
            <h4 class="feature-title">热门技术</h4>
            <p class="feature-content">搭建循环神经网络，实现AI模拟心理咨询</p>
          </div>

          <div class="feature">
            <img src="//12598375.s61i.faiusr.com/4/AD0I5-iABhAEGAAgvbj7wwUo4rv61gEwTThN.png.webp" alt=""/>
            <h4 class="feature-title">专业量表</h4>
            <p class="feature-content">致力于心理学领域研究，抽象并实现多种量表评估算法，得出更加准确的评估结果</p>
          </div>

          <div class="feature">
            <img src="//12598375.s61i.faiusr.com/4/AD0I5-iABhAEGAAgvbj7wwUo4rv61gEwTThN.png.webp" alt=""/>
            <h4 class="feature-title">个性服务</h4>
            <p class="feature-content">支持线上线下心理咨询，AI在线咨询，冥想空间，心理美文等个性化服务</p>
          </div>

          <div class="feature">
            <img src="//12598375.s61i.faiusr.com/4/AD0I5-iABhAEGAAgvbj7wwUo4rv61gEwTThN.png.webp" alt=""/>
            <h4 class="feature-title">品牌创意</h4>
            <p class="feature-content">利用循环神经网络，结合量表诊断，助力心理专家进行相关治疗=====------</p>
          </div>
        </div>
      </section>

      <Scale/>

      <Counselor/>

      <Listener/>

      <FM/>

    </div>

    <Footer/>
  </div>
</template>


<script>
import NavBar from '@/components/views/index/NavBar.vue'
import Footer from '@/components/views/index/Footer.vue'
import Article from '@/components/views/index/service/Article.vue'
import Scale from '@/components/views/index/service/Scale.vue'
import Counselor from '@/components/views/index/service/Counselor.vue'
import Listener from '@/components/views/index/service/Listener.vue'
import FM from '@/components/views/index/service/FM.vue'
import Carousel from '@/components/Carousel.vue'
import '~/assets/css/index/service.css'
import '~/assets/css/index.css'

export default {
  components: {
    NavBar,
    Carousel,
    Footer,
    Article,
    Scale,
    Counselor,
    Listener,
    FM
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

    // const staggeringOption = {
    //   delay: 100,
    //   distance: "50px",
    //   easing: "ease-in-out",
    //   origin: "bottom"
    // };

    // ScrollReveal().reveal(".feature", {staggeringOption, interval: 350})
  },
  data () {
    return {
      testList: [
        {title: '性格优势评估'}
      ],
      token: '',
    }
  }
}
</script>

<style>

[v-vloak] {
  display: none !important;
}

a {
  text-decoration: none;
  background: none;
}

a:hover {
  text-decoration: none;
  background: none;
}

.showPrice {
  color: red;
  margin-left: -150px;
  margin-bottom: -20px;
}

.glide {
  width: 100vm;
  height: 700px;
  position: relative;
  top: -80px;
  z-index: 50;
}

.gbn {
    border: 0;
    width: 18px;
    height: 30px;
    background: url("/image/imageSearchBoxBtnStyle/16/go.gif?v=202104251101") no-repeat;
    float: left;
    z-index: 500;
    margin-left: 5px;
}

header {
  width: 100%;
  background-color: rgba(42, 42, 42, 0.4);
}

section {
  display: grid;
  justify-items: center;
  width: 100%;
  padding: 20px 80px;
}

.content-wapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.title1 {
  font-size: 24px;
  color: #2e2e2e;
  margin-top: 30px;
}

.title1::after {
  content: '';
  display: block;
  width: 80%;
  height: 4px;
  background-color: #ff434f;
  margin-top: 14px;
  transform: translateX(10%);
}

.intro {
  margin: 28px 0 60px 0;
  font-size: 18px;
  color: #0b8bff;
  font-family: 'PingFangSC-Medium';
  letter-spacing: 1px;
  font-weight: 600;
}

.section-bg2 {
  position: relative;
  background-color: #fff;
}

.section-bg1 {
  position: relative;
  background-color: #f3f4f5;
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

@media (max-width: 1370px) {
    header nav {
        display: none;
    }

    header {
      grid-template-columns: repeat(2, 1fr);
    }

    header.sticky nav a {
      color: #f8f8f8;
      margin-top: 20px;
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
        background-color: rgb(255, 255, 255);
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
      /* background: url("//12598375.s61i.faiusr.com/2/AD0I5-iABhACGAAgqr37wwUovOeosgQw5AM4vAI.jpg") no-repeat;
      background-size: 100% 100%; */
      box-shadow: 0px 0px 36px rgba(0, 0, 0, 0.1);
      background-color: rgba(65, 81, 101, 0.9);
      object-fit: cover;
      grid-auto-rows: max-content;
      justify-items: start;
      padding: 0 40px;
      margin-top: 55px;
      animation: sildeDown 0.6s ease-out forwards;
    }

    header.open nav > * {
      color: #ffffff;
      animation: showMenu 0.5s linear forwards 0.4s;
      font-size: 16px;
      margin: 4px 0;
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

    .test-items {
      grid-template-columns: repeat(2, 1fr);
      column-gap: 50px;
    }

    .counselors {
      grid-template-columns: repeat(2, 1fr);
      column-gap: 80px;
      row-gap: 60px;
    }

    .musics {
      row-gap: 60px;
      column-gap: 50px;
      grid-template-columns: repeat(3, 1fr);
    }

    .listeners {
      grid-template-columns: repeat(2, 1fr);
      row-gap: 50px;
      column-gap: 60px;
    }

    .features {
      grid-template-columns: repeat(2, 1fr);
      row-gap: 150px;
      margin-bottom: 90px;
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
        background-color: #fff;
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
      /* display: grid;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100vh;
      background-color: #fff;
      grid-auto-rows: max-content;
      justify-items: end;
      padding: 0 40px;
      opacity: 0;
      animation: sildeDown 0.6s ease-out forwards; */

      display: grid;
      position: absolute;
      top: 0;
      right: 0;
      width: 25%;
      height: 100vh;
      box-shadow: 0px 0px 36px rgba(0, 0, 0, 0.1);
      background-color: rgba(65, 81, 101, 0.9);
      font-size: 14px;
      /* background: url("//12598375.s61i.faiusr.com/2/AD0I5-iABhACGAAgqr37wwUovOeosgQw5AM4vAI.jpg") no-repeat;
      background-size: 100% 100%; */
      object-fit: cover;
      grid-auto-rows: max-content;
      justify-items: start;
      padding: 0 40px;
      margin-top: 57px;
      animation: sildeDown 0.6s ease-out forwards;
      color: #ffffff;
    }
    

    header.open nav > * {
      color: #ffffff;
      animation: showMenu 0.5s linear forwards 0.4s;
      font-size: 16px;
      margin: 4px 0;
      opacity: 0;
    }

    header.open .burger-line1, 
    header.open .burger-line2,
    header.open .burger-line3,
    header.sticky .burger-line1, 
    header.sticky .burger-line2,
    header.sticky .burger-line3 {
      background-color: #007aff;
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
      color: #4bb1f5;
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

    .test-items {
      grid-template-columns: repeat(1, 1fr);
      column-gap: 50px;
    }

    .counselors {
      grid-template-columns: repeat(1, 1fr);
      column-gap: 80px;
      row-gap: 60px;
    }

    .musics {
      row-gap: 60px;
      column-gap: 50px;
      grid-template-columns: repeat(2, 1fr);
    }

    .listeners {
      grid-template-columns: repeat(1, 1fr);
      row-gap: 50px;
      column-gap: 60px;
    }

    .features {
      grid-template-columns: repeat(1, 1fr);
      row-gap: 150px;
      margin-bottom: 90px;
    }

    .articles {
      grid-template-columns: repeat(1, 1fr);
      margin: 0 auto;
      margin-bottom: 50px;
      margin-top: 50px;
    }
}

@media (max-width: 1000px) {
  .articles {
    grid-template-columns: repeat(1, 1fr);
  }

  .article {
    width: 500px;
  }

  .article-classifies {
    display: flex;
    justify-content: center;
    flex-wrap: nowrap;
    width: 40vh;
    list-style: none;
    text-align: center;
  }

  .article-classifies a {
    text-decoration: none;
    color: #000;
    font-size: 16px;
    border: 1px solid transparent;
    display: inline-block;
    width: 80px;
    height: 32px;
    line-height: 30px;
  }
}

@media (max-width: 740px) {
  .musics {
      row-gap: 60px;
      column-gap: 50px;
      grid-template-columns: repeat(2, 1fr);
  }

  .article {
    width: 440px;
    height: 140px;
    background-color: #f9f9fa;
    border-radius: 10px;
    display: flex;
  }
}

</style>

