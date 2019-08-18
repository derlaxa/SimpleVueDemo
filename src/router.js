import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import User from './views/User.vue'
import Cart from './views/Cart.vue'
import Search from './views/Search.vue'
import News from './components/Newslist.vue'
import Newsinfo from './components/Newsinfo.vue'
import Photolist from './components/Photolist.vue'
import Photoinfo from './components/Photoinfo.vue'
import Goodslist from './components/Goodslist.vue'
import Goodsinfo from './components/Goodinfo.vue'
import Goodsdesc from './components/Goodsdesc.vue'
import Goodscomm from './components/Goodscomm.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
      {
          path: '/',
          name: 'app',
          redirect:'/home'
      },
      {
          path: '/home',
          name: 'home',
          component: Home,
      },
      {
          path: '/home/news',
          name: 'news',
          component: News
      },
      {
          path: '/home/newsinfo/:id',
          name: 'newsInfo',
          component: Newsinfo,
      },
      {
          path: '/home/photolist',
          name: 'photoList',
          component: Photolist,
      },
      {
         path: '/home/photoinfo',
         redirect: '/home/photolist'
      },
      {
          path: '/home/photoinfo/:id',
          name: 'photoInfo',
          component: Photoinfo,
      },
      {
          path: '/home/goodslist',
          name: 'goodslist',
          component: Goodslist
      },
      {
          path: '/home/goodinfo/:id',
          name: 'goodsinfo',
          component: Goodsinfo
      },
      {
          path: '/home/goodsdesc/:id',
          name: 'goodsdesc',
          component: Goodsdesc
      },
      {
          path: '/home/goodscomm/:id',
          name: 'goodscomm',
          component: Goodscomm
      },
      {
          path: '/user',
          name: 'User',
          component: User
      },
      {
          path: '/cart',
          name: 'Cart',
          component: Cart
      },
      {
          path: '/search',
          name: 'Search',
          component: Search
      }
  ]
})
