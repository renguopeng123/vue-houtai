export const DATA_SOURCE = [{
  value: "local",
  label: "本地数据源"
}];

export const FIELD_INFO_TEMPLATE = {
  name: "", //字段名
  propertyName: "", //属性名
  remarkName: "", //备注名
  dataType: "varchar", //数据类型
  propertyLength: 50, //属性长度
  fieldCheck: [],//字段校验
  widget: "", //字段控件
  isSaved: false, //是否保存了
  dataTypeLabel: "" //用于数据类型显示
}

export const FIELD_DATA_TYPE = [{
  label: "字符串",
  value: "varchar",
  isHaveLength: true,
  fieldWidget: [{
    label: "隐藏",
    value: "hidden"
  }, {
    label: "单行文本",
    value: "onetext"
  }, {
    label: "多行文本",
    value: "multitext"
  }, {
    label: "下拉框",
    value: "select"
  }, {
    label: "复选框",
    value: "checkbox"
  }, {
    label: "单选按钮",
    value: "radio"
  }, {
    label: "数据字典",
    value: "dic"
  }, {
    label: "流水号",
    value: "serialno"
  }, {
    label: "附件上传",
    value: "file"
  }]
}, {
  label: "大文本",
  value: "clob",
  isHaveLength: false,
  fieldWidget: [{
    label: "隐藏",
    value: "hidden"
  }, {
    label: "多行文本",
    value: "multitext"
  }, {
    label: "附件上传",
    value: "file"
  }]
}, {
  label: "日期型",
  value: "date",
  isHaveLength: false,
  fieldWidget: [{
    label: "隐藏",
    value: "hidden"
  }, {
    label: "日期控件",
    value: "date"
  }]
}, {
  label: "数字型",
  value: "number",
  isHaveLength: true,
  fieldWidget: [{
    label: "隐藏",
    value: "hidden"
  }, {
    label: "单行文本",
    value: "onetext"
  }, {
    label: "下拉框",
    value: "select"
  }, {
    label: "单选按钮",
    value: "radio"
  }, {
    label: "数据字典",
    value: "dic"
  }, {
    label: "流水号",
    value: "serialno"
  },]
}];

export const FIELD_DATA_TYPE_INDEX = {
  "varchar": 0,
  "clob":1,
  "date":2,
  "number":3,
}

export const FIELD_CHECK = [{
  label:"必填",
  value:"required"
},{
  label:"数字",
  value:"number"
},{
  label:"字母或下划线",
  value:"latterOrUnderline"
},{
  label:"email",
  value:"email"
},{
  label:"url",
  value:"url"
},{
  label:"日期",
  value:"date"
},{
  label:"时间",
  value:"time"
},{
  label:"汉字",
  value:"chineseCharacter"
},{
  label:"QQ号",
  value:"QQNumber"
},{
  label:"手机号码",
  value:"phoneNumber"
},{
  label:"整数",
  value:"integer"
},{
  label:"不以数字开头",
  value:"notStartWithDigital"
},{
  label:"以字母开头",
  value:"startWithLetter"
}]

export const CHECKBOX_FILL = ".checkbox-simulation/fill";
