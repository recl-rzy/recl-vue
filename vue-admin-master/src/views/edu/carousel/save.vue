<template>
  
    <div id="save">

        <el-form label-width="120px" :model="carousel" ref="carousel">
            
            <el-form-item label="封面标题" prop="title" 
            :rules="[
                    { required: true, message: '请输入轮播标题', trigger: 'blur' },
                    {  min: 1, max: 20, message: '不能超过20个字', trigger: 'blur, change'  }
                    ]">

                <el-input v-model="carousel.title"/>

            </el-form-item>

            <el-image :src="carousel.imgUrl"
            style="width: 400px; height: 300px; margin-left: 120px">
                <div slot="placeholder" class="image-slot">
                    加载中<span class="dot">...</span>
                </div>
                <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                </div>
            </el-image>

            <el-form-item>
                <el-upload
                ref="upload"
                :auto-upload="false"
                :on-success="fileUploadSuccess"
                :on-error="fileUploadError"
                :disabled="importBtnDisabled"
                :beforeUpload="beforeUpload"
                :limit="1"
                :action="BASE_API + '/eduoss/fileoss'"
                name="file"
                >
                <el-button slot="trigger" size="small" type="primary"
                    >选取图片</el-button
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
                @click="saveOrUpdate('carousel')"
                >保存</el-button
                >
            </el-form-item>

        </el-form>
    </div>

</template>

<script>
import carouselApi from '@/api/edu/carousel.js'

export default {
    data() {
        return {
            carousel: {},
            saveBtnDisabled: false, // 保存按钮是否禁用,
            BASE_API : process.env.BASE_API,
            supportSubmit: true,
            importBtnDisabled: false, // 按钮是否禁用,
            loading: false,
            fileUploadBtnText: "上传",
        }
    },
    created() {
        this.init()
    },
    methods: {
        init() {
            if (this.$route.params && this.$route.params.id) {

                const id = this.$route.params.id
                this.getCarousel(id)
                
            } else {
                this.carousel = {}
                this.carousel.imgUrl = 'https://recl-edu.oss-cn-beijing.aliyuncs.com/2021/08/10/9060f46f93984b5ca4d6c105d3f5a743file.png'
            }
        },
        close() { //关闭头像上传组件
            this.imagecropperShow = false
            this.imagecropperKey = this.imagecropperKey + 1
        },
        cropSuccess(data) {
            this.imagecropperShow = false
            this.carousel.imgUrl = data.url   //上传成功返回图片地址
            this.imagecropperKey = this.imagecropperKey + 1
        },
        checkImgUrl() {
            if(this.carousel.imgUrl == null || this.carousel.imgUrl == "https://recl-edu.oss-cn-beijing.aliyuncs.com/2021/08/10/9060f46f93984b5ca4d6c105d3f5a743file.png") {
                this.$message({
                    type: "error",
                    message: "请上传轮播图!",
                });
                this.supportSubmit = false
            }

            return this.supportSubmit
        },
        getCarousel(id) {
            carouselApi.getCarousel(id)
                .then(response => {
                    this.carousel = response.data.carousel
                })
                .catch(error => {
                    console.log(error)
                })
        },
        addCarousel() {
            carouselApi.addCarousel(this.carousel)
                .then(response => {
                    console.log(response)
                    this.$message({
                        type: "success",
                        message: "背景上传成功!",
                    });
                })
                .catch(error => {
                    console.log(error)
                })
        },
        updateCarousel() {
            carouselApi.updateCarousel(this.carousel)
                .then(response => {
                    console.log(response)
                    this.$message({
                        type: "success",
                        message: "修改成功!",
                    });
                })
                .catch(error => {
                    console.log(error)
                })
        },
        saveOrUpdate(formName) {
            // 提交规则检验
            console.log(this.carousel)
            this.$refs[formName].validate((valid) => {
                if (valid && this.checkImgUrl()) {
                    if (!this.carousel.id) {
                        //防止重复提交
                        this.saveBtnDisabled = true
                        this.addCarousel()
                        
                    } else {
                        
                        this.saveBtnDisabled = true
                        this.updateCarousel()
                        
                    }
                    this.$router.push({path: '/carousel/list'})
                } else {

                    this.supportSubmit = true

                }
            })
        },
            //上传成功操作
        fileUploadSuccess(res) {
            this.$message({
                type: "success",
                message: "图片上传成功!",
            });
            console.log(res);
            this.loading = false;
            this.importBtnDisabled = true;
            this.carousel.imgUrl = res.data.url;
        },
        //上传失败操作
        fileUploadError() {
            this.$message({
                type: "error",
                message: "图片上传失败!",
            });
            this.importBtnDisabled = false
        },
        //文件点击提交
        submitUpload() {
            this.importBtnDisabled = true;
            this.loading = true;
            this.$refs.upload.submit();
        },
        //文件上传前格式检验
        beforeUpload(file) {
            var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
            const extension = testmsg === "png" || testmsg === 'jpg';
            if (!extension) {
                this.$message({
                message: "上传文件仅限png/jpg格式",
                type: "error",
                });
            }
            this.importBtnDisabled = false;
            this.loading = false;
            return extension;
        }
    },
    watch: {
        $route(to, from) {
            this.init()
        },
    },
}
</script>

<style scoped>

#save {
    margin-top: 100px;
    width: 60%;
}

</style>