const router = new VueRouter({
  mode: 'history',

  routes: [
    {
      name: 'index',
      path: '/',
      component: Vue.component('z-index')
    }
  ]
});
