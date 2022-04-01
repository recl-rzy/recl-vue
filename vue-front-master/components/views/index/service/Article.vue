<template>
  
    <div>
        <!-- 最新热文 -->
        <section class="articleList">
            <ul class="article-classifies">
                <li v-for="(item,index) in filterBtnList" :key="index" @click="clickFilterBtn(index, item)"><a class="classify-item" :class="{active: index === currentBtnIndex}">{{item}}</a></li>
                <li><a href="/article/list" class="classify-item">更多文章</a></li>
            </ul>
            <div class="articles" v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)">
                <a :href="'/article/'+ item.id" v-for="(item,index) in articleList" :key="index">
                    <div class="article">
                        <div class="profile-img">
                            <img :src="item.cover" alt="">
                        </div>
                        <div class="content">
                            <h3 class="article-title">{{item.title}}</h3>
                            <p class="article-content" v-html="item.content.replace(/<[^>]+>/g,'').replace(/\s*/g,'').slice(0,49) + '...'">{{item.content}}</p>
                            <span class="tag">{{'#' + item.oneTag + '#'}}</span>
                        </div>
                    </div>
                </a>
            </div>
        </section>
    </div>

</template>

<script>
import '~/assets/css/index/article.css'
import articleApi from '@/api/article.js'

export default {
    created() {
        this.init()
    },
    mounted() {
        this.loading = false
    },
    data() {
        return {
            filterBtnList: ['最新热文','社会热点','婚恋爱情','自我疗愈','家庭关系','人际社交'],
            currentBtnIndex: 0,
            total: 0,
            current: 1,
            limit: 6,
            articleQuery: {},
            articleList: [],
            loading: true
        }
    },
    methods: {
        init() {
            this.articleQuery.articleClassify = '最新热文'
            this.indexPageArticleFactor()
        },
        indexPageArticleFactor(current = 1) {
            // 默认页数为1
            this.current = current
            articleApi.indexPageArticleFactor(this.current, this.limit, this.articleQuery)
                .then(response => {
                    this.articleList = response.data.data.articleList 
                    this.total = response.data.data.total
                })
        },
        clickFilterBtn(index, classify) {
            this.currentBtnIndex = index
            this.articleQuery.articleClassify = classify
            this.indexPageArticleFactor()
        }
    }
}
</script>

<style scoped>

</style>