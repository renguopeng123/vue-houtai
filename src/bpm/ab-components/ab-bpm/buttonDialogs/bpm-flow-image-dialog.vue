<template>
  <div>
    <Modal v-model="show" scrollable title="流程图" width="1000px" @on-ok="ok()" @on-cancel="cancel()">
        <img style="display:block;" :src="__ctx+'bpm/instance/flowImage?instId='+instanceId+'&defId='+defId"/>
    </Modal>
  </div>
</template>

<script>
import config from '@/bpm/ab-config'
const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro
export default {
  props: ['passConf', 'showDialog'],
  name: 'bpm-flowImage-dialog',
  data: function () {
    return {
      flowParam: this.passConf,
      instanceId: '',
      defId: '',
      show: false
    }
  },
  methods: {
    ok: function () {
      this.show = false
      this.$emit('cancel', null)
    },
    cancel: function () {
      this.show = false
      this.$emit('cancel', false)
    }
  },
  watch: {

  },
  created: function () {
    this.__ctx = baseUrl
    this.show = this.showDialog
    this.instanceId = this.flowParam.instanceId || ''
    this.defId = this.flowParam.defId
  }
}

</script>
