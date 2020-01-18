var app = angular.module("app", ['base', 'baseDirective', 'ui.codemirror']);
app.controller('userConditionCtrl', ['$scope', 'baseService', 'ArrayToolService', '$rootScope', function ($scope, baseService, ArrayToolService, $rootScope) {
  $scope.ArrayTool = ArrayToolService;
  $scope.selectedIndex = -1;
  $scope.userConditions = [];
  $scope.flowKey = $.getParam("flowKey");
  $scope.defId = $.getParam("defId");
  $scope.nodeId = $.getParam("nodeId");

  if (window.passData) {
    $scope.userConditions = window.passData.userConditions;
    $scope.nodeList = window.passData.nodeList;
  }

  var post = ToolsController.getInterFaceImpls("cn.gwssi.ecloudbpm.bpm.api.engine.plugin.context.UserCalcPluginContext").then(function (data) {
    $scope.$apply(function () {
      $scope.nodeUserPluginList = data;
    })
  });

  $scope.$watch("selectedIndex", function (newValue, oldValue) {
    $scope.userCondition = (newValue === -1) ? {calcs: [], rule: ""} : $scope.userConditions[$scope.selectedIndex];
  });

  $scope.toggleCondition = function (index) {
    $scope.selectedIndex = index;
  };

  $scope.addCondition = function () {
    let newCondition = {calcs: [], rule: ""};
    $scope.userConditions.push(newCondition);
    $scope.selectedIndex = $scope.userConditions.length - 1;
  };

  $scope.moveUp = function () {
    if ($scope.selectedIndex <= 0) {
      return;
    }
    $scope.ArrayTool.up($scope.selectedIndex, $scope.userConditions);
    $scope.selectedIndex--;
  };

  $scope.moveDown = function () {
    if ($scope.selectedIndex < 0 || $scope.selectedIndex === $scope.userConditions.length - 1) {
      return;
    }
    $scope.ArrayTool.down($scope.selectedIndex, $scope.userConditions);
    $scope.selectedIndex++;
  };

  $scope.moveDel = function () {
    if ($scope.selectedIndex < 0) {
      return;
    }
    $scope.ArrayTool.del($scope.selectedIndex, $scope.userConditions);
    $scope.selectedIndex = -1;
  };

  $scope.addCalc = function () {
    if ($scope.selectedIndex === -1) return;

    $scope.userCondition.calcs.push({
      pluginType: "user",
      extract: "no",
      logicCal: "or",
      source: "start",
      vars: "",
      description: "发起人"
    });
  };

  /**
   * 点击选择按钮处理，这里使用动态调用对话框。
   * 选择器命名修改成：
   * pluginType +Selector,参数为：calc 对象。
   */
  $scope.selector = function (calc) {
    eval(calc.pluginType + "Selector(calc);");
  };

  $scope.preview = function () {
    var passConf = getuserConditionData();
    var callback = function (data, dialog) {
      dialog.dialog('close');
    };
    DialogUtil.openDialog(__ctx + "/flow/node/condition/preview", "预览", passConf, callback);
  };

  $scope.calcTypeChange = function (calc) {
    calc.description = "";
  };

  function openCalcDialog(calc, conf) {
    conf.ok = function (index, innerWindow) {
      var data = innerWindow.getData();
      if (!data) return;

      $scope.$apply(function () {
        jQuery.extend(calc, conf.passData);
        !$rootScope.$$phase && $rootScope.$digest();
      });
      innerWindow.parent.layer.close(index);
    };
    conf.topOpen = true;

    $.Dialog.open(conf);
  }


  /**
   * 以下代码是可以扩展部分。
   */
  function userSelector(calc) {
    var conf = {
      height: 600, width: 800,
      url: "/bpm/nodeDef/userSelector.html",
      title: "选择用户",
      topOpen: true,
      passData: angular.copy(calc)
    };
    conf.ok = function (index, innerWindow) {
      var data = innerWindow.getResult();
      if (!data) return;
      jQuery.extend(calc, data);
      !$rootScope.$$phase && $rootScope.$digest();
      $.Dialog.close(innerWindow);
    };
    $.Dialog.open(conf);
  }

  function groupSelector(calc) {
    var conf = {
      height: 300, width: 600,
      url: "/bpm/nodeDef/groupSelector.html",
      title: "选择组",
      topOpen: true,
      passData: angular.copy(calc)
    };
    conf.ok = function (index, innerWindow) {
      var data = innerWindow.getResult();
      if (!data) return;
      jQuery.extend(calc, data);
      !$rootScope.$$phase && $rootScope.$digest();
      $.Dialog.close(innerWindow);
    };
    $.Dialog.open(conf);
  }

  function scriptSelector(calc) {
    var url = '/bpm/definition/definitionScriptDialog.html?defId=' + $scope.defId + '&nodeId=' + $scope.nodeId;
    var passData = {script: calc.script, desc: calc.description || "", notice: "此脚本返回人员集合 Set<SysIdentity>"};

    $.Dialog.open({
      url: url,
      passData: passData,
      btnAlign: 'l',
      title: "事件脚本设置" + nodeId,
      width: "700",
      height: "100%",
      modal: true,
      offset: 'rb',
      resizable: false,
      move: false,
      topOpen: true,
      ok: function (index, innerWindow) {
        var script = innerWindow.getData();
        var desc = innerWindow.getDesc();
        $scope.$apply(function () {
          calc.script = script;
          calc.description = desc;
        });
        innerWindow.parent.layer.close(index);
      }
    });
  }

  var logicCalc = {or: "或", and: "且", exclude: "排除掉"};
  $scope.saveModel = function () {
    if ($scope.selectedIndex < 0) {
      return;
    }

    var userCondition = $scope.userCondition;
    var description = "";
    if (userCondition.calcs.length === 0) {
      jQuery.Dialog.warning("请完善人员配置！");
      return false;
    }

    for (var i = 0, calc; calc = userCondition.calcs[i++];) {
      if (calc.nodeId && !calc.description) {
        calc.description = calc.nodeId
      }

      if (!calc.description && calc.pluginType !== 'approver') {
        jQuery.Dialog.warning("请完善人员配置！");
        return false;
      }
      if (calc.logicCal && i !== 1) description += logicCalc[calc.logicCal];
      else description += "  ";
      description += "[" + $("#select" + (i - 1) + " option:selected").text() + "]" + calc.description + ";\n";
    }
    userCondition.description = description;
    return userCondition;
  };

}]);

function getData() {
  let isLegal = true;

  let userConditions = AngularUtil.getScope().userConditions;
  userConditions.forEach((item, index) => {
    if (item.calcs.length === 0) {
      jQuery.Dialog.warning("请完善第 " + (index + 1) + " 个人员配置！");
      isLegal = false;
      return false;
    }
  });

  return isLegal ? userConditions : false;
}
