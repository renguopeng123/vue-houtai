const state = {
    //用户对象
    user: {
        name: "匿名用户"
    },
    //主题色
    theme: "#2365A3"
}

const mutations = {
    SET_USER: (state, user) => {
        state.user = user
    },
    CHANGE_SETTING: (state, {
        key,
        value
    }) => {
        if (state.hasOwnProperty(key)) {
            state[key] = value
        }
    }
}

const actions = {
    setUser({
        commit,
        state
    }, user) {
        commit('SET_USER', user)
    },
    changeSetting({
        commit
    }, data) {
        commit('CHANGE_SETTING', data)
    }

}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}