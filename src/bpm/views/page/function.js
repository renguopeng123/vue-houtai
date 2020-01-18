import {
    attr_id,
    arrt_column_comment,
    arrt_column_key,
    arrt_column_type,
    arrt_column_length,
    arrt_column_placeholder,
    arrt_column_defaultValue,
    arrt_column_options,
    arrt_column_eheight,
    arrt_column_ewidth,
    arrt_column_dickey,
    arrt_column_alias,
    arrt_column_format,
    arrt_column_validRule

} from '@/bpm/views/page/global'


export function getRuleName(validRule) {
    var rule = JSON.parse(validRule);
    if (rule == null || rule.length == 0) {
        return "";
    }
    var ruleStr = "";
    for (const data of rule) {
        ruleStr += data.name + ",";
    }
    return ruleStr;
}

export function getRuleTitle(validRule) {
    var rule = JSON.parse(validRule);
    if (rule == null || rule.length == 0) {
        return "未设置校验规则";
    }
    var ruleStr = "";
    for (const data of rule) {
        ruleStr += data.title + ",";
    }
    return ruleStr;
}

export function getConfig(config, key) {
    var conf = JSON.parse(config);
    if (conf == null) {
        return "";
    }
    if (conf[key]) {
        return conf[key];
    }
    return "";
}

export function getValue(config, key) {
    if (config[key]) {
        return config[key];
    }
    return "";
}


export function onetext_attr(dom, placeholderText, defaultValue) {
    dom.setAttribute(arrt_column_placeholder, placeholderText);
    dom.setAttribute(arrt_column_defaultValue, defaultValue);
}

export function multitext_attr(dom, placeholderText, eheight, ewidth, defaultValue) {
    dom.setAttribute(arrt_column_placeholder, placeholderText);
    dom.setAttribute(arrt_column_defaultValue, defaultValue);
    dom.setAttribute(arrt_column_eheight, eheight);
    dom.setAttribute(arrt_column_ewidth, ewidth);
}

export function select_attr(dom, placeholderText, options, defaultValue) {
    dom.setAttribute(arrt_column_placeholder, placeholderText);
    dom.setAttribute(arrt_column_defaultValue, defaultValue);
    dom.setAttribute(arrt_column_options, options);
}

export function checkbox_attr(dom, placeholderText, options, defaultValue) {
    dom.setAttribute(arrt_column_placeholder, placeholderText);
    dom.setAttribute(arrt_column_defaultValue, defaultValue);
    dom.setAttribute(arrt_column_options, options);
}

export function radio_attr(dom, placeholderText, options, defaultValue) {
    dom.setAttribute(arrt_column_placeholder, placeholderText);
    dom.setAttribute(arrt_column_defaultValue, defaultValue);
    dom.setAttribute(arrt_column_options, options);
}

export function dic_attr(dom, placeholderText, key, defaultValue) {
    dom.setAttribute(arrt_column_placeholder, placeholderText);
    dom.setAttribute(arrt_column_defaultValue, defaultValue);
    dom.setAttribute(arrt_column_dickey, key);
}

export function serialno_attr(dom, placeholderText, alias, defaultValue) {
    dom.setAttribute(arrt_column_placeholder, placeholderText);
    dom.setAttribute(arrt_column_defaultValue, defaultValue);
    dom.setAttribute(arrt_column_alias, alias);
}

export function date_attr(dom, placeholderText, format, defaultValue) {
    dom.setAttribute(arrt_column_placeholder, placeholderText);
    dom.setAttribute(arrt_column_defaultValue, defaultValue);
    dom.setAttribute(arrt_column_format, format);
}

export function file_attr(dom, placeholderText, defaultValue) {
    dom.setAttribute(arrt_column_placeholder, placeholderText);
    dom.setAttribute(arrt_column_defaultValue, defaultValue);
}