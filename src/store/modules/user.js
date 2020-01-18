import {
    login,
    logout,
    getInfo
} from '@/api/user'
import {
    getToken,
    setToken,
    removeToken
} from '@/utils/auth'
import router, {
    resetRouter
} from '@/router'
import qs from 'qs'

const state = {
    token: getToken(),
    id: '',
    name: '',
    avatar: '',
    introduction: '',
    roles: []
}

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
        state.introduction = introduction
    },
    SET_ID: (state, id) => {
        state.id = id
    },
    SET_NAME: (state, name) => {
        state.name = name
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles
    }
}

const actions = {
    // user login
    login({
        commit
    }, userInfo) {
        const {
            username,
            password
        } = userInfo
        return new Promise((resolve, reject) => {

            //提交 form-data
            // let data = new FormData();
            // data.append('username', username.trim());
            // data.append('password', password);

            var data = {
                username: username.trim(),
                password: password
            }

            //将json转成参数字符串提交application/x-www-form-urlencoded 数据
            //如果不转换直接提交则为 application/json对象 后台需要对应使用@RequestBody
            data = qs.stringify(data)

            login(
                data
            ).then(response => {
                const {
                    username
                } = response

                //因为存在不同域等各种情况，前端和后端cookie采用各自维护的策略，不过如果调用后台服务报权限错误会同时踢出前端会话。
                //前端访问多个不同环境的服务，最好将所有服务部署到同一个主域名下保证服务调用间的会话一致性，否则需要改造axios中的request传入会话cookie
                //登陆成功后设置cookie，用于前端的会话保持（vuex和cookie中都使用此token）

                console.log("登陆用户 = " + username);
                commit('SET_TOKEN', username)
                setToken(username)
                resolve()
            }).catch(error => {
                // console.error(error)
                reject(error)
            })
        })
    },

    // get user info
    getInfo({
        commit,
        state
    }) {
        return new Promise((resolve, reject) => {
            getInfo(

                //如果需要提交参数
                state.token

            ).then(response => {
                const {
                    username
                } = response

                if (!username || username == "anonymousUser") {
                    reject('认证失败, 请重新登陆。')
                }

                const {
                    authorities,
                    name,
                    id
                } = response

                // 角色不能为空
                if (!authorities || authorities.length <= 0) {
                    reject('getInfo: roles(authorities) must be a non-null array!')
                }

                var roles = [];

                for (var i = 0; i < authorities.length; i++) {
                    console.log(authorities[i].authority);
                    roles.push(authorities[i].authority);
                }

                commit('SET_ROLES', roles)
                commit('SET_ID', id)
                commit('SET_NAME', username)
                    //头像 预留
                commit('SET_AVATAR', "")
                commit('SET_INTRODUCTION', name)
                resolve(state)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // user logout
    logout({
        commit,
        state
    }) {
        return new Promise((resolve, reject) => {
            logout(state.token).then(() => {
                commit('SET_TOKEN', '')
                commit('SET_ROLES', [])
                removeToken()
                resetRouter()
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // remove token
    resetToken({
        commit
    }) {
        return new Promise(resolve => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            removeToken()
            resolve()
        })
    },

    // Dynamically modify permissions
    changeRoles({
        commit,
        dispatch
    }, role) {
        return new Promise(async resolve => {
            const token = role + '-token'

            commit('SET_TOKEN', token)
            setToken(token)

            const {
                roles
            } = await dispatch('getInfo')

            resetRouter()

            // generate accessible routes map based on roles
            const accessRoutes = await dispatch('permission/generateRoutes', roles, {
                root: true
            })

            // dynamically add accessible routes
            router.addRoutes(accessRoutes)

            resolve()
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}