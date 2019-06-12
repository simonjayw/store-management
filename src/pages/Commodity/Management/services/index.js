import createAPI from '@/utils/createAPI'
import { getTableMock } from '@/utils/mockData'

// export const loginLogOut = async params => {
//     return createAPI(`${baseUrl}/logout`, 'get', {
//         params: params || {},
//     })
// }

export const getComodityListMOCK = async () => {
    return getTableMock()
}

export const getComodityList = async params =>
    createAPI('/logout', 'get', {
        params: params || {},
    })
