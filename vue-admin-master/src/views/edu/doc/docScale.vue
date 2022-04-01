<template>
  
    <div id="list">

        <!--查询表单-->

        <el-form :inline="true" class="demo-form-inline" style="margin-top: 20px; margin-left: 20px">

            <el-form-item>

                <el-select v-model="docScaleQuery.warningLevel" clearable placeholder="预警等级">

                <el-option :value="0" label="正常"/>

                <el-option :value="1" label="一级预警"/>

                <el-option :value="2" label="二级预警"/>

                <el-option :value="3" label="三级预警"/>

                </el-select>

            </el-form-item>

            <el-form-item label="添加时间">

                <el-date-picker

                v-model="docScaleQuery.start"

                type="datetime"

                placeholder="选择开始时间"

                value-format="yyyy-MM-dd HH:mm:ss"

                default-time="00:00:00"

                />

            </el-form-item>

            <el-form-item>

                <el-date-picker

                v-model="docScaleQuery.end"

                type="datetime"

                placeholder="选择截止时间"

                value-format="yyyy-MM-dd HH:mm:ss"

                default-time="00:00:00"

                />

            </el-form-item>

            <el-button type="primary" icon="el-icon-search" @click="getPageDocScaleFactor()">查询</el-button>

            <el-button type="default" @click="resetData()">清空</el-button>

            </el-form>
            <!-- 表格 -->

            <el-table :data="list" element-loading-text="数据加载中" border fit highlight-current-row>

            <el-table-column label="序号" width="70" align="center">

                <template slot-scope="scope">

                {{ (current - 1) * limit + scope.$index + 1 }}

                </template>

            </el-table-column>

            <el-table-column prop="title" label="量表名" width="80" />

            <el-table-column label="用户昵称" width="80" prop="nickName"/>

            <el-table-column prop="mobile" label="用户手机号" />

            <el-table-column prop="sex" label="性别"  :formatter="getSex"/>

            <el-table-column prop="appraisalResult" label="评估结果" />

            <el-table-column label="预警等级" align="center">

                <template slot-scope="scope">

                <el-button type="success" v-if="scope.row.warningLevel === 0" size="medium">{{scope.row.warningLevel | getWarningLevel}}</el-button>

                <el-button type="info" v-if="scope.row.warningLevel === 1" size="medium">{{scope.row.warningLevel | getWarningLevel}}</el-button>

                <el-button type="warning" v-if="scope.row.warningLevel === 2" size="medium">{{scope.row.warningLevel | getWarningLevel}}</el-button>

                <el-button type="danger" v-if="scope.row.warningLevel === 3" size="medium">{{scope.row.warningLevel | getWarningLevel}}</el-button>

                </template>

            </el-table-column>

            <el-table-column prop="gmtCreate" label="添加时间" width="160"/>

            <!-- <el-table-column prop="sort" label="排序" width="60" :min='0' /> -->

            <el-table-column label="操作" width="200" align="center">

                <template slot-scope="scope">

                <el-button type="primary" size="mini" icon="el-icon-edit" >跟踪</el-button>

                <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>

                </template>

            </el-table-column>

            </el-table>

            <!-- 分页 -->

        <el-pagination :current-page="current" :page-size="limit" :total="total"

        style="padding: 30px 0; text-align: center;"

        layout="total, prev, pager, next, jumper"

        @current-change="getPageDocScaleFactor"

        />

    </div>

</template>

<script>
import docScaleApi from '@/api/edu/docScale'


export default {

    data() {
        return {
            list: [],
            current: 1,
            limit: 5,
            total: 0,
            docScaleQuery: {}
        }
    },
    created() {
        this.init()
    },
    mounted() {

    },
    methods: {
        init() {
            this.getPageDocScaleFactor()
        },
        resetData() {

            this.docScaleQuery = {}
            this.getPageDocScaleFactor()
        },
        getPageDocScaleFactor(current = 1) {
            this.current = current
            docScaleApi.pageDocScaleFactor(this.current, this.limit, this.docScaleQuery)
                .then(response => {
                    this.list = response.data.docScaleList
                    console.log(this.list)
                    this.total = response.data.total
                })
        },
        getSex(row, column) {

            if(row.sex === 1) {

                return '男'
            } else {

                return '女'
            }
        },
        delDocScale(id) {
            docScaleApi.delDocScale(id)
                .then(response => {

                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                })
        },
        removeDataById(id) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {

                this.delDocScale(id)
            }).catch(error =>{
                
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        }
    },
    filters: {
        getWarningLevel(warningLevel) {

            if(warningLevel === 0) {

                return '情况正常'
            } else if(warningLevel === 1) {

                return '一级预警'
            } else if(warningLevel === 2) {

                return '二级预警'
            } else if(warningLevel === 3) {

                return '三级预警'
            } 
        }
    }

}
</script>

<style>

</style>