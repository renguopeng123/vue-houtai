<template>
<div>
	<slot v-bind:permission="permission" v-bind:table-permission="tablePermission"></slot>
</div>
</template>

<script>
import Vue from 'vue';

export default {
  	props: ['permissiona','tablePermissiona'],
  	data :function () {
	    return {
	    	permission:{},
	    	tablePermission:{}
	    }
	},
 	created : function(){
 		// 修改克隆了的 permission
 		this.permission  = Vue.abTools.clone(this.permissiona);
 		this.tablePermission  = Vue.abTools.clone(this.tablePermissiona);
 	},
	methods: {
		
  	}
}
</script>
