<template>
  <div>
    <placeholder-panel></placeholder-panel>
    <defaultValue-panel></defaultValue-panel>
    <el-form-item label="日期格式：">
      <el-input v-model="componentPanel.format"></el-input>
    </el-form-item>
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
  import {
    getConfig
  } from '@/bpm/views/page/function'

  export default {
    name: 'date-panel',
    components: {
      placeholderPanel,
      defaultValuePanel,
      saveButton
    },
    computed: {
      ...mapGetters([
        "componentPanel"
      ])
    },
    data() {
      return {}
    },
    methods: {}
  }
</script>


<style lang="scss" scoped>
</style>