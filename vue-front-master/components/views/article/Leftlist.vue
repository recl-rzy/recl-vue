<template>
  
    <!-- 左侧列表内容 -->
    <div class="left-wrapper">
        <div class="top-selector">
            <ul>
                <li v-for="(item,index) in filterBtnList" :key="index"><a :class="{active: currentBtnIndex === index}" @click="clickFilterBtn(index, item.classify)">{{item.classify}}</a></li>
            </ul>
        </div>
        <div class="center-items">
            <ul>
                <li v-for="(item, index) in articleList" :key="index">
                    <div class="item">
                        <a :href="'/article/' + item.id">
                            <img :src="item.cover" alt="">
                        </a>
                        <div class="right">
                            <a :href="'/article/' + item.id">
                                <h3 class="title">{{item.title}}</h3>
                                <div class="desc">
                                    <p v-html="item.content.replace(/<[^>]+>/g,'').replace(/\s*/g,'').slice(0,49) + '...'">{{item.content}}</p>
                                </div>
                                <div class="info">
                                    <a href="#">
                                        <span>{{item.nickName}}</span>
                                    </a>
                                    <span class="date"> {{item.gmtCreate}} </span>
                                    <a href="#" class="classify">{{'#' + item.articleClassify}}</a>
                                </div>
                            </a>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="bottom-pagination">
            <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            :current-page="current"
            :page-size="limit"
            @current-change="pageArticleFactor">
            </el-pagination>
        </div>
    </div>

</template>

<script>
import articleApi from '@/api/article.js'

export default {
    data() {
        return {
            articleList: [],
            total: 0,
            current: 1,
            limit: 5,
            filterBtnList: [
                {classify: '全部'},
                {classify: '社会热点'},
                {classify: '婚恋爱情'},
                {classify: '自我察觉'},
                {classify: '梦与解梦'},
                {classify: '家庭关系'},
                {classify: '心理健康'},
                {classify: '自我疗愈'},
                {classify: '职场关系'}
            ],
            currentBtnIndex: 0,
            articleQuery: {}
        }
    },
    mounted() {
        this.pageArticleFactor()
    },
    methods: {
        pageArticleFactor(current = 1) {
            // 默认页数为1
            this.current = current
            articleApi.pageArticleFactor(this.current, this.limit, this.articleQuery)
                .then(response => {
                    this.articleList = response.data.data.articleList 
                    this.total = response.data.data.total
                })
        },
        clickFilterBtn(index, classify) {
            this.currentBtnIndex = index
            this.articleQuery.articleClassify = classify
            console.log(this.articleQuery)
            this.pageArticleFactor()
        }
    }
}
</script>

<style scoped>

a {
    text-decoration: none;
    background: none;
    color: #333;
    cursor: pointer;
}

a:hover {
    text-decoration: none;
    background: none;
}

/* 左侧列表 */

.left-wrapper {
    width: 55%;
    background-color: rgb(255, 255, 255);
    margin-top: 50px;
    border-radius: 10px;
    margin-left: 5%;
    box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.2);
    margin-bottom: 100px;
}

.left-wrapper .top-selector ul{
    list-style: none;
    display: flex;
    justify-items: center;
    justify-content: center;
    padding: 0 10px;
    font-size: 15px;
    color: #666;
    margin-top: 30px;
}

.left-wrapper .top-selector ul li {
    margin-right: 10px;
}

.left-wrapper .top-selector ul li a {
    display: block;
    width: 100%;
    padding: 5px 5px;
    text-align: center;
    letter-spacing: 1px;
}

.left-wrapper .active {
    border-radius: 5px;
    background-color: #409EFF;
    color: white;
}

.left-wrapper .item img {
    width: 98px;
    height: 98px;
    object-fit: cover;
}

.left-wrapper .item a {
    display: block;
}

.left-wrapper .item .title {
    margin: 0;
}

.left-wrapper .item {
    display: flex;
    margin-left: 20px;
}

.left-wrapper .item .right {
    margin-left: 20px;
}

.left-wrapper .item .info {
    display: flex;
    font-family: 'PingFangSC-Regular';
    font-size: 14px;
    color: #999;
    line-height: 14px;
}

.left-wrapper .item .date {
    margin-left: 18px;
    color: #999;
}

.left-wrapper .item .classify {
    margin-left: 18px;
    color: rgb(35, 161, 235);
}

.left-wrapper .item .desc {
    font-family: 'PingFangSC-Regular';
    font-size: 14px;
    color: #666;
    max-height: 40px;
    margin: 10px auto;
    -webkit-line-clamp: 2;
    padding-right: 40px;
    line-height: 22px;
}

.left-wrapper .center-items ul {
    list-style: none;
    margin-top: 70px;
}

.left-wrapper .center-items ul li {
    margin-top: 30px;
    margin-left: 20px;
}

.left-wrapper .bottom-pagination  {
    text-align: center;
    margin: 50px 0;
}

@media (max-width: 1342px) {
    .left-wrapper {
        margin: 0 auto;
        margin-top: 60px;
        width: 70%;
        margin-bottom: 100px;
    }
}

@media (max-width: 1000px) {
    .left-wrapper .item img {
        width: 60px;
        height: 60px;
        object-fit: cover;
    }

    .left-wrapper .item .title {
        margin: 0;
        font-size: 15px;
    }

    .left-wrapper .item .desc {
        font-family: 'PingFangSC-Regular';
        font-size: 7px;
        color: #666;
        max-height: 40px;
        -webkit-line-clamp: 2;
        padding-right: 40px;
        line-height: 22px;
    }

    .left-wrapper .item .date {
        margin-left: 18px;
        color: #999;
        font-size: 7px;
    }

    .left-wrapper .item .classify {
        margin-left: 18px;
        color: rgb(35, 161, 235);
    }

    .left-wrapper .item span {
        font-size: 5px;
    }

    .left-wrapper .top-selector ul li a {
        font-size: 10px;
    }
}

@media (max-width: 833px) {
    .left-wrapper .item .desc {
        display: none;
    }

    .left-wrapper .item .date {
        margin-left: 18px;
        color: #999;
        font-size: 7px;
        margin-top: 10px;
    }

    .left-wrapper .item .classify {
        margin-left: 18px;
        color: rgb(35, 161, 235);
        margin-top: 10px;
    }

    .left-wrapper .item span {
        font-size: 5px;
        margin-top: 10px;
        display: block;
    }
}


</style>