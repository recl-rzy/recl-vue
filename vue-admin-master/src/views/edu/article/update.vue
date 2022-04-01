<template>
  <div>

      <h2 style="text-align: center;">心理美文发布</h2>

      <!-- 美文编辑器-->
      <el-form :model="articleInfo" ref="articleInfo">

        <!-- 美文标题输入 -->
        <el-form-item label="美文标题输入" style="margin-left: 40px" prop="title"
        :rules="[
            { required: true, message: '请输入美文标题', trigger: 'blur' },
            {  min: 3, max: 40, message: '长度在 3 到 40 个字符', trigger: 'blur, change'  }
            ]">

          <el-input
            type="text"
            placeholder="请输入内容(限制输入3-40个文字)"
            v-model="articleInfo.title"
            maxlength="40"
            show-word-limit
            style="width: 30%;"
          >
          </el-input>

        </el-form-item>

        <el-form-item label="美文分类选择" style="margin-left: 40px"
        prop="articleClassify"
        :rules="[
            { required: true, message: '请输入分类名称', trigger: 'blur' },
            {  min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur, change'  }
            ]">

          <el-select v-model="articleInfo.articleClassify" filterable allow-create placeholder="请选择">
            
            <el-option
              v-for="(item, index) in classifies"
              :key="index"
              :label="item"
              :value="item">
            </el-option>

          </el-select>

        </el-form-item>

        <el-form-item label="文章标签" style="margin-left: 40px">

          <el-tag
          :type='type[count]'
          :key="tag"
          v-for="tag in dynamicTags"
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

        <el-form-item label="量表封面上传" style="margin-left: 40px">

                <!-- 头衔缩略图 -->

                <pan-thumb-cover :image="String(articleInfo.cover)"/>

                <!-- 文件上传按钮 -->

                <el-button type="primary" icon="el-icon-upload" @click="upload"
                style="margin-left:40px;margin-top: 50px"
                :loading="loading">选择封面

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

                        @crop-upload-success="cropSuccess"
                        
                />


        </el-form-item>

        <el-form-item label="美文编辑器" style="margin-left: 40px">

        </el-form-item>

        <el-form-item label="美文编辑器" style="width: 80%;margin: 10px auto"
        :rules="[
            { required: true, message: '请编辑美文内容', trigger: 'blur' },
            {  min: 400, max: 1000000, message: '至少包含100字', trigger: 'blur, change'  }
            ]"
        prop="content">

            <tinymce :height="300" v-model="articleInfo.content" 
            />

        </el-form-item>

        <el-form-item label="" style="height: 90px;margin-left: 100px;margin-top: 100px;">

          <el-button type="success" @click="submit('articleInfo')">提交修改</el-button>

        </el-form-item>
        

      </el-form>
  
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import ImageCropper from '@/components/ImageCropper'
import PanThumbCover from '@/components/PanThumbCover'
import articleApi from '@/api/edu/article'

export default {
    components: { Tinymce ,ImageCropper, PanThumbCover},
    data() {
        return {
            articleInfo: {},
            classifies: [],
            dynamicTags: [],
            inputVisible: false,
            inputValue: '',
            showTagBtn: true,
            BASE_API: process.env.BASE_API, // 接口API地址
            imagecropperShow : false, //上传弹框组件显示
            imagecropperKey : 0,
            type: ['', 'success', 'danger'],//标签框主题更换
            loading: false,
            count: 0
        }
    },
    created() {
      this.init()
    },
    methods: {
      init() {
        this.getArticle()
        this.getArticleClassifies()
      },
      getArticle() {
          articleApi.getArticle(this.$route.params.id)
            .then(response =>{
                console.log(response.data.article)
                //获取文章内容
                this.articleInfo = response.data.article
                if(this.articleInfo.oneTag != null) {
                    this.dynamicTags.push(this.articleInfo.oneTag)
                } 
                if(this.articleInfo.twoTag != null) {
                    this.dynamicTags.push(this.articleInfo.twoTag)
                } 
                if(this.articleInfo.threeTag != null) {
                    this.dynamicTags.push(this.articleInfo.threeTag)
                } 
            })
            .catch(error =>{
                this.$message({
                    type: 'error',
                    message: '信息获取失败!'
                })
            })
      },
      getArticleClassifies() {
        //获取所有的文章分类名称
        articleApi.getAllArticleClassify()
          .then(response =>{
            this.classifies = response.data.classifies
          })
          .catch(error =>{
            this.$message({
                type: 'error',
                 message: '分类获取失败!'
            });
          })
      },
      submit(formName) {
        // 提交规则检验
        this.$refs[formName].validate((valid) => {
        if (valid) {
            //检验图片上传和标签
          if(this.checkTag()) {
              //将标签内容注入articleInfo对象
              this.articleInfo.oneTag = this.dynamicTags[0]
              this.articleInfo.twoTag = this.dynamicTags[1]
              this.articleInfo.threeTag = this.dynamicTags[2]

              //保存文章数据
              this.updateArticle(this.articleInfo)
          }

        } else {
            this.$message({
                type: 'error',
                 message: '请完善信息!'
            });
            
          }
        });
        
      },
      updateArticle() {
        articleApi.updateArticle(this.articleInfo)
          .then(response =>{
            this.$message({
              type: 'success',
              message: '修改成功！'
            })
            this.$router.push({path: '/article/list'})
          })
          .catch(error =>{
            this.$message({
              type: 'error',
              message: '修改失败！'
            })
          })
      },
      checkTag() {  //检验图片上传和标签
        
        if(this.dynamicTags.length == 0) { //标签内容判断
            this.$message({
                type: 'error',
                 message: '请添加至少一个文章标签!'
            });
            return false
          }
          return true
      },
      upload() {
          this.imagecropperShow = true
      },
      close() { //关闭头像上传组件
          this.imagecropperShow = false
          this.imagecropperKey = this.imagecropperKey + 1
      },
      cropSuccess(data) {
          //关闭图片上传组件
          this.imagecropperShow = false
          this.hasCover = true
          this.articleInfo.cover = data.url   //上传成功返回图片地址
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
      }
    }
}
</script>

<style scoped=''>

.tinymce-container {

  line-height: 29px;

}


  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }

</style>