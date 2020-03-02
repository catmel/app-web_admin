import Vue from 'vue'
import App from './App.vue'
import router from './router' //路由
import 'element-ui/lib/theme-chalk/index.css'; //elementui 样式
import ElementUI from 'element-ui'; //elementui 组件
import "./assets/style/reset.css"; //初始化样式
import echarts from 'echarts' // 引入echarts
import axios from "axios" //ajax
import qs from "qs" //改变传入axios值位form表单
var url = "http://work.08321.org/";

Vue.prototype.$url = url
Vue.prototype.$qs = qs
Vue.prototype.$echarts = echarts
Vue.prototype.$axios = axios




Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')