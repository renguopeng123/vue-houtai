<template>
<div :style="style">
	<Tree v-if="dialog.multiple" ref="tree" :data="treeData" show-checkbox :check-strictly="true"></Tree>
	<Tree v-else ref="tree" :data="treeData"></Tree>
</div>
</template>

<script>
/**
 * 
 */
import Vue from 'vue';
export default {
	props: ["dialog","initData","param"],
  	data :function () {
	    return {
	    	treeData : [],
	    	treeMap : {},
	    	style : {},
	    }
	},
 	mounted : function(){
 		this.style.height = (this.dialog.height - 150)+"px";
 		
 		let url = "/form/formCustDialog/treeData_" + this.dialog.key;
 		let post = Vue.abHttpUtil.postForm(url, this.param||{});
 		post.then(result => {
 			this.treeData = this.buildTree(result);
 			console.info(this.treeData);
  		}, function (status) {
	  		if (status == !0) {
		  		Vue.prototype.$Message.error('加载失败！' + status);
		  	}
		});
 	},
	methods: {
		//构建tree
	  	buildTree : function(data, parentId){
  			if(!parentId){//找到根节点
  				parentId = this.dialog.treeConfig.pidInitVal;
		  	}
  			let tree = [];
  			let temp;
  			for (let i = 0; i < data.length; i++) {
  				if (data[i][this.dialog.treeConfig.pid] == parentId) {
  					let obj = data[i];
  					temp = this.buildTree(data, data[i][this.dialog.treeConfig.id]);
  					if (temp.length > 0) {
  						obj.children = temp;
  					}
  					obj.title = obj[this.dialog.treeConfig.showColumn];
  					obj.expand = true;
  					
  					this.initData.forEach(item => {
  						if(this.dialogEqual(item,obj)){
  							if(this.dialog.multiple){
  								obj.checked = true;
  							}else{
  								obj.selected = true;
  							}
  						}
  					});
  					
  					tree.push(obj);
  				}
  			}
  			return tree;
	  	},
	  	// 仅以a中存在的字段跟b作相等比较（可以理解为a字段少，b字段多）
	  	dialogEqual : function(a,b){
			for(let key in a){
				let isExist = false;
				this.dialog.returnFields.forEach(field => {
					if(key==field.columnName){
						isExist = true;
					}
				});
				if(!isExist){
					continue;
				}
				
				if(a[key] != b[key]){
					return false;
				}
			}
			return true;
	  	},
	  	getData : function(){
	  		if(this.dialog.multiple){
	  			return this.$refs.tree.getCheckedNodes();
	  		}
	  		return this.$refs.tree.getSelectedNodes();
	  	},
  	},
 	watch : {
 	}
}
</script>
