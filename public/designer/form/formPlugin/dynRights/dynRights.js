/**
 * 动态权限
 */
UE.registerUI('dynRights', function(editor, uiName) {
	var btn = new UE.ui.Button({
		name : uiName + uiName,
		title : '动态权限',
		// 需要添加的额外样式，指定icon图标，这里默认使用一个重复的icon，每个图标偏移量为-20px
		cssRules : 'background-position: -240px -0px;',
		onclick : function() {
			var conf = {
				height : 600,
				width : 900,
				url : "/form/formPlugin/dynRights/dynRights.html",
				title : "动态权限",
				topOpen : true,
				btn : true,
				closeBtn : 1,
			};

			var selectedDom = editor.selection.getStart();
			var tableKey = $(selectedDom).parents("[table-key]").attr("table-key") || "";
			var abDynRights;
			if (!tableKey) {
				abDynRights = $(selectedDom).parents("body").find("ab-dyn-rights[tk='" + tableKey + "']");
			} else {
				abDynRights = $(selectedDom).parents("[table-key]").find("ab-dyn-rights[tk='" + tableKey + "']");
			}

			conf.passData = {
				parentScope : AngularUtil.getScope(),
				tableKey : tableKey,
				dynRights : angular.fromJson(abDynRights.html() || "[]")
			};

			conf.ok = function(index, innerWindow) {
				var data = innerWindow.getData();
				if (abDynRights.length == 0) {
					abDynRights = $("<ab-dyn-rights style='display:none;'></ab-dyn-rights>");
					abDynRights.attr("tk", tableKey);
					if (!tableKey) {
						abDynRights.attr("v-bind:permission.sync","permission");
						abDynRights.attr("v-bind:table-permission.sync","tablePermission");
						$(selectedDom).parents("body").children().append(abDynRights)
					} else {
						if ($(selectedDom).parents("[table-key]").find("ab-sub-scope").length != 0) {
							abDynRights.attr("v-bind:permission.sync","scope.permission");
							abDynRights.attr("v-bind:table-permission.sync","scope.tablePermission");
							$(selectedDom).parents("[table-key]").find("ab-sub-scope").append(abDynRights);
						}else{
							abDynRights.attr("v-bind:permission.sync","permission");
							abDynRights.attr("v-bind:table-permission.sync","tablePermission");
							$(selectedDom).parents("[table-key]").append(abDynRights);
						}
					}
					abDynRights.attr("v-bind:value", angular.toJson(data.data).replaceAll("\"", ""));
				}
				abDynRights.html(angular.toJson(data.dynRights));
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

		var tableKey = $(selectedDom).parents("[table-key]").attr("table-key") || "";
		if (!tableKey) {
			if ($(selectedDom).parents("body").find("ab-dyn-rights[tk='" + tableKey + "']").length == 1) {
				btn.setChecked(true);
			} else {
				btn.setChecked(false);
			}
		} else {
			if ($(selectedDom).parents("[table-key]").find("ab-dyn-rights[tk='" + tableKey + "']").length == 1) {
				btn.setChecked(true);
			} else {
				btn.setChecked(false);
			}
		}
	});

	return btn;
}/*
	 * index 指定添加到工具栏上的那个位置，默认时追加到最后,editorId
	 * 指定这个UI是那个编辑器实例上的，默认是页面上所有的编辑器都会添加这个按钮
	 */);