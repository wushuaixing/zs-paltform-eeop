/**
 * 返回 tab 相应table-columns
 * @param type
 * @returns {*[]}
 */
export const columns = (type = '1') =>{
	// 基础列表
	const baseColumns = [
		{
			title: '联络人姓名',
			key: 'name',
			scopedSlots: { customRender: 'readStatus' },
		},
		{
			title: '联系方式',
			dataIndex: 'age',
			key: 'age',
			customRender:val=>val || '-',
		},
		{
			title: '服务商类型',
			dataIndex: 'address',
			key: 'address 1',
			customRender:(val)=> (val && (val === '1' ? '律师' : '机构')) || '-',
		},
		{
			title: '机构名称/挂靠律师',
			dataIndex: 'address',
			key: 'address 2',
			customRender:val=>val || '-',
		},
	];
	const auction = {
		key: 'auction',
		slots: { title: 'customAuction' },
		scopedSlots: { customRender: 'auction' },
	};
	if(type === '1'){
		return [
			...baseColumns,
			{
				title: '所在地',
				dataIndex: 'address',
				key: 'address 3',
				customRender:val=>val || '-',
			},
			{
				title: '从业不良时间',
				dataIndex: 'workingTime',
				key: 'address 41',
				scopedSlots: { customRender: 'workingTime' },
			},
			{
				title: '要素提交日期',
				dataIndex: 'address',
				key: 'address 42',
				customRender:()=>11111,
			},
			auction
		];
	}
	if(type === '2'){
		return [
			...baseColumns,
			{
				title: '认证提交日期',
				dataIndex: 'address',
				key: 'address 42',
				customRender:val=>val || '-',
			},
			auction
		];
	}
	if(type === '3'){
		return [
			{
				title: '联络人姓名',
				key: 'name',
				scopedSlots: { customRender: 'readStatus' },
			},
			{
				title: '联系方式',
				dataIndex: 'age',
				key: 'age',
				customRender:val=>val || '-',
			},
			{
				title: '注册日期',
				dataIndex: 'address',
				key: 'address 42',
				customRender:val=>val || '-',
			},
		];
	}
	if(type === '4'){
		return [
			...baseColumns,
			{
				title: '后台导入日期',
				dataIndex: 'address',
				key: 'address 42',
				customRender:val=>val || '-',
			},
			auction
		];
	}
	if(type === '5'){
		return [
			...baseColumns,
			{
				title: '未通过项',
				dataIndex: 'address',
				key: 'address 3',
				customRender:val=>val || '-',
			},
			{
				title: '审核日期',
				dataIndex: 'address',
				key: 'address 41',
				customRender:val=>val || '-',
			},
			auction
		];
	}
	return baseColumns;
};
