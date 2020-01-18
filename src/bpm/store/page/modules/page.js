const state = {
    //page对象
    pageObject: {
        //表单名称
        "name": "",
        //表单编辑的html
        "html": "",
        //表单ID
        "id": "",
        //表单key
        "key": "",
        //业务对象名称
        "boName": "",
        //业务对象key
        "boKey": "",
        //所属分类
        "groupId": "",
        "groupName": "",
        //类别 vue表单还是普通表单
        "type": "",
        //删除标识
        "delete": false,
        //版本
        "version": 0,
        "isDeveloper": false,
        //创建用户
        "createBy": "",
        "createTime": "",
        "updateBy": "",
        "updateTime": ""
    },
    //用来记录Editor的状态
    editorState: "",
    //用来记录Editor的保存事件（提供自动保存等功能使用）
    editorSaved: ""
}

const mutations = {
    SET_PAGE: (state, pageObject) => {
        state.pageObject = pageObject
    },
    CHANGE_EDITOR: (state, editorState) => {
        state.editorState = editorState
    },
    SAVE_EDITOR: (state, editorSaved) => {
        state.editorSaved = editorSaved
    }
}

const actions = {
    setPage({
        commit,
        state
    }, pageObject) {
        commit('SET_PAGE', pageObject)
    },
    changeEditor({
        commit
    }, editorState) {
        commit('CHANGE_EDITOR', editorState)
    },
    saveEditor({
        commit
    }, editorSaved) {
        commit('SAVE_EDITOR', editorSaved)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}