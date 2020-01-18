var InclusiveConditionsController = ['$scope', '$translate', function ($scope, $translate) {

  $scope.$watch("selectedItem.nodeId", function (newValue, oldValue) {
    var nodeType = $scope.selectedItem.nodeType;
    if (!nodeType || (nodeType != 'InclusiveGateway' && nodeType != 'ExclusiveGateway')) return;
    if (newValue == oldValue && $scope.outgoingSequenceFlow) return;

    $scope.outgoingSequenceFlowList = [];

    var selectedShape = $scope.selectedShape;
    if (!selectedShape) {
      console.log('Programmatic error: no selected shape found');
      return;
    }

    var outgoingNodes = selectedShape.getOutgoingShapes();
    for (var i = 0; i < outgoingNodes.length; i++) {
      var outgoingNode = outgoingNodes[i];
      if (outgoingNode.getStencil().idWithoutNs() === 'SequenceFlow') {

        var targetActivity = outgoingNodes[i].getTarget();

        var outgoingSequenceFlow =
          {
            targetNodeId: targetActivity.properties['oryx-overrideid'],
            targetTitle: targetActivity.properties['oryx-name'],
            targetType: targetActivity.getStencil().title()
          };


        outgoingNode.properties.each(function (item, i) {
          if (item.key == "oryx-conditionsequenceflow") {
            outgoingSequenceFlow.condition = item;
            outgoingSequenceFlow.flowconditionExpression = item.value;
          }
        });
        outgoingSequenceFlow.shapeId = outgoingNode.getId();
        outgoingSequenceFlow.shape = outgoingNode;
        $scope.outgoingSequenceFlowList.push(outgoingSequenceFlow);
      }
    }

  });

  $scope.changeCondition = function (index) {
    var currentNodeId = $scope.selectedItem.nodeId;
    var url = '/bpm/definition/definitionScriptDialog.html?defId=' + bpmDefId + '&nodeId=' + currentNodeId;

    var outGoing = $scope.outgoingSequenceFlowList[index];
    var passData = {
      script: outGoing.flowconditionExpression,
      index: index,
      notice: "分支有且仅有一条可执行路线。该脚本需要 return true or false， return true 则说明当前节点可达。"
    };

    showDialog({
      url: url,
      passData: passData,
      btnAlign: 'l',
      title: outGoing.targetTitle + "流向条件分支脚本",
      width: "600",
      height: "100%",
      modal: true,
      offset: 'rb',
      resizable: false,
      move: false,
      ok: function (i, innerWindow) {
        var script = innerWindow.getData();
        $scope.$apply(function () {
          var sequence = $scope.outgoingSequenceFlowList[index];
          sequence.flowconditionExpression = script;
          sequence.condition.value = script;

          $scope.updatePropertyInModel(sequence.condition, sequence.shapeId, sequence.shape);
        });
        layer.close(i);
      }
    });

  }

}];