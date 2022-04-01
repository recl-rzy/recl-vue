<template>
  <div class="app-container">
    <el-input v-model="filterText" placeholder="Filter keyword" style="margin-bottom:30px;" />

    <el-tree
      ref="tree2"
      :data="data2"
      :props="defaultProps"
      :filter-node-method="filterNode"
      class="filter-tree"
      default-expand-all
    />

  </div>
</template>

<script>
import classifyApi from '@/api/edu/classify'

export default {

  created() {
      this.getClassifyInfo()
  },
  data() {
    return {
      filterText: '',
      data2: [],
      defaultProps: {
          children: 'twoClassifies',
          label: 'title'
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
    }
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    getClassifyInfo() {
        classifyApi.getAllClassifyInfo()
            .then(response =>{
                this.data2 = response.data.classify
        })
    }
  }
}
</script>

