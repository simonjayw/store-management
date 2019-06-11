import { queryCurrentUser } from '@/services/common'

export default {
    namespace: 'user',

    state: {
        list: [],
        currentUser: {},
    },

    effects: {
        *fetchCurrent(_, { call, put }) {
            const response = yield call(queryCurrentUser)
            if (response && response.success) {
                yield put({
                    type: 'saveCurrentUser',
                    payload: response.data,
                })
            }
        },
    },

    reducers: {
        saveCurrentUser(state, action) {
            return {
                ...state,
                currentUser: action.payload || {},
            }
        },
        changeNotifyCount(state, action) {
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    notifyCount: action.payload.totalCount,
                    unreadCount: action.payload.unreadCount,
                },
            }
        },
    },
}
