/**
 * 表单自定义查询
 */
UE.registerUI('selectCascade', function(editor, uiName) {
	var btn = new UE.ui.Button({
		name : uiName + uiName,
		title : '下拉框级联',
		// 需要添加的额外样式，指定icon图标，这里默认使用一个重复的icon，每个图标偏移量为-20px
		cssRules : 'background-position: -100px -75px;',
		onclick : function() {
			var conf = {
				height : 600,
				width : 900,
				url : "/form/formPlugin/formCustQuery/selectCascade.html",
				title : "下拉框级联",
				topOpen : true,
				btn : true,
				closeBtn : 1,
			};

			var selectedDom = editor.selection.getStart();
			if(selectedDom.children && selectedDom.children[0]){
				if(selectedDom.children[0].localName=== "select"){
					selectedDom = selectedDom.children[0];
				}
			}
			
			var elmIndex = 0;
			$(selectedDom).closest("html").find("select").each(function(idx, el) {
				if (this == selectedDom) {
					elmIndex = idx;
				}
			});

			conf.passData = {
				parentScope : AngularUtil.getScope()
			};

			// 编辑模式
			var elm = $(selectedDom);
			if (($(selectedDom).attr("v-ab-cust-query") || "").indexOf("abCustQueryOpMap") == 0) {
				var data = {};
				data.dialogKey = elm.attr("dialog-key");
				var param = elm.attr(":param") || "{}";
				if(param!="{}"){
					param = param.replaceAll(":", ":'").replaceAll("}", "'}").replaceAll(",", "',");
				}
				eval("data.paramMap = " + param);
				data.initParamMap = JSON.parse(elm.attr(":init-param") || "{}");
				data.opVal = elm.attr("op-val");
				data.opTxt = elm.attr("op-txt");
				conf.passData.data = data;
			}

			conf.ok = function(index, innerWindow) {
				var data = innerWindow.getData();
				var name = "abCustQueryOpMap.op" + elmIndex;
				elm.attr("v-ab-cust-query", name);
				elm.attr("dialog-key", data.dialogKey);
				elm.attr(":param", JSON.stringify(data.paramMap).replaceAll("\"", ""));
				elm.attr(":init-param", JSON.stringify(data.initParamMap));
				elm.attr("op-val", data.opVal);
				elm.attr("op-txt", data.opTxt);

				elm.html('<option v-for="item in ' + name + '" :value="item.' + data.opVal + '">{{item.' + data.opTxt + '}}</i-option>');
				$.Dialog.close(innerWindow);
			};

			jQuery.Dialog.open(conf);
		}
	});

	// 当点到编辑内容上时，按钮要做的状态反射
	editor.addListener('selectionchange', function() {
		var selectedDom = editor.selection.getStart();
		btn.setDisabled(true);
		btn.setChecked(false);
		
		if(selectedDom.children && selectedDom.children[0]){
			if(selectedDom.children[0].localName=== "select"){
				selectedDom = selectedDom.children[0];
			}
		}
		
		if (selectedDom.localName == "select") {
			btn.setDisabled(false);
		}
		
		
		

		if (($(selectedDom).attr("v-ab-cust-query") || "").indexOf("abCustQueryOpMap") == 0) {
			btn.setChecked(true);
		}
	});

	return btn;
}/*
	 * index 指定添加到工具栏上的那个位置，默认时追加到最后,editorId
	 * 指定这个UI是那个编辑器实例上的，默认是页面上所有的编辑器都会添加这个按钮
	 */);