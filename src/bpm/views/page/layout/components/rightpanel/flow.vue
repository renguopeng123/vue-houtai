<template>
  <div class="flow-panel attribute-panel">
    <el-form size="mini" label-width="70px">

      <el-form-item label="流程ID：">
        <el-input placeholder="流程ID" v-model="flow.ids" :disabled="true" class="sub-input"></el-input>
      </el-form-item>
      <el-form-item label="流程名称：">
        <el-input placeholder="流程名称" v-model="flow.names" :disabled="true" class="sub-input"></el-input>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'flow-panel',
    data() {
      return {
        flow: {
          names: "名称列表",
          ids: "id列表"
        }
      }
    },
    computed: {},
    methods: {}
  }
</script>

<style lang="scss" scoped>
  .flow-panel {
    padding: 10px;
    font-size: 12px;
  }
</style>