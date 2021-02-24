import Vue from 'vue'
//elementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import VueVideoPlayer from 'vue-video-player'

// require videojs style
import 'video.js/dist/video-js.css'
// import 'vue-video-player/src/custom-theme.css'

var _ = require('lodash')


const hls = require("videojs-contrib-hls")


//axio
import {post, fetch, patch, put, del, get} from '../src/common/request/http'

//vue router
import VueRouter from 'vue-router'

import App from "./App";
import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard)
Vue.use(VueRouter)
Vue.use(ElementUI);
Vue.use(VueVideoPlayer)
Vue.use(hls)


import routes from "./router";


//定义全局变量
Vue.prototype.$post = post;
Vue.prototype.$fetch = fetch;
Vue.prototype.$get = get;
Vue.prototype.$patch = patch;
Vue.prototype.$put = put;
Vue.prototype.$delete = del;

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数
const router = new VueRouter({
    // mode: 'history',
    routes // (缩写) 相当于 routes: routes
})
router.beforeEach((to, from, next) => {

    console.log(to.name + from.name, 'yyy')
    const isAuthenticated = true;
    if (to.name == 'learn') {
        next()
    } else {
        if (to.name !== 'login' && !isAuthenticated) {

            next({name: 'login'})

        } else {
            next()
        }
    }

})

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
//element中使用router.push 异常  问题原因尚不明确
Vue.config.productionTip = false
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}


new Vue({
    beforeCreate() {
        Vue.prototype.$bus = this
    },

    router,
    render: h => h(App),
}).$mount('#app')
