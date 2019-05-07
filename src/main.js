
import Vue from 'vue'
//vue脚手架 帮我们将组件可以封装成.vue文件
import App from './App.vue'
import router from './router'
import './assets/index.less';//公用样式
import VueLazyLoad from 'vue-lazyload';
Vue.use(VueLazyLoad);
import VueScroller  from 'vue-scroller';
Vue.use(VueScroller);//引用这个组件后 也面会多一个全局组件 scroller
import store from './store'
new Vue({
  el: '#app',
  router,
  store,
  // runtime + compiler  runtime only(不支持template写法)
  //template: '<div>hello world</div>',
  //run time only 是基于 .vue文件
  /*render(h){  //只针对于根元素
    return  h(App)
  },*/
  ...App, //直接将组件结构放到当前实例下即可
  //components: { App }
});
