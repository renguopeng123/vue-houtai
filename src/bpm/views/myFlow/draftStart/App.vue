<template>
  <form-main ref="formMain" buttonStyle=""></form-main>
</template>

<script>
  import formMain from '../components/formMain'
  import bpmService from '@/bpm/ab-components/ab-bpm/bpmService'
  import formService from '@/bpm/ab-components/ab-form/formService'

  export default {
    name: 'draftStart',
    components: {
      formMain
    },
    data() {
      return {}
    },
    created: function () {

      var id = bpmService.qs("id");
      this.$Loading.start()

      bpmService.init({
        instanceId: id
      }, data => {
        formService.initCustFormFu(data.form.formHtml, data)
        this.$refs.formMain.initData(data);
        this.$Loading.finish();
      }, () => {
        //发生错误
        bpmService.errorFun(this);
      })
    }
  }
</script>