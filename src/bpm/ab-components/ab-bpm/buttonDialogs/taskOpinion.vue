<template>

</template>

<script>

  export default {
    name: 'bpmTaskOpinionDialog', // 规则== bpm+"-"+buttonAlias+"Dialog"
    props:['passData','id'],
    data() {
      return {
        data:{
          fullname:"小王"
        },
        loading:false,
        abFormValidate:{}, // 必须用于 ab-validate 扩展赋值的定义，若不使用ab-validate 亦可以直接对 form-item :rule 的形式单个字段添加校验
      }
    },
    methods: {
      tosave () {
        this.loading = true;
      }
    },
    created: function () {
      console.info(this.$route.params.id);
    },
  }
</script>
