<template>
	<div class="qualifies-info-wrapper">
		<div class="info-item" data-label="我的资质认证信息-律师" v-if="isLawyer">
			<div class="info-item_date" v-if="noDate">提交日期：
				<span>{{dataSource.createTime}}</span>
			</div>
			<div class="info-item_title" v-if="!noTitle">我的资质认证信息</div>
			<div class="info-item_list">
				<div class="info-item_list-title">律师名称</div>
				<div class="info-item_list-content">{{dataSource.lawyerName||'-'}}</div>
			</div>
			<div class="info-item_list">
				<div class="info-item_list-title">身份证号码</div>
				<div class="info-item_list-content">{{dataSource.cardNumber||'-'}}</div>
			</div>
			<div class="info-item_list">
				<div class="info-item_list-title">性别</div>
				<div class="info-item_list-content">{{dataSource.sex === "0" ?'男':'女'}}</div>
			</div>
			<div class="info-item_list">
				<div class="info-item_list-title">执业证号</div>
				<div class="info-item_list-content">{{dataSource.licenseNumber||'-'}}</div>
			</div>
			<div class="info-item_list">
				<div class="info-item_list-title">执业开始年份</div>
				<div class="info-item_list-content">{{dataSource.licenseStart||'-'}}</div>
			</div>
			<div class="info-item_list">
				<div class="info-item_list-title">挂靠律所</div>
				<div class="info-item_list-content">{{dataSource.lawOffice||'-'}}</div>
			</div>
			<div class="info-item_list">
				<div class="info-item_list-title">邮箱地址</div>
				<div class="info-item_list-content">{{dataSource.email||'-'}}</div>
			</div>
			<div class="info-item_list">
				<div class="info-item_list-title">备用邮箱</div>
				<div class="info-item_list-content">{{dataSource.backupEmail||'-'}}</div>
			</div>
			<div class="info-item_list">
				<div class="info-item_list-title">身份证照片</div>
				<div class="info-item_list-content">
					<FileList :fileList="dataSource.frontOfCard"/>
					<FileList :fileList="dataSource.backOfCard"/>
				</div>
			</div>
			<div class="info-item_list">
				<div class="info-item_list-title">从业资格证</div>
				<div class="info-item_list-content">
					<FileList :fileList="dataSource.qualificationCertificate"/>
				</div>
			</div>
			<div class="info-item_list">
				<div class="info-item_list-title">保密承诺函</div>
				<div class="info-item_list-content">
					<FileList :fileList="dataSource.confidentialityCommitmentLetter"/>
				</div>
			</div>
		</div>
		<div class="info-item" data-label="我的资质认证信息-机构" v-else>
			<div class="info-item_date" v-if="noDate">提交日期：
				<span>{{dataSource.createTime}}</span>
			</div>
			<div class="info-item_list">
				<div class="info-item_list-title">机构名称</div>
				<div class="info-item_list-content">{{dataSource.name||'-'}}</div>
			</div>
			<div class="info-item_list">
				<div class="info-item_list-title">统一社会信用代码</div>
				<div class="info-item_list-content">{{dataSource.orgSocialCreditCode||'-'}}</div>
			</div>
			<div class="info-item_list">
				<div class="info-item_list-title">邮箱地址</div>
				<div class="info-item_list-content">{{dataSource.email||'-'}}</div>
			</div>
			<div class="info-item_list">
				<div class="info-item_list-title">备用邮箱</div>
				<div class="info-item_list-content">{{dataSource.backupEmail||'-'}}</div>
			</div>
			<div class="info-item_list">
				<div class="info-item_list-title">营业执照</div>
				<div class="info-item_list-content">
					<FileList :fileList="dataSource.businessLicense" />
				</div>
			</div>
			<div class="info-item_list">
				<div class="info-item_list-title">保密承诺函</div>
				<div class="info-item_list-content">
					<FileList :fileList="dataSource.confidentialityCommitmentLetter"/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import FileList from '@/components/file-list';
	export default {
		name: 'QualifyInfo',
		nameComment: '资质认证信息',
		data(){
			return {
			}
		},
		props:{
			source:{
				type:Object,
				default:()=>{},
			},
			isLawyer:{
				type:Boolean,
				default:true,
			},
			noTitle:{
				type:Boolean,
				default:true,
			},
			noDate:{
				type:Boolean,
				default:true,
			}
		},
		components:{
			FileList,
		},
		computed:{
			dataSource(){
				return {...this.source};
			}
		}

	}
</script>

<style lang="scss" scoped>
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
