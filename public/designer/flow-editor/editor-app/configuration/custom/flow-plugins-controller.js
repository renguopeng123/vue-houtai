var FlowPluginsController = ['$scope', 'baseService', 'ArrayToolService', 'nodeDefService', function (scope, baseService, ArrayToolService, nodeDefService) {
  scope.ArrayTool = ArrayToolService;
  scope.currentNodeName = "";

  // scope.pluginList = [
    // {name: '节点跳转规则', pluginKey: "ruleSkip", key: "node-rules", supprotType: 'UserTask'},
    // {name: '事件脚本设置', pluginKey: "nodeScript", key: "event-script", supprotType: 'UserTask,StartNoneEvent,EndNoneEvent'},
    /*{name: '多实例会签', pluginKey: "signTask", key: "sign-config", supprotType: 'UserTask'},*/
    // 自动任务设置---- agileBPM 目前没有实现
    // {name: '自动任务设置', pluginKey: "", key: "auto-service", supprotType: 'serviceTask'},
    // 催办设置---- agileBPM 目前没有实现
    // {name:'催办设置',	pluginKey:"",	key:"task-reminder",	 supprotType:'UserTask'},
    // {name: '流程节点自动跳过', pluginKey: "taskSkip", key: "task-skip", supprotType: 'Global'},
    // {name: '子流程设置', pluginKey: "", key: "call-activity", supprotType: 'CallActivity'}
  // ];

  scope.scriptMsg = {
    taskCreate: "任务创建时候执行，可以使用[variableScope]操作流程变量,eg:variableScope.setVariable(\"total\", 100);等",
    taskComplete: "任务完成时候执行，可以使用[variableScope]操作变量,eg:variableScope.setVariable(\"total\", 100);等",
    startEvent: "该脚本在流程启动时执行，用户可以使用[variableScope]操作变量， 例如设置流程变量:variableScope.setVariable(\"total\", 100);",
    endEvent: "该脚本在流程终止时执行",
    manualEnd: "该脚本在流程人工终止时执行"
  };

  scope.$watch("selectedItem.nodeId", function (newValue, oldValue) {
    scope.currentSelectedNode = scope.bpmDefSetting.nodeMap[newValue];
    scope.currentSelectedNodePlugins = scope.currentSelectedNode.plugins;
    scope.currentNodeName = scope.currentSelectedNode.nodeName;

    if (!scope.currentSelectedNodePlugins.signTask) {
      scope.currentSelectedNodePlugins.signTask = {
        signMultiTask: false,
        voteType: "PERCENT",
        needAllSign: false,
        voteAmount: 51,
        opposedAction: "oppose"
      };
    }

    if (!scope.currentSelectedNodePlugins.ruleSkip) {
      scope.currentSelectedNodePlugins.ruleSkip = [];
    }

    if (!scope.currentSelectedNodePlugins.nodeScript) {
      scope.currentSelectedNodePlugins.nodeScript = {};
    }
  });

  /**
   * 是否有权限
   */
  scope.pluginHasPermission = function (pluginKey, nodeType) {
    if (nodeType.indexOf(scope.selectedItem.nodeType) === -1) return false;
    if (!pluginKey) return true;
    if (!scope.permissionPlugins) return false;

    for (var i = 0, plugin; plugin = scope.permissionPlugins[i++];) {
      if (plugin.type === pluginKey) {
        return true;
      }
    }
    return false;
  };

  /**
   * 跳转规则设置
   */
  scope.editRuleSkip = function (index) {
    var btns = (index > -1) ? ["确定", "取消", "删除"] : true;
    var url = '/bpm/nodeDef/jumpRuleDialog.html?defId=' + bpmDefId;
    var rule = (index > -1) ? angular.copy(scope.currentSelectedNodePlugins.ruleSkip[index]) : {};
    var passData = {
      rule: rule,
      nodeMap: scope.bpmDefSetting.nodeMap
    };

    showDialog({
      url: url,
      btn: btns,
      passData: passData,
      btnAlign: 'l',
      title: "跳转规则配置——" + scope.currentNodeName,
      width: "600",
      height: "100%",
      modal: true,
      offset: 'rb',
      resizable: false,
      move: false,
      ok: function (layerIndex, innerWindow) {
        var data = innerWindow.getData();
        if (!data) return;

        scope.$apply(function () {
          if (index > -1) {
            scope.currentSelectedNodePlugins.ruleSkip[index] = data;
          } else {
            scope.currentSelectedNodePlugins.ruleSkip.push(data);
          }
        });

        layer.close(layerIndex);
      },
      btn3: function (layerIndex) {
        jQuery.Dialog.confirm("提示", "确定要删除吗？", function() {
          scope.$apply(function () {
            scope.ArrayTool.del(index, scope.currentSelectedNodePlugins.ruleSkip);
          });

          layer.close(layerIndex);
        });
      }
    });
  };

  /**
   * 事件脚本设置
   */
  scope.editEventScript = function (key) {
    var url = '/bpm/definition/definitionScriptDialog.html?defId=' + bpmDefId + '&nodeId=' + scope.selectedItem.nodeId;
    var passData = {
      script: scope.currentSelectedNodePlugins.nodeScript[key],
      notice: scope.scriptMsg[key]
    };

    showDialog({
      url: url,
      passData: passData,
      btnAlign: 'l',
      title: "事件脚本设置——" + scope.currentNodeName,
      width: "700",
      height: "100%",
      modal: true,
      offset: 'rb',
      resizable: false,
      move: false,
      ok: function (index, innerWindow) {
        var script = innerWindow.getData();
        scope.$apply(function () {
          scope.currentSelectedNodePlugins.nodeScript[key] = script;
        });

        layer.close(index);
      }
    });
  };

  /**
   * 外部子流程设置
   */
  scope.selectBpmDef = function () {
    CustUtil.openCustDialog("bpmDefSelector", {}, function (arrData, innerWindow) {
      scope.$apply(function () {
        scope.currentSelectedNode.childActivityName = arrData[0].name;
        scope.currentSelectedNode.childActivityKey = arrData[0].key;

        //设置到 activiti 配置中
        for (var i = 0, prop; prop = scope.selectedItem.properties[i++];) {
          //自行设置节点名字
          /*if(prop.key === 'oryx-name'){
            prop.value = arrData[0].name;
            scope.$parent.updatePropertyInModel(prop)
            break;
          }*/

          if (prop.key === 'oryx-callactivitycalledelement') {
            prop.value = arrData[0].key;
            scope.updatePropertyInModel(prop);
            break;
          }
        }
      });

      jQuery.Dialog.close(innerWindow);
    })
  };

}];