import { request } from '@/common'

// 估值分析
export function getIndividualInfo(
  stockCode: string,
  market: string,
  valuationYears?: number
): Promise<any> {
  return request.get('java', 'news/api/information/valuation', {
    params: {
      stockCode,
      market,
      valuationYears,
    },
  })
}
