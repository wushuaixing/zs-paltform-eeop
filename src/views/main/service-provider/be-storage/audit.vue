<template>
	<div class="frame-wrapper">
		<Breadcrumb :source="navSource" icon="environment"></Breadcrumb>
		<div class="frame-wrapper-content" v-if="spinning">
			<div style="height: 10vh;"></div>
			<a-spin class="spin-wrapper" tip="Loading......" size="large"/>
		</div>
		<div class="frame-wrapper-content" style="padding-top: 0" v-else>
			<a-affix :offset-top="64">
				<div class="custom-card-position">
					<UserInfo :info="source.user" :isLawyer="source.isLawyer" />
				</div>
			</a-affix>
			<QualifyInfo :isLawyer="source.isLawyer" :source="source.qualify"/>
			<FactorInfo :isLawyer="source.isLawyer" :source="source.factor"/>
		</div>
	</div>
</template>

<script>
	import Breadcrumb from '@/components/bread-crumb';
	import UserInfo from '../_common/user-info';
	import QualifyInfo from '../_common/qualify-info';
	import FactorInfo from '../_common/factor-info';
	import { beStorage } from "@/plugin/api/provider";
	// import { processData } from '../to-review/deploy';

	export default {
		name: 'ToReview',
		data() {
			return {

				activeKey:'1',
				source:{
					isLawyer: true,
					user:{},
					qualify:{},
					factor:{},
				},
				spinning:true,
				userId:'',
				elementStatus:{},
				qualifyStatus:{},
			};
		},
		components:{
			Breadcrumb,
			UserInfo,
			QualifyInfo,
			FactorInfo,
		},
		created() {
			const { id,type } = this.$route.query;
			this.userId = id;
			if(type === '2' || type === '3') {
				beStorage.detail({id,type:Number(type)}).then(res=>{
					if(res.code === 20000){
						console.log(res.data);
					} else{
						this.$message.error('网络请求异常，请稍后再试！',1,()=>{
							this.$route.push('/provider/storage')
						})
					}
				})
			}else{
				this.$message.error('当前数据有误，请重新查询！',1,()=>{
					this.$route.push('/provider/storage')
				})
			}
		},
		methods:{
			onEffectChange(status){
				console.log(status);
			},
		},
		computed:{
			impSource(){
				return {
					int:this.source.interviewImpression,
					coo:this.source.cooperationImpressionList,
				}
			},
			navSource(){
				const { type } = this.$route.query;
				console.log(type);
				return [
					{id:1,title:'服务商管理',path:'/provider/review'},
					{id:2,title:'已入库',path:'/provider/storage'},
					{id:3,title:'服务商详情页',path:''},
				]
			}
		},
	}
</script>

<style scoped lang="scss">
	.custom-card-position{
		position: relative;
		.custom-card-container-remark{
			position: absolute;
			z-index: 1;
			bottom: -40px;
			width: 100%;
		}
		.custom-card-container_normal .ant-tabs-tabpane{
			padding: 0;
		}
	}
	.detail-audit-wrapper{
		height: 115px;
		background-color: #086DD9;
		padding: 15px;
		text-align: center;
		p{
			margin: 10px 0;
		}
	}
	.audit-info-wrapper{
		margin-top: 15px;
		.ant-divider-vertical{
			margin: 0 20px;
		}
		span{
			font-size: 14px;
			line-height: 20px;
			color: $text-remark;
			display: inline-block;
			i{
				font-style: normal;
				color: $text-title;
			}
		}
	}

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
