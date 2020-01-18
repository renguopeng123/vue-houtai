angular.module('nodeDefModel', ['base'])
.service('nodeDefService', ['$rootScope','baseService','$compile', function($rootScope,baseService,$compile) {
    var service = {};
    return service;
}])
/***
 * type :globle,instance,node
 */
.directive('bpmForm', ['$timeout', function($timeout) {
	return {
    	restrict : 'AE',
    	scope:{
    	  title: "@title",  // FIXED BY quxb 2019-09-02 单向绑定，子级作用域同DOM属性的值进行绑定，子级不影响父级
    		bpmForm:"=",      // 双向绑定，子级作用域同父级作用域双向绑定，影响父级
    		mobileForm:"="
    	},
    	link: function(scope, element, attrs,ctrl){
    		var type = scope.type = attrs.type;

    		//选择表单
    		scope.selectForm = function(isPc){
    			var boCodes = scope.getBoCodes();
    			if(!boCodes){
    				jQuery.Dialog.warning("配置自定义表单，必须首先选择业务数据模型！");
    				return;
    			}
    			
    			CustUtil.openCustDialog("formSelector",{bo_key_:boCodes,type_:isPc?"pc":"mobile"},function(arrData,innerWindow){
    				var formStr = isPc?"bpmForm":"mobileForm";
    				scope.$apply(function(){
    					if(!scope[formStr])scope[formStr]={};
    					scope[formStr].type = 'INNER';
    					scope[formStr].name = arrData[0].name;
        				scope[formStr].formValue = arrData[0].key;	
    				});
		 			
		 		    jQuery.Dialog.close(innerWindow);
		 		  })
    		};

    		//授权
    		scope.authorize = function(){
    			var boCodes = scope.getBoCodes();
    			if(!boCodes){
    				jQuery.Dialog.warning("配置业务数据权限，必须首先选择业务数据模型！")
    				return;
    			}

    			var objVal = type;
    			var objName = type === "global"?"全局":"实例";
    			if(type==="node"){
    				objVal = scope.$parent.selectedItem.nodeId;
    				objName = scope.$parent.selectedItem.title;
    			}
    			objVal = scope.$parent.bpmDefSetting.bpmDefinition.key + "-" + objVal;

          var url = '/bus/businessPermission/businessPermissionEdit.html?objType=flow&objVal='+objVal+'&boKeys=' + boCodes;
    			var def = {url : url, title : objName+"授权", width : '900', height : '100%', modal : true, resizable : false, offset: 'rb', move: false};
    			jQuery.Dialog.open(def);
    		};
    		
    		scope.getBoCodes = function(){
    			var boCodes = "";
    			for(var i=0,dm;dm= scope.$parent.bpmDefSetting.flow.dataModelList[i++];){
    				if(boCodes){boCodes = boCodes + ","}
    				boCodes = boCodes + dm.code;
    			}

    			return boCodes;
    		};
    		
    		// 清除表单
    		scope.clearForm = function(form){
          form.name = "";
          form.formValue ="";
    		};

    		scope.changeFormType = function(){
    			scope.bpmForm.name = "";
    			scope.bpmForm.formValue ="";
    			if(scope.mobileForm){
    				scope.mobileForm.name = "";
    				scope.mobileForm.formValue ="";
    				scope.mobileForm.type = scope.bpmForm.type;
    			}
    		};
    	},
    // language=HTML
    template: '<div class="form-group fix-height">                                                                                 \
		    	  <label class="col-sm-4 control-label title">{{title}}:</label>                                                                                                                             \
		    		<div class="col-sm-8">                                                                                                                                           \
		    			<select class="form-control form-select" ng-model="bpmForm.type" ng-change="changeFormType()">                                                       								 \
    						<option value="">请选择</option>\
		    				<option value="INNER">在线表单</option>                                                                                                \
		    				<option value="FRAME">URL表单</option>                                                                                                 \
		    			</select>                                                                                                                                  \
		    		  <div ng-if="bpmForm.type==\'INNER\'" ><a href="javascript:void(0);" class="btn btn-info btn-sm form-btn" ng-click="authorize()">授权</a></div>            \
		    		</div>                                                                                                                                          \
          </div>                                                                                                                                       \
		    	<div class="form-group fix-height" ng-if="bpmForm.type==\'INNER\'" >                                                                                                              \
		    		<label class="col-sm-4 control-label control-label-icon title"><i class="panel-icon-custom panel-computer"></i></label>                                                                                                                                       \                                                                                                                                  \
		    		<div class="col-sm-8">                                                                                                                                       \
              <input type="text" class="form-control" ng-model="bpmForm.name" readonly ng-click="selectForm(true)">                                                                                                              \
              <i class="panel-icon-custom panel-reset" title="清空" ng-click="clearForm(bpmForm)"></i>                                                                                                                                       \
		    		</div>                                                                                                                                       \
          </div>                                                                                                                                       \
		    	<div class="form-group fix-height" ng-if="bpmForm.type==\'FRAME\'" >                                                                                                               \
		    		<label class="col-sm-4 control-label control-label-icon title"><i class="panel-icon-custom panel-computer"></i></label>                                                                                                                                       \
            <div class="col-sm-8">                                                                                                                                       \
              <input type="text" class="form-control" ng-model="bpmForm.formValue">                                                                                                              \
        		</div>                                                                                                                                       \
          </div>                                                                                                                                       \
		    	<div class="form-group fix-height" ng-if="bpmForm.type==\'INNER\'" >                                                                                                             \
		    		<label class="col-sm-4 control-label control-label-icon title"><i class="panel-icon-custom panel-phone"></i></label>                                                                                                                                       \
            <div class="col-sm-8">                                                                                                                                       \
              <input type="text" class="form-control" ng-model="mobileForm.name" readonly ng-click="selectForm(false)">                                                                                                                                       \
              <i class="panel-icon-custom panel-reset" title="清空" ng-click="clearForm(mobileForm)"></i>                                                                                                                                       \
            </div>                                                                                                                                       \
          </div>                                                                                                                                       \
          <div class="form-group fix-height" ng-if="bpmForm.type==\'FRAME\'" >                                                                                                                                       \
            <label class="col-sm-4 control-label control-label-icon title"><i class="panel-icon-custom panel-phone"></i></label>                                                                                                                                       \
            <div class="col-sm-8">                                                                                                                                       \
              <input type="text" class="form-control" ng-model="mobileForm.formValue">                                                                                                                                       \
            </div>                                                                                                                                       \
          </div>                                                                                                                                       \
          <div class="form-group fix-height" ng-if="bpmForm.type==\'FRAME\' && type != \'instance\'" >                                                                                                                                       \
            <label class="col-sm-4 control-label title">URL表单处理器:</label>                                                                                                                                       \
            <div class="col-sm-8">                                                                                                                                       \
              <input type="text" class="form-control" ng-model="bpmForm.formHandler">                                                                                                                                       \
            </div>                                                                                                                                       \
          </div>'
	}}])
//节点规则
// .directive('bpmNodeRules', ['baseService', function(baseService) {
// 	return {
// 		restrict : 'A',
// 		scope:true,
// 		link : function(scope, element, attrs) {
// 			scope.editRule = function(index){
// 				//尝试初始化
// 				if(!scope.getCurrentNodePlugins().ruleSkip) {
// 					scope.getCurrentNodePlugins().ruleSkip = [];
// 				}
// 				var rule = {};
// 				if(index!= -1)rule =angular.copy(scope.getCurrentNodePlugins().ruleSkip[index]);
//
// 				var currentNodeId = scope.selectedItem.nodeId;
// 				var url='/bpm/nodeDef/jumpRuleDialog.html?defId='+bpmDefId+'&nodeId='+currentNodeId;
//
// 				var passData = {rule:rule,index:index,nodeMap:scope.bpmDefSetting.nodeMap};
// 				showDialog({url:url,width:660,height:500,title:"自由跳转规则插件配置"+currentNodeId,passData:passData,
// 					ok:function(i,innerWindow){
// 					var data =innerWindow.getData();
// 					var index = innerWindow.passData.index;
// 					if(!data) return;
//
// 					scope.$apply(function(){
// 						if(index>-1) {
// 							scope.getCurrentNodePlugins().ruleSkip[index] = data;
// 						}
// 						else{
// 							scope.getCurrentNodePlugins().ruleSkip.push(data);
// 						}
// 					});
// 					layer.close(i);
// 				}});
// 			}
// 			scope.remove = function(index){
// 				scope.getCurrentNodePlugins().ruleSkip.splice(index,1);
// 			}
// 		},
// 		template:'<div>\
// 					<div class="btn btn-primary glyphicon glyphicon-plus" ng-click="editRule(-1)"></div>\
// 					<div><div class="alert alert-info" role="alert" ng-if="!getCurrentNodePlugins().ruleSkip||getCurrentNodePlugins().ruleSkip.length==0">\尚未配置节点规则</div>\
// 					<div class="list-group">\
// 					  <a href="#" class="list-group-item" ng-repeat="rule in getCurrentNodePlugins().ruleSkip">\
// 					    <h4 class="list-group-item-heading">{{rule.name}}\
// 							<span class="btn btn-danger glyphicon glyphicon-trash pull-right" ng-click="remove($index)"></span>\
// 							<span class="btn btn-primary glyphicon glyphicon-edit pull-right" ng-click="editRule($index)"></span>\
// 						</h4>\
// 					    <p class="list-group-item-text">\
// 							<span class="btn">跳至:{{rule.targetNodeDesc}}({{rule.targetNode}})</span>\
// 						</p>\
// 					  </a>\
// 					</div>\
// 				<div>',
// 		replace:true
// 	};
// }])
//节点事件脚本
// .directive('bpmEventScript', ['baseService', function(baseService) {
// 	return {
// 		restrict : 'A',
// 		scope:true,
// 		link : function(scope, element, attrs) {
// 			var scriptMsg = {
// 					taskCreate:"任务创建时候执行，可以使用[variableScope]操作流程变量,eg:variableScope.setVariable(\"total\", 100);等",
// 					taskComplete:"任务完成时候执行，可以使用[variableScope]操作变量,eg:variableScope.setVariable(\"total\", 100);等",
// 					startEvent:"该脚本在流程启动时执行，用户可以使用[variableScope]操作变量， 例如设置流程变量:variableScope.setVariable(\"total\", 100);",
// 					endEvent:"该脚本在流程终止时执行",
// 					manualEnd:"该脚本在流程人工终止时执行"
// 			};
//
// 			scope.editEventScript = function(key){
// 				//尝试初始化
// 				if(!scope.getCurrentNodePlugins().nodeScript) {
// 					scope.getCurrentNodePlugins().nodeScript = {};
// 				}
//
// 				var currentNodeId = scope.selectedItem.nodeId;
// 				var url='/bpm/definition/definitionScriptDialog.html?defId='+bpmDefId+'&nodeId='+currentNodeId;
//
// 				var  passData ={script:scope.getCurrentNodePlugins().nodeScript[key],notice:scriptMsg[key]};
// 				showDialog({url:url,width:840,height:530,title:"事件脚本设置　"+currentNodeId,passData:passData,
// 					ok:function(index,innerWindow){
// 						var script = innerWindow.getData();
// 						scope.$apply(function(){
// 							scope.getCurrentNodePlugins().nodeScript[key] = script;
// 						});
// 						layer.close(index);
// 					}});
// 			}
// 		},
// 		template:'<div>\
// 				<fieldset class="scheduler-border well" ng-if="selectedItem.nodeType==\'StartNoneEvent\'">\
// 					<legend style=" width: 90px;border-bottom:0;margin-bottom:10px;">\
// 					<span class="btn btn-primary btn-sm glyphicon glyphicon-edit" ng-click="editEventScript(\'startEvent\')">开始事件</span>\
// 					</legend>\
// 					<div class="code" ng-if="getCurrentNodePlugins().nodeScript.startEvent" style="white-space: pre-wrap;">{{getCurrentNodePlugins().nodeScript.startEvent}}\
// 					</div>\
// 					<div class="alert alert-info" role="alert" ng-if="!getCurrentNodePlugins().nodeScript.startEvent">尚未配置流程创建时脚本</div>\
// 				</fieldset>\
// 				<fieldset class="scheduler-border well" ng-if="selectedItem.nodeType==\'EndNoneEvent\'">\
// 					<legend style=" width: 90px;border-bottom:0;margin-bottom:10px;">\
// 						<span class="btn btn-primary btn-sm glyphicon glyphicon-edit" ng-click="editEventScript(\'endEvent\')">结束事件</span>\
// 					</legend>\
// 					<div class="code" style="white-space: pre-wrap;" ng-if="getCurrentNodePlugins().nodeScript.endEvent">\
// 						<span>{{getCurrentNodePlugins().nodeScript.endEvent}}</span>\
// 					</div>\
// 					<div class="alert alert-info" role="alert" ng-if="!getCurrentNodePlugins().nodeScript.endEvent">尚未配置流程结束脚本</div>\
// 				</fieldset>\
// 				<fieldset class="scheduler-border well" ng-if="selectedItem.nodeType==\'EndNoneEvent\'">\
// 					<legend style=" width: 90px;border-bottom:0;margin-bottom:10px;">\
// 						<span class="btn btn-primary btn-sm glyphicon glyphicon-edit" ng-click="editEventScript(\'manualEnd\')">人工终止事件</span>\
// 					</legend>\
// 					<div class="code" style="white-space: pre-wrap;" ng-if="getCurrentNodePlugins().nodeScript.manualEnd">\
// 						<span>{{getCurrentNodePlugins().nodeScript.manualEnd}}</span>\
// 					</div>\
// 					<div class="alert alert-info" role="alert" ng-if="!getCurrentNodePlugins().nodeScript.manualEnd">尚未配置人工终止时脚本</div>\
// 				</fieldset>\
// 				<fieldset class="scheduler-border well" ng-if="selectedItem.nodeType==\'UserTask\'||selectedItem.nodeType==\'SignTask\'">\
// 					<legend style=" width: 90px;border-bottom:0;margin-bottom:10px;">\
// 						<span class="btn btn-primary btn-sm glyphicon glyphicon-edit" ng-click="editEventScript(\'taskCreate\')">前置事件</span>\
// 					</legend>\
// 					<div class="code" style="white-space: pre-wrap;" ng-if="getCurrentNodePlugins().nodeScript.taskCreate">{{getCurrentNodePlugins().nodeScript.taskCreate}}</div>\
// 					<div class="alert alert-info" role="alert" ng-if="!getCurrentNodePlugins().nodeScript.taskCreate">尚未配置任务创建时脚本</div>\
// 				</fieldset>\
// 				<fieldset class="scheduler-border well" ng-if="selectedItem.nodeType==\'UserTask\'||selectedItem.nodeType==\'SignTask\'">\
// 					<legend style=" width: 90px;border-bottom:0;margin-bottom:10px;">\
// 						<span class="btn btn-primary btn-sm glyphicon glyphicon-edit" ng-click="editEventScript(\'taskComplete\')">后置事件</span>\
// 					</legend>\
// 					<div class="alert alert-info" role="alert" ng-if="!getCurrentNodePlugins().nodeScript.taskComplete">尚未配置任务完成时脚本</div>\
// 					<div class="code" style="white-space: pre-wrap;" ng-if="getCurrentNodePlugins().nodeScript.taskComplete"><span>{{getCurrentNodePlugins().nodeScript.taskComplete}}</span></div>\
// 				</fieldset>\
// 				<div>',
// 		replace:true
// 	};
// }])
//
//会签
// .directive('bpmSignConfig', ['baseService', function(baseService) {
// 	return {
// 		restrict : 'A',
// 		scope:true,
// 		link : function(scope, element, attrs) {
// 			scope.$parent.$watch("selectedItem.nodeId",function(newVal,oldVal){
// 				if(!newVal || newVal === oldVal) return;
// 				scope.init();
// 			})
//
// 			scope.init = function(){
// 				if(!scope.getCurrentNodePlugins().signTask){
// 					scope.getCurrentNodePlugins().signTask =  {signMultiTask:false,voteType:"PERCENT",needAllSign:false,voteAmount:51,opposedAction:"oppose"};
// 				}
// 				scope.signConf = scope.getCurrentNodePlugins().signTask;
// 			}
// 			scope.init();
// 		},
// 		template:'<div>\
// 						<table class="table table-hover table-striped table-bordered">     \
// 						<tr>                                                                                                                                                                                                	\
// 							<th >是否多实例会签</th>                                                                                                                                                                               	\
// 							<td><span ab-boolean text="开启多实例会签/单实例任务" ng-model="signConf.signMultiTask" ab-tip title="如果配置多实例会签，该任务则会通过候选人派生出多个会签任务，并统计会签结果。" ></span></td>\
// 						</tr>  \
// 						<tr ng-show="signConf.signMultiTask">                                                                                                                                                                                                	\
// 							<th >计票策略</th>                                                                                                                                                                               	\
// 							<td><span ab-boolean="PERCENT/AMOUNT" text="百分比/投票数" ng-model="signConf.voteType" ab-tip title="票数计算方式：当同意票数达到票数后，会签结果为同意<br>百分比计算方式：当同意票数所占比例达到设置比例时，会签结果为同意" ></span></td> \
// 						</tr>                                                                                                                                                                                                	\
// 						<tr ng-show="signConf.signMultiTask">                                                                                                                                                                                                 	\
// 							<th >{{signConf.voteType==\'PERCENT\'?\'百分比\':\'投票数\' }}</th>																																	\
// 							<td><input type="text" ng-model="signConf.voteAmount" class="form-control" ><span ng-show="signConf.voteType==\'PERCENT\'">%</span></td>                                             	\
// 						</tr>                                                                                                                                                                                                	\
// 						<tr ng-show="signConf.signMultiTask">                                                                                                                                                                                                 	\
// 							<th >是否搜集所有投票</th>                                                                                                                                                                       		\
// 							<td><span ab-boolean  text="所有人需要会签/满足计票策略后不再等待其他人会签" ng-model="signConf.needAllSign" ></span></td>                                                                			\
// 						</tr>                                                                                                                                                                                                	\
// 						<tr ng-show="signConf.signMultiTask">                                                                                                                                                                                                 	\
// 							<th >反对结果的后续动作</th>                                                                                                                                                                           		\
// 							<td><span ab-boolean="oppose/reject" text="标记会签结果为反对/对任务执行驳回处理" ng-model="signConf.opposedAction" ></span></td>                                                                 		\
// 						</tr>\
// 					</table>\
// 				<div>',
// 		replace:true
// 	};
// }])
//催办设置
// .directive('bpmTaskReminder', ['baseService', function(baseService){
// 	return {
// 		restrict : 'A',
// 		scope:true,
// 		link : function(scope, element, attrs) {
// 			var currentNodeId ="";
// 			var dataMap ={};
// 			scope.$parent.$watch("edittingNodeId",function(newVal,oldVal){
// 				if(newVal){
// 					currentNodeId = scope.edittingNodeId;
// 					if(dataMap[newVal]){
// 						scope.taskReminderList = dataMap[newVal].data;
// 					}
// 					else loadData();
// 				}
// 			})
//
// 			scope.editTaskReminder = function(){
// 				var reminderList = scope.getCurrentNodePlugins().reminderList;
// 				var currentNodeId = scope.selectedItem.nodeId;
// 				var url=__ctx+'/flow/plugins/remindersEdit?defId='+bpmDefId+'&nodeId='+currentNodeId;
// 				showDialog({url:url,width:1000,height:700,title:"催办设置　"+currentNodeId,passConf:reminderList});
// 			}
// 		},
// 		template:'<div>\
// 				<div class="btn btn-danger btn-sm fa fa-edit pull-right" ng-click="editTaskReminder()">设置催办</div>\
// 				<div class="alert alert-info row show-grid" role="alert" ng-if="!taskReminderList||taskReminderList.length==0">尚未配置催办任务</div>\
// 				<div class="well row show-grid" ng-repeat="taskReminder in taskReminderList">\
// 			      	<h3 class="control-label">{{taskReminder.name}}</h3>\
// 		  			<div>查看更多信息请编辑</div>\
// 				</div>\
// 			<div>',
// 		replace:true
// 	};
// }])
//外部子流程设置 call-activity
// .directive('bpmCallActivity', ['baseService', function(baseService) {
// 	return {
// 		restrict : 'A',
// 		scope:true,
// 		link : function(scope, element, attrs) {
// 			scope.selectBpmDef = function(){
// 				CustUtil.openCustDialog("bpmDefSelector",{},function(arrData,innerWindow){
// 					scope.$apply(function(){
// 						// 设置到变量中
// 						scope.getCurrentNodeConf().flowName = arrData[0].name;
// 						scope.getCurrentNodeConf().flowKey = arrData[0].key;
//
// 						//设置到activiti配置中
// 						for(var i=0,prop;prop =scope.selectedItem.properties[i++];){
// 							//自行设置节点名字
// 							/*if(prop.key === 'oryx-name'){
// 								prop.value = arrData[0].name;
// 								scope.$parent.updatePropertyInModel(prop)
// 								break;
// 							}*/
//
// 							if(prop.key === 'oryx-callactivitycalledelement'){
// 								prop.value = arrData[0].key;
// 								scope.$parent.updatePropertyInModel(prop)
// 								break;
// 							}
// 						}
// 					})
// 					jQuery.Dialog.close(innerWindow);
// 				})
// 			}
// 		},
// 		template:'<div>\
// 					<div class="btn btn-danger btn-sm fa fa-edit" ng-click="selectBpmDef()">选择外部子流程</div>\
// 					<h3>{{getCurrentNodeConf().flowName}}<small>[{{getCurrentNodeConf().flowKey}}]</small></h3> \
// 					<p ng-show="!getCurrentNodeConf().flowKey" class="text-danger">请选择一个子流程</p> \
// 					<p class="text-muted">子流程会在当前节点创建时触发，当子流程终止后、主流程会继续向下运行。</p> \
// 					<p class="text-muted">子流程如果与主流程数据模型一致，则数据共享。我们推荐子流程配置上主流程的数据模型，这样子流程可以在表单和流程运行时轻易的使用到主流程业务数据</p> \
// 				<div>',
// 		replace:true
// 	};
// }])
//节点自动跳过
// .directive('bpmTaskSkip', ['baseService', function(baseService) {
// 	return {
// 		restrict : 'A',
// 		scope:true,
// 		link : function(scope, element, attrs) {
// 			if(!scope.bpmDefSetting.flow.plugins){
// 				scope.bpmDefSetting.flow.plugins = {};
// 			}
//
// 			scope.bpmDefSetting.flow.plugins.taskAgency = {};
// 			if(!scope.bpmDefSetting.flow.plugins.taskSkip) {
// 				scope.bpmDefSetting.flow.plugins.taskSkip = {skipTypeArr:"firstNodeSkip"};
// 			}
// 			scope.taskSkip = scope.bpmDefSetting.flow.plugins.taskSkip;
// 		},
// 		template:'<div>\
// 					<div class="list-group">\
// 						<p></p> \
// 						<label class="checkbox-label" ng-class="{\'checked\' : taskSkip.skipTypeArr.indexOf(\'firstNodeSkip\')!=-1}"> \
// 						  <i class="panel-icon-custom editor-icon-checkbox"></i> \
// 						  <input type="checkbox" ab-checkbox="" ng-model="taskSkip.skipTypeArr" value="firstNodeSkip" >流程第一个节点跳过\
// 						</label><br/>\
// 						<label class="checkbox-label" ng-class="{\'checked\' : taskSkip.skipTypeArr.indexOf(\'sameUserSkip\')!=-1}"> \
// 						  <i class="panel-icon-custom editor-icon-checkbox"></i> \
// 						  <input type="checkbox" ab-checkbox="" ng-model="taskSkip.skipTypeArr" value="sameUserSkip" >下一节点执行人是当前任务处理人跳过\
// 						</label><br/>\
// 						<label class="checkbox-label" ng-class="{\'checked\' : taskSkip.skipTypeArr.indexOf(\'userEmptySkip\')!=-1}"> \
// 						  <i class="panel-icon-custom editor-icon-checkbox"></i> \
// 						  <input type="checkbox" ab-checkbox="" ng-model="taskSkip.skipTypeArr" value="userEmptySkip" >任务节点执行人为空跳过\
// 						</label><br/>\
// 						<label class="checkbox-label" ng-class="{\'checked\' : taskSkip.skipTypeArr.indexOf(\'allSkip\')!=-1}"> \
//               <i class="panel-icon-custom editor-icon-checkbox"></i> \
//               <input type="checkbox" ab-checkbox="" ng-model="taskSkip.skipTypeArr" value="allSkip" >所有节点跳过(用于流程测试)\
//             </label><br/>\
// 						<label class="checkbox-label" ng-class="{\'checked\' : taskSkip.skipTypeArr.indexOf(\'scriptSkip\')!=-1}"> \
//               <i class="panel-icon-custom editor-icon-checkbox"></i> \
//               <input type="checkbox" ab-checkbox="" ng-model="taskSkip.skipTypeArr" value="scriptSkip">脚本跳过\
//             </label><br/>\
// 						<div ng-if="taskSkip.skipTypeArr && taskSkip.skipTypeArr.indexOf(\'scriptSkip\')!=-1" class="ng-scope">\
// 							<textarea rows="6" cols="39" ng-model="taskSkip.script" class="form-control plugin-property-textarea"></textarea>\
// 					    </div>\
// 					</div>\
// 				<div>',
// 		replace:true
// 	};
// }])
function showDialog(param,scope) {
	var baseConfig = {
			yes: function(){
				scope.$digest();
			}
	};

	jQuery.extend(baseConfig, param);
	jQuery.Dialog.open(baseConfig); 
}
