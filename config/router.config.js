export default [
    // user
    {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
            { path: '/user', redirect: '/user/login' },
            { path: '/user/login', name: '登陆', temp: true, component: './User/Login' },
            {
                path: '/user/resetPassword',
                name: '重制密码',
                temp: true,
                component: './User/ResetPassword',
            },
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
                routes: [
                    {
                        path: '/commodity/management',
                        name: '门店商品管理',
                        component: './Commodity/Management',
                    },
                ],
            },
            {
                path: '/order',
                name: '订单',
                icon: 'container',
                routes: [
                    {
                        path: '/order/list',
                        name: '订单列表',
                        component: './Order/List',
                    },
                ],
            },
            {
                path: '/purchase',
                name: '进货管理',
                icon: 'control',
                routes: [
                    {
                        path: '/purchase/commodity',
                        name: '进货商品',
                        component: './Purchase/Commodity',
                    },
                    {
                        path: '/purchase/record',
                        name: '进货记录',
                        component: './Purchase/Record',
                    },
                    {
                        path: '/purchase/settle',
                        name: '结算记录',
                        component: './Purchase/Settle',
                    },
                ],
            },
            {
                path: '/inventory',
                name: '门店库存管理',
                icon: 'shop',
                routes: [
                    {
                        path: '/inventory/in',
                        name: '入库管理',
                        routes: [
                            {
                                path: '/inventory/in/receive',
                                name: '收货单列表',
                                component: './Inventory/In/Receive',
                            },
                            {
                                path: '/inventory/in/record',
                                name: '入库单列表',
                                component: './Inventory/In/Record',
                            },
                        ],
                    },
                    {
                        path: '/inventory/check',
                        name: '库存盘点',
                        routes: [
                            {
                                path: '/inventory/check/record',
                                name: '门店商品列表',
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
                routes: [
                    {
                        path: '/operation/ad',
                        name: '广告管理',
                        routes: [
                            {
                                path: '/operation/ad/carousel',
                                name: '轮播广告列表',
                                component: './Operation/Ad/Carousel',
                            },
                            {
                                path: '/operation/ad/cursory',
                                name: '走马',
                                component: './Operation/Ad/Cursory',
                            },
                            {
                                path: '/operation/ad/limit',
                                name: '限时抢购',
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
                routes: [
                    {
                        path: '/finance/invoice',
                        name: '发票申请记录',
                        component: './Finance/Invoice',
                    },
                    {
                        path: '/finance/cash',
                        name: '现金收款管理',
                        component: './Finance/Cash',
                    },
                ],
            },
            {
                path: '/fixedcost',
                name: '固定成本',
                icon: 'dollar',
                routes: [
                    {
                        path: '/fixedcost/record',
                        name: '固定成本',
                        component: './Fixedcost/Record',
                    },
                ],
            },
            {
                path: '/statistics',
                name: '统计',
                icon: 'project',
                routes: [
                    {
                        path: '/statistics/commodity',
                        name: '商品统计',
                        component: './Statistics/Commodity',
                    },
                    {
                        path: '/statistics/store',
                        name: '门店统计',
                        component: './Statistics/Store',
                    },
                    {
                        path: '/statistics/member',
                        name: '会员统计',
                        component: './Statistics/Member',
                    },
                ],
            },
            {
                path: '/setting',
                name: '设置',
                icon: 'setting',
                routes: [
                    {
                        path: '/setting/store',
                        name: '门店设置',
                        component: './Setting/Store',
                    },
                ],
            },
            {
                path: '/authority',
                name: '权限',
                icon: 'lock',
                routes: [
                    {
                        path: '/authority/member',
                        name: '成员管理',
                        component: './Authority/Member',
                    },
                ],
            },
            {
                component: '404',
            },
        ],
    },
]
