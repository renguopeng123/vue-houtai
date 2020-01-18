<template>
  <div class="form-config-container">
    <el-form label-position="top">
      <el-form-item label="栅格间隔">
        <el-input v-model.number="data.gutter" type="number" />
      </el-form-item>
      <el-form-item label="卡片样式">
        <el-switch
          v-model="data.isCard"
          active-text="卡片"
          inactive-text="普通"
        />
      </el-form-item>


    </el-form>
  </div>
</template>

<script>
export default {
  props: ['data']
}
</script>
