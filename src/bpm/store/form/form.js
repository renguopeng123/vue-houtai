const state = {
    //整个表单的字段对象 包括验证 html 初始值等等
    custComponentData: {}
}

const mutations = {
    SET_DATA: (state, data) => {
        state.custComponentData = data
    }
}

const actions = {
    setData({
        commit,
        state
    }, data) {
        commit('SET_DATA', data)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}