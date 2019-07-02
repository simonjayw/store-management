import createAPI from '@/utils/createAPI'
import { getTableMock } from '@/utils/mockData'

// export const loginLogOut = async params => {
//     return createAPI(`${baseUrl}/logout`, 'get', {
//         params: params || {},
//     })
// }

/**
 * 入库管理 - 收货单列表
 */
// 收货单列表
export const getReceiveList = async params =>
    createAPI('/goods', 'get', {
        params: {
            t: 'merchant.receive.skus',
            ...params,
        },
    })
// 收货操作
export const confrimReceive = async params =>
    createAPI('/goods', 'get', {
        params: {
            t: 'merchant.receive',
            ...params,
        },
    })

/**
 * 入库管理 - 入库单列表
 */
// 入库单列表
export const getInList = async params =>
    createAPI('/goods', 'get', {
        params: {
            t: 'merchant.receive.records',
            ...params,
        },
    })

/**
 * 库存盘点 - 门店商品列表
 */
// 门店商品列表
export const getCheckListMOCK = async () => {
    return getTableMock()
}
export const getCheckList = async params =>
    createAPI('/logout', 'get', {
        params: params || {},
    })
