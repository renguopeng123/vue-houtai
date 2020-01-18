import Vue from 'vue'

import formValidator from './formValidator'
import formServiceExtend from './formServiceExtend'
import abCheckboxGroup from './custform-components/ab-checkbox-group.vue'
import abDict from './custform-components/ab-dict.vue'
import abSerialNo from './custform-components/ab-serial-no.vue'
Vue.component('abCheckboxGroup', abCheckboxGroup)
Vue.component('abDict', abDict)
Vue.component('abSerialNo', abSerialNo);
import abUpload from './custform-components/ab-upload.vue'
Vue.component('abUpload', abUpload);
import abDate from './custform-components/ab-date.vue'
Vue.component('abDate', abDate);

import abSubAdd from './custform-components/ab-sub-add.vue'
Vue.component('abSubAdd', abSubAdd);
import abSubDel from './custform-components/ab-sub-del.vue'
Vue.component('abSubDel', abSubDel);
import abSubDetail from './custform-components/ab-sub-detail.vue'
Vue.component('abSubDetail', abSubDetail);
import abDynRights from './custform-components/ab-dyn-rights.vue'
Vue.component('abDynRights', abDynRights);
import abSubScope from './custform-components/ab-sub-scope.vue'
Vue.component('abSubScope', abSubScope);


import gwText from './gw-components/gw-text.vue'
Vue.component('gwText', gwText);

import gwOnetext from './gw-components/gw-onetext.vue'
Vue.component('gwOnetext', gwOnetext);

import gwHidden from './gw-components/gw-hidden.vue'
Vue.component('gwHidden', gwHidden);

import gwMultitext from './gw-components/gw-multitext.vue'
Vue.component('gwMultitext', gwMultitext);

import gwSelect from './gw-components/gw-select.vue'
Vue.component('gwSelect', gwSelect);

import gwCheckbox from './gw-components/gw-checkbox.vue'
Vue.component('gwCheckbox', gwCheckbox);

import gwRadio from './gw-components/gw-radio.vue'
Vue.component('gwRadio', gwRadio);

import gwDic from './gw-components/gw-dic.vue'
Vue.component('gwDic', gwDic);

import gwSerialno from './gw-components/gw-serialno.vue'
Vue.component('gwSerialno', gwSerialno);

import gwDate from './gw-components/gw-date.vue'
Vue.component('gwDate', gwDate);

import gwFile from './gw-components/gw-file.vue'
Vue.component('gwFile', gwFile);

let FormService = {}
    /**
     * 自定义表单初始化
     * @html 自定义表单的HTML 代码
     * @data 表单的数据，会混入到自定义表单组件中
     */
FormService.initCustFormFu = function(html, data, readonly) {

    //是否是全局只读状态
    if (readonly) {
        FormService.readonly = readonly;
    } else {
        FormService.readonly = false;
    }

    // 流程那里 url 表单不处理
    if (data.form && data.form.type !== 'INNER') return

    // let html = data.form.formHtml;
    window.custFormComponentMixin = {}
    var custComponentData = data

    // 处理 custFormComponentMixin
    if (html.indexOf('<script>') != -1) {
        let reg = /<script[^>]*?>[\s\S]*?<\/script>/i
        let patten = reg.exec(html)
        let script = patten[0]

        let len1 = script.indexOf('>')
        let len2 = script.lastIndexOf('<')
        let custScriptStr = script.substring(len1 + 1, len2)
        html = html.replace(reg, '')

        if (custScriptStr) {
            try {
                // TODO严格模式下问题
                eval(custScriptStr.trim()); // eslint-disable-line
            } catch (e) {
                console.error('解析表单 JavaScript脚本 异常', custScriptStr, e)
            }
        }

        // 用于第三层子表数据暂存 _temp.xxx = [] //则该子表的数据暂存
        custComponentData.subTempData = {};
        //用来作为下拉级联option的载体 一个表单页最多兼容一百个下拉框
        custComponentData.abCustQueryOpMap = {};
        for (let i = 0; i < 200; i++) {
            custComponentData.abCustQueryOpMap["op" + i] = [];
        }
    }

    /**
     * 公共的常用 表单 js
     */
    let custFormMethods = {
        abGetNumber: function(data) {
            if (data === undefined || data === '') {
                return 0;
            }
            let number = Number(data)
            if (number === NaN) {
                console.info('计算对象中存在 NaN')
                return 0
            }
            return number
        },
        abSubAvg: function(subDataList, key) {
            if (!subDataList || !key || subDataList.length == 0) {
                return 'not calculate'
            }
            let sum = 0
            subDataList.forEach(function(data) {
                if (!data[key]) return
                sum = sum + Number(data[key])
            })
            return sum / subDataList.length
        },
        abSubSum: function(subDataList, key) {
            if (!subDataList || !key || subDataList.length == 0) {
                return 'not calculate'
            }
            let sum = 0
            subDataList.forEach(function(data) {
                if (!data[key]) return
                sum = sum + Number(data[key])
            })
            return sum
        }
    }

    Vue.component('ab-custom-form', {
        name: 'customForm',
        //mixins用户混入 vue实例需要的信息，会和原有的属性合并。
        //这里自定义方法和属性之后可以在组件中直接调用，不过要使用$parent去调用
        mixins: [custFormComponentMixin],
        template: html,
        data: function() {
            return custComponentData
        },
        methods: custFormMethods,
        mounted: function() {}
    })

}

Vue.component('ab-url-form', {
    props: ['form'],
    name: 'urlForm',
    template: "<iframe id='frmFrame' src='' @load='iframeHeight(this)' style='width:100%;border:none;'></iframe>",
    data: function() {
        return {
            url: ''
        }
    },
    methods: {
        iframeHeight: function() {
            let height = document.documentElement.clientHeight || document.body.clientHeight
            $(this.$el).height(height - 40)
        }
    },
    mounted: function() {
        if (this.form.type != 'FRAME') return
        let url = this.form.formValue
        url = url.startWith('http') ? url : getProjectUrl(url)
        this.url = url
        $(this.$el).attr('src', url)
    }
})

/**
 * 校验,依赖 v-model 或者 组件的 input 事件
 *
 */
Vue.directive('AbValidate', {

    // bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
    // inserted：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
    // update：所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。
    // componentUpdated：指令所在组件的 VNode 及其子 VNode 全部更新后调用。
    // unbind：只调用一次，指令与元素解绑时调用。

    inserted: function(el, binding, vnode) {

        //只读模式下不检测
        if (!FormService.readonly) {
            formValidator.doValidate(el, binding, vnode, null, "inserted")
        }
        let validateHandler = function(e) {
            if (!e) return;
            if (e.target && e.target !== el) return

            let value = e.target ? e.target.value : e
            formValidator.doValidate(el, binding, vnode, value)
        }

        if (vnode.componentInstance) {
            vnode.componentInstance.$on('input', function(value) {
                validateHandler(value)
            })
        } else {
            addEvent(el, 'input', validateHandler)
        }
    },
    update: function(el, binding, vNode) {
        if (!FormService.readonly) {
            formValidator.doValidate(el, binding, vNode, el.value)
        }
    },
    unbind: function(el, binding, vNode) {
        // 清除该字段校验
        let formContext = vNode.context;

        //判断是否是gw标签 如果是gw标签 则上一级才是form
        if (formContext && formContext.$vnode && formContext.$vnode.data.staticClass && formContext.$vnode.data.staticClass.indexOf("gw-components") > -1) {
            formContext = formContext.$vnode.context
        }

        if (formContext.$validity && formContext.$validity[vNode.data.attrs.desc]) {
            delete formContext.$validity[vNode.data.attrs.desc]
        }

        //清除错误提示
        FormValidator.removeByClass(vNode.elm, "ivu-form-item-error-tip");

    }

})

/**
 * 获取表单的校验情况
 * 自定义表单为<custForm> 组件。当前componentScope 为页面的scope
 * 所以要先找到 custForm 组件的作用域
 * return
 */
FormService.getValidateMsg = function(componentScope) {
    let errorStr = ''
    if (!componentScope.$validity) {
        return errorStr
    }

    for (let key in componentScope.$validity) {
        if (errorStr) {
            errorStr = errorStr + '<br/>'
        }
        errorStr = errorStr + key + ' ： ' + componentScope.$validity[key]

        //校验错误的同时标注错误node
        var vnode = componentScope.$validityNode[key];
        if (vnode) {
            vnode.elm.classList.add("ivu-form-item-error");
            formValidator.addErrTip(vnode, componentScope.$validity[key]);
        }
    }

    if (errorStr) {
        errorStr = "<div style='text-align:left'>" + errorStr + '</div>'
    }

    return errorStr
}

/**
 *  基础权限，对控件做只读、必填、无权限, @v-model 必须
 *  v-ab-permission="permission.kjcs.cskj.xb" v-model=""
 *
 *  判断是否有展示权限，无则移除dom
 *  v-ab-permission:show="permission.kjcs.cskj.xb"
 *
 *   *  判断是否有编辑权限，无则移除dom
 *  v-ab-permission:edit="permission.kjcs.cskj.xb"
 */
Vue.directive('AbPermission', {
    inserted: function(el, binding, vNode) {
        handleElementPermission(el, binding, vNode)
    },
    update: function(el, binding, vNode) {
        if (binding.oldValue && binding.oldValue === binding.value) {
            return;
        }

        handleElementPermission(el, binding, vNode)
    }
})

/**
 * 处理控件权限
 *
 * @param el
 * @param binding
 * @param vnode
 * @returns
 */
function handleElementPermission(el, binding, vnode) {
    if (!binding.value) return

    //重新计算时，[还原权限]
    if (binding.oldValue && binding.oldValue != 'w') {
        if (binding.oldValue == 'b') {
            vnode.elm.required = false;
            el.dataset._oldValue = undefined
        } else if (binding.oldValue == 'r') {
            vnode.elm.readOnly = false;
            vnode.elm.disabled = false;
            if (vnode.elm.childNodes) {
                disableChildNodes(vnode.elm, false);
            }
        } else if (binding.oldValue == 'n') {
            vnode.elm.style.display = ""
        }
    }


    if (binding.arg) {
        handleSpecialPermission(el, binding, vnode)
        return
    }

    // 处理必填权限
    if (binding.value == 'b') {
        el.dataset._oldValue = undefined
        vnode.elm.required = true
            // TODO  触发校验计算
    } else if (binding.value === 'w') {

    }
    //
    else if (binding.value === 'r') {
        vnode.elm.readOnly = true;
        vnode.elm.disabled = true;
        if (vnode.elm.childNodes) {
            disableChildNodes(vnode.elm, true)
        }
    } else if (binding.value === 'n') {
        vnode.elm.style.display = "none"
    }

    el.dataset.hasInited = true
}
// 讲子组件全部disable
function disableChildNodes(elm, isReadOnly) {
    if (elm.childNodes) {
        elm.childNodes.forEach(function(child) {
            child.disabled = isReadOnly
            child.readOnly = isReadOnly;
            if (child.childNodes) {
                disableChildNodes(child, isReadOnly)
            }
        })
    }
}

function handleSpecialPermission(el, binding, vnode) {
    // 无展示权限则移除掉标签
    if (binding.arg === 'show' && binding.value == 'n') {
        vnode.elm.style.display = "none"
    }

    // 无编辑权限则移除掉控件
    if (binding.arg === 'edit' && binding.value !== 'w' && binding.value !== 'b') {
        vnode.elm.style.display = "none"
    }
}

function addEvent(element, event, listener) {
    if (element.addEventListener) {
        element.addEventListener(event, listener, false)
    } else if (element.attachEvent) {
        element.attachEvent('on' + event, listener)
    } else {
        element['on' + event] = listener
    }
}

export default FormService