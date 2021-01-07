<template>
	<div class="frame-wrapper">
		<Breadcrumb :source="navData" icon="environment" />
		<div class="frame-wrapper-content">
			<div class="frame-query">
				<a-form-model layout="inline" @submit="handleSubmit" @submit.native.prevent>
					<a-form-model-item>
						<a-input v-model="query.userName" placeholder="请输入联络人姓名" class="custom-prefix-6"
										 style="width: 320px">
							<div class="query-item-prefix" slot="prefix" >联络人姓名</div>
						</a-input>
					</a-form-model-item>
					<a-form-model-item v-if="status(1245)">
						<a-input v-model="query.officeName" placeholder="请输入机构名称/挂靠律所名称" class="custom-prefix-11"
										 style="width: 400px">
							<div class="query-item-prefix" slot="prefix">机构名称/挂靠律所</div>
						</a-input>
					</a-form-model-item>
					<a-form-model-item label="服务商类型：" v-if="status(124)">
						<a-select v-model="query.identity" placeholder="请选择服务商身份类型" style="width: 200px" allowClear>
							<a-select-option :value="1">律师</a-select-option>
							<a-select-option :value="2">机构</a-select-option>
						</a-select>
					</a-form-model-item>
					<a-form-model-item label="提交日期：" v-if="status(12)">
						<a-form-model-item>
							<a-date-picker v-model="field.startTime" style="width: 100%" placeholder="搜索范围起始日期"
														 :disabled-date="val=>disabledDate(val,field.endTime,'start')"></a-date-picker>
						</a-form-model-item>
						<span :style="{ display: 'inline-block',marginLeft:'-8px',width:'20px'}">至</span>
						<a-form-model-item>
							<a-date-picker v-model="field.endTime" style="width: 100%" placeholder="搜索范围截止日期"
														 :disabled-date="val=>disabledDate(field.startTime,val)"></a-date-picker>
						</a-form-model-item>
					</a-form-model-item>
					<a-form-model-item label="注册日期：" style="margin-bottom:0;" v-if="status(3)">
						<a-form-model-item>
							<a-date-picker v-model="field.startTime" style="width: 100%" placeholder="搜索范围起始日期"
														 :disabled-date="val=>disabledDate(val,field.endTime,'start')"></a-date-picker>
						</a-form-model-item>
						<span :style="{ display: 'inline-block',marginLeft:'-8px',width:'20px'}">至</span>
						<a-form-model-item>
							<a-date-picker v-model="field.endTime" style="width: 100%" placeholder="搜索范围截止日期"
														 :disabled-date="val=>disabledDate(field.startTime,val)"></a-date-picker>
						</a-form-model-item>
					</a-form-model-item>
					<a-form-model-item>
							<a-button type="primary" html-type="submit" style="width: 80px">查询</a-button>
					</a-form-model-item>
				</a-form-model>
				<a-tabs @change="handleTabChange" :activeKey="activeKey" :animated="false">
					<a-tab-pane v-for="i in tabPane" :key="i.id">
						<a-badge :dot="Boolean(i.dot)" class="dot-badge" slot="tab">{{i.title}}</a-badge>
					</a-tab-pane>
				</a-tabs>
				<div v-if="status(1234)">
					<a-space >
						<a-button :type="query.isReadAll === 1 ? 'primary':''" @click='handleRead(1)'>全部</a-button>
						<a-button :type="query.isReadAll === 2 ? 'primary':''" @click='handleRead(2)'>只显示未读</a-button>
						<a-button>全部标为已读</a-button>
					</a-space>
					<div style="height: 10px"></div>
				</div>
			</div>
			<div class="frame-content">
				<a-table v-bind="props" @change="handleTableChange" :dataSource="dataSource" :columns="columns"
				:customRow="customRow" :loading="loading">
					<span slot="customAuction" style="padding-left: 15px">操作</span>
					<ReadStatus slot="readStatus" slot-scope="item" :dot="item.isRead===0">
						{{item.name}}
						<!--<a-tag color="orange">重新提交</a-tag>-->
					</ReadStatus>
					<template slot="auction" slot-scope="item">
						<a-button type="link" :icon="normal?'file-text':'audit'" @click="toLink(item)">
							{{normal?'查询详情':'审核'}}
						</a-button>
					</template>
					<span slot="address" slot-scope="item">{{areaAnalysis(item,false)|areas|fill}}</span>
					<span slot="workingTime" slot-scope="item">{{item|single('expOption')}}</span>
				</a-table>
			</div>
		</div>
	</div>
</template>

<script>
	import Breadcrumb from '@/components/bread-crumb';
	import ReadStatus from '@/components/table/read-status';
	import { clearProto, disabledDate,clearObject,areaAnalysis } from "@/plugin/tools";
	import { toReview } from "@/plugin/api/provider";
	import { columns } from './deploy';

	const auditStatus = false;

export default {
  name: 'ToReview',
  data() {
    return {
      navData:[
        {id:1,title:'服务商管理',path:'/provider/review'},
        {id:2,title:'待审查',path:'/provider/review'},
      ],
	    activeKey:1,
			tabPane:[
				{ id:1, title:'待审核' },
				{ id:2, title:'仅提交资质' },
				{ id:3, title:'仅注册' },
				{ id:4, title:'开户待确认' },
				{ id:5, title:'审核未通过' },
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
				rowClassName: i=> (i || {}).isRead === 0 && 'frame-table-bold',
			},
			loading:false,
	    dataSource:[],
      query:{
	      userName:"",
	      officeName:"",
        startTime:'',
        endTime:'',
	      identity:undefined,
	      isReadAll:1,
      },
			field:{
				startTime:'',
				endTime:'',
			},
	    sortOrder:"",
	    sortField:"",
	    disabledDate,
	    areaAnalysis,
	    auditStatus,
	    checkUnread:false,
    };
  },
  components:{
    Breadcrumb,
	  ReadStatus
  },
	created(){
		this.toQuery();
		this.toQueryUnread();
	},
  methods:{
		// table 行属性
	  customRow(item){
			return {
			  on:{
				  click:()=>{
						if(item.isRead === 0){
							let logId = '';
							if(this.activeKey === 1) logId = item.elementLogId;
							if(this.activeKey === 2) logId = item.qualifyLogId;
						  toReview.read({
							  "identity": item.identity,
							  logId,
							  "type": Number(this.activeKey),
							  "userId": item.id,
						  }).then(res=>{
								if(res.code === 20000){
									item.isRead = 1;
									this.toCheckUnread();
								}
							})
						}
				  },
			  },
			}
		},
		// 状态判断
		status(rule){
			const activeKey = this.activeKey.toString();
		  return rule.toString() ? new RegExp(activeKey).test(rule) : false;
		},
		// 初始化条件
		toResetCondition(){
			this.query = {
				...this.query,
				userName:"",
				officeName:"",
				startTime:'',
				endTime:'',
				identity:undefined,
			};
			this.field = {
				startTime:'',
				endTime:'',
			};
			this.sortOrder = false;
			this.sortField = '';
			this.props.pagination.current = 1;
			this.props.pagination.total = 1;
		},
		// form 点击查询
    handleSubmit(e){
      (e || window.event).preventDefault();
      this.toQuery(clearObject(this.query));
	    this.toCheckUnread();
    },
		// 全部/未读 切换
	  handleRead(val){
			this.query.isReadAll = val;
			this.handleSubmit();
		},
		// tab切换点击
    handleTabChange(val){
      this.activeKey = val;
			this.toResetCondition();
      this.toQuery();
	    this.toQueryUnread();
    },
		// 表格变化事件
    handleTableChange(row,obs,col){
			this.props.pagination.current = row.current;
	    this.sortOrder = col.order;
	    this.sortField = col.field;
			this.toQuery({ page:row.current });
    },
		// link 跳转
	  toLink(item){
			console.log(item);
			this.$router.push({
				path:'/provider/review/detail',
				query: clearObject({
					id:item.id,
					qid:item.qualifyLogId,
					eid:item.elementLogId,
				})
			})
		},
		// 查询数据
		toQuery(params = {}){
			this.loading = true;
			const queryField = clearProto(this.query);
			const sortOrder  = this.sortOrder ? (
				this.sortOrder === 'ascend' ? 'ASC' : 'DESC'
				) : '';
			toReview.list(clearObject({
				type:this.activeKey,
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
				}else{
					this.$message.error('查询失败');
				}
			}).finally(()=>{
				this.loading = false;
			});
		},
		// 查询未读数据
		toQueryUnread(){
			toReview.unreadInfo().then(res=>{
				if(res.code === 20000){
					const { elementUnRead,inConfirmUnRead,qualifyUnRead,registerUnRead} = res.data;
					this.tabPane = [
						{ id:1, title:'待审核', dot:elementUnRead,},
						{ id:2, title:'仅提交资质', dot:qualifyUnRead,},
						{ id:3, title:'仅注册', dot:false, },
						{ id:4, title:'开户待确认', dot:registerUnRead, },
						{ id:5, title:'审核未通过', dot:inConfirmUnRead, },
					]
				}
			})
		},
		// 查询未读数据【定时】
		toCheckUnread(){
			if(this.checkUnread)clearTimeout(this.checkUnread);
			this.checkUnread = setTimeout(()=>{
				this.toQueryUnread();
				if(this.checkUnread)clearTimeout(this.checkUnread);
			},3000)
		}
  },
	computed:{
		normal(){
			return !(this.activeKey === 1 && this.auditStatus);
		},
		columns(){
			return columns({
				type: this.activeKey,
				sortOrder:this.sortOrder,
				sortField:this.sortField
			})
		},
	},
	watch:{
		'field':{
			handler:function({startTime,endTime}){
				this.query.startTime = startTime ? startTime.format('YYYY-MM-DD') : '';
				this.query.endTime = endTime ? endTime.format('YYYY-MM-DD') : '';
			},
			deep:true
		}
	}
}
</script>

<style scoped>

</style>
