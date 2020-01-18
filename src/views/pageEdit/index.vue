<template>
  <div class="page-edit">

    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="key" label="别名">
      </el-table-column>
      <el-table-column prop="name" label="名称">
      </el-table-column>
      <el-table-column prop="groupName" label="分组">
      </el-table-column>
      <el-table-column prop="boKey" label="业务对象别名">
      </el-table-column>
      <el-table-column prop="boName" label="业务对象名称">
      </el-table-column>
      <el-table-column label="管理">
        <template slot-scope="scope">
          <el-link :href="href(scope.row.id)" target="_blank" type="primary">打开编辑器</el-link>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
  import {
    formDefListJson
  } from '@/bpm/api/page'

  export default {
    name: 'pageEdit',
    data() {
      return {
        tableData: []
      }
    },
    created() {

      formDefListJson({
        "formType": "pc_iview"
      }).then(response => {
        this.tableData = response.rows;
      }).catch(error => {

        this.$message({
          message: '加载列表错误' + error,
          type: 'error'
        })

        console.error(error);
      })

    },
    methods: {
      href(pageID) {
        return "/page.html?id=" + pageID;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .page-edit {
    margin: 10px 20px 0;
    overflow: auto;
  }
</style>