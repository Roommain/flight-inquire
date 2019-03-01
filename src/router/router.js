import Vue from 'vue';
import Router from 'vue-router';
import routers from './index';

Vue.use(Router)

const router = new Router({
  routes: routers,
})
router.beforeEach((to, from, next) => {
  if(to.meta.permissions){
    if(true){
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