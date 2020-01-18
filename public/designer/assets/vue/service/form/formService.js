import Vue from 'vue'
import formValidator from './formValidator'
import formServiceExtend from './formServiceExtend'

import abCheckbox from '../../components/form/abCheckbox.vue'
Vue.component('abCheckbox', abCheckbox);
import abDict from '../../components/form/abDict.vue'
Vue.component('abDict', abDict);
import abDate from '../../components/form/abDate.vue'
Vue.component('abDate', abDate);
import abSerialNo from '../../components/form/abSerialNo.vue'
Vue.component('abSerialNo', abSerialNo);
import abUpload from '../../components/form/abUpload.vue'
Vue.component('abUpload', abUpload);
import abSubAdd from '../../components/form/abSubAdd.vue'
Vue.component('abSubAdd', abSubAdd);
import abSubDel from '../../components/form/abSubDel.vue'
Vue.component('abSubDel', abSubDel);
import abSubDetail from '../../components/form/abSubDetail.vue'
Vue.component('abSubDetail', abSubDetail);
import abCustDialog from '../../components/form/abCustDialog.vue'
Vue.component('abCustDialog', abCustDialog);
import abCustQuery from '../../components/form/abCustQuery.js'
Vue.directive('abCustQuery', abCustQuery);
import abDynRights from '../../components/form/abDynRights.vue'
Vue.component('abDynRights', abDynRights);
import abSubScope from '../../components/form/abSubScope.vue'
Vue.component('abSubScope', abSubScope);

var FormService = {};
/**
 * 自定义表单初始化
 * @html 自定义表单的HTML 代码
 * @data 表单的数据，会混入到自定义表单组件中
 */
FormService.initCustFormFu = function(html,data){
	// 流程那里 url 表单不处理
	if(data.form && data.form.type!== "INNER")return;
	
	//var html = data.form.formHtml;
	window.custFormComponentMixin = {};
	var custComponentData = data;
		
	// 处理 custFormComponentMixin
	if(html.indexOf("<script>") != -1){
		var reg=/<script[^>]*?>[\s\S]*?<\/script>/i;
		var patten = reg.exec(html)	
		var script = patten[0];
		
		var len1=script.indexOf(">")
		var len2=script.lastIndexOf("<")
		var custScriptStr = script.substring(len1+1,len2);
		html = html.replace(reg,"");
		
		if(custScriptStr){
			try{
				// TODO严格模式下问题
				eval(custScriptStr);// eslint-disable-line
			}catch(e){
				console.error("解析表单 JavaScript脚本 异常",custScriptStr,e);
			}
		}
		
		// 用于第三层子表数据暂存 _temp.xxx = [] //则该子表的数据暂存
		custComponentData.subTempData = {};
		//用来作为下拉级联option的载体 一个表单页最多兼容一百个下拉框
	    custComponentData.abCustQueryOpMap = {};
	    for(var i=0;i<200;i++){
	    	custComponentData.abCustQueryOpMap["op"+i]=[];
	    }
	}
	
	/**
	 * 公共的常用 表单 js
	 */
	var custFormMethods = {
			abGetNumber: function (data){
				if(data === undefined || data === ""){
					return 0;
				}
				var number = Number(data);
				if(number === NaN){
					console.info("计算对象中存在 NaN");
					return 0;
				}
				return number;
			},
			abSubAvg: function(subDataList,key){
				if(!subDataList || !key || subDataList.length == 0){
					return "not calculate";
				}
				var sum = 0 ;
			    subDataList.forEach(function(data){
			        if(! data[key]) return;
			        sum = sum +  Number(data[key]);
				})
				return  sum/subDataList.length;
			},
			abSubSum : function(subDataList,key){
				if(!subDataList || !key || subDataList.length == 0){
					return "not calculate";
				}
				var sum = 0 ;
				subDataList.forEach(function(data){
					if(! data[key]) return;
					sum = sum +  Number(data[key]);
				})
				return  sum;
			}
	}
	
	Vue.component('ab-custom-form',{
    	name:"customForm",
		mixins: [custFormComponentMixin],
		template: html,
		data:function(){
			return custComponentData;
		},
		methods:custFormMethods,
		mounted: function () {
			// 隐藏
			$("[hide]").hide();
		}
	});
};


Vue.component('ab-url-form',{
	props:["form"],
	name:"urlForm",
	template: "<iframe id='frmFrame' src='' @load='iframeHeight(this)' style='width:100%;border:none;'></iframe>",
	data:function(){
		return {url:""};
	},
	methods:{
		iframeHeight:function(){
			var height=document.documentElement.clientHeight  || document.body.clientHeight ;
			$(this.$el).height(height-40);
		}
	},
	mounted: function () {
		if(this.form.type!="FRAME") return;
		var url =this.form.formValue;
		url = url.startWith("http")?url : getProjectUrl(url);
		this.url = url;
		$(this.$el).attr("src",url);
	}
});

/**
 * 校验,依赖 v-model 或者 组件的 input 事件
 * 
 */
Vue.directive("AbValidate",{
	inserted:function(el,binding,vnode){
		 formValidator.doValidate(el,binding,vnode);
		 
		 //  原生 input 没有 update 动作，这里做input事件补偿
		 var validateHandler = function(e){
			 if(e.target && e.target !== el)return;
			 
			 var value = e.target? e.target.value : e;
			 formValidator.doValidate(el,binding,vnode,value);
		 }
		 
		 if(vnode.componentInstance){
			 vnode.componentInstance.$on("input",function(value){
				 validateHandler(value);
			 })
		 }else{
			 addEvent(el, 'input', validateHandler);
		 }
		 
	},
	update :function(el, binding, vnode,oldVnode) {
		if(el.value === undefined )return;
		
		var oldValue = vnode.elm.$_oldValue;
		if(oldValue !== el.value){
			 formValidator.doValidate(el,binding,vnode,el.value);
		}
		vnode.elm.$_oldValue = el.value;
	},
	unbind :function(el, binding, vnode,oldVnode){
		// 清除该字段校验
		if(vnode.context.$validity[vnode.data.attrs.desc]){
			delete vnode.context.$validity[vnode.data.attrs.desc];
		}
	}
	
})

/**
 * 获取表单的校验情况
 * 自定义表单为<custForm> 组件。当前componentScope 为页面的scope
 * 所以要先找到 custForm 组件的作用域
 * return 
 */
FormService.getValidateMsg = function(componentScope){
	var errorStr ="";
	if(!componentScope.$validity){
		 return errorStr;
	}
	
	for(var key in componentScope.$validity){
		if(errorStr){errorStr = errorStr + "<br/>"}
		errorStr = errorStr +"【"+ key +"】"+ ":" + componentScope.$validity[key];
	}
	
	if(errorStr){
		errorStr = "<div style='text-align:left'>"+errorStr+"</div>"
	}
	
	return errorStr;
}


/**
 *  基础权限，对控件做只读、必填、无权限, @v-model 必须
 *  v-ab-permission="permission.kjcs.cskj.xb" v-model=""
 *  
 *  判断是否有展示权限，无则移除dom
 *  v-ab-permission:show="permission.kjcs.cskj.xb" 
 *  
 *   *  判断是否有编辑权限，无则移除dom
 *  v-ab-permission:edit="permission.kjcs.cskj.xb" 
 */
Vue.directive("AbPermission",{
	inserted:function(el,binding,vnode){
		handleElementPermission(el,binding,vnode);
	},
	update:function(el,binding,vnode){
		if(binding.oldValue && binding.oldValue===binding.value){
			return;
		}
		handleElementPermission(el,binding,vnode);
	}
})

Vue.directive("AbDynamicRights",{
	update:function(el,binding,vnode){
		 debugger;
	}
})

/**
 * 处理控件权限
 * 
 * @param el
 * @param binding
 * @param vnode
 * @returns
 */
function handleElementPermission(el,binding,vnode){
	if(!binding.value)return;
	// 只成功处理一次
	
	//重新计算时，[还原权限]
	if(binding.oldValue && binding.oldValue!='w'){
		if(binding.oldValue=='b'){
			vnode.elm.required = false;
			vnode.elm.$_oldValue = undefined;
		}else if(binding.oldValue=='r'){
			vnode.elm.readOnly = true;
			vnode.elm.disabled = true;
		}else if(binding.oldValue=='n'){
			vnode.elm.style.display = ""
		}		
	}
	
	if(binding.arg){
		handleSpecialPermision(el,binding,vnode);
		return;
	}
	
	// 处理必填权限
	if(binding.value=="b"){
		vnode.elm.$_oldValue = undefined;
		vnode.elm.required = true;
		//TODO  触发校验计算
	}
	else if(binding.value === "w"){
		
	}
	// 
	else if(binding.value === "r"){
		vnode.elm.readOnly = true;
		vnode.elm.disabled = true;
	}
	else if(binding.value === "n"){
		debugger;
		vnode.elm.style.display = "none"
		if(vnode.context.$validity && vnode.context.$validity[vnode.data.attrs.desc]){
			delete vnode.context.$validity[vnode.data.attrs.desc];
		}
	}
}

function handleSpecialPermision(el,binding,vnode){
	
	//无展示权限则移除掉标签
	if(binding.arg ==="show" && binding.value=="n"){
		vnode.elm.style.display = "none";
		return;
	}

	//无编辑权限则移除掉控件
	if(binding.arg ==="edit" && binding.value!=="w" && binding.value!=="b"){
		vnode.elm.style.display = "none";
		return;
	}
	vnode.elm.style.display = "";
}


	
function addEvent(element, event, listener) {
    if (element.addEventListener) {
      element.addEventListener(event, listener, false);
    } else if (element.attachEvent) {
      element.attachEvent('on' + event, listener);
    } else {
      element['on' + event] = listener;
    }
  }

export default {
	// 全局安装时候
  install:function(Vue) {
    Vue.formService = FormService;
  },
  formService: FormService
}

