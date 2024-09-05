// import * as bridge from '@space/bridge'
// import { onResponse } from './http-util'

// class Request {
//   option = {
//     timeout: 3000,
//     header: {},
//     query: {},
//     body: {},
//   }

//   private requestInstance: any

//   constructor() {
//     this.requestInstance = new bridge.Request(this.option)
//     return this
//   }

//   async get(type: string, url: string, { headers, params }: any) {
//     const res = await bridge.getHost(type)
//     let host

//     if (res.errorCode === 0 && res.response) {
//       host = decodeURIComponent(res.response.host)
//     }

//     return onResponse(
//       this.requestInstance.send(
//         Object.assign({}, this.option, {
//           url: `${host}${url}`,
//           method: 'GET',
//           type,
//           header: headers,
//           query: params,
//         })
//       )
//     )
//   }

//   async post(type: string, url: string, { headers, params }: any) {
//     const res = await bridge.getHost(type)
//     let host

//     if (res.errorCode === 0 && res.response) {
//       host = decodeURIComponent(res.response.host)
//     }

//     return onResponse(
//       this.requestInstance.send(
//         Object.assign({}, this.option, {
//           url: `${host}${url}`,
//           method: 'POST',
//           type,
//           header: headers,
//           body: params,
//         })
//       )
//     )
//   }

//   async postForm(type: string, url: string, { headers, params }: any) {
//     const res = await bridge.getHost(type)
//     let host

//     if (res.errorCode === 0 && res.response) {
//       host = decodeURIComponent(res.response.host)
//     }

//     return onResponse(
//       this.requestInstance.send(
//         Object.assign({}, this.option, {
//           url: `${host}${url}`,
//           method: 'POST',
//           type,
//           header: headers,
//           body: params,
//           transfer: 'form',
//         })
//       )
//     )
//   }
// }

// export const request = new Request()
