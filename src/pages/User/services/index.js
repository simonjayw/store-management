import createAPI from '@/utils/createAPI'

export const login = async params => {
    return createAPI('/admin', 'get', {
        params: params || {},
    })
}

export const logout = async params => {
    return createAPI('/admin', 'get', {
        params: params || {},
    })
}
