<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <!--include 和 exclude 属性允许组件有条件地缓存，这里判断的是组件的名称
      include: 字符串或正则表达式。只有匹配的组件会被缓存。
      exclude: 字符串或正则表达式。任何匹配的组件都不会被缓存。-->    
      <!-- <keep-alive>   -->
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
      <!--如果不使用keep-alive则切换路由的时候不会保持上次的状态-->
      <!-- <router-view /> -->
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.fullPath
    }
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  height: 100%;
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: auto;
}

.fixed-header+.app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header+.app-main {
    padding-top: 84px;
  }
}
</style>

