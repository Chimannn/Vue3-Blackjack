export default [
    {
        name: 'profile1',
        path: '/person/profile1',
        component: () => import('@/views/my/profile/profile1.vue'),
        meta: {
            title: '个人信息',
            isNavBar: false
        }
    },
    {
        name: 'profile2',
        path: '/person/profile2',
        component: () => import('@/views/my/profile/profile2.vue'),
        meta: {
            title: '个人信息',
            isNavBar: false
        }
    },
]