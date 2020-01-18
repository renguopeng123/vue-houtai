<template>
  <div>
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
  import defaultValuePanel from './defaultValue'
  import saveButton from './saveButton'

  export default {
    name: 'hidden-panel',
    components: {
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