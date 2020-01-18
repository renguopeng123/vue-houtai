<template>
  <div id="app">
    <div class="top">
      <Button class="saveButton" type="primary" @click="saveData">保存</Button>
    </div>
    <div class="main" v-if="loaded">
      <ab-custom-form ref="form"></ab-custom-form>
    </div>
  </div>
</template>

<script>
  //单页面权限
  import Vue from 'vue'
  import formService from '@/bpm/ab-components/ab-form/formService'
  import qs from 'qs'

  export default {
    name: 'formPreview',
    components: {},

    data() {
      return {
        loaded: false
      }
    },
    mounted() {},

    created() {
      //判断权限 获取表单信息
      this.getInfo();
    },

    methods: {
      getKey() {

        var key = qs.parse(window.location.href.split('?')[1]).key.replace("#", "").replace("/", "");

        if (key == null || key == "") {

          var config = {
            title: "发生错误",
            content: '没有表单ID，返回首页。',
            onOk: function () {
              window.location.href = "/"
            },
            onCancel: function () {
              window.location.href = "/"
            }
          }

          this.$Modal.error(config)
          return;
        }

        return key;

      },
      async getInfo() {

        this.$Loading.start()

        let url = "/form/formDefData/getData";
        let post = Vue.abHttpUtil.postForm(url, {
          key: this.getKey()
        });
        Vue.abTools.getResultData(post, data => {
          formService.initCustFormFu(data.html, data);
          this.loaded = true;
          this.$Loading.finish();
        }, "alert", result => {
          this.$Loading.error();
          window.location.href = "./"
        });

      },
      saveData: function () {
        console.info(this.$refs.form.data);
        var errorMsg = formService.getValidateMsg(this.$refs.form);
        if (errorMsg) {
          this.$Message.error({
            content: "表单校验不通过<br/>" + errorMsg,
            duration: 10,
            closable: true
          });
          return;
        }

        let get = {
          key: this.getKey()
        };

        this.$Loading.start()

        let url = "/form/formDefData/saveData?key=" + this.getKey();
        let post = Vue.abHttpUtil.post(url, this.$refs.form.data);
        Vue.abTools.getResultMsg(post, data => {

          this.$Modal.success({
            title: "保存成功",
            content: "保存成功，是否刷新当前页面？",
            onOk: () => {
              location.reload();
            },
            onCancel: () => {}
          });

          this.$Loading.finish()
        }, result => {
          Vue.prototype.$Message.error("保存失败")
          this.$Loading.error()
        });

      }
    }
  }
</script>


<style lang="scss" scoped>
  .top {
    padding: 10px;
    margin-bottom: 20px;
    background: #f5f7f9;
    border-bottom: 1px solid #eeeeee;
  }

  .saveButton {
    display: inline;
    vertical-align: top;
  }

  .main {
    padding: 5px 50px 15px 50px;
  }
</style>