<template>
	<a v-if="abPermission=='b'||abPermission=='w'" :style="style" v-on:click="openUploadDialog"></a>
</template>

<script>
import Vue from 'vue';

export default {
  	props: ['value','abPermission'],
  	data :function () {
	    return {
	    	style :{
	    		border : ""
	    	},
	    }
	},
 	mounted : function(){
 		this.handleStyle();
 		this.showFile();
 	},
 	methods : {
 		//打开上传对话框
 		openUploadDialog : function(){
 			var list = this.value;
			if (!list) {
				list = "[]";
			}
 			
			var that = this;
 			var conf = {
				height : 600,
				width : 800,
				url : "/sys/sysFile/uploadDialog.html",
				title : "附件上传",
				topOpen : true,
				btn : true,
				closeBtn : 1,
				passData : {
					fileList : JSON.parse(list),
				}
			};
			conf.ok = function(index, innerWindow) {
				var str = JSON.stringify(innerWindow.getData());
				that.$emit('input', str);
				$.Dialog.close(innerWindow);
			}
			jQuery.Dialog.open(conf);
 		},
 		showFile : function(){
 			if(!this.value||this.abPermission=='n'){
 				return;
 			}
			var list = JSON.parse(this.value);
			var parent = $(this.$el).parent();
			var element = $(this.$el);
			// 增加没有的下载链接
			$.each(list, function(index, file) {
				// 已存在，不存在则增加
				if (parent.find("[fileId='"+file.id+"']").length > 0) {
					return;
				}
				var a = $("<a>" + file.name + "</a>");
				var href = __ctx + "/sys/sysFile/download?fileId=" + file.id;
				a.attr("href", href);
				a.attr("fileId", file.id);
				a.attr("style", "margin-right:10px");
				$(element).before(a);
			});
			// 删除多余的没有的下载链接
			$.each(parent.find("a[fileId]"), function(index, a) {
				var exist = false;
				var fileId = $(a).attr("fileId");
				$.each(list, function(i, file) {
					if (file.id == fileId) {
						exist = true;
					}
				});
				if (!exist) {
					$(a).remove();
				}
			});
 		},
 		handleStyle : function(){
 			if(this.abPermission == "b"){
 				if(!this.value||this.value=="[]"){
 					this.$vnode.context.$validity[this.$attrs.desc] = "必填";
 					this.style.border = "1px solid red";
 				}else{
 					delete this.$vnode.context.$validity[this.$attrs.desc];
 					this.style.border = "";
 				}
 			}
 		}
 	},
 	watch : {
 		//数据更新时 在td 下增加按钮
 		value : function(newVal,oldVal){
 			if (newVal!=oldVal) {
 				this.handleStyle();
 				this.showFile();
			}
 		}
 	}
}
</script>
