<template>
	<div v-if="source" style="padding-top: 10px;">
		<a-row style="margin-bottom: 10px">
			<a-col :span="8">
				<div class="span-wrapper">
					<span>上次{{typeText}}审核结果：<i>{{info.auditResult?'已通过':'未通过'}}</i></span>
				</div>
			</a-col>
			<a-col :span="8">
				<div class="span-wrapper">
					<span>上次审核时间：<i>{{info.auditTime||'-'}}</i></span>
				</div>
			</a-col>
			<a-col :span="8">
				<div class="span-wrapper">
					<span>上次审核人：<i>{{info.auditor||'-'}}</i></span>
				</div>
			</a-col>
		</a-row>
		<a-row>
			<a-col :span="24">
				<div class="span-wrapper">
					<span>未通过原因：<i>{{info.notPassReason||'-'}}</i></span>
				</div>
			</a-col>
		</a-row>
	</div>
</template>

<script>
	export default {
		name:'LastAudit',
		props:{
			source:Object,
			typeText:{
				type:String,
				default:''
			}
		},
		computed:{
			info(){
				return {...this.source}
			}
		}
	}
</script>

<style scoped lang="scss">
	.span-wrapper{
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
</style>
