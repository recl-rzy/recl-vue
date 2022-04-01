<template>

    <div class="counselor-wrap">
        <!-- 资深心理导师 -->
        <section class="counselor-intro section-bg1"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)">
            <h2 class="title1">忆心咨询</h2>
            <p class="intro">
            没有人是一座孤岛，每个人都需要心理咨询
            </p>
            <div class="bg-green"></div>
            <div class="counselors" >
                <div class="counselor" v-for="item in counselorList" :key="item.id">
                    <div class="profile-img">
                        <img :src="item.avatar" alt="">
                    </div>
                    <h4 class="name">{{item.name}}</h4>
                    <ul>
                    <li>{{item.level | getLevel}}</li>
                    </ul>
                    <p class="position">擅长方向：{{item | getMeth}}</p>
                    <button class="reserBtn" @click="reser(item.id)">预约</button>
                </div>
            </div>

            <div class="swiper-button-prev swiper-button-white disFunc" slot="button-prev" @click="preBtn" v-if="current != 1 && !disabled"></div>

            <div class="swiper-button-next swiper-button-white disFunc" slot="button-next" @click="nextBtn" v-if="current != pages && !disabled"></div>

        </section>
    </div>

</template>

<script>
import '~/assets/css/index/counselor.css'
import counselorApi from '@/api/counselor.js'

export default {
    created() {
        this.init()
    },
    data() {
        return {
            counselorList: [],
            limit: 4,
            current: 1,
            pages: Number,
            total: 0,
            disabled: false,
            loading: true
        }
    },
    filters: {
        getLevel(level) {
            if(level == 1) {
                return '国家一级咨询师'
            } else if(level == 2) {
                return '国家二级咨询师'
            } else {
                return '国家三级咨询师'
            }
        },
        getMeth(item) {
            return item.oneMeth + '、' + item.twoMeth + '、' + item.threeMeth
        }
    },
    methods: {
        init() {
            this.indexPageCounselorFactor()
            this.loading = false
        },
        indexPageCounselorFactor(current = 1) {

            this.current = current

            counselorApi.getPageCounselorFactor(this.current, this.limit)
                .then(response => {
                    this.counselorList = response.data.data.counselorList
                    this.total = response.data.data.total
                    this.pages = response.data.data.pages
                })
        },
        reser(id) {
            this.$router.push({path: '/consult/reservation/' + id})
        },
        preBtn() {
            this.current = this.current - 1 
            this.indexPageCounselorFactor(this.current)
        },
        nextBtn() {
            this.current = this.current + 1
            this.indexPageCounselorFactor(this.current)
        },
    },
    watch: {
        counselorList(newVal) {
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
  margin-top: 8%;
}

</style>