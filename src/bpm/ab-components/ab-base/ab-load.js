/**
 *  例子 1 <div data-target="data" v-ab-load:post="{url:'/org/user/listJson',params:{}}" noParamBack="true"></div>
 *  例子 2 <div data-target="data" v-ab-load.literal="/org/user/listJson"></div>
 *  abLoad 默认使用 路由参数请求到后端
 *  @params 请求的入参
 *  @url 请求的后端的地址
 *  @v-model  请求后返回的data 赋值对象
 */
export default {
  inserted(el,binding,vnode){
    if(!binding.value)return;
    
    let postMethod = binding.arg||"postForm";
    let url,params;
    let dataTarget = vnode.data.attrs["data-target"];
    
    if(typeof binding.value =='string'){
    	url = binding.value;
    }else{
    	url = binding.value["url"];
		params = binding.value.params;
    }
    
    if(!params){
    	params = vnode.context.$route.params;
    }
    if(params.$add){
    	return;
    }
    
    // 没有参数则 调回
    if(vnode.data.attrs.noParamBack && !params){
    	self.$router.push({
            name: self.backRoute
          })
    }
    
    if(!url){
		console.error("directive [abLoad]  url cannot be null!");
		return;
	}
    let self = vnode.context;
    let rtn = self.abHttpUtil[postMethod](url, params);
    rtn.then(function(result) {
      if (result.isOk) {
    	vnode.context[dataTarget] = result.data;
      } else {
    	  self.$Message.error(result.msg);
      }
    }, function(errorCode) {
    	 self.$Message.error("请求失败!" + errorCode);
    });
  }
}
