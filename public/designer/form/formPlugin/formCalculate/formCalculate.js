/**
 * 表单计算
 */
UE.registerUI('formCalculate', function(editor, uiName) {
	var btn = new UE.ui.Button({
		name : uiName + uiName,
		title : '表单计算',
		// 需要添加的额外样式，指定icon图标，这里默认使用一个重复的icon，每个图标偏移量为-20px
		cssRules :'background: url("../formPlugin/formCalculate/kf-icon.png") !important',
		onclick : function() {
			var conf = {
				height : 500,
				width : 720,
				url : "/form/formPlugin/formCalculate/formCalculate.html", 
				title : "表单计算",
				topOpen : true,
				btn : true,
				closeBtn : 1
			};
			conf.passData = {
				parentScope : AngularUtil.getScope()
			};
			debugger;
			var selectedDom = editor.selection.getStart();
			var subTableDiv = $(selectedDom).closest("[table-key]")[0];
			conf.passData.tableKey = subTableDiv? $(subTableDiv).attr("table-key"):"";
			conf.passData.scirpt = $(selectedDom).attr("v-ab-calculate");
            conf.passData.decimals = $(selectedDom).attr("calc-decimals");

			conf.ok = function(index, innerWindow) {
				var data = innerWindow.getData();
				 
				$(selectedDom).attr("v-ab-calculate",data.script);
                $(selectedDom).attr("calc-decimals",data.decimals);

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
		if ($(selectedDom).attr("v-ab-calculate")) {
			btn.setChecked(true);
		}else{
			btn.setChecked(false);
		}
	});

	return btn;
} );