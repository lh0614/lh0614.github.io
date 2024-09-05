/**
 * 根据环境自动切换请求类型
 * 真实项目可以使用客户端代理请求
 * */
// import { request as clientReq } from './client-request'
import { request as localReq } from './local-request'

// const isDev = process.env.NODE_ENV === 'development'

// export const request = isDev ? localReq : clientReq
export const request = localReq
