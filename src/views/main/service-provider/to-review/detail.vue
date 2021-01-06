<template>
	<div class="frame-wrapper">
		<Breadcrumb :source="navData" icon="environment"></Breadcrumb>
		<div class="frame-wrapper-content">
			<div class="frame-content">
				<div class="content-action">
					<a-button>全部</a-button>
					<a-button>只显示未读</a-button>
					<a-button>全部标为已读</a-button>
					<a-button icon="search">名单一键导出</a-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Breadcrumb from '@/components/bread-crumb';
	import { clearProto, disabledDate } from "@/plugin/tools";

	export default {
		name: 'ToReview',
		data() {
			return {
				navData:[
					{id:1,title:'服务商管理',path:'/provider/review'},
					{id:2,title:'待审查',path:'/provider/review'},
					{id:3,title:'服务商详情页',path:''},
				],
				tabPane:[
					{ id:'1', title:'已提交要素表' },
					{ id:'2', title:'已认证资质' },
					{ id:'3', title:'仅注册' },
					{ id:'4', title:'开户确认中' },
					{ id:'5', title:'审核未通过' },
				],
				dataSource:[{
					key:1,
					name:'临时用户',
				}],
				query:{
					username:"",
					startTime:'',
					endTime:'',
					orgType:undefined,
				},
				pagination:{
					current:1,
					total:1,
					showQuickJumper:true,
					showLessItems:true,
					size:'middle',
					showTotal:val=>`共${val}条信息`,
				},
				disabledDate,
			};
		},
		components:{
			Breadcrumb,
		},
		created() {
		},
		methods:{
			handleSubmit(e){
				e.preventDefault();
				console.log(clearProto(this.query));
			},
			handleTabChange(val){
				console.log(val);
			},
			handleTableChange(ev){
				console.log(ev);
			},
		},
		computed:{
		},
	}
</script>

<style scoped>

	.content-action{
		margin-bottom: 10px;
	}
	.content-action button{
		margin-right: 15px;
	}
</style>
