<template>
  <div class="sidebar-container">


    <div class="right-panel">
      <el-menu :default-active="activeIndex" class="el-menu" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">页面列表</el-menu-item>
        <el-menu-item index="2">组件</el-menu-item>
      </el-menu>
    </div>

    <el-menu default-active="2" class="el-menu-vertical" @open="handleOpen" @close="handleClose">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: 'sidebar',

    data() {
      return {
        activeIndex: '1'
      };
    },

    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../style.scss";

  .el-menu-vertical {
    border: 0px;
  }

  .sidebar-container {
    width: $barWidth;
    height: calc(100% - #{$offsetH});
    overflow: hidden;
    border-right: solid 1px #e6e6e6;
    position: absolute;
    top: $offsetH;
    left: 0;
  }
</style>