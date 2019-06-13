import createAPI from '@/utils/createAPI'
import { getTableMock } from '@/utils/mockData'

// export const loginLogOut = async params => {
//     return createAPI(`${baseUrl}/logout`, 'get', {
//         params: params || {},
//     })
// }

// 列表
export const getFiedcostListMOCK = async () => {
    return getTableMock()
}
export const getFiedcostList = async params =>
    createAPI('/logout', 'get', {
        params: params || {},
    })
