<template>
  <div class="app-container">
    <h2 style="text-align: center">发布心理测试量表</h2>

    <el-steps
      :active="3"
      process-status="wait"
      align-center
      style="margin-bottom: 40px"
    >
      <el-step title="完善量表信息" icon="el-icon-edit"></el-step>

      <el-step title="量表题目上传" icon="el-icon-upload"></el-step>

      <el-step title="量表评估规则上传" icon="el-icon-edit-outline"></el-step>

      <el-step title="提交审核" icon="el-icon-share"></el-step>
    </el-steps>

    <div class="app-container">
      <el-form label-width="120px">
        <el-form-item label="信息描述">
          <el-tag type="info">上传文件后缀类型为.xlsx</el-tag>

          <el-tag>
            <i class="el-icon-download" />

            <a :href="'/static/wa - 副本.xlsx'">点击下载模版</a>
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
            :action="
              BASE_API +
              '/eduservice/edu-scale/addScaleAppraisal/' +
              this.$route.params.id
            "
            name="file"
            accept="application/vnd.ms-excel"
          >
            <el-button slot="trigger" size="small" type="primary"
              >选取文件</el-button
            >

            <el-button
              :loading="loading"
              style="margin-left: 10px"
              size="small"
              type="success"
              @click="submitUpload"
              >{{ fileUploadBtnText }}</el-button
            >
          </el-upload>
        </el-form-item>
      </el-form>
    </div>

    <el-dialog title="题目信息检查" :visible.sync="dialogFormVisible">
      <el-table :data="scaleAppraisals">
        <el-table-column property="dimension" label="评估维度" width="150"></el-table-column>
        <el-table-column property="upperLimit" label="分数上限" width="200"></el-table-column>
        <el-table-column property="lowerLimit" label="分数下限" width="200"></el-table-column>
        <el-table-column property="appraisalResult" label="评估结果"></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="delScaleAppraisal" type="danger">撤销并重新上传</el-button>
        <el-button type="success" @click="uploadAppraisal"
          >保存并下一步</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import scaleApi from "@/api/edu/scale";

export default {
  data() {
    return {
      scaleAppraisals: [],
      fileUploadBtnText: "上传测试量表文件",
      loading: false,
      BASE_API: process.env.BASE_API,
      importBtnDisabled: false,
      dialogFormVisible: false
    };
  },
  created() {
  },
  methods: {
    //上传成功操作
    fileUploadSuccess() {
      this.$message({
        type: "success",
        message: "文件上传成功!",
      });

      this.loading = false
      this.importBtnDisabled = true

      const id = this.$route.params.id
      this.dialogFormVisible = true
      this.getScaleAppraisal(id)
    },
    //上传失败操作
    fileUploadError(res) {
      this.$message({
        type: "error",
        message: "文件上传失败!",
      });
      this.loading = false;
      this.importBtnDisabled = false;
    },
    //文件点击提交
    submitUpload() {
      this.importBtnDisabled = true;
      this.loading = true;
      this.$refs.upload.submit();
    },
    getScaleAppraisal(id) {
        scaleApi.getScaleAppraisal(id)
            .then(response => {
                this.scaleAppraisals = response.data.scaleAppraisals
            })
            .catch(error => {
                this.$message({
                    type: "error",
                    message: "上传信息回显失败!",
                });
            })
    },
    delScaleAppraisal() {
        const id = this.$route.params.id
        scaleApi.delScaleAppraisal(id)
            .then(response => {
                this.$message({
                    type: "success",
                    message: "撤销成功!",
                });
                this.dialogFormVisible = false;
                this.importBtnDisabled = false;
                location.reload()
            })
            .catch(error => {
                this.$message({
                    type: "error",
                    message: "撤销失败!",
                });
            })
    },
    uploadAppraisal() {

      const id = this.$route.params.id
      this.$router.push({path: '/scale/send/' + id})
    }
  }
}
</script>

<style scoped>

.subject {
    margin-left: 80px;
}

.option {
    margin-left: 80px;
    font-size: 15px;
    margin: 10px;
}

.score {
    color: red;
    margin-left: 30px;
}

</style>