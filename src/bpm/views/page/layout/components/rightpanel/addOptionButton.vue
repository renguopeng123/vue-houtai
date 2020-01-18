<template>
  <el-button @click="add()">添加参数</el-button>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'

  export default {
    name: 'add-button',
    data() {
      return {}
    },
    computed: {
      ...mapGetters([
        "componentPanel"
      ])
    },
    methods: {
      add() {
        var option = {
          key: "",
          txt: ""
        }
        for (const data of this.componentPanel.options) {
          if (data.key == "" || data.txt == "") {
            this.$message({
              message: '有未设置的key/value，请全部设置后再添加新项目。',
              type: 'error'
            })
            return;
          }
        }
        this.componentPanel.options.push(option);
      }
    }
  }
</script>


<style lang="scss" scoped>
</style>