const state = {
    //编辑框中选中的组件
    activeComponent: "",
    //编辑器中已经添加的字段，对应dom对象
    editorColumn: {},
    //所有字段（包括所有子表，平级，字段ID对应表名.字段名）
    //用于左右对照是否在编辑框中
    //ID为索引
    businessColumn: {
        // "20000000530035": {
        //     "comment": "描述",
        //     "createTime": "2018-09-26 22:45:36",
        //     "ctrl": {
        //         "columnId": "20000000530035",
        //         "config": "{\"eheight\":\"500\",\"ewidth\":\"150\",\"isEditor\":\"0\"}",
        //         "createTime": "2018-09-26 22:45:36",
        //         "delete": false,
        //         "id": "20000000530036",
        //         "type": "multitext",
        //         "updateTime": "2018-09-26 22:45:36",
        //         "validRule": "[]",
        //         "version": 0
        //     },
        //     "decimal": 0,
        //     "id": "20000000530035",
        //     "key": "ms",
        //     "length": 50,
        //     "name": "ms",
        //     "primary": false,
        //     "required": false,
        //     "table": {
        //         "$ref": "$.data"
        //     },
        //     "tableId": "20000000530031",
        //     "type": "varchar",
        //     "updateTime": "2018-09-26 22:45:36",
        //     //扩展的字段
        //     "used": false
        // }
    },
    //面板属性，更新做中转用
    componentPanel: {
        //占位符
        placeholderText: "",
        //选择类型的选择项目
        options: [],
        //多行的高宽
        eheight: 0,
        ewidth: 0,
        //字典的key
        key: "",
        //序列号类型
        alias: "",
        //日期格式
        format: "",
        //默认值
        defaultValue: ""
    }
}

const mutations = {
    SET_BUS_TBL_OBJ: (state, businessColumn) => {
        state.businessColumn = businessColumn
    },
    ADD_EDITOR_COL: (state, {
        id,
        dom
    }) => {
        state.editorColumn[id] = dom
    },
    DEL_EDITOR_COL: (state, id) => {
        state.editorColumn[id] = null
    },
    ADD_COLUMN: (state, column) => {
        state.businessColumn[column.id] = column;
    },
    SET_COLUMN_USED: (state, {
        id,
        used
    }) => {
        if (state.businessColumn[id]) {
            state.businessColumn[id].used = used;
        }
    },
    SET_COLUMN_EDITABLE: (state, {
        id,
        editable
    }) => {
        if (state.businessColumn[id]) {
            state.businessColumn[id].editable = editable;
        }
    },
    SET_COLUMN_CTRL: (state, {
        id,
        ctrl
    }) => {
        if (state.businessColumn[id]) {
            state.businessColumn[id].ctrl = ctrl;
        }
    },
    SET_COLUMN_CTRL_CONFIG: (state, {
        id,
        config
    }) => {
        if (state.businessColumn[id]) {
            state.businessColumn[id].ctrl.config = config;
        }
    },
    SET_ACT_COM: (state, activeComponent) => {
        state.activeComponent = activeComponent
    },
    SET_PANEL: (state, componentPanel) => {
        state.componentPanel = componentPanel
    }
}

const actions = {
    setBusTblObject({
        commit,
        state
    }, businessColumn) {
        commit('SET_BUS_TBL_OBJ', businessColumn)
    },
    addColumn({
        commit,
        state
    }, column) {
        commit('ADD_COLUMN', column)
    },
    setActiveComponent({
        commit,
        state
    }, activeComponent) {
        commit('SET_ACT_COM', activeComponent)
    },
    addEditorCol({
        commit,
        state
    }, data) {
        commit('ADD_EDITOR_COL', data)
    },
    delEditorCol({
        commit,
        state
    }, id) {
        commit('DEL_EDITOR_COL', id)
    },
    setColumnUsed({
        commit,
        state
    }, data) {
        commit('SET_COLUMN_USED', data)
    },
    setColumnEditable({
        commit,
        state
    }, data) {
        commit('SET_COLUMN_EDITABLE', data)
    },
    setColumnCtrl({
        commit,
        state
    }, data) {
        commit('SET_COLUMN_CTRL', data)
    },
    setColumnCtrlConfig({
        commit,
        state
    }, data) {
        commit('SET_COLUMN_CTRL_CONFIG', data)
    },
    setPanel({
        commit,
        state
    }, data) {
        commit('SET_PANEL', data)
    }

}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}