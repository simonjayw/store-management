import createAPI from '@/utils/createAPI'

// export const loginLogOut = async params => {
//     return createAPI(`${baseUrl}/logout`, 'get', {
//         params: params || {},
//     })
// }

// 列表
export const getComodityList = async params =>
    createAPI('/goods', 'get', {
        params: {
            t: 'merchant.receive.records',
            ...params,
        },
    })

// 上下架状态切换
export const changeComodityStatus = async params =>
    createAPI('/goods', 'get', {
        params: {
            t: 'merchant.goods.publish',
            ...params,
        },
    })

// 信息修改
export const updateComodityMessage = async params =>
    createAPI('/goods', 'get', {
        params: {
            t: 'merchant.goods.update',
            ...params,
        },
    })
