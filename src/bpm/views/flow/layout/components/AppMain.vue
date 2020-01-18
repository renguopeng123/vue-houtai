<template>

  <div class="app-main">
    <section>
      <!-- <Tinymce ref="editor" v-model="postForm.content" /> -->
      流程设计器
    </section>
  </div>
</template>

<script>
  // import Tinymce from '../../tinymce'


  // const defaultForm = {
  //   content: '', // 内容
  //   id: undefined //ID
  // }

  export default {
    name: 'app-main',

    components: {
      // Tinymce
    },
    data() {
      return {
        // postForm: Object.assign({}, defaultForm)
      }
    },

    computed: {}
  }
</script>

<style lang="scss" scoped>
  @import "../style.scss";

  .app-main {
    height: 100%;
    background: #e6e6e6;
    margin: 0 $barWidth;
  }
</style>