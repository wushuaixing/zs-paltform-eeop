<template>
  <div>
    <Breadcrumb :source="navData" icon="environment" />
    <div class="detail-wrapper">
      <h2>基本信息</h2>
      <div class="detail-conten">
        <!-- 债权基本信息-->
        <div>
          <h3 class="title2">债权基本信息</h3>
          <a-row type="flex">
            <a-col :span="8">
              资产包所属机构：<span>{{ detailInfo.capitalOrg }}</span>
            </a-col>
            <a-col :span="8">
              资产包收益权所属机构：<span>{{
                detailInfo.capitalProfitOrg
              }}</span>
            </a-col>
            <a-col :span="8">
              当前诉讼状态：<span>{{ detailInfo.isLawsuit }}</span>
            </a-col>
          </a-row>
          <a-row type="flex">
            <a-col :span="8">
              资产包名称：<span>{{ detailInfo.assetPackage }}</span>
            </a-col>
            <a-col :span="8">
              资产包收购时间：<span>{{ detailInfo.capitalPurchaseTime }}</span>
            </a-col>
            <a-col :span="8">
              担保方式：<span>{{ detailInfo.security }}</span>
            </a-col>
          </a-row>
          <a-row type="flex">
            <a-col :span="8">
              债务人名称：<span>{{ detailInfo.debtor }}</span>
            </a-col>
            <a-col :span="8"> 保证人：<span>{{}}</span> </a-col>
          </a-row>
          <a-row type="flex">
            <a-col :span="8">
              债权本金：<span>{{ detailInfo.debtCaptial }}</span>
            </a-col>
            <a-col :span="8">
              债权利息：<span>{{ detailInfo.debtInterest }}</span>
            </a-col>
          </a-row>
          <div class="guarantee">
            <p>抵押物类型：</p>
            <div>
              <p>
                1.
                住宅，浙江省杭州市西湖区，xxx位于浙江省杭州市西湖区紫金名门1幢203的面积为207㎡的住宅一套
              </p>
            </div>
          </div>
          <a-row type="flex">
            <a-col :span="8">
              所属业务团队：<span>{{ detailInfo.businessTeam }}</span>
            </a-col>
            <a-col :span="8">
              项目经理：<span>{{ detailInfo.projectManager }}</span>
            </a-col>
            <a-col :span="8">
              联系方式：<span>{{ detailInfo.contact }}</span>
            </a-col>
          </a-row>
        </div>
        <!--项目招商信息-->
        <div>
          <h3 class="title2">项目招商信息</h3>
          <a-row type="flex">
            <a-col :span="8">
              报名截止日期：<span>{{ detailInfo.deadline }}</span>
            </a-col>
            <a-col :span="8">
              方案提交截止日期：<span>{{ detailInfo.submitDeadline }}</span>
            </a-col>
          </a-row>
          <a-row type="flex">
            <a-col :span="8">
              期限上限：<span>{{ detailInfo.targetYearUpperLimit }}</span>
            </a-col>
            <a-col :span="8">
              目标回款金额下限：<span>{{
                detailInfo.targetAmountLowerLimit
              }}</span>
            </a-col>
          </a-row>
        </div>
        <!--债权清收情况 -->
        <div>
          <h3 class="title2">债权清收情况</h3>
          <a-row type="flex">
            <a-col :span="8">
              是否有代理律师：<span>{{ detailInfo.isHaveProxyLawyer }}</span>
            </a-col>
            <a-col :span="8">
              代理律师联系方式：<span>{{ detailInfo.proxyLawyerContact }}</span>
            </a-col>
            <a-col :span="8">
              代理截止日期：<span>{{ detailInfo.proxyLimit }}</span>
            </a-col>
          </a-row>
          <a-row type="flex">
            <a-col :span="8">
              代理律师姓名：<span>{{ detailInfo.proxyLawyerName }}</span>
            </a-col>
            <a-col :span="8"> 目标汇款金额下限：<span>{{}}</span> </a-col>
          </a-row>
          <div class="creditor-condition">
            已请收情况：<span>{{ detailInfo.alreadyCollectionStatus }}</span>
          </div>
          <div class="creditor-condition">
            司法进展情况：<span>{{ detailInfo.judicialProcess }}</span>
          </div>
          <div class="creditor-condition">
            财产线索情况：<span>{{ detailInfo.propertyClue }}</span>
          </div>
          <div class="creditor-condition">
            处置简述：<span>{{ detailInfo.disposeDescription }}</span>
          </div>
          <a-row type="flex">
            <a-col :span="8">
              业务部门计划清收目标：<span>{{
                detailInfo.businessDepartmentTarget
              }}</span>
            </a-col>
            <a-col :span="8">
              业务部门计划清收时间：<span>{{
                detailInfo.businessDepartmentRecoveryTime
              }}</span>
            </a-col>
          </a-row>
          <div class="creditor-condition">
            处置难点：<span>{{ detailInfo.disposeDifficulty }}</span>
          </div>
          <div class="creditor-condition">
            债务人现状：<span>{{ detailInfo.debtorStatus }}</span>
          </div>
          <div class="creditor-condition">
            保证人现状：<span>{{ detailInfo.guarantorStatus }}</span>
          </div>
          <div class="creditor-condition">
            抵质押人现状：<span>{{ detailInfo.mortgagorStatus }}</span>
          </div>
        </div>
        <!--报名服务商列表-->
        <div>
          <h3 class="title2">报名服务商列表</h3>
          <a-table v-bind="tableSource.applyServeTable">
            <!-- <a slot="name" slot-scope="text">{{ text }}</a> -->
            <template slot="name" slot-scope="name">{{ name }}</template>
            <template slot="phone" slot-scope="phone">{{ phone }}</template>
            <template slot="identity" slot-scope="identity">{{identity}}</template>
            <template slot="orgOfficeName" slot-scope="orgOfficeName">{{orgOfficeName}}</template>
            <template slot="workingTime" slot-scope="workingTime">{{workingTime}}</template>
            <template slot="areasOfGoodCases" slot-scope="areasOfGoodCases">{{areasOfGoodCases}}</template>
            <template slot="goodCases" slot-scope="goodCases">{{goodCases}}</template>
            <template slot="applyDate" slot-scope="applyDate">{{applyDate}}</template>
            <template slot="gmtModify" slot-scope="gmtModify">{{gmtModify}}</template>
            <template slot="caseFileStatus" slot-scope="caseFileStatus">{{caseFileStatus}}</template>
          </a-table>
        </div>
        <!--服务商提交方案列表-->
        <div>
          <h3 class="title2">服务商提交方案列表</h3>
          <a-radio-group v-model="size" style="margin-bottom: 16px">
            <a-radio-button value="small"> 有效方案1 </a-radio-button>
            <a-radio-button value="default"> 末通过系统筛选2 </a-radio-button>
          </a-radio-group>
          <a-table v-bind="tableSource.submitPlanTable">
            <template slot="gmtCreate" slot-scope="gmtCreate">{{gmtCreate}}</template>
            <template slot="name" slot-scope="name">{{name}}</template>
            <template slot="phone" slot-scope="phone">{{phone}}</template>
            <template slot="identity" slot-scope="identity">{{identity}}</template>
            <template slot="orgOfficeName" slot-scope="orgOfficeName">{{orgOfficeName}}</template>
            <template slot="serviceTime" slot-scope="serviceTime">{{serviceTime}}</template>
            <template slot="aimBackPrice" slot-scope="aimBackPrice">{{aimBackPrice}}</template>
            <template slot="scheduleManagements" slot-scope="scheduleManagements">
              <p v-for="(item,index) in scheduleManagements" :key="index">{{item.dateMonth}}个月内完成{{item.dateMatters}}</p>
            </template>
            <template slot="caseFileAddress" slot-scope="caseFileAddress">{{caseFileAddress}}</template>
          </a-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//报名服务商表数据
const columns = [
  {
    title: "联络人",
    dataIndex: "name",
    width: 200,
    scopedSlots: { customRender: "name" },
  },
  {
    title: "联系方式",
    dataIndex: "phone",
    width: 200,
    scopedSlots: { customRender: "phone" },
  },
  {
    title: "服务商类型",
    dataIndex: "identity",
    width: 200,
    scopedSlots: { customRender: "identity" },
  },
  {
    title: "机构名称/挂靠律所",
    dataIndex: "orgOfficeName",
    width: 200,
    scopedSlots: { customRender: "orgOfficeName" },
  },
  {
    title: "从业不良时间",
    dataIndex: "workingTime",
    width: 200,
    scopedSlots: { customRender: "workingTime" },
  },
  {
    title: "擅长业务区域",
    dataIndex: "areasOfGoodCases",
    width: 200,
    scopedSlots: { customRender: "areasOfGoodCases" },
  },
  {
    title: "擅长业类型",
    dataIndex: "goodCases",
    width: 200,
    scopedSlots: { customRender: "goodCases" },
  },
  {
    title: "报名日期",
    dataIndex: "applyDate",
    sorter: true,
    width: 200,
    scopedSlots: { customRender: "applyDate" },
  },
  {
    title: "服务方案提交日期",
    dataIndex: "gmtModify",
    sorter: true,
    width: 200,
    scopedSlots: { customRender: "gmtModify" },
  },
  {
    title: "方案提交情况",
    dataIndex: "caseFileStatus",
    width: 200,
    scopedSlots: { customRender: "caseFileStatus" },
  },
];

//服务商提交方案表数据
const columns2 = [
  {
    title: "服务方案提交日期",
    dataIndex: "gmtCreate",
    width: 200,
    sorter: true, //排序
    scopedSlots: { customRender: "gmtCreate" },
  },
  {
    title: "联络人",
    dataIndex: "name",
    width: 200,
    scopedSlots: { customRender: "name" },
  },
  {
    title: "联系方式",
    dataIndex: "phone",
    width: 200,
    scopedSlots: { customRender: "phone" },
  },
  {
    title: "服务商类型",
    dataIndex: "identity",
    width: 200,
    scopedSlots: { customRender: "identity" },
  },
  {
    title: "机构名称/挂靠律所",
    dataIndex: "orgOfficeName",
    width: 200,
    scopedSlots: { customRender: "orgOfficeName" },
  },
  {
    title: "服务期限",
    dataIndex: "serviceTime",
    width: 200,
    scopedSlots: { customRender: "serviceTime" }
  },
  {
    title: "回款目标(万元)",
    dataIndex: "aimBackPrice",
    width: 200,
    scopedSlots: { customRender: "aimBackPrice" }
  },
  {
    title: "处置计划",
    dataIndex: "scheduleManagements",
    width: 200,
    scopedSlots: { customRender: "scheduleManagements" }
  },
  {
    title: "服务方案文档",
    dataIndex: "caseFileAddress",
    width: 200,
    scopedSlots: { customRender: "caseFileAddress" }
  },
];

const navData = [
  { id: 1, title: "招商管理", path: "/investment/list" },
  { id: 2, title: "招商项目管理", path: "/investment/list" },
  { id: 2, title: "招商项目详情", path: "" },
];
import Breadcrumb from "@/components/bread-crumb";
export default {
  name: "ItemDetail",
  data() {
    return {
      size: "small",
      navData,
      detailInfo: {
        alreadyCollectionStatus: "",
        amcProjectCollaterals: [
          {
            amcProjectId: 0,
            areaCode: 0,
            cityCode: 0,
            collateralName: "",
            collateralType: 0,
            gmtCreate: "",
            gmtDeleted: "",
            gmtModify: "",
            id: 0,
            isDeleted: "",
            provinceCode: 0,
          },
        ],
        amcProjectGuarantors: [
          {
            amcProjectId: 0,
            gmtCreate: "",
            gmtDeleted: "",
            gmtModify: "",
            guarantorCard: "",
            guarantorName: "",
            guarantorPhone: "",
            id: 0,
            isDeleted: "",
          },
        ],
        assetPackage: "",
        businessDepartmentRecoveryTime: 0,
        businessDepartmentTarget: 0,
        businessTeam: "",
        capitalOrg: "",
        capitalProfitOrg: "",
        capitalPurchaseTime: "",
        contact: "",
        deadline: "",
        debtCaptial: 0,
        debtInterest: 0,
        debtor: "",
        debtorStatus: "",
        disposeDescription: "",
        disposeDifficulty: "",
        guarantorStatus: "",
        id: 0,
        isHaveProxyLawyer: 0,
        isLawsuit: 0,
        judicialProcess: "",
        mortgagorStatus: "",
        projectManager: "",
        propertyClue: "",
        proxyLawyerContact: "",
        proxyLawyerName: "",
        proxyLimit: "",
        security: 0,
        submitDeadline: "",
        targetAmountLowerLimit: 0,
        targetYearUpperLimit: 0,
      },
      //table表格数据
      tableSource: {
        //报名服务商列表
        applyServeTable: {
          columns,
          dataSource: [
            {
              applyDate: "2021-01-05",
              areasOfGoodCases: "杭州市",
              caseFileStatus: 0,
              gmtModify: "2020-12-31",
              goodCases: "1",
              id: 0,
              identity: 0,
              name: "蔡徐坤",
              orgOfficeName: "阿里",
              phone: "123456",
              workingTime: 0,
            },
            {
              applyDate: "2021-01-05",
              areasOfGoodCases: "西湖区",
              caseFileStatus: 0,
              gmtModify: "2020-12-31",
              goodCases: "1",
              id: 0,
              identity: 0,
              name: "王千岁",
              orgOfficeName: "小米",
              phone: "6789876543",
              workingTime: 0,
            },
          ],
          pagination: {
            total: 40,
            pageSizeOptions: ["5", "10", "15", "20"],
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (val) => `共${val}条信息`,
          },
        },
        //服务方案提交列表
        submitPlanTable: {
          columns: columns2,
          dataSource: [
            {
              aimBackPrice: "111.11",
              aimBackPriceInvalid: 0,
              bidId: 0,
              caseFileAddress: "www.baidu.com",
              gmtCreate: "2021-01-05",
              id: 0,
              identity: 0,
              name: "武帅兴",
              orgOfficeName: "小米",
              phone: "1234345",
              projectId: 0,
              scheduleManagements: [
                {
                  amcBidId: 0,
                  amcServiceUserId: 0,
                  dateDay: "",
                  dateMatters: "短信催收",
                  dateMonth: 1,
                  gmtCreate: "",
                  gmtDelete: "",
                  gmtModify: "",
                  id: 0,
                  isDelete: "",
                },
                {
                  amcBidId: 0,
                  amcServiceUserId: 0,
                  dateDay: "",
                  dateMatters: "暴力催收",
                  dateMonth: 2,
                  gmtCreate: "",
                  gmtDelete: "",
                  gmtModify: "",
                  id: 0,
                  isDelete: "",
                }
              ],
              serviceTime: 0,
              serviceTimeInvalid: 0,
            },
            {
              aimBackPrice: "123.12",
              aimBackPriceInvalid: 0,
              bidId: 0,
              caseFileAddress: "www.baidu.com",
              gmtCreate: "2021-01-05",
              id: 0,
              identity: 0,
              name: "王千岁",
              orgOfficeName: "美团",
              phone: "543456",
              projectId: 0,
              scheduleManagements: [
                {
                  amcBidId: 0,
                  amcServiceUserId: 0,
                  dateDay: "",
                  dateMatters: "暴力催收",
                  dateMonth: 1,
                  gmtCreate: "",
                  gmtDelete: "",
                  gmtModify: "",
                  id: 0,
                  isDelete: "",
                },
                {
                  amcBidId: 0,
                  amcServiceUserId: 0,
                  dateDay: "",
                  dateMatters: "打死",
                  dateMonth: 2,
                  gmtCreate: "",
                  gmtDelete: "",
                  gmtModify: "",
                  id: 0,
                  isDelete: "",
                }
              ],
              serviceTime: 0,
              serviceTimeInvalid: 0,
            }
          ],
          pagination: {
            total: 40,
            pageSizeOptions: ["5", "10", "15", "20"],
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (val) => `共${val}条信息`,
          },
        },
      },
    };
  },
  components: {
    Breadcrumb,
  },
  created() {
    console.log(this.$route.query);
  },
  methods: {},
};
</script>

<style scoped lang="scss">
.detail-wrapper {
  padding: 16px;
  background-color: #fff;
  .detail-conten {
    padding-left: 8px;
    .title2 {
      margin-top: 24px;
      font-weight: bold;
    }
    .ant-row-flex {
      padding-left: 8px;
      margin-top: 24px;
      .ant-col {
        color: #666666;
        font-size: 14px;
        span {
          color: #333333;
        }
      }
    }
    .creditor-condition {
      padding-left: 8px;
      margin-top: 24px;
      color: #666666;
      font-size: 14px;
      span {
        color: #333333;
      }
    }
    .guarantee {
      display: flex;
      padding-left: 8px;
      margin-top: 24px;
    }
  }
}
.ant-radio-button-wrapper {
  margin: 10px;
  border-radius: 6px;
}
</style>
