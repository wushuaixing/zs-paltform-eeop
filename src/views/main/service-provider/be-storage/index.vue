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
					<a-form-model-item>
						<a-input v-model="query.officeName" placeholder="请输入机构名称/挂靠律所名称" class="custom-prefix-11"
										 style="width: 400px">
							<div class="query-item-prefix" slot="prefix">机构名称/挂靠律所</div>
						</a-input>
					</a-form-model-item>
					<a-form-model-item label="服务商类型：">
						<a-select v-model="query.identity" placeholder="请选择服务商身份类型" style="width: 200px" allowClear>
							<a-select-option value="1">律师</a-select-option>
							<a-select-option value="2">机构</a-select-option>
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
				<a-table v-bind="props" @change="handleTableChange" :dataSource="dataSource" :columns="columns">
					<span slot="customAuction" style="padding-left: 15px">操作</span>
					<ReadStatus slot="readStatus" slot-scope="item" :dot="item.isRead">
						{{item.name}}
						<!--<a-tag color="orange">重新提交</a-tag>-->
					</ReadStatus>
					<span slot="address" slot-scope="item">{{areaAnalysis(item,false)|areas|fill}}</span>
					<template slot="auction" slot-scope="item">
						<template v-if="activeKey === '1'">
							<a-button type="link" icon="file-text" @click="toLink(item)">详情</a-button>
							<a-button type="link" icon="audit" @click="toLink(item)">印象添加</a-button>
						</template>
						<a-button type="link" :icon="normal.icon" @click="toLink(item)" v-else>{{normal.text}}</a-button>
					</template>
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
	import { beStorage } from "@/plugin/api/provider";
	import { columns } from './deploy';

	const auditStatus = false;

export default {
  name: 'ToReview',
  data() {
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
	      userName:"",
	      officeName:"",
        startTime:'',
        endTime:'',
	      identity:undefined,
      },
	    loading:false,
	    sortOrder:"",
	    sortField:"",
	    disabledDate,
	    areaAnalysis,
	    auditStatus
    };
  },
  components:{
    Breadcrumb,
	  ReadStatus
  },
	created(){
		this.toQuery();
	},
  methods:{
		status(rule){
			const activeKey = this.activeKey.toString();
		  return rule.toString() ? new RegExp(activeKey).test(rule) : false;
		},
    handleSubmit(e){
      e.preventDefault();
      console.log(clearProto(this.query));
    },
    handleTabChange(val){
      this.activeKey = val;
    },
    handleTableChange(ev){
      console.log(ev);
    },
	  toLink(item){
			console.log(item);
			this.$router.push({path:'/provider/storage/detail',query: {id:'111111111111'}})
		},
	  // 查询数据
	  toQuery(params = {}){
		  this.loading = true;
		  const queryField = clearProto(this.query);
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
			const res = !(this.activeKey === 1 && this.auditStatus);
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
