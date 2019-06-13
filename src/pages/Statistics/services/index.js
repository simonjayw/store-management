import createAPI from '@/utils/createAPI'
import { getTableMock } from '@/utils/mockData'

// export const loginLogOut = async params => {
//     return createAPI(`${baseUrl}/logout`, 'get', {
//         params: params || {},
//     })
// }

/**
 * 商店统计
 */
// 列表
export const getCommodityListMOCK = async () => {
    return getTableMock()
}
export const getCommodityList = async params =>
    createAPI('/logout', 'get', {
        params: params || {},
    })

/**
 * 门店统计
 */
// 列表
export const getStoreListMOCK = async () => {
    return getTableMock()
}
export const getStoreList = async params =>
    createAPI('/logout', 'get', {
        params: params || {},
    })

/**
 * 会员统计
 */
// 列表
export const getMemberListMOCK = async () => {
    return getTableMock()
}
export const getMemberList = async params =>
    createAPI('/logout', 'get', {
        params: params || {},
    })
