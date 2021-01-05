<template>
	<div class="frame-wrapper">
		<Breadcrumb :source="navData" icon="environment"></Breadcrumb>
		<div class="frame-wrapper-content">
			<UserInfo></UserInfo>
			<div class="custom-card-container">
				<a-tabs type="card">
					<a-tab-pane key="1" tab="资质信息">
						<QualifyInfo></QualifyInfo>
					</a-tab-pane>
					<a-tab-pane key="2" tab="要素信息">
						<FactorInfo></FactorInfo>
					</a-tab-pane>
				</a-tabs>
			</div>
			<a-affix :offset-bottom="0">
				<div class="review-audit-wrapper">
					<a-button @click="toIntAdd">添加面谈印象</a-button>
					<a-button type="primary" @click="toAuditAdd">添加审核结果</a-button>
				</div>
			</a-affix>
		</div>
		<a-modal v-model="interview.visible" title="面谈印象" v-bind="modal">
			<div style="padding-right: 100px">
				<a-form-model :model="interview.form" :label-col="{ span:8}" :wrapper-col="{ span: 16}">
					<a-form-model-item label="擅长业务补充说明">
						<a-textarea v-model="interview.form.goodCaseDescription" :rows="3"
												:maxLength="1024" placeholder="请输入服务商擅长业务的补充说明"></a-textarea>
					</a-form-model-item>
					<a-form-model-item label="社会资源补充说明">
						<a-textarea v-model="interview.form.socialResourcesDescription" :rows="4"
												:maxLength="1024" placeholder="请输入服务商社会资源优势的补充说明"
						></a-textarea>
					</a-form-model-item>
					<a-form-model-item label="金额范围补充说明">
						<a-textarea v-model="interview.form.amountRangeDescription" :rows="3"
												:maxLength="1024" placeholder="请输入服务商历史服务标的金额范围的补充说明"></a-textarea>
					</a-form-model-item>
					<a-form-model-item label="推荐人">
						<a-input v-model="interview.form.referrer" :maxLength="40" placeholder="请输入服务商的推荐人"/>
					</a-form-model-item>
					<a-form-model-item label="其他补充说明">
						<a-textarea v-model="interview.form.otherDescription" :rows="3"
												:maxLength="1024" placeholder="请输入其他方面补充说明"></a-textarea>
					</a-form-model-item>
				</a-form-model>
			</div>
			<div slot="footer" style="text-align: center">
				<a-button type="primary" :loading="interview.loading" @click="toIntSubmit">提交</a-button>
				<a-button @click="toIntCancel">取消</a-button>
			</div>
		</a-modal>
		<a-modal v-model="audit.visible" title="审核结果" v-bind="modal">
			<div style="padding:0 40px">
				<a-form-model :model="audit.form" :label-col="{ span:8}" :wrapper-col="{ span: 16}">
					<div class="text-dangerous">*资质信息与要素信息均审核通过后，该服务商将进入已入库名单，并获得已入库服务商权限。</div>
					<div class="common-text-subtitle" style="margin-top: 20px">资质信息审核</div>
					<a-form-model-item label="资质信息审核结果" v-if="audit.form.qualifyAudit !== 3">
						<a-radio-group v-model="audit.form.qualifyAudit">
							<a-radio :value="1" style="margin-right: 50px">通过</a-radio>
							<a-radio :value="0">不通过</a-radio>
						</a-radio-group>
					</a-form-model-item>
					<a-form-model-item label="未通过原因" v-if="audit.form.qualifyAudit === 0" required>
						<a-textarea v-model="audit.form.qualifyNotPassReason" :rows="3"
												:maxLength="1024" placeholder="请反馈审核不通过原因"></a-textarea>
					</a-form-model-item>
					<div class="common-text-subtitle" style="margin-top: 20px">要素信息审核</div>
					<a-form-model-item label="要素信息审核结果"  v-if="audit.form.elementAudit !== 3">
						<a-radio-group v-model="audit.form.elementAudit">
							<a-radio :value="1" style="margin-right: 50px">通过</a-radio>
							<a-radio :value="0">不通过</a-radio>
						</a-radio-group>
					</a-form-model-item>
					<a-form-model-item label="未通过原因" v-if="audit.form.elementAudit === 0" required>
						<a-textarea v-model="audit.form.elementNotPassReason" :rows="3"
												:maxLength="1024" placeholder="请反馈审核不通过原因"></a-textarea>
					</a-form-model-item>
				</a-form-model>
			</div>
			<div slot="footer" style="text-align: center">
				<a-button type="primary" :loading="audit.loading" @click="toAuditSubmit">提交</a-button>
				<a-button @click="toAuditCancel">取消</a-button>
			</div>
		</a-modal>
	</div>
</template>

<script>
	import Breadcrumb from '@/components/bread-crumb';
	import UserInfo from '../_common/user-info';
	import QualifyInfo from '../_common/qualify-info';
	import FactorInfo from '../_common/factor-info';
	import { clearProto, clearObject } from "@/plugin/tools";

	export default {
		name: 'ToReview',
		data() {
			return {
				navData:[
					{id:1,title:'服务商管理',path:'/provider/review'},
					{id:2,title:'待审查',path:'/provider/review'},
					{id:3,title:'服务商详情页',path:''},
				],
				interview:{
					loading:false,
					visible:false,
					form:{
						amountRangeDescription:"",
						goodCaseDescription:"",
						otherDescription:"",
						referrer:"",
						serviceUserId:"",
						socialResourcesDescription:"",
					}
				},
				loadingInterview:false,
				visibleInterview:false,
				audit:{
					loading:false,
					visible:false,
					form:{
						elementAudit:"",
						elementNotPassReason:"",
						qualifyAudit:"",
						qualifyNotPassReason:"",
					}
				},
				modal:{
					width:'800px',
					centered:true,
					maskClosable:true,
					keyboard:false
				}
			};
		},
		components:{
			Breadcrumb,
			UserInfo,
			QualifyInfo,
			FactorInfo
		},
		created() {
		},
		methods:{
			handleSubmit(e){
				e.preventDefault();
				console.log(clearProto(this.interview));
			},
			handleTabChange(val){
				console.log(val);
			},
			handleTableChange(ev){
				console.log(ev);
			},
			toIntAdd(){
				this.interview.visible = true;
			},
			toIntSubmit(){
				this.interview.loading = true;
				if(JSON.stringify(clearObject(this.interview.form)) === '{}'){
					this.$message.error('请至少输入一项面谈印象');
					this.interview.loading = false;
				}else {
					setTimeout(() => {
						this.interview.loading = false;
						this.interview.visible = false;
					}, 1000)
				}
			},
			toIntCancel(){
				this.interview.visible = false;
			},

			toAuditAdd(){
				this.audit.visible = true;
			},
			toAuditSubmit(){
				this.audit.loading = true;
				const { elementAudit,qualifyAudit, elementNotPassReason,qualifyNotPassReason} = this.audit.form;
				if(elementAudit !== "" || qualifyAudit !== ""){
					if(qualifyAudit !== "" && qualifyAudit === 0 && !qualifyNotPassReason){
						this.audit.loading = false;
						return 	this.$message.error('请填写资质审核不通过原因');
					}
					if(elementAudit !== "" && elementAudit === 0 && !elementNotPassReason){
						this.audit.loading = false;
						return 	this.$message.error('请填写要素审核不通过原因');
					}
					setTimeout(() => {
						this.audit.loading = false;
						this.audit.visible = false;
					}, 1000)
				}else {
					this.$message.error('请选择相关审核');
					this.audit.loading = false;
				}
			},
			toAuditCancel(){
				this.audit.visible = false;
			},
		},
		computed:{
		},
	}
</script>

<style scoped lang="scss">

	.qualifies-info-wrapper{
		.info-item{
			padding: 7px 0;
			position: relative;
			&_date{
				position: absolute;
				top: 0;
				right: 20px;
				text-align: left;
				height: 20px;
				line-height: 20px;
				font-size: 14px;
				color: $text-remark;
				span{
					font-size: 16px;
					color: $text-title;
				}
			}
			&_title{
				border-left: 4px solid $common-base-active;
				padding-left: 6px;
				font-size: 16px;
				height: 25px;
				line-height: 25px;
			}
			&_subtitle{
				font-size: 14px;
				height: 25px;
				line-height: 25px;
				color: $text-title;
			}
			&_list{
				margin:22px 0;
				display: flex;
				line-height: 25px;
				&-title{
					width: 33.3%;
					font-size: 14px;
					color: $text-title;
					text-align: right;
					padding-right: 10px;
					&:after{
						content:'：'
					}
				}
				&-content{
					flex: 1;
					color: $text-content;
					.remark{
						display: block;
						font-size: 12px;
						color: $text-remark;
					}
				}
			}
		}
	}
</style>
<style lang="scss">
	.review-audit-wrapper{
		text-align: center;
		padding: 15px;
		border-top:1px solid #ddd;
		background: #fff;
		button{
			width: 200px;
			&:nth-child(1){
				margin-right: 20px;
			}
		}
	}

</style>
