import { routerRedux } from 'dva/router'
import { stringify } from 'qs'
import { getFakeCaptcha } from '@/services/api'
import { setAuthority } from '@/utils/authority'
import { login, logout } from '@/pages/User/services'
import { setUserToken } from '@/utils/token'
import { getPageQuery } from '@/utils/utils'
// import { reloadAuthorized } from '@/utils/Authorized'

import md5 from 'md5'
import { message } from 'antd'

export default {
    namespace: 'login',

    state: {
        status: undefined,
    },

    effects: {
        *login({ payload }, { call, put }) {
            const res = yield call(login, {
                t: 'login',
                mobile: payload.mobile,
                password: md5(payload.password),
            })
            if (res && res.errcode === 0) {
                const { data: userInfo } = res
                setUserToken(JSON.stringify(userInfo.user))
                yield message.success('登录成功!', 2)
                // yield put(routerRedux.replace('/'))

                // 重定向
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
        },

        *getCaptcha({ payload }, { call }) {
            yield call(getFakeCaptcha, payload)
        },

        *logout(_, { put, call }) {
            const res = yield call(logout, {
                t: 'logout',
            })
            if (res && res.errcode === 0) {
                setUserToken('')
                message.success('登出成功!', 2)
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
