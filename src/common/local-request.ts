import axios, { AxiosResponse } from 'axios'
import { onResponse } from './http-util'

// 请求接口数据
interface ResponseData<T = any> {
  code: number // 状态码
  result: T // 数据
  msg: string // 消息
}

const service = axios.create({
  baseURL: '/proxy-api',
  // 表示跨域请求时是否需要使用凭证
  withCredentials: true,
  timeout: 5 * 1000, // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)，如果请求话费了超过 `timeout` 的时间，请求将被中断
  //允许在向服务器发送前，修改请求数据
  // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
  // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
  transformRequest: [
    (data: any) => {
      data = JSON.stringify(data)
      return data
    },
  ],
  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  transformResponse: [
    (data: any) => {
      if (typeof data === 'string' && data.startsWith('{')) {
        data = JSON.parse(data)
      }
      return data
    },
  ],
  headers: {
    'Content-Type': 'application/json',
  },
})

// 添加请求拦截器
service.interceptors.request.use(
  function (config: any) {
    // 在发送请求之前做些什么
    return config
  },
  function (error: any) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse<ResponseData<any>>) => {
    return { httpCode: response.status, data: response.data }
  },
  (error: any) => {
    // 对响应错误做点什么
    if (JSON.stringify(error).indexOf('timeout') !== -1) {
      error.status = 504
      return Promise.reject(error)
    }
    return Promise.reject(error)
  }
)

export const request = {
  get(type: string, url: string, { headers, params }: any) {
    return onResponse(
      service({
        url: `${type}/${url}`,
        method: 'get',
        headers,
        params,
      })
    )
  },
  post(type: string, url: string, { headers, params }: any) {
    return onResponse(
      service({
        url: `${type}/${url}`,
        method: 'post',
        headers,
        data: params,
      })
    )
  },
  postForm(type: string, url: string, { headers, params }: any) {
    return onResponse(
      service({
        url: `${type}/${url}`,
        method: 'post',
        headers,
        data: params,
      })
    )
  },
}
