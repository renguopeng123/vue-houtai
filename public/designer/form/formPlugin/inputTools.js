UE.registerUI('inputTools', function(editor, uiName) {
	var popup = initPopup(editor);
    editor.addListener('selectionchange', function() {
    	var element = editor.selection.getStart();
    	var isInput = element.hasAttribute('v-model'); //
		if(!isInput) return;

		var menuHtml =  '<span onclick="$$._onInputDelButtonClick()" class="edui-clickable">删除</span>&nbsp;';
		if(element.getAttribute("disabled")){
            menuHtml = menuHtml + '<span onclick="$$._onInputReadonlyButtonClick()" class="edui-clickable">删除只读</span>&nbsp;';
		}else{
            menuHtml = menuHtml + '<span onclick="$$._onInputReadonlyButtonClick()" class="edui-clickable">只读</span>&nbsp;';
		}
		menuHtml = menuHtml + '<span onclick="$$._onInputCutInputButtonClick()" class="edui-clickable">剪切</span>&nbsp;';
		
		if(element.getAttribute("v-ab-calculate")){
			 menuHtml = menuHtml + '<span onclick="$$._delFormCalculate()" class="edui-clickable">删除函数计算</span>&nbsp;';
		}
		
		var validateStr = element.getAttribute("v-ab-validate");
		if(element.getAttribute("v-ab-validate")){
			 menuHtml = menuHtml + "校验: "
			var json = JSON.parse(validateStr);
			menuHtml = menuHtml + '<span onclick="$$._inputValidate(\'required\')" class="edui-clickable">'+(json.required? '删除必填':'必填' )+'</span>&nbsp;';
			menuHtml = menuHtml + '<span onclick="$$._inputValidate(\'phonenumber\')" class="edui-clickable">'+(json.phonenumber? '删除手机':'手机' )+'</span>&nbsp;';
			menuHtml = menuHtml + '<span onclick="$$._inputValidate(\'number\')" class="edui-clickable">'+(json.number? '删除数字':'数字' )+'</span>&nbsp;';
			menuHtml = menuHtml + '<span onclick="$$._inputValidate(\'email\')" class="edui-clickable">'+(json.email? '删除邮箱':'邮箱' )+'</span>&nbsp;';
			
		}
		if(element.tagName === "AB-SUB-ADD"){
			if(element.getAttribute("ab-init-first-row")!=="true"){
				menuHtml = menuHtml + '<span onclick="$$._setInitFirstRow(true)" class="edui-clickable">设置初始化一条子表数据</span>&nbsp;';
			}else{
				menuHtml = menuHtml + '<span onclick="$$._setInitFirstRow(false)" class="edui-clickable">取消初始化一条子表数据</span>&nbsp;';
			}
		}


    	//菜单
    	html = popup.formatHtml('<nobr>' + menuHtml + '</nobr>');
		if(popup.getDom("content")){
			popup.getDom("content").innerHTML = html;
		}else{
			popup.content = html;
		}
		popup.editElement = element;
		popup.showAnchor(popup.editElement);
    });
   
});



function initPopup(editor) {
	var popup = new baidu.editor.ui.Popup({
		editor : editor,
		content : '',
		className : 'edui-bubble',
		// 删除
		_onInputDelButtonClick : function() {
			this.hide();
			if (popup.editElement) {
				popup.editElement.parentNode.removeChild(popup.editElement); 
			}
		},
		// 只读切换
        _onInputReadonlyButtonClick : function() {
            this.hide();
            if(!popup.editElement)return;
            var element = $( popup.editElement);
            element.attr("disabled", !element.attr("disabled"));
            editor.execCommand('inserthtml',"");
        },
		// 剪切
        _onInputCutInputButtonClick : function() {
            this.hide();
            if(!popup.editElement)return;

			window._elementCutCopy = popup.editElement;
			popup.editElement.parentNode.removeChild(popup.editElement);
			editor.execCommand('inserthtml',"");
        },
        // 删除表单函数计算
        _delFormCalculate : function(){
        	this.hide();
        	
        	if(!popup.editElement)return;
            var element = $(popup.editElement);
            element.removeAttr("v-ab-calculate");
            editor.execCommand('inserthtml',"");
        },
        // 校验
        _inputValidate: function(validateKey){
        	this.hide();
        	
        	if(!popup.editElement)return;
            var element = $(popup.editElement);
            
            var json = JSON.parse(element.attr("v-ab-validate"));
            json[validateKey] = !json[validateKey];
            
            element.attr("v-ab-validate", JSON.stringify(json));
            
            editor.execCommand('inserthtml',"");
        },
        _setInitFirstRow:function(isInit){
        	this.hide();
        	if(!popup.editElement)return;
        	
            var element = $(popup.editElement);
            element.removeAttr("ab-init-first-row");
            
            if(isInit){
            	element.attr("ab-init-first-row", true);
            }
            
            editor.execCommand('inserthtml',"");
        },
	});
	return popup;
}






/**
 * 粘贴复制的 input
 */
UE.registerUI('pasteElement', function(editor, uiName) {
    var btn = new UE.ui.Button({
        name : uiName + uiName,
        title : '粘贴',
        cssRules : 'background-position: -200px -20px;',
        onclick : function() {
        	var html = window._elementCutCopy;
            editor.execCommand('inserthtml',html.outerHTML);
        }
    });

    // 当点到编辑内容上时，按钮要做的状态反射
    editor.addListener('selectionchange', function() {
        var selectedDom = editor.selection.getStart();
        if (!window._elementCutCopy) {
            btn.setDisabled(true);
            btn.setChecked(false);
            return;
        } else {
            btn.setDisabled(false);
        }

    });

    return btn;
} );