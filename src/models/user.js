// import { queryCurrentUser } from '@/services/common'
import { getUserToken } from '@/utils/token'

export default {
    namespace: 'user',

    state: {
        list: [],
        currentUser: {},
    },

    effects: {
        *fetchCurrent(_, { put }) {
            const response = JSON.parse(getUserToken())

            if (response) {
                yield put({
                    type: 'saveCurrentUser',
                    payload: response,
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
        // changeNotifyCount(state, action) {
        //     return {
        //         ...state,
        //         currentUser: {
        //             ...state.currentUser,
        //             notifyCount: action.payload.totalCount,
        //             unreadCount: action.payload.unreadCount,
        //         },
        //     }
        // },
    },
}
