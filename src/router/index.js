import Vue from 'vue'
import Router from 'vue-router'
import Base from '@/components/Base'
import SearchBar from '@/components/SearchBar'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'SearchBar',
      component: SearchBar
    }
  ]
})
