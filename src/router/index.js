import { createRouter, createWebHistory } from 'vue-router'

// import navbarConfig from './navbar.config'
// import pageConfig from './page.config'

// import MainLayout from '@/layout/main.vue'
import PageLayout from '@/layout/page.vue'

import IndexPage from "@/components/Game/IndexPage.vue"
import GamePage from "@/components/Game/GamePage.vue"

import Login from "@/views/Login.vue"
import ErrorPage from "@/views/404.vue"

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
			{
				name: "/",
				path: "",
				redirect: "/home"
			},
			{
				name: "home",
				path: "/home",
				component: IndexPage
			},
			{
				name: "gamePage",
				path: "/game",
				component: GamePage
			},
			// {
			// path: '',
			// component: MainLayout,
			// redirect: navbarConfig[0] || '/404',
			// children: navbarConfig
		// }, 
			// {
			// 	name: "home",
			// 	path: "/home",
			// 	component: PageLayout,
			// 	children: pageConfig
			// },
			{
				name: "person",
				path: "/person",
				component: PageLayout,
				redirect: "/person/profile1",
				children: [
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
					{
						name: "purse",
						path: "/person/purse",
						component: () => import('@/views/my/Purse/index.vue'),
						meta: {
							title: '个人钱包',
							isNavBar: false
						}
					}
				]
			}, 
			{
				name: 'login',
				path: '/login',
				component: Login,
			},
			{
				name: "404",
				path: "/404",
				component: ErrorPage
			},
			{
				name: "*",
				path: "/:pathMatch(.*)*",
				redirect: "/404"
			}
		]
})

export default router
