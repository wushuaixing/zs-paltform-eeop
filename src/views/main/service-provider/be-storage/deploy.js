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
				title: '擅长业务区域',
				dataIndex: 'address',
				key: 'address 3',
				customRender:val=>val || '-',
			},
			{
				title: '合作意向',
				dataIndex: 'address',
				key: 'address 31',
				customRender:val=>val || '-',
			},
			{
				title: '入库时间',
				sort:true,
				dataIndex: 'workingTime',
				key: 'address 41',
				scopedSlots: { customRender: 'workingTime' },
			},
			auction
		];
	}
	if(type === '2'){
		return [
			...baseColumns,
			{
				title: '资质修改提交日期',
				dataIndex: 'address',
				key: 'address 42',
				customRender:val=>val || '-',
			},
			auction
		];
	}
	if(type === '3'){
		return [
			...baseColumns,
			{
				title: '要素修改提交日期',
				dataIndex: 'address',
				key: 'address 42',
				customRender:val=>val || '-',
			},
			auction
		];
	}
	return baseColumns;
};
