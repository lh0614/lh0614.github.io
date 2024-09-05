/**
 * 统一处理响应返回内容
 * @param {object} req 请求实例
 */
export const onResponse = (req: any) => {
  return new Promise((resolve, reject) => {
    req
      .then((res: any) => {
        if (res.httpCode === 200) {
          resolve(res.data)
        } else {
          reject(res)
        }
      })
      .catch((err: any) => {
        reject(err)
      })
  })
}
