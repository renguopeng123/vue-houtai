<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="$route.path"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'
import { colorFun } from '@/utils/index'

// 三个点为 es6的扩展运算符
// (...)用于取出参数对象中的所有可遍历属性，拷贝到当前对象之中
// mapGetters辅助函数仅仅是将store中的getter映射到局部计算属性

export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters([
      'permission_routes',
      'sidebar'
    ]),
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {

      //variables直接返回使用默认的固定颜色
      return variables

      // var themeColor = this.$store.state.settings.theme;
      // return {menuBg: colorFun.getItemColors(themeColor, 100) ,menuText : variables.menuText, menuActiveText : themeColor}
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
