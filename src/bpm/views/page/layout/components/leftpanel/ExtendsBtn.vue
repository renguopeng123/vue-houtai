<template>
  <el-col :span="span" :offset="offset">
    <el-button @click="click" :type="type" :class="buttonClass" plain>
      <svg-icon :icon-class="icon" />
      {{buttonName}}</el-button>
  </el-col>
</template>

<script>
  export default {
    name: 'extends-btn',
    props: ["span", "offset", "buttonClass", "buttonName", "icon", "type"],
    data() {
      return {}
    },
    methods: {
      click() {
        this.$message("敬请期待");
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>