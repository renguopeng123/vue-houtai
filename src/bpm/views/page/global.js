//组件类型
export const column_type = {
    "": "未选组件",
    "null": "未选组件",
    "hidden": "隐藏",
    "onetext": "单行文本",
    "multitext": "多行文本",
    "select": "下拉框",
    "checkbox": "复选框",
    "radio": "单选按钮",
    "dic": "数据字典",
    "serialno": "流水号",
    "date": "日期组件",
    "file": "附件上传"
};

//字段类型对应的组件
//大文本
export const column_clob_type = ["hidden", "multitext", "file"];
//日期
export const column_date_type = ["hidden", "date"];
//字符串
export const column_varchar_type = ["hidden", "onetext", "multitext", "select", "checkbox", "radio", "dic", "serialno", "file"];
//数字
export const column_number_type = ["hidden", "onetext", "select", "radio", "dic", "serialno"];

//类型对应图标
export const column_type_icon = {
    "": "page-empty",
    "null": "page-empty",
    "hidden": "page-hidden",
    "onetext": "page-onetext",
    "multitext": "page-multitext",
    "select": "page-select",
    "checkbox": "page-checkbox",
    "radio": "page-radio",
    "dic": "page-dic",
    "serialno": "page-number",
    "date": "page-sj",
    "file": "page-fj"
}

//组件标签
export const prefix = "gw-";
export const gw_onetext = prefix + "onetext";
export const gw_multitext = prefix + "multitext";
export const gw_hidden = prefix + "hidden";
export const gw_select = prefix + "select";
export const gw_checkbox = prefix + "checkbox";
export const gw_radio = prefix + "radio";
export const gw_dic = prefix + "dic";
export const gw_serialno = prefix + "serialno";
export const gw_date = prefix + "date";
export const gw_file = prefix + "file";

//自定义gw标签中的编辑器需要显示的文字，暂时用gw_text包裹
export const gw_text = prefix + "text";
//子表标签
export const gw_sub_tab = prefix + "sub-tab";
export const attr_sub_type = prefix + "sub-type";
export const attr_sub_col = prefix + "sub-col";

//扩展属性
//字段ID
export const attr_id = "column-id";
//字段描述
export const arrt_column_comment = "column-comment";
//字段名
export const arrt_column_key = "column-key";
//对应表名
export const arrt_table_key = "table-key";
//对应业务对象名
export const arrt_bo_key = "bo-key";
//字段组件类型
export const arrt_column_type = "column-type";
//长度
export const arrt_column_length = "column-length";
//配置项
//这里注意需要都是小写 dom添加属性最终都会转换成小写 这里如果用了大写编辑器最后会不支持
export const arrt_column_placeholder = "column-placeholder";
export const arrt_column_defaultValue = "column-defaultvalue";
export const arrt_column_options = "column-options";
export const arrt_column_eheight = "column-eheight";
export const arrt_column_ewidth = "column-ewidth";
export const arrt_column_dickey = "column-dic-key";
export const arrt_column_alias = "column-serialno-alias";
export const arrt_column_format = "column-date-format";

//增加修改组件步骤，首先这里注册主键名称和配置项目
//function.js 中增加或修改主键设置属性的方法xxx_attr
//editorUtils.js 中createEditorComponent 点击左侧组件按钮的时候增加对应组件判断
//增加组件的话需要修改点击下拉列表之后切换组件对应的类型 这里注册相关信息 ComponentsTree.vue 中修改按钮点击事件
//修改组件面板 store component的componentPanel需要对应增加修改组件需要修改的属性
//面板中对应修改组件的 vue，比如 onetext.vue select.vue checkbox.vue 这些
//saveButton.vue 中对应修改保存初始化的componentPanel的值和修改后dom的值
//LeftPanel.vue 中第一次打开覆盖也需要更改

//校验规则
export const arrt_column_validRule = "column-valid-rule";

export var extAttributes = attr_id + "|" + arrt_column_comment + "|" + arrt_column_key + "|" + arrt_bo_key + "|" + arrt_table_key + "|" + arrt_column_type +
    "|" + arrt_column_length + "|" + arrt_column_placeholder + "|" + arrt_column_defaultValue + "|" + arrt_column_options + "|" + arrt_column_validRule +
    "|" + arrt_column_eheight + "|" + arrt_column_ewidth + "|" + arrt_column_dickey + "|" + arrt_column_alias + "|" + arrt_column_format + "|class";
//编辑器的自定义元素支持 
//如果希望元素的行为是span元素而不是div元素，则可以在元素名称前面加~前缀，组件类的都要用span模式，区域类的比如子表区域用div模式
//custom_elements : 'mycustomblock,~mycustominline' 
export var customElements = "~" + gw_text + "," + gw_sub_tab + ",~" + gw_onetext + ",~" + gw_multitext +
    ",~" + gw_hidden + ",~" + gw_select + ",~" + gw_checkbox + ",~" + gw_radio + ",~" + gw_dic +
    ",~" + gw_serialno + ",~" + gw_date + ",~" + gw_file;

//配置元素对应支持的属性 
export var extended_valid_elements = 'input[ref|type|placeholder|id|v-model|value|name|v-ab-permission],script[*],span[*],' +
    gw_text + "[]," + gw_sub_tab + "[" + attr_sub_type + "|" + attr_sub_col + "]," + gw_onetext + '[' + extAttributes + '],' + gw_multitext + '[' + extAttributes + '],' +
    gw_hidden + '[' + extAttributes + '],' + gw_select + '[' + extAttributes + '],' + gw_checkbox + '[' + extAttributes + '],' +
    gw_radio + '[' + extAttributes + '],' + gw_dic + '[' + extAttributes + '],' + gw_serialno + '[' + extAttributes + '],' +
    gw_date + '[' + extAttributes + '],' + gw_file + '[' + extAttributes + '],';

//组件的默认配置

export const default_hidden_ctrl = {
    "config": "{}",
    "type": "hidden",
    "validRule": "[]"
}

export const default_onetext_ctrl = {
    "config": "{}",
    "type": "onetext",
    "validRule": "[]"
}

export const default_multitext_ctrl = {
    "config": "{\"eheight\":\"300\",\"ewidth\":\"500\",\"isEditor\":\"0\"}",
    "type": "multitext",
    "validRule": "[]"
}

export const default_select_ctrl = {
    "config": "{\"options\":[{\"txt\":\"选择项\",\"key\":\"值\"}]}",
    "type": "select",
    "validRule": "[]"
}

export const default_checkbox_ctrl = {
    "config": "{\"options\":[{\"txt\":\"选择项\",\"key\":\"值\"}],\"placeholder\":false}",
    "type": "checkbox",
    "validRule": "[]"
}

export const default_radio_ctrl = {
    "config": "{\"options\":[{\"txt\":\"选择项\",\"key\":\"值\"}],\"placeholder\":false}",
    "type": "radio",
    "validRule": "[]"
}

export const default_dic_ctrl = {
    "config": "{\"key\":\"\"}",
    "type": "dic",
    "validRule": "[]"
}

export const default_serialno_ctrl = {
    "config": "{\"name\":\"每天使用一组流水号\",\"alias\":\"dayNo\",\"key\":\"\"}",
    "type": "serialno",
    "validRule": "[]"
}

export const default_file_ctrl = {
    "config": "{}",
    "type": "file",
    "validRule": "[]"
}

export const default_date_ctrl = {
    "config": "{\"format\":\"yyyy-MM-dd HH:mm:ss\",\"less\":\"\",\"greater\":\"\"}",
    "type": "date",
    "validRule": "[]"
}