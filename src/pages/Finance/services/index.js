import createAPI from '@/utils/createAPI'
import { getTableMock } from '@/utils/mockData'

// export const loginLogOut = async params => {
//     return createAPI(`${baseUrl}/logout`, 'get', {
//         params: params || {},
//     })
// }

/**
 * 发票申请记录
 */
// 列表
export const getInvoiceListMOCK = async () => {
    return getTableMock()
}
export const getInvoiceList = async params =>
    createAPI('/logout', 'get', {
        params: params || {},
    })

/**
 * 现金收款管理
 */
// 列表
export const getCashListMOCK = async () => {
    return getTableMock()
}
export const getCashList = async params =>
    createAPI('/logout', 'get', {
        params: params || {},
    })
