<template>
  <el-card class="box-card">

    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="defName" label="标题">
      </el-table-column>
      <el-table-column prop="subject" label="流程">
      </el-table-column>
      <el-table-column prop="status" label="流程状态">
      </el-table-column>
      <el-table-column prop="createTime" label="发起时间">
      </el-table-column>
      <el-table-column prop="creator" label="创建人">
      </el-table-column>
      <el-table-column prop="updateTime" label="完成时间">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="click(scope.row.id);" type="primary">详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <flow-dialog @reload="load" :src="src" ref="flowDialog"></flow-dialog>
  </el-card>
</template>
<script>
  import Vue from 'vue'
  import {
    applyTaskList
  } from '@/bpm/api/myFlow'
  import flowDialog from '@/bpm/views/myFlow/flowDialog'

  export default {
    name: 'apply-history',
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
        applyTaskList({
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
        this.src = "/instanceDetail.html?id=" + id;
        this.$refs.flowDialog.visible = true;
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>