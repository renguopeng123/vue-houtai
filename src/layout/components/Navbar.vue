<template>
  <div class="navbar" :style="{background:theme.color}">
    <hamburger :style="{'border-left': '1px solid ' + theme.shadow}" :is-active="sidebar.opened"
      class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <span class="welcome"
        :style="{'border-right': '1px solid ' + theme.border, 'box-shadow': '1px 0px 0px ' + theme.shadow }">
        {{$t('navbar.welcome')}}
        ~ {{ name }}
      </span>
      <template v-if="device!=='mobile'">
        <search class="right-menu-item" />

        <error-log class="errLog-container right-menu-item hover-effect" />

        <screenfull class="right-menu-item hover-effect" />

        <el-tooltip :content="$t('navbar.size')" effect="dark" placement="bottom">
          <size-select class="right-menu-item hover-effect" />
        </el-tooltip>

        <lang-select class="right-menu-item hover-effect" />
      </template>

      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div>
          <!--  <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar"> -->
          <svg-icon icon-class="people" />
          <i class="el-icon-caret-bottom" />
        </div>

        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>{{ $t('navbar.dashboard') }}</el-dropdown-item>
          </router-link>
          <a target="_blank" href="http://61.135.24.220:44450/liukai/gwssi-ui">
            <el-dropdown-item>{{ $t('navbar.github') }}</el-dropdown-item>
          </a>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">{{ $t('navbar.logOut') }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
  import {
    mapGetters
  } from "vuex";
  import Breadcrumb from "@/components/Breadcrumb";
  import Hamburger from "@/components/Hamburger";
  import ErrorLog from "@/components/ErrorLog";
  import Screenfull from "@/components/Screenfull";
  import SizeSelect from "@/components/SizeSelect";
  import LangSelect from "@/components/LangSelect";
  import Search from "@/components/HeaderSearch";
  import tools from "@/utils/tools";
  import {
    removeToken
  } from '@/utils/auth'

  import {
    logout
  } from '@/bpm/api/auth'


  export default {
    components: {
      Breadcrumb,
      Hamburger,
      ErrorLog,
      Screenfull,
      SizeSelect,
      LangSelect,
      Search
    },
    computed: {
      ...mapGetters(["sidebar", "name", "avatar", "device"]),
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
          border: border,
          shadow: shadow
        };
      }
    },
    methods: {
      toggleSideBar() {
        this.$store.dispatch("app/toggleSideBar");
      },
      logout() {

        //Chrome登出重定向会报错的bug
        //先手动清除前端会话 否则异步操作 this.$router会先执行这时候前端会话存在的话还是会被重新定向回来
        removeToken();

        //登出用户系统
        this.$store.dispatch('user/logout')
          .then(() => {
            console.log("登出成功");
            this.$message.success("成功登出系统");
          })
          .catch(error => {
            console.log("登出失败 " + error);
          })

        //登出工作流平台
        logout({}).then(response => {}).catch(error => {
          console.error(error);
        })

        //直接返回首页
        // this.$router.push(`/login?redirect=${this.$route.fullPath}`);
        this.$router.push('/login?redirect=home');

      }
    }
  };
</script>

<style lang="scss" scoped>
  .navbar {
    height: 50px;
    overflow: hidden;
    position: relative;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

    .hamburger-container {
      line-height: 46px;
      height: 100%;
      float: left;
      cursor: pointer;
      transition: background 0.3s;
      -webkit-tap-highlight-color: transparent;
      color: #ffffff;

      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }
    }

    .breadcrumb-container {
      float: left;
      color: #ffffff;
    }

    .errLog-container {
      display: inline-block;
      vertical-align: top;
    }

    .right-menu {
      float: right;
      height: 100%;
      line-height: 50px;

      &:focus {
        outline: none;
      }

      .welcome {
        display: inline-block;
        font-size: 14px;
        color: #ffffff;
        vertical-align: text-bottom;
        padding-right: 10px;
      }

      .right-menu-item {
        display: inline-block;
        padding: 0 8px;
        height: 100%;
        font-size: 18px;
        color: #ffffff;
        vertical-align: text-bottom;

        &.hover-effect {
          cursor: pointer;
          transition: background 0.3s;

          &:hover {
            background: rgba(0, 0, 0, 0.025);
          }
        }
      }

      .avatar-container {
        margin-right: 30px;

        .avatar-wrapper {
          margin-top: 5px;
          position: relative;

          .user-avatar {
            cursor: pointer;
            width: 40px;
            height: 40px;
            border-radius: 10px;
          }

          .el-icon-caret-bottom {
            cursor: pointer;
            position: absolute;
            right: -20px;
            top: 25px;
            font-size: 12px;
          }
        }
      }
    }
  }
</style>