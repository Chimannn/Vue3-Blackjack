import { createRouter, createWebHistory } from 'vue-router'

// import navbarConfig from './navbar.config'
import pageConfig from './page.config'

// import MainLayout from '@/layout/main.vue'
import PageLayout from '@/layout/page.vue'

import IndexPage from "@/components/Game/IndexPage.vue"
import GamePage from "@/components/Game/GamePage.vue"

import Login from "@/views/Login.vue"

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
			{
				name: "index",
				path: "/",
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
			{
				name: "home",
				path: "/home",
				component: PageLayout,
				children: pageConfig
			}, 
			{
				name: 'login',
				path: '/login',
				component: Login,
			}]
})

export default router
