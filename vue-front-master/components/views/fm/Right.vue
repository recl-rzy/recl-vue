<template>
  
    <div class="right">

        <div :class="{'nav': true, 'nav-move': hiddenWrap}" >
            <!-- 监听当前区域是否被鼠标点击 -->
            <div ref="showWrap">

                <div class="avatar">
                    <img :src="userInfo.avatar" alt="" key="avatar">
                </div>

                <div class="selector">
                    <ul>
                        <li :class="{active: focus === 'rec'}" @click="focus = 'rec',hiddenWrap = true,moodFocus = '', recMusic('new')">推荐</li>
                        <li :class="{active: focus === 'mood'}" @click="focus = 'mood',hiddenWrap = true,moodFocus = ''">心情</li>
                        <li :class="{active: focus === 'index'}" @click="focus = 'index',hiddenWrap = true" ref="index">
                            <a href="/">首页</a>
                        </li>
                        <li :class="{active: focus === 'sec'}" @click="focus = 'sec',hiddenWrap = true">  
                            <img src="http://lapp.xinli001.com/images/fm/search.png" width="20" height="20" class="sec">
                        </li>
                    </ul>
                </div>

            </div>

        </div>

        <div class="hidden" v-if="hiddenWrap" ref="showWrap1">
            <!-- 推荐区域 -->
            <div class="rec" v-if="focus === 'rec'">
                <ul class="rec-ul">
                    <li @click="recMusic('new')" :class="{'rec-active': recFocus === 'new'}">最新</li>
                    <li @click="recMusic('hot')" :class="{'rec-active': recFocus === 'hot'}">本月最热</li>
                </ul>

                <div class="items">
                    <div class="item">
                        <ul>
                            <li v-for="(item, index) in musicList" :key="index">
                                <div class="item">
                                    <a :href="'/fm/' + item.id">
                                        <img :src="item.cover" alt=""/>
                                    </a>
                                    <div class="content">
                                        <a :href="'/fm/' + item.id">
                                            <div class="title">{{item.title.slice(0, 15) + "..."}}</div>
                                            <div class="username">{{item.nickName}}</div>
                                            <div class="collect">{{'收藏: ' + item.collectCount}}</div>
                                        </a>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <!-- 心情区域 -->
            <div class="mood" v-if="focus === 'mood'">
                <div class="mood-seletor" v-if="!moodFocus" ref="moodSelector">
                    <a href="#" class="fret" @click.stop="moodFocus='fret', moodMuisc('烦躁')">烦躁</a>
                    <a href="#" class="sad" @click.stop="moodFocus='sad', moodMuisc('悲伤')">悲伤</a>
                    <a href="#" class="alone" @click.stop="moodFocus='alone', moodMuisc('孤独')">孤独</a>
                    <a href="#" class="hehe" @click.stop="moodFocus='hehe', moodMuisc('已弃疗')">已弃疗</a>
                    <a href="#" class="relax" @click.stop="moodFocus='relax', moodMuisc('减压')">减压</a>
                    <a href="#" class="helpless" @click.stop="moodFocus='helpless', moodMuisc('无奈')">无奈</a>
                    <a href="#" class="happy" @click.stop="moodFocus='happy', moodMuisc('快乐')">快乐</a>
                    <a href="#" class="moved" @click.stop="moodFocus='moved', moodMuisc('感动')">感动</a>
                    <a href="#" class="confused" @click.stop="moodFocus='confused', moodMuisc('迷茫')">迷茫</a>
                </div>
                <!-- 心情区域显示内容 -->
                <div class="mood-content" v-if="moodFocus != ''">
                    <div class="mood-wrap">
                        <div class="sad-wrap" v-if="moodFocus == 'sad'">
                            <div class="sad-imge"></div>
                            <span>悲伤</span>
                        </div>
      
                        <div class="alone-wrap" v-if="moodFocus == 'alone'">
                            <div class="alone-imge"></div>
                            <span>孤独</span>
                        </div>
        
                  
                        <div class="confused-wrap" v-if="moodFocus == 'confused'">
                            <div class="confused-imge"></div>
                            <span>迷茫</span>
                        </div>
             
                  
                        <div class="fret-wrap" v-if="moodFocus == 'fret'">
                            <div class="fret-imge"></div>
                            <span>烦躁</span>
                        </div>
                
                   
                        <div class="happy-wrap" v-if="moodFocus == 'happy'">
                            <div class="happy-imge"></div>
                            <span>快乐</span>
                        </div>
                   
                   
                        <div class="hehe-wrap" v-if="moodFocus == 'hehe'">
                            <div class="hehe-imge"></div>
                            <span>已弃疗</span>
                        </div>
                
                 
                        <div class="helpless-wrap" v-if="moodFocus == 'helpless'">
                            <div class="helpless-imge"></div>
                            <span>无奈</span>
                        </div>
             
                 
                        <div class="moved-wrap" v-if="moodFocus == 'moved'">
                            <div class="moved-imge"></div>
                            <span>感动</span>
                        </div>
              
            
                        <div class="relax-wrap" v-if="moodFocus == 'relax'">
                            <div class="relax-imge"></div>
                            <span>减压</span>
                        </div>
                    </div>
                    <div class="items">
                        <div class="item">
                            <ul>
                                <li v-for="(item, index) in musicList" :key="index">
                                    <div class="item">
                                        <a :href="'/fm/' + item.id">
                                            <img :src="item.cover" alt=""/>
                                        </a>
                                        <div class="content">
                                            <a :href="'/fm/' + item.id">
                                                <div class="title">{{item.title.slice(0, 15) + "..."}}</div>
                                                <div class="username">{{item.nickName}}</div>
                                                <div class="collect">{{'收藏: ' + item.collectCount}}</div>
                                            </a>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
    

</template>

<script>
import cookie from 'js-cookie'
import musicApi from '@/api/music.js'

export default {
    mounted() {
        this.init()
        document.addEventListener('click', (e) => {
            
            if(this.$refs.showWrap) {
                let isShowClick = this.$refs.showWrap.contains(e.target) 
                if(!isShowClick)  this.hiddenWrap = false
            }
            if(this.$refs.index) {
                let indexClick = this.$refs.index.contains(e.target)
                if(indexClick) this.hiddenWrap = false
            }

            if(this.$refs.showWrap1) {
                let isHiddenClick = this.$refs.showWrap1.contains(e.target)
                if(isHiddenClick) this.hiddenWrap = true
            }

            if(this.$refs.moodSelector) {
                let isMoodSelectorClick = this.$refs.moodSelector.contains(e.target)
                if(isMoodSelectorClick) {
                    this.hiddenWrap = true
                }
            }
        })
    },
    data() {
        return {
            focus: '',
            recFocus: 'new',
            moodFocus: '',
            hiddenWrap: false,
            musicList: [],
            limit: 20,
            musicQuery: {},
            userInfo: {}
        }
    },
    methods: {
        init() {
            this.getUserInfoByCookie()
        },
        getUserInfoByCookie() {
        
            var userInfoStr = cookie.get('recl_ucenter')
            if(userInfoStr) {
                //将用户信息字符串转json对象
                this.userInfo = JSON.parse(userInfoStr)
                this.userInfo.password = ''
            }
        },
        musicSift() {
            musicApi.musicSift(this.limit, this.musicQuery)
                .then(response => {
                    this.musicList = response.data.data.musicList
                })
                .catch(error => {console.log(error)})
        },
        recMusic(reFocus) {
            this.musicQuery = {}
            this.recFocus = reFocus
            if(reFocus == 'new') {
                this.musicQuery.latest = true
            } else {
                this.musicQuery.hot = true
            }
            this.musicSift()
        },
        moodMuisc(mood) {
            this.hiddenWrap = true
            this.musicQuery = {}
            this.musicQuery.musicMood = mood
            this.musicSift()
        }
    }

}
</script>

<style scoped>

.right {
    float: right;
    right: 0;
    top: 0;
    height: 100%;
    -webkit-transform: translateY(-617px);
    transform: translateY(-617px);

    -webkit-transition: -webkit-transform .3s ease-in-out;
    transition: transform .3s ease-in-out;
}

.right .nav {
    width: 100px;
    height: 100%;
    background-color: #222629;
    text-align: center;
    z-index: 200;
    box-shadow: -5px 0 2px rgba(0,0,0,.1);
}

.right .nav .avatar img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 50%;
    margin: 50px auto;
}

.right .nav .selector ul {
    display: flex;
    flex-direction: column;
    justify-content: left;
    color: #fff;
}

.nav-move {
    -webkit-transform: translateX(-100px);
    transform: translateX(-100px);
}

.right .nav .selector li {
    display: block;
    list-style: none;
    width: 100px;
    height: 43px;
    margin: 0 -40px;
    cursor: pointer;
    font-style: normal;
    font-size: 14px;
    font-family: "微软雅黑";
    line-height: 40px;
}

.right .nav .selector .sec {
    margin-top: 13px;
}

.active {
    background-color: #191c1f;
}

.hidden {
    height: 100%;
    background-color: rgb(255, 255, 255);
    overflow: auto;
    width: 350px;
    -webkit-transform: translateY(-768px);
    transform: translateY(-768px);
}

.hidden .rec .rec-ul {
    margin-top: 30px;
    border-bottom: 1px solid #222629;
}

.hidden .rec ul li {
    list-style: none;
    display: inline-block;
    cursor: pointer;
    font-style: normal;
    height: 31px;
    font-size: 14px;
    padding: 1px 20px;
    line-height: 30px;
    font-family: "微软雅黑";
}

.item img {
    width: 70px;
    height: 70px;
    object-fit: cover;
    margin-left: -25px;
}

/* 心情 */
.hidden .mood .mood-seletor a {
    display: inline-block;
    width: 150px;
    padding-top: 120px;
    padding-bottom: 10px;
    box-shadow: 0 0 3px rgba(0,0,0,.2);
    margin: 10px 0 10px 14px;
    text-align: center;
    background-position: center;
    background-repeat: no-repeat;
    color: #787a7c;
}

.hidden .mood .mood-content li {
    list-style: none;
    display: inline-block;
    cursor: pointer;
    font-style: normal;
    height: 31px;
    font-size: 14px;
    padding: 1px 20px;
    line-height: 30px;
    font-family: "微软雅黑";
} 

.hidden .mood .mood-content .sad-wrap {
    display: flex;
    flex-direction: row;
    padding-top: 5px;
    background-color: #9ecee4;
    height: 46px;
    font-style: normal;
    color: #fff;
    line-height: 35px;
    font-size: 14px;
    font-family: "微软雅黑";
}

.hidden .mood .mood-content .sad-imge {
    background-image: url("@/assets/imges/mood/r_sad.png");
    background-size: 100% 100%;
    object-fit: cover;
    margin: 5px 20px;
    width: 30px;
    height: 30px;
}

.hidden .mood .mood-content .fret-wrap {
    display: flex;
    flex-direction: row;
    padding-top: 5px;
    background-color: #e7925d;
    height: 46px;
    font-style: normal;
    color: #fff;
    line-height: 35px;
    font-size: 14px;
    font-family: "微软雅黑";
}

.hidden .mood .mood-content .fret-imge {
    background-image: url("@/assets/imges/mood/r_fret.png");
    background-size: 100% 100%;
    object-fit: cover;
    margin: 5px 20px;
    width: 30px;
    height: 30px;
}

.hidden .mood .mood-content .alone-wrap {
    display: flex;
    flex-direction: row;
    padding-top: 5px;
    background-color: #9ecee4;
    height: 46px;
    font-style: normal;
    color: #fff;
    line-height: 35px;
    font-size: 14px;
    font-family: "微软雅黑";
}

.hidden .mood .mood-content .alone-imge {
    background-image: url("@/assets/imges/mood/r_alone.png");
    background-size: 100% 100%;
    object-fit: cover;
    margin: 5px 20px;
    width: 30px;
    height: 30px;
}

.hidden .mood .mood-content .hehe-wrap {
    display: flex;
    flex-direction: row;
    padding-top: 5px;
    background-color: #b69bd4;
    height: 46px;
    font-style: normal;
    color: #fff;
    line-height: 35px;
    font-size: 14px;
    font-family: "微软雅黑";
}

.hidden .mood .mood-content .hehe-imge {
    background-image: url("@/assets/imges/mood/r_hehe.png");
    background-size: 100% 100%;
    object-fit: cover;
    margin: 5px 20px;
    width: 30px;
    height: 30px;
}

.hidden .mood .mood-content .relax-wrap {
    display: flex;
    flex-direction: row;
    padding-top: 5px;
    background-color: #92cf67;
    height: 46px;
    font-style: normal;
    color: #fff;
    line-height: 35px;
    font-size: 14px;
    font-family: "微软雅黑";
}

.hidden .mood .mood-content .relax-imge {
    background-image: url("@/assets/imges/mood/r_relax.png");
    background-size: 100% 100%;
    object-fit: cover;
    margin: 5px 20px;
    width: 30px;
    height: 30px;
}

.hidden .mood .mood-content .helpless-wrap {
    display: flex;
    flex-direction: row;
    padding-top: 5px;
    background-color: #87c3de;
    height: 46px;
    font-style: normal;
    color: #fff;
    line-height: 35px;
    font-size: 14px;
    font-family: "微软雅黑";
}

.hidden .mood .mood-content .helpless-imge {
    background-image: url("@/assets/imges/mood/r_helpless.png");
    background-size: 100% 100%;
    object-fit: cover;
    margin: 5px 20px;
    width: 30px;
    height: 30px;
}

.hidden .mood .mood-content .happy-wrap {
    display: flex;
    flex-direction: row;
    padding-top: 5px;
    background-color: #e7925d;
    height: 46px;
    font-style: normal;
    color: #fff;
    line-height: 35px;
    font-size: 14px;
    font-family: "微软雅黑";
}

.hidden .mood .mood-content .happy-imge {
    background-image: url("@/assets/imges/mood/r_happy.png");
    background-size: 100% 100%;
    object-fit: cover;
    margin: 5px 20px;
    width: 30px;
    height: 30px;
}

.hidden .mood .mood-content .moved-wrap {
    display: flex;
    flex-direction: row;
    padding-top: 5px;
    background-color: #f47c8c;
    height: 46px;
    font-style: normal;
    color: #fff;
    line-height: 35px;
    font-size: 14px;
    font-family: "微软雅黑";
}

.hidden .mood .mood-content .moved-imge {
    background-image: url("@/assets/imges/mood/r_moved.png");
    background-size: 100% 100%;
    object-fit: cover;
    margin: 5px 20px;
    width: 30px;
    height: 30px;
}

.hidden .mood .mood-content .confused-wrap {
    display: flex;
    flex-direction: row;
    padding-top: 5px;
    background-color: #e7925d;
    height: 46px;
    font-style: normal;
    color: #fff;
    line-height: 35px;
    font-size: 14px;
    font-family: "微软雅黑";
}

.hidden .mood .mood-content .confused-imge {
    background-image: url("@/assets/imges/mood/r_confused.png");
    background-size: 100% 100%;
    object-fit: cover;
    margin: 5px 20px;
    width: 30px;
    height: 30px;
}


.fret {
    background-image: url("@/assets/imges/mood/fret.png");
}

.fret:hover {
    background-image: url("@/assets/imges/mood/r_fret.png");
    background-color: #e7925d;
}

.sad {
    background-image: url("@/assets/imges/mood/sad.png");
}

.sad:hover {
    background-image: url("@/assets/imges/mood/r_sad.png");
    background-color: #9ecee4;
}

.alone {
    background-image: url("@/assets/imges/mood/alone.png");
}

.alone:hover {
    background-image: url("@/assets/imges/mood/r_alone.png");
    background-color: #9ecee4;
}

.hehe {
    background-image: url("@/assets/imges/mood/hehe.png");
}

.hehe:hover {
    background-image: url("@/assets/imges/mood/r_hehe.png");
    background-color: #b69bd4;
}

.relax {
    background-image: url("@/assets/imges/mood/relax.png");
}

.relax:hover {
    background-image: url("@/assets/imges/mood/r_relax.png");
    background-color: #92cf67;
}

.helpless {
    background-image: url("@/assets/imges/mood/helpless.png");
}

.helpless:hover {
    background-image: url("@/assets/imges/mood/r_helpless.png");
    background-color: #87c3de;
}

.happy {
    background-image: url("@/assets/imges/mood/happy.png");
}

.happy:hover {
    background-image: url("@/assets/imges/mood/r_happy.png");
    background-color: #e7925d;
}

.moved {
    background-image: url("@/assets/imges/mood/moved.png");
}

.moved:hover {
    background-image: url("@/assets/imges/mood/r_moved.png");
    background-color: #f47c8c;
}

.confused {
    background-image: url("@/assets/imges/mood/confused.png");
}

.confused:hover {
    background-image: url("@/assets/imges/mood/r_confused.png");
    background-color: #e7925d;
}

.item {
    display: flex;
    flex-direction: row;
    margin-top: 20px;
}

.item .content {
    margin-left: 20px;
    margin-top: -10px;
}

.item .content .title {
    font-style: normal;
    font-size: 15px;
    font-family: "微软雅黑";
    font-weight: 600;
    color: black;
}


.rec-active {
    background-color: #222629;
    color: #fff;
}

a {
    text-decoration: none;
    color: inherit;
    outline: none;
}

a:hover {
    text-decoration: none;
    color: inherit;
    outline: none;
}





</style>