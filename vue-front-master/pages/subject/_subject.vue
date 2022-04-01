<template>
  <div>
    <div class="test-wapper">
      <div class="test-top">
        <a href="/">
          <i class="el-icon-s-home icon-home" style="font-size: 30px;"></i>
        </a>
        <span class="d-ibm">{{scaleInfo.title}}</span>
      </div>

      <div class="test-content">
      <div class="test-content" v-show="showTestWrapper">
        <div class="test-center">
          <client-only placeholder="Loading...">
            <el-form label-width="80px">
              <div v-for="(item, index) in scaleSubject" :key="index">
                <el-form-item v-show="num === index">
                  <h3 class="test-title">
                    {{ (index + 1) + "、" + item.optionTitle}}
                  </h3>
                  <el-radio-group v-model="scaleResult[index]" style="width: 160px" @change="radioChange">
                    <div class="radio-align">
                      <el-radio :label="item.dimension + '-' + item.optionOneScore + '-' + (index+1)" v-if="item.optionOne != null">{{item.optionOne}}</el-radio>
                    </div>
                    <div class="radio-align">
                      <el-radio :label="item.dimension + '-' + item.optionTwoScore + '-' + (index+1)" v-if="item.optionTwo != null">{{item.optionTwo}}</el-radio>
                    </div>
                    <div class="radio-align">
                      <el-radio :label="item.dimension + '-' + item.optionThreeScore + '-' + (index+1)" v-if="item.optionThree != null">{{item.optionThree}}</el-radio>
                    </div>
                    <div class="radio-align">
                      <el-radio :label="item.dimension + '-' + item.optionFourScore + '-' + (index+1)" v-if="item.optionFour != null">{{item.optionFour}}</el-radio>
                    </div>
                  </el-radio-group>           
                </el-form-item>
              </div>
              <!-- 底部按钮 -->
              <el-form-item>
                <div class="bottomBtn">
                  <el-row>
                    <el-col :span="6">
                      <el-button
                        class="mar10"
                        @click="prex"
                        :disabled="preDisabled"
                        type="success"
                        >上一题</el-button
                      >
                    </el-col>
                    <el-col :span="9">
                      <el-button
                        class="mar10"
                        @click="next"
                        :disabled="nextDisabled"
                        type="success"
                        style="margin-left: 150px;"
                        v-if="num !== scaleSubject.length - 1"
                        >下一题</el-button
                      >
                      <el-button
                        class="mar10"
                        @click="goSubmit"
                        type="primary"
                        style="margin-left: 150px;"
                        v-if="num === scaleSubject.length - 1"
                        >提交</el-button
                      >
                    </el-col>
                  </el-row>
                </div>
              </el-form-item>
            </el-form>
          </client-only>
        </div>

        <div class="test-bottom">
          <div class="currentSubject">{{num + 1}}</div>
          <div class="line"></div>
          <div class="totalSubject">{{scaleSubject.length}}</div>
        </div>
      </div>
      </div>

      <div class="appraisal-content" v-show="!showTestWrapper">
        <!-- 评估结果中心区 -->
        <div class="appraisal-center">
          <div class="profile-img">
            <img src="https://recl-edu.oss-cn-beijing.aliyuncs.com/2021/08/10/9060f46f93984b5ca4d6c105d3f5a743file.png" alt="" :key="1">
          </div>
          <div class="user">
            <div class="user-avatar">
              <img :src="userInfo.avatar" alt="" :key="userInfo.id">
            </div>
            <div class="user-name">
              {{userInfo.nickName}}
            </div>
          </div>
          <div class="appraisal">
            <h3 class="appraisal-title">测评结果:</h3>
            <div class="appraisal-content">
              <p v-for="(item, index) in appraisalResult" :key = "index">
                {{item}}
              </p>
            </div>
          </div>
        </div>

        <div class="appraisal-bottom">
          <div class="comment">
            <h3 class="comment-title">最新评论</h3>
            <div class="nocomment-content" v-show="!showComment">
              还没有人发表过评论，赶紧抢沙发！
            </div>
            <ul class="comment-content" v-show="showComment">
              <li v-for="(item, index) in scaleComment" :key="index">
                <img :src="item.avatar" alt="">
                <div class="nick-name">{{item.nickName}}</div>
                <div class="comment-detail">
                  <div class="comment-time">评论时间：{{item.gmtCreate}}</div>
                  <p class="comment-text">
                    {{item.comment}}
                  </p>
                </div>
              </li>
            </ul>

            <div class="comment-btn">
              <button class="comment-blue" @click="startComment()">开始评论</button>
            </div>
          </div>
        </div>

        <el-dialog :visible.sync="dialogTableVisible" key="1">
          <h3 class="evaluate-title">请对量表进行评分，以方便我们后续改进，谢谢亲!</h3>
          <ul class="scale-evaluate">
            <li>
              <span>理解性</span>
              <el-rate
                v-model="scaleEvaluate.understandAbility"
                :colors="colors"
                show-text
                @change="submitEvaluate">
              </el-rate>
            </li>
            <li>
              <span>实用性</span>
              <el-rate
                v-model="scaleEvaluate.practiceAbility"
                :colors="colors"
                show-text
                @change="submitEvaluate">
              </el-rate>
            </li>
            <li>
              <span>准确性</span>
              <el-rate
                v-model="scaleEvaluate.accuracyAbility"
                :colors="colors"
                show-text
                @change="submitEvaluate">
              </el-rate>
            </li>
          </ul>
        </el-dialog>

        <el-dialog :visible.sync="dialogCommVisible" key="2">
          <el-form label-width="80px" :model="eduScaleComment" ref="eduScaleComment">
          
            <el-form-item label="评论区" prop="comment"
            :rules="[
            { required: true, message: '请输入评论内容', trigger: 'blur' },
            {  min: 0, max: 200, message: '不能超过200个字', trigger: 'blur, change'  }
            ]">
              <el-input type="textarea" v-model="eduScaleComment.comment"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitComment('eduScaleComment')">提交</el-button>
              <el-button @click="resetForm('eduScaleComment')">重置</el-button>
            </el-form-item>

          </el-form>

        </el-dialog>  
      </div>
    </div>
  </div>
</template>

<script>
import subjectApi from '@/api/subject'
import cookie from 'js-cookie'

export default {
  asyncData({ params, error}) {
    return subjectApi.getScaleSubject(params.subject)
            .then(response => {
              return {
                scaleSubject: response.data.data.scaleSubject,
                scaleInfo: response.data.data.scaleInfo
              }
            })
  },
  data() {
    return {
      preDisabled: true, //上禁用按钮
      nextDisabled: false, //下禁用按钮
      num: 0, //第几题
      scaleResult: [],
      showTestWrapper: true,
      appraisalResult: [],
      scaleComment: [],
      showComment: false,
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
      dialogTableVisible: false,
      scaleEvaluate: {},
      userInfo: {},
      dialogCommVisible: false,
      eduScaleComment: {}
    }
  },
  created() {
    
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.getUserInfo()
    },
    getUserInfo() {
      var userInfoStr = cookie.get('recl_ucenter')
      if(userInfoStr) {
        //将用户信息字符串转json对象
        this.userInfo = JSON.parse(userInfoStr)
      }
    },
    radioChange(val) {
      this.next()
    },
    next() {
      this.preDisabled = false;
      if (this.num < this.scaleSubject.length - 1) {
        this.num += 1;
      }
    },
    prex() {
      if (this.num === 0) {
        this.num = 0;
      } else {
        this.num -= 1;
      }
    },
    goSubmit() {
      console.log(this.scaleResult)
      if(this.checkScaleResult()) {

        subjectApi.getScaleAppraisal(this.scaleInfo.id, this.userInfo.id, this.scaleResult)
          .then(response => {

            this.getScaleComment(this.scaleInfo.id)

            this.appraisalResult = response.data.data.appraisalResult
            this.showTestWrapper = false
            this.dialogTableVisible = true
          })
      }
    },
    checkScaleResult() {
      for(let i = 0; i < this.scaleResult.length; i++) {

        if(this.scaleResult[i] == null || this.scaleResult[i] == '' ) {
          this.num = i
          this.$message({
              showClose: true,
              type: "error",
              message: "请完善题目信息!",
          });
          return false
        }
      }
      return true
    },
    getScaleComment(id) {
      subjectApi.getScaleComment(id)
        .then(response => {
          this.scaleComment = response.data.data.scaleComment
          if(this.scaleComment != null) {
            this.showComment = true
          }
        })
    },
    submitEvaluate() {
      
      if(this.scaleEvaluate.understandAbility != '' && this.scaleEvaluate.practiceAbility != '' && 
          this.scaleEvaluate.accuracyAbility != '') {
            // 获取路由中量表所属id
            const id = this.$route.params.subject
            
            this.scaleEvaluate.userId = this.userInfo.id
            this.scaleEvaluate.scaleId = id
            console.log(this.scaleEvaluate)
            this.addScaleRadio()
            this.dialogTableVisible = false
          }
    },
    addScaleRadio() {
      subjectApi.addScaleRadio(this.scaleEvaluate)
        .then(response => {

          this.$message({
              showClose: true,
              type: "success",
              message: "感谢你对忆心的支持，谢谢参与!",
          });
        })
        .catch(error => {
          console.log(error)
          this.$message({
              showClose: true,
              type: "error",
              message: "抱歉，出错了!",
          });
        })
    },
    addScaleComment() {
      subjectApi.addScaleComment(this.eduScaleComment)
        .then(response => {

          this.$message({
              showClose: true,
              type: "success",
              message: "我们已经收到的你的建议，谢谢参与!",
          });
          this.getScaleComment(this.scaleInfo.id)
          this.dialogCommVisible = false
          this.eduScaleComment = {}
        })
    },
    submitComment(formName) {

      this.$refs[formName].validate((valid) => {

        if(valid) {

          // 获取路由中量表所属id
          const id = this.$route.params.subject

          this.eduScaleComment.scaleId = id
          this.eduScaleComment.userId = this.userInfo.id
          this.addScaleComment()
        }
      })  
    },
    resetForm(formName) {
      
      this.$refs[formName].resetFields();
    },
    startComment() {
      this.dialogCommVisible = true
    }
  },
  watch: {
    //第一题和最后一题禁用按钮
    num(now, old) {
      if (now == this.scaleSubject.length - 1) {
        this.nextDisabled = true;
      } else {
        this.nextDisabled = false;
      }
      if (now < 1) {
        this.preDisabled = true;
      }
    }
  }
}
</script>

<style scoped>

a {
  text-decoration: none;
  color: #333;
  display: block;
  width: 40px;
  height: 40px;
}

a:hover {
  text-decoration: none;
  background: none;
}

.test-wapper {
  background-color: rgb(255, 255, 255);
  width: 50%;
  height: 100%;
  min-width: 570px;
  min-height: 700px;
  text-align: center;
  margin: 0 auto;
  position: relative;
}

.test-top {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 63px;
  box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.2);
}

.test-top .d-ibm {
  margin: 0 46px;
  max-width: 13em;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 17px;
  font-weight: 600;
}

.test-top .icon-home {
  position: absolute;
  left: 20px;
  margin: auto 0;
}

.test-center {
  margin: 20px auto;
  text-align: center;
  overflow-x: hidden;
  overflow-y: scroll;
  width: 70%;
  height: 60vh;
  box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  position: relative;
}

.test-title {
  margin: 30px auto;
  width: 70%;
  text-align: left;
}


input[type="radio"] {
  display: none;
}

.option-radio {
  width: 250px;
  line-height: 23px;
  letter-spacing: 1px;
  padding-bottom: 20px;
}

.radio {
  position: absolute;
  width: 14px;
  height: 14px;
  border: 3px solid #67c23a;
  border-radius: 50%;
  margin: 0 40px;
}

.selected {
  background-color: #67c23a;
}

.radio-align {
  text-align: left;
  margin-top: 30px;
  margin-left: -150px;
}

el-row {
    position: fixed;
    margin-top: 200px;
    height: 50px
}

.currentSubject {
    color: #333;
    font-size: 19px;
}

.totalSubject {
    color: #666;
    font-size: 19px;
    margin-left: 60px;
    margin-top: -30px;
}

.line {
    display: inline-block;
    width: 2px;
    height: 50px;
    background: #666;
    transform: rotate(30deg);
    margin-left: 20px;
    margin-top: -15px;
}

.appraisal-center {
  box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  width: 80%;
  margin: 30px auto;
}

.appraisal-center .profile-img img {
  width: 100%;
  object-fit: cover;
  height: 40vh;
  overflow: hidden;
  border-radius: 10px;
}

.appraisal-center .user {
  display: flex;
  margin: 20px 60px;
}

.appraisal-center .user .user-avatar img{
  box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  object-fit: cover;
  width: 35px;
  height: 35px;
}

.appraisal-center .user .user-name {
  color: #666;
  font-size: 14px;
  margin: 5px 20px;
}

.appraisal-center .appraisal-title {
    color: #666;
    font-weight: 700;
    letter-spacing: 1.8px;
    text-align: left;
    margin-left: 60px;
}

.appraisal-center .appraisal-content {
  width: 80%;
  text-align: left;
  margin: 10px auto;
  color: #666;
  font-size: 15px;
  line-height: 26px;
  padding-bottom: 30px;
}

.comment-content {
  list-style: none;
  margin: 30px 0;
}

.comment .comment-title {
  padding-top: 50px;
}

.comment-content li {
  border-top: 1px solid #c7c5c5;
  width: 78%;
  margin-top: 20px;
  margin: 0 auto;
  position: relative;
}

.comment-content li img {
  width: 43px;
  height: 43px;
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 0.44rem;
  margin-top: 0.4rem;
}

.comment-content li .comment-time {
  font-size: 14px;
  color: #999;
  margin-top: -20px;
  margin-left: 200px;
}

.comment-content li .comment-text {
  width: 70%;
  text-align: left;
  margin-left: 60px;
  font-size: 15px;
  margin-top: 30px;
}

.comment {
  box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  width: 85%;
  margin: 0 auto;
}

.comment-btn {
  margin: 80px auto;
  padding-bottom: 60px;
}

.comment-blue {
  background: #5da7f1;
  border-color: #5da7f1;
  color: #fff;
  width: 150px;
  height: 40px;
  border: 1px solid #999;
  border-radius: .13333rem;
  box-sizing: border-box;
  font-weight: 600;
}

.nocomment-content {
  position: relative;
}

.nocomment-content::before {

  content: "";
    display: block;
    position: absolute;
    transform: translateX(600%);
    width: 20px;
    height: 5px;
    background: #999;
    top: 40%;
}

.nocomment-content::after {

  content: "";
    display: block;
    position: absolute;
    top: 40%;
    transform: translateX(2300%);
    width: 20px;
    height: 5px;
    background: #999;
}

.comment-content li {
  position: relative;
}

.nick-name {
  margin-left: -260px;
  margin-top: 20px;
  color: #666;
  font-size: 16px;
}

.scale-evaluate {
  margin-bottom: 30px;
}

.scale-evaluate li {
  list-style: none;
  position: relative;
  margin-top: 40px;
}

.scale-evaluate span {
  position: absolute;
  left: 27%;
  font-size: 16px;
  color: #409EFF;
  font-weight: 600;
}

</style>