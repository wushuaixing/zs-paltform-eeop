<template>
	<div class="frame-wrapper">
		<Breadcrumb :source="navData" icon="environment" />
		<div class="frame-wrapper-content">
			<div class="frame-query">
				<a-form-model layout="inline" @submit="handleSubmit" @submit.native.prevent>
					<a-form-model-item>
						<a-input v-model="query.name" placeholder="请输入联络人姓名" class="custom-prefix-6"
										 style="width: 320px">
							<div class="query-item-prefix" slot="prefix" >联络人姓名</div>
						</a-input>
					</a-form-model-item>
					<a-form-model-item>
						<a-input v-model="query.orgOfficeName" placeholder="请输入机构名称/挂靠律所名称" class="custom-prefix-11"
										 style="width: 400px">
							<div class="query-item-prefix" slot="prefix">机构名称/挂靠律所</div>
						</a-input>
					</a-form-model-item>
					<a-form-model-item label="服务商类型：">
						<a-select v-model="query.identity" placeholder="请选择身份类型" style="width: 150px" allowClear>
							<a-select-option :value="1">律师</a-select-option>
							<a-select-option :value="2">机构</a-select-option>
						</a-select>
					</a-form-model-item>
					<a-form-model-item label="擅长业务区域：">
						<a-cascader v-model="query.areaGoodCases" v-bind="areaProps" style="width: 230px" />
					</a-form-model-item>
					<a-form-model-item label="合作意向：">
						<a-select v-model="query.cooperationIntention" placeholder="请选择合作意向" style="width: 150px" allowClear >
							<a-select-option v-for="i in cooIntent" :key="i.id" :value="i.value">{{i.label}}</a-select-option>
						</a-select>
					</a-form-model-item>
					<a-form-model-item>
						<a-button type="primary" html-type="submit" style="width: 80px">查询</a-button>
					</a-form-model-item>
				</a-form-model>
				<a-tabs @change="handleTabChange" :activeKey="activeKey">
					<a-tab-pane v-for="i in tabPane" :key="i.id">
						<a-badge :dot="i.dot" class="dot-badge" slot="tab">{{i.title}}</a-badge>
					</a-tab-pane>
				</a-tabs>
			</div>
			<div class="frame-content">
				<a-table v-bind="props" @change="handleTableChange" :dataSource="dataSource" :columns="columns" :loading="loading">
					<span slot="customAuction" style="padding-left: 15px">操作</span>
					<ReadStatus slot="readStatus" slot-scope="item" :dot="item.isRead">
						{{item.name}}
						<!--<a-tag color="orange">重新提交</a-tag>-->
					</ReadStatus>
					<span slot="workingTime" slot-scope="item">{{item|single('expOption')}}</span>
					<span slot="coo" slot-scope="item">{{item|multi('cooIntent')}}</span>
					<span slot="address" slot-scope="item">{{areaAnalysis(item,false)|areas|fill}}</span>
					<template slot="auction" slot-scope="item">
						<template v-if="activeKey === 1">
							<a-button type="link" icon="file-text" @click="toLink(item)">详情</a-button>
							<a-button type="link" icon="audit" @click="toEffect(item)">印象添加</a-button>
						</template>
						<a-button type="link" :icon="normal.icon" @click="toLink(item,true)" v-else>{{normal.text}}</a-button>
					</template>
				</a-table>
			</div>
		</div>
		<EffectModal ref="effect" />
	</div>
</template>

<script>
	import Breadcrumb from '@/components/bread-crumb';
	import ReadStatus from '@/components/table/read-status';
	import { clearProto, disabledDate,clearObject,areaAnalysis } from "@/plugin/tools";
	import { beStorage } from "@/plugin/api/provider";
	import EffectModal from './effect';
	import { columns } from './deploy';
	import { areaOption, cooIntent } from '@/assets/js/source'

	//处理请求数据
	const handleProcess = data =>{
		const {areaGoodCases:a} = data;
		return {
			...data,
			areaGoodCases: (a || []).length ? a.join('/') : ''
		}
	};

	export default {
		name: 'ToReview',
		data() {
		  const { roleConfig } = this.$store.getters.getRole;
		  // console.log(roleConfig.managePermission);
			return {
				navData:[
					{id:1,title:'服务商管理',path:'/provider/review'},
					{id:2,title:'已入库',path:'/provider/storage'},
				],
				activeKey:1,
				tabPane:[
					{ id:1, title:'全部已入库', dot: false, },
					{ id:2, title:'资质修改申请', dot: false, },
					{ id:3, title:'要素修改申请', dot: false, },
				],
				props:{
					size:'middle',
					rowKey:'id',
					class:'frame-content-table',
					pagination:{
						current:1,
						total:1,
						showQuickJumper:true,
						showLessItems:true,
						size:'middle',
						showTotal:val=>`共${val}条信息`,
					},
					rowClassName: i=> (i || {}).unread ? 'frame-table-bold' : '',
				},
				dataSource:[],
				query:{
					name:undefined,
					orgOfficeName:undefined,
					identity:undefined,
					areasOfGoodCases:undefined,
					goodCases:undefined,
					cooperationIntention:undefined,
				},
				spinning:true,
				loading:false,
				sortOrder:"",
				sortField:"",
				disabledDate,
				areaAnalysis,
				auditStatus:roleConfig.managePermission === 1,
				areaProps:{
					allowClear: true,
					changeOnSelect: true,
					options: areaOption,
					placeholder: '请选择服务商擅长业务区域',
					fieldNames: {label: 'name', value: 'id', children: 'children'},
				},
				cooIntent
			};
		},
		components:{
			Breadcrumb,
			ReadStatus,
			EffectModal
		},
		created(){
			console.log(this.$store.getters.getRole);

			this.toQuery();
		},
		methods:{
			// 初始化条件
			toResetCondition(){
				this.query = {
					...this.query,
					name:undefined,
					orgOfficeName:undefined,
					identity:undefined,
					areaGoodCases:undefined,
					goodCases:undefined,
					cooperationIntention:undefined,
				};
				this.sortOrder = false;
				this.sortField = '';
				this.props.pagination.current = 1;
				this.props.pagination.total = 1;
			},
			status(rule){
				const activeKey = this.activeKey.toString();
				return rule.toString() ? new RegExp(activeKey).test(rule) : false;
			},
			handleSubmit(e){
				(e || window.event).preventDefault();
				this.toQuery(handleProcess(clearObject(this.query)));
				// this.toCheckUnread();
			},
			// tab切换点击
			handleTabChange(val){
				this.activeKey = val;
				// this.toResetCondition();
				this.toQuery();
				// this.toQueryUnread();
			},
			// 表格变化事件
			handleTableChange(row,obs,col){
				this.props.pagination.current = row.current;
				this.sortOrder = col.order;
				this.sortField = col.field;
				this.toQuery({ page:row.current });
			},
			// link 跳转
			toLink(item,audit){
				if(audit){
					this.$router.push({
						path:'/provider/storage/audit',
						query: clearObject({ id:item.id,type:this.activeKey })
					})
				}else{
					this.$router.push({
						path:'/provider/storage/detail',
						query: clearObject({ id:item.id })
					})
				}

			},
			toEffect(item){
				if(item.id) this.$refs.effect.toAdd(item.id);
			},
			// 查询数据
			toQuery(params = {}){
				this.loading = true;
				const queryField = handleProcess(clearProto(this.query));
				const sortOrder  = this.sortOrder ? ( this.sortOrder === 'ascend' ? 'ASC' : 'DESC' ) : '';
				beStorage.list(clearObject({
					type:Number(this.activeKey),
					page:1,
					size:10,
					sortOrder,
					...queryField,
					sortField:this.sortField,
					...params,
				})).then(res=>{
					if(res.code === 20000){
						const source = clearObject(res.data || {});
						this.dataSource = source.list;
						this.props.pagination.current = source.page;
						this.props.pagination.total = source.total;
					}
				}).finally(()=>{
					this.loading = false;
				});
			},
		},
		computed:{
			normal(){
				console.log(this.auditStatus);
				const res = !(this.activeKey === 1) && !this.auditStatus;
				return {
					icon: res ? 'file-text' : 'audit',
					text: res ? '查询详情' : '审核'
				};
			},
			columns(){
				return columns({
					type: this.activeKey,
					sortOrder:this.sortOrder,
					sortField:this.sortField
				})
			},
		},
	}
</script>

<style scoped>

</style>
