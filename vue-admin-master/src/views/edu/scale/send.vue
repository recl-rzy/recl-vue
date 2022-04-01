<template>
  
    <div class="app-container">

        <h2 style="text-align: center">发布心理测试量表</h2>

        <el-steps
        :active="4"
        process-status="wait"
        align-center
        style="margin-bottom: 40px"
        >

            <el-step title="完善量表信息" icon="el-icon-edit"></el-step>

            <el-step title="量表题目上传" icon="el-icon-upload"></el-step>

            <el-step title="量表评估规则上传" icon="el-icon-edit-outline"></el-step>

            <el-step title="提交审核" icon="el-icon-share"></el-step>

        </el-steps>

        <el-button type="warning" icon="el-icon-back" circle style="margin-left: 10%"></el-button><span class="back">返回第一步</span>
        
        <div class="scale-send">
            <div class="profile-img">
                <img :src="scaleInfoVo.cover" alt="">
            </div>
            <div class="scale-content">
                <h3 class="scale-title">{{scaleInfoVo.title}}</h3>
                <el-button size="small" type="success" round>{{scaleInfoVo.oneClassify}}</el-button>
                <el-button size="small" type="primary" round>{{scaleInfoVo.twoClassify}}</el-button>
                <div class="description"> {{scaleInfoVo.description}}
                </div>
                <div class="price">
                    <span class="free" v-show="scaleInfoVo.price == 0">免费</span>
                    <span class="pay" v-show="scaleInfoVo.price != 0">售价 ：{{scaleInfoVo.price | getPrice}}</span>
                </div>
                <div class="scale-btn">
                    <el-button size="small" type="primary" icon="el-icon-edit" @click="clickUpdate">修改</el-button>
                    <el-button size="small" type="danger" icon="el-icon-delete" @click="clickDelete">撤销</el-button>
                    <el-button size="small" type="success" icon="el-icon-share" @click="clickSend">确认</el-button>
                </div>
            </div>
        </div>

    </div>

</template>

<script>
import scaleApi from '@/api/edu/scale'
import { mapGetters } from 'vuex'

export default {
    computed: {
    ...mapGetters([
        'id'
      ])
    },
    data() {
        return {
            scaleInfoVo: {}
        }
    },
    created() {
        this.init()
    },
    methods: {
        getScaleInfoVo(id) {
            scaleApi.getScaleInfoVo(id)
                .then(response => {
                    this.scaleInfoVo = response.data.scaleInfoVo
                })
                .catch(error => {
                    this.$message({
                        type: "error",
                        message: "请求失败!",
                    });
                    console.log(error)
                })
        },
        init() {
            const id = this.$route.params.id
            this.getScaleInfoVo(id)
        },
        clickUpdate() {
            const id = this.$route.params.id
            this.$router.push({path: '/scale/edit/' + id})
        },
        clickDelete() {
            const id = this.$route.params.id
            scaleApi.delScale(id)
                .then(response => {
                    this.$message({
                        type: "success",
                        message: "量表删除成功!",
                    });
                })
                .catch(error => {
                    this.$message({
                        type: "error",
                        message: "信息删除失败!",
                    });
                    console.log(error)
                })
        },
        clickSend() {
            const id = this.$route.params.id
            scaleApi.confirmScaleInfo(id)
                .then(response => {
                    this.$message({
                        type: "success",
                        message: "信息确认成功!",
                    });
                })
                .catch(error => {
                    this.$message({
                        type: "error",
                        message: "信息确认失败!",
                    });
                    console.log(error)
                })
        }
    },
    filters: {
        getPrice(price) {
            if(price != 0) {

                return '¥' + Number(price).toFixed(2)
            }
        },
        getDescription(description) {
            return description.slice(0,200) + '...'
        }
    }
}
</script>

<style scoped>

.scale-send {
    width: 500px;
    height: 300px;
    margin: 0 auto;
    border-radius: 20px;
    position: relative;
    box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.2);
    display: flex;
    margin-top: 20px;
}

.profile-img {
    width: 200px;
    height: 200px;
    margin-left: -40px;
    border-radius: 10px;
    transform: translateY(26%);
    box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.2);
}

.profile-img img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.2);
}

.scale-content {
    margin: 0 auto;
    width: 280px;
}

.scale-title {
    text-align: center;
}

.description {
    font-size: 14px;
    color: #8b8b8b;
    margin: 20px auto;
    line-height: 20px;
    text-align: left;
    overflow: hidden;
    -webkit-line-clamp: 3;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    display: -webkit-box;
}

.price {
    transform: translateX(60%);
    color: white;
    font-weight: 600;
    letter-spacing: 2px;
}

.price .free {
    background-color: rgb(70, 194, 21);
    width: 60px;
    text-align: center;
    line-height: 30px;
    
    height: 30px;
    border-radius: 5px;
    display: block;
    display: none;
}

.price .pay {
    color: red;
}

.scale-btn {
    margin: 20px 0;
}

.back {
    color: #1989fa;
    font-size: 16px;
    font-weight: 600;
    margin-left: 20px;
}

</style>