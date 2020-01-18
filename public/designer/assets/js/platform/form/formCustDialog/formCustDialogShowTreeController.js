var app = angular.module('app', [ 'baseDirective' ]);
app.controller("ctrl", [ '$scope', 'baseService', 'ArrayToolService', '$filter', function($scope, baseService, ArrayTool, $filter) {
	var filter = $filter('filter');
	$scope.ArrayTool = ArrayTool;

	$scope.init = function() {
	};

	$scope.$on("afterLoadEvent", function(event, data) {
		$scope.loadTree();
	});

	/**
	 * 返回结果数据
	 */
	$scope.getData = function() {
		var data = [];
		var treeData;
		if ($scope.data.multiple) {
			treeData = $scope.tree.getCheckedNodes();
		} else {
			treeData = $scope.tree.getSelectedNodes();
		}

		angular.forEach(treeData, function(item) {
			data.push(transformRow2Data($scope.data, item));
		});
		return data;
	};

	// 以下代码是跟ztree相关的--------------------------》》》
	/**
	 * 加载树
	 */
	$scope.loadTree = function() {
		// 打开对话框的传参
		var windowPassData = window.passData;

		// 修改被修改的对话框配置
		if (windowPassData && windowPassData.dialogSetting) {
			$scope.data = angular.extend($scope.data, windowPassData.dialogSetting);
		}

		// 请求参数
		var params = {};
		if (windowPassData && windowPassData.params) {
			params = windowPassData.params;
		}

		var url = __ctx + "/form/formCustDialog/treeData_" + $scope.data.key;
		var treeCreator = new ZtreeCreator('tree', url).setDataKey({
			idKey : $scope.data.treeConfig.id,
			pIdKey : $scope.data.treeConfig.pid,
			name : $scope.data.treeConfig.showColumn,
			title : $scope.data.treeConfig.showColumn
		});

		var callback = {};

		// 复选框
		if ($scope.data.multiple) {
			treeCreator.setCheckboxType(true);
			// 点击节点反选
			callback.onClick = function(event, treeId, treeNode) {
				$scope.tree.checkNode(treeNode, !treeNode.checked, false);
			};
		}

		treeCreator.setCallback(callback);

		// 生成树
		treeCreator.initZtree(params, function(treeObj) {
			$scope.tree = treeObj;

			// 初始化选中数据
			var nodes = treeObj.transformToArray(treeObj.getNodes());
			if (windowPassData && windowPassData.initData && windowPassData.initData.length > 0) {
				console.info(windowPassData.initData);
				angular.forEach(windowPassData.initData, function(item) {
					var itemTemp = transformData2Row($scope.data, item);

					angular.forEach(nodes, function(node) {
						if (jsonEqual(node, itemTemp)) {
							treeObj.checkNode(node, true, false);
						}
					});
				});
			}
		});
	};

} ]);