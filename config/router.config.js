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
                icon: 'star',
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
                path: '/order',
                name: '订单',
                icon: 'container',
                temp: true,
                routes: [
                    {
                        path: '/order/list',
                        name: '订单列表',
                        temp: true,
                        component: './Order/List',
                    },
                ],
            },
            {
                path: '/purchase',
                name: '进货管理',
                icon: 'control',
                temp: true,
                routes: [
                    {
                        path: '/purchase/commodity',
                        name: '进货商品',
                        temp: true,
                        component: './Purchase/Commodity',
                    },
                    {
                        path: '/purchase/record',
                        name: '进货记录',
                        temp: true,
                        component: './Purchase/Record',
                    },
                    {
                        path: '/purchase/settle',
                        name: '结算记录',
                        temp: true,
                        component: './Purchase/Settle',
                    },
                ],
            },
            {
                path: '/inventory',
                name: '门店库存管理',
                icon: 'shop',
                temp: true,
                routes: [
                    {
                        path: '/inventory/in',
                        name: '入库管理',
                        temp: true,
                        routes: [
                            {
                                path: '/inventory/in/receive',
                                name: '收货单列表',
                                temp: true,
                                component: './Inventory/In/Receive',
                            },
                            {
                                path: '/inventory/in/record',
                                name: '入库单列表',
                                temp: true,
                                component: './Inventory/In/Record',
                            },
                        ],
                    },
                    {
                        path: '/inventory/check',
                        name: '库存盘点',
                        temp: true,
                        routes: [
                            {
                                path: '/inventory/check/record',
                                name: '门店商品列表',
                                temp: true,
                                component: './Inventory/Check/Record',
                            },
                        ],
                    },
                ],
            },
            {
                path: '/operation',
                name: '运营',
                icon: 'interaction',
                temp: true,
                routes: [
                    {
                        path: '/operation/ad',
                        name: '广告管理',
                        temp: true,
                        routes: [
                            {
                                path: '/operation/ad/carousel',
                                name: '轮播广告列表',
                                temp: true,
                                component: './Operation/Ad/Carousel',
                            },
                            {
                                path: '/operation/ad/cursory',
                                name: '走马',
                                temp: true,
                                component: './Operation/Ad/Cursory',
                            },
                            {
                                path: '/operation/ad/limit',
                                name: '限时抢购(去门店)',
                                temp: true,
                                component: './Operation/Ad/Limit',
                            },
                        ],
                    },
                ],
            },
            {
                path: '/finance',
                name: '财务',
                icon: 'transaction',
                temp: true,
                routes: [
                    {
                        path: '/finance/invoice',
                        name: '发票申请记录',
                        temp: true,
                        component: './WaitBuild',
                    },
                    {
                        path: '/finance/cash',
                        name: '现金收款管理',
                        temp: true,
                        component: './WaitBuild',
                    },
                ],
            },
            {
                path: '/fixedcost',
                name: '固定成本',
                icon: 'dollar',
                temp: true,
                component: './WaitBuild',
            },
            {
                path: '/statistics',
                name: '统计',
                icon: 'project',
                temp: true,
                routes: [
                    {
                        path: '/statistics/commodity',
                        name: '商品统计',
                        temp: true,
                        component: './WaitBuild',
                    },
                    {
                        path: '/statistics/store',
                        name: '门店统计',
                        temp: true,
                        component: './WaitBuild',
                    },
                    {
                        path: '/statistics/member',
                        name: '会员统计',
                        temp: true,
                        component: './WaitBuild',
                    },
                ],
            },
            {
                path: '/setting',
                name: '设置',
                icon: 'setting',
                temp: true,
                routes: [
                    {
                        path: '/setting/store',
                        name: '门店设置',
                        temp: true,
                    },
                ],
            },
            {
                path: '/authority',
                name: '权限',
                icon: 'lock',
                temp: true,
                routes: [
                    {
                        path: '/authority/member',
                        name: '成员管理',
                        temp: true,
                        component: './WaitBuild',
                    },
                ],
            },
            {
                component: '404',
            },
        ],
    },
]
