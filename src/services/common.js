import createAPI from '@/utils/createAPI'

/**
 * 动态页面
 */
// 数据接口
export const getDynamicConfig = async cid =>
    createAPI('/configuration', 'get', {
        params: {
            t: 'list',
            cid,
        },
    })

// 添加接口
export const addDynamicData = async params =>
    createAPI('/configuration', 'get', {
        params: {
            t: 'save',
            id: 0,
            ...params,
        },
    })

// 获取当前的菜单
export const queryCurrentMenu = async params =>
    createAPI('/admin', 'get', {
        params: {
            t: 'menus',
            ...params,
        },
    })
