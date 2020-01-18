<template>
  <p style="height: 35px">
    <Button type="primary" :loading="loading" @click="save()" v-show="savePermission">
      <span v-if="!loading">保存</span>
      <span v-else>保存...</span>
    </Button>
    <Button v-show="!hideBackBtn" style="margin-left: 10px" @click="back()">返回</Button>
    <slot></slot>
  </p>
</template>
<script>
/**
* @saveBeforeEvent（model） 保存前置事件,用于前置校验等、若对 当前 model 属性赋值  $callbackMsg =false 则会取消保存动作
* @saveAfterEvent（result，model） 保存前置事件,用于前置校验等、若对 当前 result 属性赋值  $callbackMsg =false 则会取消返回
*/
import { mapMutations } from 'vuex'
  export default {
    name: 'abSave',
    props: {
      'url':{required: true}, // 保存数据请求的url
      'model':{required: true}, // 保存的数据
      "method":{default:"post"}, // 提交方式 默认post 可以改为 postForm
      "hideBackBtn" :{required: false,default:false}, //是否隐藏 back 按钮
      "savePermission" :{required: false,default:true},
      "backRouter":{required: false}, // 成功后跳转页,默认前一页
      "formRef":{required: false},//校验的表单。如果为空则不校验
    },
    data() {
      return {
        loading:false,
      }
    },
    methods: {
   	...mapMutations([
   	      'closeTag'
   	    ]),
   	  save(){
   		if(this.formRef){
   			if(this.$vnode.context.$refs[this.formRef]){
   				this.$vnode.context.$refs[this.formRef].validate((valid) => {
                    if (!valid) {
                    	this.$Message.error('表单校验不通过!');
                    	return ;
                    }else{
                    	this.toSave();
                    }
                })
   			}else{
   				console.warn("ab-save 表单校验，formRef 查找失败、请确认 Form 组件是否添加 ref"+this.formRef);
   			}
   		}else{
   			this.toSave();
   		}
   	  },
      toSave() { 
   		this.model.$callbackMsg = true;
   		this.$emit("saveBeforeEvent", this.model);
   		// 事件返回 false 则不进行保存 saveBeforeEvent 为业务校验入口
   		if(!this.model.$callbackMsg){ return ; }
   		delete this.model.$callbackMsg;
   		
        this.loading = true;
        
        // doValidate
        let self = this;
    	let rtn = this.abHttpUtil[this.method](this.url, this.model);
    	
        rtn.then(function(data) {
          if(data.isOk) {
            if(self.afterSave) {
              return self.afterSave(data);
            }
            self.loading = false;
            self.$Message.success(data.msg);
            
            
            // 后置动作
            data.$callbackMsg = true;
            self.$emit("saveAfterEvent",data,self.model);
       		if(!data.$callbackMsg){ return ; }
            
       		// back
       		if(!self.hideBackBtn){
	            self.back();
       		}
          } else {
          	self.$Message.error(data.msg);
          }
        },function(errorCode) {
      	  self.$Message.error("请求失败!" + errorCode);
        });
      },
      back(){
    	  this.closeTag({
    	        name: this.$route.name,
    	        params: this.$route.params
    	      })
        if(this.backRouter){
          this.$router.push({
	              name: this.backRouter
	          })
        }else{
          this.$router ? this.$router.back() : window.history.back();
       }
      }
    }
  }
</script>
