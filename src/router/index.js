import Vue from 'vue';
import VueRouter from 'vue-router';
import Layout from '@/views/common/layout';
import Login from '@/views/login/view';
import RouterSpace from '@/components/router-space';
// import RouterSpaceFrame from '@/views/main/service-provider';

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
};

Vue.use(VueRouter);

// 基础路由
const routes = [
	{
		path: '/login',
		name: 'login',
		component: Login
	},
	// {
	//   path: '/about',
	//   name: 'About',
	//   // route level code-splitting
	//   // this generates a separate chunk (about.[hash].js) for this route
	//   // which is lazy-loaded when the route is visited.
	//   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
	// }
];

// admin 路由
export const adminRoutes = [
	{
		path: '/',
		name: 'default',
		component: Layout,
		redirect: 'auth',
		children:[
			{
				path: '',
				name: 'main-default',
				redirect: 'auth',
				component:()=>import("@/views/main"),
				children: [
					// 内部权限管理
					{
						path: 'auth',
						name:'user-auth',
						redirect: 'auth/role',
						component: RouterSpace,
						children:[
							{
								path: 'role',
								name:'user-auth/role',
								component:()=>import("@/views/main/user-auth/role"),
							},
							{
								path: 'section',
								name:'user-auth/section',
								component:()=>import("@/views/main/user-auth/section"),
							},
							{
								path: 'account',
								name:'user-auth/account',
								component:()=>import("@/views/main/user-auth/account"),
							},
						]
					},
				]
			},
		]
	},
	{
		path: '/*',
		redirect: 'auth',
	}

];

// 获取普通账号 路由
export const getNormalRoutes = deploy => {
	// const { } = deploy;
	console.log(deploy);
	return [
		{
			path: '/',
			name: 'default',
			component: Layout,
			redirect: 'overview',
			children:[
				{
					path: '',
					name: 'main-default',
					redirect: 'overview',
					component:()=>import("@/views/main"),
					children: [
						// 概览
						{
							path: 'overview',
							name:'overview/workbench',
							component:()=>import("@/views/main/overview/workbench")
						},
						// 服务商管理
						{
							path: 'provider',
							name:'service-provider',
							redirect: 'provider/review',
							component: RouterSpace,
							children:[
								{
									path: 'review',
									name:'service-provider/to-review',
									component:()=>import("../views/main/service-provider/to-review"),
								},
								{
									path: 'review/detail',
									name:'service-provider/to-review/detail',
									component:()=>import("@/views/main/service-provider/to-review/detail"),
								},
								{
									path: 'storage',
									name:'service-provider/be-storage',
									component:()=>import("../views/main/service-provider/be-storage"),
								},
								{
									path: 'storage/detail',
									name:'service-provider/be-storage/detail',
									component:()=>import("@/views/main/service-provider/be-storage/detail"),
								},
							]
						},
						// 招商管理
						{
							path: 'investment',
							name:'investment',
							redirect: 'investment/list',
							component:RouterSpace,
							children:[
								{
									path: 'list',
									name:'investment/item-list',
									component:()=>import("@/views/main/investment/index"),
									// component:()=>import("@/views/main/query-template")
								},
								{
									path: 'detail',
									name:'investment/item-detail',
									component:()=>import("@/views/main/investment/item-detail"),
								},
							]
						},
						// 服务跟踪
						// {
						// 	path: 'track',
						// 	name:'service-track',
						// 	redirect: 'track/list',
						// 	component:RouterSpace,
						// 	children:[
						// 		{
						// 			path: 'list',
						// 			name:'service-track/index',
						// 			component:()=>import("@/views/main/service-track/index"),
						// 		},
						// 	]
						// },
					]
				},
			]
		},
		{
			path: '/*',
			redirect: 'overview',
		}
	]
};

const createRouter = () => new VueRouter({
	// mode: 'history',
	routes,
});

// 初始化 vue-router
const router = createRouter();

// 重置router 匹配规则
export function resetRouter () {
// reset路由表
	const newRouter = createRouter();
	router.matcher = newRouter.matcher // the relevant part
}


export default router


