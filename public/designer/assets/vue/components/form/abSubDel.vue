<template>
<a v-on:click="delSub">
	<slot></slot>
</a>
</template>

<script>
import Vue from 'vue';

export default {
  	props: ['value',"index"],
  	data :function () {
	    return {
	    }
	},
 	mounted : function(){
 		
 	},
	methods: {
		delSub : function(){
			this.value.splice(this.index,1);
	    }
  	}
}
</script>
