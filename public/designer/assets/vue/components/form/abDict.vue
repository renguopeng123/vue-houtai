<template>
	<select class="form-control" v-model="currentValue" v-on:input="$emit('input', $event.target.value)">
		<option value="">请选择</option>
		<option v-for="dict in dataList" :value="dict.key">{{dict.name}}</option>
	</select>
</template>

<script>
import Vue from 'vue'

export default {
  	props: ['dictKey','value'],
  	methods: {
	    
  	},
  	data :function () {
	    return {
	      dataList:[],
	      currentValue:""
	    }
	},
  	created : function(){
		var vm = this;
  	 	if(!vm.dictKey)return;
  	  	
  		var defer = Vue.baseService.get(Vue.__ctx+"/sys/dataDict/getDictData?dictKey="+this.dictKey);
  		Vue.tools.getResultData(defer,function(data){
	 		vm.dataList = data;
		},"alert");
 	},
 	mounted : function(){
 		this.currentValue = this.value;
 	},
 	watch : {
 		//数据更新时
 		value : function(newVal,oldVal){
 			this.currentValue = this.value;
 		}
 	}
}
</script>
