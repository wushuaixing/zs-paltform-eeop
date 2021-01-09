<template>
	<div class="qualifies-info-wrapper qualify-detail-wrapper">
		<slot name="title"/>
		<!--律师详情展示-->
		<div class="info-item" data-label="我的要素认证信息-律师" v-if="isLawyer">
			<div class="info-item_auction">
				<a-button @click="scrollIntoView('item_category_lawyer')" icon="solution" >律师信息</a-button>
				<a-button @click="scrollIntoView('item_category_office')" icon="bank">律所信息</a-button>
			</div>
			<div class="info-item_category" id="item_category_lawyer" data-lable="律师信息">
				<span class="title">律师信息</span>
			</div>
			<div v-for="(item,index) in lawyerField" :key="index">
				<div class="info-item_subtitle">{{item.title}}</div>
				<div v-for="(i,_index) in item.children" :key="'lawyer'+_index">
					<div class="info-item_list" v-if="toShow(i)">
						<div class="info-item_list-title">{{i.label}}</div>
						<div class="info-item_list-content">
							{{ !i.slot ?(toProcess(i)||'-') :""}}
							<template v-if="i.slot==='file'">
								<FileList :fileList="toProcess(i)" />
							</template>
						</div>
					</div>
				</div>
			</div>
			<div class="info-item_category" id="item_category_office" data-lable="律所信息">
				<span class="title">律所信息</span>
			</div>
			<div class="info-item_img" v-if="noOffice">
				<img :src="noFinished" alt="" style="width: 265px;"/>
				<div class="title">服务商暂未添加挂靠律所信息</div>
			</div>
			<template v-else>
				<div v-for="(i,_index) in officeField" :key="'office'+_index">
					<div class="info-item_list" v-if="toShow(i)">
						<div class="info-item_list-title">{{i.label}}</div>
						<div class="info-item_list-content">{{toProcess(i,officeData)||'-'}}</div>
					</div>
				</div>
			</template>
		</div>
		<!--机构信息展示-->
		<div class="info-item" data-label="我的要素认证信息-机构" v-else>
			<div class="info-item_category">
				<span class="title">机构信息</span>
			</div>
			<div v-for="(item,index) in orgField" :key="index">
				<div class="info-item_subtitle">{{item.title}}</div>
				<div v-for="(i,_index) in item.children" :key="'org'+_index">
					<div class="info-item_list" v-if="toShow(i)">
						<div class="info-item_list-title">{{i.label}}</div>
						<div class="info-item_list-content">{{toProcess(i)||'-'}}</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { areaAnalysis } from '@/plugin/tools';
	import FileList from '@/components/file-list';
	import noFinished from '@/assets/img/no-finished.png';

	// const _dataSource = {
	// 	lawData: {
	// 		area: "11,1101,110101",
	// 		areasOfGoodCases: "擅长业务区域",
	// 		badAssetsWorkExp: "执业经历（不良）",
	// 		competentCourt: "主要代理案件管辖法院",
	// 		familiarCourts: "熟悉法院",
	// 		formerWorkUnit: "曾就业律所",
	// 		graduateSchool: "毕业院校",
	// 		isInStorage: "1",
	// 		isWorkOfPublicSecurityOrgans: "1",
	// 		isWorkOther: "1",
	// 		major: "专业",
	// 		notBadAssetsWorkExp: "执业经历（非不良）",
	// 		otherGoodCases: "擅长其他业务类型",
	// 		otherResources: '1,4',
	// 		otherResourcesAdvantage: "其他社会资源优势",
	// 		workArea: "14,14/1404",
	// 		workRole: "兼职/任职职务",
	// 		workUnitName: "兼职任职单位",
	// 		workingTime: "2",
	// 		goodCases: '1,3,5',
	// 		otherResourcesDetail: '其他资源补充',
	// 		cooperatedAmc: '1,3',
	// 		cooperatedAmcDetail: "具体合作AMC",
	// 		cooperationIntention: '1,3,4,5,6,7,',
	// 		cooperationSituation: "其他AMC合作情况",
	// 		isCooperatedWithOtherAmc: "1",
	// 		isCooperatedWithZheshang: "1",
	// 		isCooperatedWithZheshangDetail: "是否曾于浙商合作补充",
	// 		once_col: "历史清收情况",
	// 		otherCooperationIntention: "合作意向补充",
	// 		typeOfCooperationCode: '1,3',
	// 		officeData: {
	// 			hasOtherOffice: "1",
	// 			isWorkForThreeYear: "1",
	// 			lawOfficeAddress: "律所地址",
	// 			lawOfficeInformation: "律所简介",
	// 			lawOfficeName: "律所名称",
	// 			lawOfficeQualify: "律所资质",
	// 			lawOfficeQualifyPerformance: "律所业绩介绍",
	// 			lawOfficeType: "1",
	// 			officeWorkAddress: "15/1505/150523",
	// 			otherOfficeStaffInfo: "分所人员情况",
	// 			otherOfficeWorkAddress: "15",
	// 			roleInLawOffice: "1",
	// 			totalTeamSize: "3434",
	// 		},
	// 	},
	// 	orgData: {
	// 		areasOfGoodCases: "13,14,15", //擅长业务区域
	// 		branchOfficeAddress: "15/1505",//分布地区
	// 		goodCases: "0,1,2,4,3", //擅长业务类型
	// 		hasInvestmentBankExperience: "1", //是否有投行项目经验
	// 		hasInvestmentIntention: "1", //是否有投资意向
	// 		headOfficeAddress: "11,1101,110101", //机构总部所在地
	// 		investmentArea: "11,1101,110101", //投资区域
	// 		investmentBankProjectCase: "423423",//历史投行项目案例
	// 		investmentExperience: "423423423", //以往投资经历
	// 		investmentPreferenceType: "1,5,9,4", //投资偏好类型
	// 		numberOfCompany: 432423, //公司总人数
	// 		numberOfTeams: 432423, //团队数
	// 		organizationInformation: "workingTime",//机构简介
	// 		organizationalStructureInformation: "423432",//组织架构描述
	// 		otherGoodCases: "432423",//擅长的其他业务类型
	// 		otherMasterSubject: "423432",//所控制的其他主体
	// 		otherResourcesAdvantage: "423432432",//其他社会资源优势
	// 		totalTeamSize: 423432,//团队总人数
	// 		workingTime: "0",//从业时间
	// 		cooperatedAmc: '1,3',
	// 		cooperatedAmcDetail: "具体合作AMC",
	// 		cooperationIntention: '1,3,4,5,6,7,',
	// 		cooperationSituation: "其他AMC合作情况",
	// 		isCooperatedWithOtherAmc: "1",
	// 		isCooperatedWithZheshang: "1",
	// 		isCooperatedWithZheshangDetail: "是否曾于浙商合作补充",
	// 		once_col: "历史清收情况",
	// 		otherCooperationIntention: "合作意向补充",
	// 		typeOfCooperationCode: '1,3',
	// 	},
	// };

	const formItemLayout =  {
		labelCol: { span: 6 },
		wrapperCol: { span: 18 },
	};

	export default {
		name: 'FactorInfo',
		nameComment: '要素信息展示',
		components:{
			FileList,
		},
		props: {
			source: {},
			isLawyer: {
				type: Boolean,
				default: true,
			},
		},
		data() {
			return {
				loading:false,
				noFinished,
				formItemLayout,
				lawyerField:[],
				officeField:[],
				orgField:[],
			}
		},
		created(){
			const _is = this.$options.filters['is'];
			const _multi = this.$options.filters['multi'];
			const _unit = this.$options.filters['unit'];
			const _area = val => this.$options.filters['area'](areaAnalysis(val));
			const _areas = val => this.$options.filters['areas'](areaAnalysis(val,false));
			const _if = i => i === '1';
			const publicField = [
				{
					title:"历史合作情况",
					children:[
						{ label:"是否曾与浙商合作", field:"isCooperatedWithZheshang",
							f:_multi, other:'isCooperatedWithZheshangDetail',origin:"isOther" },
						{ label:"过往合作类型", field:"typeOfCooperationCode", m:_if, about:'isCooperatedWithZheshang',
							f:_multi, other:'cooperatedAmcDetail', origin:"typeOfCooperation"},
						{ label:"历史合作团队", field:"cooperationTeam", m:_if, about:'isCooperatedWithZheshang' },
						{ label:"历史清收情况", field:"liquidationSituation", m:_if, about:'isCooperatedWithZheshang' },
						{ label:"是否曾与其他AMC合作", field:"isCooperatedWithOtherAmc", f:_is, },
						{ label:"历史合作AMC", field:"cooperatedAmc", m:_if, about:'isCooperatedWithOtherAmc',
							f:_multi, other:'cooperatedAmcDetail', origin:"hisFour" },
						{ label:"其他AMC合作情况", field:"cooperationSituation" , m:_if, about:'isCooperatedWithOtherAmc'},
					]
				},
				{
					title:"后续期望合作方向",
					children:[
						{ label:"合作意向", field:"cooperationIntention",f:_multi, other:'otherCooperationIntention', origin:"cooIntent"},
					]
				},
			];
			this.lawyerField = [
				{
					title:"个人背景",
					children:[
						{ label:"毕业院校", field:"graduateSchool" },
						{ label:"专业", field:"major" },
						{ label:"从业不良时间经验", field:"workingTime",f:_multi, origin:"expOption" },
						{ label:"所在地区", field:"area",f:_area, },
						{ label:"主要涉业地区", field:"workArea",f:_areas },
						{ label:"是否有公检法等工作经历", field:"isWorkOfPublicSecurityOrgans", f:_is, },
						{ label:"当前是否存在其他兼职/任职", field:"isWorkOther", f:_is, },
						{ label:"兼职/任职单位名称", field:"workUnitName", m:_if, about:'isWorkOther'},
						{ label:"兼职/任职职务", field:"workRole", m:_if, about:'isWorkOther' },
						{ label:"曾就业律所/单位", field:"formerWorkUnit" },
						{ label:"执业经历（不良）", field:"badAssetsWorkExp" },
						{ label:"执业经历（非不良）", field:"notBadAssetsWorkExp" },
						{ label:"是否曾入浙商律所库", field:"isInStorage", f:_is, },
					]
				},
				{
					title:"擅长优势",
					children:[
						{ label:"擅长业务类型", field:"goodCases",f:_multi, other:'otherGoodCases', origin:"lawAdvType" },
						{ label:"经典案例 ", field:"classicCase" ,slot:'file'},
						{ label:"擅长业务区域", field:"areasOfGoodCases" },
						{ label:"主要代理案件管辖法院 ", field:"competentCourt" },
						{ label:"熟悉法院 ", field:"familiarCourts" },
						{ label:"其他社会资源优势", field:"otherResourcesAdvantage" },
						{ label:"其他资源", field:"otherResources",f:_multi, other:'otherResourcesDetail', origin:"lawAdvList"  },
					]
				},
				...publicField,
			];
			this.officeField = [
				{ label:"律所名字", field:"lawOfficeName"},
				{ label:"统一社会信用代码", field:"code"},
				{ label:"律所地址", field:"lawOfficeAddress"},
				{ label:"展业地域", field:"officeWorkAddress",f:_areas},
				{ label:"律所类型", field:"lawOfficeType",f:_multi, origin:"lawType"},
				{ label:"律所是否经营3年以上", field:"isWorkForThreeYear",f:_is},
				{ label:"是否存在分所", field:"hasOtherOffice",f:_is},
				{ label:"分所展业地域", field:"otherOfficeWorkAddress",f:_areas},
				{ label:"分所的人员情况", field:"otherOfficeStaffInfo"},
				{ label:"律所请收团对人数", field:"totalTeamSize",f:_unit, unit:'人'},
				{ label:"本人在律所但任职务", field:"roleInLawOffice",f:_multi, origin:"lawDuty"},
				{ label:"律所简介", field:"lawOfficeInformation"},
				{ label:"律所资质", field:"lawOfficeQualify"},
				{ label:"律所业绩介绍", field:"lawOfficeQualifyPerformance"},
			];
			this.orgField = [
				{
					title:"基本背景",
					children:[
						{ label:"机构简介", field:"organizationInformation" },
						{ label:"从业不良时间经验", field:"workingTime",f:_multi, origin:"expOption" },
						{ label:"公司总部所在地", field:"headOfficeAddress",f:_area },
						{ label:"公司分部覆盖地区", field:"branchOfficeAddress",f:_areas },
						{ label:"公司总人数", field:"numberOfCompany",f:_unit, unit:'人' },
						{ label:"清收团队数", field:"numberOfTeams",f:_unit, unit:'个' },
						{ label:"清收团队总人数", field:"numberOfCompany" ,f:_unit, unit:'人'},
						{ label:"组织架构", field:"organizationalStructureInformation" },
						{ label:"所控制的其他主体", field:"otherMasterSubject" },
					]
				},
				{
					title:"擅长优势",
					children:[
						{ label:"擅长业务类型", field:"goodCases",f:_multi, other:'otherGoodCases', origin:"orgAdvType" },
						{ label:"擅长业务区域", field:"areasOfGoodCases",f:_areas },
						{ label:"社会资源优势 ", field:"otherResourcesAdvantage" },
						{ label:"是否有投行项目经验 ", field:"hasInvestmentBankExperience", f:_is, },
						{ label:"历史投行项目案例", field:"investmentBankProjectCase", m:_if, about:'hasInvestmentBankExperience'},
					]
				},
				{
					title:"投资意向",
					children:[
						{ label:"是否有投资意向", field:"hasInvestmentIntention" ,f:_is,},
						{ label:"投资偏好类型", field:"investmentPreferenceType",
							m:_if, about:'hasInvestmentIntention', f:_multi, origin:"hisCoo"},
						{ label:"标的金额范围", field:"startAmountOfSubject",m:_if, about:'hasInvestmentIntention' },
						{ label:"投资区域", field:"investmentArea",m:_if, about:'hasInvestmentIntention',f:_area },
						{ label:"以往投资经历", field:"investmentExperience",m:_if, about:'hasInvestmentIntention' },
					]
				},
				...publicField,
			];
		},
		methods: {
			// process 处理展示数据
			toProcess(item,source){
				const { field, f, origin, other, unit } = item;
				const _source = source || this.dataSource || {};
				const value = _source[field];
				const _other = (other ? _source[other] : '') || unit;
				return f ? f(value,origin,_other) : value;
			},
			// 是否展示元素
			toShow(item,source){
				const _source = source || this.dataSource || {};
				return item.m && item.about ? item.m(_source[item.about]) : true;
			},
			//锚点跳转
			scrollIntoView(ele) {
				document.getElementById(ele).scrollIntoView(true);
			},
		},
		computed:{
			dataSource(){
				return this.source || {};
			},
			officeData(){
				const data = this.source || {};
				const _source = data.lawOffice || {};
				if(data.roleInLawOffice) _source.roleInLawOffice = data.roleInLawOffice;
				return _source;
			},
			noOffice(){
				return !Object.keys(this.officeData).length;
			},
		}
	}
</script>

<style scoped lang="scss">
	.qualify-detail-wrapper{
		.info-item {
			&_auction{
				padding: 4px 0;
				button{
					width: 110px;
					margin-right: 15px;
				}
			}
			&_category{
				height: 50px;
				line-height: 50px;
				display: flex;
				justify-content: space-between;
				border-bottom: 1px solid $border-base;
				margin-bottom: 20px;
				.title{
					font-size: 16px;
					font-weight: bold;
					color: $text-title;
				}
			}
			&_img{
				padding: 25px 0;
				text-align: center;
				.title{
					margin: 10px 0 20px 0;
				}
			}
		}
	}
</style>
