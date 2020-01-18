<template>
  <div class="navbar" :style="{background:color}">

    <el-row>
      <el-col :span="12" class="left-col">

        <el-button type="primary"  title="下载" icon="el-icon-download" circle></el-button>
        <el-button type="primary"  title="保存" icon="el-icon-document" circle></el-button>
        <screenfull :button="true" class="screenfull-item" />
        <!--保证颜色统一-->
        <theme-picker @change="themeChange" style="display:none" />

      </el-col>

      <el-col :span="12" class="right-col">
        <span class="welcome">{{$t('navbar.welcome')}} ~ {{ user.name }} ~</span>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import Screenfull from '@/components/Screenfull'
  import ThemePicker from '@/components/ThemePicker'

  export default {
    name: 'Navbar',
    props: ["user"],
    data() {
      return {
        color: "#2365A3"
      }
    },

    components: {
      Screenfull,
      ThemePicker
    },
    computed: {},
    methods: {
      themeChange(val) {
        this.color = val;
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../style.scss";

  .navbar {
    height: $navbarH;
    width: 100%;
    color: #ffffff;
    overflow: hidden;
    border-bottom: 1px solid #e6e6e6;
  }

  .el-col {
    height: $navbarH;
  }

  .el-col .screenfull-item {
    margin-left: 10px;
  }

  .el-col div,
  .el-col .welcome {
    display: inline-block;
    font-size: $fontSize;
    margin-right: 10px;
  }

  .el-col .welcome {
    line-height: $navbarH;
    vertical-align: text-bottom;
  }

  .right-col {
    text-align: right;
    padding-right: 20px;
  }

  .left-col {
    text-align: left;
    padding-left: 20px;
  }
</style>
