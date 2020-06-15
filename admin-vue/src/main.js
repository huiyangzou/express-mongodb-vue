import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import VueRouter from 'vue-router'
import create from "./pages/user/create";
import mainPage from "./pages/mainPage";
import deletePage from "./pages/user/deletePage";
import updatePage from "./pages/user/updatePage";

Vue.use(VueRouter)
Vue.use(ElementUI);
const routes = [
    {
        path: '/', component: mainPage,
        children: [
            {path: '/create', component: create},
            {path: '/delete', component: deletePage},
            {path: '/update', component: updatePage},
        ]
    }

]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
    routes // (缩写) 相当于 routes: routes
})

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
