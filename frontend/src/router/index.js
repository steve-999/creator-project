import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Admin from '../views/Admin.vue'
import PageNotFound from '../views/PageNotFound.vue'
import PropertyDetails from '../views/PropertyDetails.vue'
import Contract from '../components/Contract.vue'
import AdminContracts from '../components/admin/AdminContracts.vue'
import AdminMedia from '../components/admin/AdminMedia.vue'
import AdminPropertyInfo from '../components/admin/AdminPropertyInfo.vue'
import AdminRoomDetails from '../components/admin/AdminRoomDetails.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/admin',
        name: 'Admin',
        component: Admin,
        children: [
            {
                path: 'contracts',
                name: 'AdminContracts',
                component: AdminContracts,
                props: true
            },
            {
                path: 'media',
                name: 'AdminMedia',
                component: AdminMedia,
                props: true
            },
            {
                path: 'property_info',
                name: 'AdminPropertyInfo',
                component: AdminPropertyInfo,
                props: true
            },
            {
                path: 'room_details',
                name: 'AdminRoomDetails',
                component: AdminRoomDetails,
                props: true
            },
        ]
    },
    {
        path: '/properties/:property_id',
        name: 'PropertyDetails',
        component: PropertyDetails,
        props: true,
        children: [
            {
                path: 'contract',
                name: 'Contract',
                component: Contract,
                props: true
            }
        ]
    },
    {
        path: '/:catchAll(.*)',
        name: 'PageNotFound',
        component: PageNotFound
    },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
