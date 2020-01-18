var app = angular.module('app', ['baseDirective', 'ui.codemirror']);
app.controller("ctrl", ['$scope', 'baseService', 'ArrayToolService', function (scope, baseService, ArrayToolService) {
  scope.ArrayTool = ArrayToolService;
  scope.defId = $.getParam("defId");

  scope.selectedIndex = -1;
  if (window.passData) {
    scope.reminderList = window.passData.reminderList || [];
    scope.nodeList = window.passData.nodeList;
  }

  scope.$watch("selectedIndex", function (newValue, oldValue) {
    scope.reminder = (newValue === -1) ? {} : scope.reminderList[scope.selectedIndex];
  });

  scope.toggleNode = function (index) {
    scope.selectedIndex = index;
  };

  scope.addNode = function () {
    let newNode = {
      timeLimit: 60 * 24 * 3,
      maxReminderTimes: 1,
      reminderCycle: 60 * 24 * 1,
      isCalcWorkDay: true,
      isUrgent: true,
      msgType: "email",
      htmlTemplate: "您好，请您尽快处理任务：${bpmInstance.subject} ！",
      textTemplate: "您好，请您尽快处理任务：${bpmInstance.subject} ！"
    };
    scope.reminderList.push(newNode);
    scope.selectedIndex = scope.reminderList.length - 1;
  };

  scope.moveUp = function () {
    if (scope.selectedIndex <= 0) {
      return;
    }
    scope.ArrayTool.up(scope.selectedIndex, scope.reminderList);
    scope.selectedIndex--;
  };

  scope.moveDown = function () {
    if (scope.selectedIndex < 0 || scope.selectedIndex === scope.reminderList.length - 1) {
      return;
    }
    scope.ArrayTool.down(scope.selectedIndex, scope.reminderList);
    scope.selectedIndex++;
  };

  scope.moveDel = function () {
    if (scope.selectedIndex < 0) {
      return;
    }
    scope.ArrayTool.del(scope.selectedIndex, scope.reminderList);
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

    scope.reminderList[scope.selectedIndex] = scope.reminder;
  };

}]);

app.directive('abTimes', [function () {
  return {
    restrict: 'A',
    scope: true,
    require: "ngModel",
    link: function (scope, element, attrs, ctrl) {
      scope.hourArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
      scope.minuteArr = [0, 1, 2, 3, 4, 5, 10, 15, 20, 30, 40, 50];
      ctrl.$formatters.push(function (time) {
        if (typeof time === 'undefined' || Number.isNaN(time)) return;

        scope.day = Math.floor(time / (60 * 24));
        scope.hour = Math.floor((time - scope.day * (60 * 24)) / 60);
        scope.minute = time - scope.day * (60 * 24) - scope.hour * 60;
      });

      $("[ng-model]", element).change(function () {
        var modelValue = 0;
        modelValue += parseInt(60 * 24 * scope.day);
        modelValue += parseInt(60 * scope.hour);
        modelValue += parseInt(scope.minute);
        if (modelValue === 0) modelValue = "";
        ctrl.$setViewValue(modelValue);
        ctrl.$render();
      });

      scope.reset = function () {
        scope.day = 0;
        scope.hour = 0;
        scope.minute = 0;
      };

      scope.reset();
    },
    template: '	<input type="text" ng-model="day" class="form-control" style="width: 80px;" placeholder="天数" ht-validate="{number:true}"/>天\
						<select ng-model="hour" class="form-control" style="width: 100px;" ng-options="hour as (hour+\'小时\') for hour in hourArr">\
						</select>小时\
						<select ng-model="minute" class="form-control" style="width: 80px;" ng-options="minute as (minute+\'分\') for minute in minuteArr">\
						</select>分\
					  '
  };
}]);

function getData() {
  let isLegal = true;

  let reminderList = AngularUtil.getScope().reminderList;
  reminderList.forEach((item, index) => {
    if (AngularUtil.isEmpty(item)) {
      jQuery.Dialog.warning("请完善第 " + (index + 1) + " 个配置！");
      isLegal = false;
      return false;
    }
  });

  return isLegal ? reminderList : false;
}