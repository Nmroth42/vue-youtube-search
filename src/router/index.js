import Vue from 'vue';
import Router from 'vue-router';
import Base from '@/components/Base';
import SearchBar from '@/components/SearchBar';
import IndexPage from '@/components/Index';
import VideoList from '@/components/VideoList';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: IndexPage,
    },
    {
      path: '/list',
      name: 'list',
      component: VideoList,
     
    },
  ],
});
