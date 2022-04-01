import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/

export const constantRoutes = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  // 首页
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'RECL后台首页', icon: 'tree' }
  }]
}]

export const asyncRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: '咨询师管理',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },
  {
    path: '/FM',
    component: Layout,
    redirect: '/FM/list',
    name: '忆心FM管理',
    meta: { title: '忆心FM管理', icon: 'password' },
    children: [
      {
        path: 'list',
        name: 'FM列表',
        component: () => import('@/views/edu/FM/list'),
        meta: { title: 'FM列表', icon: 'table' }
      },
      {
        path: 'save',
        name: 'FM添加',
        component: () => import('@/views/edu/FM/save'),
        meta: { title: 'FM添加', icon: 'tree' }
      },
      {
        path: 'edit/:id',
        name: 'FM修改',
        component: () => import('@/views/edu/FM/save'),
        meta: { title: 'FM修改', noCache: true },
        hidden: true
      },
      {
        path: 'cover',
        name: '添加播放背景',
        component: () => import('@/views/edu/FM/cover/save'),
        meta: { title: '添加播放背景', icon: 'tree' }
      },
      {
        path: 'coverList',
        name: '播放背景列表',
        component: () => import('@/views/edu/FM/cover/list'),
        meta: { title: '播放背景列表', icon: 'tree' }
      }
    ]
  },
  {
    path: '/listener',
    component: Layout,
    redirect: '/listener/table',
    name: '倾听师管理',
    meta: { title: '倾听师管理', icon: 'password' },
    children: [
      {
        path: 'table',
        name: '倾听师列表',
        component: () => import('@/views/edu/listener/list'),
        meta: { title: '倾听师列表', icon: 'table' }
      },
      {
        path: 'save',
        name: '倾听师添加',
        component: () => import('@/views/edu/listener/save'),
        meta: { title: '倾听师添加', icon: 'tree' }
      },
      {
        path: 'edit/:id',
        name: '倾听师修改',
        component: () => import('@/views/edu/listener/save'),
        meta: { title: '倾听师修改', noCache: true },
        hidden: true
      }
    ]
  },
  {
    path: '/counselor',
    component: Layout,
    redirect: '/counselor/table',
    name: '咨询师管理',
    meta: { title: '咨询师管理', icon: 'password' },
    children: [
      {
        path: 'table',
        name: '咨询师列表',
        component: () => import('@/views/edu/counselor/list'),
        meta: { title: '咨询师列表', icon: 'table' }
      },
      {
        path: 'save',
        name: '咨询师添加',
        component: () => import('@/views/edu/counselor/save'),
        meta: { title: '咨询师添加', icon: 'tree' }
      },
      {
        path: 'edit/:id',
        name: '咨询师修改',
        component: () => import('@/views/edu/counselor/save'),
        meta: { title: '咨询师修改', noCache: true },
        hidden: true
      }
    ]
  },
  {
    path: '/classify',
    component: Layout,
    redirect: '/classify/list',
    name: '测试分类管理',
    meta: { title: '测试分类管理', icon: 'example' },
    children: [
      {
        path: 'list',
        name: '分类列表',
        component: () => import('@/views/edu/classify/list'),
        meta: { title: '分类列表', icon: 'table' }
      },
      {
        path: 'save',
        name: '分类添加',
        component: () => import('@/views/edu/classify/add'),
        meta: { title: '分类添加', icon: 'tree' }
      }
    ]
  },
  {
    path: '/article',
    component: Layout,
    redirect: '/article/list',
    name: '美文推送管理',
    meta: { title: '美文推送管理', icon: 'example' },
    children: [
      {
        path: 'list',
        name: '美文列表',
        component: () => import('@/views/edu/article/list'),
        meta: { title: '美文列表', icon: 'table' }
      },
      {
        path: 'send',
        name: '美文编辑提交',
        component: () => import('@/views/edu/article/send'),
        meta: { title: '美文编辑发布', icon: 'tree' }
      },
      {
        path: 'edit/:id',
        name: '美文编修改',
        component: () => import('@/views/edu/article/update'),
        hidden: true,
        meta: { title: '美文修改', icon: 'tree' }
      },
      {
        path: 'publish',
        name: '美文审核发布',
        component: () => import('@/views/edu/article/publish'),
        meta: { title: '美文审核发布', icon: 'tree' }
      }
    ]
  },
  {
    path: '/scale',
    component: Layout,
    redirect: '/scale/info',
    name: '测试量表管理',
    meta: { title: '测试量表管理', icon: 'eye' },
    children: [
      {
        path: 'info',
        name: '量表信息管理',
        component: () => import('@/views/edu/scale/info'),
        meta: { title: '量表信息管理', icon: 'form' }
      },
      {
        path: 'list',
        name: '量表管理列表',
        component: () => import('@/views/edu/scale/list'),
        meta: { title: '量表管理列表', icon: 'form' }
      },
      {
        path: 'edit/:id',
        name: '量表信息修改',
        component: () => import('@/views/edu/scale/info'),
        hidden: true,
        meta: { title: '量表信息修改', icon: 'form' }
      },
      {
        path: 'subject/:id',
        name: '量表题目上传',
        component: () => import('@/views/edu/scale/subject'),
        hidden: true,
        meta: { title: '量表题目上传',  icon: 'nested' }
      },
      {
        path: 'appraisal/:id',
        name: '量表发布',
        component: () => import('@/views/edu/scale/appraisal'),
        hidden: true,
        meta: { title: '量表评估规则上传', icon: 'password' }
      },
      {
        path: 'send/:id',
        name: '量表发布',
        component: () => import('@/views/edu/scale/send'),
        hidden: true,
        meta: { title: '量表发布', icon: 'password' }
      }
    ]
  },
  {
    path: '/acl',
    component: Layout,
    redirect: '/acl/user/list',
    name: '权限管理',
    meta: { title: '权限管理', icon: 'chart' },
    children: [
      {
        path: 'user/list',
        name: '用户管理',
        component: () => import('@/views/acl/user/list'),
        meta: { title: '用户管理' }
      },
      {
        path: 'role/list',
        name: '角色管理',
        component: () => import('@/views/acl/role/list'),
        meta: { title: '角色管理' }
      },
      {
        path: 'role/form',
        name: '角色添加',
        component: () => import('@/views/acl/role/form'),
        meta: { title: '角色添加' },
        hidden: true
      },
      {
        path: 'role/update/:id',
        name: '角色修改',
        component: () => import('@/views/acl/role/form'),
        meta: { title: '角色修改' },
        hidden: true
      },
      {
        path: 'role/distribution/:id',
        name: '角色权限',
        component: () => import('@/views/acl/role/roleForm'),
        meta: { title: '角色权限' },
        hidden: true
      },
      {
        path: 'menu/list',
        name: '菜单管理',
        component: () => import('@/views/acl/menu/list'),
        meta: { title: '菜单管理' }
      },
      {
        path: 'user/add',
        name: '用户添加',
        component: () => import('@/views/acl/user/form'),
        meta: { title: '用户添加' },
        hidden: true
      },
      {
        path: 'user/update/:id',
        name: '用户修改',
        component: () => import('@/views/acl/user/form'),
        meta: { title: '用户修改' },
        hidden: true
      },
      {
        path: 'user/role/:id',
        name: '用户角色',
        component: () => import('@/views/acl/user/roleForm'),
        meta: { title: '用户角色' },
        hidden: true
      }

    ]
  },
  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: 'menu2' }
      }
    ]
  },
  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// export default new Router({
//   // mode: 'history', //后端支持可开
//   scrollBehavior: () => ({ y: 0 }),
//   routes: constantRouterMap
// })

export default router