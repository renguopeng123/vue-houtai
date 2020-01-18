import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist


//Vue.beforeEach(function(to,form,next){}) 在跳转之前执行
//Vue.afterEach(function(to,form)) 在跳转之后判断
router.beforeEach(async(to, from, next) => {
    // start progress bar
    NProgress.start()

    // 就是判断cookie是否存在，不存再则过期
    const hasToken = getToken()

    if (hasToken) {
        if (to.path === '/login') {
            // 如果是登陆页面不判断权限
            next({ path: '/' })
            NProgress.done()
        } else {
            // 确定用户是否通过getinfo获取了权限角色 ，这里再第一次访问路由的时候执行了下面的else
            // 已经生成了正确的路由对象和角色，只需要判断角色是否存在即可。
            const hasRoles = store.getters.roles && store.getters.roles.length > 0
            if (hasRoles) {
                next()
            } else {
                try {
                    //ES7中提出的前端异步特性：async、await。
                    //await是等待异步完成，注意这里调用的getInfo和generateRoutes都是异步操作（Promise）
                    //await的作用其实就是替代了then方法，将resolve的值直接返回。
                    // get user info
                    // note: roles must be a object array! such as: ['ROLE_ADMIN'] or ,['ROLE_USER','ROLE_ADMIN']
                    const { roles } = await store.dispatch('user/getInfo')

                    // 根据角色生成可访问的路由映射，更新store中的routes对象
                    const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

                    //如果确实需要后台分配菜单这里可以后台获取菜单后覆盖accessRoutes

                    // 动态添加可访问路由(这里是路由中添加 不是菜单，菜单再SidebarItem中会判断hidden属性)
                    router.addRoutes(accessRoutes)

                    // hack method to ensure that addRoutes is complete
                    // set the replace: true, so the navigation will not leave a history record
                    next({...to, replace: true })
                } catch (error) {
                    // remove token and go to login page to re-login
                    await store.dispatch('user/resetToken')
                    Message.error(error || 'Has Error')
                    next(`/login?redirect=${to.path}`)
                    NProgress.done()
                }
            }
        }
    }
    //没有token则跳转到登陆页面
    else {
        /* has no token*/

        if (whiteList.indexOf(to.path) !== -1) {
            // in the free login whitelist, go directly
            next()
        } else {
            // other pages that do not have permission to access are redirected to the login page.
            next(`/login?redirect=${to.path}`)
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    // finish progress bar
    NProgress.done()
})