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
						<a-button type="link" size="small" icon="file-text" :style="{paddingLeft: 0}"  @click="showModal">编辑</a-button>
						<a-divider type="vertical" />
						<a-button type="link" size="small" icon="form" >删除</a-button>
					</template>
				</a-table>
			</div>
		</div>
		<!-- 编辑部门对话框 -->
		<a-modal
			title="Title"
			:visible="editSectionVisible"
			:confirm-loading="confirmLoading"
			@ok="editHandleOk"
			@cancel="editHandleCancel"
			>
			<from>12345</from>
		</a-modal>
		<!-- 添加部门对话框 -->
		<a-modal
			title="添加部门"
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
					:label-col="labelCol"
					:wrapper-col="wrapperCol"
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
		age: '1部',
		address: '6',
	},
	{
		key: '2',
		name: '2020-09-21',
		age: '2部',
		address: '2',
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
				columns:columns1,
				query:{
					username:"",
					// tabStatus: 1,
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
				data,
				// ModalText: 'Content of the modal',// 对话框文本
				editSectionVisible: false,// 对话框显示与隐藏
				confirmLoading: false, // loading 效果
				addSectionVisible: false, // 添加部门对话框
				// 添加用户名
				form: {
					name: '',
				},
				rules: {
					name: [
					{ required: true, message: '请输入部门名称', trigger: 'blur' },
					{ validator: checkName, trigger: 'blur' }
					],
				}
			}
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
			// 添加部门
			addSection () {
			this.addSectionVisible = true
			},
			// 确定添加部门
			addHandleOk () {
				this.ModalText = 'The modal will be closed after two seconds';
				this.confirmLoading = true;
				setTimeout(() => {
					this.addSectionVisible = false;
					this.confirmLoading = false;
				}, 2000);
			},
			// 取消添加部门
			addHandleCancel(e) {
			console.log(e);
			console.log('Clicked cancel button');
			this.addSectionVisible = false;
			this.$refs.ruleForm.resetFields()
			},
			// 显示编辑对话框
			showModal() {
			this.editSectionVisible = true;
			},
			// 点击确定编辑修改
			editHandleOk(e) {
				console.log(e);
				this.ModalText = 'The modal will be closed after two seconds';
				this.confirmLoading = true;
				setTimeout(() => {
					this.editSectionVisible = false;
					this.confirmLoading = false;
				}, 2000);
			},
			// 点击取消编辑
			editHandleCancel(e) {
			console.log(e);
			console.log('Clicked cancel button');
			this.editSectionVisible = false;
			},
		}
	}
</script>

<style scoped lang="scss">

</style>

