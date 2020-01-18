<template>

</template>

<script>
import Vue from 'vue'

export default {
  	props: ["value","permission","tablePermission"],
  	data :function () {
	    return {
	    	dynRights : null,
	    	sourcePerimission : null,
	    	sourceTablePermission : null,
	    }
	},
  	created : function(){
  		this.sourcePerimission = Vue.abTools.clone(this.permission);
  		this.sourceTablePermission = Vue.abTools.clone(this.tablePermission);
  		if(this.$slots.default[0].text){
  			this.dynRights = JSON.parse(this.$slots.default[0].text);
  		}
  		this.handle();
 	},
 	mounted : function(){
 	},
	methods: {
		//处理权限
	    handle : function(){
	    	if(!this.dynRights){
	    		return;
	    	}
	    	for(var key in this.value){
	    		window.eval("var " + key);
		    	eval(key + " = this.value." + key + ";");
	    	}
	    	var that = this;
    	 	this.dynRights.forEach(function(item){
    	 		var func;
    	 		eval("func = function() { " + item.script + " };");
    	 		var permission = that.sourcePerimission;
    	 		var rSort = ["n","r","w","b"];//权限排序
    	 		item.permissions.split(",").forEach(function(ite){
    	 			var p;
        	 		eval("p = " + ite + ";");//源权限
        	 		if(rSort.indexOf(p) < rSort.indexOf(item.rights)){//权限不能越界修改
        	 			return;
        	 		}
        	 		if(func()){//满足条件修改
        	 			eval("that." + ite + " = '" + item.rights + "';");
        	 		}
        	 		that.$emit('update:permission',that.permission);
    	 		});
	    	});
	    }
  	},
 	watch : {
 		value : {
 			handler : function(newVal,oldVal){
 	 			this.handle();
 			},
 			deep:true
 		}
 	}
}
</script>
