var app = angular.module('app', ['baseDirective', 'ui.codemirror']);
app.controller("ctrl", ['$scope', 'baseService', 'ArrayToolService', function (scope, baseService, ArrayToolService) {
  scope.ArrayTool = ArrayToolService;
  scope.defId = $.getParam("defId");

  if (window.passData) {
    scope.nodeMessage = window.passData.nodeMessage;
    scope.nodeList = window.passData.nodeList;
    scope.eventList = window.passData.eventList;
  }
  if (!scope.nodeMessage || !scope.nodeMessage.desc) {
    scope.nodeMessage = {userRules: []};
  }

  scope.addNodeUserCondition = function () {
    // var userCondition = {calcs: [], rule: ""};
    // if (i != undefined) {
    //   userCondition = angular.copy(scope.nodeMessage.userRules[i]);
    // }

    var passData = {
      nodeList: scope.nodeList,
      userConditions: angular.copy(scope.nodeMessage.userRules || [])
    };
    var url = '/bpm/nodeDef/userConditionDialog.html?defId=' + scope.defId;

    var dialogConf = {
      url: url,
      passData: passData,
      btnAlign: 'l',
      title: "人员条件配置",
      width: "1000",
      height: "100%",
      modal: true,
      offset: 'rb',
      resizable: false,
      move: false,
      topOpen: true,
      ok: function (index, innerWindow) {
        var data = innerWindow.getData();
        if (!data) return;

        scope.$apply(function () {
          scope.nodeMessage.userRules = data;
        });

        jQuery.Dialog.close(innerWindow);
      }
    };

    jQuery.Dialog.open(dialogConf);
  };

}]);

function getData() {
  if (!AngularUtil.getScope().form.$valid) {
    $.Dialog.warning("表单校验未通过！");
    return false;
  }

  return AngularUtil.getScope().nodeMessage;
}