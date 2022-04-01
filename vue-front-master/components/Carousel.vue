<template>
  <!-- 轮播区域 -->
    <div v-swiper:mySwiper="swiperOption" ref="mySwiper" class="glide" @mouseover="enter" @mouseleave="leave">

        <div class="swiper-wrapper">

            <div class="swiper-slide" style="background: #040B1B;" v-for="(item, index) in list" :key="index">

              <!-- 轮播中间标题 -->
              <!-- <div class="slide-caption">
                <h1><font style="color: rgb(39, 203, 105)">用创新点缀人生</font> <font style="color: rgb(0, 175, 250)">让科技融入理想</font></h1>
                <h3>世界和我爱着你</h3>
                <input name="nav-search" />
                <img src="~/assets/imges/se.png" alt="" class="search-btn">
                
              </div> -->

              <div class="backdrop"></div>

                  <a target="_blank" href="/">

                      <img :src="item.imgUrl" alt="首页banner" :key="index" class="bannerImge">

                  </a>
            </div>


        </div>

        <div class="swiper-pagination swiper-pagination-white"></div>

        <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>

        <div class="swiper-button-next swiper-button-white" slot="button-next"></div>

    </div>
</template>

<script>
import carouselApi from '@/api/carousel.js'

export default {
    mounted() {
      this.getCarousel()
    },
    data() {
        return {
          list: [
            // require("@/assets/imges/bg2.jpg"),
            // require("@/assets/imges/bg5.jpg"),
            // require("@/assets/imges/bg6.jpg"),
            // require("@/assets/imges/bg7.jpg"),
            // require("@/assets/imges/bg8.jpg"),
            // require("@/assets/imges/bg10.jpg"),
          ],
          swiperOption: {
            autoplay: {
              delay: 4000,
              disabledOnInteraction: false
            },
            lazy: {
              loadPrevNext: true,
              loadPrevNextAmount: 2
            },
            loop: true,
            //配置分页
            pagination: {
              el: '.swiper-pagination'//分页的dom节点
            },
            //配置导航
            navigation: {
              nextEl: '.swiper-button-next',//下一页dom节点
              prevEl: '.swiper-button-prev'//前一页dom节点
            }
          },
        }
    },
    methods: {
      enter() {
        this.$refs.mySwiper.swiper.autoplay.stop()
      },
      leave() {
        this.$refs.mySwiper.swiper.autoplay.start()
      },
      getCarousel() {
        carouselApi.getCarousel()
          .then(response => {
            this.list = response.data.data.list
          })
      }
    }
}
</script>

<style scoped>

.glide {
  width: 100%;
  height: auto;
  max-height: 84vh;
  min-width: 660px;
  margin: 0;
  padding: 0;
}

.swiper-wrapper {
  width: 100%;
}

.backdrop {
  background-color: rgba(42, 42, 42, 0.69);
  position: absolute;
  z-index: 100;
  width: 100%;
  height: 100%;
  opacity: 0.2;
}

.search-btn {
  width: 30px;
  height: 30px;
  margin-bottom: -10px;
}

.slide-caption {
  position: absolute;
  z-index: 70;
  color: #e7e9ec;
  text-align: center;
  max-width: 60vw;
}

.swiper-slide {
  display: flex;
  align-items: center;
  justify-content: center;
}

.slide-caption h1 {
  font-size: 44px;
  font-weight: 600;
}

.slide-caption h3 {
  font-size: 24px;
  margin: 28px 0px;
}

.slide-caption input {
  width: 400px;
  height: 25px
}

.swiper-button-white {
  z-index: 210;
}

@media (max-width: 1410px) {
  .swiper-pagination-white {
    display: none;
  }
}

.bannerImge {
  width: 100%;
}


</style>