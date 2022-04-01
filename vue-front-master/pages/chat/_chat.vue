<template>
  <div id="consult">
      
    <div class="consult-wrapper">
        <!-- 中心聊天区域 -->
        <div class="consult-center">
          <div class="left">
            <div class="profile-img">
              <img :src="userInfo.avatar" alt="" id="a">
            </div>
            <div class="username">{{userInfo.nickName}}</div>
            <div class="consult-ul">
              <ul>
                <li><a href="/"><i class="el-icon-s-home" style="font-size:25px;color:#8b8b8b"></i><span>首页</span></a></li>
                <li><a href="#"><i class="el-icon-user" style="font-size:25px;color:#8b8b8b"></i><span>联系人</span></a></li>
                <li><a href="#"><i class="el-icon-chat-dot-round" style="font-size:25px;color:#8b8b8b"></i><span>最近咨询</span></a></li>
                <li><a href="#"><i class="el-icon-chat-square" style="font-size:25px;color:#8b8b8b"></i><span>当前咨询</span></a></li>
              </ul>
            </div>
          </div>
          <div class="right">
            <!-- 当前聊天 -->
            <div class="current-consult">
              <h3 class="msg">Messages</h3>
              <!-- 聊天室顶部区域 -->
              <div class="current-top">
                <ul>
                  <li class="li-search">
                    <i class="el-icon-search" 
                    style="color:rgb(219, 219, 219);
                    font-size:23px;
                    "></i>
                    <input placeholder="search">
                  </li>
                  <li class="li-consulter">
                    <div>
                      <img :src="receiveUserInfo.avatar" alt="">
                    </div>
                    <div class="info">
                      <span class="name">{{receiveUserInfo.nickName}}</span>
                      <div class="status">
                        <span class="circle"></span>
                        在线
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <!-- 聊天室中心区域 -->
              <div class="current-center" id="current-center">
                <div v-for="(item,index) in chatMsg" :key="index">
                  <div class="message-box message-position2 mbackg2" v-if="item.sendUserId != userInfo.id ">
                    <img :src="receiveUserInfo.avatar" alt="">
                    <div v-html="item.text" class="text"></div>
                    <div class="triangle-border tb-border2"></div>
                    <div class="triangle-border tb-background2"></div>
                    </div> 
                  <div class="message-box message-position1 mbackg1" v-if="item.sendUserId == userInfo.id ">
                    <img :src="userInfo.avatar" alt="">
                    <div v-html="item.text" class="text"></div>
                    <div class="triangle-border tb-border1"></div>
                    <div class="triangle-border tb-background1"></div>
                  </div> 
                </div>
                <div class="emoji-container" v-show="showEmojiBtn">
                  <ul>
                    <li v-for="index in 71" :key="index" @click="appendEmoji(index)">
                      <img :src="require('@/assets/imges/emoji/' + index + '.gif')" alt="" >
                    </li>
                  </ul>           
                </div>
              </div>
              <!-- 聊天室底部区域 -->
              <div class="current-bottom">
                <div class="bottom-selection">
                  <ul>
                    <li @click="displayEmoji">
                      <img src="@/assets/imges/ej.png" alt="">
                    </li>
                    <li>
                      <i class="el-icon-picture-outline"
                      style="font-size:22px;margin-top:3px;"></i>
                    </li>
                  </ul>
                </div>
                <div class="bottom-send">
                  <div class="input-box" contenteditable="true" spellcheck="false" id="input-box"></div>
                  <!-- <i class="el-icon-s-promotion send-p"
                  style="font-size:38px;color: rgb(123, 180, 83);"
                  @click="send"></i> -->
                  <div class="send-p">
                    <el-button type="primary" icon="el-icon-s-promotion" @click="send">发送</el-button>       
                  </div>                                                                                                                                                                                                                                                                                                                     
                </div>
              </div>
            </div>
          </div>
        </div>

    </div>

  </div>
</template>

<script>
import cookie from 'js-cookie'
import "@/assets/css/style.css"
import chatApi from "@/api/chat.js"
import axios from 'axios'

export default {
  mounted() {
    this.init()
  },
  methods: {
    init () {
      this.sendMsg = {}
      this.sendMsg.text = "你好，我是AI小忆，请问有什么可以帮助你的？"
      this.sendMsg.sendUserId = 'chatbot'
      this.chatMsg.push(this.sendMsg)
      this.getUserInfoByCookie()
    },
    getUserInfoByCookie() {
      
      var userInfoStr = cookie.get('recl_ucenter')
      if(userInfoStr) {
          //将用户信息字符串转json对象
          this.userInfo = JSON.parse(userInfoStr)
          console.log(this.userInfo)
      } else {
          this.$router.push({path: '/login'})
      }
    },
    send() {
      this.sendMsg = {}
      let inputTextObject = document.getElementById('input-box') 
      this.sendMsg.text = inputTextObject.innerHTML
      this.sendMsg.sendUserId = this.userInfo.id
      this.chatMsg.push(this.sendMsg) 
      axios.post("http://localhost:8006/model/chat", {sentence: this.sendMsg.text}).then(response => {
        this.sendMsg = {}
        this.sendMsg.text = response.data
        this.sendMsg.sendUserId = 'chatbot'
        this.chatMsg.push(this.sendMsg) 
        inputTextObject.innerHTML = ''
      })
    },
    displayEmoji() {
      this.showEmojiBtn = !this.showEmojiBtn
    },
    appendEmoji(index) {
      // 获取输入框的dom对象
      let inputTextObject = document.getElementById('input-box')
      // 获取当前焦点对象的id
      let currentFocus = document.activeElement.id
      // 当焦点id不等于输入框对象id，则选中输入框的焦点
      if(inputTextObject.id != currentFocus) {
        inputTextObject.focus()
      }
      let targetUrl = "/_nuxt/assets/imges/emoji/" + index + ".gif"
      let imgTag = `<img src="${targetUrl}" width="22px" height="22px">`
      document.execCommand("insertHTML",false,imgTag)
    }
  },
  data() {
    return {
      userInfo: {},
      receiveUserInfo: {
        nickName: '小忆',
        avatar: require('@/assets/imges/chat/04KGX(O)4S7YGDO{HDI6HOI.png')
      },
      sentence: '',
      sendMsg: {},
      showEmojiBtn: false,
      chatMsg: []
    }
  },
  updated() {
    let scrollHeight = document.getElementById("current-center").scrollHeight
    document.getElementById("current-center").scrollTop = scrollHeight
  }
}
</script>

<style scoped>

.input-box {
  height: 50px;
  border: 1px solid rgb(185, 184, 184);
  position: absolute;
  width: 340px;
  margin-left: 250px;
  margin-top: -55px;
  padding: 10px;
  overflow: hidden;
}

.consult-wrapper {
  height: 100%;
  width: 100%;
  position: fixed;
  background: url("~@/assets/imges/pexels-monica-turlui-8218375.jpg") no-repeat;
  background-size: 100% 100%;
}

.consult-center {
  width: 900px;
  height: 600px;
  box-shadow: 0px 0px 36px rgba(247, 244, 244, 0.1);
  margin: 100px auto;
  display: flex;
}

.left {
  height: 100%;
  width: 150px;
  background-color: rgba(234, 239, 232, 0.9);
  display: flex;
  flex-direction: column;
}

.right {
  height: 100%;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.9);
}

.profile-img {
  width: 65px;
  height: 65px;
  border-radius: 50%;
  margin: 0px auto;
  margin-top: 30px;
}

.profile-img img {
  border-radius: 50%;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.username {
  text-align: center;
  font-size: 15px;
  margin-top: 10px;
  color: rgb(34, 39, 35)
}

.consult-ul ul{
  list-style: none;
}

.consult-ul ul li a{
  text-decoration: none;
}

.consult-ul ul li {
  margin: 40px -20px;
}

.consult-ul ul li span {
  color: rgb(162, 165, 158);
  font-size: 14px;
  margin-left: 5px;
  display: inline-block;
}

.current-consult .msg {
  font-size: 16px;
  margin-left: 30px;
}

.current-top ul {
  list-style: none;
  position: relative;
  display: flex;
}

.current-top .li-search {
  margin-left: 50px;
}

.current-top i {
  position: absolute;
  top: 25px;
}

.current-top input {
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 2px solid rgb(219, 219, 219);
  color: rgb(219, 219, 219);
  height: 25px;
  text-indent: 15px;
  font-size: 15px;
  margin-left: 30px;
  margin-top: 18px;
}

.current-top .li-consulter {
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 2px solid rgb(219, 219, 219);
  margin-left: 80px;
  display: flex;
  width: 242px;
}

.current-top .li-consulter img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.li-consulter .info {
  margin-left: 10px;
}

.li-consulter .info .status {
  font-size: 11px;
  color: #2e2e2e;
  letter-spacing: 1px;
  margin-top: 3px;
}

.li-consulter .info .status .circle {
  width: 6px;
  height: 6px;
  display: inline-block;
  background-color: rgb(5, 223, 16);
  border-radius: 50%;
  border: 0.5px solid #c6c6c6;
}

.li-consulter .info .status .circle1 {
  width: 6px;
  height: 6px;
  display: inline-block;
  background-color: rgb(216, 53, 13);
  border-radius: 50%;
  border: 0.5px solid #c6c6c6;
}

.current-center {
  margin-top: 30px;
  height: 340px;
  overflow-y: scroll;
  padding: 20px 0px;
  position: relative;
}

.current-center .message-box img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  position: absolute;
}

.message-box 
{
  position:relative;
  width: 200px;
  letter-spacing: 1px;
  text-align: left;
  color:#fff;
  border-radius:2px;
  border-radius: 5px;
  margin-bottom: 30px;
  font-size: 14px;
  padding: 5px 5px;
}

.message-box .text {
  padding: 5px;
  word-break: normal;
  word-wrap: break-word;
}

.mbackg2{
  background-color: rgb(212, 212, 212);
  color: #2e2e2e;
}

.mbackg1{
  background-color: rgb(126, 171, 70);
}

.triangle-border 
{
  position:absolute;
  overflow:hidden; 
  width:0;
  height:0;
  border-width: 2px 0 10px 10px ;
  border-style:dashed dashed dashed solid;
  top:13px;
}
.tb-border2 
{
  right: 10px;
  border-color: transparent transparent rgb(212, 212, 212) transparent;
}

.tb-border1
{
  right: 10px;
  border-color: transparent transparent transparent rgb(126, 171, 70);
}

.tb-background1 
{
  right: -10px;
  border-color:transparent transparent transparent rgb(126, 171, 70);
}


.tb-background2 
{
  left: -10px;
  border-color: transparent transparent rgb(212, 212, 212) transparent ;
}

.message-position2 {
  margin-left: 80px;
}

.message-position2 img {
  position: absolute;
  left: -60px;
  top: 20px;
}

.message-position2 .name {
  position: absolute;
  font-size: 12px;
  top: 35px;
  left: -5px;
  color:#494949;
}

.message-position1 {
  margin-left: 440px;
}

.message-position1 img {
  position: absolute;
  right: -65px;
  top: -20px;
}

.message-position1 .name {
  position: absolute;
  font-size: 12px;
  top: -35px;
  right: -5px;
  color:#494949;
}

.current-center::-webkit-scrollbar {
  width: 6px;  
  height: 6px;  
  background-color: #F5F5F5; 
}

.current-center::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0,0,0,0.3);  
  border-radius: 10px;  
  background-color: #FFF;
}

.current-center::-webkit-scrollbar-thumb {
  border-radius: 10px;  
  box-shadow: inset 0 0 6px rgba(0,0,0,.3);  
  background-color: #AAA;
}

.bottom-selection {
  width: 100%;
  border-top: 1px solid #494949;
}

.bottom-selection ul {
  list-style: none;
  display: flex;
}

.bottom-selection li {
  margin-left: 15px;
}

.bottom-selection li img {
  width: 30px;
  height: 30px
}

.current-bottom {
  position: relative;
  height: 100%;
}

.current-bottom input {
  width: 300px;
  height: 26px;
  margin-left: 150px;
  border-radius: 5px;
  outline: none;
  margin-top: -30px;
  position: absolute;
  border: 1px solid rgb(206, 205, 205);
  overflow: hidden;
}

.current-bottom .send-p {
  position: absolute;
  margin-top: -45px;
  right: 5%;
}

.current-center {
  position: relative;
}

.emoji-container {
  padding: 0;
  background-color: #fff;
  color: #666;
  box-shadow: none;
  position: fixed;
  bottom: 20%;
}

.emoji-container ul {
    position: relative;
    width: 372px;
    height: 185px;
    padding: 10px;
    border: 1px solid #D9D9D9;
    background-color: #fff;
    box-shadow: 0 0 20px rgba(0,0,0,.2);
}

.emoji-container li {
  cursor: pointer;
  float: left;
  border: 1px solid #e8e8e8;
  height: 22px;
  width: 26px;
  overflow: hidden;
  margin: -1px 0 0 -1px;
  padding: 4px 2px;
  text-align: center;
}

.emoji-container img {
  width: 22px;
  height: 22px;
  object-fit: cover;
}

.emoji-container li:hover {
  border: 1px solid #ee8080;
}



</style>