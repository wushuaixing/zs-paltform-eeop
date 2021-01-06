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
					<a-tab-pane key="3" tab="印象标签">
						<a-button @click="toOpenEffect">添加合作印象</a-button>
					</a-tab-pane>
				</a-tabs>
			</div>
		</div>
		<EffectModal ref="effect" @onChange="onEffectChange"></EffectModal>
	</div>
</template>

<script>
	import Breadcrumb from '@/components/bread-crumb';
	import UserInfo from '../_common/user-info';
	import QualifyInfo from '../_common/qualify-info';
	import FactorInfo from '../_common/factor-info';
	import EffectModal from './effect';

	export default {
		name: 'ToReview',
		data() {
			return {
				navData:[
					{id:1,title:'服务商管理',path:'/provider/review'},
					{id:2,title:'已入库',path:'/provider/storage'},
					{id:3,title:'服务商详情页',path:''},
				],
			};
		},
		components:{
			Breadcrumb,
			UserInfo,
			QualifyInfo,
			FactorInfo,
			EffectModal
		},
		created() {
		},
		methods:{
			handleSubmit(e){
				e.preventDefault();
			},
			handleTabChange(val){
				console.log(val);
			},
			handleTableChange(ev){
				console.log(ev);
			},

			onEffectChange(status){
				console.log(status);
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
