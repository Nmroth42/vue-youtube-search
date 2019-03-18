import Vue from 'vue';
import Router from 'vue-router';
import IndexPage from '@/components/Index';
import VideoList from '@/components/VideoList';
import VideoDetail from '@/components/VideoDetail';

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
    {
      path: '/watch/',
      name: 'video',
      component: VideoDetail,
    },
  ],
});
