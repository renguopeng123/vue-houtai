import Vue from 'vue'
let Tools = {}

Tools.extend = function(parent, child) {
    child = child || {}
    for (let prop in parent) {
        child[prop] = parent[prop]
    }
    return child
}

Tools.clone = function(obj) {
    return JSON.parse(JSON.stringify(obj));
}

Tools.postForm = function(url, param, resultFn, isShowLoading) {
    if (isShowLoading === undefined || isShowLoading) {
        Vue.prototype.$Message.loading({ content: 'Loading...', duration: 0 });
    }
    let post = Vue.abHttpUtil.postForm(url, param);

    this.getResultData(post, data => {
        if (isShowLoading === undefined || isShowLoading) {
            Vue.prototype.$Message.destroy();
        }
        resultFn(data);
    }, true);
}

Tools.getResultData = function(defer, fn, msgType, errorFn) {
    defer.then(function(result) {
        Tools.getResult(result, fn, msgType, null, errorFn)
    }, function(status) {
        Vue.prototype.$Message.destroy();
        if (status == !0) {
            Vue.prototype.$Message.error('加载失败！' + status)
        }
    })
}

Tools.getResultMsg = function(defer, fn, errorFn, msgType) {
    defer.then(function(result) {
        Tools.getResult(result, fn, msgType, msgType, errorFn)
    }, function(status) {
        if (errorFn) {
            errorFn(status)
        }
        Vue.prototype.$Message.error('加载失败！' + status)
    })
}

Tools.getResult = function(result, fn, errMsgType, sucMsgType, errorFn) {

    if (typeof(result) !== 'object') {
        if (!result.startWith('{') && !result.startWith('[')) {
            result = { 'isOk': false, msg: '服务器反馈数据格式存在异常，无法解析反馈结果！', 'cause': result }
        } else {
            let result = eval('(' + result + ')')
        }
    }
    // 失败的提示
    if (!result.isOk) {
        if (!errMsgType || errMsgType === 'toast') {
            Vue.prototype.$Message.error(result.msg)
            if (errorFn) { errorFn(result) };
        } else if (errMsgType === 'alert') {
            Vue.prototype.$Modal.error({
                title: "提示信息",
                content: result.msg,
                onOk: errorFn
            })
        }
        console.error(result)
    } else {
        if (!sucMsgType) { // 不需要任何显示
            if (fn) {
                fn(result.data)
            }
        } else if (sucMsgType === 'toast') {
            Vue.prototype.$Message.success(result.msg)
            if (fn) {
                fn(result.data)
            }
        } else if (errMsgType === 'alert') {
            Vue.prototype.$Modal.success({
                title: "提示信息",
                content: result.msg,
                onOk: fn
            })
        }
    }
}

/***
 * 将格式化数字转换成number
 */
Tools.toNumber = function(x) {
    if (x === null || x === undefined || x === '') return ''
    if (typeof x === 'string') {
        x = x.replace(/,/g, '')
    }
    let match = x.toString().match(/([$|￥])\d+\.?\d*/)
    if (match) {
        x = x.replace(match[1], '')
    }
    let val = Number(x)
    if (Number.isNaN(val)) return x
    return val
}

/**
 * 通过json的路径获取值。严格模式下无法使用eval
 */
Tools.getJsonValue = function xxx(json, path) {
    if (!json) return
    try {
        let array = path.split('.')
        let value = json
        for (let i = 0, k; k = array[i++];) {
            value = value[k]
        }
        return value
    } catch (e) {
        console.error('通过path 获取json的value 失败 ', e, json, path)
    }
}

Tools.CloneUtil = {
    /**
     * 深复制【可以迭代】
     */
    deep: function(obj) {
        return JSON.parse(JSON.stringify(obj));
    },
    /**
     * 浅复制【不能迭代】
     */
    shallow: function(obj) {
        return jQuery.extend({}, obj)
    },
    /**
     * 数组复制
     */
    list: function(obj) {
        return JSON.parse(JSON.stringify(obj));
    }
}

Tools.ArrayUtil = {
    //上移按钮
    up: function(idx, list) {
        if (idx < 1) {
            return;
        }
        var t = list[idx - 1];
        list[idx - 1] = list[idx];
        list[idx] = t;
    },
    //下移按钮
    down: function(idx, list) {
        if (idx >= list.length - 1) {
            return;
        }
        var t = list[idx + 1];
        list[idx + 1] = list[idx];
        list[idx] = t;
    },
    resumeSn: function(list) {
        for (var k = 0; k < list.length; k++) {
            list[k].sn = k;
        }
        return list;
    },
    /**
     * idx 原位置
     * num 目标位置
     * list 数组
     */
    moveToNum: function(idx, target, list) {
        if (target == -1) {
            target = 0;
        } else if (idx >= target) {
            target = target + 1;
        }
        var t = list.splice(idx, 1);
        list.insert(target, t[0]);
        this.resumeSn(list);
    },
    //默认ngModel turnToIndex
    turnTo: function(rowScope, list) {
        var toIndex = rowScope.turnToIndex - 1;
        if (!rowScope.turnToIndex || toIndex < 0 || toIndex >= list.length) return;

        var index = rowScope.$index;
        if (toIndex == index) return;

        var row = list.splice(index, 1);
        list.insert(toIndex, row[0]);

        rowScope.turnToIndex = "";
    },
    //删除按钮
    del: function(idx, list) {
        list.splice(idx, 1);
    },
    //找到指定元素的未知
    idxOf: function(val, list) {
        for (var i = 0; i < list.length; i++) {
            if (list[i] == val) return i;
        }
        return -1;
    },
    //删除指定元素
    remove: function(val, list) {
        var idx = this.idxOf(val, list);
        if (idx > -1) {
            list.splice(idx, 1);
        }
    },
    //置顶
    top: function(idx, list) {
        if (idx >= list.length || idx < 1) {
            return;
        }
        //逐个交换
        for (var i = 0; i < idx; i++) {
            var temp = list[i];
            list[i] = list[idx];
            list[idx] = temp;
        }
    },
    //置底
    bottom: function(idx, list) {
        if (idx >= list.length - 1 || idx < 0) {
            return;
        }
        //逐个交换
        for (var i = list.length - 1; i > idx; i--) {
            var temp = list[i];
            list[i] = list[idx];
            list[idx] = temp;
        }
    }
};

/**
 * 判断开始是否相等
 * 
 * @param str
 * @param isCasesensitive
 * @returns {Boolean}
 */
String.prototype.startWith = function(str, isCasesensitive) {
    if (str == null || str == "" || this.length == 0 ||
        str.length > this.length)
        return false;
    let tmp = this.substr(0, str.length);
    if (isCasesensitive == undefined || isCasesensitive) {
        return tmp == str;
    } else {
        return tmp.toLowerCase() == str.toLowerCase();
    }
};

/**
 * 格式化字符串
 * eg: let aaa = "myName is {name} my wife name is {wife.name}".format({"name":"苗继方",wife:{name:"柠檬"})
 *    alert (aaa);
 */
String.prototype.format = function(context) {
    return _stringRender(this, context);
};

window._stringRender = function(template, scopeData) {
    let tokenReg = /(\\)?\{([^\{\}\\]+)(\\)?\}/g;

    return template.replace(tokenReg, function(word, slash1, token, slash2) {
        if (slash1 || slash2) {
            return word.replace('\\', '');
        }

        let letiables = token.replace(/\s/g, '').split('.');

        if (word.startWith("{url.")) {
            return $.getParam(letiables[1]);
        }
        let currentObject = scopeData;
        let i, length, letiable;

        for (let i = 0, key; key = letiables[i++];) {
            currentObject = currentObject[key];
            if (currentObject === undefined || currentObject === null) return '';
        }

        return currentObject;
    })
};

/**
 * 字符串替换
 * 
 * @param s1
 *            需要替换的字符
 * @param s2
 *            替换的字符。
 * @returns
 */
String.prototype.replaceAll = function(s1, s2) {
    return this.replace(new RegExp(s1, "gm"), s2);
};


/**
 * 日期格式化。
 * 日期格式：
 * yyyy，yy 年份
 * MM 大写表示月份
 * dd 表示日期
 * HH 表示小时
 * mm 表示分钟
 * ss 表示秒
 * q  表示季度
 * 实例如下：
 * let now = new Date(); 
 * let nowStr = now.format("yyyy-MM-dd HH:mm:ss"); 
 */
Date.prototype.format = function(format) {
    let o = {
        "M+": this.getMonth() + 1, //month 
        "d+": this.getDate(), //day 
        "H+": this.getHours(), //hour 
        "m+": this.getMinutes(), //minute 
        "s+": this.getSeconds(), //second 
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter 
        "S": this.getMilliseconds() //millisecond 
    }

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (let k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}


/**
 * 求当前时间到指定时间的差（当前时间是起点）
 * type:date 天数;month:月数;year:年数;hour：小时
 */
Date.prototype.between = function(date, type) {
    if (!type) {
        type = "date";
    }
    if (type == "hour") {
        let dateSpan = date.getTime() - this.getTime();
        return Math.floor(dateSpan / (3600 * 1000));
    }
    if (type == "date") {
        let dateSpan = date.getTime() - this.getTime();
        return Math.floor(dateSpan / (24 * 3600 * 1000));
    }
    if (type == "month") {
        return (date.getFullYear() - this.getFullYear()) * 12 + (date.getMonth() - this.getMonth());
    }
    if (type == "year") {
        return date.getFullYear() - this.getFullYear();
    }

};

/**
 * 字符串根据某个格式转化成日期
 * yyyy-MM-dd HH:mm:ss
 */
String.prototype.toDate = function(format) {
    if (!format) {
        format = "yyyy-MM-dd";
    }
    let year = String_toDate(this, format, "yyyy")
    let month = String_toDate(this, format, "MM");
    let day = String_toDate(this, format, "dd");
    let hour = String_toDate(this, format, "HH");
    let minth = String_toDate(this, format, "mm");
    let second = String_toDate(this, format, "ss");
    let date = new Date(0);
    date.setFullYear(year || 1);
    date.setMonth(parseInt(month || 1) - 1);
    date.setDate(day || 1);
    date.setHours(hour || 0);
    date.setMinutes(minth || 0);
    date.setSeconds(second || 0);
    return date;
};

function String_toDate(str, format, a) {
    if (format.indexOf(a) == -1) {
        return null;
    }
    return str.substr(format.indexOf(a), a.length);
}
export default {
    // 全局安装时候
    install(Vue) {
        Vue.abTools = Tools;
        Vue.prototype.abTools = Tools;
    },
    AbTools: Tools
}