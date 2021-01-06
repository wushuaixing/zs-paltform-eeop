import request from "@/plugin/tools/request";

export const amcProjectListApi = params => request.post('/service/amcProject',params);

export const signUpApi = id => request.post(`/service/amcProject/checkin/${id}`);

export const projectFind = params => request.post('/operator/project/findAll',params);

// 详情页-获取项目基本信息接口
export const projectDetail = params => request.get(`/operator/project/details?projectId=${params}`);

//报名服务商列表接口
export const signService = params => request.post('/operator/project/signService',params);

//服务商提交方案列表接口
export const serviceCaseSubmit = params => request.post('/operator/project/serviceCaseSubmit',params);