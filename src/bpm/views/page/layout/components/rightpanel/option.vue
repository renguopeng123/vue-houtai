<template>
  <div>
    <placeholder-panel></placeholder-panel>
    <defaultValue-panel></defaultValue-panel>
    <div v-for="option in componentPanel.options" :key="option.key">
      <el-form-item label="key：">
        <el-input v-model="option.key"></el-input>
      </el-form-item>
      <el-form-item label="value：">
        <el-input v-model="option.txt"></el-input>
      </el-form-item>
    </div>

    <el-form-item>
      <add-button></add-button>
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
  import addButton from './addOptionButton'

  export default {
    name: 'option-panel',
    components: {
      placeholderPanel,
      defaultValuePanel,
      saveButton,
      addButton
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