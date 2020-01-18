/**
 * 表单自定义查询
 */
UE.registerUI('formCustQuery', function(editor, uiName) {
	var btn = new UE.ui.Button({
		name : uiName + uiName,
		title : '表单自定义查询',
		// 需要添加的额外样式，指定icon图标，这里默认使用一个重复的icon，每个图标偏移量为-20px
		cssRules :'background: url("../formPlugin/formCustQuery/search.png") !important',
		onclick : function() {
			var conf = {
				height : 600,
				width : 900,
				url : "/form/formPlugin/formCustQuery/formCustQuery.html",
				title : "表单自定义查询触发器",
				topOpen : true,
				btn : true,
				closeBtn : 1,
			};
			conf.passData = {
				parentScope : AngularUtil.getScope()
			};

			var selectedDom = editor.selection.getStart();
			var subTableDiv = $(selectedDom).closest("[table-key]")[0];
			conf.passData.tableKey = subTableDiv? $(subTableDiv).attr("table-key"):"";
			
			if ($(selectedDom).attr("v-ab-cust-query")) {
				var data = {};
				data.dialogKey = $(selectedDom).attr("dialog-key");
				data.dialogName = $(selectedDom).attr("query-desc");
				data.triggerType = $(selectedDom).attr("trigger-type");
				data.targetNgModelPath = $(selectedDom).attr("v-ab-cust-query");
				
				data.mapList = [];
				$.each(selectedDom.attributes, function(i, v) {
					if (v.name.indexOf("value-") !== 0) {// 处理value-开头的属性
						return;
					}
					data.mapList.push({
						key : v.value,
						returnField : v.name.replace("value-", "")
					});
				});
				
				if($(selectedDom).attr(":param")){
					var param = $(selectedDom).attr(":param") || "{}";
					if(param!="{}"){
						param = param.replaceAll(":", ":'").replaceAll("}", "'}").replaceAll(",", "',");
					}
					eval("data.dialogParam = " + param);
				}
				if($(selectedDom).attr(":init-param")){
					data.initParam = parseToJson($(selectedDom).attr(":init-param"));
				}
				
				
				conf.passData.data = data;
			}

			conf.ok = function(index, innerWindow) {
				var data = innerWindow.getData();
				var elm = "";
				if (data.mapList.length > 0) {
					elm = $(selectedDom);
					elm.attr("v-ab-cust-query",data.targetNgModelPath);
					elm.attr("dialog-key", data.dialogKey);
					elm.attr("query-desc", data.dialogName);
					elm.attr("trigger-type", data.triggerType);
					elm.attr(":param",JSON.stringify(data.dialogParam).replaceAll("\"", ""));
					elm.attr(":init-param",JSON.stringify(data.initParam));
					
					angular.forEach(data.mapList, function(map){
						elm.attr("value-" + map.returnField, map.key);
					});
				}
				
				if (!conf.passData.data) {
					//TODO  remove attrs$(selectedDom).
				}
				editor.execCommand('inserthtml',"");//触发ueditor内容变化
				$.Dialog.close(innerWindow);
			};

			jQuery.Dialog.open(conf);
		}
	});

	// 当点到编辑内容上时，按钮要做的状态反射
	editor.addListener('selectionchange', function() {
		var selectedDom = editor.selection.getStart();
		if (!selectedDom) {
			btn.setDisabled(true);
			btn.setChecked(false);
			return;
		} else {
			btn.setDisabled(false);
		}
		if ($(selectedDom).attr("v-ab-cust-query")) {
			btn.setChecked(true);
		}else{
			btn.setChecked(false);
		}
	});

	return btn;
}/*
	 * index 指定添加到工具栏上的那个位置，默认时追加到最后,editorId
	 * 指定这个UI是那个编辑器实例上的，默认是页面上所有的编辑器都会添加这个按钮
	 */);