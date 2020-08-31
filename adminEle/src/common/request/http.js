import axios from 'axios';
import Vue from 'vue'

axios.defaults.timeout = 5000;

axios.defaults.baseURL = 'http://106.14.16.185:8080';
// axios.defaults.baseURL = 'http://127.0.0.1:8080';
import { Message, Loading } from 'element-ui';
import _ from 'lodash';
let loadingInstance; //loading 实例
let needLoadingRequestCount = 0; //当前正在请求的数量

function showLoading() {
    if (needLoadingRequestCount === 0 && !loadingInstance) {
        loadingInstance = Loading.service({
            target: '.el-table', text: '正在加载...', background: 'rgba(0,0,0,0.3)'
        });
    }
    needLoadingRequestCount++;
}
function closeLoading() {
    Vue.nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
        needLoadingRequestCount--;
        needLoadingRequestCount = Math.max(needLoadingRequestCount, 0); // 保证大于等于0
        if (needLoadingRequestCount === 0) {
            if (loadingInstance) {
                hideLoading()
            }
        }
    });
}
//防抖：将 300ms 间隔内的关闭 loading 便合并为一次。防止连续请求时， loading闪烁的问题。
//因为有时会碰到在一次请求完毕后又立刻又发起一个新的请求的情况（比如删除一个表格一行后立刻进行刷新）
//这种情况会造成连续 loading 两次，并且中间有一次极短的闪烁。通过防抖可以让 300ms 间隔内的 loading 便合并为一次，避免闪烁的情况。
var hideLoading = _.debounce(() => {
    loadingInstance.close();
    loadingInstance = null;
}, 300);



//http request 拦截器
axios.interceptors.request.use(
    config => {
        showLoading()
        // const token = getCookie('名称');注意使用的时候需要引入cookie方法，推荐js-cookie
        config.data = JSON.stringify(config.data);
        config.headers = {
            //修改post参数格式
            'Content-Type':'application/json'
        }
        // if(token){
        //   config.params = {'token':token}
        // }
        return config;
    },
    error => {
        closeLoading()
        return Promise.reject(err);
    }
);


//http response 拦截器
axios.interceptors.response.use(
    response => {
        closeLoading()
        console.log('xxxx',JSON.stringify(response.data))
        if(response.data.code!='1000'){
            Message.error({message:response.data.message})
        }

        if(response.data.errCode ==2){
            router.push({
                path:"/login",
                querry:{redirect:router.currentRoute.fullPath}//从哪个页面跳转
            })
        }
        return response;
    },
    error => {
        closeLoading()
        return Promise.reject(error)
    }
)


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch(url,params={}){
    return new Promise((resolve,reject) => {
        axios.get(url,{
            params:params
        })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err)
            })
    })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url,data = {}){
    return new Promise((resolve,reject) => {
        axios.post(url,data)
            .then(response => {
                resolve(response.data);
            },err => {
                reject(err)
            })
    })
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url,data = {}){
    return new Promise((resolve,reject) => {
        axios.patch(url,data)
            .then(response => {
                resolve(response.data);
            },err => {
                reject(err)
            })
    })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url,data = {}){
    return new Promise((resolve,reject) => {
        axios.put(url,data)
            .then(response => {
                resolve(response.data);
            },err => {
                reject(err)
            })
    })
}

/**
 * 封装delete请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function del(url,data = {}){
    return new Promise((resolve,reject) => {
        axios.delete(url,data)
            .then(response => {
                resolve(response.data);
            },err => {
                reject(err)
            })
    })
}
