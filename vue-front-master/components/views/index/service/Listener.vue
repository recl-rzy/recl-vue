<template>

  <div>
      <!-- 即时倾诉 -->
      <section class="listen section-bg2">
        <h2 class="title1">即时倾诉</h2>
        <p class="intro">
          每个人都值得被听见
        </p>

        <div class="listeners">
          <div class="listener" v-for="(item,index) in listenerList" :key="index">
            <div class="profile-img" :class="{'listener-bg1': index == 0,
             'listener-bg2': index == 1,
              'listener-bg3': index == 2,
              'listener-bg4': index == 3}">
              <img :src="item.avatar" alt="">
              <span class="status">在线</span>
            </div>
            <h4 class="name">{{item.name}}</h4>
            <p class="time">累计倾听：{{item.totalDuration}}小时</p>
            <ul class="tips">
              <li><span class="tip">{{item.oneClassify}}</span></li>
              <li><span class="tip">{{item.twoClassify}}</span></li>
            </ul>
            <p class="sign">签名: {{item.sign}}</p>
            <button class="listenBtn">找Ta倾诉</button>
          </div>
        </div>

        <div class="swiper-button-prev swiper-button-white disFunc" slot="button-prev" @click="preBtn" v-if="current != 1 && !disabled"></div>

        <div class="swiper-button-next swiper-button-white disFunc" slot="button-next" @click="nextBtn" v-if="current != pages && !disabled"></div>

      </section>
    </div>

</template>

<script>
import '~/assets/css/index/listener.css'
import listenerApi from '@/api/listener.js'

export default {
    mounted() {
        this.init()
    },
    data() {
        return {
            listenerList: [],
            limit: 4,
            current: 1,
            pages: Number,
            total: 0,
            disabled: false
        }
    },
    methods: {
        init() {
            this.indexPageListenerFactor()
        },
        indexPageListenerFactor(current = 1) {

            this.current = current

            listenerApi.getPageListenerFactor(this.current, this.limit)
                .then(response => {
                    this.listenerList = response.data.data.listenerList
                    this.total = response.data.data.total
                    this.pages = response.data.data.pages
                })
        },
        preBtn() {
            this.current = this.current - 1 
            this.indexPageListenerFactor(this.current)
        },
        nextBtn() {
            this.current = this.current + 1
            this.indexPageListenerFactor(this.current)
        },
    },
    watch: {
        listenerList(newVal) {

            if(newVal.length === 0) {
                
                this.disabled = true
            } else {

                this.disabled = false
            }
        }
    } 
}
</script>

<style scoped>

.swiper-button-white {
  z-index: 0;
  color: rgb(109, 201, 238);
  margin-top: 5%;
}

</style>