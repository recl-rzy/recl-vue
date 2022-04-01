<template>
  <div class="app-container">

    <el-form label-width="120px" :model="counselor" ref="counselor">

      <el-form-item label="咨询师名称" prop="name"
      :rules="[
            { required: true, message: '请输入咨询师姓名', trigger: 'blur' },
            {  min: 2, max: 6, message: '不能超过6个字', trigger: 'blur, change'  }
            ]">

        <el-input v-model="counselor.name"/>

      </el-form-item>

      <el-form-item label="倾听师手机号" prop="mobile"
      :rules="[
            { required: true, message: '请输入手机号', trigger: 'blur' },
            {  min: 11, max: 11, message: '输入11位手机号', trigger: 'blur, change'  }
            ]">

        <el-input v-model="counselor.mobile"/>

      </el-form-item>

      <el-form-item label="咨询师排序">

        <el-input-number v-model="counselor.sort" controls-position="right" :min='0'/>

      </el-form-item>

      <el-form-item label="咨询师头衔" prop="level"
      :rules="[
            { required: true, message: '请选择咨询师头衔', trigger: 'blur' }
            ]">

        <el-select v-model="counselor.level" clearable placeholder="请选择">

          <!--

            数据类型一定要和取出的json中的一致，否则没法回填

            因此，这里value使用动态绑定的值，保证其数据类型是number

          -->

          <el-option :value="1" label="一级心理咨询师"/>

          <el-option :value="2" label="二级心理咨询师"/>

          <el-option :value="3" label="三级心理咨询师"/>

        </el-select>

      </el-form-item>

      <el-form-item label="擅长方向" style="margin-left: 40px">

          <el-tag
          :type='type[count]'
          :key="index"
          v-for="(tag, index) in dynamicTags"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)">
          {{tag}}
          </el-tag>
          
          <el-input
            class="input-new-tag"
            effect="dark"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          >
          </el-input>

          <el-button v-else class="button-new-tag" size="small" @click="showInput"
          
          v-show="showTagBtn">+ New Tag</el-button>

      </el-form-item>

      <el-form-item label="咨询师资历">

        <el-input v-model="counselor.career"/>

      </el-form-item>

      <el-form-item label="咨询师简介" prop="intro"
      :rules="[
            { required: true, message: '请输入咨询师简介', trigger: 'blur' },
            {  min: 1, max: 150, message: '不能超过150字', trigger: 'blur, change'  }
            ]">

        <el-input v-model="counselor.intro" :rows="10" type="textarea"/>

      </el-form-item>


      <!-- 心理咨询师头像：TODO -->
      <el-form-item label="心理咨询师头像">


        <!-- 头衔缩略图 -->

        <pan-thumb :image="String(counselor.avatar)"/>

        <!-- 文件上传按钮 -->

        <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">更换头像

        </el-button>


        <!--
        
        v-show：是否显示上传组件
        
        :key：类似于id，如果一个页面多个图片上传控件，可以做区分
        
        :url：后台上传的url地址
        
        @close：关闭上传组件
        
        @crop-upload-success：上传成功后的回调 -->

        <image-cropper v-show="imagecropperShow" :width="300" :height="300" :key="imagecropperKey"

                   :url="BASE_API+'/eduoss/fileoss'"

                   field="file"

                   @close="close"

                   @crop-upload-success="cropSuccess"/>


      </el-form-item>

      <el-form-item>

        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate('counselor')">保存</el-button>

      </el-form-item>

    </el-form>

  </div>
</template>


<script>

import counselorApi from '@/api/edu/counselor'
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'

export default {
  components : {
    ImageCropper,
    PanThumb
  },
  data() {
      return {
          counselor: {
              name: '',
              sort: 0,
              level: 1,
              career: '',
              intro: '',
              avatar: 'https://recl-edu.oss-cn-beijing.aliyuncs.com/2021/08/07/e710a586c8ba495dba291d892ec32f80file.png',
          },
          imagecropperShow : false, //上传弹框组件显示
          imagecropperKey : 0,
          BASE_API : process.env.BASE_API,
          saveBtnDisabled: false, // 保存按钮是否禁用,
          dynamicTags: [],
          count: 0,
          showTagBtn: true,
          inputVisible: false,
          inputValue: '',
          type: ['', 'success', 'danger'],//标签框主题更换
    }
  },
  created() {
    this.init()
  },
  watch: {
    $route(to, from) {
      this.init()
    }
  },
  methods: {
    close() { //关闭头像上传组件
      this.imagecropperShow = false
      this.imagecropperKey = this.imagecropperKey + 1
    },
    cropSuccess(data) {
      this.imagecropperShow = false
      this.counselor.avatar = data.url   //上传成功返回图片地址
      this.imagecropperKey = this.imagecropperKey + 1
    },
    handleClose(tag) {
        this.count --
        //将标签内容添加到指定数组对象
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
        if(this.dynamicTags.length < 3) {
          this.showTagBtn = true
        }
    },
    showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
    },
    checkTag() {  //检验标签
        if(this.dynamicTags.length != 3) { //标签内容判断
            this.$message({
                type: 'error',
                 message: '请添加3个擅长标签!'
            });
            return false
          }
          return true
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
         this.dynamicTags.push(inputValue);
      }
      //限定标签数据不能大于3
      if(this.dynamicTags.length >= 3) {
        this.showTagBtn = false
      }
      this.count ++
      this.inputVisible = false;
      this.inputValue = '';
    },
    init() {
      if(this.$route.params && this.$route.params.id) {
        const id = this.$route.params.id
        this.getCounselor(id)
   
      } else {

        this.counselor = {}
        this.counselor.level = 1
        this.counselor.avatar = 'https://recl-edu.oss-cn-beijing.aliyuncs.com/2021/08/07/e710a586c8ba495dba291d892ec32f80file.png'
      }
    },
    saveOrUpdate(formName) {
      this.$refs[formName].validate((valid) => {

        if(!this.counselor.id) {

          if(this.checkInfo() && this.checkTag()) {
            //防止重复提交
            this.saveBtnDisabled = true
            this.counselor.oneMeth = this.dynamicTags[0]
            this.counselor.twoMeth = this.dynamicTags[1]
            this.counselor.threeMeth = this.dynamicTags[2]

            this.saveCounselor()
          }
        } else {

          if(this.checkTag()) {
            
            this.counselor.oneMeth = this.dynamicTags[0]
            this.counselor.twoMeth = this.dynamicTags[1]
            this.counselor.threeMeth = this.dynamicTags[2]

            this.updateCounselor()
          }
        }
      })
    },
    updateCounselor() {
      counselorApi.updateCounselor(this.counselor)
        .then(response =>{
          //修改成功提示信息
              this.$message({
                  type: 'success',
                  message: '修改成功!'
              });
              //回到列表
              this.$router.push({path:'/counselor/list'})
        })
    },
    saveCounselor() {
        counselorApi.addCounselor(this.counselor)
          .then(response =>{
              //添加成功操作
              this.$message({
                  type: 'success',
                  message: '添加成功!'
              });
              //回到列表
              this.$router.push({path:'/counselor/list'})
          })
    }, //根据id获取咨询师信息并回显
    getCounselor(id) {
      counselorApi.getCounselor(id)
        .then(response =>{
            this.counselor = response.data.counselor
            this.dynamicTags[0] = this.counselor.oneMeth
            this.dynamicTags[1] = this.counselor.twoMeth
            this.dynamicTags[2] = this.counselor.threeMeth
        })
    }
  }
}
</script>

<style>

</style>