<template>
    <div>
        <nuxt/>
    </div>
</template>

<script>
import cookie from 'js-cookie'

export default { 
    mounted() {
        this.init()
    },
    data() {
        return {
          path: "ws://localhost:8005/msgPush/"
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
                this.path = this.path + this.userInfo.id
                if (typeof (WebSocket) === 'undefined') {
                  alert('您的浏览器不支持socket')
                } else {
                  // 实例化socket
                  this.socket = new WebSocket(this.path)
                  // 监听socket连接
                  this.socket.onopen = this.open
                  // 监听socket错误信息
                  this.socket.onerror = this.error
                  // 监听socket消息
                  this.socket.onmessage = this.onMessage
                  //
                  this.socket.onclose = this.close
                }
            }
        },
        open () {
          console.log('socket连接成功')
        },
        error () {
          console.log('连接错误')
        },
        onMessage (msg) {
          console.log('后端发来了信息:' + msg)
          //接收消息
          let pushMsg = JSON.parse(msg.data)
          console.log(pushMsg)
          if(pushMsg != null) {
              this.pushMsgList.push(pushMsg)
              this.showMsg(pushMsg)
          }
        },
        close () {
          console.log('socket已经关闭')
        },
        showMsg(msg) {
          if(msg.ignore) {
            this.$notify.info({
              title: msg.title,
              dangerouslyUseHTMLString: true,
              message: msg.message,
              duration: 0
            });
          } else {
            this.$notify.info({
              title: msg.title,
              dangerouslyUseHTMLString: true,
              message: msg.message,
            });
          }
        }
    }
}
</script>

<style>
/* html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box; 
}

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
} */
</style>

