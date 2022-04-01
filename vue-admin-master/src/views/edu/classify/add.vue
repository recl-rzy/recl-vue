<template>

  <div class="app-container">

    <el-form label-width="120px">

      <el-form-item label="信息描述">

        <el-tag type="info">上传文件后缀类型为.xlsx</el-tag>

        <el-tag>

          <i class="el-icon-download"/>

          <a :href="'/static/wa.xlsx'">点击下载模版</a>

        </el-tag>


      </el-form-item>


      <el-form-item label="选择Excel">

        <el-upload

          ref="upload"

          :auto-upload="false"

          :on-success="fileUploadSuccess"

          :on-error="fileUploadError"

          :disabled="importBtnDisabled"

          :limit="1"

          :action="BASE_API+'/eduservice/test-classify/addTestClassify'"

          name="file"

          accept="application/vnd.ms-excel">

          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>

          <el-button

            :loading="loading"

            style="margin-left: 10px;"

            size="small"

            type="success"

            @click="submitUpload">{{ fileUploadBtnText }}</el-button>

        </el-upload>

      </el-form-item>

    </el-form>

  </div>

</template>

<script>

export default({
    data() {
        return {
            BASE_API: process.env.BASE_API, // 接口API地址

            importBtnDisabled: false, // 按钮是否禁用,

            loading: false,

            imgUrl: '',

            fileUploadBtnText: '上传到服务器', // 按钮文字
        }
    },
    created() {

    },
    methods : {
        //上传成功操作
        fileUploadSuccess() {
            this.$message({
                  type: 'success',
                  message: '添加分类成功!'
            });
            this.$router.push({path:'/scale/upload/' + this.$route.params.scaleId})
        },
        //上传失败操作
        fileUploadError() {
            this.$message({
                  type: 'error',
                  message: '添加分类失败!'
            });
        },
        //文件点击提交
        submitUpload() {
            this.importBtnDisabled = true
            this.loading = true
            this.$refs.upload.submit()
        }
    }
})
</script>
