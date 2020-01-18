var FlowConfController = ['$scope', 'nodeDefService', 'ArrayToolService', 'baseService', function (scope, nodeDefService, ArrayToolService, baseService) {
  scope.ArrayTool = ArrayToolService;
  // var v = scope.$root.pjv;
  // if (v == "blacklist") {
  //   return
  // };
  if (!scope.bpmDefSetting.flow) {
    scope.bpmDefSetting.flow = {globalForm: {type: 'inner'}, instForm: {type: 'inner'}};
  }
  if (!scope.bpmDefSetting.flow.properties) {
    scope.bpmDefSetting.flow.properties = {
      allowExecutorEmpty: true,
      logSubmitData: true,
      status: "draft",
      subjectRule: "{发起人:startorName}在{发起时间:startDate}发起{流程标题:title}",
      supportMobile: 0
    }
  }

  scope.properties = scope.bpmDefSetting.flow.properties;

  //数据模型
  if (!scope.bpmDefSetting.flow.dataModelList) scope.bpmDefSetting.flow.dataModelList = [];
  scope.dataModelList = scope.bpmDefSetting.flow.dataModelList;

  //节点初始化配置
  if (!scope.bpmDefSetting.flow.nodeInitList) scope.bpmDefSetting.flow.nodeInitList = [];
  scope.nodeInitList = scope.bpmDefSetting.flow.nodeInitList;

  if (!scope.bpmDefSetting.flow.variableList) scope.bpmDefSetting.flow.variableList = [];
  scope.variableList = scope.bpmDefSetting.flow.variableList;

  if (!scope.bpmDefSetting.flow.plugins) {
    scope.bpmDefSetting.flow.plugins = {};
  }

  //初始化节点消息
  if (!scope.bpmDefSetting.flow.plugins.nodeMessage) {
    var defaultMsg = "[{\"htmlTemplate\": \"<p>您有新的待办需要审批:${bpmInstance.subject}</p><p>&lt;#if isTask&gt;</p><p>上一节点：${submitTaskname}</p><p>处理人：${currentUser.fullname} ，处理结果 ：${submitActionDesc}</p><p>提交意见：${submitOpinion}</p><p>&lt;/#if&gt;</p>\", \"msgType\": \"email\", \"userRules\": [], \"html\": \"<p>您有新的待办需要审批:{待办标题}</p><p>上一环节：{用户任务1}，{小王} 处理结果&nbsp;：{同意/反对}</p><p>意见：{阿什顿发阿什顿发}</p>\", \"event\": \"postTaskCreate\", \"$$hashKey\": \"04V\", \"desc\": \"任务待办通知\"}, {\"htmlTemplate\": \"<p>您的申请的流程已经审批完结{subject}<br/></p>\", \"msgType\": \"email\", \"userRules\": [{\"rule\": \"\", \"description\": \"  [用户]发起人;\\n\", \"$$hashKey\": \"004\", \"calcs\": [{\"pluginType\": \"user\", \"extract\": \"no\", \"description\": \"发起人\", \"logicCal\": \"or\", \"source\": \"start\", \"vars\": \"\"}]}], \"html\": \"<p>您发起的流程已经完成审批<br/>${bpmInstance.subject}</p>\", \"event\": \"end\", \"$$hashKey\": \"04S\", \"nodeId\": \"\", \"desc\": \"流程结束通知发起人\"}]";
    scope.bpmDefSetting.flow.plugins.nodeMessage = JSON.parse(defaultMsg);
  }
  scope.nodeMessageList = scope.bpmDefSetting.flow.plugins.nodeMessage;

  //催办
  if (!scope.bpmDefSetting.flow.plugins.reminder) {
    scope.bpmDefSetting.flow.plugins.reminder = [];
  }
  scope.reminderList = scope.bpmDefSetting.flow.plugins.reminder;

  //节点自动跳过
  scope.bpmDefSetting.flow.plugins.taskAgency = {};
  if(!scope.bpmDefSetting.flow.plugins.taskSkip) {
    scope.bpmDefSetting.flow.plugins.taskSkip = {skipTypeArr:"firstNodeSkip"};
  }
  scope.taskSkip = scope.bpmDefSetting.flow.plugins.taskSkip;

  // FIXED BY quxb TODO 从后台读取
  //执行时机
  scope.eventList = [
    {
      "key": "postTaskCreate",
      "desc": "任务创建时"
    },{
      "key": "taskComplete",
      "desc": "任务完成时"
    },{
      "key": "startEvent",
      "desc": "流程启动时"
    },{
      "key": "endEvent",
      "desc": "流程结束时"
    },
  ];
  scope.eventMap = {};
  scope.eventList.forEach(function(item) {
    scope.eventMap[item.key] = item.desc;
  });

  //添加业务对象
  scope.addDataModel = function () {
    CustUtil.openCustDialog("busObjectSelect", function (arrData, innerWindow) {
      if (arrData.length === 0) {
        $.Dialog.alert("请至少选择一个业务对象！");
        return;
      }
      if (!scope.dataModelList) {
        scope.dataModelList = [];
      }

      scope.$apply(function () {
        for (var i = 0, m; m = arrData[i++];) {
          var has = false;
          for (var int = 0, dataModel; dataModel = scope.dataModelList[int++];) {
            if (dataModel.code === m.key) {
              has = true;
            }
          }
          if (!has) {
            scope.dataModelList.push({code: m.key, name: m.name});
          }
        }
        scope.loadSubjectVariable();
      })
      jQuery.Dialog.close(innerWindow);
    })
  }

  //删除业务对象
  scope.delDataModel = function (index) {
    if (confirm("请注意！删除会影响流程配置中使用该数据模型的流程脚本、表单等")) {
      scope.ArrayTool.del(index, scope.dataModelList);
    }
  }

  /**
   * 节点表单初始化
   */
  scope.editNodeInit = function () {
    var url = '/bpm/definition/definitionNodeInitDialog.html?defId=' + bpmDefId;
    var passData = {
      nodeList: scope.getNodeList("UserTask,StartNoneEvent"),
      nodeInitList: angular.copy(scope.nodeInitList)
    };

    showDialog({
      url: url,
      passData: passData,
      btnAlign: 'l',
      title: "节点表单初始化配置",
      width: "900",
      height: "100%",
      modal: true,
      offset: 'rb',
      resizable: false,
      move: false,
      ok: function (index, innerWindow) {
        var data = innerWindow.getData();
        if (!data) return;

        scope.$apply(function () {
          scope.bpmDefSetting.flow.nodeInitList = data;
          scope.nodeInitList = scope.bpmDefSetting.flow.nodeInitList; // 对象引用地址已改变，需要重新赋值
        });

        layer.close(index);
      }
    });
  };

  /**
   * 节点通知消息
   */
  scope.editNodeMessage = function (index) {
    var btns = (index > -1) ? ["确定", "取消", "删除"] : true;
    var url = '/bpm/definition/definitionNodeMessageDialog.html?defId=' + bpmDefId;
    var nodeMessage = (index > -1) ? scope.nodeMessageList[index] : {};
    var passData = {
      nodeList: scope.getNodeList("UserTask,,StartNoneEvent,EndNoneEvent"),
      nodeMessage: angular.copy(nodeMessage),
      eventList: angular.copy(scope.eventList)
    };

    showDialog({
      url: url,
      btn: btns,
      passData: passData,
      btnAlign: 'l',
      title: "节点消息配置",
      width: "700",
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
            scope.nodeMessageList[index] = data;
          } else {
            scope.nodeMessageList.push(data);
          }
        });

        layer.close(layerIndex);
      },
      btn3: function (layerIndex) {
        jQuery.Dialog.confirm("提示", "确定要删除吗？", function() {
          scope.$apply(function () {
            scope.ArrayTool.del(index, scope.nodeMessageList);
          });

          layer.close(layerIndex);
        });
      }
    });
  };

  /**
   * 流程变量定义
   */
  scope.editVariable = function (index) {
    var btns = (index > -1) ? ["确定", "取消", "删除"] : true;
    var url = '/bpm/definition/definitionVariableDialog.html?defId=' + bpmDefId;
    var variable = {dataType: "string"};
    if (index > -1) {
      variable = angular.copy(scope.variableList[index]);
      variable.isUpdate = true;
    }
    var passData = {
      variable: variable,
      variableList: scope.variableList
    };

    showDialog({
      url: url,
      btn: btns,
      passData: passData,
      btnAlign: 'l',
      title: "流程变量定义",
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
            scope.variableList[index] = data;
          } else {
            scope.variableList.push(data);
          }
        });

        layer.close(layerIndex);
      },
      btn3: function (layerIndex) {
        jQuery.Dialog.confirm("提示", "确定要删除吗？", function() {
          scope.$apply(function () {
            scope.ArrayTool.del(index, scope.variableList);
          });

          layer.close(layerIndex);
        });
      }
    });
  };

  /**
   * 催办设置
   */
  scope.editReminder = function () {
    var url = '/bpm/definition/taskReminderConfigDialog.html?defId=' + bpmDefId;
    var passData = {
      nodeList: scope.getNodeList("UserTask"),
      reminderList: angular.copy(scope.reminderList)
    };

    showDialog({
      url: url,
      passData: passData,
      btnAlign: 'l',
      title: "任务催办配置",
      width: "1000",
      height: "100%",
      modal: true,
      offset: 'rb',
      resizable: false,
      move: false,
      ok: function (layerIndex, innerWindow) {
        var data = innerWindow.getData();
        if (!data) return;

        scope.$apply(function () {
          scope.bpmDefSetting.flow.plugins.reminder = data;
          scope.reminderList = scope.bpmDefSetting.flow.plugins.reminder;
        });

        layer.close(layerIndex);
      }
    });
  };

  //typeFilter type1,type2,
  scope.getNodeList = function (typeFilter) {
    var nodeList = [];
    for (var nodeId in scope.bpmDefSetting.nodeMap) {
      var node = scope.bpmDefSetting.nodeMap[nodeId];

      if (typeFilter) {
        if (typeFilter.indexOf(node.nodeType) == -1) continue;
      }

      var n = {nodeId: node.nodeId, nodeName: node.nodeName || nodeId, nodeType: node.nodeType};
      nodeList.push(n);
    }
    return nodeList;
  };

  scope.loadSubjectVariable = function () {
    var boCodes = scope.getBoCodes();
    if (!boCodes) {
      return;
    }

    var post = baseService.get(__ctx + "/bpm/processDef/getSubjectVariable?defId=" + bpmDefId + "&boCodes=" + boCodes);
    post.then(function (data) {
      scope.subjectVariables = data;
    })
  };

  scope.setSubject = function () {
    scope.properties.subjectRule = scope.properties.subjectRule + "{" + this.subjectVar.name + ":" + this.subjectVar.key + "}";
    this.subjectVar = "";
  }

  scope.getBoCodes = function () {
    var boCodes = "";
    for (var i = 0, dm; dm = scope.dataModelList[i++];) {
      if (boCodes) {
        boCodes = boCodes + ","
      }
      ;
      boCodes = boCodes + dm.code;
    }
    return boCodes;
  }
  scope.loadSubjectVariable();

  scope.pluginHasPermission = function (pluginKey) {
    if (!pluginKey) return true;
    if (!scope.permissionPlugins) return false;

    for (var i = 0, plugin; plugin = scope.permissionPlugins[i++];) {
      if (plugin.type === pluginKey) {
        return true;
      }
    }
    return false;
  }

}];