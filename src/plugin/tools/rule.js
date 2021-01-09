import { adminRoutes, getNormalRoutes,resetRouter } from "@/router";
import store from '@/plugin/store';

export const adminField = 'admin';

// 处理权限路由
export const ruleProcess = (_this,data)=>{
	const { roleName, config } = data;
	_this.$store.commit('updateInfo', data);
	_this.$store.commit('ruleInfo', roleName,config);
	resetRouter();
	const normalRoutes = getNormalRoutes(config);
	_this.$router.addRoutes(roleName === adminField ? adminRoutes : normalRoutes);
};

// 获取侧边栏导航
export const getMenu = ()=>{
	const { roleName } = store.getters.getRole;
	return roleName === adminField ? [
		{
			id: '11',
			title: '内部权限管理',
			icon: 'key',
			path: '/auth',
			child: [
				{id: '1', title: '角色管理', path: '/role'},
				{id: '2', title: '部门管理', path: '/section'},
				{id: '3', title: '账号管理', path: '/account'},
			]
		}
	] : [
		{
			id: '1',
			title: '概览',
			icon: 'appstore',
			path: '/overview',
			child: [
				{id: '1', title: '工作台', path: ''}
			]
		},
		{
			id: '2',
			title: '服务商管理',
			icon: 'solution',
			path: '/provider',
			child: [
				{id: '1', title: '待审查', path: '/review'},
				{id: '2', title: '已入库', path: '/storage'},
			]
		},
		{
			id: '3',
			title: '招商管理',
			icon: 'schedule',
			path: '/investment',
			child: [
				{id: '1', title: '招商项目管理', path: '/list'},
			]
		},
		// {
		// 	id: '4',
		// 	title: '服务跟踪',
		// 	icon: 'pushpin',
		// 	path: '/track',
		// 	child: [
		// 		{id: '1', title: '服务项目管理', path: '/'},
		// 	]
		// },
	]

};
