<template>

  <div id="info">

    <CommNav :userInfo="userInfo"/>

    <div class="content-wrap">

        <div class="left-div">
            <ul>
                <div class="ul-title">
                    <i class="el-icon-s-custom"></i>
                    账号信息
                </div>
                <li><a href="#" @click="focus = 'info'" :class="{'active': focus === 'info'}">个人信息</a></li>
                <li><a href="#" @click="focus = 'update'" :class="{'active': focus === 'update'}">信息修改</a></li>
                <li><a href="#" @click="focus = 'pw'" :class="{'active': focus === 'pw'}">修改密码</a></li>
                <li><a href="#" @click="focus = 'avatar'" :class="{'active': focus === 'avatar'}">更新头像</a></li>
            </ul>
            <ul>
                <div class="ul-title">
                    <i class="el-icon-s-goods"></i>
                    我的服务
                </div>
                <li><a href="#">预约订单</a></li>
                <li><a href="#">已购量表</a></li>
            </ul>
            <ul>
                <div class="ul-title">
                    <i class="el-icon-s-comment"></i>
                    管理通知
                </div>
                <li><a href="#">系统通知</a></li>
                <li><a href="#">评论回答</a></li>
                <li><a href="#">私信</a></li>
                <li><a href="#">消息</a></li>
            </ul>
        </div>

        <div class="uc-main">
            <div class="title">管理中心</div>

            <div class="uc-content">

                <div class="uc-info" v-if="focus === 'info'">

                    <div class="avatar">
                        <div class="block" key="fit">
                            <el-avatar shape="square" :size="100" fit="fill" :src="userInfo.avatar"></el-avatar>
                        </div>
                    </div>
                    <el-descriptions :column="3" border>
                    <el-descriptions-item label="用户名" label-class-name="name" content-class-name="name">{{userInfo.nickName}}</el-descriptions-item>
                    <el-descriptions-item label="账号">{{userInfo.username}}</el-descriptions-item>
                    <el-descriptions-item label="性别">{{userInfo.sex | getSex}}</el-descriptions-item>
                    <el-descriptions-item label="年龄">
                        <el-tag size="middle">{{userInfo.age ? userInfo.age : '未填写'}}</el-tag>
                    </el-descriptions-item>
                    <el-descriptions-item label="个性签名" :contentStyle="{'text-align': 'center'}">{{userInfo.sign ? userInfo.sign : '未填写'}}</el-descriptions-item>
                    </el-descriptions>

                </div>

                <div class="uc-update" v-if="focus === 'update'">

                    <el-form :model="userInfo" status-icon ref="userInfo" label-width="100px" class="demo-ruleForm" key="update">
                    
                    <el-form-item label="用户名" prop="nickName"
                    :rules="[
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' }
                    ]">
                        <el-input v-model="userInfo.nickName"></el-input>
                    </el-form-item>

                    <el-form-item label="性别" prop="sex"
                    :rules="[
                    { required: true, message: '请选择性别', trigger: 'blur'},
                    ]">
                        <el-radio-group v-model="userInfo.sex">
                        <el-radio :label="1">男</el-radio>
                        <el-radio :label="2">女</el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item label="年龄" prop="age"
                    :rules="[
                    { type: 'number', message: '年龄必须为数字值'}
                    ]">
                        <el-input type="age" v-model.number="userInfo.age"></el-input>
                    </el-form-item>

                    <el-form-item label="个性签名" prop="sign">
                        <el-input v-model="userInfo.sign"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="submitUpdateForm('userInfo')">提交</el-button>
                        <el-button @click="resetUpdateForm('userInfo')">重置</el-button>
                    </el-form-item>

                    </el-form>

                </div>

                <div class="uc-pw" v-if="focus === 'pw'">

                    <el-form :model="userInfo" status-icon ref="userInfo" :rules="rules" label-width="100px" class="demo-userInfo" key="pw">
                    
                    <el-form-item label="原始密码" prop="password">
                        <el-input type="password" v-model="userInfo.password" autocomplete="off"></el-input>
                    </el-form-item>

                    <el-form-item label="新密码" prop="newPw">
                        <el-input type="password" v-model="userInfo.newPw" autocomplete="off"></el-input>
                    </el-form-item>

                    <el-form-item label="确认密码" prop="checkPw">
                        <el-input type="password" v-model="userInfo.checkPw" autocomplete="off"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="submitPwForm('userInfo')">提交</el-button>
                        <el-button @click="resetPwForm('userInfo')">重置</el-button>
                    </el-form-item>
                    </el-form>

                </div>

                <div class="uc-avatar" v-if="focus === 'avatar'">
                    <el-form status-icon ref="userInfo" label-width="100px" class="demo-ruleForm" key="avatar">
                        
                        <el-image :src="avatar"
                        style="width: 100px; height: 100px; margin-left: 100px">
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
                            :auto-upload="true"
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
                                @click="updateUserInfo"
                                >{{ fileUploadBtnText }}</el-button
                            >
                            </el-upload>
                        </el-form-item>
                    </el-form>
                </div>

            </div>
        </div>

    </div>

  </div>

</template>

<script>
import CommNav from '@/components/common/CommNav.vue'
import cookie from 'js-cookie'
import userApi from '@/api/user.js'
import loginApi from '@/api/login.js'

export default {
    components: {
        CommNav
    },
    data() {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.userInfo.newPw) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        }
        return {
            userInfo: {
                sex: 0
            },
            BASE_API : 'http://localhost:8222',
            rules: {
                password: [
                    { required: true, message: '请输入密码'},
                    { min: 6, max: 15, message: '请输入6-15位密码', trigger: 'blur' }
                ],
                newPw: [
                    { required: true, message: '请输入密码'},
                    { min: 6, max: 15, message: '请输入6-15位密码', trigger: 'blur' }
                ],
                checkPw: [
                    { validator: validatePass, trigger: 'blur' },
                    { required: true, message: '请输入密码'},
                    { min: 6, max: 15, message: '请输入6-15位密码', trigger: 'blur' }
                ]
            },
            supportSubmit: true,
            importBtnDisabled: false, // 按钮是否禁用,
            loading: false,
            fileUploadBtnText: "修改头像",
            focus: 'info',
            avatar: ''
        }
    },
    created() {
        this.init()
    },
    methods: {
        init() {
            this.getUserInfoByCookie()
            console.log(this.userInfo)
            this.avatar = this.userInfo.avatar
        },
        getUserInfoByCookie() {
        
            var userInfoStr = cookie.get('recl_ucenter')
            if(userInfoStr) {
                //将用户信息字符串转json对象
                this.userInfo = JSON.parse(userInfoStr)
                this.userInfo.password = ''
            } else {
                this.$router.push({path: '/login'})
            }
        },
        submitUpdateForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                
                this.updateUserInfo()
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
        resetUpdateForm(formName) {
            this.$refs[formName].resetFields();
        },
        submitPwForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                
                this.updatePw()
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
        resetPwForm(formName) {
            this.$refs[formName].resetFields();
        },
        updateUserInfo() {
            this.userInfo.avatar = this.avatar
            userApi.updateUserInfo(this.userInfo)
                .then(response => {
                    this.$message({
                        showClose: true,
                        type: 'success',
                        message: "修改成功"
                    })
                    cookie.set("recl_ucenter", JSON.stringify(this.userInfo), {domain: 'localhost'})
                    this.focus = 'info'
                })
                .catch(error => {
                    this.$message({
                        showClose: true,
                        type: 'error',
                        message: "修改失败"
                    })
                })
        },
        updatePw() {
            userApi.updatePw(this.userInfo)
                .then(response => {
                    cookie.set("recl_ucenter", '', {domain: 'localhost'})
                    this.$message({
                        showClose: true,
                        type: 'success',
                        message: "修改成功,请重新登录!"
                    })
                    this.$router.push({ path: '/'})
                })
                .catch(error => {
                    console.log(error)
                })
        },
        //上传成功操作
        fileUploadSuccess(res) {
            this.$message({
                type: "success",
                message: "图片上传成功!",
            });
            console.log(res)
            this.loading = false
            this.importBtnDisabled = true
            this.avatar = res.data.url
        },
        //上传失败操作
        fileUploadError() {
            this.$message({
                type: "error",
                message: "图片上传失败!",
            });
            this.importBtnDisabled = false
        },
        //文件上传前格式检验
        beforeUpload(file) {
            var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1)
            const extension = testmsg === "png" || testmsg === 'jpg' || testmsg === 'jpeg'
            if (!extension) {
                this.$message({
                message: "上传文件仅限png/jpg/jpeg格式",
                type: "error",
                });
            }
            this.importBtnDisabled = false;
            this.loading = false;
            return extension;
        }
    },
    filters: {
        getSex(sex) {
            if(sex == 1) {
                return '男'
            } else {
                return '女'
            }
        }
    }
}
</script>

<style scoped>

#info {
    color: #111;
    position: absolute;
    width: 100%;
    min-height: 100%;
    top: 0;
    left: 0;
    z-index: 100;
    background: #eee;
} 

.content-wrap {
    width: 100%;
    height: 100%;
    position: relative;
}

/* 左侧区域 */
.left-div {
    width: 11%;
    height: auto;
    float: left;
    background: white;
    border-radius: 10px;
    margin-left: 13%;
    padding: 14px 0;
    margin-top: 50px;
} 

a {
    text-decoration: none;
    outline: none;
    color: inherit;
}

.left-div a {

    width: 100%;
    height: 100%;
    display: block;
    text-align: center;
    letter-spacing: 1px;
}

.left-div a:hover {
    color: rgb(29, 125, 235);
    width: 100%;
}

.left-div .ul-title {
    font-size: 16px;
    color: #999;
    margin-left: -14px;
}

.left-div ul {
    width: 100%;
}


.left-div li {
    list-style: none;
    margin: 10px -25%;
    width: 100%;
    height: 30px;
    line-height: 27px;
}

.active {
    color: #0b8bff;
    font-weight: 700;
    background-color: rgb(191, 222, 243);
}

/* 中心区域 */
.uc-main {
    width: 60%;
    float: right;
    display: inline;
    margin-top: 50px;
    height: auto;
    margin-right: 14%;
    border-radius: 3px;
}

.uc-main .title {
    height: 38px;
    line-height: 38px;
    border: 1px solid #efefef;
    border-radius: 5px;
    background: #fff;
    font-size: 14px;
    color: #444;
    padding: 0 30px;
}

.uc-main .uc-content {
    border: 1px solid #efefef;
    background: #fff;
    margin-top: 10px;
    padding: 50px 40px;
}

.uc-main .uc-content .avatar {
    margin-bottom: 40px;
}

.name {
    background: #d2ecc5;
}

@media (max-width: 1357px) {

    .left-div {
        width: 150px;
        font-size: 13px;
        height: 600px;
    }

    .content-wrap {
        display: flex;
        justify-content: center;
        width: 100%;
        height: 100%;
        position: relative;
    }

    .uc-main {
        margin: 50px auto;
    }
}

</style>