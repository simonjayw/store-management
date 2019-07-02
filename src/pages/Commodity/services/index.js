import createAPI from '@/utils/createAPI'

// export const loginLogOut = async params => {
//     return createAPI(`${baseUrl}/logout`, 'get', {
//         params: params || {},
//     })
// }

// eslint-disable-next-line import/prefer-default-export
export const getComodityList = async params =>
    createAPI('/goods', 'get', {
        params: {
            t: 'merchant.receive.records',
            ...params,
        },
    })
