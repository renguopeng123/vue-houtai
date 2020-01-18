<template>
  <div>
    <placeholder-panel></placeholder-panel>
    <defaultValue-panel></defaultValue-panel>
    <el-form-item>
      <save-button></save-button>
    </el-form-item>
  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  import placeholderPanel from './placeholder'
  import defaultValuePanel from './defaultValue'
  import saveButton from './saveButton'

  export default {
    name: 'file-panel',
    components: {
      placeholderPanel,
      defaultValuePanel,
      saveButton
    },
    data() {
      return {}
    },
    methods: {}
  }
</script>

<style lang="scss" scoped>
</style>