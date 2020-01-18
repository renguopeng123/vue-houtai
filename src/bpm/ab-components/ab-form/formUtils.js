export function getValidate(columnLength, columnValidRule) {

    var validate = {};
    if (columnLength && columnLength > 0) {
        validate.maxlength = columnLength - 0;
    }

    var validRule = columnValidRule.split(",");

    for (var valid in validRule) {
        if (validRule[valid] != null && validRule[valid] != "") {
            validate[validRule[valid]] = true;
        }
    }

    return validate;

}

export function componentsINIT(obj) {
    // debugger
    // obj.v_validate = JSON.stringify(getValidate(obj.columnLength, obj.columnValidRule));
    obj.v_validate = (getValidate(obj.columnLength, obj.columnValidRule));
    //默认值不为空(不起作用 默认值应该是后台一并获取的)
    if (obj.columnDefaultvalue != null && obj.columnDefaultvalue != "") {
        //改这个没有用
        obj.$parent.initData[obj.boKey][obj.tableKey][obj.columnKey] = obj.columnDefaultvalue;
    }
}

export var methods = {

}

export function onresize() {

    console.log("onresize");

    if (window.parent.flowIframe) {
        setTimeout(function() {
            window.parent.flowIframe.onresize(document.body.scrollHeight);
        }, 500);
    }

}

//自定义的所有组件属性
export var props = ["columnId", "columnComment", "columnKey", "tableKey", "boKey", "columnType", "columnLength",
    "columnPlaceholder", "columnDefaultvalue", "columnValidRule", "columnEheight", "columnEwidth", "columnOptions", "columnDateFormat", "columnSerialnoAlias",
    "columnDicKey"
]