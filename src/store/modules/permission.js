import {
    asyncRoutes,
    constantRoutes
} from '@/router'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
    if (route.meta && route.meta.roles) {
        return roles.some(role => route.meta.roles.includes(role))
    } else {
        return true
    }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
    const res = []

    routes.forEach(route => {
        const tmp = {
            ...route
        }
        if (hasPermission(roles, tmp)) {
            if (tmp.children) {
                tmp.children = filterAsyncRoutes(tmp.children, roles)
            }
            res.push(tmp)
        }
    })

    return res
}

//state就是vuex要传递的数据 
const state = {
    routes: [],
    addRoutes: []
}

//mutations主要是用来修改vuex 的状态
//改变state初始值的方法 
const mutations = {
    SET_ROUTES: (state, routes) => {
        state.addRoutes = routes
            //concat() 方法用于连接两个或多个数组。即把constantRoutes和角色过滤后的asyncRoutes合并
        state.routes = constantRoutes.concat(routes)
    }
}

// action的功能和mutation是类似的，都是去变更store里的state，不过action和mutation有两点不同：
// 1、action主要处理的是异步的操作，mutation必须同步执行，而action就不受这样的限制，也就是说action中我们既可以处理同步，也可以处理异步的操作
// 2、action改变状态，最后是通过提交mutation
const actions = {
    generateRoutes({
        commit
    }, roles) {
        //Promise js的异步处理模块
        return new Promise(resolve => {
            let accessedRoutes
            if (roles.includes('ROLE_ADMIN')) {
                accessedRoutes = asyncRoutes
            } else {
                accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
            }
            commit('SET_ROUTES', accessedRoutes)
                //执行成功之后回调
            resolve(accessedRoutes)
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}