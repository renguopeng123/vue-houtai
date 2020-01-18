<template>

  <!--默认值是后台一并判断的 这里修改不起作用-->
  <el-form-item style="display:none" label="默认值：">
    <el-input v-model="componentPanel.defaultValue">
    </el-input>
  </el-form-item>

</template>

<script>
  import {
    mapGetters
  } from 'vuex'

  export default {
    name: 'defaultValue-panel',
    computed: {
      ...mapGetters([
       "componentPanel"
      ])
    },
    data() {
      return {}
    },
    methods: {
    }
  }
</script>

<style lang="scss" scoped>
</style>