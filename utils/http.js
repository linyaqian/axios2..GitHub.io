import axios from 'axios';
import cookie from 'js-cookie';
import router from '@/router/index.js'

import codeDictionary from './statusCodeDictionary'  //状态码字典
import {MessageBox} from 'element-ui'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.interceptors.request.use(
    config => {
        // 每次发送请求之前判断cookie中是否存在token
        // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断

        if (!config.url.includes('/user/login')) {
            let token = cookie.get('token');
            if (token) {
                config.headers['authorization'] = token
            } else {
                router.push('/user/login')
            }
        } else {
            delete config.headers.authorization
        }
        return config
    },
    error => {
        console.log('请求头拦截报错');
        return Promise.reject(error);
    });


axios.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    // 服务器状态码不是200的情况
    error => {
        MessageBox({
            title:'登录失败',
            message: `${codeDictionary[error.response.status]}`,
            type: 'warning'
        });
    }
);
export default axios
