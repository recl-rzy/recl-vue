<template>
  
    <div id="list">

        <!--查询表单-->

        <el-form :inline="true" class="demo-form-inline" style="margin-top: 20px; margin-left: 20px">

            <el-form-item>

                <el-input v-model="coverQuery.title" placeholder="背景标题"/>

            </el-form-item>

            <el-form-item label="提交时间">

                <el-date-picker

                v-model="coverQuery.gmtCreate"

                type="datetime"

                placeholder="选择开始时间"

                value-format="yyyy-MM-dd HH:mm:ss"

                default-time="00:00:00"

                />

            </el-form-item>

            <el-form-item>

                <el-date-picker

                v-model="coverQuery.gmtModified"

                type="datetime"

                placeholder="选择结束时间"

                value-format="yyyy-MM-dd HH:mm:ss"

                default-time="00:00:00"

                />

            </el-form-item>

            <el-button type="primary" icon="el-icon-search" @click="getCoverListPage()">查询</el-button>

            <el-button type="default" @click="resetData()">清空</el-button>

            <router-link :to="'/FM/cover'">

                    <el-button type="success" icon="el-icon-share">添加</el-button>

            </router-link>

            </el-form>
            <!-- 表格 -->

            <el-table :data="list" element-loading-text="数据加载中" border fit highlight-current-row>

            <el-table-column label="序号" width="70" align="center">

                <template slot-scope="scope">

                {{ (current - 1) * limit + scope.$index + 1 }}

                </template>

            </el-table-column>

            <el-table-column prop="title" label="音频标题" width="80" />

            <el-table-column label="背景图片路径" >
                <template slot-scope="scope">
                    <a :href="scope.row.imgUrl">{{scope.row.imgUrl}}</a>
                </template>
            </el-table-column>

            <el-table-column prop="gmtCreate" label="提交时间" width="160"/>

            <el-table-column prop="gmtModified" label="更新时间" width="160"/>

            <el-table-column label="操作" width="200" align="center">

                <template slot-scope="scope">

                <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>

                </template>

            </el-table-column>

            </el-table>

            <!-- 分页 -->

        <el-pagination :current-page="current" :page-size="limit" :total="total"

        style="padding: 30px 0; text-align: center;"

        layout="total, prev, pager, next, jumper"

        @current-change="getCoverListPage"

        />
    </div>

</template>

<script>
import coverApi from '@/api/edu/cover'

export default {

    data() {
        return {
            list: [],
            current: 1,
            limit: 7,
            total: 0,
            coverQuery: {},
        }
    },
    created() {
        this.getCoverListPage()
    },
    methods: {
        getCoverListPage(current = 1) {       //获取分页信息

            this.current = current                   //默认页数为1
            coverApi.pageCoverFactor(this.current,this.limit,this.coverQuery)
                .then(response => {               //请求成功数据处理
                    this.list = response.data.coverList
                    this.total = response.data.total
                    console.log(this.list)
                    console.log(this.total)
                })
                .catch(error => {console.log(error)}) //请求失败打印错误信息
        },
        resetData() {

            this.coverQuery = {}
            this.getCoverListPage()
        },

        removeDataById(id) {

            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {

                coverApi.delCover(id)
                 .then(response =>{
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.getCoverListPage()
                 })
            }).catch(error =>{
                
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        }
    }
}
</script>

<style>

</style>