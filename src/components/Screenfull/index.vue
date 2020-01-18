<template>
  <div>
    <svg-icon title="全屏切换" v-if="!button" :icon-class="isFullscreen?'exit-fullscreen':'fullscreen'" @click="click" />
    <el-button title="全屏切换" type="" size='mini' v-if="button" icon="el-icon-full-screen" @click="click" >全屏切换</el-button>
  </div>
</template>

<script>
  import screenfull from 'screenfull'

  export default {
    name: 'Screenfull',
    props: ["button"],
    data() {
      return {
        isFullscreen: false
      }
    },
    mounted() {
      this.init()
    },
    beforeDestroy() {
      this.destroy()
    },
    methods: {
      click() {
        if (!screenfull.enabled) {
          this.$message({
            message: 'you browser can not work',
            type: 'warning'
          })
          return false
        }
        screenfull.toggle()
      },
      change() {
        this.isFullscreen = screenfull.isFullscreen
      },
      init() {
        if (screenfull.enabled) {
          screenfull.on('change', this.change)
        }
      },
      destroy() {
        if (screenfull.enabled) {
          screenfull.off('change', this.change)
        }
      }
    }
  }
</script>

<style scoped>
  .screenfull-svg {
    display: inline-block;
    cursor: pointer;
    fill: #5a5e66;
    ;
    width: 20px;
    height: 20px;
    vertical-align: 10px;
  }
</style>