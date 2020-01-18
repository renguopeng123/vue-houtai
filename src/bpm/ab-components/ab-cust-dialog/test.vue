<template>
<div>
	<ab-cust-dialog dialog-key="userSelector" value-name="name" value-key="key" v-model="data" :dialog-setting="dialogSetting" >
	</ab-cust-dialog>
	{{data}}
</div>
</template>

<script>
/**
 * 
 */
import Vue from 'vue';
import abCustDialog from './ab-cust-dialog.vue';
export default {
	components:{
		abCustDialog
	},
	props: [],
  	data :function () {
	    return {
	    	data : [ { "name": "销售部", "key": "xsb" }],
	    	dialogSetting:{
	    		multiple : false,
	    	}
	    }
	},
 	mounted : function(){
 	},
	methods: {
  	},
 	watch : {
 	}
}
</script>
