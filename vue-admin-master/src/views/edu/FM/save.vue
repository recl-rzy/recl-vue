<template>
  <div class="app-container">
    <el-form label-width="120px" :model="music" ref="music">
      <el-form-item
        label="音频标题"
        prop="title"
        :rules="[
          { required: true, message: '请输入音频标题', trigger: 'blur' },
          {
            min: 1,
            max: 90,
            message: '不能超过90个字',
            trigger: 'blur, change',
          },
        ]"
      >
        <el-input v-model="music.title" />
      </el-form-item>

      <el-form-item
        label="音频个性签名"
        prop="sign"
        :rules="[
          { required: true, message: '请输入音频个性签名', trigger: 'blur' },
          {
            min: 15,
            max: 300,
            message: '不少于15字，不得超过300个字',
            trigger: 'blur, change',
          },
        ]"
      >
        <el-input v-model="music.sign" />
      </el-form-item>

      <el-form-item
        label="音频所属心情"
        prop="musicMood"
        :rules="[
          { required: true, message: '请选择音频对应心情', trigger: 'blur' },
        ]"
      >
        <el-select v-model="music.musicMood" clearable placeholder="请选择">
          <!--

            数据类型一定要和取出的json中的一致，否则没法回填

            因此，这里value使用动态绑定的值，保证其数据类型是number

          -->

          <el-option
            :label="item"
            :value="item"
            v-for="(item, index) in moodOptions"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="音频封面上传">
        <!-- 头衔缩略图 -->

        <pan-thumb-cover :image="String(music.cover)" />

        <!-- 文件上传按钮 -->

        <el-button
          type="primary"
          icon="el-icon-upload"
          @click="upload"
          style="margin-left: 40px; margin-top: 50px"
          :loading="imgLoading"
          >选择封面
        </el-button>

        <!--
                
                v-show：是否显示上传组件
                
                :key：类似于id，如果一个页面多个图片上传控件，可以做区分
                
                :url：后台上传的url地址
                
                @close：关闭上传组件
                
                @crop-upload-success：上传成功后的回调 -->

        <image-cropper
          v-show="imagecropperShow"
          :width="300"
          :height="300"
          :key="imagecropperKey"
          :url="BASE_API + '/eduoss/fileoss'"
          field="file"
          @close="close"
          @crop-upload-success="cropSuccess"
        />
      </el-form-item>

      <el-form-item label="选择音频文件">
        <el-upload
          ref="upload"
          :auto-upload="false"
          :on-success="fileUploadSuccess"
          :on-error="fileUploadError"
          :disabled="importBtnDisabled"
          :beforeUpload="beforeMusicUpload"
          :limit="1"
          :action="BASE_API + '/eduoss/fileoss/uploadMusic'"
          name="file"
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

      <el-form-item>
        <el-button
          :disabled="saveBtnDisabled"
          type="primary"
          @click="saveOrUpdate('music')"
          >保存</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
import musicApi from "@/api/edu/music"
import Tinymce from "@/components/Tinymce"
import ImageCropper from "@/components/ImageCropper"
import PanThumbCover from "@/components/PanThumbCover"
import { mapGetters } from 'vuex'

export default {
  components: { Tinymce, ImageCropper, PanThumbCover },
  computed: {
    ...mapGetters([
        'id'
      ])
  },
  data() {
    return {
      BASE_API: process.env.BASE_API,
      saveBtnDisabled: false, // 保存按钮是否禁用,
      moodOptions: [
        "快乐",
        "烦躁",
        "悲伤",
        "孤独",
        "已弃疗",
        "减压",
        "无奈",
        "感动",
        "迷茫",
        "治愈"
      ],
      importBtnDisabled: false, // 按钮是否禁用,

      loading: false,

      imgLoading: false,

      fileUploadBtnText: "上传到服务器", // 按钮文字

      imagecropperShow: false, //上传弹框组件显示

      imagecropperKey: 0,

      supportSubmit: true,

      music: {}
    }
  },
  created() {
    this.init();
  },
  watch: {
    $route(to, from) {
      this.init();
    },
  },
  methods: {
    init() {
      if (this.$route.params && this.$route.params.id) {
        const id = this.$route.params.id
        this.getMusic(id)
      } else {
        this.music = {}
        this.music.userId = this.id
        this.music.cover = '/static/1632333109865hcCZZRrcXI4VJOPneNOPyW0uM2NDnWP5.jpg'
      }
    },
    checkHasCoverAndMusic() {
      if(this.music.cover == null || this.music.cover == "/static/1632333109865hcCZZRrcXI4VJOPneNOPyW0uM2NDnWP5.jpg") {
        this.$message({
          type: "error",
          message: "请上传封面图片!",
        });
        this.supportSubmit = false
      }

      if(this.music.musicUrl == null) {
        this.$message({
          type: "error",
          message: "请上传对应的音频文件!",
        });
        this.supportSubmit = false
      }

      return this.supportSubmit
    },
    saveOrUpdate(formName) {
      // 提交规则检验
      console.log(this.music)
      this.$refs[formName].validate((valid) => {
        if (valid && this.checkHasCoverAndMusic()) {
            if (!this.music.id) {
              //防止重复提交
              this.saveBtnDisabled = true;

              this.saveMusic();
            } else {
              
              this.updateMusic();
            }
        } else {

          this.supportSubmit = true
        }
      })
    },
    updateMusic() {
      musicApi.updateMusic(this.music)
        .then((response) => {
          //修改成功提示信息
          this.$message({
            type: "success",
            message: "修改成功!",
          });
          //回到列表
          this.$router.push({ path: "/FM/list" });
        })
        .catch((error) => {
          this.saveOrUpdate = false;
        });
    },
    saveMusic() {
      musicApi.addMusic(this.music)
        .then((response) => {
          //添加成功操作
          this.$message({
            type: "success",
            message: "添加成功!",
          });
          //回到列表
          this.$router.push({ path: "/FM/list" });
        })
        .catch((error) => {
          this.saveOrUpdate = false;
        });
    }, //根据id获取咨询师信息并回显
    getMusic(id) {
      musicApi.getMusic(id).then((response) => {
        this.music = response.data.music;
      });
    },
    //上传成功操作
    fileUploadSuccess(res) {
      this.$message({
        type: "success",
        message: "音频文件上传成功!",
      });
      console.log(res.data.url);
      this.loading = false;
      this.importBtnDisabled = true;
      this.music.musicUrl = res.data.url;
      console.log(this.music.musicUrl);
    },
    //上传失败操作
    fileUploadError() {
      this.$message({
        type: "error",
        message: "文件上传失败!",
      });
    },
    //文件点击提交
    submitUpload() {
      this.importBtnDisabled = true;
      this.loading = true;
      this.$refs.upload.submit();
    },
    //文件上传前格式检验
    beforeMusicUpload(file) {
      var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      const extension = testmsg === "mp3";
      if (!extension) {
        this.$message({
          message: "上传文件仅限MP3格式",
          type: "error",
        });
      }
      this.importBtnDisabled = false;
      this.loading = false;
      return extension;
    },
    cropSuccess(data) {
      //关闭图片上传组件
      this.imagecropperShow = false;
      this.music.cover = data.url; //上传成功返回图片地址
      this.imagecropperKey = this.imagecropperKey + 1;
    },
    close() {
      //关闭头像上传组件
      this.imagecropperShow = false;
      this.imagecropperKey = this.imagecropperKey + 1;
    },
    upload() {
      this.imagecropperShow = true;
    }
  }
}

</script>

<style>

.tinymce-container {

  line-height: 29px;

}

</style>