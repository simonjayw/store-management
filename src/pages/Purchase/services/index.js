import createAPI from '@/utils/createAPI'
import { getTableMock } from '@/utils/mockData'

// export const loginLogOut = async params => {
//     return createAPI(`${baseUrl}/logout`, 'get', {
//         params: params || {},
//     })
// }

/**
 * 进货商品
 */
// 进货商品列表
export const getCommodityListMOCK = async () => {
    return getTableMock()
}
export const getCommodityList = async params =>
    createAPI('/logout', 'get', {
        params: params || {},
    })

/**
 * 进货记录
 */

// 进货记录列表
export const getRecordListMOCK = async () => {
    return getTableMock()
}
export const getRecordList = async params =>
    createAPI('/logout', 'get', {
        params: params || {},
    })

/**
 * 结算记录
 */
// 结算记录列表
export const getSettleListMOCK = async () => {
    return getTableMock()
}
export const getSettleList = async params =>
    createAPI('/logout', 'get', {
        params: params || {},
    })
