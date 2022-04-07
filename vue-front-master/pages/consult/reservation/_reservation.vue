<template>

  <div id="reservation">

    <CommNav :userInfo="userInfo" />

    <div class="avatar" style="margin: 0 360px">

       <el-avatar shape="circle" :size="150" fit="fill" :src="counselor.avatar"></el-avatar>

    </div>

    <el-form
      :model="reserRecord"
      :rules="rules"
      ref="ruleForm"
      label-width="200px"
      class="demo-ruleForm"
      style="margin: 30px 200px"
    >
      <el-form-item label="预约老师">
        
        <el-input v-model="counselor.name" style="width: 100px" size="small" disabled></el-input>
      
      </el-form-item>

      <el-form-item label="你的真实姓名" prop="userName">
        
        <el-input v-model="reserRecord.userName" style="width: 100px"></el-input>
      
      </el-form-item>
      
      <el-form-item label="联系电话" prop="mobile">
        
        <el-input
          type="text"
          size="small"
          prefix-icon="el-icon-mobile"
          v-model="reserRecord.mobile"
          style="width: 200px; text-align: center">
        </el-input>
      
      </el-form-item>
      
      <el-form-item label="咨询方式" prop="method">
        <el-radio-group v-model="reserRecord.method">
          <el-radio :label="0">聊天咨询</el-radio>
          <el-radio :label="1">电话咨询</el-radio>
          <el-radio :label="2">线下咨询</el-radio>
        </el-radio-group>
      </el-form-item>
      
      <el-form-item label="咨询方向" prop="direction">
        <el-radio-group v-model="reserRecord.direction">
          <el-radio :label="0" name="direction">人际交往</el-radio>
          <el-radio :label="1" name="direction">家庭关系</el-radio>
          <el-radio :label="2" name="direction">职场竞争</el-radio>
          <el-radio :label="3" name="direction">情感恋爱</el-radio>
          <el-radio :label="4" name="direction">情绪管理</el-radio>
          <el-radio :label="5" name="direction">心理治疗</el-radio>
        </el-radio-group>
      </el-form-item>
      
      <el-form-item label="曾接收心理治疗" prop="previous">
        <el-radio-group v-model="reserRecord.previous">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      
      <el-form-item label="咨询备注" prop="remark">
        <el-input type="textarea" v-model="reserRecord.remark" style="width: 400px"></el-input>
      </el-form-item>
      
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >立即预约</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    
    </el-form>
  </div>

</template>

<script>
import reserApi from "@/api/reservation"
import CommNav from '@/components/common/CommNav.vue'
import cookie from 'js-cookie'


export default {
  components: {
    CommNav
  },
  asyncData({ params, error}) {
    return reserApi.getCounselor(params.reservation)
            .then(response => {
              return {
                counselor: response.data.data.counselor
              }
            })
  },
  created() {},
  mounted() {
    this.init()
  },
  data() {
    return {
        rules: {
          userName: [
            { required: true, message: '请输入你的真实姓名', trigger: 'change' },
            { min: 1, max: 19, message: '请输入真实姓名', trigger: 'blur' }
          ],
          mobile: [
            { required: true, message: '请输入联系电话', trigger: 'change' },
            { min: 11, max: 11, message: '请输入11位联系电话', trigger: 'blur' }
          ],
          method: [
            { required: true, message: '请选择咨询方式', trigger: 'change' }
          ],
          direction: [
            { required: true, message: '请选择咨询方向', trigger: 'change' }
          ],
          previous: [
            { required: true, message: '请选择', trigger: 'change' }
          ],
          remark: [
            { min: 0, max: 100, message: '长度在 0 到 100 字', trigger: 'blur' }
          ]
        },
        reserRecord: {
          userName: '',
          counselorId: '',
          reservationUserId: '',
          mobile: '',
          method: 0,
          direction: '',
          previous: 1,
          remark: ''
        },
        counselor: {},
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
        } else {
          this.$router.push({path: '/login'})
        }
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            
            //提交预约信息
            this.submitReserRecord()
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      submitReserRecord() {
        this.reserRecord.reservationUserId = this.userInfo.id
        this.reserRecord.counselorId = this.counselor.id

        reserApi.addReserRecord(this.reserRecord)
          .then(response => {
            this.$message({
                  type: 'success',
                  message: '提交预约成功!'
            })
          })
          .catch(error => {
            console.log(error)
          })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
  }
}
</script>

<style scoped>

#reservation {
  position: absolute;
  height: 100%;
  width: 100%;
  min-height: 1000px;
  top: 0;
  left: 0;
  z-index: 100;
}

</style>