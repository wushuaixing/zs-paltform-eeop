import request from "@/plugin/tools/request";

// 待审查
export const toReview = {
	// 添加审核结果
	audit:params => request.post('/operator/serviceUserManage/review/audit',params),
	// 待审查——服务商详情
	detail:params => request.post('/operator/serviceUserManage/review/detail',params),
	// 保存/更新面谈印象
	impression:params => request.post('/operator/serviceUserManage/review/impression',params),
	// 待审查--列表页
	list:params => request.post('/operator/serviceUserManage/review/list',params),
	// 待审查--点击标记已读
	read:params => request.post('/operator/serviceUserManage/review/read',params),
	// 待审查--全部标记已读
	readAll:params => request.post('/operator/serviceUserManage/review/readAll',params),
	// 查询服务商管理-待审查模块的未读标志
	unreadInfo:params => request.post('/operator/serviceUserManage/review/unreadInfo',params),
};
// 已入库
export const beStorage = {
// 	查询服务商管理-待审查模块的未读标志
// 	待审查——服务商详情
// 保存/更新面谈印象
// 待审查--列表页
// 待审查--点击标记已读
// 添加合作印象
};
