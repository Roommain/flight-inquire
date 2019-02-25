import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: '登录',
      component: resolve => require(['@/views/logins/login'], resolve),
    },
    {
      path: '/changePassword',
      name: '修改密码',
      component: resolve => require(['@/views/changePassword/changePassword'], resolve),
    },
    {
      path: '/register',
      name: '注册',
      component: resolve => require(['@/views/register/register'], resolve),
    },
    {
      path: '/main',
      name: 'main',
      component: resolve => require(['@/views/Main'], resolve),
      redirect: '/statistical',
      children:[
        {
          path: '/statistical',
          name: '数据',
          component: resolve => require(['@/views/statistical/statistical_main'], resolve),
        },
        {
          path: '/mainsearch',
          name: '主页搜索',
          component: resolve => require(['@/views/mainsearch/mainsearch'], resolve),
        },
      ]
    },
    // {
    //   path: '/statistical',
    //   name: '数据',
    //   component: resolve => require(['@/views/statistical/statistical_main'], resolve),
    // },
    
    // 错误页面
    {
        path: '/403',
        name: '没有权限',
        // meta: {
        //     permissions: false,
        // },
        component: resolve => require(['@/views/err_page/403'], resolve),
    },
    {
        path: '/404',
        name: '获取不到资源',
        // meta: {
        //     permissions: false,
        // },
        component: resolve => require(['@/views/err_page/404'], resolve),
    },
    {
        path: '/500',
        name: '网络错误',
        // meta: {
        //     permissions: false,
        // },
        component: resolve => require(['@/views/err_page/500'], resolve),
    },
  ]
})
