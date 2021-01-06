<template>
	<div class="frame-wrapper">
		<Breadcrumb :source="navData" icon="environment">
			<template slot="suffix" >
				<a-button  size="small" icon="form" @click="addSection">添加部门</a-button>
			</template>
		</Breadcrumb>  
		<div class="frame-wrapper-content">
			<div class="frame-query">
				<a-form-model layout="inline" @submit="handleSubmit" @submit.native.prevent>
					<a-form-model-item>
						<a-input v-model="query.username" placeholder="请输入部门名称" class="custom-prefix-6">
							<template slot="prefix" >
								<a-button type="link" size="small" icon="form" >删除</a-button>
							</template>
						</a-input>
					</a-form-model-item>
					<a-form-model-item>
						<a-button type="primary" html-type="submit">查询</a-button>  
					</a-form-model-item>
					<a-form-model-item>
						<a-button type="dashed" html-type="submit">重置</a-button>  
					</a-form-model-item>
				</a-form-model>
			</div>
			<div class="frame-content">
				<a-tabs @change="handleTabChange">
					<a-tab-pane key="1" tab="正常部门"></a-tab-pane>
					<a-tab-pane key="2" tab="已删除部门"></a-tab-pane>
				</a-tabs>
				<div style="height: 4px"></div>
				<a-table :columns="key === '1' ? columns : column" :data-source="key === '1'? data: delData" size="middle" :pagination="pagination" @change="handleTableChange">
					<template slot="auction" slot-scope="text, item">
						<!-- {{item}} -->
						<a-button type="link" size="small" icon="file-text" :style="{paddingLeft: 0}"  @click="addSection('edit',item)">编辑</a-button>
						<a-divider type="vertical" />
						<a-button type="link" size="small" icon="form" >删除</a-button>
					</template>
				</a-table>
			</div>
		</div>
		<!-- 添加部门对话框 -->
		<a-modal
			:title="`${isTitle === 'add' ? '添加':'编辑'}部门`"
			:visible="addSectionVisible"
			:confirm-loading="confirmLoading"
			@ok="addHandleOk"
			@cancel="addHandleCancel"
			>
			<div>
				<a-form-model
					ref="ruleForm"
					:model="form"
					:rules="rules"
				>
					<a-form-model-item ref="name" label="部门名称" prop="name">
					<a-input v-model="form.name"  />
					</a-form-model-item>
				</a-form-model>
			</div>
			</a-modal>
	</div>

</template>

<script>
	import Breadcrumb from '@/components/bread-crumb';
	import { clearProto, disabledDate } from "@/plugin/tools";
	// import { colType } from '@/main/user-auth/source'
	const checkName = (rule, value, callback) => {
      const reg = /^[A-Za-z\u4e00-\u9fa5]*$/;
      if (!reg.test(value)) {
        callback("仅支持汉字和字母");
      }
      callback();
	};
	// 删除日期
	const column = [
	{
		title: '删除日期',
		dataIndex: 'gmtCreate',
		defaultSortOrder: 'descend',
		sorter: (a, b) => a.address - b.address,
	},
	{
		title: '部门名称',
		dataIndex: 'departmentName',
	}];
	// 正常部门信息
	const columns = [
	{
		title: '创建日期',
		dataIndex: 'gmtCreate',
		defaultSortOrder: 'descend',
		sorter: (a, b) => a.address - b.address,
	},
	{
		title: '部门名称',
		dataIndex: 'departmentName',
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
		gmtCreate: '2020-09-25',
		departmentName: '一部',
		address: '6',
	},
	{
		key: '2',
		gmtCreate: '2020-09-21',
		departmentName: '二部',
		address: '2',
	}
	];

	const delData = [
	{
		key: '1',
		gmtCreate: '2020-01-25',
		departmentName: '实验一部',
	},
	{
		key: '2',
		gmtCreate: '2020-05-21',
		departmentName: '实验二部',
	}
	];
	export default {
		name:'Section',
		data() {
			return {
				navData:[
					{id:1,title:'内部权限管理',path:'/auth/role'},
					{id:2,title:'部门管理',path:'/auth/section'},
				],
				columns, // 正常部门的表名
				column, // 删除部门的表名
				delData, // 删除的每一项数据
				data, // 正常的每一项数据
				query:{
					departmentName:"",
					isDeleted: false,
					num: 10, //每页的数据
					page: 1, //默认的第一页
					sortColumn: "" ,//排序字段
					sortOrder: "ASC" // 顺序排序
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
				// ModalText: 'Content of the modal',// 对话框文本
				confirmLoading: false, // loading 效果
				addSectionVisible: false, // 添加部门对话框
				form: {
					name: '',
				},
				// tabs的值
				key: '1',
				// 判断是添加和编辑
				isTitle: 'add',
				// 表单校验规则
				rules: {
					name: [
					{ required: true, message: '请输入部门名称', trigger: 'blur' },
					{ validator: checkName, trigger: 'blur' }
					],
				},
			}
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
				// console.log(val);
				this.key = val
				// if (val === '1') {
				// 	console.log('ok');
				// }
			},
			handleTableChange(ev){
				console.log(ev);
			},
			// 判断添加部门或者编辑
			addSection (sign,item) {
				this.addSectionVisible = true
				// console.log(sign,item);
				if (sign === 'edit') {
					// 放起请求获取数据
					const obj = {
					// departmentId: item.departmentName,
					// id: undefined,
					name: item.departmentName,
					};
					this.form = obj;
					// this.isTitle = sign;
				} else {
					console.log(1);
				}
				
			},
			// 确定添加部门
			addHandleOk () {
				this.$refs.ruleForm.validate(validate => {
				if(!validate) return 
				// this.ModalText = 'The modal will be closed after two seconds';
				this.confirmLoading = true;
				setTimeout(() => {
					this.addSectionVisible = false;
					this.confirmLoading = false;
				}, 2000);
				})
			},
			// 取消添加部门
			addHandleCancel(e) {
			console.log(e);
			console.log('Clicked cancel button');
			this.addSectionVisible = false
			this.$refs.ruleForm.resetFields()
			},
		}
	}
</script>

<style scoped lang="scss">

</style>

