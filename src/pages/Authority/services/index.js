import createAPI from '@/utils/createAPI'

// 成员列表
export const getMemberList = async params =>
    createAPI('/admin', 'get', {
        params: {
            t: 'member.list',
            type: 2,
            ...params,
        },
    })

// 添加 / 更新
export const addUpadteMember = async params =>
    createAPI('/admin', 'get', {
        params: {
            t: 'member.save',
            type: 2,
            ...params,
        },
    })

// 改变状态
export const changeMemberStatus = async params =>
    createAPI('/admin', 'get', {
        params: {
            t: 'member.status',
            ...params,
        },
    })

// 获取成员的权限列表
export const getMemberRoles = async params =>
    createAPI('/admin', 'get', {
        params: {
            t: 'member.roles',
            ...params,
        },
    })

// 配置成员的权限
export const setMemberRoles = async params =>
    createAPI('/admin', 'get', {
        params: {
            t: 'member.auth',
            ...params,
        },
    })

// 角色列表
export const getRoleList = async params =>
    createAPI('/admin', 'get', {
        params: {
            t: 'role.list',
            type: 2,
            ...params,
        },
    })
