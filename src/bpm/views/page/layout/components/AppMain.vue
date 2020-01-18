<template>
  <div id="app-main" class="app-main">
    <Tinymce ref="editor" />
  </div>
</template>

<script>
  import Tinymce from '../../tinymce'
  import {
    getObject
  } from '@/bpm/api/page'
  import qs from 'qs'

  export default {
    name: 'app-main',

    components: {
      Tinymce
    },

    data() {
      return {}
    },

    methods: {
      async init() {

        var _id = qs.parse(window.location.href.split('?')[1]).id.replace("#", "").replace("/", "");

        if (_id == null || _id == "") {

          this.$alert('没有表单ID', '参数错误', {
            confirmButtonText: '返回首页',
            type: 'error',
            callback: action => {
              window.location.href = "/"
            }
          });

          return;

        }

        //要查询的ID
        const query = {
          id: _id
        }

        const loading = this.$loading({
          lock: true,
          text: '加载表单',
          spinner: 'el-icon-loading',
          target: '#app-main',
          body: false
        })

        getObject(query).then(response => {

          if (response.data == null || response.data == "" || response.data.boKey == null || response.data
            .boKey == "") {

            this.$alert('表单不存在，或当前表单没有绑定业务对象。', '参数错误', {
              confirmButtonText: '返回首页',
              type: 'error',
              callback: action => {
                window.location.href = "/"
              }
            });

            loading.close();

          } else {

            this.$store.dispatch('page/setPage', response.data);
            //子组件初始化
            this.$refs.editor.initTinymce();
            //延迟1秒执行 装载数据需要时间
            setTimeout(function () {
              loading.close();
            }, 1000);

          }

        }).catch(error => {

          this.$message({
            message: '获取表单信息错误' + error,
            type: 'error'
          })

          console.error(error);
          //子组件初始化
          this.$refs.editor.initTinymce();
          loading.close();
        })
      },

    },
    computed: {},

    mounted() {
      this.init();
    }
  }
</script>

<style lang="scss" scoped>
  @import "../style.scss";

  .app-main {
    height: 100%;
    background: $border-bg-color;
    margin: 0 $barWidth 0 $barWidth;
  }
</style>