import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Form from './views/nav1/Form.vue'
import user from './views/nav1/user.vue'
import Page4 from './views/nav2/button.vue'
import Page5 from './views/nav2/tabs.vue'
import Page6 from './views/nav3/Page6.vue'
import echarts from './views/charts/echarts.vue'
import Tree from './views/nav2/tree.vue'
import Dialog from './views/nav2/dialog.vue'
import Message from './views/nav2/message.vue'

import Device from './views/Device.vue'
import Employees from  './views/Employees.vue'
let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '',
        leaf: true,//只有一个节点
        iconCls: 'fa fa-home',//图标样式class
        children: [
            { path: '/main', component: Device, name: '终端设备管理' },

        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-table',
        leaf: true,//只有一个节点
        children: [
            { path: '/employees', component: Employees, name: '员工管理' },

        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-user',
        leaf: true,//只有一个节点
        children: [
            { path: '/page6', component: Page6, name: '账户管理' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-bar-chart',
        leaf: true,//只有一个节点
        children: [
            { path: '/echarts', component: echarts, name: '访问管理' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-bar-chart',
        leaf: true,//只有一个节点
        children: [
            { path: '/tabs', component: Page5, name: '预约访问' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-bar-chart',
        leaf: true,//只有一个节点
        children: [
            { path: '/tree', component: Tree, name: '我的访问' }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;