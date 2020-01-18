<template>
  <div>
    <placeholder-panel></placeholder-panel>
    <defaultValue-panel></defaultValue-panel>
    <el-form-item label="规则：">
      <el-select v-model="componentPanel.alias" placeholder="请选择">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
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
    name: 'serialno-panel',
    computed: {
      ...mapGetters([
        "componentPanel"
      ])
    },
    components: {
      placeholderPanel,
      defaultValuePanel,
      saveButton
    },
    data() {
      return {
        options: [{
          value: 'dayNo',
          label: '每天使用一组流水号'
        }, {
          value: 'dzlsh',
          label: '递增流水号'
        }]
      }
    },
    methods: {}
  }
</script>


<style lang="scss" scoped>
</style>