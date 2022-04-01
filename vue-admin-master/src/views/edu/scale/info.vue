<template>
  
    <div class="app-container">

        <h2 style="text-align: center;">发布心理测试量表</h2>
  
        <!--  发布步骤条 -->
        <el-steps :active="1" process-status="wait" align-center style="margin-bottom: 40px;">

            <el-step title="完善量表信息" icon="el-icon-edit"></el-step>

            <el-step title="量表上传" icon="el-icon-upload"></el-step>

            <el-step title="量表评估规则上传" icon="el-icon-edit-outline"></el-step>

            <el-step title="提交审核" icon="el-icon-share"></el-step>

        </el-steps>

        <el-form label-width="100px" :model="scaleInfo" ref="scaleInfo">
            
            <el-form-item label="量表名输入" prop="title"
            :rules="[
            { required: true, message: '请输入量表名称', trigger: 'blur' },
            {  min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur, change'  }
            ]">

                <el-input v-model="scaleInfo.title" placeholder="请输入2到30字中文量表名称"/>

            </el-form-item>

            <!-- 保存量表信息 -->
            <el-form-item label="咨询师选择" prop="counselorId"
            :rules="[
            { required: true, message: '请选择心理咨询师', trigger: 'change' }
            ]">

                <el-select v-model="scaleInfo.counselorId" placeholder="请选择发布者姓名">
                    <el-option
                    v-for="item in counselorList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                    </el-option>
                </el-select>

            </el-form-item>

            <el-form-item label="量表价格">

                <el-input-number v-model="scaleInfo.price" controls-position="right" :min='0'/>

            </el-form-item>

            <el-form-item label="量表分类选择" prop="classifyId"
            :rules="[
            { required: true, message: '请完善量表分类', trigger: 'blur' }
            ]">

                <el-select v-model="scaleInfo.classifyParentId" filterable placeholder="请选择一级分类" @change="showTwoClassify">
                    <el-option
                    v-for="item in oneClassify"
                    :key="item.id"
                    :label="item.title"
                    :value="item.id">
                    </el-option>
                </el-select>

                <el-select v-model="scaleInfo.classifyId" filterable placeholder="请选择二级分类">
                    <el-option
                    v-for="item in twoClassify"
                    :key="item.id"
                    :label="item.title"
                    :value="item.id">
                    </el-option>
                </el-select>

            </el-form-item>

            <el-form-item label="量表简介" prop="description" 
            :rules="[
            { required: true, message: '请输入量表说明', trigger: 'blur' },
            {  min: 10, max: 500, message: '请输入10到500字的量表相关说明', trigger: 'blur'  }
            ]">

                <el-input v-model="scaleInfo.description" placeholder="请输入10到500字的量表相关说明"/>

            </el-form-item>  

            <el-form-item label="量表封面上传">

                <!-- 头衔缩略图 -->

                <pan-thumb-cover :image="String(scaleInfo.cover)"/>

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

            <el-form-item>

                <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate('scaleInfo')" v-show="backScaleShow">保存并下一步</el-button>
          
                <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate('scaleInfo')" v-show="!backScaleShow">保存修改</el-button>
                
                <el-button type="danger" v-show="!backScaleShow">撤销量表提交</el-button>

            </el-form-item>

        </el-form>

    </div>

</template>

<script>
import scaleApi from '@/api/edu/scale'
import ImageCropper from '@/components/ImageCropper'
import PanThumbCover from '@/components/PanThumbCover'
import { mapGetters } from 'vuex'

export default {
    components: {
        ImageCropper,
        PanThumbCover
    },
    computed: {
    ...mapGetters([
        'id'
      ])
    },
    data() {
        return {
            scaleInfo: { 
                cover: '/static/pexels-kobe-3014941.jpg'
            },
            oneClassify: [],
            twoClassify: [],
            counselorList: [],
            saveBtnDisabled: false,
            BASE_API: process.env.BASE_API, // 接口API地址
            imagecropperShow : false, //上传弹框组件显示
            imagecropperKey : 0,
            loading: false,
            imgUploadSucess: false,
            backScaleShow: true
        }
    },
    created() {
        this.init()
    },
    methods: {
        init() {
            this.getCounselorInfo()
            this.getClassifyInfo()
            // 判断路径存在路由变量时为信息修改状态（回显量表信息）
            if(this.$route.params && this.$route.params.id) {
                // 获取路由中的id
                const id = this.$route.params.id
                this.getScaleInfo(id)
                this.backScaleShow = false
            } else {

                this.scaleInfo = {}
                this.scaleInfo.userId = this.id
                this.scaleInfo.cover = '/static/pexels-kobe-3014941.jpg'
            }
        },
        saveOrUpdate(formName) {
            // 提交规则检验
            this.$refs[formName].validate((valid) => {
                if (valid) { 
                    // 判断当前状态为修改信息或保存信息
                    if(!this.scaleInfo.id) {
                        // 检验是否上传量表封面
                        if(this.imgUploadSucess) {
                            // 上传成功后禁用保存按钮并保存量表信息
                            this.saveBtnDisabled = true
                            this.saveScaleInfo(this.scaleInfo)
                        } else {
                            // 封面未上传弹出提示信息
                            this.$message({
                                type: 'error',
                                message: '请上传量表封面!'
                            });
                        } 
                    }  else {

                        this.updateScaleInfo(this.scaleInfo)
                    }                
                } else {
                    this.$message({
                        type: 'error',
                        message: '量表信息存在错误!'
                    });
                }
            })
        },
        updateScaleInfo(scaleInfo) {
            scaleApi.updateScaleInfo(scaleInfo)
                .then(response =>{
                    this.$message({
                        type: 'success',
                        message: '信息修改成功!'
                    });
                    // 成功跳转量表发布组件
                    const id = this.$route.params.id
                    this.$router.push({path:"/scale/send/" + id})
                })
                .catch(error =>{
                    this.$message({
                        type: 'error',
                        message: '信息修改失败!'
                    });
                    console.log(error)
                })
        },
        saveScaleInfo(scaleInfo) {
            // 调用保存信息的接口
            scaleApi.addScaleInfo(scaleInfo)
                .then(response =>{
                    this.$message({
                        type: 'success',
                        message: '信息保存成功!'
                    });
                    
                    // 成功跳转量表封面上传组件
                    this.$router.push({path:"/scale/subject/" + response.data.scaleId})
                })
                .catch(error =>{
                    this.$message({
                        type: 'error',
                        message: '信息保存失败!'
                    });
                    this.saveBtnDisabled = false
                })
        },
        getClassifyInfo() {
            // 调用获取分类选项的接口
            scaleApi.getAllClassifyInfo()
                .then(response =>{
                    this.oneClassify = response.data.classify
                    // 二级分类回显
                    scaleApi.getAllClassifyInfo()
                        .then(response =>{
                            this.oneClassify = response.data.classify
                            
                            // 遍历一级分类对象获取二级分类数组,回显二级分类
                            for(let i = 0; i < this.oneClassify.length; i++) {
     
                                if(this.oneClassify[i].id == this.scaleInfo.classifyParentId) {
                                    this.twoClassify = this.oneClassify[i].twoClassifies
                                }
                            }
                        })
                })
        },
        getTwoClassify(oneClassifyId) {
            // 遍历一级分类对象获取二级分类数组
            for(let i = 0; i < this.oneClassify.length; i++) {

                if(this.oneClassify[i].id == oneClassifyId) {
                    this.twoClassify = this.oneClassify[i].twoClassifies
                }
            }
        },
        getAllClassify() {
            scaleApi.getAllClassifyInfo()
                .then(response =>{
                    this.oneClassify = response.data.classify
                    // 遍历一级分类对象获取二级分类数组
                    for(let i = 0; i < this.oneClassify.length; i++) {

                        if(this.oneClassify[i].id == this.scaleInfo.parentClassifyId) {
                            this.twoClassify = this.oneClassify[i].twoClassifies
                        }
                    }
                })
        },
        showTwoClassify(value) {
            // 获取二级分类对象
            this.getTwoClassify(value)
        },
        getTwoClassify(oneClassifyId) {
            // 遍历一级分类对象获取二级分类数组
            for(let i = 0; i < this.oneClassify.length; i++) {

                if(this.oneClassify[i].id == oneClassifyId) {
                    this.twoClassify = this.oneClassify[i].twoClassifies
                }
            }
        },
        showTwoClassify(value) {
            // 获取二级分类对象
            this.getTwoClassify(value)
        },
        getCounselorInfo() {
            // 获取所有咨询师姓名
            scaleApi.getAllCounselor()
                .then(response =>{
                    this.counselorList = response.data.items
                })
        },
        getScaleInfo(id) {
            // 调用获取量表信息的接口
            scaleApi.getScaleInfo(id)
                .then(response => {

                    this.scaleInfo = response.data.eduScale
                })
                .catch(error => {

                    console.log(error)
                    this.$message({ 
                        type: 'error',
                        message: '量表信息获取失败!'
                    });
                })
        },
        upload() {
            this.imagecropperShow = true
        },
        close() { //关闭头像上传组件
            this.imagecropperShow = false
            this.imagecropperKey = this.imagecropperKey + 1
        },
        cropSuccess(data) {

            this.imgUploadSucess = true
            this.imagecropperShow = false
            this.scaleInfo.cover = data.url   //上传成功返回图片地址
            this.scaleInfo.id = this.$route.params.scaleId
            this.imagecropperKey = this.imagecropperKey + 1
        }
    },
    watch: {
        $route(to, from) {
            this.init()
        }
    }
}
</script>

<style>

</style>