<template>
  
    <div id="list">

        <!--查询表单-->

        <el-form :inline="true" class="demo-form-inline" style="margin-top: 20px; margin-left: 20px">

            <el-form-item>

                <el-input v-model="carouselQuery.title" placeholder="轮播标题"/>

            </el-form-item>

            <el-form-item>

                <el-select v-model="carouselQuery.status" clearable placeholder="发布状态">

                <el-option value="Draft" label="待审核"/>

                <el-option value="Normal" label="已发布"/>

                </el-select>

            </el-form-item>

            <el-form-item label="添加时间">

                <el-date-picker

                v-model="carouselQuery.start"

                type="datetime"

                placeholder="选择开始时间"

                value-format="yyyy-MM-dd HH:mm:ss"

                default-time="00:00:00"

                />

            </el-form-item>

            <el-form-item>

                <el-date-picker

                v-model="carouselQuery.end"

                type="datetime"

                placeholder="选择截止时间"

                value-format="yyyy-MM-dd HH:mm:ss"

                default-time="00:00:00"

                />

            </el-form-item>

            <el-button type="primary" icon="el-icon-search" @click="pageCarousel()">查询</el-button>

            <el-button type="default" @click="resetData()">清空</el-button>

            </el-form>
            <!-- 表格 -->

            <el-table :data="rows" element-loading-text="数据加载中" border fit highlight-current-row>

            <el-table-column label="序号" width="70" align="center">

                <template slot-scope="scope">

                {{ (current - 1) * limit + scope.$index + 1 }}

                </template>

            </el-table-column>

            <el-table-column prop="title" label="轮播标题" />

            <el-table-column label="图片路径" prop="imgUrl"/>

            <el-table-column prop="status" label="发布状态" :formatter="getStatus"/>

            <el-table-column prop="gmtCreate" label="上传时间"/>

            <el-table-column label="操作" width="200" align="center">

                <template slot-scope="scope">

                <router-link :to="'/carousel/edit/'+scope.row.id">

                    <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>

                </router-link>

                <el-button type="danger" size="mini" icon="el-icon-delete" @click="delCarousel(scope.row.id)">删除</el-button>

                <el-button type="success" size="mini" icon="el-icon-s-promotion" @click="publishCarousel(scope.row.id)" v-if="scope.row.status == 'Draft'">发布</el-button>

                <el-button type="warning" size="mini" icon="el-icon-warning" @click="pullCarousel(scope.row.id)" v-if="scope.row.status == 'Normal'">下架</el-button>

                </template>

            </el-table-column>

            </el-table>

            <!-- 分页 -->

        <el-pagination :current-page="current" :page-size="limit" :total="total"

        style="padding: 30px 0; text-align: center;"

        layout="total, prev, pager, next, jumper"

        @current-change="pageCarousel"

        />
    </div>

</template>

<script>
import carouselApi from '@/api/edu/carousel.js'

export default {
    data() {
        return {
            limit: 6,
            current: 1,
            rows: [],
            total: 0,
            carouselQuery: {}
        }
    },
    created() {
        this.init()
    },
    methods: {
        init() {
            this.pageCarousel()
        },
        pageCarousel(current = 1) {
            this.current = current
            carouselApi.pageCarousel(this.current, this.limit, this.carouselQuery)
                .then(response => {
                    this.rows = response.data.rows
                    this.total = response.data.total 
                })
        },
        delCarousel(id) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                carouselApi.delCarousel(id)
                    .then(response => {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.pageCarousel()
                    })
            }).catch(error =>{
                
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            })
        },
        resetData() {
            this.carouselQuery = {}
            this.pageCarousel()
        },
        getStatus(row, column) {

            if(row.status === "Draft") {

                return '待审核'
            } else if(row.status === "Normal") {

                return '已发布'
            } 
        },
        pullCarousel(id) {
            this.$confirm('此操作将下架该轮播, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                carouselApi.pullCarousel(id)
                    .then(response => {
                        this.$message({
                                type: 'success',
                                message: '下架成功!'
                            });
                        this.pageCarousel()
                    }) 
            }).catch(error =>{
                
                this.$message({
                    type: 'info',
                    message: '已取消下架'
                });          
            })
        },
        publishCarousel(id) {
            carouselApi.publishCarousel(id)
                .then(response => {
                    this.$message({
                        type: 'success',
                        message: '发布成功!'
                    });
                    this.pageCarousel()
                }) 
        }
    },
    watch: {
        $route(to, from) {
            this.init()
        },
    },
}
</script>

<style>

</style>