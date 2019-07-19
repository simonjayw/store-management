import createAPI from '@/utils/createAPI'

/**
 * 商店统计
 */
// 列表
export const getCommodityList = async params =>
    createAPI('/statistics', 'get', {
        params: {
            t: 'mch.stat.goods',
            ...params,
        },
    })

/**
 * 门店统计
 */
// 列表
export const getStoreList = async params =>
    createAPI('/statistics', 'get', {
        params: {
            t: 'mch.stat.merchant',
            ...params,
        },
    })

/**
 * 会员统计
 */
// 列表
export const getMemberList = async params =>
    createAPI('/statistics', 'get', {
        params: {
            t: 'mch.stat.user',
            ...params,
        },
    })
