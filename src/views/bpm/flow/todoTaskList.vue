<template>
  <el-card class="box-card">

    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="subject" label="任务标题">
      </el-table-column>
      <el-table-column prop="name" label="任务名称">
      </el-table-column>
      <el-table-column prop="creator" label="创建人">
      </el-table-column>
      <el-table-column prop="taskType" label="类型">
      </el-table-column>
      <el-table-column prop="status" label="状态">
      </el-table-column>
      <el-table-column prop="createTime" label="任务创建时间">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="click(scope.row.id);" type="primary">办理</el-button>
        </template>
      </el-table-column>
    </el-table>

    <flow-dialog @reload="load" :src="src" ref="flowDialog"></flow-dialog>
  </el-card>
</template>
<script>
  import Vue from 'vue'
  import {
    todoTaskList
  } from '@/bpm/api/myFlow'
  import flowDialog from '@/bpm/views/myFlow/flowDialog'

  export default {
    name: 'todo-task-list',
    components: {
      flowDialog
    },

    data() {
      return {
        tableData: [],
        src: ""
      }
    },
    mounted() {},

    created() {
      this.load();
    },

    methods: {

      load() {
        todoTaskList({
          offset: 0,
          limit: 100,
          sort: "",
          order: ""
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

      click(id) {
        this.src = "/taskComplete.html?id=" + id;
        this.$refs.flowDialog.visible = true;
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>