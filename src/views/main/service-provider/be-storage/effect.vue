<template>
	<a-modal v-model="visible" title="印象添加" v-bind="modal">
		<div style="padding-right: 50px">
			<a-form-model :label-col="{span:5}" :wrapper-col="{span: 19}">
				<a-form-model-item label="合作印象" required>
					<a-textarea v-model="textarea" :rows="5" :maxLength="1024" placeholder="请输入服务商合作印象"></a-textarea>
				</a-form-model-item>
			</a-form-model>
		</div>
		<div slot="footer" style="text-align: center">
			<a-button type="primary" :loading="loading" @click="toSubmit">提交</a-button>
			<a-button @click="toCancel">取消</a-button>
		</div>
	</a-modal>
</template>

<script>
	export default {
		name:'Effect',
		data(){
			return {
				visible:false,
				loading:false,
				textarea:'',
				modal:{
					centered:true,
					maskClosable:true,
					keyboard:false
				},
				id:'',
			}
		},
		methods:{
			toAdd(id){
				this.id = id;
				this.visible = true;
			},
			toSubmit(){
				this.loading = true;
				if(!this.textarea){
					this.$message.error('请输入服务商合作印象');
					this.loading = false;
				}else {
					setTimeout(() => {
						this.loading = false;
						this.visible = false;
						this.id = '';
						this.$emit('onChange',true);
					}, 1000)
				}
			},
			toCancel(){
				this.visible = false;
				this.id = '';
				this.$emit('onChange',false);
			},
		}
	}
</script>

<style scoped>

</style>
