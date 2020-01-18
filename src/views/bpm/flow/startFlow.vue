<template>
  <el-card class="box-card">

    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="name" label="名称">
      </el-table-column>
      <el-table-column prop="key" label="KEY">
      </el-table-column>
      <el-table-column prop="status" label="状态">
      </el-table-column>
      <el-table-column prop="version" label="版本">
      </el-table-column>
      <el-table-column prop="desc" label="描述">
      </el-table-column>
      <el-table-column label="管理">
        <template slot-scope="scope">
          <el-button size="mini" @click="click(scope.row.id);" type="primary">启动</el-button>
        </template>
      </el-table-column>
    </el-table>

    <flow-dialog @reload="load" :src="src" ref="flowDialog"></flow-dialog>
  </el-card>
</template>
<script>
  import Vue from 'vue'
  import {
    definitionList
  } from '@/bpm/api/myFlow'
  import flowDialog from '@/bpm/views/myFlow/flowDialog'

  export default {
    name: 'start-flow',
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
        definitionList({
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
        this.src = "/start.html?id=" + id;
        this.$refs.flowDialog.visible = true;
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>