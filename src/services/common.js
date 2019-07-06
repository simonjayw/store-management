import createAPI from '@/utils/createAPI'

// 获取当前的菜单
export const queryCurrentMenu = async params =>
    createAPI('/admin', 'get', {
        params: {
            t: 'menus',
            ...params,
        },
    })

/**
 * 动态页面
 */
// 数据接口
export const getDynamicConfig = async params =>
    createAPI('/configuration', 'get', {
        params: {
            t: 'list',
            ...params,
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

// 删除接口
export const updateDynamicData = async params =>
    createAPI('/configuration', 'get', {
        params: {
            t: 'status',
            action: 'delete',
            ...params,
        },
    })
