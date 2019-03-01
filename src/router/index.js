import Vue from 'vue'
import Router from 'vue-router'
import cookie from 'js-cookie';

Vue.use(Router)

const router = new Router({
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
      path: '/findPassword',
      name: '找回密码',
      component: resolve => require(['@/views/find-password/findPassword'], resolve),
    },
    {
      path: '/register',
      name: '注册',
      component: resolve => require(['@/views/register/register'], resolve),
    },
    {
      path: '/main',
      name: 'main',
      meta: {
        permissions: true,
      },
      component: resolve => require(['@/views/Main'], resolve),
      redirect: '/statistical',
      children:[
        {
          path: '/statistical',
          name: '数据',
          meta: {
            permissions: true,
          },
          component: resolve => require(['@/views/statistical/statistical_main'], resolve),
        },
        {
          path: '/changePassword',
          name: '改变密码',
          meta: {
            permissions: true,
          },
          component: resolve => require(['@/views/user_message/userChangePassword'], resolve),
        },
        {
          path: '/userinfo',
          name: '用户信息',
          meta: {
            permissions: true,
          },
          component: resolve => require(['@/views/user_message/userinfo'], resolve),
        },
        {
          path: '/attention',
          name: '关注我们',
          meta: {
            permissions: true,
          },
          component: resolve => require(['@/views/attention/attention'], resolve),
        },
        {
          path: '/flightManage',
          name: '飞机航班管理',
          meta: {
            permissions: true,
          },
          component: resolve => require(['@/views/flight-manage/flightManage'], resolve),
        },
      ]
    },
    
    // 错误页面
    {
        path: '/403',
        name: '没有权限',
        meta: {
            permissions: false,
        },
        component: resolve => require(['@/views/err_page/403'], resolve),
    },
    {
        path: '/404',
        name: '获取不到资源',
        meta: {
            permissions: false,
        },
        component: resolve => require(['@/views/err_page/404'], resolve),
    },
    {
        path: '/500',
        name: '网络错误',
        meta: {
            permissions: false,
        },
        component: resolve => require(['@/views/err_page/500'], resolve),
    },
  ]
})

router.beforeEach((to, from, next) => {
  if(to.meta.permissions){
    var token = cookie.get('token');
    if(token){
      next();
    }else{
      next({
        path:'/login'
      })
    }
  }else{
    next();
  }
});
export default router;
