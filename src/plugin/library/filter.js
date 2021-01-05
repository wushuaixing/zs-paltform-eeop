import Vue from 'vue';

Vue.filter('capitalize', function (value) {
	if (!value) return ''
	value = value.toString()
	return value.charAt(0).toUpperCase() + value.slice(1)
})

Vue.filter('evolveType', (val)=>{
	if (!val) return '';
	return val === 1 ? '方案已提交' : '方案待提交';
})

Vue.filter('amountTh', (val)=>{
	if (!val) return '-';
	return Number(val).toFixed(1);
})


Vue.filter('guarantyType', (val)=>{
	return  val === 1 ? '担保' : '担保+抵押'
})

Vue.filter('identityType', (val)=>{
	return  val === 1 ? '律师' : '机构'
})
export default Vue
