var app = angular.module("app", ['base', 'baseDirective']);
app.controller('ctrl', ['$scope', 'baseService', 'ArrayToolService', function ($scope, baseService, ArrayToolService) {
  $scope.ArrayTool = ArrayToolService;

  // 授权类型：必填、编辑、只读、隐藏
  $scope.rights_keys = [];
  $scope.isCascade = true;

  $scope.init = function () {
    ToolsController.getEnum("cn.gwssi.ecloudbpm.bus.api.constant.BusinessPermissionObjType").then(function (data) {
      $scope.$apply(function () {
        $scope.BusinessPermissionObjType = data;
        angular.forEach(data, function (val, key) {
          if (val.key === $.getParameter("objType")) {
            $scope.objName = val.desc;// 不入库的
          }
        });
      });
    });

    ToolsController.getEnum("cn.gwssi.ecloudbpm.bus.api.constant.BusTableRelType").then(function (data) {
      $scope.$apply(function () {
        $scope.BusTableRelType = data;
      });
      $scope.BusTableRelTypeKeyMap = {};
      angular.forEach(data, function (val) {
        $scope.BusTableRelTypeKeyMap[val.key] = val;
      });
    });

    ToolsController.getEnum("cn.gwssi.ecloudbpm.bus.api.constant.RightsType", true).then(function (data) {
      $scope.$apply(function () {
        $scope.RightsTypeList = data;
        for (let item of data) {
          $scope.rights_keys.push(item.key);
        }
      });
    });

    $scope.finalData = {};
    $scope.isBoLoad = false;

    // 加载 BO
    $scope.initBo($.getParameter("boKeys"));
  };

  // 初始化data
  $scope.initData = function () {
    $scope.data = {};
    $scope.data.busObjMap = {}
    $scope.data.objType = $.getParameter("objType");
    $scope.data.objVal = $.getParameter("objVal");
  };

  // 加载完 boObject 的回调，初始化 checked 属性
  $scope.$on("afterLoadEvent", function (event, data) {
    $scope.initBoObject();
  });

  /**
   * 初始化 BO
   */
  $scope.initBo = function (boKeys) {
    var url = __ctx + "/bus/businessPermission/getBo";
    var defer = baseService.postForm(url, {
      boKeys: boKeys
    });

    $.getResultData(defer, function (data) {
      $scope.boMap = data;

      angular.forEach(data, function (val, key) {
        var allRelations = [];
        TraverseTreeUtil.traverse(val.relation, "children", function (node) {
          allRelations.push(node);
        });
        val.allRelations = allRelations;
      });

      $scope.isBoLoad = true;
    }, null, true);
  };

  /**
   * 初始化 boObject
   */
  $scope.initBoObject = function () {
    if (!AngularUtil.isEmpty($scope.data)) {
      delete $scope.data.busObjMapJson;
      $scope.initBoObjectCheck();
    } else {

      // 返回的 boObject 可能为空，此时复制属性
      // 有可能 bo 此时还没有处理完毕，等处理完再复制
      let interval = setInterval(function() {
        if ($scope.isBoLoad) {
          clearInterval(interval);

          $scope.copyBo2BoObject();
          $scope.initBoObjectCheck();
          $scope.$apply();
        }
      }, 10);
    }
  };

  /**
   * 复制 bo 相关属性到 boObject
   */
  $scope.copyBo2BoObject = function () {
    $scope.initData();
    angular.forEach($scope.boMap, function (bo, key) {
      var busObj = {};
      busObj.key = bo.key;
      busObj.name = bo.name;
      busObj.rights = {
        w: [{
          type: "everyone",
          desc: "所有人"
        }]
      };

      // 初始化tableMap
      busObj.tableMap = {};
      angular.forEach(bo.allRelations, function (relation) {
        var table = {};
        table.key = relation.tableKey;
        table.comment = relation.tableComment;
        table.rights = {};

        // 初始化 columnMap
        table.columnMap = {};
        angular.forEach(relation.table.columnsWithoutPk, function (item) {
          var column = {};
          column.key = item.key;
          column.comment = item.comment;
          column.rights = {};
          table.columnMap[column.key] = column;
        });

        busObj.tableMap[table.key] = table;
      });

      $scope.data.busObjMap[key] = busObj;
    });
  };

  /**
   *  初始化 boObject 的 checked 属性
   */
  $scope.initBoObjectCheck = function () {
    angular.forEach($scope.data.busObjMap, function (busObj, bo_key) {
      busObj.checked = {};
      for (let item_key of $scope.rights_keys) {
        let isChecked = $scope.isEveryOne(item_key, bo_key);
        busObj.checked[item_key] = isChecked || false;
      }

      angular.forEach(busObj.tableMap, function (tableObj, table_key) {
        tableObj.checked = {};
        for (let item_key of $scope.rights_keys) {
          let isChecked = $scope.isEveryOne(item_key, bo_key, table_key);
          tableObj.checked[item_key] = isChecked || false;
        }

        // 对于【级联】，强制【字段】继承【表】的设置，强制清空 rights
        if ($scope.isCascade) {
          angular.forEach(tableObj.columnMap, function (columnObj, column_key) {
            columnObj.checked = CloneUtil.deep(tableObj.checked);
            // columnObj.rights = {};
          });
        } else {

          // 对于【非级联】，【字段】计算设置
          angular.forEach(tableObj.columnMap, function (columnObj, column_key) {
            columnObj.checked = {};
            for (let item_key of $scope.rights_keys) {
              let isChecked = $scope.isEveryOne(item_key, bo_key, table_key, column_key);
              columnObj.checked[item_key] = isChecked || false;
            }
          });
        }
      });
    });
  };

  /***************************************************页面初始化结束***************************************************/
  /***************************************************页面渲染开始***************************************************/

  /**
   * 判断编辑按钮是否禁用
   */
  $scope.isDisable = function (checked, type, isNotField) {
    if ($scope.isCascade && !isNotField) return true;

    if (!checked || type === 'b') return false;

    if (type === 'w') {
      return checked.b;
    }

    if (type === 'r') {
      return checked.b || checked.w;
    }

    return checked.b || checked.w || checked.r;
  };

  /**
   * 获取权限的描述
   */
  $scope.getRightsDesc = function (rights, isNotField) {
    // if (!rights || ($scope.isCascade && !isNotField)) {
    if (!rights || $scope.isCascade) {
      return "";
    }
    if (rights.length === 1 && (rights[0].type === "everyone" || rights[0].type === "none")) {
      return "";
    }

    var desc = "";
    angular.forEach(rights, function (item) {
      if (desc) {
        desc = desc + " 和 ";
      }
      desc = desc + item.desc;
    });
    return desc;
  };

  /**
   * 判断是否选中所有人
   * 如果为【所有人】，直接选中；
   * 如果为【未配置】，向上查找
   */
  $scope.isEveryOne = function (item_key, bo_key, table_key, column_key) {
    let length = arguments.length;
    let bo_rights = $scope.data.busObjMap[bo_key].rights[item_key];
    let rights = {}, table_rights = {}, table_rights_ = {}, column_rights = {}, column_rights_ = {};

    if (length === 2) {
      rights = bo_rights;
    } else {
      table_rights = $scope.data.busObjMap[bo_key].tableMap[table_key].rights;
      table_rights_ = table_rights[item_key];

      if (length === 3) {
        rights = table_rights_ ? table_rights_ : ($scope.otherHasEveryone(table_rights, item_key) ? null : bo_rights);
      } else if (length === 4) {
        column_rights = $scope.data.busObjMap[bo_key].tableMap[table_key].columnMap[column_key].rights;
        column_rights_ = column_rights[item_key];
        rights = column_rights_ ? column_rights_ : (($scope.otherHasEveryone(column_rights, item_key)) ? null : (!AngularUtil.isEmpty(table_rights) ? table_rights_ : bo_rights))

        // if (column_rights_) {
        //   rights = column_rights_;
        // } else {
        //   if ($scope.otherHasEveryone(column_rights, item_key)) {
        //     return false;
        //   } else {
        //     rights = !AngularUtil.isEmpty(table_rights) ? table_rights_ : bo_rights;
        //   }
        // }
      }
    }

    return rights && rights.length === 1 && rights[0].type === 'everyone';
  };

  /**
   * 判断其它选项，是否已有权限
   */
  $scope.otherHasEveryone = function (rights, item_key) {
    let other_has = false;
    if (!AngularUtil.isEmpty(rights)) {

      angular.forEach(rights, function (item, key) {
        if (key !== item_key && item.type !== "none") {
          other_has = true;
          return false;
        }
      });
    }

    return other_has;
  };

  /***************************************************页面渲染结束***************************************************/
  /***************************************************页面设置开始***************************************************/

  /**
   * 切换是否显示字段
   */
  $scope.toggleShowFields = function (table) {
    table.hideFields = !table.hideFields;
  };

  /**
   * 设置为【所有人】
   */
  $scope.setEveryOne = function (obj, key, needRefresh, isNotField) {
    // 如果为【级联】，【字段】必须继承【表】，不能独立设置
    if ($scope.isCascade && !isNotField) {
      $.Dialog.warning("级联时字段不能单独设置！");
      return;
    }

    // 设置 rights
    let rights = obj.rights;
    rights[key] = [{
      type: "everyone"
    }];

    angular.forEach(rights, function (item, item_key) {
      if (item_key !== key) {
        rights[item_key] = [{
          type: "none"
        }];
      }
    });

    // 设置 checked
    let checked = obj.checked || {};
    checked[key] = true;
    for (let item_key of $scope.rights_keys) {
      if (item_key !== key) {
        checked[item_key] = false;
      }
    }

    // 刷新 checked 字段
    if (needRefresh) {
      $scope.initBoObjectCheck();
    }
  };

  /**
   * 打开权限对话框
   */
  $scope.openRightsDialog = function (obj, key, needRefresh) {
    let rights = obj.rights;
    let checked = obj.checked || {};

    $.Dialog.open({
      url: "/bus/businessPermission/rightsDialog.html",
      width: 800,
      height: 600,
      title: "权限配置",
      topOpen: true,
      passData: angular.copy(rights[key]),
      ok: function (index, innerWindow) {
        var data = innerWindow.getData();
        $scope.$apply(function () {
          rights[key] = data;
          checked[key] = false;

          // 刷新 checked 字段
          if (needRefresh) {
            $scope.initBoObjectCheck();
          }
        });

        $.Dialog.close(innerWindow);
      }
    });
  };

  /**
   * 是否级联
   */
  $scope.toggleCascade = function ($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.isCascade = !$scope.isCascade;
    $scope.initBoObjectCheck();
  };

  /***************************************************页面设置结束***************************************************/

  /**
   * 保存之前的回调----去掉所有 checked 属性
   */
  $scope.$on("beforeSaveEvent", function (event, data) {
    $scope.finalData = CloneUtil.deep($scope.data);
    angular.forEach($scope.finalData.busObjMap, function (busObj, bo_key) {
      delete busObj.checked;

      angular.forEach(busObj.tableMap, function (tableObj, table_key) {
        delete tableObj.checked;

        angular.forEach(tableObj.columnMap, function (columnObj, column_key) {
          delete columnObj.checked;

          if ($scope.isCascade) {
            delete columnObj.rights;
          }
        });
      });
    });
  });

  // /**
  //  * 保存之后，关闭窗口
  //  */
  // $scope.$on("afterSaveEvent", function (event, data) {
  //   $.Dialog.close();
  // });

  /**
   * 关闭弹出框
   */
  $scope.closeWindow = function () {
    $.Dialog.close();
  };

}]);
