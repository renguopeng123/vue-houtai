<template>
  <form-main ref="formMain" buttonStyle="print-hidden"></form-main>
</template>

<script>
  import formMain from '../components/formMain'
  import bpmService from '@/bpm/ab-components/ab-bpm/bpmService'
  import formService from '@/bpm/ab-components/ab-form/formService'

  export default {
    name: 'formStart',
    components: {
      formMain
    },
    data() { return {}},
    created: function () {

      var id = bpmService.qs("id");
      var flowKey = bpmService.qs("flowKey");
      var instanceId = bpmService.qs("instanceId");

      this.$Loading.start()

      bpmService.init({
        defId: id,
        flowKey: flowKey,
        instanceId: instanceId
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