<template>
<div>
  <Modal v-model="show" scrollable title="备注意见" @on-ok="ok" @on-cancel="cancel" width="80%" height="500px">
    <Table :columns="columns1" :data="opinionList"></Table>
  </Modal>
</div>
</template>
<script>
export default {
  props: ['passConf', 'showDialog'],
  name: 'bpm-opinion-history',
  data: function () {
    return {
      opinionList: [],
      columns1: [
        { title: '任务名称', key: 'taskName' },
        { title: '任务创建时间', key: 'createTime' },
        { title: '待执行人',
          key: 'assignInfo',
          render: (h, params) => {
            return h('span', { }, this.getAssignInfo(params.row.assignInfo))
          } },
        { title: '处理时间', key: 'approveTime' },
        { title: '执行人', key: 'approverName' },
        { title: '处理状态',
          key: 'status',
          render: (h, params) => {
            return h('span', { }, this.getByStatus(params.row.status))
          } },
        { title: '备注/意见', key: 'opinion' }
      ],
      show: false
    }
  },
  methods: {
    ok: function () {
      this.show = false
      this.$emit('cancel', false)
    },
    cancel: function () {
      this.show = false
      this.$emit('cancel', false)
    },
    getByStatus: function (status) {
      if (status == 'create') return '待审批'
      if (status == 'start') return '发起流程'
      if (status == 'against') return '反对'
      if (status == 'reject') return '驳回'
      if (status == 'manualEnd') return '人工终止'
      if (status == 'end') return '终止'
      if (status == 'agree') return '同意'
      if(status =='awaiting_check') return '待审核'
      return status
    },
    getAssignInfo: function (assignInfo) {
      if (!assignInfo) return ''
      let msg = ''
      
      let itemList = assignInfo.split(',');
      for(var i=0,item;item=itemList[i++];){
    	  if (!item) continue;
    	  if (msg) { msg += ',' }
    	  var strs = item.split('-')
          if (strs[0] === 'user') {
            msg = '[用户]'
          } else if (strs[0] === 'role') {
            msg = '[角色]'
          } else if (strs[0] === 'group') {
            msg = '[组]'
          } else if (strs[0] === 'org') {
            msg = '[组织]'
          } else if (strs[0] === 'post') {
            msg = '[岗位]'
          } else if (strs[0] === 'job') {
            msg = '[职称]'
          }
          msg = msg + strs[1]
      }
       return msg;
    }
  },

  created: function () {
    this.show = this.showDialog
    let defer = this.abHttpUtil.postForm('/bpm/instance/getInstanceOpinion', { instId: this.passConf.instanceId })
    let vm = this
    this.abTools.getResultData(defer, function (data) {
      vm.opinionList = data.reverse()
    })
  }
}
</script>

<style>
</style>
