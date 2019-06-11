import createAPI from '@/utils/createAPI'

const baseUrl = '/api/v1/login'

// 登陆
export const loginLogin = async params => {
    return createAPI(`${baseUrl}/login`, 'post', {
        data: params || {},
    })
}

// 登出
export const loginLogOut = async params => {
    return createAPI(`${baseUrl}/logout`, 'get', {
        params: params || {},
    })
}

// 获取验证码
export const getCaptcha = async params => {
    return createAPI(`${baseUrl}/captchaImage?type=math`, 'get', {
        data: params || {},
    })
}

export const getCaptchaUrl = '192.168.1.1'
