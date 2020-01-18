import Vue from 'vue'
import formService from '../ab-form/formService.js'
import qs from 'qs'

let bpmService = {};
/** taskId,instanceId,defId,bpmTask,form,buttons
bpmService.data ;
**/
//初始化动作
bpmService.init = function(params, fn, errorFn) {
    this.data = params;

    let dataUrl = "/bpm/task/getTaskData"; // taskId=xxx
    if (!params.taskId) {
        dataUrl = "/bpm/instance/getInstanceData";
    }

    let defer = Vue.abHttpUtil.postForm(dataUrl, params);
    Vue.abTools.getResultData(defer, function(data) {
        Vue.abTools.extend(data, bpmService.data);
        if (fn) fn(data);
    }, "alert", function() {
        //关闭当前页
        errorFn();
    });

};

//获取表单的数据
bpmService.getFormData = function(custFormContext, button) {
    let validateForm = "start,agree,oppose".indexOf(button.alias) != -1;
    let formType = this.data.form.type;

    if (formType === 'INNER') {
        let errorMsg = formService.getValidateMsg(custFormContext);
        if (errorMsg && validateForm) {
            Vue.prototype.$Message.warning({
                content: "表单校验不通过！<br/>" + errorMsg,
                closable: true,
                duration: 3
            })
            return false;
        }
        return custFormContext.data;
    }
    if (formType == 'FRAME') {
        let iframeObj = document.getElementById("frmFrame").contentWindow;
        //尝试校验
        try {
            if (validateForm) {
                if (iframeObj.isValid() === false) {
                    return false;
                }
            }
        } catch (e) {}
        //尝试取值
        try {
            return iframeObj.getData();
        } catch (e) {
            console.error("URL 表单获取 数据失败！" + e)
            return {
                test: "jeff"
            };
        }
    } else {
        alert("不支持的表单类型:" + formType)
    }
};

bpmService.getSubmitFlowParam = function() {

    if (!this.data) {
        alert("error");
        return;
    }

    if (this.data.task) {
        return {
            "taskId": this.data.taskId,
            nodeId: this.data.task.nodeId,
            instanceId: this.data.task.instId
        };
    }

    return {
        defId: this.data.defId,
        instanceId: this.data.instanceId
    }
}

bpmService.errorFun = function(obj) {
    //发生错误
    obj.$Loading.error();
    //父页面跳转
    window.parent.location.href = "./"
}

bpmService.qs = function(key) {

    var value = qs.parse(window.location.href.split('?')[1])[key];
    value = (value == null) ? "" : value.replace("#", "").replace("/", "");
    return value;

}

export default bpmService;