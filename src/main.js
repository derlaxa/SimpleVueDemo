import Vue from 'vue'
import {Container,Header,Main,Footer,Row,Col,PageHeader,Menu,MenuItem,Badge,Icon,Carousel,CarouselItem,Image,Card,Input,Button,Message,Tabs,TabPane,Loading,Divider,InputNumber,Checkbox} from 'element-ui';
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import moment from 'moment'
import comm from './components/Comm.vue'

axios.defaults.headers = {
  'content-type': 'application/json;charset=UTF-8',
  'token': 'one'
};
axios.defaults.baseURL = '/api'//'http://www.liulongbin.top:3005/api';
axios.defaults.timeout = 10000;
axios.defaults.withCredentials = true;
Vue.prototype.$axios = axios;

Message.install = function(){
    Vue.prototype.$message = Message;
};
Vue.use(Message);
Vue.use(Loading);

Vue.component('comm',comm);

Vue.component('el-container',Container);
Vue.component('el-header',Header);
Vue.component('el-main',Main);
Vue.component('el-footer',Footer);
Vue.component('el-row',Row);
Vue.component('el-col',Col);
Vue.component('el-page-header',PageHeader);
Vue.component('el-navmenu',Menu);
Vue.component('el-navmenu-item',MenuItem);
Vue.component('el-badge',Badge);
Vue.component('el-carousel',Carousel);
Vue.component('el-carousel-item',CarouselItem);
Vue.component('el-image',Image);
Vue.component('el-card',Card);
Vue.component('el-input',Input);
Vue.component('el-button',Button);
Vue.component('el-tabs',Tabs);
Vue.component('el-tab-pane',TabPane);
Vue.component('el-divider',Divider);
Vue.component('el-input-number',InputNumber);
Vue.component('el-checkbox',Checkbox);

Vue.config.productionTip = false;



Vue.filter('dateFormat',function (data,format = "YYYY-MM-DD HH:mm:ss") {

    return moment(data).format(format);
    //return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
})


new Vue({
  methods:{
  },

  router,
  store,
  render: h => h(App)
}).$mount('#app')
