export default [
    // user
    {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
            { path: '/user', redirect: '/user/login' },
            { path: '/user/login', name: '登陆', temp: true, component: './User/Login' },
            // { path: '/user/register', name: '注册', component: './User/Register' },
            // {
            //     path: '/user/register-result',
            //     name: '注册详情',
            //     component: './User/RegisterResult',
            // },
        ],
    },
    // app
    {
        path: '/',
        component: '../layouts/BasicLayout',
        routes: [
            // {
            //     path: '',
            //     redirect: '',
            //     name: '', // 对应到菜单显示名
            //     icon: '',
            //     component: '',
            //     hideInMenu: true, // 该路由是否在菜单隐藏
            //     routes: []
            // }
            { path: '/', redirect: '/commodity/management' },
            // {
            //     path: '/home',
            //     name: '主页',
            //     icon: 'home',
            //     hideInMenu: true,
            //     component: './Home',
            // },
            {
                path: '/commodity',
                name: '商品',
                icon: 'bank',
                temp: true,
                routes: [
                    {
                        path: '/commodity/management',
                        name: '门店商品管理',
                        temp: true,
                        component: './Commodity/Management',
                    },
                ],
            },
            {
                component: '404',
            },
        ],
    },
]
