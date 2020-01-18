export default [

    // 通过boKey获取对象模型
    {
        url: '/ecloud-bpm-platform/form/formDef/boTreeData',
        type: 'get',
        response: _ => {
            return boTreeData
        }
    },

    //获取分类
    //ecloud-bpm-platform/sys/sysTreeNode/getNodes?treeKey=bdfl&nodeKey=
    {
        url: '/ecloud-bpm-platform/sys/sysTreeNode/getNodes',
        type: 'get',
        response: _ => {
            return getNodes
        }
    },

    //获取整个表单数据
    //http://test.agilebpm.cn/ecloud-bpm-platform/form/formDef/getObject?id=406295032446582785
    {
        url: '/ecloud-bpm-platform/form/formDef/getObject',
        type: 'get',
        response: _ => {
            return getObject
        }
    },

    //先获取表关联信息
    //http://test.agilebpm.cn/ecloud-bpm-platform/form/formDef/getObject?id=406295032446582785
    {
        url: '/ecloud-bpm-platform/bus/businessObject/getObject',
        type: 'get',
        response: _ => {
            return businessObjectGetObject
        }
    },

    //再获取具体的业务模型（可能是多个）
    //http://test.agilebpm.cn/ecloud-bpm-platform/bus/businessTable/getObject?key=DemoSub&fill=true
    {
        url: '/ecloud-bpm-platform/bus/businessTable/getObject',
        type: 'get',
        response: config => {
            // const {
            //     key
            // } = config.body

            const {
                key
            } = config.query

            console.log("key=" + key)
            if (key == "lkcszbwswxg") {
                return businessTableObjectDemoSub
            } else {
                return businessTableObjectDemo
            }
        }
    },

    //保存表单
    //https://bpm.ecloud.work/ecloud-bpm-platform/form/formDef/save
    {
        url: '/ecloud-bpm-platform/form/formDef/save',
        type: 'post',
        response: _ => {
            return saveFormDef
        }
    }

]

//获取整个表单数据(打开表单编辑器后)
const getObject = {
    "code": "200",
    "data": {
        "boName": "刘凯测试误删除修改-",
        "groupId": "20000002960003",
        "boKey": "lkcswscxg",
        "updateTime": "2019-08-22 01:57:11",
        "type": "pc_vue",
        "delete": false,
        "version": 2,
        "isDeveloper": false,
        "createBy": "1",
        "groupName": "默认分类",
        "createTime": "2019-08-21 12:46:52",
        "updateBy": "1",
        "name": "刘凯表单测试勿删除修改",
        // "html": "<div class=\"ivu-form ivu-form-label-right\"><!--脚本将会混入表单自定义表单控件-->\n<script>\n    window.custFormComponentMixin ={\n        data: function () {\n            return {\"test\":\"helloWorld\"};\n        },\n        created:function(){\n            console.log(\"混入对象的钩子被调用\");\n        },methods:{\n            testaaa:function(){alert(1)}\n        }\n    }\n</script>\n<table class=\"form-table\">\n\t\t\t<tbody><tr class=\"firstRow\">\n\t\t\t<th>单行</th>\n\t\t\t<td> <input type=\"text\" class=\" form-control\" v-model=\"data.lkcswscxg.dh\" v-ab-permission=\"permission.lkcswscxg.lkcswswxg.dh\" desc=\"刘凯测试误删误修改-单行\" v-ab-validate=\"{&quot;maxlength&quot;:50}\"> </td>\n\t\t\t<th>多行</th>\n\t\t\t<td> <textarea type=\"text\" class=\" form-control\" v-model=\"data.lkcswscxg.dx\" v-ab-permission=\"permission.lkcswscxg.lkcswswxg.dx\" desc=\"刘凯测试误删误修改-多行\" v-ab-validate=\"{&quot;maxlength&quot;:50}\"></textarea> </td>\n\t\t\t<th>下拉框</th>\n\t\t\t<td> <select class=\" form-control\" v-model=\"data.lkcswscxg.xlk\" v-ab-permission=\"permission.lkcswscxg.lkcswswxg.xlk\" desc=\"刘凯测试误删误修改-下拉框\" v-ab-validate=\"{&quot;maxlength&quot;:50}\"><option value=\"\">请选择</option><option value=\"1\">1</option></select> </td>\n\t\t\t<th>复选框</th>\n\t\t\t<td> <ab-checkbox v-model=\"data.lkcswscxg.fxk\" v-ab-permission=\"permission.lkcswscxg.lkcswswxg.fxk\" desc=\"刘凯测试误删误修改-复选框\" v-ab-validate=\"{&quot;maxlength&quot;:50}\">\n <div slot-scope=\"checkboxScope\">\n  <label class=\" checkbox-inline\"><input type=\"checkbox\" v-model=\"checkboxScope.tempData.currentValue\" value=\"1\" name=\"lkcswscxg-lkcswswxg-fxk\" v-ab-permission=\"permission.lkcswscxg.lkcswswxg.fxk\">1</label>\n </div>\n</ab-checkbox> </td>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<th>单选按钮</th>\n\t\t\t<td> <div>\n <label class=\" radio-inline\"><input type=\"radio\" v-model=\"data.lkcswscxg.dxan\" v-ab-permission=\"permission.lkcswscxg.lkcswswxg.dxan\" desc=\"刘凯测试误删误修改-单选按钮\" v-ab-validate=\"{&quot;maxlength&quot;:50}\" value=\"1\">1</label>\n</div> </td>\n\t\t\t<th>字典</th>\n\t\t\t<td> <ab-dict type=\"text\" class=\" input-div\" v-model=\"data.lkcswscxg.zd\" v-ab-permission=\"permission.lkcswscxg.lkcswswxg.zd\" desc=\"刘凯测试误删误修改-字典\" v-ab-validate=\"{&quot;maxlength&quot;:50}\" dict-key=\"\"></ab-dict> </td>\n\t\t\t<th>流水号文本</th>\n\t\t\t<td> <ab-serial-no type=\"text\" class=\" form-control\" v-model=\"data.lkcswscxg.lsh\" v-bind:ab-permission=\"permission.lkcswscxg.lkcswswxg.lsh\" desc=\"刘凯测试误删误修改-流水号文本\" v-ab-validate=\"{&quot;maxlength&quot;:50}\" serial-no=\"dayNo\"></ab-serial-no> </td>\n\t\t\t<th>附件</th>\n\t\t\t<td> <ab-upload href=\"javascript:void(0)\" class=\" btn btn-primary fa-upload\" v-model=\"data.lkcswscxg.fj\" :ab-permission=\"permission.lkcswscxg.lkcswswxg.fj\" desc=\"刘凯测试误删误修改-附件\"></ab-upload> </td>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<th>日期</th>\n\t\t\t<td> <ab-date type=\"text\" class=\" form-control\" v-model=\"data.lkcswscxg.rq\" v-ab-permission=\"permission.lkcswscxg.lkcswswxg.rq\" desc=\"刘凯测试误删误修改-日期\" v-ab-validate=\"{}\" format=\"yyyy-MM-dd HH:mm:ss\"></ab-date> </td>\n\t\t\t<th>流水号数字</th>\n\t\t\t<td> <ab-serial-no type=\"text\" class=\" form-control\" v-model=\"data.lkcswscxg.lshsz\" v-bind:ab-permission=\"permission.lkcswscxg.lkcswswxg.lshsz\" desc=\"刘凯测试误删误修改-流水号数字\" v-ab-validate=\"{&quot;maxlength&quot;:10}\" serial-no=\"dayNo\"></ab-serial-no> </td>\n\t\t\t<th>大文本</th>\n\t\t\t<td colspan=\"3\"> <textarea type=\"text\" class=\" form-control\" v-model=\"data.lkcswscxg.dwb\" v-ab-permission=\"permission.lkcswscxg.lkcswswxg.dwb\" desc=\"刘凯测试误删误修改-大文本\" v-ab-validate=\"{}\"></textarea> </td>\n\t\t</tr>\n</tbody></table>\n\n<div id=\"lkcswscxg-lkcszbwswxg\" table-key=\"lkcszbwswxg\" v-ab-permission:show=\"tablePermission.lkcswscxg.lkcszbwswxg\">\n\t<div>\n\t\t<div class=\"ibox-title\"><span class=\"title\">刘凯测试子表误删误修改</span>\n\t\t\t<ab-sub-add href=\"javascript:void(0)\" class=\"btn btn-primary btn-sm fa fa-plus\" v-model=\"data.lkcswscxg.lkcszbwswxgList\" v-bind:init-data=\"initData.lkcswscxg.lkcszbwswxg\" v-ab-permission:edit=\"tablePermission.lkcswscxg.lkcszbwswxg\">添加 </ab-sub-add>\n\t\t</div>\n\t\t<ab-sub-scope v-slot=\"scope\" :permissiona=\"permission\" :table-permissiona=\"tablePermission\" v-for=\"(lkcszbwswxg,index) in data.lkcswscxg.lkcszbwswxgList\"> \n\t\t<ab-sub-del href=\"javascript:void(0);\" v-model=\"data.lkcswscxg.lkcszbwswxgList\" v-bind:index=\"index\" class=\"btn btn-danger btn-xs fa fa-delete pull-right\" v-ab-permission:edit=\"scope.tablePermission.lkcswscxg.lkcszbwswxg\">移除</ab-sub-del>\n\t\t\t<table class=\"form-table\">\n\t\t\t\t<tbody><tr class=\"firstRow\">\n\t\t\t\t\t<th>姓名</th>\n\t\t\t\t\t<td><input type=\"text\" class=\" form-control\" v-model=\"lkcszbwswxg.xm\" v-ab-permission=\"scope.permission.lkcswscxg.lkcszbwswxg.xm\" desc=\"刘凯测试子表误删误修改-姓名\" v-ab-validate=\"{&quot;maxlength&quot;:50}\"></td>\n\t\t\t\t\t<th>年龄</th>\n\t\t\t\t\t<td><input type=\"text\" class=\" form-control\" v-model=\"lkcszbwswxg.nl\" v-ab-permission=\"scope.permission.lkcswscxg.lkcszbwswxg.nl\" desc=\"刘凯测试子表误删误修改-年龄\" v-ab-validate=\"{&quot;maxlength&quot;:10}\"></td>\n\t\t\t\t\t<th>性别</th>\n\t\t\t\t\t<td><ab-checkbox v-model=\"lkcszbwswxg.xb\" v-ab-permission=\"scope.permission.lkcswscxg.lkcszbwswxg.xb\" desc=\"刘凯测试子表误删误修改-性别\" v-ab-validate=\"{&quot;maxlength&quot;:50}\">\n <div slot-scope=\"checkboxScope\">\n  <label class=\" checkbox-inline\"><input type=\"checkbox\" v-model=\"checkboxScope.tempData.currentValue\" value=\"1\" name=\"lkcswscxg-lkcszbwswxg-xb\" v-ab-permission=\"scope.permission.lkcswscxg.lkcszbwswxg.xb\">1</label>\n </div>\n</ab-checkbox></td>\n\t\t\t\t</tr>\n\t\t\t\t<tr>\n\t\t\t\t\t<th>省</th>\n\t\t\t\t\t<td><select class=\" form-control\" v-model=\"lkcszbwswxg.s\" v-ab-permission=\"scope.permission.lkcswscxg.lkcszbwswxg.s\" desc=\"刘凯测试子表误删误修改-省\" v-ab-validate=\"{&quot;maxlength&quot;:50}\"><option value=\"\">请选择</option><option value=\"1\">1</option></select></td>\n\t\t\t\t\t<th>照片</th>\n\t\t\t\t\t<td><ab-upload href=\"javascript:void(0)\" class=\" btn btn-primary fa-upload\" v-model=\"lkcszbwswxg.zp\" :ab-permission=\"scope.permission.lkcswscxg.lkcszbwswxg.zp\" desc=\"刘凯测试子表误删误修改-照片\"></ab-upload></td>\n\t\t\t\t\t<th>爱好</th>\n\t\t\t\t\t<td><textarea type=\"text\" class=\" form-control\" v-model=\"lkcszbwswxg.ah\" v-ab-permission=\"scope.permission.lkcswscxg.lkcszbwswxg.ah\" desc=\"刘凯测试子表误删误修改-爱好\" v-ab-validate=\"{}\"></textarea></td>\n\t\t\t\t</tr>\n\t\t\t\t<tr>\n\t\t\t\t\t<th>外键</th>\n\t\t\t\t\t<td colspan=\"5\"><input type=\"text\" class=\" form-control\" v-model=\"lkcszbwswxg.wj\" v-ab-permission=\"scope.permission.lkcswscxg.lkcszbwswxg.wj\" desc=\"刘凯测试子表误删误修改-外键\" v-ab-validate=\"{&quot;maxlength&quot;:50}\"></td>\n\t\t\t\t</tr>\n\t\t\t</tbody></table>\n\t\t\t \n\t\t</ab-sub-scope>\n\t</div>\n</div>\n\t\n\n</div>",
        "html": '<h1 style="text-align: center;"><span style="color: #e74c3c;">局内部请示审批单</span></h1><table style="border-collapse: collapse; width: 100%; background-color: #ffffff; border: 1px solid #e74c3c;" border="1"><tbody><tr style="height: 50px;"><td style="width: 10%; text-align: center; padding: 10px; border-style: solid; border-color: #e74c3c;"><strong><span style="color: #e74c3c;">编号</span></strong></td><td style="width: 23%; text-align: left; padding: 10px; border-style: solid; border-color: #e74c3c;"><gw-multitext column-id="410614254139867137" column-comment="隐藏" column-key="yc" column-type="multitext" column-length="50" column-placeholder="隐藏更改" column-valid-rule="" column-eheight="30" column-ewidth="30" class="gw-components"><gw-text><span class="icon iconfont icon-page-multitext "></span> 隐藏|yc|多行文本</gw-text></gw-multitext></td><td style="width: 10%; text-align: center; padding: 10px; border-style: solid; border-color: #e74c3c;"><strong><span style="color: #e74c3c;">部门编号</span></strong></td><td style="width: 23%; text-align: left; padding: 10px; border-style: solid; border-color: #e74c3c;"><gw-checkbox column-id="410614607508406273" column-comment="复选框" column-key="fxk" column-type="checkbox" column-length="50" column-placeholder="复选占位符" column-options="[{&quot;txt&quot;:&quot;a&quot;,&quot;key&quot;:&quot;a&quot;},{&quot;key&quot;:&quot;b&quot;,&quot;txt&quot;:&quot;b&quot;}]" column-valid-rule="" class="gw-components"><gw-text><span class="icon iconfont icon-page-checkbox "></span> 复选框|fxk|复选框</gw-text></gw-checkbox></td><td style="width: 10%; text-align: center; padding: 10px; border-style: solid; border-color: #e74c3c;"><strong><span style="color: #e74c3c;">紧急程度</span></strong></td><td style="text-align: left; padding: 10px; border-style: solid; border-color: #e74c3c;"><gw-radio column-id="410614607509716993" column-comment="单选按钮" column-key="dxan" column-type="radio" column-length="50" column-placeholder="单选占位符" column-options="[{&quot;txt&quot;:&quot;ss&quot;,&quot;key&quot;:&quot;ss&quot;}]" column-valid-rule="" class="gw-components"><gw-text><span class="icon iconfont icon-page-radio "></span> 单选按钮|dxan|单选按钮</gw-text></gw-radio></td></tr><tr style="height: 50px;"><td style="text-align: center; padding: 10px; border-style: solid; border-color: #e74c3c;"><strong><span style="color: #e74c3c;">标题</span></strong></td><td style="text-align: left; padding: 10px; border-style: solid; border-color: #e74c3c;" colspan="5"><gw-hidden column-id="410614592405504001" column-comment="单行" column-key="dh" column-type="onetext" column-length="50" column-placeholder="标题占位修改" column-valid-rule="required," class="gw-components"><gw-text><span class="icon iconfont icon-page-onetext "></span> 单行|dh|单行文本</gw-text></gw-hidden></td></tr><tr style="height: 50px;"><td style="text-align: center; padding: 10px; border-style: solid; border-color: #e74c3c;"><strong><span style="color: #e74c3c;">主送</span></strong></td><td style="text-align: left; padding: 10px; border-style: solid; border-color: #e74c3c;" colspan="5"><gw-multitext column-id="410614592406814721" column-comment="多行" column-key="dx" column-type="multitext" column-length="50" column-placeholder="多行占位符多行" column-valid-rule="required," column-eheight="5000" column-ewidth="1500" class="gw-components"><gw-text><span class="icon iconfont icon-page-multitext "></span> 多行|dx|多行文本</gw-text></gw-multitext></td></tr><tr style="height: 50px;"><td style="text-align: center; padding: 10px; border-style: solid; border-color: #e74c3c;"><strong><span style="color: #e74c3c;">审核部门</span></strong></td><td style="text-align: left; padding: 10px; border-style: solid; border-color: #e74c3c;" colspan="5"><gw-dic column-id="410614607510765569" column-comment="字典" column-key="zd" column-type="dic" column-length="50" column-placeholder="dic" column-valid-rule="" column-dic-key="test1" class="gw-components"><gw-text><span class="icon iconfont icon-page-dic "></span> 字典|zd|数据字典</gw-text></gw-dic></td></tr><tr style="height: 50px;"><td style="text-align: center; padding: 10px; border-style: solid; border-color: #e74c3c;"><strong><span style="color: #e74c3c;">会签部门</span></strong></td><td style="text-align: left; padding: 10px; border-style: solid; border-color: #e74c3c;" colspan="5"><gw-serialno column-id="410614607512076289" column-comment="流水号文本" column-key="lsh" column-type="serialno" column-length="50" column-placeholder="占位流水号2" column-valid-rule="number," column-serialno-alias="dzlsh" class="gw-components"><gw-text><span class="icon iconfont icon-page-number "></span> 流水号文本|lsh|流水号</gw-text></gw-serialno></td></tr><tr style="height: 125px;"><td style="text-align: center; padding: 10px; border-style: solid; border-color: #e74c3c;"><strong><span style="color: #e74c3c;">部门核稿人</span></strong></td><td style="text-align: left; padding: 10px; border-style: solid; border-color: #e74c3c;" colspan="2"><gw-date column-id="410614648322916353" column-comment="日期" column-key="rq" column-type="date" column-length="0" column-placeholder="222" column-valid-rule="date," column-date-format="222yyyy-MM-dd HH:mm:ss" class="gw-components"><gw-text><span class="icon iconfont icon-page-sj "></span> 日期|rq|日期组件</gw-text></gw-date></td><td style="text-align: center; padding: 10px; border-style: solid; border-color: #e74c3c;"><strong><span style="color: #e74c3c;">报文部门</span></strong></td><td style="text-align: left; padding: 10px; border-style: solid; border-color: #e74c3c;" colspan="2"><gw-file column-id="410614607513649153" column-comment="附件" column-key="fj" column-type="file" column-length="50" column-placeholder="附件" column-valid-rule="" class="gw-components"><gw-text><span class="icon iconfont icon-page-fj "></span> 附件|fj|附件上传</gw-text></gw-file></td></tr><tr style="height: 50px;"><td style="text-align: center; padding: 10px; border-style: solid; border-color: #e74c3c;"><strong><span style="color: #e74c3c;">拟稿人</span></strong></td><td style="text-align: left; padding: 10px; border-style: solid; border-color: #e74c3c;">&nbsp;</td><td style="text-align: center; padding: 10px; border-style: solid; border-color: #e74c3c;"><strong><span style="color: #e74c3c;">拟稿时间</span></strong></td><td style="text-align: left; padding: 10px; border-style: solid; border-color: #e74c3c;">&nbsp;</td><td style="text-align: center; padding: 10px; border-style: solid; border-color: #e74c3c;"><strong><span style="color: #e74c3c;">办公电话</span></strong></td><td style="text-align: left; padding: 10px; border-style: solid; border-color: #e74c3c;">&nbsp;</td></tr></tbody></table><p>&nbsp;</p><p>子表</p><p>&nbsp;</p>',
        "id": "410620162697068545",
        "key": "lkbdcswscxg"
    },
    "isOk": true
};

//保存成功提示
const saveFormDef = {
    "code": "200",
    "data": "410773850321846273",
    "isOk": true,
    "msg": "更新自定义表单成功"
}

//获取分类(打开表单编辑器后的分类)
const getNodes = [{
    "delete": false,
    "id": "20000002960003",
    "key": "mrfl",
    "name": "默认分类",
    "parentId": "0",
    "path": "20000002960003.",
    "sn": 4,
    "treeId": "20000002960002",
    "version": 0
}];

//打开vue表单获取得左侧tree数据demo
const boTreeData = [{
    "relationType": "main",
    "name": "刘凯测试误删误修改(主表#lkcswswxg)",
    "alias": "lkcswscxg",
    "comment": "刘凯测试误删误修改",
    "id": "410614254136197121",
    "nodeType": "table",
    "key": "lkcswswxg",
    "parentId": "0"
}, {
    "tableKey": "lkcswswxg",
    "name": "主键",
    "id": "410614254138556417",
    "nodeType": "column",
    "key": "id",
    "parentId": "410614254136197121",
    "isHidden": true
}, {
    "tableKey": "lkcswswxg",
    "name": "隐藏",
    "id": "410614254139867137",
    "nodeType": "column",
    "key": "yc",
    "parentId": "410614254136197121",
    "isHidden": true
}, {
    "tableKey": "lkcswswxg",
    "name": "单行",
    "id": "410614592405504001",
    "nodeType": "column",
    "key": "dh",
    "parentId": "410614254136197121"
}, {
    "tableKey": "lkcswswxg",
    "name": "多行",
    "id": "410614592406814721",
    "nodeType": "column",
    "key": "dx",
    "parentId": "410614254136197121"
}, {
    "tableKey": "lkcswswxg",
    "name": "下拉框",
    "id": "410614592408125441",
    "nodeType": "column",
    "key": "xlk",
    "parentId": "410614254136197121"
}, {
    "tableKey": "lkcswswxg",
    "name": "复选框",
    "id": "410614607508406273",
    "nodeType": "column",
    "key": "fxk",
    "parentId": "410614254136197121"
}, {
    "tableKey": "lkcswswxg",
    "name": "单选按钮",
    "id": "410614607509716993",
    "nodeType": "column",
    "key": "dxan",
    "parentId": "410614254136197121"
}, {
    "tableKey": "lkcswswxg",
    "name": "字典",
    "id": "410614607510765569",
    "nodeType": "column",
    "key": "zd",
    "parentId": "410614254136197121"
}, {
    "tableKey": "lkcswswxg",
    "name": "流水号文本",
    "id": "410614607512076289",
    "nodeType": "column",
    "key": "lsh",
    "parentId": "410614254136197121"
}, {
    "tableKey": "lkcswswxg",
    "name": "附件",
    "id": "410614607513649153",
    "nodeType": "column",
    "key": "fj",
    "parentId": "410614254136197121"
}, {
    "tableKey": "lkcswswxg",
    "name": "日期",
    "id": "410614648322916353",
    "nodeType": "column",
    "key": "rq",
    "parentId": "410614254136197121"
}, {
    "tableKey": "lkcswswxg",
    "name": "流水号数字",
    "id": "410620022726328321",
    "nodeType": "column",
    "key": "lshsz",
    "parentId": "410614254136197121"
}, {
    "tableKey": "lkcswswxg",
    "name": "大文本",
    "id": "410620022729211905",
    "nodeType": "column",
    "key": "dwb",
    "parentId": "410614254136197121"
}, {
    "relationType": "oneToMany",
    "name": "刘凯测试子表误删误修改(一对多#lkcszbwswxg)",
    "comment": "刘凯测试子表误删误修改",
    "id": "410620057948782593",
    "nodeType": "table",
    "key": "lkcszbwswxg",
    "parentId": "410614254136197121"
}, {
    "tableKey": "lkcszbwswxg",
    "name": "主键",
    "id": "410620057951666177",
    "nodeType": "column",
    "key": "id",
    "parentId": "410620057948782593",
    "isHidden": true
}, {
    "tableKey": "lkcszbwswxg",
    "name": "姓名",
    "id": "410620057952452609",
    "nodeType": "column",
    "key": "xm",
    "parentId": "410620057948782593"
}, {
    "tableKey": "lkcszbwswxg",
    "name": "年龄",
    "id": "410620057953763329",
    "nodeType": "column",
    "key": "nl",
    "parentId": "410620057948782593"
}, {
    "tableKey": "lkcszbwswxg",
    "name": "性别",
    "id": "410620057954811905",
    "nodeType": "column",
    "key": "xb",
    "parentId": "410620057948782593"
}, {
    "tableKey": "lkcszbwswxg",
    "name": "省",
    "id": "410620057956122625",
    "nodeType": "column",
    "key": "s",
    "parentId": "410620057948782593"
}, {
    "tableKey": "lkcszbwswxg",
    "name": "照片",
    "id": "410620057957171201",
    "nodeType": "column",
    "key": "zp",
    "parentId": "410620057948782593"
}, {
    "tableKey": "lkcszbwswxg",
    "name": "爱好",
    "id": "410620057958481921",
    "nodeType": "column",
    "key": "ah",
    "parentId": "410620057948782593"
}, {
    "tableKey": "lkcszbwswxg",
    "name": "外键",
    "id": "410620071282999297",
    "nodeType": "column",
    "key": "wj",
    "parentId": "410620057948782593"
}];
//点开业务对象的一些数据
const businessTableObjectDemoSub = {
    "code": "200",
    "data": {
        "columns": [{
            "comment": "主键",
            "createBy": "1",
            "createTime": "2019-08-21 12:40:12",
            "decimal": 0,
            "id": "410620057951666177",
            "key": "id",
            "length": 50,
            "name": "id",
            "primary": true,
            "required": true,
            "table": {
                "$ref": "$.data"
            },
            "tableId": "410620057948782593",
            "type": "varchar",
            "updateBy": "1",
            "updateTime": "2019-08-21 12:40:12"
        }, {
            "comment": "姓名",
            "createBy": "1",
            "createTime": "2019-08-21 12:40:12",
            "ctrl": {
                "columnId": "410620057952452609",
                "config": "{}",
                "createBy": "1",
                "createTime": "2019-08-21 12:40:12",
                "delete": false,
                "id": "410620057953239041",
                "type": "onetext",
                "updateBy": "1",
                "updateTime": "2019-08-21 12:40:12",
                "validRule": "[]",
                "version": 0
            },
            "decimal": 0,
            "id": "410620057952452609",
            "key": "xm",
            "length": 50,
            "name": "xm",
            "primary": false,
            "required": false,
            "table": {
                "$ref": "$.data"
            },
            "tableId": "410620057948782593",
            "type": "varchar",
            "updateBy": "1",
            "updateTime": "2019-08-21 12:40:12"
        }, {
            "comment": "年龄",
            "createBy": "1",
            "createTime": "2019-08-21 12:40:12",
            "ctrl": {
                "columnId": "410620057953763329",
                "config": "{}",
                "createBy": "1",
                "createTime": "2019-08-21 12:40:12",
                "delete": false,
                "id": "410620057954287617",
                "type": "onetext",
                "updateBy": "1",
                "updateTime": "2019-08-21 12:40:12",
                "validRule": "[]",
                "version": 0
            },
            "decimal": 0,
            "id": "410620057953763329",
            "key": "nl",
            "length": 10,
            "name": "nl",
            "primary": false,
            "required": false,
            "table": {
                "$ref": "$.data"
            },
            "tableId": "410620057948782593",
            "type": "number",
            "updateBy": "1",
            "updateTime": "2019-08-21 12:40:12"
        }, {
            "comment": "性别",
            "createBy": "1",
            "createTime": "2019-08-21 12:40:12",
            "ctrl": {
                "columnId": "410620057954811905",
                "config": "{\"options\":[{\"txt\":\"1\",\"key\":\"1\"}]}",
                "createBy": "1",
                "createTime": "2019-08-21 12:40:12",
                "delete": false,
                "id": "410620057955336193",
                "type": "checkbox",
                "updateBy": "1",
                "updateTime": "2019-08-21 12:40:12",
                "validRule": "[]",
                "version": 0
            },
            "decimal": 0,
            "id": "410620057954811905",
            "key": "xb",
            "length": 50,
            "name": "xb",
            "primary": false,
            "required": false,
            "table": {
                "$ref": "$.data"
            },
            "tableId": "410620057948782593",
            "type": "varchar",
            "updateBy": "1",
            "updateTime": "2019-08-21 12:40:12"
        }, {
            "comment": "省",
            "createBy": "1",
            "createTime": "2019-08-21 12:40:12",
            "ctrl": {
                "columnId": "410620057956122625",
                "config": "{\"options\":[{\"txt\":\"1\",\"key\":\"1\"}]}",
                "createBy": "1",
                "createTime": "2019-08-21 12:40:12",
                "delete": false,
                "id": "410620057956646913",
                "type": "select",
                "updateBy": "1",
                "updateTime": "2019-08-21 12:40:12",
                "validRule": "[]",
                "version": 0
            },
            "decimal": 0,
            "id": "410620057956122625",
            "key": "s",
            "length": 50,
            "name": "s",
            "primary": false,
            "required": false,
            "table": {
                "$ref": "$.data"
            },
            "tableId": "410620057948782593",
            "type": "varchar",
            "updateBy": "1",
            "updateTime": "2019-08-21 12:40:12"
        }, {
            "comment": "照片",
            "createBy": "1",
            "createTime": "2019-08-21 12:40:12",
            "ctrl": {
                "columnId": "410620057957171201",
                "config": "{}",
                "createBy": "1",
                "createTime": "2019-08-21 12:40:12",
                "delete": false,
                "id": "410620057957957633",
                "type": "file",
                "updateBy": "1",
                "updateTime": "2019-08-21 12:40:12",
                "validRule": "[]",
                "version": 0
            },
            "decimal": 0,
            "id": "410620057957171201",
            "key": "zp",
            "length": 50,
            "name": "zp",
            "primary": false,
            "required": false,
            "table": {
                "$ref": "$.data"
            },
            "tableId": "410620057948782593",
            "type": "varchar",
            "updateBy": "1",
            "updateTime": "2019-08-21 12:40:12"
        }, {
            "comment": "爱好",
            "createBy": "1",
            "createTime": "2019-08-21 12:40:12",
            "ctrl": {
                "columnId": "410620057958481921",
                "config": "{\"eheight\":\"500\",\"ewidth\":\"150\",\"isEditor\":\"0\"}",
                "createBy": "1",
                "createTime": "2019-08-21 12:40:12",
                "delete": false,
                "id": "410620057959006209",
                "type": "multitext",
                "updateBy": "1",
                "updateTime": "2019-08-21 12:40:12",
                "validRule": "[]",
                "version": 0
            },
            "decimal": 0,
            "id": "410620057958481921",
            "key": "ah",
            "length": 0,
            "name": "ah",
            "primary": false,
            "required": false,
            "table": {
                "$ref": "$.data"
            },
            "tableId": "410620057948782593",
            "type": "clob",
            "updateBy": "1",
            "updateTime": "2019-08-21 12:40:12"
        }, {
            "comment": "外键",
            "createBy": "1",
            "createTime": "2019-08-21 12:41:03",
            "ctrl": {
                "columnId": "410620071282999297",
                "config": "{}",
                "createBy": "1",
                "createTime": "2019-08-21 12:41:03",
                "delete": false,
                "id": "410620071283523585",
                "type": "onetext",
                "updateBy": "1",
                "updateTime": "2019-08-21 12:41:03",
                "validRule": "[]",
                "version": 0
            },
            "decimal": 0,
            "id": "410620071282999297",
            "key": "wj",
            "length": 50,
            "name": "wj",
            "primary": false,
            "required": false,
            "table": {
                "$ref": "$.data"
            },
            "tableId": "410620057948782593",
            "type": "varchar",
            "updateBy": "1",
            "updateTime": "2019-08-21 12:41:03"
        }],
        "columnsWithOutHidden": [{
            "$ref": "$.data.columns[1]"
        }, {
            "$ref": "$.data.columns[2]"
        }, {
            "$ref": "$.data.columns[3]"
        }, {
            "$ref": "$.data.columns[4]"
        }, {
            "$ref": "$.data.columns[5]"
        }, {
            "$ref": "$.data.columns[6]"
        }, {
            "$ref": "$.data.columns[7]"
        }],
        "columnsWithoutPk": [{
            "$ref": "$.data.columns[1]"
        }, {
            "$ref": "$.data.columns[2]"
        }, {
            "$ref": "$.data.columns[3]"
        }, {
            "$ref": "$.data.columns[4]"
        }, {
            "$ref": "$.data.columns[5]"
        }, {
            "$ref": "$.data.columns[6]"
        }, {
            "$ref": "$.data.columns[7]"
        }],
        "comment": "刘凯测试子表误删误修改",
        "createBy": "1",
        "createTime": "2019-08-21 12:40:12",
        "createdTable": true,
        "dsKey": "dataSourceDefault",
        "dsName": "本地数据源",
        "external": false,
        "groupId": "20000002810003",
        "groupName": "默认分类",
        "id": "410620057948782593",
        "key": "lkcszbwswxg",
        "name": "lkcszbwswxg",
        "pkColumn": {
            "$ref": "$.data.columns[0]"
        },
        "pkKey": "id",
        "pkName": "id",
        "updateBy": "1",
        "updateTime": "2019-08-22 01:55:36"
    },
    "isOk": true
}

//点开业务对象的一些数据
const businessTableObjectDemo = {
    "code": "200",
    "data": {
        "columns": [{
            "comment": "主键",
            "createBy": "1",
            "createTime": "2019-08-21 06:31:12",
            "decimal": 0,
            "id": "410614254138556417",
            "key": "id",
            "length": 50,
            "name": "id",
            "primary": true,
            "required": true,
            "table": {
                "$ref": "$.data"
            },
            "tableId": "410614254136197121",
            "type": "varchar",
            "updateBy": "1",
            "updateTime": "2019-08-21 06:31:12"
        }, {
            "comment": "隐藏",
            "createBy": "1",
            "createTime": "2019-08-21 06:31:12",
            "ctrl": {
                "columnId": "410614254139867137",
                "config": "{}",
                "createBy": "1",
                "createTime": "2019-08-21 06:31:12",
                "delete": false,
                "id": "410614254140653569",
                "type": "hidden",
                "updateBy": "1",
                "updateTime": "2019-08-21 06:31:12",
                "validRule": "[]",
                "version": 0
            },
            "decimal": 0,
            "id": "410614254139867137",
            "key": "yc",
            "length": 50,
            "name": "yc",
            "primary": false,
            "required": false,
            "table": {
                "$ref": "$.data"
            },
            "tableId": "410614254136197121",
            "type": "varchar",
            "updateBy": "1",
            "updateTime": "2019-08-21 06:31:12"
        }, {
            "comment": "单行",
            "createBy": "1",
            "createTime": "2019-08-21 06:52:42",
            "ctrl": {
                "columnId": "410614592405504001",
                "config": "{\"placeholderText\":\"占位符单行\",\"placeholder\":true}",
                "createBy": "1",
                "createTime": "2019-08-21 06:52:42",
                "delete": false,
                "id": "410614592406290433",
                "type": "onetext",
                "updateBy": "1",
                "updateTime": "2019-08-21 06:52:42",
                "validRule": "[{\"name\":\"required\",\"title\":\"必填\"}]",
                "version": 0
            },
            "decimal": 0,
            "defaultValue": "默认单行",
            "id": "410614592405504001",
            "key": "dh",
            "length": 50,
            "name": "dh",
            "primary": false,
            "required": false,
            "table": {
                "$ref": "$.data"
            },
            "tableId": "410614254136197121",
            "type": "varchar",
            "updateBy": "1",
            "updateTime": "2019-08-21 06:52:42"
        }, {
            "comment": "多行",
            "createBy": "1",
            "createTime": "2019-08-21 06:52:42",
            "ctrl": {
                "columnId": "410614592406814721",
                "config": "{\"eheight\":\"500\",\"ewidth\":\"150\",\"placeholderText\":\"占位符多行\",\"placeholder\":true,\"isEditor\":\"0\"}",
                "createBy": "1",
                "createTime": "2019-08-21 06:52:42",
                "delete": false,
                "id": "410614592407339009",
                "type": "multitext",
                "updateBy": "1",
                "updateTime": "2019-08-21 06:52:42",
                "validRule": "[{\"name\":\"required\",\"title\":\"必填\"}]",
                "version": 0
            },
            "decimal": 0,
            "defaultValue": "默认多行",
            "id": "410614592406814721",
            "key": "dx",
            "length": 50,
            "name": "dx",
            "primary": false,
            "required": false,
            "table": {
                "$ref": "$.data"
            },
            "tableId": "410614254136197121",
            "type": "varchar",
            "updateBy": "1",
            "updateTime": "2019-08-21 06:52:42"
        }, {
            "comment": "下拉框",
            "createBy": "1",
            "createTime": "2019-08-21 06:52:42",
            "ctrl": {
                "columnId": "410614592408125441",
                "config": "{\"options\":[{\"txt\":\"1\",\"key\":\"1\"}],\"placeholderText\":\"下拉框占位符\",\"placeholder\":true}",
                "createBy": "1",
                "createTime": "2019-08-21 06:52:42",
                "delete": false,
                "id": "410614592408911873",
                "type": "select",
                "updateBy": "1",
                "updateTime": "2019-08-21 06:52:42",
                "validRule": "[]",
                "version": 0
            },
            "decimal": 0,
            "id": "410614592408125441",
            "key": "xlk",
            "length": 50,
            "name": "xlk",
            "primary": false,
            "required": false,
            "table": {
                "$ref": "$.data"
            },
            "tableId": "410614254136197121",
            "type": "varchar",
            "updateBy": "1",
            "updateTime": "2019-08-21 06:52:42"
        }, {
            "comment": "复选框",
            "createBy": "1",
            "createTime": "2019-08-21 06:53:40",
            "ctrl": {
                "columnId": "410614607508406273",
                "config": "{\"options\":[{\"txt\":\"1\",\"key\":\"1\"}],\"placeholder\":false}",
                "createBy": "1",
                "createTime": "2019-08-21 06:53:40",
                "delete": false,
                "id": "410614607509192705",
                "type": "checkbox",
                "updateBy": "1",
                "updateTime": "2019-08-21 06:53:40",
                "validRule": "[]",
                "version": 0
            },
            "decimal": 0,
            "id": "410614607508406273",
            "key": "fxk",
            "length": 50,
            "name": "fxk",
            "primary": false,
            "required": false,
            "table": {
                "$ref": "$.data"
            },
            "tableId": "410614254136197121",
            "type": "varchar",
            "updateBy": "1",
            "updateTime": "2019-08-21 06:53:40"
        }, {
            "comment": "单选按钮",
            "createBy": "1",
            "createTime": "2019-08-21 06:53:40",
            "ctrl": {
                "columnId": "410614607509716993",
                "config": "{\"options\":[{\"txt\":\"1\",\"key\":\"1\"}],\"placeholder\":false}",
                "createBy": "1",
                "createTime": "2019-08-21 06:53:40",
                "delete": false,
                "id": "410614607510241281",
                "type": "radio",
                "updateBy": "1",
                "updateTime": "2019-08-21 06:53:40",
                "validRule": "[]",
                "version": 0
            },
            "decimal": 0,
            "id": "410614607509716993",
            "key": "dxan",
            "length": 50,
            "name": "dxan",
            "primary": false,
            "required": false,
            "table": {
                "$ref": "$.data"
            },
            "tableId": "410614254136197121",
            "type": "varchar",
            "updateBy": "1",
            "updateTime": "2019-08-21 06:53:40"
        }, {
            "comment": "字典",
            "createBy": "1",
            "createTime": "2019-08-21 06:53:40",
            "ctrl": {
                "columnId": "410614607510765569",
                "config": "{\"key\":\"test\"}",
                "createBy": "1",
                "createTime": "2019-08-21 06:53:40",
                "delete": false,
                "id": "410614607511552001",
                "type": "dic",
                "updateBy": "1",
                "updateTime": "2019-08-21 06:53:40",
                "validRule": "[]",
                "version": 0
            },
            "decimal": 0,
            "id": "410614607510765569",
            "key": "zd",
            "length": 50,
            "name": "zd",
            "primary": false,
            "required": false,
            "table": {
                "$ref": "$.data"
            },
            "tableId": "410614254136197121",
            "type": "varchar",
            "updateBy": "1",
            "updateTime": "2019-08-21 06:53:40"
        }, {
            "comment": "流水号文本",
            "createBy": "1",
            "createTime": "2019-08-21 06:53:40",
            "ctrl": {
                "columnId": "410614607512076289",
                "config": "{\"name\":\"每天使用一组流水号\",\"alias\":\"dayNo\",\"placeholderText\":\"占位流水号\",\"placeholder\":true,\"key\":\"\"}",
                "createBy": "1",
                "createTime": "2019-08-21 06:53:40",
                "delete": false,
                "id": "410614607513124865",
                "type": "serialno",
                "updateBy": "1",
                "updateTime": "2019-08-21 06:53:40",
                "validRule": "[{\"name\":\"number\",\"title\":\"数字\"}]",
                "version": 0
            },
            "decimal": 0,
            "defaultValue": "默认流水号",
            "id": "410614607512076289",
            "key": "lsh",
            "length": 50,
            "name": "lsh",
            "primary": false,
            "required": false,
            "table": {
                "$ref": "$.data"
            },
            "tableId": "410614254136197121",
            "type": "varchar",
            "updateBy": "1",
            "updateTime": "2019-08-21 06:53:40"
        }, {
            "comment": "附件",
            "createBy": "1",
            "createTime": "2019-08-21 06:53:40",
            "ctrl": {
                "columnId": "410614607513649153",
                "config": "{}",
                "createBy": "1",
                "createTime": "2019-08-21 06:53:40",
                "delete": false,
                "id": "410614607514435585",
                "type": "file",
                "updateBy": "1",
                "updateTime": "2019-08-21 06:53:40",
                "validRule": "[]",
                "version": 0
            },
            "decimal": 0,
            "id": "410614607513649153",
            "key": "fj",
            "length": 50,
            "name": "fj",
            "primary": false,
            "required": false,
            "table": {
                "$ref": "$.data"
            },
            "tableId": "410614254136197121",
            "type": "varchar",
            "updateBy": "1",
            "updateTime": "2019-08-21 06:53:40"
        }, {
            "comment": "日期",
            "createBy": "1",
            "createTime": "2019-08-21 06:56:16",
            "ctrl": {
                "columnId": "410614648322916353",
                "config": "{\"format\":\"yyyy-MM-dd HH:mm:ss\",\"less\":\"\",\"greater\":\"\"}",
                "createBy": "1",
                "createTime": "2019-08-21 06:56:16",
                "delete": false,
                "id": "410614648323440641",
                "type": "date",
                "updateBy": "1",
                "updateTime": "2019-08-21 06:56:16",
                "validRule": "[{\"name\":\"date\",\"title\":\"日期\"}]",
                "version": 0
            },
            "decimal": 0,
            "id": "410614648322916353",
            "key": "rq",
            "length": 0,
            "name": "rq",
            "primary": false,
            "required": false,
            "table": {
                "$ref": "$.data"
            },
            "tableId": "410614254136197121",
            "type": "date",
            "updateBy": "1",
            "updateTime": "2019-08-21 06:56:16"
        }, {
            "comment": "流水号数字",
            "createBy": "1",
            "createTime": "2019-08-21 12:37:57",
            "ctrl": {
                "columnId": "410620022726328321",
                "config": "{\"name\":\"每天使用一组流水号\",\"alias\":\"dayNo\",\"key\":\"\"}",
                "createBy": "1",
                "createTime": "2019-08-21 12:37:57",
                "delete": false,
                "id": "410620022727639041",
                "type": "serialno",
                "updateBy": "1",
                "updateTime": "2019-08-21 12:37:57",
                "validRule": "[{\"name\":\"number\",\"title\":\"数字\"}]",
                "version": 0
            },
            "decimal": 0,
            "id": "410620022726328321",
            "key": "lshsz",
            "length": 10,
            "name": "lshsz",
            "primary": false,
            "required": false,
            "table": {
                "$ref": "$.data"
            },
            "tableId": "410614254136197121",
            "type": "number",
            "updateBy": "1",
            "updateTime": "2019-08-21 12:37:57"
        }, {
            "comment": "大文本",
            "createBy": "1",
            "createTime": "2019-08-21 12:37:57",
            "ctrl": {
                "columnId": "410620022729211905",
                "config": "{\"eheight\":\"500\",\"ewidth\":\"150\",\"isEditor\":\"0\"}",
                "createBy": "1",
                "createTime": "2019-08-21 12:37:57",
                "delete": false,
                "id": "410620022729736193",
                "type": "multitext",
                "updateBy": "1",
                "updateTime": "2019-08-21 12:37:57",
                "validRule": "[]",
                "version": 0
            },
            "decimal": 0,
            "id": "410620022729211905",
            "key": "dwb",
            "length": 0,
            "name": "dwb",
            "primary": false,
            "required": false,
            "table": {
                "$ref": "$.data"
            },
            "tableId": "410614254136197121",
            "type": "clob",
            "updateBy": "1",
            "updateTime": "2019-08-21 12:37:57"
        }, {
            "comment": "校验测试",
            "createBy": "1",
            "createTime": "2019-08-22 07:20:10",
            "ctrl": {
                "columnId": "410637673629483009",
                "config": "{}",
                "createBy": "1",
                "createTime": "2019-08-22 07:20:10",
                "delete": false,
                "id": "410637673630007297",
                "type": "onetext",
                "updateBy": "1",
                "updateTime": "2019-08-22 07:20:10",
                "validRule": "[{\"name\":\"required\",\"title\":\"必填\"},{\"name\":\"variable\",\"title\":\"字母或下划线\"},{\"name\":\"nodigitsstart\",\"title\":\"不以数字开头\"}]",
                "version": 0
            },
            "decimal": 0,
            "id": "410637673629483009",
            "key": "xycs",
            "length": 50,
            "name": "xycs",
            "primary": false,
            "required": false,
            "table": {
                "$ref": "$.data"
            },
            "tableId": "410614254136197121",
            "type": "varchar",
            "updateBy": "1",
            "updateTime": "2019-08-22 07:20:10"
        }],
        "columnsWithOutHidden": [{
            "$ref": "$.data.columns[2]"
        }, {
            "$ref": "$.data.columns[3]"
        }, {
            "$ref": "$.data.columns[4]"
        }, {
            "$ref": "$.data.columns[5]"
        }, {
            "$ref": "$.data.columns[6]"
        }, {
            "$ref": "$.data.columns[7]"
        }, {
            "$ref": "$.data.columns[8]"
        }, {
            "$ref": "$.data.columns[9]"
        }, {
            "$ref": "$.data.columns[10]"
        }, {
            "$ref": "$.data.columns[11]"
        }, {
            "$ref": "$.data.columns[12]"
        }, {
            "$ref": "$.data.columns[13]"
        }],
        "columnsWithoutPk": [{
            "$ref": "$.data.columns[1]"
        }, {
            "$ref": "$.data.columns[2]"
        }, {
            "$ref": "$.data.columns[3]"
        }, {
            "$ref": "$.data.columns[4]"
        }, {
            "$ref": "$.data.columns[5]"
        }, {
            "$ref": "$.data.columns[6]"
        }, {
            "$ref": "$.data.columns[7]"
        }, {
            "$ref": "$.data.columns[8]"
        }, {
            "$ref": "$.data.columns[9]"
        }, {
            "$ref": "$.data.columns[10]"
        }, {
            "$ref": "$.data.columns[11]"
        }, {
            "$ref": "$.data.columns[12]"
        }, {
            "$ref": "$.data.columns[13]"
        }],
        "comment": "刘凯测试误删误修改",
        "createBy": "1",
        "createTime": "2019-08-21 06:31:12",
        "createdTable": true,
        "dsKey": "dataSourceDefault",
        "dsName": "本地数据源",
        "external": false,
        "groupId": "20000002810003",
        "groupName": "默认分类",
        "id": "410614254136197121",
        "key": "lkcswswxg",
        "name": "lkcswswxg",
        "pkColumn": {
            "$ref": "$.data.columns[0]"
        },
        "pkKey": "id",
        "pkName": "id",
        "updateBy": "1",
        "updateTime": "2019-08-22 07:29:23"
    },
    "isOk": true
}

//点开业务对象先获取到的表关联信息 表单设计器中暂时没有使用
const businessObjectGetObject = {
    "code": "200",
    "data": {
        "createBy": "1",
        "createTime": "2019-08-21 06:58:13",
        "delete": false,
        "groupId": "20000002900002",
        "groupName": "业务对象默认分类",
        "id": "410614678957326337",
        "key": "lkcswscxg",
        "name": "刘凯测试误删除修改-",
        "persistenceType": "db",
        "relation": {
            "children": [{
                "children": [],
                "fks": [{
                    "from": "wj",
                    "type": "parentField",
                    "value": "id"
                }],
                "tableComment": "刘凯测试子表误删误修改",
                "tableKey": "lkcszbwswxg",
                "type": "oneToMany"
            }],
            "tableComment": "刘凯测试误删误修改",
            "tableKey": "lkcswswxg",
            "type": "main"
        },
        "relationJson": "{\"children\":[{\"children\":[],\"fks\":[{\"from\":\"wj\",\"type\":\"parentField\",\"value\":\"id\"}],\"tableComment\":\"刘凯测试子表误删误修改\",\"tableKey\":\"lkcszbwswxg\",\"type\":\"oneToMany\"}],\"tableComment\":\"刘凯测试误删误修改\",\"tableKey\":\"lkcswswxg\",\"type\":\"main\"}",
        "updateBy": "1",
        "updateTime": "2019-08-21 13:01:06",
        "version": 0
    },
    "isOk": true
}