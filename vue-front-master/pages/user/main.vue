<template>

  <div id="info">

    <CommNav :userInfo="userInfo"/>

    <div class="content-wrap">

        <div class="left-div">
            <!-- 主页顶部区域 -->
            <div class="user-top">

                <div class="user-view">
                    <div class="avatar">
                        <img :src="userInfo.avatar" alt="">
                    </div>
                    <div class="data">
                        <ul>
                        <li>
                            <h4 class="num">{{articleCount}}</h4>
                            <h4>文章</h4>
                        </li>
                        <li>
                            <h4 class="num">0</h4>
                            <h4>关注</h4>
                        </li>
                        <li>
                            <h4 class="num">{{praiseCount}}</h4>
                            <h4>获赞</h4>
                        </li>
                        <li class="last">
                            <h4 class="num">3</h4>
                            <h4>收藏</h4>
                        </li>
                        </ul>
                    </div>
                    <div class="desc">
                        <ul>
                            <li>
                                <i><img src="//lapp.xinli001.com/images/website-www/img39.png" align="absmiddle"></i>
                                {{userInfo.nickName}}
                            </li>
                            <li>
                                <img src="//lapp.xinli001.com/images/website-www/img40.png" align="absmiddle">
                                {{userInfo.sex | getSex}}
                            </li>
                            <li>
                                <i><img src="//lapp.xinli001.com/images/website-www/img41.png" align="absmiddle"/></i>
                                {{userInfo.sign}}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <!-- 主页选项框 -->
            <div class="user-selector">
                <ul>
                    <li :class="{'selector-active': focus == 'arc'}" @click="clickSelector('arc')">文章</li>
                    <li :class="{'selector-active': focus == 'main'}" @click="clickSelector('main')">主页</li>
                    <li :class="{'selector-active': focus == 'col'}" @click="clickSelector('col')">收藏</li>
                    <li :class="{'selector-active': focus == 'fm'}" @click="clickSelector('fm')">FM</li>
                </ul>
            </div>
            <!-- 主页数据显示区域 -->
            <div class="user-con">
                <img src="//lapp.xinli001.com/images/website-www/img63.png" class="blank" v-if="list.length === 0 && focus != 'col'">
                <ul>
                    <div class="collect-title" v-show="focus == 'col'">
                        <div class="head">
                            标题
                        </div>
                        <a :class="{'collect-active': collectFocus == 'arc'}" @click="clickCollectFocus('arc')">文章</a>
                        <a :class="{'collect-active': collectFocus == 'sca'}" @click="clickCollectFocus('sca')">测试</a>
                        <a :class="{'collect-active': collectFocus == 'fm'}" @click="clickCollectFocus('fm')">心理FM</a>
                    </div>
                    <li v-for="(item, index) in list" :key="index" v-show="list.length !== 0">
                        <div class="cover">
                            <img :src="item.cover" alt="">
                        </div>
                        <div class="info">
                            <div class="title">{{item.title}}</div>
                            <div class="name">{{item.nickName}}</div>
                            <div class="count">
                                <a class="ico-view">{{item.viewCount}}</a>
                                <a class="ico-digg">{{item.collectCount}}</a>
                            </div>
                        </div>
                    </li>
                </ul>
                
            </div>

        </div>

        <!-- 右侧推荐区域 -->
        <div class="uc-main">
            <!-- 推荐顶部区域 -->
            <div class="main-top">
                <ul>
                    <li><a target="_blank" class="ico-xwz" href="https://www.xinli001.com/user/article/new_article_post">写文章</a></li>
                    <li class="last"><a target="_blank" class="ico-fhd zhuge-qa" href="http://qa.xinli001.com/ask/">问答</a></li>
                </ul>
            </div>
            <!-- 推荐内容 -->
            <div class="main-rec">
                <div class="rec-top">
                    <h4 class="rec-title">推荐美文</h4>
                </div>
                <div class="rec-content">
                    <ul>
                        <li>
                            <div class="cover">
                                <img src="https://recl-edu.oss-cn-beijing.aliyuncs.com/2021/08/10/9060f46f93984b5ca4d6c105d3f5a743file.png" alt="">
                            </div>
                            <div class="info">
                                <div class="name">李青</div>
                                <div class="title">心理咨询师会被人工智能....</div>
                                <div class="count">收藏: 100</div>
                            </div>
                        </li>
                        <li>
                            <div class="cover">
                                <img src="https://recl-edu.oss-cn-beijing.aliyuncs.com/2021/08/10/9060f46f93984b5ca4d6c105d3f5a743file.png" alt="">
                            </div>
                            <div class="info">
                                <div class="name">李青</div>
                                <div class="title">心理咨询师会被人工智能....</div>
                                <div class="count">收藏: 100</div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

        </div>

    </div>

  </div>

</template>

<script>
import CommNav from '@/components/common/CommNav.vue'
import cookie from 'js-cookie'
import userApi from '@/api/user.js'
import mainApi from '@/api/main.js'

export default {
    components: {
        CommNav
    },
    data() {
        return {
            userInfo: {},
            list: [],
            focus: 'arc',
            collectFocus: 'arc',
            praiseCount: 0,
            articleCount: 0
        }
    },
    created() {
        this.init()
    },
    methods: {
        init() {
            this.getUserInfoByCookie()
            this.getOwnArticle(this.userInfo.id)
            this.getData(this.userInfo.id)
            console.log(this.list)
        },
        getUserInfoByCookie() {
        
            var userInfoStr = cookie.get('recl_ucenter')
            if(userInfoStr) {
                //将用户信息字符串转json对象
                this.userInfo = JSON.parse(userInfoStr)
            } else {
                this.$router.push({path: '/login'})
            }
        },
        getData(id) {
            mainApi.getPersonalData(id)
                .then(response => {
                    this.articleCount = response.data.data.articleCount
                    this.praiseCount = response.data.data.praiseCount
                })
        },
        clickCollectFocus(focus) {

            const id = this.userInfo.id
            if(focus == 'arc') {
                this.getCollectArticle(id)
            } else if(focus == 'fm') {
                this.getCollectMusic(id)
            } else if(focus == 'sca') {
                this.getCollectScale(id)
            }
            this.collectFocus = focus
        },
        clickSelector(focus) {

            const id = this.userInfo.id
            if(focus == 'col' || focus == 'arc') {

                this.collectFocus = 'arc'
                this.getCollectArticle(id)
            } else if(focus == 'fm') {

                this.collectFocus = 'fm'
                this.getCollectMusic(id)
            }
            this.focus = focus
        },
        getCollectArticle(id) {
            
            mainApi.getCollectArticle(id)
                .then(response => {
                    this.list = response.data.data.list
                })
                .catch(error => {console.log(error)})
        },
        getCollectScale(id) {
            
            mainApi.getCollectScale(id)
                .then(response => {
                    this.list = response.data.data.list
                })
                .catch(error => {console.log(error)})
        },
        getCollectMusic(id) {
            
            mainApi.getCollectMusic(id)
                .then(response => {
                    this.list = response.data.data.list
                })
                .catch(error => {console.log(error)})
        },
        getOwnArticle(id) {
            
            mainApi.getOwnArticle(id)
                .then(response => {
                    this.list = response.data.data.list
                })
                .catch(error => {console.log(error)})
        },
        getOwnMusic(id) {
            
            mainApi.getOwnMusic(id)
                .then(response => {
                    this.list = response.data.data.list
                })
                .catch(error => {console.log(error)})
        }
    },
    filters: {
        getSex(sex) {
            if(sex == 1) {
                return '男'
            } else {
                return '女'
            }
        }
    }
}
</script>

<style scoped>

#info {
    color: #111;
    position: absolute;
    width: 100%;
    min-height: 100%;
    top: 0;
    left: 0;
    z-index: 100;
    background: #eee;
} 

.content-wrap {
    width: 100%;
    height: 100%;
    position: relative;
}

/* 左侧区域 */
.left-div {
    width: 40%;
    height: auto;
    float: left;
    margin-left: 18%;
    padding: 14px 0;
    margin-top: 50px;
} 

.left-div .user-top {
    width: 100%;
    height: 20%;
    background: white;
    position: relative;
    color: #38c2c9;
}

.left-div .user-top .user-view .avatar img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    transform: translateX(80%) translateY(20%);
}

.left-div .user-top .user-view .data ul {
    list-style: none;
    font-size: 15px;
    display: flex;
    flex-direction: row;
}

.left-div .user-top .user-view .data li {
    display: inline-block;
    width: 40px;
}

.left-div .user-top .user-view .data .num {
    padding-left: 10px;
}

.left-div .user-top .user-view .desc {
    float: right;
    transform: translateY(-200px) translateX(-40px);
    font-size: 14px;
}

.left-div .user-top .user-view .desc li {
    list-style: none;
    margin-top: 10px;
}

.left-div .user-selector {
    width: 100%;
    height: 20%;
    background: white;
    position: relative;
}

.left-div .user-selector ul {
    list-style: none;
    display: flex;
    flex-direction: row;
}

.left-div .user-selector ul li {
    display: block;
    margin-left: 10px;
    height: 35px;
    transform: translateY(10px);
    width: 72px;
    line-height: 30px;
    text-align: center;
    border-bottom: 4px solid white;
    cursor: pointer;
}

.left-div .user-selector ul li:hover {
    border-bottom: 4px solid #38c2c9;
}

.selector-active {
    border-bottom: 4px solid #38c2c9;
}

/* user-con */
.left-div .user-con {
    width: 100%;
    background: white;
    position: relative;
    height: 426px;
    margin-top: 20px;
    overflow: auto;
}

.left-div .user-con ul {
    display: flex;
    flex-direction: column;
    list-style: none;
}

.left-div .user-con ul li {
    display: flex;
    flex-direction: row;
    margin-top: 20px;
}

.left-div .user-con .info {
    transform: translateX(20px);
}

.left-div .user-con .info .title {
    color: #444;
    font-size: 14px;
    margin-top: 5px;
}

.left-div .user-con .info .name {
    font-size: 13px;
    color: #1b52e7;
    margin-top: 10px;
}

.left-div .user-con .info .count {
    display: flex;
    flex-direction: row;
    margin-top: 10px;
}

.left-div .user-con .info .count .ico-view {
    color: #999;
    font-size: 10px;
    padding-left: 20px;
    transform: translateX(10px);
    background: url(@/assets/imges/main/img52.png) left center no-repeat;
}

.left-div .user-con .info .count .ico-digg {
    color: #999;
    font-size: 10px;
    padding-left: 20px;
    transform: translateX(40px);
    background: url(@/assets/imges/main/img53.png) left center no-repeat;
}

.left-div .user-con .cover img {
    width: 77px;
    height: 77px;
}

.left-div .user-con .blank {
    transform: translateX(200px) translateY(100px);
}

/* collect-title */
.left-div .user-con .collect-title {
    width: 100%;
    height: 30px;
    display: flex;
    flex-direction: row;
}

.left-div .user-con .collect-title .head {
    border-left: 5px solid rgb(241, 131, 6);
    padding-left: 20px;
    line-height: 20px;
}

.left-div .user-con .collect-title a {
    font-size: 10px;
    display: block;
    width: 80px;
    cursor: pointer;
}

.collect-active {
    color: #2789e6;
}


a {
    text-decoration: none;
    outline: none;
    color: inherit;
}

.left-div a {

    width: 100%;
    height: 100%;
    display: block;
    text-align: center;
    letter-spacing: 1px;
}

.left-div a:hover {
    color: rgb(29, 125, 235);
    width: 100%;
}

/* 中心区域 */
.uc-main {
    width: 20%;
    float: right;
    display: inline;
    margin-top: 50px;
    height: auto;
    margin-right: 20%;
    border-radius: 3px;
}

.uc-main .main-top {
    background-color: #fff;
}

.uc-main .main-top ul {
    list-style: none;
    color: #1ab993;
    display: flex;
    flex-direction: row;
}

.uc-main .main-top ul li {
    display: inline-block;
    height: 55px;
}

.uc-main .main-top ul .ico-xwz {
    background: url(@/assets/imges/main/img50.png) left center no-repeat;
    padding-left: 20px;
    display: inline-block;
    transform: translateY(15px) translateX(10px);
}

.uc-main .main-top ul .ico-fhd {
    background: url(@/assets/imges/main/img51.png) left center no-repeat;
    padding-left: 20px;
    display: inline-block;
    transform: translateY(15px) translateX(50px);
}

.uc-main .main-rec {
    background-color: #fff;
}

.uc-main .main-rec .rec-top {
    height: 45px;
    border-bottom: 1px solid #f2f2f2;
}

.uc-main .main-rec .rec-top .rec-title {
    display: inline-block;
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 10px;
}

.uc-main .main-rec .rec-content li {
    display: flex;
    flex-direction: row;
    margin-top: 20px;
}

.uc-main .main-rec .rec-content .cover img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
}

.uc-main .main-rec .rec-content li .info {
    margin-left: 10px;
}

.uc-main .main-rec .rec-content li .info .name {
    font-size: 13px;
    color: #3169b0;
}

.uc-main .main-rec .rec-content li .info .title {
    font-size: 10px;
}

.uc-main .main-rec .rec-content li .info .count {
    font-size: 10px;
    color: #999;
}


@media (max-width: 1357px) {
    .left-div {
        width: 150px;
        font-size: 13px;
        height: 600px;
    }

    .content-wrap {
        display: flex;
        justify-content: center;
        width: 100%;
        height: 100%;
        position: relative;
    }

    .uc-main {
        margin: 50px auto;
    }
}

</style>