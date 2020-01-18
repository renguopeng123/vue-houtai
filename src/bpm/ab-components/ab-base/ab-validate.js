import Vue from 'vue'
let formValidator = {};
export default formValidator;

Vue.directive("AbValidate",{
  inserted:function(el,binding,vnode){
    let prop = vnode.componentInstance.prop;
    if(!prop) {
      console.debug("form-item validate require prop attr !");
      return;
    }
    if(!vnode.context.abFormValidate){
      console.debug("v-ab-validate指令 需要 context 中定义 data abFormValidate !");
    }
    //getPropByPath(model, path).v;
    vnode.context.abFormValidate[prop] =  {required: true, message: '必填',trigger:"change"};
    vnode.componentInstance.isRequired = true;
  },
  unbind :function(el, binding, vnode,oldVnode){

  }

})



/**
 *  基础权限，对控件做只读、必填、无权限
 *  v-ab-permission="permission.kjcs.cskj.xb" v-model=""
 *
 *  判断是否有展示权限，无则移除dom
 *  v-ab-permission:show="permission.kjcs.cskj.xb"
 *
 *   *  判断是否有编辑权限，无则移除dom
 *  v-ab-permission:edit="permission.kjcs.cskj.xb"
 */
Vue.directive('AbPermission', {
  inserted: function (el, binding, vnode) {
    handleElementPermission(el, binding, vnode)
  },
  update: function (el, binding, vnode) {
    handleElementPermission(el, binding, vnode)
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
function handleElementPermission (el, binding, vnode) {
  if (!binding.value) return
  // 只成功处理一次
  if (el.dataset.hasInited) return

  if (binding.arg) {
    handleSpecialPermision(el, binding, vnode)
    return
  }

  // 处理必填权限
  if (binding.value == 'b') {
    el.dataset._oldValue = undefined
    vnode.elm.required = true
  } else if (binding.value === 'w') {

  }
  //
  else if (binding.value === 'r') {
    vnode.elm.readonly = true
    vnode.elm.disabled = true
  } else if (binding.value === 'n') {
    vnode.elm.remove()
  }

  el.dataset.hasInited = true
}

function handleSpecialPermision (el, binding, vnode) {
  // 无展示权限则移除掉标签
  if (binding.arg === 'show' && binding.value == 'n') {
    vnode.elm.remove()
  }

  // 无编辑权限则移除掉控件
  if (binding.arg === 'edit' && binding.value !== 'w' && binding.value !== 'b') {
    vnode.elm.remove()
  }

  el.dataset.hasInited = true
}

function getPropByPath (obj, path) {
  let tempObj = obj
  path = path.replace(/\[(\w+)\]/g, '.$1')
  path = path.replace(/^\./, '')

  let keyArr = path.split('.')
  let i = 0

  for (let len = keyArr.length; i < len - 1; ++i) {
    let key = keyArr[i]
    if (key in tempObj) {
      tempObj = tempObj[key]
    } else {
      throw new Error('[iView warn]: please transfer a valid prop path to form item!')
    }
  }
  return {
    o: tempObj,
    k: keyArr[i],
    v: tempObj[keyArr[i]]
  }
}

formValidator.rules = {
  'required': {
    rule: function (v) {
      if (v == '' || v.length == 0) { return false }
      return true
    },
    title: '必填',
    formRule: true,
    msg: '必填'
  },
  'number': {
    rule: function (v) {
      return /^-?((\d{1,3}(,\d{3})+?|\d+)(\.\d{1,5})?)$/
        .test(v.trim())
    },
    title: '数字',
    formRule: true,
    msg: '只能输入数字'
  },
  'letiable': {
    rule: function (v) {
      return /^[A-Za-z_]*$/gi.test(v.trim())
    },
    title: '字母或下划线',
    formRule: true,
    msg: '只能是字母和下划线'
  },
  'fields': {
    rule: function (v) {
      return /^[A-Za-z]{1}([a-zA-Z0-9_]{1,17})?$/gi.test(v.trim())
    },
    msg: '首字符为字母,最大长度18'
  },
  'minlength': {
    rule: function (v, b) {
      return (v.length >= b)
    },
    msg: '长度不少于{0}'
  },
  'maxlength': {
    rule: function (v, b) {
      return (v.trim().length <= b)
    },
    msg: '长度不超过{0}'
  },
  'rangelength': {
    rule: function (v, args) {
      return (v.trim().length >= args[0] && v.trim().length <= args[1])
    },
    msg: '长度必须在{0}之{1}间'
  },
  'email': {
    rule: function (v) {
      return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i
        .test(v.trim())
    },
    title: 'email',
    formRule: true,
    msg: '请输入一合法的邮箱地址'
  },
  'url': {
    rule: function (v) {
      return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i
        .test(v.trim())
    },
    title: 'url',
    formRule: true,
    msg: '请输入一合法的网址'
  },
  'date': {
    rule: function (v) {
      let re = /^([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8])))/g
        .test(v.trim())
      return re
    },
    title: '日期',
    formRule: true,
    msg: '请输入日期格式'
  },
  'time': {
    rule: function (v) {
      let re = /^(?:[01]?\d|2[0-3])(?::[0-5]?\d){2}$/g
        .test(v.trim())
      return re
    },
    title: '时间',
    formRule: true,
    msg: '请输入一合法的时间'
  },
  'chinese': {
    rule: function (v) {
      let re = /[\u4E00-\u9FA5\uF900-\uFA2D]/
        .test(v.trim())
      return re
    },
    title: '汉字',
    formRule: true,
    msg: '请输中文字符'
  },
  'qq': {
    rule: function (v) {
      return /^[1-9]*[1-9][0-9]*$/i.test(v.trim())
    },
    title: 'QQ号',
    formRule: true,
    msg: '请输入正确的QQ号码'
  },
  'phonenumber': {
    rule: function (v) {
      if (v.length > 11) return false
      return /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/i.test(v.trim())
    },
    title: '手机号码',
    formRule: true,
    msg: '请输入正确的手机号码'
  },
  'digits': {
    rule: function (v) {
      return /^\d+$/.test(v.trim())
    },
    title: '整数',
    formRule: true,
    msg: '请输入整数'
  },
  'equalto': {
    rule: function (v, b) {
      let a = $('#' + b).val()
      return (v.trim() == a.trim())
    },
    msg: '两次输入不等'
  },
  'range': {
    rule: function (v, args) {
      return v <= args[1] && v >= args[0]
    },
    msg: '请输入在{0}到{1}范围之内的数字'
  },
  'maxvalue': {
    rule: function (v, max) {
      return $.fn.toNumber(v) <= $.fn.toNumber(max)
    },
    msg: '输入的值不能大于{0}'
  },
  'minvalue': {
    rule: function (v, min) {
      return $.fn.toNumber(v) >= $.fn.toNumber(min)
    },
    msg: '输入的值不能小于{0}'
  },
  'maxintlen': {
    // 判断数字整数位
    rule: function (v, b) {
      return (v + '').split('.')[0].replace('/,/g', '').length <= b
    },
    msg: '整数位最大长度为{0}'
  },
  'maxdecimallen': {
    // 判断数字小数位
    rule: function (v, b) {
      return (v + '').replace(/^[^.]*[.]*/, '').length <= b
    },
    msg: '小数位最大长度为{0}'
  },
  'daterangestart': {
    rule: function (v, b, e) {
      return daysBetween(b.targetVal, v)
    },
    msg: '日期必须大于或等于{0}'
  },
  'daterangeend': {
    rule: function (v, b, e) {
      return daysBetween(v, b.targetVal)
    },
    msg: '日期必须小于或等于{0}'
  },
  'empty': {
    // 空的字段（永远通过验证,返回true）  防止在验证JSON中出现有多余的逗号
    rule: function (v, b) {
      //	let start = $("#" + b).val();
      return true
    },
    msg: ''
  },
  'nodigitsstart': {
    // 不能以数字开头
    rule: function (v) {
      return !/^(\d+)(.*)$/.test(v.trim())
    },
    title: '不以数字开头',
    formRule: true,
    msg: '不能以数字开头'
  },
  'letirule': {
    name: 'letirule',
    rule: function (v) {
      return /^[a-zA-Z]\w*$/.test(v.trim())
    },
    title: '以字母开头',
    formRule: true,
    msg: '只能为字母开头,允许字母、数字和下划线'
  },
  /**
   * eg:<input type="text" ng-model="data.name" ht-validate="{isexist:'bOEnt/isExist'}"/>
   * isexist:是请求地址的参数，需要自己实现，要验证的数据参数是‘key’；
   * 返回true:代表已存在，不可用；返回false:不存在，可用
   */
  'isexist': {
    name: 'isexist',
    rule: function (v, url) {
      if (!v) return true
      let b
      if (url.indexOf('?') < 1) {
        url += '?'
      }
      $.ajax({
        url: url + '&key=' + v,
        type: 'POST',
        dataType: 'json',
        async: false,
        success: function (result) {
          b = !result
        }
      })
      return b
    },
    msg: '数据已被使用,请重新填写'
  }
}
