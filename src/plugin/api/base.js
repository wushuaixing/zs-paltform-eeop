import request from "@/plugin/tools/request";

// 获取token 信息
export const getInfo = params => request.get('/operator/amcOperatorUser/getInfo',params);
