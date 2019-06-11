import createAPI from '@/utils/createAPI'

// 获取该用户拥有的所有权限
export const getAllAuthorities = async (params = {}) =>
    createAPI('/api/v1/auth/getAllMenus', 'get', {
        params,
    })

// 获取当前用户信息
export const queryCurrentUser = async (params = {}) =>
    createAPI('/api/v1/profile/getUserInfo', 'get', {
        params,
    })
