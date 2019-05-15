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
    title: 'title'               the name show in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    meta: { title: '首页',  noCache: true },
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },
  {
    path: '/article',
    component: Layout,
    redirect: '/article',
    name: 'Article',
    meta: { title: '博文管理', icon: 'example' },
    children: [
      {
        path: 'articleAdd',
        name: 'articleAdd',
        component: () => import('@/views/article/add'),
        meta: { title: '添加博文', icon: 'example' }
      },
      {
        path: 'articleList',
        name: 'articleList',
        component: () => import('@/views/article/list'),
        meta: { title: '管理博文', icon: 'form' }
      }
    ]
  },
  {
    path: '/cas',
    component: Layout,
    redirect: '/cas',
    name: 'CAS',
    meta: { title: 'CAS管理', icon: 'example' },
    children: [
      {
        path: 'casAdd',
        name: 'casAdd',
        component: () => import('@/views/cas/add'),
        meta: { title: '添加登录客户端', icon: 'example' }
      },
      {
        path: 'casList',
        name: 'casList',
        component: () => import('@/views/cas/list'),
        meta: { title: '管理登录客户端', icon: 'form' }
      }
    ]
  },
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission',
    name: 'Permission',
    meta: { title: '权限管理', icon: 'example' },
    children: [
      {
        path: 'userList',
        name: 'userList',
        component: () => import('@/views/permission/userList'),
        meta: { title: '用户管理', icon: 'example' }
      },
      {
        path: 'roleList',
        name: 'roleList',
        component: () => import('@/views/permission/roleList'),
        meta: { title: '角色管理', icon: 'form' }
      },
      {
        path: 'permissionList',
        name: 'permissionList',
        component: () => import('@/views/permission/permissionList'),
        meta: { title: '权限管理', icon: 'form' }
      },    
    ]
  },
  {
    path: '/foreground',
    component: Layout,
    children: [
      {
        path: 'foregroundManger',
        name: 'foregroundManger',
        component: () => import('@/views/foreground/foregroundManger'),
        meta: { title: '前台管理', icon: 'form' }
      }
    ]
  },
  {
    path: 'blog-index',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: '博客首页', icon: 'link' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
