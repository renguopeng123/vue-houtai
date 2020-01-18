var app = angular.module('app', ['baseDirective', 'ui.codemirror']);
app.controller("ctrl", ['$scope', 'baseService', 'ArrayToolService', function (scope, baseService, ArrayToolService) {
  scope.ArrayTool = ArrayToolService;

  scope.defId = $.getParam("defId");
  scope.nodeId = $.getParam("nodeId");
  scope.selectedIndex = -1;
  if (window.passData) {
    scope.nodeList = passData.nodeList;
    scope.nodeInitList = passData.nodeInitList;
  }

  // 用户任务的节点列表，list 类型转为 map 类型，方便左边显示为 nodeName
  scope.nodeMap = {};
  for (let item of scope.nodeList) {
    scope.nodeMap[item.nodeId] = item.nodeName;
  }

  scope.$watch("selectedIndex", function(newValue, oldValue) {
    scope.nodeInit = (newValue === -1) ? {} : scope.nodeInitList[scope.selectedIndex];
  });
  
  scope.toggleNode = function (index) {
    scope.selectedIndex = index;
  };

  scope.addNode = function () {
    let newNode = {};
    scope.nodeInitList.push(newNode);
    scope.selectedIndex = scope.nodeInitList.length - 1;
  };

  scope.moveUp = function () {
    if (scope.selectedIndex <= 0) {
      return;
    }
    scope.ArrayTool.up(scope.selectedIndex, scope.nodeInitList);
    scope.selectedIndex --;
  };

  scope.moveDown = function () {
    if (scope.selectedIndex < 0 || scope.selectedIndex === scope.nodeInitList.length - 1) {
      return;
    }
    scope.ArrayTool.down(scope.selectedIndex, scope.nodeInitList);
    scope.selectedIndex ++;
  };

  scope.moveDel = function () {
    if (scope.selectedIndex < 0) {
      return;
    }
    scope.ArrayTool.del(scope.selectedIndex, scope.nodeInitList);
    scope.selectedIndex = -1;
  };

  scope.saveModel = function () {
    if (scope.selectedIndex < 0) {
      return;
    }

    if (!scope.form.$valid) {
      $.Dialog.warning("表单校验未通过！");
      return false;
    }

    scope.nodeInitList[scope.selectedIndex] = scope.nodeInit;
  };

}]);

function getData() {
  let isLegal = true;

  let nodeList = AngularUtil.getScope().nodeInitList;
  nodeList.forEach((item, index) => {
    if (AngularUtil.isEmpty(item)) {
      jQuery.Dialog.warning("请完善第 " + (index + 1) + " 个配置！");
      isLegal = false;
      return false;
    }
  });

  return isLegal ? nodeList : false;
}