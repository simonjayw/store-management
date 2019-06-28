export function getUserToken() {
    return localStorage.getItem('user_info')
}

export function setUserToken(sessionId) {
    localStorage.setItem('user_info', sessionId)
}
