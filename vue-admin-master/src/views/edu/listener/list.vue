<template>
    <div id="list">

        <!--查询表单-->

        <el-form :inline="true" class="demo-form-inline" style="margin-top: 20px; margin-left: 20px">

            <el-form-item>

                <el-input v-model="listenerQuery.name" placeholder="倾听师姓名"/>

            </el-form-item>

            


            <el-form-item>

                <el-select v-model="listenerQuery.level" clearable placeholder="倾听师头衔">

                <el-option :value="1" label="一级倾听师"/>

                <el-option :value="2" label="二级倾听师"/>

                <el-option :value="3" label="三级倾听师"/>

                </el-select>

            </el-form-item>

            <el-form-item>

                <el-select v-model="listenerQuery.oneClassify" clearable placeholder="擅长方向1">

                <el-option  v-for="(item,index) in oneClassify" :key="index" :value="item.oneClassify"/>

                </el-select>

            </el-form-item>

            <el-form-item>

                <el-select v-model="listenerQuery.twoClassify" clearable placeholder="擅长方向2">

                <el-option  v-for="(item,index) in twoClassify" :key="index" :value="item.twoClassify"/>

                </el-select>

            </el-form-item>

            <el-form-item label="添加时间">

                <el-date-picker

                v-model="listenerQuery.start"

                type="datetime"

                placeholder="选择开始时间"

                value-format="yyyy-MM-dd HH:mm:ss"

                default-time="00:00:00"

                />

            </el-form-item>

            <el-form-item>

                <el-date-picker

                v-model="listenerQuery.end"

                type="datetime"

                placeholder="选择截止时间"

                value-format="yyyy-MM-dd HH:mm:ss"

                default-time="00:00:00"

                />

            </el-form-item>

            <el-button type="primary" icon="el-icon-search" @click="getListenerListPage()">查询</el-button>

            <el-button type="default" @click="resetData()">清空</el-button>

            </el-form>
            <!-- 表格 -->

            <el-table :data="list" element-loading-text="数据加载中" border fit highlight-current-row>

            <el-table-column label="序号" width="70" align="center">

                <template slot-scope="scope">

                {{ (page - 1) * limit + scope.$index + 1 }}

                </template>

            </el-table-column>

            <el-table-column prop="name" label="名称" width="80" />

            <el-table-column label="头衔" width="80" prop="level" :formatter="getLevel" />

            <el-table-column prop="oneClassify" label="擅长方向1" />

            <el-table-column prop="twoClassify" label="擅长方向2" />

            <el-table-column prop="sign" label="签名" />

            <el-table-column prop="totalDuration" label="倾听总时长" />

            <el-table-column prop="gmtCreate" label="添加时间" width="160"/>

            <!-- <el-table-column prop="sort" label="排序" width="60" :min='0' /> -->

            <el-table-column label="操作" width="200" align="center">

                <template slot-scope="scope">

                <router-link :to="'/listener/edit/'+scope.row.id">

                    <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>

                </router-link>

                <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>

                </template>

            </el-table-column>

            </el-table>

            <!-- 分页 -->

        <el-pagination :current-page="page" :page-size="limit" :total="total"

        style="padding: 30px 0; text-align: center;"

        layout="total, prev, pager, next, jumper"

        @current-change="getListenerListPage"

        />
    </div>
</template>

<script>
import listenerApi from '@/api/edu/listener'

export default {

    data() {
        return {
            list: [],
            page: 1,
            limit: 10,
            total: 0,
            listenerQuery: {},
            oneClassify: [],
            twoClassify: []
        }
    },
    created() {

        this.init()
    },
    methods: {
        init() {

            this.getListenerListPage()
            this.getClassify()
        },
        getListenerListPage(page = 1) {       //获取分页信息

            this.page = page                   //默认页数为1
            listenerApi.getListenerListPage(this.page,this.limit,this.listenerQuery)
                .then(response => {               //请求成功数据处理
                    this.list = response.data.rows
                    this.total = response.data.total
                    console.log(this.list)
                    console.log(this.total)
                })
                .catch(error => {console.log(error)}) //请求失败打印错误信息
        },
        getClassify() {
            listenerApi.getClassify()
                .then(response => {
                    this.oneClassify = response.data.oneClassify
                    this.twoClassify = response.data.twoClassify
                })
        },
        getLevel(row, column) {

            if(row.level === 1) {

                return '一级倾听师'
            } else if(row.level === 2) {

                return '二级倾听师'
            } else if(row.level === 3) {

                return '三级倾听师'
            }
        },
        resetData() {

            this.listenerQuery = {}
            this.getListenerListPage()
        },
        removeDataById(id) {

            this.$confirm('此操作将永久删除该条信息, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {

                listenerApi.deleteListenerById(id)
                 .then(response =>{
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.getListenerListPage()
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