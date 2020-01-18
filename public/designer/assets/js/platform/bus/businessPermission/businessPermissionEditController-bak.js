var app = angular.module("app", [ 'base', 'baseDirective', 'ui.codemirror' ]);
app.controller('ctrl', [ '$scope', 'baseService', 'ArrayToolService', '$filter', function($scope, baseService, ArrayToolService, $filter) {
	$scope.ArrayTool = ArrayToolService;
	var filter = $filter('filter');
	$scope.collapse = {};
  initCurrentAuth();  // 初始化当前授权

	$scope.init = function() {
		ToolsController.getEnum("cn.gwssi.ecloudbpm.bus.api.constant.BusinessPermissionObjType").then(function(data) {
			$scope.$apply(function() {
				$scope.BusinessPermissionObjType = data;
				angular.forEach(data, function(val, key) {
					if (val.key === $.getParameter("objType")) {
						$scope.objName = val.desc;// 不入库的
					}
				});
			});
		});

		ToolsController.getEnum("cn.gwssi.ecloudbpm.bus.api.constant.BusTableRelType").then(function(data) {
			$scope.$apply(function() {
				$scope.BusTableRelType = data;
			});
			$scope.BusTableRelTypeKeyMap = {};
			angular.forEach(data, function(val) {
				$scope.BusTableRelTypeKeyMap[val.key] = val;
			});
		});

		ToolsController.getEnum("cn.gwssi.ecloudbpm.bus.api.constant.RightsType", true).then(function(data) {
			$scope.$apply(function() {
				$scope.RightsTypeList = data;
				ArrayToolService.del(data.length - 1, data);
			});
		});

    // 用户、机构、角色、岗位 选择框
    ToolsController.getInterFaceImpls("cn.gwssi.ecloudbpm.sys.api.permission.IPermissionCalculator").then(function(data) {
      $scope.$apply(function() {
        $scope.dialogPermissions = [];
        angular.forEach(data, function(item) {
          if (item.type != "everyone" && item.type != "none" && item.type != "script") {
            $scope.dialogPermissions.push(item);
          }
        });
      });
    });

		$scope.data = {};
		$scope.data.objType = $.getParameter("objType");
		$scope.data.objVal = $.getParameter("objVal");
		$scope.initData($.getParameter("boKeys"));
	};

	// 初始化当前授权
	function initCurrentAuth() {
    $scope.currentAuth = {}; // 当前选中的权限，用于 ng-model，包含当前选中用户、角色、岗位、机构、脚本
    $scope.currentLevelAuth = []; // 当前选中的权限，重构为后台需要的格式
    $scope.currentAuthLevel = "h";  // 默认操作
    $scope.currentAuthScript = "";  // 默认脚本
  }

  /**
   * ab-load 执行完成后，执行此事件
   */
	var isLoadedData = false;// 是否已加载数据
	$scope.$on("afterLoadEvent", function(event, data) {
		delete $scope.data.busObjMapJson;
		isLoadedData = true;
		mergeData();
	});

	/**
	 * 初始化数据
	 */
	var isLoadedBo = false;// 是已加载完bo
	$scope.initData = function(boKeys) {
		// 加载bo
		var url = __ctx + "/bus/businessPermission/getBo";
		var defer = baseService.postForm(url, {
			boKeys : boKeys
		});
		$.getResultData(defer, function(data) {
			$scope.boMap = data;

			angular.forEach(data, function(val, key) {
				var allRelations = [];
				TraverseTreeUtil.traverse(val.relation, "children", function(node) {
				  node.table.showFields = true;   // 默认显示所有字段
					allRelations.push(node);
				});
				val.allRelations = allRelations;
			});
			isLoadedBo = true;

			if (!$scope.data.id) {// id为空才重置数据
				$scope.resetDataWithBo();
			} else {// 不为空触发一次合并数据
				mergeData();
			}
		}, null,true);
	};

	/**
	 * 根据bo重置数据
	 */
	$scope.resetDataWithBo = function() {

		$scope.data.busObjMap = {};
		angular.forEach($scope.boMap, function(bo, key) {
			var busObj = {};
			busObj.key = bo.key;
			busObj.name = bo.name;
			// 只有bo设置默认数据
			busObj.rights = {
				w : [ {
					type : "everyone",
					desc : "所有人"
				} ]
			};
			busObj.tableMap = {};

			// 根据bo生成初始化tableMap
			angular.forEach(bo.allRelations, function(relation) {
				var table = {};
				table.key = relation.tableKey;
				table.comment = relation.tableComment;
				table.rights = {};

				// 处理字段
				table.columnMap = {};
				angular.forEach(relation.table.columnsWithoutPk, function(item) {
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

	function mergeData() {
		if (!isLoadedBo || !isLoadedData) {// 数据都准备好了才合并
			return;
		}

		var dataTemp = CloneUtil.deep($scope.data);// 备份加载出来的数据
		$scope.resetDataWithBo();// 根据Bo刷新出新的数据 $scope.data
		// 合并bo
		angular.forEach($scope.data.busObjMap, function(bo, boKey) {
			var boTemp = dataTemp.busObjMap[boKey];
			if (!boTemp) {
				return;
			}
			bo.rights = boTemp.rights;

			// 合并bo中的表
			angular.forEach(bo.tableMap, function(table, tableKey) {
				var tableTemp = dataTemp.busObjMap[boKey].tableMap[tableKey];
				if (!tableTemp) {
					return;
				}
				table.rights = tableTemp.rights;

				// 合并bo中的表的字段
				var hasConfiged = false;
				angular.forEach(table.columnMap, function(column, columnName) {
					var columnTemp = dataTemp.busObjMap[boKey].tableMap[tableKey].columnMap[columnName];
					if (!columnTemp) {
						return;
					}
					column.rights = columnTemp.rights;
					
					//默认展示配置过字段的
					if(!jQuery.isEmptyObject(column.rights)){
						hasConfiged = true;
					}
				});
				//默认展示配置过字段的
				if(hasConfiged){
					$scope.collapse[tableKey] = 'in';
				}
			});
		});
	}

  /**
   * 选择用户、机构、角色、岗位等
   */
  $scope.selectAuth = function(permission) {
    if (permission.type === "user" || permission.type === "org" || permission.type === "role" || permission.type === "post") {
      $scope.custDialog(permission, permission.type + "Selector");
    } else {
      alert("该权限类型暂不支持，有问题请联系管理员");
    }
  };

  /**
   * 选择用户、机构、角色、岗位等的对话框
   */
  $scope.custDialog = function(permission, dialogKey) {
    CustUtil.openCustDialog(dialogKey, function(data, innerWindow) {
      $scope.$apply(function() {
        $scope.currentAuth[permission.type] = data;
      });
      $.Dialog.close();
    });
  };

  /**
   * 设置权限
   */
  $scope.changeAuth = function() {
    if (!$scope.currentAuthLevel) {
      jQuery.Dialog.warning("必须选择授权操作！")
      return;
    }

    // 处理机构、用户、岗位、角色
    angular.forEach($scope.currentAuth, function(value, key) {
      let id = [], desc = [];
      angular.forEach(value, function(item) {
        id.push(item.id);
        desc.push(item.name);
      });

      $scope.currentLevelAuth.push({
        "type": key,
        "id": id.join(","),
        "desc": desc.join(",")
      });
    });

    // 处理脚本
    if ($scope.currentAuthScript) {
      $scope.currentLevelAuth.push({
        "type": "script",
        "id": $scope.currentAuthScript,
        "desc": "脚本"
      });
    }

    // 逐节点设置权限
    $scope.$apply(function() {
      angular.forEach($scope.boMap, function(bo, key) {
        // 对 bo 设置
        let busObjMap = $scope.data.busObjMap;
        if (bo.isChecked) {
          setRights(busObjMap[key].rights);
        }

        angular.forEach(bo.allRelations, function(table) {
          // 对 table 设置
          let tableMap = busObjMap[key].tableMap[table.tableKey];;
          if (table.isChecked) {
            setRights(tableMap.rights);
          }

          // 对字段设置
          angular.forEach(table.table.columns, function(column) {
            if (column.isChecked) {
              setRights(tableMap.columnMap[column.key].rights)
            }
          });
        });
      });
    });

    // 重置已选授权，重置已选表或字段
    $.Dialog.confirm("保存成功","授权已临时保存，是否清空页面选项？", function() {
      initCurrentAuth();

      $scope.$apply(function() {
        angular.forEach($scope.boMap, function(bo, key) {
          bo.isChecked = false;

          angular.forEach(bo.allRelations, function(table) {
            table.isChecked = false;

            angular.forEach(table.table.columns, function(column) {
              column.isChecked = false;
            });
          });
        });
      });
    });
  };

  // 设置权限
  function setRights(rights) {
    if ($scope.currentLevelAuth.length === 0) {
      delete rights[$scope.currentAuthLevel];
    } else {
      rights = rights || {};
      rights[$scope.currentAuthLevel] = $scope.currentLevelAuth;
    }
  }

  /**
   * 切换授权级别
   */
  $scope.setAuthLevel = function (level) {
    $scope.currentAuthLevel = level;
  };

  /**
   * 切换是否选中，包括选中BO、表、字段
   */
  $scope.toggleNodeCheck = function (node) {
    node.isChecked = !node.isChecked;
  };

  /**
   * 切换是否显示字段
   */
	$scope.toggleShowFields = function(table) {
	  table.showFields = !table.showFields;
  };

} ]);
