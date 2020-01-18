<template>
  <Button type="primary"  v-on:click="addSub" size="small" icon="md-add"><slot></slot></Button>
</template>

<script>
  import Vue from 'vue';

  export default {
    props: ['value',"initData","abInitFirstRow"],
    data :function () {
      return {

      }
    },
    mounted : function(){
      if(this.abInitFirstRow){
        //如果有编辑权限才会自动添加行
        let elPermission = this.getPermission();
        if(!elPermission || elPermission === "n" || elPermission === "r"){
          return;
        }

        if(!this.value || this.value.length ==0){
          this.addSub();
        }
      }
    },
    methods: {
      addSub : function(){
        let list = this.value;
        if(!list){
          list = [];
          this.$emit('input', list);
        }
        var json = JSON.parse(JSON.stringify(this.initData));//深copy
    	list.push(json);
      },
      // 获取权限标签的值
      getPermission:function(){
        for(let i=0,d;d=this.$vnode.data.directives[i++];){
          if(d.name=="ab-permission"){
            return d.value;
          }
        }
        return null;
      }
    }
  }
</script>
