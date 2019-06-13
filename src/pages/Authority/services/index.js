import createAPI from '@/utils/createAPI'
import { getTableMock } from '@/utils/mockData'

// export const loginLogOut = async params => {
//     return createAPI(`${baseUrl}/logout`, 'get', {
//         params: params || {},
//     })
// }

export const getMemberListMOCK = async () => {
    return getTableMock()
}

export const getMemberList = async params =>
    createAPI('/logout', 'get', {
        params: params || {},
    })
