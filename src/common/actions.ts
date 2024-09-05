// /**
//  * 项目内客户端action功能封装
//  */
// import * as bridge from '@space/bridge'

// export function openStockDetail(
//   stockName: string,
//   stockCode: string | number,
//   stockMarket: string
// ) {
//   bridge.getHost('web').then((res: any) => {
//     if (res.errorCode === 0 && res.response) {
//       bridge.postMessageHybrid('stock_openDetail', {
//         stockName,
//         stockCode,
//         stockMarket,
//       })
//     }
//   })
// }
