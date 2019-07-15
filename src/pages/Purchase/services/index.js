import createAPI from '@/utils/createAPI'

// export const loginLogOut = async params => {
//     return createAPI(`${baseUrl}/logout`, 'get', {
//         params: params || {},
//     })
// }

/**
 * 进货商品
 */
// 进货商品列表
export const getCommodityList = async params =>
    createAPI('/goods', 'get', {
        params: {
            t: 'merchant.skus',
            ...params,
        },
    })

// 进货操作
export const commodityGoods = async params =>
    createAPI('/goods', 'get', {
        params: {
            t: 'merchant.purchase',
            ...params,
        },
    })

/**
 * 进货记录
 */

// 进货记录列表
export const getRecordList = async params =>
    createAPI('/goods', 'get', {
        params: {
            t: 'merchant.purchase.records',
            ...params,
        },
    })

/**
 * 结算记录
 */
// 结算记录列表
export const getSettleList = async params =>
    createAPI('/goods', 'get', {
        params: {
            t: 'merchant.receive.records',
            ...params,
        },
    })
