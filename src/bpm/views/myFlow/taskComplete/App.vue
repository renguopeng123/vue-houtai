<template>
  <form-main ref="formMain" buttonStyle=""></form-main>
</template>

<script>
  import formMain from '../components/formMain'
  import bpmService from '@/bpm/ab-components/ab-bpm/bpmService'
  import formService from '@/bpm/ab-components/ab-form/formService'

  export default {
    name: 'taskComplete',
    components: {
      formMain
    },
    data() { return {}},
    created: function () {

      var id = bpmService.qs("id");

      this.$Loading.start()

      bpmService.init({
        taskId: id
      }, data => {
        formService.initCustFormFu(data.form.formHtml, data)
        this.$refs.formMain.initData(data);
        this.$refs.formMain.nodeMarker = 'opinion';
        this.$Loading.finish();
      }, () => {
        //发生错误
        bpmService.errorFun(this);
      })
    }
  }
</script>