/**
 * 日期控件
 */
UE.registerUI('datePlugn', function(editor, uiName) {
	// 参考addCustomizeButton.js
	var btn = new UE.ui.Button({
		name : uiName + uiName,
		title : '日期控件',
		// 需要添加的额外样式，指定icon图标，这里默认使用一个重复的icon，每个图标偏移量为-20px
		cssRules : 'background-position: -140px -20px;',
		onclick : function() {
			var conf = {
				height : 500,
				width : 800,
				url : "/form/formPlugin/datePlugn/datePlugn-vue.html",// url不为空则使用iframe类型对话框
				title : "日期控件",
				topOpen : true,
				btn : true,
				closeBtn : 1,
			};
			var selectedDom = editor.selection.getStart();
			var elm = $(selectedDom).parent().next().find("ab-date")[0];
			conf.passData = {
				parentScope : AngularUtil.getScope(),
				selectedDom:elm
			};

			conf.ok = function(index, innerWindow) {
				var data = innerWindow.getData();
				if(data.min){
					$(elm).attr("v-bind:min",data.min);
					$(elm).attr("minformat",data.minformat);
				}else{
					$(elm).removeAttr("v-bind:min");
					$(elm).removeAttr("minformat");
				}
				
				if(data.max){
					$(elm).attr("v-bind:max",data.max);
					$(elm).attr("maxformat",data.maxformat);
				}else{
					$(elm).removeAttr("v-bind:max");
					$(elm).removeAttr("maxformat");
				}
				
				if(data.cal){
					$(elm).attr("v-bind:cal.sync",data.cal);
					$(elm).attr("caltype",data.caltype);
				}else{
					$(elm).removeAttr("v-bind:cal.sync");
					$(elm).removeAttr("caltype");
				}
				
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
		}
		
		btn.setDisabled(true);
		btn.setChecked(false);
		
		var elm = $(selectedDom).parent().next().find("ab-date")[0];
		if (elm&&elm.localName == "ab-date") {
			btn.setDisabled(false);
			if ($(selectedDom).attr("v-bind:min") || $(selectedDom).attr("v-bind:max")) {
				btn.setChecked(true);
			}
		}
	});

	return btn;
}/*
	 * index 指定添加到工具栏上的那个位置，默认时追加到最后,editorId
	 * 指定这个UI是那个编辑器实例上的，默认是页面上所有的编辑器都会添加这个按钮
	 */);