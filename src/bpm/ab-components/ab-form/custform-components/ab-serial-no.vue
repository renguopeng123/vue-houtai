<template>
<Input v-model="value" v-ab-permission="abPermission" :placeholder="placeholder" v-on:input="$emit('input', $event.target.value)" />
</template>

<script>
import Vue from 'vue';

export default {
	props: ['value',"serialNo","abPermission","placeholder"],
  	methods: {
    
  	},
  	data :function () {
	    return {
	    }
	},
 	mounted : function(){
 		//无权限或者已经有值了，则不需要处理
		if(this.abPermission ==="n"||this.abPermission ==="r"||this.value){
			return;
		}
 		
		let url = "/sys/serialNo/getNextIdByAlias";
    	let post = Vue.abHttpUtil.postForm(url, {
   			alias:this.serialNo
	  	});
	  	Vue.abTools.getResultData(post, data => {
	  		this.$emit('input', data);
     	});
 	}
}
</script>
