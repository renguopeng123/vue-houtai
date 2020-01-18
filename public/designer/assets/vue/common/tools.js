var Tools  = {};

Tools.extend = function(parent, child){
	 var child = child || {};  
     for(var prop in parent) {  
         child[prop] = parent[prop];  
     }  
     return child;  
}

Tools.getResultData = function(defer,fn,msgType,errorFn){
	defer.then(function(result){
		Tools.getResult(result,fn,msgType,null,errorFn);
		},function(status){
			if(status ==!0){
				$.Dialog.alert("加载失败！"+status,2);
			}
			
		}
	);
}

Tools.getResultMsg  = function(defer,fn,errorFn){
	defer.then(function(result){
		Tools.getResult(result,fn,"alert","alert",errorFn);
		},function(status){
			if(errorFn){
				errorFn(status);
			}
			$.Dialog.alert("加载失败！"+status,2);
		}
	);
}

Tools.getResult = function(result,fn,errMsgType,sucMsgType,errorFn){
	if(typeof(result) !== "object"){
		if(!result.startWith("{") && !result.startWith("[")){
			result = {"isOk":false,msg:"服务器反馈数据格式存在异常，无法解析反馈结果！","cause":result}
		}else{
			var result	= eval('(' + result + ')');
		}
	}
	 //失败的提示
	if(!result.isOk){
		if(!errMsgType || errMsgType ==='toast'){
			$.Toast.error(result.msg);
			if(errorFn){errorFn(result)};
		}else if (errMsgType === 'alert'){
			$.Dialog.error(result.msg,errorFn);
		}
		console.error(result);
		return;
	}else{
		if(!sucMsgType){//不需要任何显示
			if(fn){
				fn(result.data);
			}
		}else if(sucMsgType ==='toast'){
			$.Toast.success(result.msg);
			if(fn){
				fn(result.data);
			}
		}else if (errMsgType === 'alert'){
			$.Dialog.success(result.msg,fn);
		}
	}
}


/***
 * 将格式化数字转换成number
 */
Tools.toNumber = function(x){ 
	if(x === null || x === undefined ||  x === '') return '';
	if(typeof x == "string"){
		x = x.replace(/,/g, "");
	}
	var match = x.toString().match(/([$|￥])\d+\.?\d*/);
	if(match){
		x = x.replace(match[1],'');
	}
	var val =Number(x);
	if(Number.isNaN(val))return x;
	return val;
}

/**
 * 通过json的路径获取值。严格模式下无法使用eval
 */
Tools.getJsonValue = function xxx(json, path){
	if(!json) return ;
	try{
		var array = path.split(".");
		var value = json ;
		for(var i=0,k;k=array[i++];){
			value = value[k];
		}
		return value;
	}catch(e){
		console.error("通过path 获取json的value 失败 ",e,json,path);
	}
}

Tools.CloneUtil = {
	/**
	 * 深复制【可以迭代】
	 */
	deep:function(obj){
		return jQuery.extend(true,{}, obj);
	},
	/**
	 * 浅复制【不能迭代】
	 */
	shallow:function(obj){
		return jQuery.extend({}, obj);
	},
	/**
	 * 数组复制
	 */
	list:function(obj){
		return $.map(obj, function (n) { return n; });
	}
}

var installVue = null;
export default {
	// 全局安装时候
  install:function(Vue) {
    Vue.tools = Tools;
    installVue = Vue;
    Vue.prototype.abTools = Tools;
  },
  tools : Tools
}