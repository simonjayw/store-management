import createAPI from '@/utils/createAPI'

// 订单列表
export const getOrderList = async params =>
    createAPI('/order', 'get', {
        params: {
            t: 'merchant.orders',
            ...params,
        },
    })

// 根据订单查询商品列表
export const getGoodsList = async params =>
    createAPI('/order', 'get', {
        params: {
            t: 'merchant.order.goods',
            ...params,
        },
    })
