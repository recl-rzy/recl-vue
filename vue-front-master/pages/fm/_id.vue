<template>
  <div class="music-wrapper" :style="{backgroundImage: 'url('+ cover.imgUrl + ')'}">

      <div class="music-play-wrap">

          <!-- 顶部 -->
          <div class="music-top">
            <h3>忆心FM</h3>
            <div class="music-title">与心灵相约</div>
          </div>

          <!-- 中心播放器 -->
          <audio
            :src="musicList[current].musicUrl"
            ref="audio"
            autoplay="true"
            @canplay="getDuration"
            @timeupdate="getCurrentTime"
          ></audio>
          
          <div class="music-center">
            <!-- 播放器旋转UI特效 -->
            <div class="musicCover">
              <div class="shade"></div>
              <div
                :class="[
                  { 'center-circle': true },
                  { 'center-circle-animation': playState },
                ]"
              >
                <img :src="musicList[current].cover" alt="" key="cover">
              </div>
              <div class="circle-border" v-show="playState"></div>
              <div class="circle-border" v-show="playState"></div>
              <span class="bubble" v-show="playState"></span>
              <span class="bubble" v-show="playState"></span>
              <span class="bubble" v-show="playState"></span>
              <span class="bubble" v-show="playState"></span>
              <span class="bubble" v-show="playState"></span>
              <span class="bubble" v-show="playState"></span>
              <span class="bubble" v-show="playState"></span>
              <span class="bubble" v-show="playState"></span>
            </div>

            <!-- 播放器显示内容 -->
            <div class="music-content">
              <h3>{{musicList[current].title}}</h3>
              <div class="mName">作者:{{musicList[current].nickName}}</div>
              <div class="sign">
                {{musicList[current].sign}}
              </div>
            </div>

            <!-- 播放器UI -->
            <div class="music-player">
              <ul>
                <li><a href="#" class="player-left" @click="pre"></a></li>
                <li>
                  <a class="player-start" v-show="playState"></a>
                  <a class="player-pause" v-show="!playState"></a>
                </li>
                <li><a class="player-right" @click="next"></a></li>
              </ul>
              <div class="music-process">
                <div class="player-time">{{currentTime}} / {{totalTime}}</div>
                <div class="player-process">
                  <div class="player-process-inner" style="height: 6px" @mouseup="updateProgress" ref="total">
                    <div class="player-progress-load" style="width: 100%" ></div>
                    <div class="player-progress-play" :style="{width: progress}" ref="current">
                      <i class="player-progress-dot"></i>
                    </div>
                  </div>
                  <div class="player-ft">
                    <ul>
                      <li>
                        <a href="#" class="player-comment" @click.stop="getMusicComment()" ref="combtn"
                          ><label>{{musicList[current].commCount | getCommCount}}</label></a
                        >
                      </li>
                      <li>
                        <a href="#" class="player-like" v-if="!musicList[current].isCollect" @click="collect"><label>{{ musicList[current].collectCount | getCollectCount}}</label></a>
                      </li>
                      <li>
                        <a href="#" class="player-liking" v-if="musicList[current].isCollect" @click="collect"><label>{{ musicList[current].collectCount | getCollectCount}}</label></a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

          </div>

      </div>

      <Right v-if="curFocus == 'func'"/>

      <!-- 评论区域 -->
      <div class="comm" v-if="curFocus == 'comment'" ref="comm">
        <div class="comm-wrap">

          <textarea name="content" class="comment_area" rows="3" placeholder="喜欢就要说出来~" v-model="musicComment.comment"></textarea>
          <input type="submit" value="发表" class="send_btn" @click="addMusicComment()">
          <ul>
            <li v-for="(item, index) in commentList" :key="index">
              <div class="avatar">
                <img :src="item.avatar" alt="" :key="index">
              </div>
              <div class="content">
                <div class="name">{{item.nickName}}</div>
                <div class="comment">{{item.comment}}</div>
                <div class="time">{{item.gmtCreate}}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>

  </div>

</template>

<script>
import "@/assets/css/style.css"
import musicApi from "@/api/music"
import Right from '@/components/views/fm/Right.vue'
import cookie from 'js-cookie'

export default {
    components: {
      Right
    },
    asyncData({ params, query, error}) {
      if(query.userId) {
        return musicApi.getMusic(params.id, query.userId)
          .then(response => {
            return {
              musicList: response.data.data.musicList,
              cover: response.data.data.cover,
              curFocus: 'func' 
            }
          })
      } else {
        return musicApi.navMusic(params.id)
          .then(response => {
            return {
              musicList: response.data.data.musicList,
              cover: response.data.data.cover,
              curFocus: 'func' 
            }
          })
      }
      
    },
    mounted() {

      const audioStart = document.querySelector(".player-start");
      const audioPause = document.querySelector(".player-pause");
      const audio = this.$refs.audio;

      document.addEventListener("click", (e) => {

        if(this.$refs.comm) {
          let isClickComm = this.$refs.comm.contains(e.target)
          if(!isClickComm) {
            this.curFocus = 'func'
          } 
        }

        if(this.$refs.combtn) {
          let isClickCmbtn = this.$refs.combtn.contains(e.target)
          if(isClickCmbtn) {
            this.curFocus = 'comment'
          }
        }
      })

      //暂停按钮点击监听
      audioStart.addEventListener("click", () => {
        if (!audio.paused) {
          audio.pause();
          audioStart.style.display = "none";
          audioPause.style.display = "block";
          this.playState = false;
        }
      })
      //播放按钮点击监听
      audioPause.addEventListener("click", () => {
        if (audio.paused) {
          audio.play();
          audioStart.style.display = "block";
          audioPause.style.display = "none";
          this.playState = true;
          // centerCircle.css.animation = ' centerCircle 15s linear backwards infinite '
        }
      })

      //播放结束监听
      audio.addEventListener("ended", () => {
          this.next()
      })

      this.startMusicTimer()
    },
    created() {
        this.init()
    },
    data() {
        return {
            userInfo: {},
            playState: true,
            totalTime: '',
            currentTime: '',
            progress: '0%',
            current: 0,
            musicComment: {},
            commentList: [],
            imgUrl: require("@/assets/imges/pexels-elia-clerici-912110.jpg")
        }
    },
    methods: {
        init() {
          this.getUserInfoByCookie();
        },
        // 播放时间格式化
        next() {
          if(this.current === (this.musicList.length - 1)) {

            this.current = 0
          } else {

            this.current = this.current + 1
          }
          this.playState = true;
        },
        pre() {
          if(this.current === 0) {

            this.current = this.musicList.length - 1
          } else {

            this.current = this.current - 1
          }
          this.playState = true;
        },
        format(time) {

            var m = Math.floor(time/60);
            var s = Math.floor(time%60);
            if(m < 9){
                m = "0" + m;
            }
            if(s < 9){
                s = "0" + s;
            }
            return m+":"+s;
        },
        getDuration() {

          this.totalTime = this.format(this.$refs.audio.duration)
        },
        getCurrentTime() {

          this.currentTime = this.format(this.$refs.audio.currentTime)
        },
        startMusicTimer() {
          const timer = setInterval(() => {

            this.progress = (this.$refs.audio.currentTime / this.$refs.audio.duration) * 100 + '%';
          },100)
        },
        updateProgress(event) {
          const radio = (event.clientX - this.$refs.total.getBoundingClientRect().left) / this.$refs.total.clientWidth
          this.$refs.audio.currentTime = this.$refs.audio.duration * radio
        },
        getUserInfoByCookie() {
            var userInfoStr = cookie.get('recl_ucenter')
            if(userInfoStr) {
                //将用户信息字符串转json对象
                this.userInfo = JSON.parse(userInfoStr)
                this.userInfo.password = ''
            }
        },
        collect() {
          const musicId = this.musicList[this.current].id
          if(!this.userInfo) {
              // 收藏时判断用户是否登录
              this.$router.push({ path: '/login'})
          } else {
              if(!this.musicList[this.current].isCollect) {
                   
                  musicApi.addMusicCollect(musicId, this.userInfo.id)
                    .then(response => {

                        this.$message({
                            showClose: true,
                            type: 'success',
                            message: "收藏成功!"
                        })
                        this.incrCollectCount()
                        this.musicList[this.current].isCollect = !this.musicList[this.current].isCollect

                    })
                    .catch(error => console.log(error))
              } else {

                  musicApi.delMusicCollect(musicId, this.userInfo.id)
                    .then(response => {

                        this.$message({
                            showClose: true,
                            type: 'success',
                            message: "取消收藏成功!"
                        })
                        this.dreCollectCount()
                        this.musicList[this.current].isCollect = !this.musicList[this.current].isCollect
              
                    })
                    .catch(error => console.log(error))
              }
              
          }
        },
        dreCollectCount() {
            if(this.musicList[this.current].collectCount >0)
            this.musicList[this.current].collectCount -= 1
        },
        incrCollectCount() {
            this.musicList[this.current].collectCount += 1
        },
        addMusicComment() {
          if(!this.musicComment.comment) {
            this.$message({
                showClose: true,
                type: 'error',
                message: "请输入评论内容!"
            })
          } else if (!this.userInfo.id) {
            this.$router.push({ path: '/login'})
          } else {
            this.musicComment.musicId = this.musicList[this.current].id
            this.musicComment.userId = this.userInfo.id
            musicApi.addMusicComment(this.musicComment)
              .then(response => {
                  this.$message({
                    showClose: true,
                    type: 'success',
                    message: "感谢你的评论!"
                  })
                  this.musicComment.comment = ''
                  this.musicList[this.current].commCount += 1
                  this.getMusicComment()
              })
          }
        },
        getMusicComment() {
          this.curFocus = 'comment'
          musicApi.getMusicComment(this.musicList[this.current].id)
            .then(response => {
              this.commentList = response.data.data.commentList
            })
        }
    },
    filters: {
        getCollectCount(count) {
          if(count > 10000) {

            return '(1万+)'
          }
          if(count > 999) {
            
            return '(999+)'
          } 

          return '(' + count + ')'
        },
        getCommCount(count) {
          if(count > 10000) {

            return '(1万+)'
          }
          if(count > 999) {
            
            return '(999+)'
          } 

          return '(' + count + ')'
        }
    }
}
</script>

<style scoped>
.music-wrapper {
  height: 100%;
  width: 100%;
  position: fixed;
  background-repeat: no-repeat, no-repeat;
  background-size: 100% 100%;
  object-fit: contain;
  z-index: 100;
}

.musicCover {
  margin: 50px 50px;
  position: fixed;
}

.center-circle {
  position: absolute;
  z-index: 2;

  /* background: url(~/assets/imges/yl.png) no-repeat;
  background-size: cover; */
}

.center-circle img {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  box-sizing: border-box;
  object-fit: cover;
  border: 2px solid rgb(226, 198, 54);
}

.center-circle-animation {
  animation: centerCircle 15s linear backwards infinite;
}

@keyframes centerCircle {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}

.circle-border {
  width: 200px;
  height: 200px;
  border-radius: 100%;
  box-sizing: border-box;
  border: 2px solid rgb(226, 198, 54);
  position: absolute;

  animation: circleBorder 2s ease-in backwards infinite;
}

.circle-border:nth-of-type(3) {
  animation: circleBorder 2s ease-in backwards infinite;
}
.circle-border:nth-of-type(4) {
  animation: circleBorder 2s 1s ease-in backwards infinite;
}

@keyframes circleBorder {
  0% {
    transform: scale(1);
    border: 2px solid rgb(226, 198, 54);
  }
  100% {
    transform: scale(1.2);
    border: 2px solid rgba(0, 0, 0, 0);
  }
}

.bubble {
  width: 10px;
  height: 10px;
  margin: 100px 100px;
  background-color: rgb(226, 198, 54);
  border-radius: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
}

.bubble:nth-of-type(1) {
  transform: translate(4rem, 4rem);
  animation: bubbleMove1 4s linear infinite;
}
@keyframes bubbleMove1 {
  0% {
    transform: translate(4rem, 4rem) scale(1);
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translate(9rem, 9rem) scale(0);
    opacity: 0;
  }
}
.bubble:nth-of-type(2) {
  animation: bubbleMove2 5s linear infinite;
}
@keyframes bubbleMove2 {
  0% {
    transform: translate(-4rem, 4rem) scale(1);
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translate(-8rem, 9rem) scale(0);
    opacity: 0;
  }
}
.bubble:nth-of-type(3) {
  animation: bubbleMove3 5s ease-in infinite;
}
@keyframes bubbleMove3 {
  0% {
    transform: translate(4rem, -4rem) scale(1);
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translate(10rem, -4rem) scale(0);
    opacity: 0;
  }
}
.bubble:nth-of-type(4) {
  animation: bubbleMove4 5s ease-out infinite;
}
@keyframes bubbleMove4 {
  0% {
    transform: translate(-4rem, -4rem) scale(1);
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translate(-10rem, -12rem) scale(0);
    opacity: 0;
  }
}
.bubble:nth-of-type(5) {
  animation: bubbleMove5 2.5s linear infinite;
}
@keyframes bubbleMove5 {
  0% {
    transform: translate(7rem, 0rem) scale(1);
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translate(7rem, -15rem) scale(0);
    opacity: 0;
  }
}
.bubble:nth-of-type(6) {
  animation: bubbleMove6 4s linear infinite;
}
@keyframes bubbleMove6 {
  0% {
    transform: translate(-7rem, 0rem) scale(1);
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translate(-13rem, 4rem) scale(0);
    opacity: 0;
  }
}
.bubble:nth-of-type(7) {
  animation: bubbleMove7 4.5s linear infinite;
}
@keyframes bubbleMove7 {
  0% {
    transform: translate(0rem, -7rem) scale(1);
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translate(-11rem, -3rem) scale(0);
    opacity: 0;
  }
}
.bubble:nth-of-type(8) {
  transform: translate(0rem, 7rem);
  animation: bubbleMove8 3s ease-in-out infinite;
}

@keyframes bubbleMove8 {
  0% {
    transform: translate(0rem, 7rem) scale(1);
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translate(-2rem, 12rem) scale(0);
    opacity: 0;
  }
}

.music-top {
  color: white;
  letter-spacing: 2px;
  margin-left: 60px;
}

.music-top h3 {
  font-size: 23px;
}

.music-title {
  font-size: 14px;
}

.music-center {
  width: 700px;
  height: 420px;
  background-color: rgba(0, 0, 0, 0.2);
  border: 1px solid #409eff;
  position: relative;
  margin: 50px auto;
}

.music-content {
  position: absolute;
  right: 0;
  text-align: center;
  margin: 40px 20px;
  color: rgba(248, 241, 241, 0.87);
  line-height: 25px;
  letter-spacing: 2px;
}

.music-content .mName {
  margin-bottom: 20px;
}

.music-content .sign {
  width: 360px;
  text-align: left;
}

.music-player {
  bottom: 30px;
  position: absolute;
}

.music-player ul {
  list-style: none;
}

.music-player ul a {
  display: block;
}

.player-left {
  background: url(~/assets/imges/player.a628799e.png);
  background-position: 0 -30px;
  width: 19px;
  height: 20px;
  margin: 30px 30px;
  cursor: pointer;
}

.player-pause {
  display: block;
  background-position: 0 0;
  background: url(~/assets/imges/player.a628799e.png);
  width: 21px;
  height: 29px;
  margin: 25px 30px;
  cursor: pointer;
}

.player-start {
  display: block;
  background: url(~/assets/imges/player.a628799e.png);
  width: 21px;
  height: 29px;
  margin: 25px 30px;
  background-position: -30px 0;
  cursor: pointer;
}

.player-right {
  background: url(~/assets/imges/player.a628799e.png);
  width: 19px;
  height: 20px;
  margin: 30px 30px;
  background-position: 0 -52px;
  cursor: pointer;
}

.music-player ul {
  display: flex;
}

.music-player {
  display: flex;
}

.player-process {
  padding-top: 6px;
  height: 8px;
  cursor: pointer;
  width: 312px;
  color: hsla(0, 0%, 88.2%, 0.8);
  position: fixed;
  margin: 60px 40px;
}

.player-process-inner {
  position: relative;
  height: 2px;
  background: hsla(0, 0%, 100%, 0.1);
}

.player-progress-load {
  height: 4px;
  background: hsla(0, 0%, 100%, 0.2);
  cursor: pointer;
  color: hsla(0, 0%, 88.2%, 0.8);
}

.player-progress-play {
  position: absolute;
  top: 1px;
  left: 0;
  height: 2px;
  background: hsla(0, 0%, 100%, 0.7);
}

.player-progress-dot {
  top: -4px;
  right: -4px;
  width: 10px;
  height: 10px;
  opacity: 1;
  filter: none;
  position: absolute;
  background: url(~/assets/imges/player.a628799e.png);
  background-position: 0 -170px;
}

.player-time {
  color: hsla(0, 0%, 88.2%, 0.8);
  font-size: 14px;
  position: absolute;
  width: 150px;
  height: 20px;
  margin: 30px 180px;
  text-align: right;
}

.player-comment {
  width: 23px;
  height: 21px;
  background: url(~/assets/imges/player.a628799e.png);
  background-position: 0 -400px;
  cursor: pointer;
}

.player-like {
  width: 23px;
  height: 21px;
  background: url(~/assets/imges/player.a628799e.png);
  background-position: 0 -96px;
  cursor: pointer;
}

.player-liking {
  width: 23px;
  height: 21px;
  background: url(~/assets/imges/player.a628799e.png);
  background-position: -30px -96px;
  cursor: pointer;
  transform: translateX(-100px);
}

.player-ft ul li {
  margin: 20px 50px;
}

a {
  text-decoration: none;
  color: white;
}

a:hover {
  text-decoration: none;
  color: white;
}

.player-ft label {
  margin-left: 30px;
  width: 100px;
  display: block;
  font-size: 14px;
}

/* 评论区域 */
.comm {
    float: right;
    right: 0;
    top: 0;
    height: 100%;
    -webkit-transform: translateY(-617px);
    transform: translateY(-617px);

    -webkit-transition: -webkit-transform .3s ease-in-out;
    transition: transform .3s ease-in-out;
    overflow: auto;
}

.comm .comm-wrap {
    width: 400px;
    height: 100%;
    background-color: #fff;
    text-align: center;
    z-index: 200;
    overflow: auto;
    box-shadow: -5px 0 2px rgba(0,0,0,.1);
}

.comment_area {
    display: block;
    width: 360px;
    margin: 40px auto;
    height: 57px;
}

.send_btn {
    background: 0 0;
    background-color: #222629;
    color: #fff;
    width: 52px;
    height: 30px;
    border: none;
    margin-left: 280px;
    margin-top: -20px;
}

.comm ul li {
  display: flex;
  flex-direction: row;
  list-style: none;
  border-bottom: 1px dashed #e7e7e7;
  padding-bottom: 20px;
  margin-top: 30px;
}

.comm ul .avatar img {
  width: 50px;
  height: 50px;
  object-fit: cover;
}

.comm .content .name {
    font-size: 14px;
    font-family: "微软雅黑";
    color: #369;
    transform: translateX(-30px);
}

.comm .content .comment {
  font-style: normal;
  text-decoration: none;
  font-size: 14px;
  font-family: "微软雅黑";
  margin-left: 20px;
}

.comm .content .time {
  font-size: 12px;
  color: #787a7c;
  margin-left: 20px;
  margin-top: 5px;
}

</style>