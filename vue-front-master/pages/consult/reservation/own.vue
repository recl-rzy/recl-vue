<template>
    
    <div class="own">

        <CommNav :userInfo="userInfo"/>

        <el-form :inline="true" class="demo-form-inline" style="margin-top: 20px; margin-left: 20px">

            <el-form-item>

                <el-input v-model="reserQuery.userName" placeholder="预约用户姓名"/>

            </el-form-item>

            <el-form-item>

                <el-input v-model="reserQuery.mobile" placeholder="预约用户手机号"/>

            </el-form-item>

            <el-form-item>

                <el-select v-model="reserQuery.level" clearable placeholder="咨询方式">

                <el-option :value="0" label="聊天咨询"/>

                <el-option :value="1" label="电话咨询"/>

                <el-option :value="2" label="线下咨询"/>

                </el-select>

            </el-form-item>

            <el-form-item>

                <el-select v-model="reserQuery.direction" clearable placeholder="擅长方向2">

                <el-option  :value="0" label="人际交往"/>

                <el-option  :value="1" label="家庭关系"/>

                <el-option  :value="2" label="职场竞争"/>

                <el-option  :value="3" label="情感恋爱"/>

                <el-option  :value="4" label="情绪管理"/>

                <el-option  :value="5" label="心理治疗"/>

                </el-select>

            </el-form-item>

            <el-form-item>

                <el-select v-model="reserQuery.previous" clearable placeholder="曾接收心理治疗">

                <el-option :value="0" label="否"/>

                <el-option :value="1" label="是"/>

                </el-select>

            </el-form-item>

            <el-form-item>

                <el-select v-model="reserQuery.dealResult" clearable placeholder="处理结果">

                <el-option value="Draft" label="未咨询"/>

                <el-option value="Normal" label="已咨询"/>

                </el-select>

            </el-form-item>

            <el-form-item label="预约时间">

                <el-date-picker

                v-model="reserQuery.start"

                type="datetime"

                placeholder="选择开始时间"

                value-format="yyyy-MM-dd HH:mm:ss"

                default-time="00:00:00"

                />

            </el-form-item>

            <el-form-item>

                <el-date-picker

                v-model="reserQuery.end"

                type="datetime"

                placeholder="选择截止时间"

                value-format="yyyy-MM-dd HH:mm:ss"

                default-time="00:00:00"

                />

            </el-form-item>

            <el-button type="primary" icon="el-icon-search" @click="getReservationList()">查询</el-button>

            <el-button type="default" @click="resetData()">清空</el-button>

            </el-form>
            <!-- 表格 -->

            <el-table :data="list" element-loading-text="数据加载中" border fit highlight-current-row>

            <el-table-column label="序号" width="70" align="center">

                <template slot-scope="scope">

                {{ (current - 1) * limit + scope.$index + 1 }}

                </template>

            </el-table-column>

            <el-table-column prop="userName" label="预约用户姓名"/>

            <el-table-column label="联系电话" prop="mobile"/>

            <el-table-column prop="method" label="咨询方式" :formatter="getMethod"/>

            <el-table-column prop="direction" label="咨询方向" :formatter="getDirection"/>

            <el-table-column prop="previous" label="曾接受治疗" :formatter="getPrevious"/>

            <el-table-column prop="remark" label="备注" />

            <el-table-column prop="gmtCreate" label="预约发起时间" width="160"/>

            <el-table-column label="当前状态" width="200" align="center">

                <template slot-scope="scope">

                <el-button type="success" v-if="scope.row.dealResult == 'Normal'">已完成</el-button>

                <el-button type="warning" v-if="scope.row.dealResult == 'Observed'">待跟踪</el-button>

                <el-button type="danger" v-if="scope.row.dealResult == 'Draft'">未咨询</el-button>

                </template>

            </el-table-column>

            <!-- <el-table-column prop="sort" label="排序" width="60" :min='0' /> -->

            <el-table-column label="操作" width="200" align="center">

                <template slot-scope="scope">

                <el-button type="primary" size="mini" icon="el-icon-edit" @click="applyForChat(scope.row.reservationUserId)">咨询</el-button>

                <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>

                </template>

            </el-table-column>

            </el-table>

            <!-- 分页 -->

        <el-pagination :current-page="current" :page-size="limit" :total="total"

        style="padding: 30px 0; text-align: center;"

        layout="total, prev, pager, next, jumper"

        @current-change="getReservationList"

        />
    </div>

</template>

<script>
import CommNav from '@/components/common/CommNav.vue'
import cookie from 'js-cookie'
import reserApi from '@/api/reservation.js'

export default {
    components: {
        CommNav
    },
    data() {
        return {
            userInfo: {},
            list: [],
            current: 1,
            limit: 10,
            total: 0,
            reserQuery: {},
        }
    },
    created() {
        this.init()
    },
    methods: {
        init() {
            this.getUserInfoByCookie()
            this.getReservationList()
        },
        getUserInfoByCookie() {
        
            var userInfoStr = cookie.get('recl_ucenter')
            if(userInfoStr) {
                //将用户信息字符串转json对象
                this.userInfo = JSON.parse(userInfoStr)
            } else {
                this.$router.push({path: '/login'})
            }
        },
        removeDataById(id) {

            this.$confirm('此操作将永久删除该条信息, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {

                // listenerApi.deleteListenerById(id)
                //  .then(response =>{
                //     this.$message({
                //         type: 'success',
                //         message: '删除成功!'
                //     });
                //     this.getListenerListPage()
                //  })
            }).catch(error =>{
                
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        resetData() {
            this.reserQuery = {}
            this.getReservationList()
        },
        getReservationList(current = 1) {

            this.current = current
            let id = ''
            if(this.userInfo.isCounselor) id = this.userInfo.counselorId
            else id = this.userInfo.listenerId
            reserApi.pageOwnReservation(id, this.current, this.limit, this.reserQuery)
                .then(response => {
                    this.list = response.data.data.list
                    this.total = response.data.data.total
                })
        },
        applyForChat(id) {

        },
        getMethod(row) {
            if(row.method == 0) return '聊天咨询'

            if(row.method == 1) return '电话咨询'

            if(row.method == 2) return '线下咨询'
        },
        getDirection(row) {
            if(row.direction == 0) return '人际交往'

            if(row.direction == 1) return '家庭关系'

            if(row.direction == 2) return '职场竞争'

            if(row.direction == 3) return '情感恋爱'

            if(row.direction == 4) return '情绪管理'

            if(row.direction == 5) return '心理治疗'
        },
        getPrevious(row) {
            if(row.previous == 1) return '是'
        
            if(row.previous == 0) return '否'
        },
        getStatus(row) {
            if(row.dealResult == 'Draft') return '未咨询'
            
            if(row.dealResult == 'Normal') return '已咨询'

            if(row.dealResult == 'Observed') return '待观察'
        } 
    },
    filters: {
        
    }
}
</script>

<style scoped>

</style>