<template>
  <div>
    <Modal v-model="show" scrollable title="备注意见" @on-ok="ok()" @on-cancel="cancel()">
    <Form label-position = "top">
      <FormItem :required="true" label="意见">
        <Input v-model="flowParam.opinion" type="textarea" :rows="4" placeholder="请输入意见" />
      </FormItem>
      <FormItem label="转交人" :required="true">
     	<span  ng-if="userSet.name">{{userSet.name}}</span>
    	<ab-cust-dialog dialogKey="userSelector" :dialogSetting="dialogSetting" value-id="id" value-name="name" v-model="userSet"  >
		选择用户</ab-cust-dialog>
      </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import Vue from 'vue';
export default {
  props: ['passConf', 'showDialog'],
  data: function () {
    return {
      flowParam: this.passConf,
      show: false,
      userSet:{},
      dialogSetting:{multiple : false}
    }
  },
  methods: {
    ok: function () {
      if (!this.flowParam.opinion) {
        this.$Message.warning({ content: '请输入意见' })
        return
      }
      if(!this.flowParam.nodeUsers[this.flowParam.nodeId][0].name){
			$.Toast.warning("请选择一位转交人！");
			return false;
		}
    
      
      this.show = false
      this.$emit('callback', this.flowParam)
    },
    cancel: function () {
      this.show = false
      this.$emit('cancel', false)
    },
    selectUser:function(){
    	
    	
    }
  },
  watch: {
    showDialog: function (value) {
      this.show = value
    }
  },
  created: function () {
    this.show = this.showDialog;
    debugger;
    this.flowParam.nodeUsers = {};
    this.flowParam.nodeUsers[this.flowParam.nodeId] = [{}];
    this.userSet = this.flowParam.nodeUsers[this.flowParam.nodeId][0];
  }
}

</script>
