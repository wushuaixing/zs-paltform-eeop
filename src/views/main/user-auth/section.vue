<template>
	<div class="frame-wrapper">
		<Breadcrumb :source="navData" icon="environment"></Breadcrumb>  
		<div class="frame-wrapper-content">
			<div class="frame-query">
				<a-form-model layout="inline" @submit="handleSubmit" @submit.native.prevent>
					<a-form-model-item>
						<a-input v-model="query.username" placeholder="请输入部门名称" class="custom-prefix-6">
							<template slot="prefix" >
								<div class="query-item-prefix">部门名称</div>
							</template>
						</a-input>
						
					</a-form-model-item>
					<a-form-model-item>
						<a-button type="primary" html-type="submit">查询</a-button>  
					</a-form-model-item>
					<a-form-model-item>
						<a-button type="primary" html-type="submit">重置</a-button>  
					</a-form-model-item>
				</a-form-model>
			</div>
			<div class="frame-content">
				<a-tabs @change="handleTabChange">
					<a-tab-pane key="1" tab="正常部门"></a-tab-pane>
					<a-tab-pane key="2" tab="已删除部门"></a-tab-pane>
				</a-tabs>
				<div style="height: 4px"></div>
				<a-table :columns="columns" :data-source="data" size="middle" :pagination="pagination" @change="handleTableChange">
					<template slot="auction">
						<a-button type="link" size="small" icon="file-text" :style="{paddingLeft: 0}">编辑</a-button>
						<a-divider type="vertical" />
						<a-button type="link" size="small" icon="form" >删除</a-button>
					</template>
				</a-table>
			</div>
		</div>
	</div>
</template>

<script>
	import Breadcrumb from '@/components/bread-crumb';
	import { clearProto, disabledDate } from "@/plugin/tools";
	const columns1 = [
	{
		title: '创建日期',
		dataIndex: 'name',
		defaultSortOrder: 'descend',
		sorter: (a, b) => a.address - b.address,
	},
	{
		title: '部门名称',
		dataIndex: 'age',
	},
	{
		title: '部门账号数量',
		dataIndex: 'address',
		defaultSortOrder: 'descend',
		sorter: (a, b) => a.address - b.address,
	},
	{
		title: '操作',
		dataIndex: '3',
		key: 'address 44',
		scopedSlots: { customRender: 'auction' },
		width: 260,
		}
	];
	const data = [
	{
		key: '1',
		name: '2020-09-25',
		age: 'xxx部',
		address: '6',
	},
	{
		key: '2',
		name: '2020-09-21',
		age: 'xxx部',
		address: '2',
	}
	];
	export default {
		name:'Section',
		data() {
			return {
				navData:[
					{id:1,title:'内部权限管理',path:'/auth/role'},
					{id:2,title:'部门管理',path:'/provider/section'},
				],
				columns:columns1,
				query:{
					username:"",
					// startTime:'',
					// endTime:'',
					// orgType:undefined,
				},
				pagination:{
					current:1,
					total:10,
					showQuickJumper:true,
					showLessItems:true,
					size:'middle',
					showTotal:val=>`共${val}条信息`,
				},
				disabledDate,
				// table每一行的数据
				data
			};
		},
		components:{
			Breadcrumb,
		},
		created() {
		},
		computed:{},
		methods:{
			handleSubmit(e){
				e.preventDefault();
				console.log(clearProto(this.query));
			},
			handleTabChange(val){
				// console.log(val);
				if (val === '1') {
					console.log('ok');
				}
			},
			handleTableChange(ev){
				console.log(ev);
			},
		}
	}
</script>

<style scoped lang="scss">

</style>

