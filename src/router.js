import Vue from 'vue';
import Router from 'vue-router';
import MainHome from './views/MainHome.vue';
import WriteForm from './views/WriteForm';
import MypageInformation from './views/mypage/MypageInformation'
import WrittenParty from './views/mypage/WrittenParty'
import ParticipatedPod from './views/mypage/ParticipatedPod'
import guideTakoyaki from './views/guideTakoyaki'
import OAuth from "./views/OAuth.vue";
import userCategorize from "./components/viewComponent/userCategorize";
Vue.use(Router);

export default new Router({
  mode: 'history',
  routes :[
  {
    path:'/',
    name:'MainHome',
    component: MainHome,
  },
  {
    path:'/writeform',
    component:WriteForm,
  },
  {
    path:'/mypage/my-information',
    component:MypageInformation,
  },
  {
    path:'/mypage/written-party',
    component:WrittenParty,
  },
  {
    path:'/mypage/participated-party',
    component:ParticipatedPod,
  },
  {
    path: '/banner',
    component:guideTakoyaki,
  },
  {
    path: '/oauth',
    component:OAuth,
  },
  {
    path: '/userCategorize/:party_id',
    component: userCategorize,
    name:'userCategorize',
    props:true,
  }
],
})