var base_url = 'http://garbage.xxw360.com/api/';

import axios from 'axios';
import qs from 'qs';
// import { Message } from 'element-ui';

axios.defaults.timeout = 5000;
axios.defaults.baseURL ='';


//http request 拦截器
axios.interceptors.request.use(
  config => {
    // const token = getCookie('名称');注意使用的时候需要引入cookie方法，推荐js-cookie
    // console.log(config)
    if(config.method === 'get'){
      config.data = JSON.stringify(config.data);      
    } else{
      config.data = qs.stringify(config.data);      
    }
    if(config.url == base_url + 'upload'){
      config.headers = {
        'Content-Type':'multipart/form-data'
      };
    }else{
      config.headers = {
        'Content-Type':'application/x-www-form-urlencoded'
      };
    }
    return config; 
  },
  error => {
    return Promise.reject(err);
  }
);


//http response 拦截器
axios.interceptors.response.use(
  response => {
    if(response.data.errCode ==2){
      router.push({
        path:"/login",
        querry:{redirect:router.currentRoute.fullPath}//从哪个页面跳转
      })
    }
    return response;
  },
  error => {
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
//
export function post(url,data = {}){
  return new Promise((resolve,reject) => {
    console.log(data)
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
 * 封装DELETE请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function det(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.delete(url,data)
      .then(response => {
        resolve(response.data);
      },err => {
        reject(err)
      })
  })
}




