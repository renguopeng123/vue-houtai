<template>
  <div class="right-panel">
    <el-menu :default-active="activeIndex" class="el-menu" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">属性配置</el-menu-item>
      <el-menu-item index="2">事件配置</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: 'right-panel',
    data() {
      return {
        activeIndex: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../style.scss";

  .right-panel {
    width: $barWidth;
    height: calc(100% - #{$offsetH});
    overflow: hidden;
    position: absolute;
    border-left: solid 1px #e6e6e6;
    top: $offsetH;
    right: 0;
  }

  .collapse {
    margin: 10px;
  }
</style>