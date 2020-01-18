import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'


//当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
// hidden: true // (默认 false)

//当设置 noredirect 的时候该路由在面包屑导航中不可被点击
// redirect: 'noredirect'

//当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
//只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
//若你想不管路由下面的 children 声明的个数都显示你的根路由
//你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
// alwaysShow: true

//设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
// name: 'router-name'

// meta: {
//     roles: ['ROLE_ADMIN', 'ROLE_Gholidy'] //设置该路由进入的权限，支持多个权限叠加
//     title: 'title' //设置该路由在侧边栏和面包屑中展示的名字
//     icon: 'svg-name' //设置该路由的图标
//     noCache: true //如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
//     breadcrumb: false // 如果设置为false，则不会在breadcrumb面包屑中显示
//     affix: true //标签不能关闭
// }

//基础路由设置，包括重定向，权限，登陆，首页，404，401等等
export const constantRoutes = [

    {
        path: '/redirect',
        component: Layout,
        hidden: true,
        children: [{
            path: '/redirect/:path*',
            component: () =>
                import ('@/views/redirect/index')
        }]
    },
    {
        path: '/login',
        component: () =>
            import ('@/views/login/index'),
        hidden: true
    },
    {
        path: '/auth-redirect',
        component: () =>
            import ('@/views/login/authredirect'),
        hidden: true
    },
    {
        path: '/404',
        component: () =>
            import ('@/views/errorPage/404'),
        hidden: true
    },
    {
        path: '/401',
        component: () =>
            import ('@/views/errorPage/401'),
        hidden: true
    },
    {
        path: '/custDialog',
        component: () =>
            import ('@/bpm/views/flow/layout/components/custDialog'),
        hidden: true
    },
    {
        path: '',
        component: Layout,
        redirect: 'home',
        children: [{
            path: 'home',
            component: () =>
                import ('@/views/home/index'),
            name: 'Home',
            meta: {
                title: 'home',
                icon: 'home',
                //不缓存
                // noCache: true,
                //标签不能关闭配置
                affix: true
            }
        }]
    }
]

//异步路由，需要判断用户角色，同时对应菜单显示。
//菜单name必须和组件name对应 否则缓存有问题！
export const asyncRoutes = [

    {
        path: '/system',
        component: Layout,
        // redirect: '/system/dept',
        name: 'system',
        meta: {
            title: '机构用户',
            icon: 'system'
        },
        children: [

            {
                path: 'dept',
                component: () =>
                    import ('@/views/dept/index'),
                //name必须和组件name对应 否则缓存有问题！
                name: 'dept',
                meta: {
                    title: '机构管理',
                    icon: 'dept',
                    roles: ['ROLE_ADMIN']
                }
            },

            {
                path: 'user',
                component: () =>
                    import ('@/views/user/index'),
                //name必须和组件name对应 否则缓存有问题！
                name: 'user',
                meta: {
                    title: '用户管理',
                    icon: 'user',
                    roles: ['ROLE_ADMIN']
                }
            },

            {
                path: 'role',
                component: () =>
                    import ('@/views/role/index'),
                //name必须和组件name对应 否则缓存有问题！
                name: 'role',
                meta: {
                    title: '角色管理',
                    icon: 'role',
                    roles: ['ROLE_ADMIN']
                }
            },
            {
                path: 'duties',
                component: () =>
                    import ('@/views/duties/index'),
                //name必须和组件name对应 否则缓存有问题！
                name: 'duties',
                meta: {
                    title: '岗位管理',
                    icon: 'duties',
                    roles: ['ROLE_ADMIN']
                }
            },


        ]
    },

    {
        path: '/systermSet',
        component: Layout,
        redirect: '/systermSet/configurat',
        name: 'systermSet',
        meta: {
            title: '系统设置',
            icon: 'drag'
        },
        children: [

            // {
            //     path: 'sysconfigurat',
            //     component: () =>
            //         import ('@/views/sysconfigurat/index'),
            //     //name必须和组件name对应 否则缓存有问题！
            //     name: 'sysconfigurat',
            //     meta: {
            //         title: '资源管理',
            //         icon: 'cube',
            //         roles: ['ROLE_ADMIN']
            //     }
            // },

            {
                path: 'sysGholidy',
                component: () =>
                    import ('@/views/sysGholidy/index'),
                //name必须和组件name对应 否则缓存有问题！
                name: 'sysGholidy',
                meta: {
                    title: '国家节假日',
                    icon: 'page-number',
                    roles: ['ROLE_ADMIN']
                }
            },

            {
                path: 'sysDatasourceTemp',
                component: () =>
                    import ('@/views/sysDatasourceTemp/index'),
                //name必须和组件name对应 否则缓存有问题！
                name: 'sysDatasourceTemp',
                meta: {
                    title: '系统数据源模板',
                    icon: 'page-bm',
                    roles: ['ROLE_ADMIN']
                }
            },

            {
                path: 'sysDatadictionary',
                component: () =>
                    import ('@/views/sysDatadictionary/index'),
                //name必须和组件name对应 否则缓存有问题！
                name: 'sysDatadictionary',
                meta: {
                    title: '数据字典',
                    icon: 'datasource',
                    roles: ['ROLE_ADMIN']
                }
            },

            {
                path: 'sysAttributeManage',
                component: () =>
                    import ('@/views/sysAttributeManage/index'),
                //name必须和组件name对应 否则缓存有问题！
                name: 'sysAttributeManage',
                meta: {
                    title: '系统属性管理',
                    icon: 'field',
                    roles: ['ROLE_ADMIN']
                }
            },

            {
                path: 'sysDatasource',
                component: () =>
                    import ('@/views/sysDatasource/index'),
                //name必须和组件name对应 否则缓存有问题！
                name: 'sysDatasource',
                meta: {
                    title: '系统数据源',
                    icon: 'field',
                    roles: ['ROLE_ADMIN']
                }
            },

            {
                path: 'sysBenchManage',
                component: () =>
                    import ('@/views/sysBenchManage/index'),
                //name必须和组件name对应 否则缓存有问题！
                name: 'sysBenchManage',
                meta: {
                    title: '工作台管理',
                    icon: 'clipboard',
                    roles: ['ROLE_ADMIN']
                }
            }


        ]
    },

    {
        path: '/developAssis',
        component: Layout,
        redirect: '/developAssis/deveSerialnum',
        name: 'developAssis',
        meta: {
            title: '开发辅助',
            icon: 'documentation'
        },
        children: [

            {
                path: 'deveSerialnum',
                component: () =>
                    import ('@/views/deveSerialnum/index'),
                //name必须和组件name对应 否则缓存有问题！
                name: 'deveSerialnum',
                meta: {
                    title: '流水号',
                    icon: 'actualSize',
                    roles: ['ROLE_ADMIN']
                }
            },

            {
                path: 'descriptUsed',
                component: () =>
                    import ('@/views/descriptUsed/index'),
                //name必须和组件name对应 否则缓存有问题！
                name: 'descriptUsed',
                meta: {
                    title: '常用脚本',
                    icon: 'encoding',
                    roles: ['ROLE_ADMIN']
                }
            },

            {
                path: 'deCustomDialogBox',
                component: () =>
                    import ('@/views/deCustomDialogBox/index'),
                //name必须和组件name对应 否则缓存有问题！
                name: 'deCustomDialogBox',
                meta: {
                    title: '自定义对话框',
                    icon: 'link',
                    roles: ['ROLE_ADMIN']
                }
            },

            {
                path: 'deSystemTree',
                component: () =>
                    import ('@/views/deSystemTree/index'),
                //name必须和组件name对应 否则缓存有问题！
                name: 'deSystemTree',
                meta: {
                    title: '系统树',
                    icon: 'flow',
                    roles: ['ROLE_ADMIN']
                }
            },

            {
                path: 'deAbnormalog',
                component: () =>
                    import ('@/views/deAbnormalog/index'),
                //name必须和组件name对应 否则缓存有问题！
                name: 'deAbnormalog',
                meta: {
                    title: '异常日志',
                    icon: 'entityTable',
                    roles: ['ROLE_ADMIN']
                }
            },

            {
                path: 'deFontIcon',
                component: () =>
                    import ('@/views/svg-icons/index'),
                //name必须和组件name对应 否则缓存有问题！
                name: 'Icons',
                meta: {
                    title: '字体图标',
                    icon: 'icon',
                    roles: ['ROLE_ADMIN']
                }
            }

        ]
    },

    {
        path: '/workflow',
        component: Layout,
        redirect: '/workflow/page-edit-list-new',
        name: 'workflow',
        meta: {
            title: '工作流管理',
            icon: 'workflow'
        },
        children: [{
                path: 'model',
                name: 'model',
                children: [{
                    path: document.location.protocol + "//" + window.location.host + '/model.html',
                    meta: {
                        title: '业务实体定义',
                        icon: 'model'
                    }
                }]
            },
            {
                path: 'businessObject',
                name: 'businessObject',
                children: [{
                    path: document.location.protocol + "//" + window.location.host + '/businessObject.html',
                    meta: {
                        title: '业务对象定义',
                        icon: 'model'
                    }
                }]
            },
            // {
            //     path: 'page',
            //     name: 'page',
            //     children: [{
            //         path: document.location.protocol + "//" + window.location.host + '/page.html?id=410773850321846273',
            //         meta: {
            //             title: '表单定义',
            //             icon: 'page'
            //         }
            //     }]
            // },

            {
                path: 'page-edit-list',
                component: () =>
                    import ('@/views/pageEdit/index'),
                name: 'pageEdit',
                meta: {
                    title: '表单列表',
                    icon: 'page',
                    roles: ['ROLE_ADMIN'],
                    //暂时不缓存 后续修改
                    noCache: true
                }
            },
            {
                path: 'page-edit-list-new',
                component: () =>
                    import ('@/views/pageEdit_new/index'),
                name: 'pageEdit_new',
                meta: {
                    title: '表单列表-新',
                    icon: 'page',
                    roles: ['ROLE_ADMIN'],
                    //暂时不缓存 后续修改
                    noCache: true
                }
            },

            {
                path: 'flow',
                name: 'flow',
                children: [{
                    path: document.location.protocol + "//" + window.location.host + '/flow.html',
                    meta: {
                        title: '流程定义',
                        icon: 'flow'
                    }
                }]
            },
            {
                path: 'newFlow',
                    component: () =>
            import ('@/views/flow/index'),
                name: 'flow',
                meta: {
                title: '流程定义-新',
                    icon: 'flow',
                    //暂时不缓存 后续修改
                    noCache: true
            }
            },
            {
                path: 'task',
                    component: () =>
            import ('@/views/task/index'),
                name: 'flow',
                meta: {
                title: '任务列表',
                    icon: 'flow',
                    //暂时不缓存 后续修改
                    noCache: true
            }
            },
            {
                path: 'flowCase',
                    component: () =>
            import ('@/views/flowCase/index'),
                name: 'flow',
                meta: {
                title: '流程实例',
                    icon: 'flow',
                    //暂时不缓存 后续修改
                    noCache: true
            }
            },
            {
                path: 'custDialog',
                name: 'custDialog',
                component: () =>
                    import ('@/bpm/views/flow/layout/components/custDialog.vue'),
                hidden: true
            },
            {
                path: 'start-flow',
                component: () =>
                    import ('@/views/bpm/flow/startFlow.vue'),
                name: 'start-flow',
                meta: {
                    title: '发起申请',
                    icon: 'page-yj',
                    //暂时不缓存 后续修改
                    noCache: true
                }
            },
            {
                path: 'my-draft',
                component: () =>
                    import ('@/views/bpm/flow/myDraft.vue'),
                name: 'my-draft',
                meta: {
                    title: '我的草稿',
                    icon: 'page-yj',
                    //暂时不缓存 后续修改
                    noCache: true
                }
            },
            {
                path: 'my-apply-history',
                component: () =>
                    import ('@/views/bpm/flow/applyHistory.vue'),
                name: 'apply-history',
                meta: {
                    title: '申请历史',
                    icon: 'page-yj',
                    //暂时不缓存 后续修改
                    noCache: true
                }
            },
            {
                path: 'todo-task-list',
                component: () =>
                    import ('@/views/bpm/flow/todoTaskList.vue'),
                name: 'todo-task-list',
                meta: {
                    title: '待办事宜',
                    icon: 'page-yj',
                    //暂时不缓存 后续修改
                    noCache: true
                }
            },
            {
                path: 'approve-history-list',
                component: () =>
                    import ('@/views/bpm/flow/approveHistoryList.vue'),
                name: 'approve-history-list',
                meta: {
                    title: '办理历史',
                    icon: 'page-yj',
                    //暂时不缓存 后续修改
                    noCache: true
                }
            },

        ]
    },


    // {
    //     path: '/chart',
    //     component: Layout,
    //     children: [{
    //         path: 'index',
    //         component: () =>
    //             import ('@/views/dashboard/index'),
    //         name: 'Chart',
    //         meta: {
    //             title: '综合图形实例',
    //             icon: 'dashboard'
    //         }
    //     }]
    // },

    // {
    //     path: '/permission',
    //     component: Layout,
    //     redirect: '/permission/index',
    //     alwaysShow: true, // will always show the root menu
    //     meta: {
    //         title: '页面权限用法参考',
    //         icon: 'lock',
    //         roles: ['ROLE_ADMIN', 'ROLE_Gholidy'] // you can set roles in root nav
    //     },
    //     children: [{
    //         path: 'directive',
    //         component: () =>
    //             import ('@/views/permission/directive'),
    //         name: 'DirectivePermission',
    //         meta: {
    //             title: 'directivePermission'
    //         }
    //     }]
    // },


    // {
    //     path: '/example',
    //     component: Layout,
    //     redirect: '/example/list',
    //     name: 'Example',
    //     meta: {
    //         title: 'example',
    //         icon: 'example'
    //     },
    //     children: [{
    //             path: 'create',
    //             component: () =>
    //                 import ('@/views/example/create'),
    //             name: 'CreateArticle',
    //             meta: {
    //                 title: 'createArticle',
    //                 icon: 'edit'
    //             }
    //         },
    //         {
    //             path: 'edit/:id(\\d+)',
    //             component: () =>
    //                 import ('@/views/example/edit'),
    //             name: 'EditArticle',
    //             meta: {
    //                 title: 'editArticle',
    //                 noCache: true
    //             },
    //             hidden: true
    //         },
    //         {
    //             path: 'list',
    //             component: () =>
    //                 import ('@/views/example/list'),
    //             name: 'ArticleList',
    //             meta: {
    //                 title: 'articleList',
    //                 icon: 'list'
    //             }
    //         }
    //     ]
    // },

    // {
    //     path: '/tab',
    //     component: Layout,
    //     children: [{
    //         path: 'index',
    //         component: () =>
    //             import ('@/views/tab/index'),
    //         name: 'Tab',
    //         meta: {
    //             title: 'tab实例',
    //             icon: 'tab'
    //         }
    //     }]
    // },

    {
        path: '*',
        redirect: '/404',
        hidden: true
    }
]

const createRouter = () => new Router({
    scrollBehavior: () => ({
        y: 0
    }),
    routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher
}

export default router