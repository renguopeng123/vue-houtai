<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}"
    :style="{background:theme.color , 'border-right': theme.border}">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
        <!-- <img v-if="logo" :src="logo" class="sidebar-logo"> -->
        <svg-icon v-if="logo" icon-class="oa" class="robot" />
        <h1 v-else class="sidebar-title">{{ title }}</h1>
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <!-- <img v-if="logo" :src="logo" class="sidebar-logo">-->
        <svg-icon v-if="logo" icon-class="oa" class="robot" />
        <h1 class="sidebar-title">{{ title }}</h1>
      </router-link>
    </transition>
  </div>
</template>

<script>
  import tools from '@/utils/tools'

  export default {
    name: 'SidebarLogo',
    props: {
      collapse: {
        type: Boolean,
        required: true
      }
    },
    computed: {
      theme() {
        var color = this.$store.state.settings.theme;
        var border = color;
        var shadow = color;
        try {
          border = tools.getItemColors(border, 20);
          shadow = tools.getItemColors2(shadow, 20);
        } catch (e) {
          console.log(e);
        }
        return {
          color: color,
          border: "1px solid " + border,
          shadow: "1px 0px 0px " + shadow
        };
      }
    },
    data() {
      return {
        title: '长软OA系统',
        logo: '/static/img/logo.14e52456.gif'
      }
    }
  }
</script>

<style lang="scss" scoped>
  .robot {
    font-size: 30px;
    color: #ffffff;
    display: inline-block;
    margin: 0px;
    padding: 0px;
    vertical-align: middle !important;
  }

  .sidebarLogoFade-enter-active {
    transition: opacity 1.5s;
  }

  .sidebarLogoFade-enter,
  .sidebarLogoFade-leave-to {
    opacity: 0;
  }

  .sidebar-logo-container {
    position: relative;
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    overflow: hidden;

    & .sidebar-logo-link {
      height: 100%;
      width: 100%;

      & .sidebar-logo {
        width: 32px;
        height: 32px;
        vertical-align: middle;
        margin-right: 12px;
      }

      & .sidebar-title {
        display: inline-block;
        margin: 0;
        color: #fff;
        font-weight: 600;
        line-height: 50px;
        font-size: 14px;
        font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
        vertical-align: middle;
      }
    }

    &.collapse {
      .sidebar-logo {
        margin-right: 0px;
      }
    }
  }
</style>