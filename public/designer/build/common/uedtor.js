var __path = "../.."

var aryCss__=[]; //先用打包的

var aryJs__=[ "/assets/js/plugins/ueditor/ab.ueditor.config.js",
              "/assets/js/plugins/ueditor/ueditor.all.js",
              "/assets/js/plugins/ueditor/lang/zh-cn/zh-cn.js",
              "/assets/js/plugins/ueditor/editor_api.js"];


// 表单设计器内的东西
if(typeof(formType)!=="undefined"){
	if(formType === 'pc'){
		aryJs__.push("/assets/js/platform/form/formDef/custDialog.js");
	}
	else if(formType == 'pc_iview'){
		aryJs__.push("/form/formPlugin/formCustQuery/selectCascade.js");
		aryJs__.push("/form/formPlugin/formCustQuery/formCustQuery.js");
		aryJs__.push("/form/formPlugin/dynRights/dynRights.js");
		aryJs__.push("/form/formPlugin/datePlugn/datePlugn-pc_iview.js");
		aryJs__.push("/assets/js/platform/form/formDef/custDialog-pc_iview.js");
	}
	else if(formType == 'pc_vue'){
		aryJs__.push("/form/formPlugin/dynRights/dynRights.js");
		aryJs__.push("/form/formPlugin/formCustQuery/formCustQuery.js");
		aryJs__.push("/form/formPlugin/formCustQuery/selectCascade_vue.js");
		
		aryJs__.push("/form/formPlugin/datePlugn/datePlugn-vue.js");
		aryJs__.push("/assets/js/platform/form/formDef/custDialog-vue.js");
	}
	
	aryJs__.push("/form/formPlugin/formCalculate/formCalculate.js");
	aryJs__.push("/form/formPlugin/inputTools.js");
}


/**
 * js引入时导入必须的js文件。
 */
for(var i=0;i<aryJs__.length;i++){
	var str="<script src=\""+__path + aryJs__[i] +"\"></script>";
	document.write(str);
}