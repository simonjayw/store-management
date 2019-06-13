import createAPI from '@/utils/createAPI'
import { getTableMock } from '@/utils/mockData'

// export const loginLogOut = async params => {
//     return createAPI(`${baseUrl}/logout`, 'get', {
//         params: params || {},
//     })
// }

/**
 * 广告管理 - 轮播广告列表
 */
// 轮播广告列表
export const getCarouselListMOCK = async () => {
    return getTableMock()
}
export const getCarouselList = async params =>
    createAPI('/logout', 'get', {
        params: params || {},
    })

/**
 * 广告管理 - 走马
 */
// 走马了列表
export const getCursoryListMOCK = async () => {
    return getTableMock()
}
export const getCursoryList = async params =>
    createAPI('/logout', 'get', {
        params: params || {},
    })

/**
 * 广告管理 - 限时抢购（去门店）
 */
// 限时抢购（去门店）列表
export const getLimitListMOCK = async () => {
    return getTableMock()
}
export const getLimitList = async params =>
    createAPI('/logout', 'get', {
        params: params || {},
    })
