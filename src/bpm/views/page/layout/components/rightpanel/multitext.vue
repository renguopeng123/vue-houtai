<template>
  <div>
    <placeholder-panel></placeholder-panel>
    <defaultValue-panel></defaultValue-panel>
    <el-form-item label="宽：">
      <el-input v-model="componentPanel.ewidth"></el-input>
    </el-form-item>
    <el-form-item label="高：">
      <el-input v-model="componentPanel.eheight"></el-input>
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
    name: 'multitext-panel',
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