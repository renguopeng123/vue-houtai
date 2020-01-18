import {
    column_type,
    prefix,
    gw_text,
    gw_onetext,
    gw_multitext,
    gw_hidden,
    gw_select,
    gw_checkbox,
    gw_radio,
    gw_dic,
    gw_serialno,
    gw_date,
    gw_file,
    column_type_icon,
    attr_id,
    arrt_column_comment,
    arrt_column_key,
    arrt_table_key,
    arrt_bo_key,
    arrt_column_type,
    arrt_column_length,
    arrt_column_validRule,
    arrt_column_defaultValue

} from '@/bpm/views/page/global'

import {
    getRuleName,
    getConfig,
    onetext_attr,
    multitext_attr,
    select_attr,
    checkbox_attr,
    radio_attr,
    dic_attr,
    serialno_attr,
    date_attr,
    file_attr
} from '@/bpm/views/page/function'


export function editorSetup(obj, editor) {

    // editor.on('click', function(e) {
    //     console.log('Editor was clicked');
    //     obj.$store.dispatch('page/changeEditor', {
    //         key: "state",
    //         value: "click"
    //     })
    // });

    // editor.on('focus', function(e) {
    //     console.log('Editor was focused');
    //     obj.$store.dispatch('page/changeEditor', {
    //         key: "state",
    //         value: "focus"
    //     })
    // });

    editor.on('change', function(e) {
        console.log('Editor was change');
        obj.$store.dispatch('page/saveEditor', 'change')
    });

}

export function editorOBserver(obj, editor) {

    //on就是editor的Observer 不过不好用
    //https://www.tiny.cloud/docs/api/tinymce.util/tinymce.util.observable/
    // editor.on('change', function(e) {
    //     console.log('Editor was change');
    //     console.log(e);
    //     // obj.$store.dispatch('page/changeEditor', {
    //     //     key: "state",
    //     //     value: "focus"
    //     // })
    // });

    //注册MutationObserver用来监听dom变化
    //DOM 的任何变动，比如节点的增减、属性的变动、文本内容的变动，这个 API 都可以得到通知。
    //它很接近事件，可以理解为 DOM 发生变动就会触发 Mutation Observer 事件。但是，它与事件有一个本质不同：事件是同步触发，也就是说，DOM 的变动立刻会触发相应的事件；Mutation Observer 则是异步触发，DOM 的变动并不会马上触发，而是要等到当前所有 DOM 操作都结束才触发。
    //这样设计是为了应付 DOM 变动频繁的特点。举例来说，如果文档中连续插入1000个<p>元素，就会连续触发1000个插入事件，执行每个事件的回调函数，这很可能造成浏览器的卡顿；而 Mutation Observer 完全不同，只在1000个段落都插入结束后才会触发，而且只触发一次。
    var dom = editor.getBody();

    var observer = new MutationObserver(function(mutations, observer) {

        mutations.forEach(function(mutation) {

            //注意执行顺序 编辑html的时候会当作一次事件 整个dom会全部删除后再插入编辑源码的dom
            //这里的RemovedNodes和AddNodes会在一次事件中打在一起
            //编辑html的时候如果删除了 其中的某个节点组件 这里的顺序如果先执行添加 则删除事件会把所有按钮都删除 左边全部显示可用
            //所有删除节点（需要递归遍历子节点）
            doRemovedNodes(mutation.removedNodes, obj);

            // console.log(mutation);
            doAddNodes(mutation.addedNodes, obj);

        })
    });

    // childList：子节点的变动（指新增，删除或者更改）。
    // attributes：属性的变动。
    // characterData：节点内容或节点文本的变动。
    // subtree：布尔值，表示是否将该观察器应用于该节点的所有后代节点。
    // attributeOldValue：布尔值，表示观察attributes变动时，是否需要记录变动前的属性值。
    // characterDataOldValue：布尔值，表示观察characterData变动时，是否需要记录变动前的值。
    // attributeFilter：数组，表示需要观察的特定属性（比如['class','src']）。
    var options = {
        'childList': true,
        'attributes': true,
        'characterData': true,
        'subtree': true,
        'attributeOldValue': true,
        'characterDataOldValue': true,
        //整个捕获不到 编辑器每次都是删除后重新插入 激活不了属性变化的事件
        'attributeFilter': [attr_id, arrt_column_key, arrt_column_type]
    };

    observer.observe(dom, options);

}

export function addEditorComponent(obj, columnID) {

    //编辑器
    var editor = window.tinymce.activeEditor;
    //选择器
    var selection = editor.selection;

    var gw = createEditorComponent(obj, columnID);
    selection.setNode(gw);

}

export function createEditorComponent(obj, columnID) {
    //字段完整对象
    var column = obj.$store.state.component.businessColumn[columnID];
    //编辑器
    var editor = window.tinymce.activeEditor;
    //编辑器的dom，相当于html的dom
    var dom = editor.dom;

    //插入元素(编辑器这层最好只插入一个元素 删除和左侧关联不会出问题，多个元素的话删除某一部分和左侧对应不上)
    var gw = dom.create(gw_onetext);

    if (column.ctrl.type == "hidden") {
        gw = dom.create(gw_hidden);
        gw.setAttribute(arrt_column_defaultValue, column.defaultValue);
    }
    if (column.ctrl.type == "onetext") {
        gw = dom.create(gw_onetext);
        onetext_attr(gw, getConfig(column.ctrl.config, "placeholderText"), column.defaultValue);
    }
    if (column.ctrl.type == "multitext") {
        gw = dom.create(gw_multitext);
        multitext_attr(gw, getConfig(column.ctrl.config, "placeholderText"), getConfig(column.ctrl.config, "eheight"), getConfig(column.ctrl.config, "ewidth"), column.defaultValue);
    }
    if (column.ctrl.type == "select") {
        gw = dom.create(gw_select);
        select_attr(gw, getConfig(column.ctrl.config, "placeholderText"), JSON.stringify(getConfig(column.ctrl.config, "options")), column.defaultValue);
    }
    if (column.ctrl.type == "checkbox") {
        gw = dom.create(gw_checkbox);
        checkbox_attr(gw, getConfig(column.ctrl.config, "placeholderText"), JSON.stringify(getConfig(column.ctrl.config, "options")), column.defaultValue);
    }
    if (column.ctrl.type == "radio") {
        gw = dom.create(gw_radio);
        radio_attr(gw, getConfig(column.ctrl.config, "placeholderText"), JSON.stringify(getConfig(column.ctrl.config, "options")), column.defaultValue);
    }
    if (column.ctrl.type == "dic") {
        gw = dom.create(gw_dic);
        dic_attr(gw, getConfig(column.ctrl.config, "placeholderText"), getConfig(column.ctrl.config, "key"), column.defaultValue);
    }
    if (column.ctrl.type == "serialno") {
        gw = dom.create(gw_serialno);
        serialno_attr(gw, getConfig(column.ctrl.config, "placeholderText"), getConfig(column.ctrl.config, "alias"), column.defaultValue);
    }
    if (column.ctrl.type == "date") {
        gw = dom.create(gw_date);
        date_attr(gw, getConfig(column.ctrl.config, "placeholderText"), getConfig(column.ctrl.config, "format"), column.defaultValue);
    }
    if (column.ctrl.type == "file") {
        gw = dom.create(gw_file);
        file_attr(gw, getConfig(column.ctrl.config, "placeholderText"), column.defaultValue);
    }

    //基础属性 不用修改的
    gw.setAttribute(attr_id, columnID);
    gw.setAttribute(arrt_column_comment, column.comment);
    gw.setAttribute(arrt_column_key, column.key);
    gw.setAttribute(arrt_table_key, column.tableKey);
    gw.setAttribute(arrt_bo_key, obj.$store.state.page.pageObject.boKey);
    gw.setAttribute(arrt_column_type, column.ctrl.type);
    gw.setAttribute(arrt_column_length, column.length);
    gw.setAttribute(arrt_column_validRule, getRuleName(column.ctrl.validRule));
    gw.setAttribute("class", "gw-components");

    gw.innerHTML = '<' + gw_text + '><span class="icon iconfont icon-' + column_type_icon[column.ctrl.type] + ' "></span> ' +
        column.comment + "|" + column.key + "|" + column_type[column.ctrl.type] + "</" + gw_text + ">";

    return gw;
}

function doAddNodes(addNodes, obj) {

    //所有添加节点
    for (var i = 0; i < addNodes.length; i++) {
        var node = addNodes[i];

        if (node.childNodes != null) {
            doAddNodes(node.childNodes, obj);
        }

        // console.log("node.nodeName" + node.nodeName)
        if (node.nodeName.toLowerCase().indexOf(prefix) == 0) {

            var _id = node.getAttribute(attr_id);

            if (_id != null && _id != "") {

                //判断是否存在 给予提示 同一个字段不能添加多次

                //这对于表格编辑的提示问题
                //表格编辑的时候是先删除选中的行或者列 之后逐一添加 
                //原理是先添加td 之后添加 tr 所以会造成两次事件触发问题（但是其实组件dom没有添加两次）
                //第一次触发td添加事件 里面有组件，第二次触发tr添加事件 但是这时候里面组件没有重复添加（只是把属性和事件重新绑定了一下）
                //如果按照先tr 再td的方式应该就不会触发这里 暂时解决方式增加判断编辑器中是否确实也存在多个节点
                //获取所有column-id 为 _id的组件 

                var gwNode = window.tinymce.activeEditor.dom.getRoot().querySelectorAll("[" + attr_id + "='" + _id + "']");
                console.log("当前组件" + _id + "节点数" + gwNode.length);

                if (obj.$store.state.component.editorColumn[_id] != null && gwNode.length > 1) {


                    //这块判断有问题 再删除表格行的时候
                    var _column_comment = node.getAttribute(arrt_column_comment);
                    var _column_key = node.getAttribute(arrt_column_key);

                    obj.$notify({
                        title: '添加组件错误',
                        message: '字段 ' + _column_comment + ' (' + _column_key + ') 已添加过，重复添加字段会造成页面处理错误！已删除页面中重复的字段。',
                        type: 'error',
                        duration: 0
                    })

                    node.setAttribute("del", "repeat");
                    node.parentNode.removeChild(node);

                    return
                }

                obj.$store.dispatch('component/addEditorCol', {
                    id: _id,
                    dom: node
                })
                obj.$store.dispatch('component/setColumnUsed', {
                    "id": _id,
                    "used": true
                });

                //这里添加不想存储到最终html中的属性
                //tabindex hidefocus增加div span 支持焦点选中事件 
                //这里加入而不是addEditorComponent中加入的好处是不用设置编辑器的extended_valid_elements中支持的属性
                //同时也不会将tabindex和hidefocus存入html中 防止最终打开页面可能造成的影响
                //即tabindex hidefocus title这些属性我只想在编辑器中使用 不希望在最终页面打开则在这里设置
                node.setAttribute("tabindex", 0);
                node.setAttribute("hidefocus", true);
                node.setAttribute("title", "文本处单击修改组件名称，文本外双击激活拖动和删除。");

                //点击事件
                //先移除事件 防止绑定多次
                if (node.$click != null) {
                    console.log("事件移除click" + _id)
                    node.removeEventListener("click", node.$click);
                }
                var click = function(event) {
                    if (event.target.getAttribute("column-id") == null) {
                        //阻止不了冒泡??
                        return;
                    }
                    //这里使用不了attr_id
                    console.log("点击" + event.target.getAttribute("column-id"));
                    //只有全选可以激活浏览器的拖动和删除功能 直接单击无法全选 实现不了拖动 
                    obj.$store.dispatch('component/setActiveComponent', event.target.getAttribute("column-id"));
                    removeClass(event.target, "dblclick");
                    //防止冒泡
                    event.stopPropagation();
                    window.event.cancelBubble = true;
                    return false;
                }
                node.addEventListener("click", click);
                node.$click = click;

                //双击之后增加一个class 加强拖动效果
                //先删除当前的dblclick效果（拖动之后触发不了blur）
                removeClass(node, "dblclick");
                if (node.$dblclick != null) {
                    console.log("事件移除dblclick" + _id)
                    node.removeEventListener("dblclick", node.$dblclick);
                }
                var dblclick = function(event) {
                    if (event.target.getAttribute("column-id") == null) {
                        return;
                    }
                    console.log("双击" + event.target.getAttribute("column-id"));
                    //只有全选可以激活浏览器的拖动和删除功能 直接单击无法全选 实现不了拖动 
                    obj.$store.dispatch('component/setActiveComponent', event.target.getAttribute("column-id"));
                    addClass(event.target, "dblclick");
                    //防止冒泡
                    event.stopPropagation();
                    window.event.cancelBubble = true;
                    return false;
                }
                node.addEventListener("dblclick", dblclick);
                node.$dblclick = dblclick;

                //获取焦点事件
                if (node.$focus != null) {
                    console.log("事件移除focus" + _id)
                    node.removeEventListener("focus", node.$focus);
                }
                var focus = function(event) {
                    console.log("焦点" + event.target.getAttribute("column-id"));
                    obj.$store.dispatch('component/setActiveComponent', event.target.getAttribute("column-id"));
                }
                node.addEventListener("focus", focus);
                node.$focus = focus;

                //失去焦点事件
                if (node.$blur != null) {
                    console.log("事件移除blur" + _id)
                    node.removeEventListener("blur", node.$blur);
                }
                var blur = function(event) {
                    console.log("失去焦点事件" + event.target.getAttribute("column-id"));
                    if (obj.$store.state.component.activeComponent == event.target.getAttribute("column-id")) {
                        //不设置激活字段为空 否则右侧编辑框会退出
                        // obj.$store.dispatch('component/setActiveComponent', "");
                    }
                    removeClass(event.target, "dblclick");
                }
                node.addEventListener("blur", blur);
                node.$blur = blur;

                console.log("添加节点" + _id);
            }
        }
    }
}


function doRemovedNodes(removedNodes, obj) {

    // debugger
    for (var i = 0; i < removedNodes.length; i++) {

        var node = removedNodes[i];

        if (node.childNodes != null) {
            doRemovedNodes(node.childNodes, obj);
        }

        if (node.nodeName.toLowerCase().indexOf(prefix) == 0) {
            var _id = node.getAttribute(attr_id);

            var del = node.getAttribute("del");
            //添加重复的删除事件不处理
            if (del != null && del == "repeat") {
                return
            }

            if (_id != null && _id != "") {
                obj.$store.dispatch('component/delEditorCol', _id);
                obj.$store.dispatch('component/setColumnUsed', {
                    "id": _id,
                    "used": false
                });
                //当前选中的节点是删除节点则设为空
                if (obj.$store.state.component.activeComponent == _id) {
                    obj.$store.dispatch('component/setActiveComponent', "");
                }
                console.log("删除节点" + _id);
            }
        }
    }
}


//判断样式是否存在
function hasClass(ele, cls) {
    return ele.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
}
//为指定的dom元素添加样式
function addClass(ele, cls) {
    if (!hasClass(ele, cls)) ele.className += " " + cls;
}
//删除指定dom元素的样式
function removeClass(ele, cls) {
    if (hasClass(ele, cls)) {
        var reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
        ele.className = ele.className.replace(reg, "");
    }
}
//如果存在(不存在)，就删除(添加)一个样式
function toggleClass(ele, cls) {
    if (hasClass(ele, cls)) {
        removeClass(ele, cls);
    } else {
        addClass(ele, cls);
    }
}