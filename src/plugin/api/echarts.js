import request from "@/plugin/tools/request";

// 获取echarts服务商招商情况
export const getEchartsInvestMennt = (params) => request.get('/service/workTable/findProgress', {params});