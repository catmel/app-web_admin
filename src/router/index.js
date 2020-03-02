import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const router = new VueRouter({
    routes: [{
            path: '/',
            name: 'login',
            component: () =>
                import ('../views/Login.vue') //默认页

        }, {
            path: '/index',
            name: 'Home',
            component: () =>
                import ('../views/Index.vue'), //二级路由
            children: [
                // 初始加载
                {
                    path: '/', //管理员列表
                    name: 'Home',
                    meta: ["首页"],
                    component: () =>
                        import ('../views/html/Home.vue')
                },
                //管理员
                {
                    path: '/admin_list', //管理员列表
                    name: 'admin_list',
                    meta: ["账号管理", "管理员列表"],
                    component: () =>
                        import ('../views/html/Admin_list')
                },
                {
                    path: '/admin_add', //新增管理员
                    name: 'admin_add',
                    meta: ["账号管理", "新增管理员"],
                    component: () =>
                        import ('../views/html/Admin_add')
                },
                {
                    path: '/admin_edit', //修改管理员
                    name: 'admin_edit',
                    meta: ["账号管理", "修改管理员"],
                    component: () =>
                        import ('../views/html/Admin_edit')
                }, //商品管理
                {
                    path: '/Goodslist', //商品列表
                    name: 'Goodslist',
                    meta: ["商品管理", "商品列表"],
                    component: () =>
                        import ('../views/html/Goodslist.vue')
                },
                {
                    path: '/Goodsadd', //商品新增
                    name: 'Goodsadd',
                    meta: ["商品管理", "商品新增"],
                    component: () =>
                        import ('../views/html/Goodsadd')
                }, //订单管理
                {
                    path: '/Order', //订单管理
                    name: 'Order',
                    meta: ["订单管理"],
                    component: () =>
                        import ('../views/html/Order')
                }, //销售统计
                {
                    path: '/Order_statistics', //订单统计
                    name: 'Order_statistics',
                    meta: ["销售统计", "订单统计"],
                    component: () =>
                        import ('../views/html/Order_statistics')
                }, {
                    path: '/Sales_statistics', //销售统计
                    name: 'Sales_statistics',
                    meta: ["销售统计","商品统计"],
                    component: () =>
                        import ('../views/html/Sales_statistics')
                }, //用户详情
                {
                    path: '/Editor',
                    name: 'Editor',
                    meta: ["我的信息"],
                    component: () =>
                        import ('../views/html/Editor')
                },//修改用户信息
                {
                    path: '/Admin_ed/:id',
                    name: 'Editor',
                    meta: ["我的信息"],
                    component: () =>
                        import ('../views/html/Admin_ed')
                },
            ]
        },

    ]
})

export default router