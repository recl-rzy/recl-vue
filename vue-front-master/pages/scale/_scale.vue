<template>
  <div>
    <div class="scale-wapper">
      <div class="scale-top">
        <i class="el-icon-s-home icon-home" style="font-size: 25px"></i>
        <span class="d-ibm">详情</span>
      </div>

      <div class="scale-center">
        <!-- 量表介绍 -->
        <div class="scale-intro clearfix">
          <h3 class="scale-title">{{ scale.title }}</h3>
          <ul class="scale-count">
            <li class="count-attr">
              共{{ scale.scaleOptionCount }}道心理测试题
            </li>
            <li class="count-attr">{{ scale.viewCount }}人已测</li>
            <li class="count-attr">{{ scale.commentCount }}人评论</li>
          </ul>
          <div class="profile-img">
            <img :src="scale.cover" alt="" />
          </div>
          <p class="scale-description">
            {{ scale.description }}
          </p>
          <div class="scale-classifies">
            <span>{{ scale.oneClassify }}</span>
            <span>{{ scale.twoClassify }}</span>
            <div class="price">{{ scale.price | getPrice }}</div>
          </div>
        </div>

        <!-- 用户评价 -->
        <div class="scale-comment clearfix">
          <h3 class="comment-title">用户评价</h3>
          <ul class="comment-score">
            <li>
              <div>
                <span>题目易懂性</span>
                <el-rate
                  v-model="scaleEvaluate.understandAbility"
                  disabled
                  show-score
                  text-color="#ff9900"
                >
                </el-rate>
              </div>
            </li>
            <li>
              <div>
                <span>建议实用性</span>
                <el-rate
                  v-model="scaleEvaluate.practiceAbility"
                  disabled
                  show-score
                  text-color="#ff9900"
                >
                </el-rate>
              </div>
            </li>
            <li>
              <div>
                <span>结果准确度</span>
                <el-rate
                  v-model="scaleEvaluate.accuracyAbility"
                  disabled
                  show-score
                  text-color="#ff9900"
                >
                </el-rate>
              </div>
            </li>
          </ul>
          <ul class="comment-content">
            <li v-for="(item, index) in scaleComment" :key="index">
              <img :src="item.avatar" alt="" />
              <div class="comment-detail">
                <div class="comment-time">发布时间：{{ item.gmtCreate }}</div>
                <p class="comment-text">
                  {{ item.comment }}
                </p>
              </div>
            </li>
          </ul>
          <button class="more-commtent">
            查看更多评论<i
              class="el-icon-arrow-right"
              style="font-size: 15px"
            ></i>
          </button>
        </div>
      </div>

      <div class="scale-bottom">
        <button class="buy-btn">会员续费</button>
        <button class="test-btn" @click="startScaleTest()">开始测试</button>
      </div>
    </div>
  </div>
</template>

<script>
import scaleApi from "@/api/scale"
import cookie from 'js-cookie'

export default {
  asyncData({ params, error }) {
    return scaleApi.getScaleData(params.scale).then((response) => {
      return {
        scale: response.data.data.scale,
        scaleComment: response.data.data.scaleComment,
        scaleEvaluate: response.data.data.scaleEvaluate,
      };
    });
  },
  methods: {
    startScaleTest() {
      var userInfoStr = cookie.get('recl_ucenter')
      if(userInfoStr) {

        this.$router.push({ path: "/subject/" + this.scale.id });
      } else {

        this.$router.push({ path: "/login" })
      }
      
    },
  },
  filters: {
    getPrice(price) {
      if (price == 0) {
        return "免费";
      } else {
        return "¥" + price.toFixed(2);
      }
    },
  },
};
</script>

<style scoped>
.clearfix::before,
.clearfix::after {
  content: "";
  display: table;
  clear: both;
}

.scale-wapper {
  background-color: rgb(255, 255, 255);
  width: 50%;
  height: 100%;
  min-width: 570px;
  min-height: 700px;
  text-align: center;
  margin: 0 auto;
  position: relative;
}

.scale-top {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 63px;
  box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.2);
}

.scale-top .d-ibm {
  margin: 0 46px;
  max-width: 13em;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 17px;
}

.scale-top .icon-home {
  position: absolute;
  left: 20px;
  margin: auto 0;
}

.scale-center {
  text-align: center;
  overflow-x: hidden;
  overflow-y: scroll;
  height: 80vh;
}

.scale-intro {
  box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  width: 80%;
  margin: 30px auto;
}

.scale-title {
  margin-top: 20px;
}

.scale-count {
  display: flex;
  font-size: 12px;
  color: #999;
  align-items: center;
  justify-content: center;
  list-style: none;
  margin-bottom: 20px;
}

.scale-count li {
  list-style: none;
}

.scale-count .count-attr {
  padding-right: 70px;
}

.scale-center .profile-img img {
  width: 35vw;
  object-fit: cover;
  height: 40vh;
  overflow: hidden;
}

.scale-description {
  margin: 10px auto;
  width: 90%;
  text-align: left;
  line-height: 2;
  font-size: 14px;
  color: #999;
}

.scale-classifies {
  display: flex;
  margin-bottom: 20px;
  position: relative;
}

.scale-classifies span {
  max-width: 100%;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  box-sizing: border-box;
  display: inline-block;
  font-size: 16px;
  font-variant: tabular-nums;
  height: auto;
  line-height: 20px;
  opacity: 1;
  padding: 0 7px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-radius: 0.13333rem;
  margin-left: 20px;
  background-color: #67c23a;
  color: white;
}

.scale-classifies .price {
  position: absolute;
  right: 80px;
  font-weight: 700;
  color: #ff5b5b;
}

.scale-bottom {
  width: 100%;
  margin: 10px auto;
  position: absolute;
}

.scale-bottom .test-btn {
  border: none;
  width: 196px;
  height: 57px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  font-weight: 700;
  font-size: 16px;
  background-image: url("~assets/imges/vip-btn.b5c4031.png");
}

.scale-bottom .buy-btn {
  border: none;
  width: 196px;
  height: 57px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  font-weight: 700;
  font-size: 16px;
  background-color: white;
  background-image: url("~assets/imges/img-vip-bg.2aa7a0a.png");
}

.scale-comment {
  box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.2);
  width: 80%;
  margin: 30px auto;
}

.scale-comment .comment-title {
  margin: 20px auto;
  position: relative;
  line-height: 2;
  padding: 0.24rem 0 0.10667rem;
  text-align: center;
  font-weight: 700;
  border-bottom: 5px solid #409eff;
  width: 20%;
}

.comment-score {
  list-style: none;
  margin-top: 50px;
}

.comment-score li {
  display: flex;
  margin-left: 170px;
  margin-top: 20px;
  position: relative;
}

.comment-score li span {
  position: absolute;
  left: -100px;
}

.comment-content {
  list-style: none;
  margin: 30px 0;
}

.comment-content li {
  border-top: 1px solid #c7c5c5;
  width: 98%;
  margin-top: 20px;
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
  margin-top: 20px;
  margin-left: -5vw;
}

.comment-content li .comment-text {
  width: 80%;
  text-align: left;
  margin-left: 60px;
  font-size: 15px;
}

.more-commtent {
  border-color: #eaeaea;
  color: rgb(3, 3, 3);
  height: 51px;
  width: 233px;
  display: block;
  margin: 60px auto;
  border: 1px solid #999;
  border-radius: 0.13333rem;
  box-sizing: border-box;
  padding: 0 0.29333rem;
  text-align: center;
  font-size: 12px;
  outline: none;
  background: transparent;
}
</style>