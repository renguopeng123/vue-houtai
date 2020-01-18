var bpmService = {};
/** taskId,instanceId,defId,bpmTask,form,buttons**/
bpmService.data ;

Vue.__ctx = "https://bpm.ecloud.work/ecloud-bpm-platform";

//初始化动作
bpmService.init = function(params,fn){
	this.data = params;
	
	var dataUrl = Vue.__ctx + "/bpm/task/getTaskData";// taskId=xxx
	if(!params.taskId){
		dataUrl =  Vue.__ctx + "/bpm/instance/getInstanceData";
	}
	
	var defer = Vue.baseService.postForm(dataUrl,params);
	Vue.tools.getResultData(defer,function(data){
		if(fn)fn(data);
		Vue.tools.extend(data,bpmService.data);
	},"alert");
	
};

//获取表单的数据
bpmService.getFormData = function(custFormContext,button){
	var validateForm = "start,agree,oppose".indexOf(button.alias)!=-1;
		
	var formType = this.data.form.type;
	if(formType=='INNER'){
		var errorMsg = Vue.formService.getValidateMsg(custFormContext);
		if(errorMsg && validateForm){
			$.Dialog.alert("表单校验不通过！"+errorMsg,7);
			return false; 
		}
		return custFormContext.data;
	}
	if(formType=='FRAME'){
		var iframeObj=document.getElementById("frmFrame").contentWindow;
		//尝试校验
		try{
			if(validateForm){
				if(iframeObj.isValid() === false){
					return false;
				}
			}
		}
		catch(e){
		}
		//尝试取值
		try {
			return iframeObj.getData();
		} catch (e) {
			console.error("URL 表单获取 数据失败！"+e)
			return {test:"jeff"};
		}
	}
	else{
		alert("不支持的表单类型:"+formType)
	}
};

bpmService.getSubmitFlowParam = function(){
	if(!this.data){
		alert("error");
		return;
	}
	
	if(this.data.task) {
		return {"taskId":this.data.taskId,nodeId:this.data.task.nodeId,instanceId:this.data.task.instId};
	}
	
	return {
			defId: this.data.defId,
			instanceId: this.data.instanceId
		}
}
/**
 * 流程按钮解析。
 * 关于按钮样式，对话框宽高属性，不做可配置行，因为前段无法统一，
 * 但是、请求资源路径要求一致，比如/bpm/task/   /bpm/instance.
 * 前缀自己前段控制
 */
Vue.component('bpmButtons',{
	 props: ['buttons'],
	 data:function(){
		 return { }
	 },
	 methods:{
		 buttonClick : function(button){
			 	var ii = layer.load();
					
				//执行前置js
				if(!this.execuFn(button.beforeScript)){
					layer.close(ii);
					 return;
				 }
				//获取流程数据
				var custFormContext = getCustFormComponent(this.$parent);
				
				//客户表单自定义 fn:custValid 校验
                var validateForm = "start,agree,oppose".indexOf(button.alias)!=-1;
				if(validateForm && custFormContext.custValid){
					if(custFormContext.custValid() === false){
						layer.close(ii);
						return;
					}
				}
				// 获取在线表单数据，并校验内置校验
				var busData = bpmService.getFormData(custFormContext,button);
				if(busData === false){//获取数据失败
					layer.close(ii);
					return;
				}
				var scope = this;
				var flowData = bpmService.getSubmitFlowParam();
				flowData.data = busData;
				flowData.action =  button.alias;
			   
				//获取更多完成动作配置
				var buttonStyle = this.getButtonStyle(button.alias);
				if( button.configPage){
					layer.close(ii);
					
					var height = buttonStyle.dialogHeigth || 300;
					var width = buttonStyle.dialogWidth || 600;
					 
					var conf = {title:button.name,url:button.configPage,height:height,width:width,passData:flowData,topOpen:false};
					conf.ok = function(index,innerWindow){
						if(!innerWindow.isValidate())return ;
						scope.postAction(flowData,innerWindow);
					}
					layer.close(ii);
					$.Dialog.open(conf);
				}else{
					layer.close(ii);
					scope.postAction(flowData);
				}
			},
			postAction : function(flowData){
				var ii = layer.load();
				// 执行动作
				var url =  Vue.__ctx + (flowData.taskId ? "/bpm/task/doAction":"/bpm/instance/doAction");
				var defer = Vue.baseService.post(url,flowData);
				Vue.tools.getResultMsg(defer,function(data){
					layer.close(ii);
					window.setTimeout(function(){
						parent.layer.closeAll(); 
					},10)
					if(window.opener && window.opener.reloadGrid){
						window.opener.reloadGrid();
					}
				},function(){
                    layer.close(ii);
				});
				
				
			},
			execuFn : function(fnStr){
				if(!fnStr)return true;
				var parentScope = getCustFormComponent(this.$parent);
				
				var script = "var tempFunction = function(scope){ "+fnStr+"};"
				var result =  eval(script+"tempFunction(parentScope);");
				if(result===false) return false;
				return true;
			},
			getButtonStyle:function(alias){
				var  buttonsStyle = {
					"start":{css:"btn btn-success fa fa-send"},
					"draft":{css:"btn btn-primary fa fa-clipboard"},
					"save":{css:"btn btn-primary fa fa-clipboard"},
					"agree":{css:"btn btn-success fa fa-check-square-o",dialogHeigth:422,dialogWidth:690},
					"oppose":{css:"btn btn-primary fa fa-close",dialogHeigth:422,dialogWidth:690},
					"reject":{css:"btn btn-danger fa fa-lastfm",dialogHeigth:422,dialogWidth:690},
					"reject2Start":{css:"btn btn-danger fa fa-lastfm",dialogHeigth:300,dialogWidth:500},
					"lock":{css:"btn btn-primary fa fa-lock"},
					"unlock":{css:"btn btn-primary fa fa-unlock"},
					"taskOpinion":{css:"btn btn-primary fa fa-navicon",dialogHeigth:'80%',dialogWidth:'75%'},
					"flowImage":{css:"btn btn-primary fa fa-image",dialogHeigth:'80%',dialogWidth:'90%'},
					"manualEnd":{css:"btn btn-danger fa fa-ioxhost",dialogHeigth:300,dialogWidth:500},
					"print":{css:"btn btn-primary fa fa-print",dialogHeigth:300,dialogWidth:500},
				}
				if(buttonsStyle[alias]) return  buttonsStyle[alias];
				return {css:"btn btn-success "};
			}
	 },                                                                                                     
	 template:'<div>                                                                                     						\
		 			<span v-for="btn in buttons" :class="getButtonStyle(btn.alias).css" v-on:click="buttonClick(btn)" style="margin-right: 5px;">                                            \
		 			{{btn.name}}</span>                                                               							\
	 		  </div>',                                                                                  
	
});

function getCustFormComponent(pageComponent){
	for(var i=0,c;c=pageComponent.$children[i++];){
		if(c.$options._componentTag==="ab-custom-form" || c.$options._componentTag==="ab-url-form"){
			return c;
		}
	}
	// 不向下递归
	console.error("页面中找不到 cust-form 的组件！！！");
	return null;
}
