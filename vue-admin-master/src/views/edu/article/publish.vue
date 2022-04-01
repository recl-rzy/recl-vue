<template>
  
    <div id="list">

        <!--查询表单-->

        <el-form :inline="true" class="demo-form-inline" style="margin-top: 20px; margin-left: 20px">

            <el-form-item>

                <el-input v-model="articleQuery.title" placeholder="文章标题"/>

            </el-form-item>


            <el-form-item>

                <el-select v-model="articleQuery.articleClassify" clearable placeholder="文章分类">

                <el-option :value="item.classifyTitle" 
                :label="item.classifyTitle" 
                :key="item.id"
                v-for="item in classifies" 
                />

                </el-select>

            </el-form-item>

            <el-form-item label="提交时间">

                <el-date-picker

                v-model="articleQuery.gmtCreate"

                type="datetime"

                placeholder="选择开始时间"

                value-format="yyyy-MM-dd HH:mm:ss"

                default-time="00:00:00"

                />

            </el-form-item>

            <el-form-item>

                <el-date-picker

                v-model="articleQuery.gmtModified"

                type="datetime"

                placeholder="选择结束时间"

                value-format="yyyy-MM-dd HH:mm:ss"

                default-time="00:00:00"

                />

            </el-form-item>

            <el-button type="primary" icon="el-icon-search" @click="getArticleListPage()">查询</el-button>

            <el-button type="default" @click="resetData()">清空</el-button>

            </el-form>
            <!-- 表格 -->

            <el-table :data="list" element-loading-text="数据加载中" border fit highlight-current-row>

            <el-table-column label="序号" width="70" align="center">

                <template slot-scope="scope">

                {{ (page - 1) * limit + scope.$index + 1 }}

                </template>

            </el-table-column>

            <el-table-column prop="title" label="文章标题" width="80" />

            <el-table-column label="文章分类" width="80" prop="articleClassify" />

            <el-table-column prop="viewCount" label="访问数量" />

            <el-table-column prop="oneTag" label="标签1" />

            <el-table-column prop="twoTag" label="标签2" />

            <el-table-column prop="ThreeTag" label="标签3" />

            <el-table-column prop="gmtCreate" label="提交时间" width="160"/>

            <el-table-column prop="gmtModified" label="更新时间" width="160"/>

            <el-table-column label="操作" width="200" align="center">

                <template slot-scope="scope">

                <el-button type="success" size="mini" icon="el-icon-share" @click="checkDataById(scope.row.id)">发布</el-button>

                <router-link :to="'/article/update/'+scope.row.id">

                    <el-button type="primary" size="mini" icon="el-icon-edit">查看</el-button>

                </router-link>


                </template>

            </el-table-column>

            </el-table>

            <!-- 分页 -->

        <el-pagination :current-page="page" :page-size="limit" :total="total"

        style="padding: 30px 0; text-align: center;"

        layout="total, prev, pager, next, jumper"

        @current-change="getArticleListPage"

        />
    </div>

</template>

<script>
import articleApi from '@/api/edu/article'

export default {

    data() {
        return {
            list: [],
            page: 1,
            limit: 10,
            total: 0,
            articleQuery: {},
            classifies: []
        }
    },
    created() {
        this.getArticleListPage()
        this.getArticleClassifies()
    },
    methods: {
        getArticleListPage(page = 1) {       //获取分页信息

            this.page = page                   //默认页数为1
            articleApi.getCheckArticleListPage(this.articleQuery,this.page,this.limit)
                .then(response => {               //请求成功数据处理
                    this.list = response.data.rows
                    this.total = response.data.total
                    console.log(this.list)
                    console.log(this.total)
                })
                .catch(error => {console.log(error)}) //请求失败打印错误信息
        },
        resetData() {

            this.articleQuery = {}
            this.getCheckArticleListPage()
        },
        checkDataById(id) {

          articleApi.publishArticle(id)
            .then(response =>{
                this.$message({
                  type: 'success',
                  message: '发布成功!'
              })
              this.getArticleListPage()
            })
            .catch(error =>{
              this.$message({
                  type: 'error',
                  message: '发布失败!'
              })
            });
          
        },
        getArticleClassifies() {
        //获取所有的文章分类名称
        articleApi.getAllArticleClassify()
          .then(response =>{
            this.classifies = response.data.classifies
          })
          .catch(error =>{
            this.$message({
                type: 'error',
                 message: '分类获取失败!'
            });
          })
      } 
    }
}
</script>

<style>

</style>