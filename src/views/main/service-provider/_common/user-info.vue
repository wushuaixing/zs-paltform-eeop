<template>
	<div class="user-info-wrapper">
		<div class="info-icon">
			<a-icon type="bank"  style="font-size: 80px"/>
		</div>
		<div class="info-detail">
			<div class="info-detail_name">username</div>
			<div v-if="isLawyer">
				<span>服务商类型：<i>{{identity||'-'}}</i></span>
				<a-divider type="vertical" />
				<span>联系方式：<i>{{info.contact||'-'}}</i></span>
				<a-divider type="vertical" />
				<span>挂靠律所：<i>{{info.phone||'-'}}</i></span>
			</div>
			<div v-else>
				<span>服务商类型：<i>{{identity||'-'}}</i></span>
				<a-divider type="vertical" />
				<span>联络人：<i>{{info.contact||'-'}}</i></span>
				<a-divider type="vertical" />
				<span>联系方式：<i>{{info.phone||'-'}}</i></span>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name:'UserInfo',
		props:{
			isLawyer:{
				type: Boolean,
				default:true,
			},
			info:{
				type:Object,
				default:()=>({})
			}
		},
		computed:{
			identity(){
				if(this.info.identity){
					return this.info.identity === '1' ? "律师" : "机构"
				}
				return ''
			}
		}
	}
</script>

<style scoped lang="scss">
.user-info-wrapper{
	margin-bottom: 15px;
	display: flex;
	.info-icon{
		width: 80px;
		height: 80px;
		float: left;
		border-radius: 50%;
	}
	.info-detail{
		margin-left: 20px;
		&_name{
			font-size: 18px;
			line-height: 30px;
			font-weight: bold;
			margin-top: 10px;
			margin-bottom: 5px;
		}
		span{
			font-size: 14px;
			line-height: 20px;
			color: $text-remark;
			i{
				font-style: normal;
				color: $text-title;
			}
		}
	}
}
</style>
