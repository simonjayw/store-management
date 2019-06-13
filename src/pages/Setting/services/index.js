import createAPI from '@/utils/createAPI'
import { getTableMock } from '@/utils/mockData'

// export const loginLogOut = async params => {
//     return createAPI(`${baseUrl}/logout`, 'get', {
//         params: params || {},
//     })
// }

export const getStoreListMOCK = async () => {
    return getTableMock()
}

export const getStoreList = async params =>
    createAPI('/logout', 'get', {
        params: params || {},
    })
