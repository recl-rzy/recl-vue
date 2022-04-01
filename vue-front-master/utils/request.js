import axios from 'axios'
import cookie from 'js-cookie'
import { Message, MessageBox } from 'element-ui'

//创建axios实例
const service = axios.create({
    baseURL: 'http://localhost:8222',
    timeout: 20000     //请求超时时间
})

service.interceptors.request.use(
    config => {
        if(cookie.get('recl_token')) {
            config.headers['token'] = cookie.get('recl_token')
        }
        return config
    },
    err => {
        Promise.reject(err)
    }
)

service.interceptors.response.use(
    response => {
        if(response.data.code !== 20000) {
            Message({
                message: response.data.message,
                type: 'error',
                duration: 2 * 1000
            })

            return Promise.reject('error')
        } else {
            return response
        }
    },
    err => {
        console.log('err' + err) // for debug
        Message({
          message: err.message,
          type: 'error',
          duration: 2 * 1000
        })
        return Promise.reject(err)
    }
)

export default service