<template>
  
    <div id="list">

        <!--查询表单-->

        <el-form :inline="true" class="demo-form-inline" style="margin-top: 20px; margin-left: 20px">

            <el-form-item>

                <el-input v-model="scaleQuery.title" placeholder="量表名称"/>

            </el-form-item>

            <el-form-item>

                <el-input v-model="scaleQuery.price" placeholder="价格"/>

            </el-form-item>

            <el-form-item>

                <el-input v-model="scaleQuery.viewCount" placeholder="浏览量"/>

            </el-form-item>

            <el-form-item>

                <el-select v-model="scaleQuery.classifyParentId" filterable placeholder="一级分类" @change="showTwoClassify">
                    <el-option
                    v-for="item in oneClassify"
                    :key="item.id"
                    :label="item.title"
                    :value="item.id">
                    </el-option>
                </el-select>

                <el-select v-model="scaleQuery.classifyId" filterable placeholder="二级分类">
                    <el-option
                    v-for="item in twoClassify"
                    :key="item.id"
                    :label="item.title"
                    :value="item.id">
                    </el-option>
                </el-select>

            </el-form-item>

            <el-form-item>

                <el-select v-model="scaleQuery.status" clearable placeholder="发布情况">

                <el-option label="待审核" value="Draft"></el-option>

                <el-option label="待发布" value="Draft"></el-option>

                <el-option label="已发布" value="Normal"></el-option>

                </el-select>

            </el-form-item>


            <el-form-item label="提交时间">

                <el-date-picker

                v-model="scaleQuery.gmtCreate"

                type="datetime"

                placeholder="选择开始时间"

                value-format="yyyy-MM-dd HH:mm:ss"

                default-time="00:00:00"

                />

            </el-form-item>

            <el-form-item>

                <el-date-picker

                v-model="scaleQuery.gmtModified"

                type="datetime"

                placeholder="选择结束时间"

                value-format="yyyy-MM-dd HH:mm:ss"

                default-time="00:00:00"

                />

            </el-form-item>

            <el-button type="primary" icon="el-icon-search" @click="getScaleListPage()">查询</el-button>

            <el-button type="default" @click="resetData()">清空</el-button>

            </el-form>
            <!-- 表格 -->

            <el-table :data="list" element-loading-text="数据加载中" border fit highlight-current-row>

            <el-table-column label="序号" width="70" align="center">

                <template slot-scope="scope">

                {{ (current - 1) * limit + scope.$index + 1 }}

                </template>

            </el-table-column>

            <el-table-column prop="title" label="量表标题" width="80" />

            <el-table-column prop="counselorName" label="发布咨询师" />

            <el-table-column prop="buyCount" label="购买数量" />

            <el-table-column prop="viewCount" label="访问数量" />

            <el-table-column prop="classifyParentId" label="一级分类" />

            <el-table-column prop="classifyId" label="二级分类" />

            <el-table-column prop="status" label="发布情况" :formatter="getStatus"/>

            <el-table-column prop="gmtCreate" label="提交时间" width="160"/>

            <el-table-column prop="gmtModified" label="更新时间" width="160"/>

            <el-table-column label="操作" width="200" align="center">

                <template slot-scope="scope">

                <el-button type="success" size="mini" icon="el-icon-share" @click="publishById(scope.row.id)" v-show="scope.row.status !== 'Normal'">发布</el-button>

                <router-link :to="'/scale/edit/'+scope.row.id">

                    <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>

                </router-link>

                <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>

                </template>

            </el-table-column>

            </el-table>

            <!-- 分页 -->

        <el-pagination :current-page="current" :page-size="limit" :total="total"

        style="padding: 30px 0; text-align: center;"

        layout="total, prev, pager, next, jumper"

        @current-change="getScaleListPage"

        />
    </div>

</template>

<script>
import scaleApi from '@/api/edu/scale'

export default {

    data() {
        return {
            list: [],
            current: 1,
            limit: 5,
            total: 0,
            scaleQuery: {},
            oneClassify: [],
            twoClassify: []
        }
    },
    created() {
        this.getClassifyInfo()
        this.getScaleListPage()
    },
    methods: {
        getScaleListPage(current = 1) {       //获取分页信息

            this.current = current                   //默认页数为1
            scaleApi.pageScaleFactor(this.current,this.limit,this.scaleQuery)
                .then(response => {               //请求成功数据处理
                    this.list = response.data.scaleList
                    this.total = response.data.total
                    console.log(this.list)
                    console.log(this.total)
                })
                .catch(error => {console.log(error)}) //请求失败打印错误信息
        },
        getStatus(row, column) {

            if(row.status === "Draft") {

                return '待审核'
            } else if(row.status === "Normal") {

                return '已发布'
            } else if(row.status === "Vertify") {

                return '待发布'
            }
        },
        resetData() {

            this.scaleQuery = {}
            this.getScaleListPage()
        },
        publishById(id) {
            scaleApi.publishScale(id)
                .then(response => {
                    this.$message({
                        type: 'success',
                        message: '发布成功!'
                    });
                    this.getScaleListPage()
                })
        },
        removeDataById(id) {

            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {

                scaleApi.delScale(id)
                 .then(response =>{
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.getScaleListPage()
                 })
            }).catch(error =>{
                
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
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
     
                                if(this.oneClassify[i].id == this.scaleQuery.classifyParentId) {
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
    }
}
</script>

<style>

</style>