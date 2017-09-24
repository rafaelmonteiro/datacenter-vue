import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/login'
import Dashboard from '@/components/dashboard'
import NotFound from '@/components/notfound'

import BrandList from '@/components/brand/list'
import BrandStore from '@/components/brand/store'

import RamList from '@/components/ram/list'
import RamStore from '@/components/ram/store'
import Ram from '@/components/server/ram/list'

import ServerList from '@/components/server/list'
import ServerStore from '@/components/server/store'

import Logout from '@/components/logout'
import Forbidden from '@/components/forbidden'
import Maintenance from '@/components/maintenance'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: '/',
    routes: [
        {
            path: '/login',
            name: 'Login',
            component: Login,
            meta: {requiresAuth: false}
        },
        {
            path: '/forbidden',
            name: 'Forbidden',
            component: Forbidden,
            meta: {requiresAuth: false}
        },
        {
            path: '/maintenance',
            name: 'Maintenance',
            component: Maintenance,
            meta: {requiresAuth: false}
        },
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: Dashboard,
            menu: {
                brand: true,
                label: 'Datacenter'
            }
        },
        {
            path: '/brands',
            name: 'BrandList',
            component: BrandList,
            menu: '/Brands/List'
        },
        {
            path: '/brands/new',
            name: 'BrandNew',
            component: BrandStore,
            menu: {
                label: '/Brands/New'
            }
        },
        {
            path: '/brands/edit/:id',
            name: 'BrandEdit',
            component: BrandStore,
            menu: {
                label: '/Brands/Edit',
                visible: false
            }
        },        
        {
            path: '/rams',
            name: 'RamList',
            component: RamList,
            menu: '/Rams/List'
        },
        {
            path: '/rams/new',
            name: 'RamNew',
            component: RamStore,
            menu: {
                label: '/Rams/New'
            }
        },
        {
            path: '/rams/edit/:id',
            name: 'RamEdit',
            component: RamStore,
            menu: {
                label: '/Rams/Edit',
                visible: false
            }
        },                
        {
            path: '/servers',
            name: 'ServerList',
            component: ServerList,
            menu: '/Servers/List'
        },
        {
            path: '/servers/new',
            name: 'ServerNew',
            component: ServerStore,
            menu: {
                label: '/Servers/New'
            }
        },
        {
            path: '/servers/edit/:id',
            name: 'ServerEdit',
            component: ServerStore,
            menu: {
                label: '/Servers/Edit',
                visible: false
            }
        },                
        {
            path: '/servers/:id/ram',
            name: 'Ram',
            component: Ram,
            menu: {
                label: '/Servers/Ram',
                visible: false
            }
        },
        {
            path: '*',
            name: 'NotFound',
            component: NotFound,
            meta: {requiresAuth: false}
        },
        {
            path: '/logout',
            name: 'Logout',
            menu: {
                label: 'Logout', 
                right: true 
            }
        }
    ]
})

router.beforeEach((to, from, next) => {
    localStorage.token = 'fake_token';
    Vue.http.headers.common['Authorization'] = localStorage.token;

if (to.path == '/' && localStorage.token) { next({ name: 'Dashboard' }); return; }

if (to.meta.requiresAuth === false) { next(); return; }

if (!localStorage.token) { next({ path: '/' }); return; }

if (to.name == 'Logout') { Logout.logout(router.app, next); return; }

next();
});

export default router
