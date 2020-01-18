<template>
  <div>
    <el-row :gutter="data.config.gutter ? data.config.gutter : 0">
      <template v-for="item in data.list">
        <genetate-form-item :key="item.key" :widget="item" :config="data.config"/>
      </template>
    </el-row>
    
  </div>
</template>

<script>
import GenetateFormItem from './GenerateFormItem'
export default {
  name: 'FmGenerateForm',
  components: {
    GenetateFormItem
  },
  props: ['data'],
  data() {
    return {
      models: {},
      rules: {}
    }
  },
  watch: {
  },
  created() {
  },
  mounted() {
  },
  methods: {


  }
}
</script>

<style lang="scss">
// @import '../styles/cover.scss';
</style>
