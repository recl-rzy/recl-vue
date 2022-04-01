<template>
    
    <div class="music-wrap">
        <!-- 忆心Music -->
        <section class="musicList section-bg1">
            <h2 class="title1">忆心FM
            </h2>
            <p class="intro">
            每个人都值得被听见
            </p>
            <div class="musics">
            <!-- <nuxt-link :to="{name: fm-id, params:{id: item.id, userId: userInfo.id}}" v-for="(item, index) in musicList" :key="index"> -->
            <a :href="'/fm/' + item.id + '?userId=' + userInfo.id" v-for="(item, index) in musicList" :key="index">
                <div class="music">
                <div class="profile-img">
                    <img :src="item.cover" alt="">
                </div>
                <div class="sign" style="font-size: 14px;color: #333;">{{item.sign.slice(0,16) + '...'}}</div>
                <ul class="musicInfo">
                    <li>
                    <div class="avater">
                        <img :src="item.avatar" alt="">
                        <div class="name" style="font-size: 13px">{{item.nickName.slice(0,4) + '...'}}</div>
                    </div>
                    </li>
                    <li>
                    <div class="playBtn">
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAABAFJREFUSA2tV19IZFUY/53rZCM6QSsYii31Um3LEug+bVla7VuwgkXty0L71K4g6pgPyy7IYoE5VxdZoqAIeilbDIWeknIXwSftwR6iYmFRcMHazXAI/8zM6fc7zMgdnevcbD64c8/9zvf9fuc75zvfOWMQQYas9XwfZ2jaaYFWvpv0sF3F958GWLUWC1Ue5lpa8P3tDpOh/lChT7g89YWNP3iAHhIkCdwQbhnoMbhvDD6ticP/o9ukAz1FzVDiOt92kWwcFk/Kg2C/cQDTjHHWy2ElHsfao9vI/hND/fYOThiLF2HwFn2edwwcQKwabX/3mLtFjPmPA8TWWpPwMUyAK3mAJYIOpt83P5YC2K9LjNk2m8UI9ZnNAbxiDL3LiUjrUvbr2lFr+ewy6m7pyvnt75fPsQn72H596DdJPxBp3ah9SNKOUMMjdBD75aCbV/jIr6mmNwMPXemkmSv0/d83SW9y6e4kfPtGAcsRK3tdIlFrPPRWklREXOTf3dvis8ISOGJtGZe9Bkub/fhYRpWUdBITTJR5BvfE7g7eE7an4sARJfWh7I2UhbSVn3yiiDBtDNdlmwN6T35jq00iZV/KWcxzRL9yyzxXDqh23L6OLL6kfRUfP5lEasgY4pUXrvUyoz6FGM5q1J1y4aaZKe/KWclijMvSSIAGDngk5eMHrltzFF9yfOfssiTmNKv2qurOunf5n6eDJhxA+842lhnNm0F9ybYHV4RU5RSxCj5UBksaR1By8I9zALdqU/bz5jFbE+YSy8CVT0betEes2hvmEFlvcfGvLD4Js48D6/m+BhE7sXGW+EqIwWthMNljLE0UTnVODRfp9gYawxz+i56j/zbMfo+DJ9ceMYdwPMwhoj7Ho3P4dCv6w+wDHGseR7jkDJniYQ4R9CteFdrTA+baobePPAcTcVERTwuY834uAoHq7i9BO0Y5+UgML2z2m/mgvlSbQbqawWhnPFaeBTqvE/BZHoevlnII6mLAJX7/RJ+fWbouMMp3NvrMRtCmVFvYjPQZcYnT2bBsDrrDP2UXj3LwlyIK6oTJPb4oDnGpT1ON+npMcDOtch5bE2O4LF0lJZFCt7DF4bgI7ojvvWu2OAV9IrM53Kjk7UNYXMZxYYtDXGo7YjV4+E+x40M2Yzy7pipB7jCIJUxhi0NckqJqpbXgDfMrJsHb7MvoNqKLQdQz2iHyx+FwyTR7/BTp5GYS54M4RcRyzJMf+XrrstfgI7emxFOkJL0aJBXPAWIpJZym4gs9LwruzA5c6GW3tYUmV5FYHLRPtWWkVyKRtC84vU6f/wklVv9R/sKQbJ2gvrK3kEhBwkL7UOKCke5Xpf605ft1yKwRSKV3WsUhylXoXwBmn0Y1nEixAAAAAElFTkSuQmCC" alt="">
                    </div>
                    </li>
                </ul>
                </div>
            </a>
            <!-- </nuxt-link> -->
            </div>
            <div class="swiper-button-prev swiper-button-white disFunc" slot="button-prev" @click="preBtn" v-if="current != 1 && !disabled"></div>

            <div class="swiper-button-next swiper-button-white disFunc" slot="button-next" @click="nextBtn" v-if="current != musicPages && !disabled"></div>
        </section>
    </div>

</template>

<script>
import '~/assets/css/index/music.css'
import musicApi from '@/api/music.js'
import cookie from 'js-cookie'

export default {
    created() {
        this.init()
    },
    data() {
        return {
            musicList: [],
            current: 1,
            limit: 5,
            musicPages: Number,
            musicQuery: {},
            disabled: false,
            userInfo: {}
        }
    },
    methods: {
        init() {
            this.getUserInfoByCookie()
            this.pageMusicFactor()
            this.showPage = true
        },
        getUserInfoByCookie() {
        
            var userInfoStr = cookie.get('recl_ucenter')
            if(userInfoStr) {
                //将用户信息字符串转json对象
                this.userInfo = JSON.parse(userInfoStr)
                this.userInfo.password = ''
            }
        },
        pageMusicFactor() {
            musicApi.pageMusicFactor(this.current, this.limit, this.musicQuery)
                .then(response => {
                    this.musicList = response.data.data.musicList
                    this.musicPages = response.data.data.musicPages 
                })
                .catch(error => {console.log(error)})
        },
        preBtn() {
            this.current = this.current - 1 
            this.pageMusicFactor(this.current)
        },
        nextBtn() {
            this.current = this.current + 1
            this.pageMusicFactor(this.current)
        }
    },
    watch: {
        musicList(newVal) {
     
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