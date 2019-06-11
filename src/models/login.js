import { routerRedux } from 'dva/router'
import { stringify } from 'qs'
import { getFakeCaptcha } from '@/services/api'
import { setAuthority } from '@/utils/authority'
import { loginLogin, loginLogOut } from '@/pages/User/services'
import { setSession } from '@/utils/session'
import { getPageQuery } from '@/utils/utils'
// import { reloadAuthorized } from '@/utils/Authorized'

export default {
    namespace: 'login',

    state: {
        status: undefined,
    },

    effects: {
        *login({ payload }, { call, put }) {
            const formData = new FormData()
            formData.append('rememberMe', payload.rememberMe)
            formData.append('username', payload.username)
            formData.append('password', payload.password)
            formData.append('validateCode', payload.validateCode)
            const res = yield call(loginLogin, formData)
            if (res && res.success) {
                yield put({
                    type: 'changeLoginStatus',
                    payload: {
                        status: 'ok',
                    },
                })
                // Login successfully
                setSession(res.data)
                // reloadAuthorized()
                const urlParams = new URL(window.location.href)
                const params = getPageQuery()
                let { redirect } = params
                if (redirect) {
                    const redirectUrlParams = new URL(redirect)
                    if (redirectUrlParams.origin === urlParams.origin) {
                        redirect = redirect.substr(urlParams.origin.length)
                        if (redirect.match(/^\/.*#/)) {
                            redirect = redirect.substr(redirect.indexOf('#') + 1)
                        }
                    } else {
                        window.location.href = redirect
                        return
                    }
                }
                yield put(routerRedux.replace(redirect || '/'))
            }
            // TODO: else 重新获取图形验证码

            // const response = yield call(fakeAccountLogin, payload)
            // yield put({
            //     type: 'changeLoginStatus',
            //     payload: response,
            // })
        },

        *getCaptcha({ payload }, { call }) {
            yield call(getFakeCaptcha, payload)
        },

        *logout(_, { put, call }) {
            const res = yield call(loginLogOut)
            if (res && res.success) {
                setSession('')
                yield put({
                    type: 'changeLoginStatus',
                    payload: {
                        status: false,
                    },
                })
                yield put(
                    routerRedux.push({
                        pathname: '/user/login',
                        search: stringify({
                            redirect: window.location.href,
                        }),
                    })
                )
            }
        },
    },

    reducers: {
        changeLoginStatus(state, { payload }) {
            setAuthority(payload.currentAuthority)
            return {
                ...state,
                status: payload.status,
                type: payload.type,
            }
        },
    },
}
