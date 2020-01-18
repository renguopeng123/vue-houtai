<template>
  <el-col :span="span" :offset="offset">
    <el-button @click="addScript" :type="type" :class="buttonClass" plain>
      <svg-icon :icon-class="icon" />
      {{buttonName}}</el-button>
  </el-col>
</template>

<script>
  export default {
    name: 'vue-script',
    props: ["span", "offset", "buttonClass", "buttonName", "icon", "type"],
    data() {
      return {}
    },
    methods: {
      addScript() {
        //编辑器
        var editor = window.tinymce.activeEditor;
        //编辑器的dom，相当于html的dom
        var dom = editor.dom;

        var script = dom.create("script");
        //不能有多余属性 否则vue不识别
        // script.setAttribute("name", "vueExtendsScript");
        script.innerHTML =
          '\n //custFormComponentMixin 用于扩展覆盖表单展示用的customForm vue对象配置，这里自定义方法和属性之后可以在组件中直接调用，不过要使用$parent去调用。\n  window.custFormComponentMixin = \n { data: function () { return {"test":"helloWorld"}; },  \n created:function(){ console.log("混入对象的自定义钩子被调用"); }, \n methods:{ test:function(){alert(1)} }} \n';

        var selection = editor.selection;
        selection.setNode(script);

        this.$message({
          message: '增加脚本成功',
          type: 'success'
        });

      }
    }
  }
</script>

<style lang="scss" scoped>
</style>