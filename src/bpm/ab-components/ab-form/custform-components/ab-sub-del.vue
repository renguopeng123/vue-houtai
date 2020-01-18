<template>
  <Button type="primary"  v-on:click="delSub" size="small" icon="md-trash"><slot></slot></Button>
</template>

<script>
  import Vue from 'vue';

  export default {
    props: ['value',"index"],
    data :function () {
      return {
      }
    },
    mounted : function(){

    },
    methods: {
      delSub : function(){
        this.value.splice(this.index,1);
      }
    }
  }
</script>
