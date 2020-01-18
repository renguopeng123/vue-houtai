<template>
  <Button type="primary" v-on:click="showSub" size="small" icon="ios-list-box-outline">
    <slot></slot>
  </Button>
</template>

<script>
  import Vue from 'vue';

  export default {
    props: {
      value: {
        required: true,
      },
      tableKey: {
        required: true, // boCode_entityCode
      },
      subTempData: {},
      pkey: {}
    },
    data: function () {
      return {}
    },
    mounted: function () {

    },
    methods: {
      showSub: function () {
        if (!this.pkey) {
          this.showSub_old();
          return;
        }

        let entityKey = this.tableKey.split("_")[1];
        let listName = entityKey + "List";
        let that = this;

        var json = Vue.abTools.clone(this.value);
        json[listName] = Vue.abTools.clone(this.value[listName] || []);
        Vue.set(this.subTempData, this.pkey, json);
        this.$emit('update:subTempData', this.subTempData);
        // 弹框
        Vue.set(this.subTempData, this.tableKey + "_Model", true);
        this.subTempData[this.tableKey + "_okFn"] = function () {
          Vue.set(that.value, listName, that.subTempData[that.pkey][listName]);
          Vue.set(that.subTempData, that.tableKey + "_Model", false);
        }
      },
      showSub_old: function () {
        let entityKey = this.tableKey.split("_")[1];
        let listName = entityKey + "List";
        let that = this;

        let formContext = this.$vnode.context;

        //判断是否是gw标签 如果是gw标签 则上一级才是form
        if (formContext && formContext.$vnode && formContext.$vnode.data.staticClass && formContext.$vnode.data
          .staticClass.indexOf("gw-components") > -1) {
          formContext = formContext.$vnode.context
        }

        Vue.set(formContext.$data.subTempData, listName, this.abTools.CloneUtil.list(this.value[listName] || []));
        // 弹框
        Vue.set(formContext.$data.subTempData, this.tableKey + "_Model", true);
        formContext.$data.subTempData[this.tableKey + "_okFn"] = function () {
          Vue.set(that.value, listName, formContext.$data.subTempData[listName]);
          formContext.$data.subTempData[that.tableKey + "_Model"] = false;
        }
      }
    }
  }
</script>