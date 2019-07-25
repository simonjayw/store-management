import createAPI from '@/utils/createAPI'

export const login = async params => {
    return createAPI('/admin', 'get', {
        params: {
            t: 'login',
            type: 2,
            ...params,
        },
    })
}

export const logout = async params => {
    return createAPI('/admin', 'get', {
        params: {
            t: 'logout',
            ...params,
        },
    })
}

export const resetPassword = async params => {
    return createAPI('/admin', 'get', {
        params: {
            t: 'member.setpwd',
            ...params,
        },
    })
}
