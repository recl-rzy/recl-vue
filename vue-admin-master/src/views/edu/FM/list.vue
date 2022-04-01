<template>
  
    <div id="list">

        <!--查询表单-->

        <el-form :inline="true" class="demo-form-inline" style="margin-top: 20px; margin-left: 20px">

            <el-form-item>

                <el-input v-model="musicQuery.title" placeholder="音频标题"/>

            </el-form-item>

            <el-form-item>

                <el-select v-model="musicQuery.musicMood" clearable placeholder="心情">

                <el-option :label="item" :value="item" v-for="(item,index) in moodOptions" :key="index"></el-option>

                </el-select>

            </el-form-item>

            <el-form-item>

                <el-select v-model="musicQuery.status" clearable placeholder="发布情况">

                <el-option label="待审核" value="Draft"></el-option>

                <el-option label="已发布" value="Normal"></el-option>

                </el-select>

            </el-form-item>


            <el-form-item label="提交时间">

                <el-date-picker

                v-model="musicQuery.gmtCreate"

                type="datetime"

                placeholder="选择开始时间"

                value-format="yyyy-MM-dd HH:mm:ss"

                default-time="00:00:00"

                />

            </el-form-item>

            <el-form-item>

                <el-date-picker

                v-model="musicQuery.gmtModified"

                type="datetime"

                placeholder="选择结束时间"

                value-format="yyyy-MM-dd HH:mm:ss"

                default-time="00:00:00"

                />

            </el-form-item>

            <el-button type="primary" icon="el-icon-search" @click="getMusicListPage()">查询</el-button>

            <el-button type="default" @click="resetData()">清空</el-button>

            </el-form>
            <!-- 表格 -->

            <el-table :data="list" element-loading-text="数据加载中" border fit highlight-current-row>

            <el-table-column label="序号" width="70" align="center">

                <template slot-scope="scope">

                {{ (page - 1) * limit + scope.$index + 1 }}

                </template>

            </el-table-column>

            <el-table-column prop="title" label="音频标题" width="80" />

            <el-table-column prop="musicMood" label="心情" />

            <el-table-column prop="sign" label="个性签名" />

            <el-table-column prop="viewCount" label="访问数量" />

            <el-table-column prop="status" label="发布情况" :formatter="getStatus"/>

            <el-table-column prop="gmtCreate" label="提交时间" width="160"/>

            <el-table-column prop="gmtModified" label="更新时间" width="160"/>

            <el-table-column label="操作" width="200" align="center">

                <template slot-scope="scope">

                <router-link :to="'/FM/edit/'+scope.row.id">

                    <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>

                </router-link>

                <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>
                <el-button type="success" size="mini" icon="el-icon-share" @click="publishById(scope.row.id)" v-show="scope.row.status === 'Draft'">发布</el-button>

                </template>

            </el-table-column>

            </el-table>

            <!-- 分页 -->

        <el-pagination :current-page="page" :page-size="limit" :total="total"

        style="padding: 30px 0; text-align: center;"

        layout="total, prev, pager, next, jumper"

        @current-change="getMusicListPage"

        />
    </div>

</template>

<script>
import musicApi from '@/api/edu/music'

export default {

    data() {
        return {
            list: [],
            page: 1,
            limit: 5,
            total: 0,
            musicQuery: {},
            moodOptions: ['快乐','烦躁','悲伤','孤独','已弃疗','减压','无奈','感动','迷茫']
        }
    },
    created() {
        this.getMusicListPage()
    },
    methods: {
        getMusicListPage(page = 1) {       //获取分页信息

            this.page = page                   //默认页数为1
            musicApi.getMusicListPage(this.musicQuery,this.page,this.limit)
                .then(response => {               //请求成功数据处理
                    this.list = response.data.rows
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
            } 
        },
        resetData() {

            this.musicQuery = {}
            this.getMusicListPage()
        },
        publishById(id) {
            musicApi.publishMusic(id)
                .then(response => {
                    this.$message({
                        type: 'success',
                        message: '发布成功!'
                    });
                    this.getMusicListPage()
                })
        },
        removeDataById(id) {

            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {

                musicApi.delMusic(id)
                 .then(response =>{
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.getMusicListPage()
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