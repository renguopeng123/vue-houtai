<template>

  <!--配置项可以修改-->
  <el-form-item label="占位符：">
    <el-input v-model="componentPanel.placeholderText">
    </el-input>
  </el-form-item>

</template>

<script>
  import {
    mapGetters
  } from 'vuex'

  export default {
    name: 'placeholder-panel',
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