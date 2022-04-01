<template>
  <div id="article">
      <CommNav :userInfo="userInfo"/>

      <div class="article">
          <!-- 左侧美文内容 -->
          <div class="left-wrapper">
              <!-- 美文所属标签 -->
              <div class="tags">
                <span class="tag" v-show="article.oneTag != null">{{'#' + article.oneTag}}</span>
                <span class="tag" v-show="article.twoTag != null">{{'#' + article.twoTag}}</span>
                <span class="tag" v-show="article.threeTag != null">{{'#' + article.threeTag}}</span>
              </div>
              <h3 class="article-title">{{article.title}}</h3>
              <!-- 美文所属分类 -->
              <div class="classifies">
                  <span class="classify">{{article.articleClassify}}</span>
              </div>
              <!-- 文章发布信息 -->
              <div class="article-info">
                  <span class="publish-time">发布时间: {{article.gmtCreate}}</span>
                  <span class="like">{{article.praiseCount}}赞</span>
                  <span class="comment">{{article.commentCount}}评论</span>
                  <span class="read">{{article.viewCount}}阅读</span>
              </div>
              <!-- 美文封面 -->
              <div class="article-img">
                  <img :src="article.cover" alt="">
              </div>
              <!-- 文本内容 -->
              <div class="article-content" v-html="article.content">
              </div>
          </div>
          <!-- 右侧作者信息 -->
          <div class="right-wrapper">
              <div>
                  <div class="avater">
                     <img :src="articleUser.avatar" alt="">
                  </div>
                  <h3 class="nickname">
                     {{articleUser.nickName}}
                  </h3>
                  <span class="sign">{{articleUser.sign}}</span>
                  <div class="btns">
                    <a class="clickLikekBtn" @click="authorFocus" v-show="focusStatus">已关注</a>
                    <a class="clickBtn" @click="authorFocus" v-show="!focusStatus">关注ta</a>
                    <a class="clickBtn">私信</a>
                  </div>
                  <!-- 作者发文情况 -->
                  <div class="statistics">
                    <span>文章47</span>
                    <span>问答1187</span>
                    <span>获赞{{articleUser.praiseCount}}</span>
                  </div>
              </div>

              <div class="right-recommend">
                  <!-- 推荐主题标题 -->
                  <div class="recommend-title">
                      <span class="title">推荐主题</span>
                      <a target="_blank" href="https://m.xinli001.com/article/theme/list" class="count">255个精选主题</a>
                  </div>
                  <!-- 推荐主题 -->
                  <div class="recommend-theme">
                      <div class="cover">
                          #心理周报
                      </div>
                      <div class="theme-intro">
                          <p>精选热门书籍，升级认知，收获成长，让你更懂心理学。</p>
                          <button class="attentionBtn">关注</button>
                      </div>
                  </div>
                  <!-- 标签sign -->
                  <div class="recommend-sign">
                      <img src="https://ossimg.xinli001.com/pc-download-guide.png" alt="">
                  </div>
                  <!-- 推荐阅读标题 -->
                  <div class="read-title">
                      <span class="title">相关阅读</span>
                      <a target="_blank" href="https://m.xinli001.com/article/theme/list" class="count">自我成长</a>
                  </div>
                  <!-- 推荐阅读内容 -->
                  <ul class="read-content">
                    <li><a target="_blank" href="https://www.xinli001.com/info/100479136">你在婚姻中牺牲自我，另一半却觉得理所应当：当全职主妇，注定没有好下场？ | 咨询室故事</a>
                    </li>
                    <li><a target="_blank" href="https://www.xinli001.com/info/100479130">经营好婚姻的关键是，看清婚姻真相</a>
                    </li>
                    <li><a target="_blank" href="https://www.xinli001.com/info/100479118">为什么当代社会谈恋爱那么难? × 进化心理学｜岩读</a>
                    </li>
                    <li><a target="_blank" href="https://www.xinli001.com/info/100479117">女神分居了？醒醒吧，人家只是探索新式亲密关系</a>
                    </li>
                    <li><a target="_blank" href="https://www.xinli001.com/info/100479094">这个男人对彩礼的回答，惹怒评论区9万人</a>
                    </li>
                  </ul>
                  <!-- 相关作者 -->
                  <div class="read-authors">
                      <span class="title">相关作者</span>
                      <ul>
                          <li><a><img src="https://ossimg.xinli001.com/pc-download-guide.png" alt=""><span>王春华</span></a></li>
                          <li><a><img src="https://ossimg.xinli001.com/pc-download-guide.png" alt=""><span>aixin</span></a></li>
                          <li><a><img src="https://ossimg.xinli001.com/pc-download-guide.png" alt=""><span>周叶</span></a></li>
                      </ul>
                  </div>
              </div>
          </div>
      </div>

      <!-- 文章评论拉取 -->
      <div class="acomment">
          <h3 class="comment-title">"忆"文点评</h3>
          <div class="comment-wrap" v-show="showCommentWrap">
              <el-form>
                <el-form-item>
                    <el-input type="textarea" v-model="addComment.comment"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitComment">点击评论</el-button>
                    <el-button @click="showComment">取消</el-button>
                </el-form-item>
              </el-form>
          </div>
          <button class="comment-btn" v-show="!showCommentWrap" @click="showComment">快来评论</button>
          <ul class="comment-content">
              <li v-for="(item, index) in articleComment" :key="index">
                  <div class="avatar">
                      <div class="user">
                          <div class="avatar">
                              <img :src="item.avatar" alt="">
                          </div>
                          <div class="nickname">
                              {{item.nickName}}
                          </div>
                      </div>
                      <div class="comment-statistics">
                              <a class="like-count" @click="praise(item.userId, item.commentId)"></a><span @click="praise(item.userId, item.commentId)">{{item.praiseCount}}</span>
                              <a class="comm-count"></a><span>0</span>
                      </div>
                      <div class="comment-text">
                          <p>
                              {{item.comment}}
                          </p>
                      </div>
                  </div>
                  <div class="comment-time">
                      评论时间: {{item.gmtCreate}}
                  </div>
              </li>
          </ul>
      </div>
  </div>
</template>

<script>
import CommNav from '@/components/common/CommNav.vue'
import articleApi from '@/api/article'
import cookie from 'js-cookie'

export default {
    components: {
        CommNav
    },
    created() {
        this.init()
        console.log(this.articleUser)
        console.log(this.article)
    },
    data() {
        return {
            userInfo: {},
            addComment: {},
            showCommentWrap: false,
            commentPraise: {},
            focusStatus: false,
            memberFocus: {} 
        }
    },
    methods: {
        init() {
            this.getUserInfoByCookie()
            this.getFocusStatus()
        },
        getArticleComment() {
            const id = this.$route.params.article
            articleApi.getArticleComment(id)
                .then(response => {
                    this.articleComment = response.data.data.articleComment
                })
        },
        getFocusStatus() {
            if(this.userInfo.id) {
                articleApi.getFocusStatus(this.userInfo.id, this.articleUser.id)
                    .then(response => {
                        this.focusStatus = response.data.data.focusStatus
                    })
            }
        },
        getUserInfoByCookie() {
      
            var userInfoStr = cookie.get('recl_ucenter')
            if(userInfoStr) {
                //将用户信息字符串转json对象
                this.userInfo = JSON.parse(userInfoStr)
            }
        },
        submitComment() {
            this.addComment.userId = this.userInfo.id
            this.addComment.articleId = this.$route.params.article
            articleApi.addArticleComment(this.addComment)
                .then(response => {
                    this.getArticleComment()
                    this.addComment = {}
                    this.showCommentWrap = false
                })
        },
        showComment() {
            if(!this.userInfo.id) {
                this.$router.push({path: '/login'})
            } else {
                this.showCommentWrap = !this.showCommentWrap
            }
        },
        praise(userId, commentId) {
            if(!this.userInfo.id) {
                this.$router.push({path: '/login'})
            } else {
                this.commentPraise = {}
                this.commentPraise.praiseUserId = userId
                this.commentPraise.commentId = commentId
                articleApi.praise(this.commentPraise)
                    .then(response =>{
                        this.getArticleComment()
                    })
            }
        },
        authorFocus() {
            if(!this.userInfo.id) {

                this.$router.push({path: '/login'})
            } else {
                this.memberFocus = {}
                this.memberFocus.userId = this.userInfo.id
                this.memberFocus.focusUserId = this.articleUser.id
                articleApi.focus(this.memberFocus)
                    .then(response => {
                        this.focusStatus = response.data.data.focusStatus
                    })
            }
        }
    },
    asyncData({ params, error}) {
            return articleApi.getArticleData(params.article)
                .then(response => {
                    return {
                        article: response.data.data.article,
                        articleUser: response.data.data.articleUser,
                        articleComment: response.data.data.articleComment
                    }
            })
    },
    watch: {
        userInfo: {
            handler(newValue, oldValue) {
                if(this.userInfo.id) {
                    this.getFocusStatus()
                }
            },
            deep: true
        }
    }
}
</script>

<style scoped>

#article {
    position: absolute;
    height: 100%;
    width: 100%;
    min-height: 1000px;
    top: 0;
    left: 0;
    z-index: 100;
}

.article {
    background-color: white;
    display: flex;
    min-height: 100%;
    position: relative;
    min-width: 1200px;
}

.article img {
    width: 44vw;
    height: 50vh;
    margin: 40px 0;
    object-fit: cover;
}

.article .article-img{
    text-align: center;
}

.article-content>>>img {
    max-width: 44vw;
    max-height: 50vh;
    margin: 40px auto;
    object-fit: cover;
    text-align: center;
    display: block;
}

.left-wrapper {
    width: 800px;
    background-color: rgb(255, 255, 255);
    margin-left: 120px;
    margin-top: 50px;
    border-radius: 10px;
    box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.2);
}

.right-wrapper {
    width: 360px;
    height: 360px;
    background-color: #fff;
    margin-top: 90px;
    border-radius: 10px;
    margin-left: 40px;
    text-align: center;
    box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.2);
}

.avater {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin: 20px auto;
}

.avater img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
}

.tags {
    margin-top: 40px;
}

.tag {
    font-family: 'PingFangSC-Regular';
    font-size: 14px;
    color: #999;
    margin-left: 20px;
}

.article-title {
    text-align: center;
    margin-top: 60px;
    font-size: 24px;
}

.classifies {
    margin-top: 50px;
    margin-left: 40px;
}

.classify {
    background: #ddefff;
    border-radius: 6px;
    padding: 2px 7px;
    font-family: 'PingFangSC-Regular';
    font-size: 14px;
    color: #6c798c;
    margin-left: 10px;
}

.article-info {
    margin-top: 20px;
    margin-left: 30px;
}

.article-info span {
    margin-left: 20px;
    font-family: 'PingFangSC-Regular';
    font-size: 14px;
    color: #999;
    margin-left: 31px;
}

.article-content {
    width: 80%;
    margin: 50px auto;
    line-height: 25px;
    letter-spacing: 2px;
}

/* 右侧区域 */
.nickname {
    margin-top: 50px;
}

.sign {
    font-family: 'PingFangSC-Regular';
    font-size: 14px;
    line-height: 24px;
    color: #999;
    margin-top: 8px;
}

.statistics {
    margin-top: 20px;
}

.statistics span {
    font-family: 'PingFangSC-Regular';
    font-size: 16px;
    color: #0b8bff;
    line-height: 14px;
    margin-left: 10px;
}

.btns {
    display: flex;
    justify-content: space-around;
    flex-wrap: nowrap;
    margin-top: 20px;
}

.clickBtn {
    text-decoration: none;
    display: block;
    background: #0b8bff;
    border-radius: 8px;
    width: 140px;
    height: 42px;
    line-height: 42px;
    font-family: 'PingFangSC-Regular';
    font-size: 16px;
    color: #fff;
    cursor: pointer;
}

.clickLikekBtn {
    cursor: pointer;
    text-decoration: none;
    display: block;
    background: #18e466;
    border-radius: 8px;
    width: 140px;
    height: 42px;
    line-height: 42px;
    font-family: 'PingFangSC-Regular';
    font-size: 16px;
    color: #fff;
    font-weight: 600;
}

.acomment {
    width: 50vw;
    background-color: rgb(255, 255, 255);
    margin-left: 120px;
    margin-top: 50px;
    border-radius: 10px;
    box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.2);
    text-align: center;
    display: flex;
    justify-content: center;
    flex-direction: column;
}

.acomment .comment-title {
    margin: 50px 0px;
    font-size: 27px;
    letter-spacing: 3px;
}

.acomment .comment-btn {
    outline: none;
    border: none;
    width: 160px;
    height: 50px;
    margin: 0 auto;
    font-size: 17px;
    font-weight: 600;
    letter-spacing: 3px;
    color: white;
    background-color: #67C23A;
}

.comment-content {
    list-style: none;
    margin: 20px 0;
}

.comment-content li {
    position: relative;
    margin-top: 40px;
}

.comment-content .user {
    display: flex;
}

.comment-content .avatar img {
    width: 55px;
    height: 55px;
    border-radius: 50%;
}

.comment-content .nickname {
    font-size: 16px;
    color: #8b8b8b;
    margin: 15px 30px;
}

.comment-content .comment-statistics {
   position: absolute;
   right: 100px;
   top: 10px;
}

.comment-content .comment-text {
    width: 70%;
    line-height: 28px;
    text-align: left;
    margin: 20px auto;
    background: #f3f4f5;
    box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.2);
    padding: 20px 0;
    letter-spacing: 1px;
}

.comment-content .comment-text p {
    margin: 0 40px;
}

.comment-content .comment-time {
    text-align: left;
    margin: 40px 80px;
    letter-spacing: 2px;
    color: #999;
    font-size: 16px;
}

.comment-statistics .like-count {
    background: url("@/assets/imges/65573bd72facffc.jpg") no-repeat;
    background-size: 100% 100%;
    display: inline-block;
    width: 20px;
    height: 20px;
    cursor: pointer;
}

.comment-statistics span {
    margin: 0 10px;
}

.comment-statistics .comm-count {
    background: url("@/assets/imges/97573cddec5c805.jpg") no-repeat;
    background-size: 100% 100%;
    width: 24px;
    display: inline-block;
    height: 24px;
    margin-left: 20px;
    cursor: pointer;
}

.acomment .comment-wrap {
    width: 70%;
    margin: 1px auto;
}

.right-recommend {
    top: 0;
    float: right;
    width: 360px;
    height: 960px;
    background-color: #fff;
    margin-top: 90px;
    border-radius: 10px;
    margin-left: 40px;
    box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.2);
}

a {
    text-decoration: none;
}

a:hover {
    text-decoration: none;
}

.right-recommend .recommend-title {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    margin-top: 20px;
}

.right-recommend .recommend-title .title {
    font-family: 'PingFangSC-Medium';
    font-size: 18px;
    color: #333;
    line-height: 18px;
    font-weight: 700;
}

.right-recommend .recommend-title .count {
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    font-family: 'PingFangSC-Regular';
    font-size: 14px;
    color: #999;
    padding-right: 15px;
    background-size: 14px auto;
}

.recommend-theme {
    display: flex;
    justify-content: space-between;
    padding: 15px;
    border-bottom: 1px solid rgb(231, 231, 231);
}

.recommend-theme .cover {
    width: 150px;
    height: 100px;
    background-size: 100% 100%;
    background-image: url('@/assets/imges/yl.png');
    color: #fff;
    font-weight: 400;
    line-height: 85px;
    margin-top: 20px;
    border-radius: 10px;
}

.recommend-theme p {
    font-family: 'PingFangSC-Regular';
    font-size: 14px;
    color: #999;
    width: 155px;
    height: 63px;
    text-align: left;
}

.recommend-theme .attentionBtn {
    border: 1px solid #666;
    border-radius: 8px;
    font-family: 'PingFangSC-Regular';
    font-size: 14px;
    color: #666;
    outline: none;
    width: 76px;
    height: 28px;
    background-color: #fff;
    margin-top: 16px;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    cursor: pointer;
}

.recommend-sign {
    width: 100%;
    height: 90px;
}

.recommend-sign img{
    width: 100%;
    height: 90px;
    object-fit: cover;
}

.read-title {
    display: flex;
    justify-content: space-between;
    padding: 15px;
    margin-top: 80px;
}

.right-recommend .read-title .title {
    font-family: 'PingFangSC-Medium';
    font-size: 18px;
    color: #333;
    line-height: 18px;
    font-weight: 700;
}

.right-recommend .read-title .count {
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    font-family: 'PingFangSC-Regular';
    font-size: 14px;
    color: #999;
    padding-right: 15px;
    background-size: 14px auto;
}

.read-content li {
    list-style: none;
    position: relative;
    margin-top: 10px;
}

.read-content li::before {
    content: "";
    background-color: #999;
    width: 4px;
    height: 4px;
    position: absolute;
    left: -20px;
    top: 50%;
    -webkit-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
    border-radius: 50%;
}

.read-content a {
    display: block;
    font-family: 'PingFangSC-Regular';
    font-size: 14px;
    color: #666;
    line-height: 21px;
    text-align: left;
    width: 95%;
}

.read-authors {
    margin-top: 50px;
}

.read-authors .title {
    font-family: 'PingFangSC-Medium';
    font-size: 18px;
    color: #333;
    line-height: 18px;
    font-weight: 700;
    text-align: left;
} 

.read-authors ul {
    list-style: none;
}

.read-authors li a {
    display: block;
    width: 50px;
    height: 50px;
    border-radius: 50%;
}

.read-authors li a span {
    font-family: 'PingFangSC-Regular';
    font-size: 14px;
    color: #333;
}

.read-authors li a img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
}

.read-authors ul {
    display: flex;
}

.read-authors li {
    margin-left: 40px;
}

</style>