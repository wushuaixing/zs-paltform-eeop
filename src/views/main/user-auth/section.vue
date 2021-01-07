<template>
	<div class="frame-wrapper">
		<Breadcrumb :source="navData" icon="environment">
			<template slot="suffix" >
				<a-button  size="small" icon="form" @click="addSection('add')">添加部门</a-button>
			</template>
		</Breadcrumb>
		<div class="frame-wrapper-content">
			<div class="frame-query">
				<a-form-model layout="inline" @submit="handleSubmit" @submit.native.prevent>
					<a-form-model-item label="部门名称">
						<a-input v-model="query.departmentName" placeholder="请输入部门名称" class="custom-prefix-6">
						</a-input>
					</a-form-model-item>
					<a-form-model-item>
						<a-button type="primary" html-type="submit" @click="queryData">查询</a-button>
					</a-form-model-item>
					<a-form-model-item>
						<a-button type="dashed" html-type="submit" @click="resetSession">重置</a-button>  
					</a-form-model-item>
				</a-form-model>
			</div>
			<div class="frame-content">
				<a-tabs @change="handleTabChange">
					<a-tab-pane key="1" tab="正常部门"></a-tab-pane>
					<a-tab-pane key="2" tab="已删除部门"></a-tab-pane>
				</a-tabs>
				<div style="height: 4px"></div>
				<a-table 
					:columns="key === '1' ? columns : columnsDel" 
					:data-source="key === '1'? data: delData" size="middle"
					:pagination="pagination" 
					@change="handleTableChange"
					:row-key="record => record.id">
					<template slot="auction" slot-scope="text, item">
						<!-- {{item}} -->
						<a-button type="link" size="small" icon="file-text" :style="{paddingLeft: 0}"  @click="addSection('edit',item)">编辑</a-button>
						<a-divider type="vertical" />
						<a-button type="link" size="small" icon="form" @click="deleteSection(item.id)">删除</a-button>
					</template>
				</a-table>
			</div>
		</div>
		<!-- 添加部门对话框 -->
		<a-modal
			:title="`${isTitle === 'add' ? '添加':'编辑'}部门`"
			:visible="addSectionVisible"
			:confirm-loading="confirmLoading"
			:departmentName='true'
			:forceRender='false'
			@ok="addHandleOk"
			@cancel="addHandleCancel"
			>
			<div>
				<a-form-model
					ref="ruleForm"
					:model="form"
					:rules="rules"
				>
					<a-form-model-item ref="name" label="部门名称" prop="departmentName">
					<a-input v-model="form.departmentName"  />
					</a-form-model-item>
				</a-form-model>
			</div>
			</a-modal>
	</div>

</template>

<script>
	import Breadcrumb from '@/components/bread-crumb';
	import { clearProto, disabledDate } from "@/plugin/tools";
	import userAuth from '../../../plugin/api/section'
	// import { colType } from '@/main/user-auth/source'
	const checkName = (rule, value, callback) => {
      const reg = /^[A-Za-z\u4e00-\u9fa5]*$/;
      if (!reg.test(value)) {
        callback("仅支持汉字和字母");
      }
      callback();
	};
	// 删除日期
	const columnsDel = [
	{
		title: '删除日期',
		dataIndex: 'gmtCreate',
		key: 'gmtCreate',
		defaultSortOrder: 'descend',
		sorter: (a, b) => a.address - b.address,
	},
	{
		title: '部门名称',
		key: 'departmentName',
		dataIndex: 'departmentName',
	}];
	// 正常部门信息
	const columns = [
	{
		title: '创建日期',
		dataIndex: 'gmtCreate',
		key: 'gmtCreate',
		defaultSortOrder: 'descend',
		sorter: (a, b) => a.address - b.address,
	},
	{
		title: '部门名称',
		dataIndex: 'departmentName',
		key: 'departmentName',
	},
	{
		title: '部门账号数量',
		dataIndex: 'userCount',
		key: 'userCount',
		defaultSortOrder: 'descend',
		sorter: (a, b) => a.address - b.address,
	},
	{
		title: '操作',
		dataIndex: 'auction',
		key: 'auction',
		scopedSlots: { customRender: 'auction' },
		width: 260,
		}
	];
	const delData = [
	{
		id: '3',
		gmtCreate: '2020-01-25',//待修改
		departmentName: '实验一部',
	},
	{
		id: '4',
		gmtCreate: '2020-05-21',//待修改
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
				columnsDel, // 删除部门的表名
				delData, // 删除的每一项数据
				data:[], // 正常的每一项数据
				// 请求的参数
				query: {
					departmentName: ''
				},
				// 正常的数据
				queryParams:{
					// departmentName:"",
					isDeleted: '0',
					num: '', //每页的数据
					page: 1, //默认的第一页
					sortColumn: "" ,//排序字段
					sortOrder: "" // 顺序排序
				},
				// 删除的请求参数 
				queryDelete: {
					isDeleted: '1',
					num: '', //每页的数据
					page: 1, //默认的第一页
					sortColumn: "" ,//排序字段
					sortOrder: "" // 
				},
				// 数据总条数
				total: '',
				pagination:{
					// current:'',
					// total:'',
					// showQuickJumper:true,
					// showLessItems:true,
					// size:'middle',
					// showTotal:val=>`共${val}条信息`,
				},
				disabledDate,
				// ModalText: 'Content of the modal',// 对话框文本
				confirmLoading: false, // loading 效果
				addSectionVisible: false, // 添加部门对话框
				// 添加编辑之后保存的数据
				form: {
					departmentName: '',
				},
				// tabs的值
				key: '1',
				// 判断是添加和编辑
				isTitle: 'add',
				// 表单校验规则
				rules: {
					departmentName: [
					{ required: true, message: '请输入部门名称', trigger: 'blur' },
					{ validator: checkName, trigger: 'blur' }
					],
				},
				// 当前部门的信息
				currentSection:{}
			}
		},
		components:{
			Breadcrumb,
		},
		created() {
			this.getSectionList()
		},
		methods:{
			handleSubmit(e){
				e.preventDefault();
				console.log(clearProto(this.query));
			},
			handleTabChange(val){
				// console.log(val);
				// this.query.isDeleted = val
				this.key = val
				if(this.key === '2') {
					this.getDeleteSectionList()
				}else {
					this.getSectionList()
				}
			},
			// 获取删除的列表数据
			getDeleteSectionList() {
				userAuth.getSection(this.queryDelete).then((res)=>{
					console.log(res);
					if (res.code !== 20000) return 
					// console.log(res.data);
					// this.total = res.data.total
					// this.data = res.data.list
				})
			},
			handleTableChange(ev){
				console.log(ev);
				this.getSectionList()
			},
			// 判断添加部门或者编辑
			addSection (sign,item) {
				this.addSectionVisible = true
				this.isTitle = 'edit'
				// console.log(sign,item);
				if (sign === 'edit') {
					// 放起请求获取数据
					const obj = {
					departmentName: item.departmentName,
					};
					// console.log(JSON.parse(JSON.stringify(obj)));
					this.form.departmentName = obj.departmentName
					this.currentSection = item //当前部门的数据
				} else {
					this.isTitle = 'add'
				}
			},
			// 确定添加部门请求
			addHandleOk () {
				this.$refs.ruleForm.validate(valid => {
				if(!valid) return
				console.log(this.isTitle); 
				// 如果是编辑
				if(this.isTitle === 'edit') {
					// let index = this.list.findIndex(i=>{
					// 	i.id = this.currentSection.id
					// })
					// console.log(index);
					userAuth.addSectionData({departmentName:this.form.departmentName,id:this.currentSection.id}).then((res)=>{
					console.log(res);
					if(res.code !== 20000) return this.$message.error('修改失败')
					this.$message.success('修改成功')
					// this.list = res.data.list
					this.getSectionList()
					})
				}
				else {
					userAuth.addSectionData(this.form).then((res)=>{
					// console.log(res);
					if(res.code !== 20000) return this.$message.error('添加部门失败')
					this.$message.success('添加部门成功')
					this.getSectionList()
					this.$refs.ruleForm.resetFields()
					})
				}
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
			// console.log('Clicked cancel button');
			this.$refs.ruleForm.resetFields()
			this.addSectionVisible = false;
			},
			// 部门列表
			getSectionList() {
				userAuth.getSection(this.queryParams).then((res)=>{
					console.log(res);
					if (res.code !== 20000) return this.$message.error('获取部门列表失败')
					// console.log(res.data);
					this.pagination.total = res.data.total
					this.data = res.data.list
				})
			},
			// 删除部门 
			deleteSection (id) {
				console.log(id);
				this.$confirm({
					title: '确定删除这个部门吗?',
					// content: 'When clicked the OK button, this dialog will be closed after 1 second',
					onOk() {
					return new Promise((resolve, reject) => {
						setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
						// console.log(id);
						userAuth.removeSection(id).then((res)=>{
							console.log(res);
						})
					}).catch(() => console.log('删除失败,请稍后重试'));
					},
					onCancel() {},
				});
			},
			// 查询
			queryData () {
			  if(this.query.departmentName === '') return
				userAuth.getSection(this.query).then((res)=>{
					console.log(res);
					if (res.code !== 20000) return 
					// console.log(res.data);
					this.total = res.data.total
					this.data = res.data.list
				})
			},
			// 重置 
			resetSession () {
			  if(this.query.departmentName === '') return
				this.query.departmentName = ''
				this.getSectionList()
			}
		}
	}
</script>

<style scoped lang="scss">

</style>

