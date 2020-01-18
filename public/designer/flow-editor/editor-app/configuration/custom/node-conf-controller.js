var NodeConfController = [ '$scope','baseService','ArrayToolService','nodeDefService', function(scope,baseService,ArrayToolService,nodeDefService) {
	scope.nodeMap = scope.bpmDefSetting.nodeMap;
  scope.currentSelectedNode = {};
	scope.ArrayTool = ArrayToolService;
	scope.isEditAllNode_forms = false;
	scope.isEditAllNode_btns = false;
	scope.isEditAllNode_nodeUser = false;
	for(var key in scope.bpmDefSetting.getExistNode()){
		var node = scope.nodeMap[key];
		if(!node){
			node = scope.nodeMap[key] = {
						nodeId : key,
						form : {
							type : 'INNER'
						},
						mobileForm : {
							type : 'INNER'
						},
						propertie:{
							backMode: "normal",
							backUserMode: "history"
						}
					};
			}
	}

	scope.$watch("selectedItem.nodeId", function(newValue, oldValue) {
    scope.currentSelectedNode = (scope.selectedItem && newValue) ? scope.nodeMap[newValue] : {};

    if (!scope.currentSelectedNode.plugins) {
      scope.currentSelectedNode.plugins = {};
    }
    if (!scope.currentSelectedNode.plugins.userAssign) {
      scope.currentSelectedNode.plugins.userAssign = {};
    }
    if (!scope.currentSelectedNode.plugins.userAssign.ruleList) {
      scope.currentSelectedNode.plugins.userAssign.ruleList = [];
    }
  });
	
	// scope.testSelect = function(a){
	// 	return a===this.node.propertie.backNode;
	// }
	//
	// scope.editAllNodes = function(name){
	// 	if(scope["isEditAllNode_"+name]){
	// 		scope["isEditAllNode_"+name] = false;
	// 	}else {
	// 		jQuery(".collapse.in").not("."+name).collapse('hide');
	// 		scope["isEditAllNode_"+name] = true;
	// 	}
	// }
	//
	//
	// scope.checkHandler = function(handler){
	// 	if(!handler) return;
	// 	baseService.get(__ctx+"/flow/node/validHandler?handler="+handler).then(function(data){
	// 		if(data.result!='0'){
	// 			$.topCall.error("接口"+handler+"有误，原因："+data.msg);
	// 		}
	// 	})
	// }
	
	//修改某节点的按钮
	scope.editBtns = function(node){
		var nodeId = node.nodeId;
		var url='/bpm/nodeDef/nodeBtnEdit.html?defId='+bpmDefId+'&nodeId='+nodeId;
    var passData = angular.copy(scope.nodeMap[nodeId].btnList);

		var dialogConf = {
      url:url,
      passData: passData ,
      btnAlign: 'l',
      title: "节点按钮设置",
      width: "800",
      height: "100%",
      modal: true,
      offset: 'rb',
      resizable : false,
      move: false,
			ok: function(index,innerWindow){
				var data = innerWindow.getData();
				if (!data) return;
				
				scope.$apply(function() {
					scope.nodeMap[nodeId].btnList = data;
				});
				innerWindow.parent.layer.close(index);
			}
		};
		jQuery.Dialog.open(dialogConf);
	};
	
	// scope.nodeFormFilter = function(value){
	// 	if(this.nodeId != this.selectedItem.nodeId && !this.isEditAllNode_forms){
	// 		return false;
	// 	}
	//
	// 	return "UserTask,singTask,StartNoneEvent,".indexOf(value.nodeType) !=-1;
	// }
	//
	// scope.nodeUserFilter = function(value){
	// 	if(this.nodeId != this.selectedItem.nodeId && !this.isEditAllNode_nodeUser){
	// 		return false;
	// 	}
	//
	// 	return "UserTask".indexOf(value.nodeType) !=-1;
	// }
	
	scope.addNodeUserCondition = function() {
		var url = '/bpm/nodeDef/userConditionDialog.html?defId=' + bpmDefId;
		var passData = {
				nodeList:scope.getNodeList("UserTask,StartNoneEvent,"),
				userConditions:angular.copy(scope.currentSelectedNode.plugins.userAssign.ruleList)
		};
		
		var dialogConf = {
      url:url,
      passData: passData ,
      btnAlign: 'l',
      title: "人员条件配置",
      width: "1000",
      height: "100%",
      modal: true,
      offset: 'rb',
      resizable : false,
      move: false,
      ok: function(index,innerWindow){
        var data = innerWindow.getData();
        if (!data) return;

        scope.$apply(function() {
          scope.currentSelectedNode.plugins.userAssign.ruleList = data;
        });
        innerWindow.parent.layer.close(index);
      }
		};
		
		jQuery.Dialog.open(dialogConf);
	};

  scope.getNodeList = function (typeFilter) {
    var nodeList = [];
    for (var nodeId in scope.bpmDefSetting.nodeMap) {
      var node = scope.bpmDefSetting.nodeMap[nodeId];

      if (typeFilter) {
        if (typeFilter.indexOf(node.nodeType) === -1) continue;
      }

      var n = {nodeId: node.nodeId, nodeName: node.nodeName || nodeId, nodeType: node.nodeType};
      nodeList.push(n);
    }

    return nodeList;
  }

}];