<template>
  
    <div>
        <!-- 热门测试 -->
        <section class="showTestList section-bg2">
            <h2 class="title1">热门测试</h2>
            <p class="intro">
            每个人的心事都能找到答案
            </p>
            <div class="filter-btns">
                <button v-for="(item,index) in classifyList" class="filter-btn" :class="{active : index == currentBtnIndex}"
                @click="clickFilterBtn(index, item.id, item.parentId)" :key="index">{{item.title}}</button>
            </div>
            <div class="test-items">
                <div v-for="(item, index) in scaleList" :key="index">
                    <a :href="'/scale/' + item.id">
                    <div  class="test-item"
                        v-on:mouseover="changeHover(index)" v-on:mouseout="removeHover($event)">
                        <div class="profile-imge">
                            <img :src="item.cover">
                        </div>
                        <button :class="{startTest : index == currentHoverIndex}" v-show="index == currentHoverIndex">去测试</button>
                        <h4 class="test-title">{{item.title}}</h4>
                        <div :class="[{'price' : item.price == 0},  {'showPrice' : item.price != 0} ]">{{item.price | getPrice}}</div>
                        <div class="comment">{{item.viewCount}}人测试 | 9801评论</div>
                    </div>
                    </a>
                </div>
            </div>
            <div class="swiper-button-prev swiper-button-white disFunc" slot="button-prev" @click="preBtn" v-if="current != 1 && !disabled"></div>

            <div class="swiper-button-next swiper-button-white disFunc" slot="button-next" @click="nextBtn" v-if="current != pages && !disabled"></div>
        </section>

    </div>

</template>

<script>
import '~/assets/css/index/scale.css'
import scaleApi from '@/api/scale.js'


export default {
    filters: {
        getPrice(price) {
            if(price == 0) {
                return '免费'
            } else {
                return '¥' + price.toFixed(2)
            }
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        init() {
            this.getAllScaleClassifies()
            this.indexPageScaleFactor()
        },
        preBtn() {
            this.current = this.current - 1 
            this.indexPageScaleFactor(this.current)
        },
        nextBtn() {
            this.current = this.current + 1
            this.indexPageScaleFactor(this.current)
        },
        clickFilterBtn(index, id, parentId) {
            this.current = 1
            this.currentBtnIndex = index
            this.scaleQuery.classifyId = id
            this.scaleQuery.classifyParentId = parentId
            this.indexPageScaleFactor(this.current, this.limit, this.scaleQuery)
        },
        indexPageScaleFactor() {
            // 默认页数为1
            scaleApi.indexPageScaleFactor(this.current, this.limit, this.scaleQuery)
                .then(response => {
                    this.scaleList = response.data.data.scaleList 
                    this.total = response.data.data.total
                    this.pages = response.data.data.pages
                })
                .catch(error => {console.log(error)})
        },
        changeHover(index) {
            this.currentHoverIndex = index
        },
        removeHover() {
            this.currentHoverIndex = -1
        },
        getAllScaleClassifies() {
            scaleApi.getAllScaleClassifies()
                .then(response => {
                    this.classifyList = response.data.data.classifyList
                })
                .catch(error => {console.log(error)})
        }
    },
    data() {
        return {
            currentBtnIndex: 0,
            currentHoverIndex: -1,
            total: 0,
            current: 1,
            limit: 8,
            pages: Number,
            scaleQuery: {},
            scaleList: [],
            classifyList: [],
            disabled: false
        }
    },
    watch: {
        scaleList(newVal) {

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
  margin-top: 10%;
}

</style>