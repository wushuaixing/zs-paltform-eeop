<template>
  <div class="investment-detail-block">
    <Breadcrumb :source="navData" icon="environment" />
    <div class="detail-wrapper">
      <h2 class="title1">基本信息</h2>
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
              当前诉讼状态：<span>{{ detailInfo.isLawsuit|isLawsuitType }}</span>
            </a-col>
          </a-row>
          <a-row type="flex">
            <a-col :span="8">
              资产包名称：<span>{{ detailInfo.assetPackage }}</span>
            </a-col>
            <a-col :span="8">
              资产包收购时间：<span>{{ detailInfo.capitalPurchaseTime|show_ }}</span>
            </a-col>
            <a-col :span="8">
              担保方式：<span>{{ detailInfo.security|guarantyType}}</span>
            </a-col>
          </a-row>
          <a-row type="flex">
            <a-col :span="8">
              债务人名称：<span>{{ detailInfo.debtor }}</span>
            </a-col>
            <a-col :span="8"> 保证人：<span>{{detailInfo.amcProjectGuarantors|guarantorsList}}</span> </a-col>
          </a-row>
          <a-row type="flex">
            <a-col :span="8">
              债权本金：<span>{{ detailInfo.debtCaptial|amountTh }}万元</span>
            </a-col>
            <a-col :span="8">
              债权利息：<span>{{ detailInfo.debtInterest|amountTh }}万元</span>
            </a-col>
          </a-row>
          <div class="guarantee">
            抵押物类型：
            <div>
              <p style="margin:0" v-for="(i, index) in detailInfo.amcProjectCollaterals" :key="index">
                {{index+1}}. {{i.collateralType|collateralType}}、{{i|area}}、{{i.collateralName}}
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
              联系方式：<span>{{ detailInfo.contact|show_ }}</span>
            </a-col>
          </a-row>
        </div>
        <!--项目招商信息-->
        <div>
          <h3 @click="showModal" class="title2">项目招商信息 <a-icon type="form" /></h3>
          <a-row type="flex">
            <a-col :span="8">
              报名截止日期：<span>{{ detailInfo.deadline|show_ }}</span>
            </a-col>
            <a-col :span="8">
              方案提交截止日期：<span>{{ detailInfo.submitDeadline|show_ }}</span>
            </a-col>
          </a-row>
          <a-row type="flex">
            <a-col :span="8">
              期限上限：<span>{{ detailInfo.targetYearUpperLimit|show_ }}个月</span>
            </a-col>
            <a-col :span="8">
              目标回款金额下限：<span>{{
                detailInfo.targetAmountLowerLimit|amountTh
              }}万元</span>
            </a-col>
          </a-row>
        </div>
        <!--债权清收情况 -->
        <div>
          <h3 class="title2">债权清收情况</h3>
          <a-row type="flex">
            <a-col :span="8">
              是否有代理律师：<span>{{ detailInfo.isHaveProxyLawyer|show_ }}</span>
            </a-col>
            <a-col :span="8">
              代理律师联系方式：<span>{{ detailInfo.proxyLawyerContact|show_ }}</span>
            </a-col>
            <a-col :span="8">
              代理截止日期：<span>{{ detailInfo.proxyLimit|show_ }}</span>
            </a-col>
          </a-row>
          <a-row type="flex">
            <a-col :span="8">
              代理律师姓名：<span>{{ detailInfo.proxyLawyerName|show_ }}</span>
            </a-col>
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
          <h3 class="title-table">报名服务商列表</h3>
          <div class="table-block">
            <a-table v-bind="tableSource.applyServeTable" @change="applyServeTableChange">
              <template slot="name" slot-scope="name,row">
                <a-button type="link" @click="goAvatar(row.id)">{{ name|show_ }}</a-button>
              </template>
              <template slot="phone" slot-scope="phone">{{ phone|show_ }}</template>
              <template slot="identity" slot-scope="identity">{{identity|identityType}}</template>
              <template slot="orgOfficeName" slot-scope="orgOfficeName,row">
                <a-button v-if="orgOfficeName" type="link" @click="goAvatar(row.id)">{{orgOfficeName}}</a-button>
                <div v-else>-</div>
              </template>
              <template slot="workingTime" slot-scope="workingTime">{{workingTime|workingTimeText}}</template>
              <template slot="areasOfGoodCases" slot-scope="areasOfGoodCases">{{areasOfGoodCases|show_}}</template>
              <template slot="goodCases" slot-scope="goodCases">{{goodCases|goodCasesType}}</template>
              <template slot="applyDate" slot-scope="applyDate">{{applyDate|show_}}</template>
              <template slot="gmtModify" slot-scope="gmtModify">{{gmtModify|show_}}</template>
              <template slot="caseFileStatus" slot-scope="caseFileStatus">
                <div :style="{color:caseFileStatus===1?'#008CB0':''}">{{caseFileStatus|caseFileText}}</div>
              </template>
            </a-table>
          </div>
        </div>
        <!--服务商提交方案列表-->
        <div>
          <h3 class="title-table">服务商提交方案列表</h3>
          <a-radio-group @change="changType" v-model="params.caseType" style="margin-bottom: 16px">
            <a-radio-button :value="1"> 有效方案 </a-radio-button>
            <a-radio-button :value="2"> 末通过系统筛选2 </a-radio-button>
          </a-radio-group>
          <div class="table-block">
            <a-table v-bind="tableSource.submitPlanTable" @change="submitPlanTableChange">
              <template slot="gmtCreate" slot-scope="gmtCreate">{{gmtCreate|show_}}</template>
              <template slot="name" slot-scope="name,row">
                <a-button type="link" @click="goAvatar(row.id)">{{ name }}</a-button>
              </template>
              <template slot="phone" slot-scope="phone">{{phone|show_}}</template>
              <template slot="identity" slot-scope="identity">{{identity|identityType}}</template>
              <template slot="orgOfficeName" slot-scope="orgOfficeName,row">
                <a-button v-if="orgOfficeName" type="link" @click="goAvatar(row.id)">{{orgOfficeName}}</a-button>
                <div v-else>-</div>
              </template>
              <template slot="serviceTime" slot-scope="serviceTime,row">
                <div>{{serviceTime|show_}}个月</div>
                <div v-if="row.serviceTimeInvalid===1" class="tag">未达标</div>
              </template>
              <template slot="aimBackPrice" slot-scope="aimBackPrice,row">
                <div>{{aimBackPrice|amountTh}}</div>
                <div v-if="row.aimBackPriceInvalid===1" class="tag">未达标</div>
              </template>
              <template slot="scheduleManagements" slot-scope="scheduleManagements,row">
                <div :class="exhibit === row.id ? 'plans' : 'plan'" >
                  <p v-for="(item,index) in scheduleManagements" :key="index">{{item.dateMonth}}个月内完成{{item.dateMatters}}</p>
                </div>
                <span style="color: #008CB0; margin-left: 60%" @click="bit(row)" v-if="scheduleManagements.length >= 4" >{{exhibit === row.id ? '收起' :'展开'}}</span>
              </template>
              <template slot="caseFileAddress" slot-scope="caseFileAddress">
                <div v-if="caseFileAddress"><a href="#">服务方案.pdf</a></div>
                <div v-else>-</div>
              </template>
            </a-table>
          </div>
        </div>
      </div>
    </div>
    <div>
    <!-- 修改项目招商信息弹窗 -->
    <a-modal 
      v-model="visible" 
      title="修改项目招商信息" 
      @ok="handleOk" 
      dialogClass="edit-modal"
      :centered="true" 
      :maskClosable="false"
    >
      <a-form-model 
        :model="editInfo" 
        :label-col="labelCol"
        ref="ruleForm"
        :wrapper-col="wrapperCol"
        :rules="rules"
      >
        <a-form-model-item label="报名截止日期" prop="signDeadline">
          <a-date-picker
            class="editIpt"
            valueFormat="YYYY-MM-DD"
            v-model="editInfo.signDeadline"
            :disabled-date="disabledDate"
            :disabled="editInfo.signDeadline >= $moment().format('YYYY-MM-DD')?false:true"
          />
        </a-form-model-item>
        <a-form-model-item label="方案提交截止日期" prop="submitDeadline" >
          <a-date-picker
            class="editIpt"
            valueFormat="YYYY-MM-DD"
            v-model="editInfo.submitDeadline"
            :disabled-date="disabledDate"
          />
        </a-form-model-item>
        <a-form-model-item label="期限上限" prop="dateLimit">
          <div class="editIpt">
            <a-input-number class="numberIpt"  v-model="editInfo.dateLimit" :min="1"/>
            <span>个月</span>
          </div>
        </a-form-model-item>
        <a-form-model-item label="目标回款金额下限" prop="aimedPriceBack">
           <div class="editIpt">
             <a-input-number class="numberIpt" v-model="editInfo.aimedPriceBack" :min="1"  :precision="2"/>
             <span>万元</span>
           </div>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
  </div>
</template>

<script>
import {projectDetail,signService,serviceCaseSubmit,updateProjectInfo} from "@/plugin/api/investment-center";
import {collateralTypeData} from "./source"
import {getArea} from "@/plugin/tools"
import Breadcrumb from "@/components/bread-crumb";
import Vue from "vue"
import moment from "moment"
Vue.prototype.$moment = moment;
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
export default {
  name: "ItemDetail",
  data() {
    return {
      exhibit:false,
      visible:false,
      labelCol: { span: 8 },
      wrapperCol: { span: 14 },
      navData,
      editInfo:{
        aimedPriceBack: '',
        dateLimit: '',
        id: this.$route.query.id,
        signDeadline: '',
        submitDeadline: ''
      },
      rules:{
        aimedPriceBack:[
          {
            required:true,
            message:"请输入回款金额下限",
          }
        ],
        dateLimit:[
          {
            required:true,
            message:"请输入期限上限",

          }
        ],
        signDeadline:[
          {
            required:true,
            message:"请选择报名截止日期"
          }
        ],
        submitDeadline:[
          {
            required:true,
            message:"请选择方案提交截止日期"
          }
        ]
      },
      params:{
        caseType: 1,
        debtor: "",
        endDate: "",
        id: this.$route.query.id,
        page: 1,
        size: 10,
        sortField: 0,
        sortOrder: "",
        startDate: ""
      },
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
            guarantorName: "张三",
            guarantorPhone: "",
            id: 0,
            isDeleted: "",
          },
          {
            amcProjectId: 0,
            gmtCreate: "",
            gmtDeleted: "",
            gmtModify: "",
            guarantorCard: "",
            guarantorName: "李四",
            guarantorPhone: "",
            id: 0,
            isDeleted: "",
          }
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
        isLawsuit: 1,
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
              caseFileStatus: 1,
              gmtModify: "2020-12-31",
              goodCases: "1",
              id: 0,
              identity: 0,
              name: "蔡徐坤",
              orgOfficeName: "阿里",
              phone: "123456",
              workingTime: 1,
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
            pageSizeOptions: ["10", "20", "30", "40"],
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
              id: 1,
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
              id: 2,
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
                  dateMatters: "打死",
                  dateMonth: 2,
                  gmtCreate: "",
                  gmtDelete: "",
                  gmtModify: "",
                  id: 0,
                  isDelete: "",
                },
              ],
              serviceTime: 0,
              serviceTimeInvalid: 0,
            }
          ],
          pagination: {
            total: 40,
            pageSizeOptions: ["10", "20", "30", "40"],
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (val) => `共${val}条信息`,
          },
        },
      },
    };
  },
  methods: {
    bit(val){
      if(this.exhibit === val.id){
        this.exhibit = false
        return false
      }
      this.exhibit = val.id
      console.log(val)
    },
    //获取项目基本信息
    getProjectDetail(){
      projectDetail(this.params.id).then(res=>{
        console.log(res);
        if(res.code === 20000){
          this.editInfo.aimedPriceBack = res.data.targetAmountLowerLimit;
          this.editInfo.dateLimit = res.data.targetYearUpperLimit;
          this.editInfo.signDeadline = res.data.deadline;
          this.editInfo.submitDeadline = res.data.submitDeadline;
          this.detailInfo = res.data;
        }else{
          console.log('error...');
        }
      });
    },
    //获取报名服务商列表
    getSignServiceList(){
      signService(this.params).then(res=>{
        console.log(res);
        if(res.code === 20000){
          this.tableSource.applyServeTable.pagination.total = res.data.total;
          this.tableSource.applyServeTable.dataSource = res.data.list;
        }else{
          this.$message.error("获取报名服务商列表失败,请重新加载")
        }
      })
    },
    //获取服务商提交方案列表
    getServiceCaseSubmitList(){
      serviceCaseSubmit(this.params).then(res=>{
        console.log(res);
        if(res.code === 20000){
          this.tableSource.submitPlanTable.pagination.total = res.data.total;
          this.tableSource.submitPlanTable.dataSource = res.data.list;
        }else{
          this.$message.error("获取服务商提交方案列表失败,请重新加载")
        }
      })
    },
    //有效方案&未通过系统筛选切换
    changType(){
      this.getServiceCaseSubmitList();
    },
    goAvatar(v){
      console.log(v);
    },
    //报名服务商列表分页,排序操作
    applyServeTableChange(pagination, filters, sorter){
      this.params.page = pagination.current;
      this.params.size = pagination.pageSize;
      this.params.sortField = sorter.field;
      this.params.sortOrder = sorter.order
        ? sorter.order === "ascend"
          ? "ASC"
          : "DESC"
        : "";
      this.getSignServiceList();
    },
    //服务商提交方案列表分页,排序操作
    submitPlanTableChange(pagination, filters, sorter){
      this.params.page = pagination.current;
      this.params.size = pagination.pageSize;
      this.params.sortField = sorter.field;
      this.params.sortOrder = sorter.order
        ? sorter.order === "ascend"
          ? "ASC"
          : "DESC"
        : "";
      this.getServiceCaseSubmitList();
    },
    disabledDate(current) {
      return current && current < this.$moment().subtract(1, "days");
    },
    showModal(){
      this.visible = true;
    },
    handleOk(){
      this.$refs.ruleForm.validate( validate => {
        if(validate) {
          updateProjectInfo(this.editInfo).then(res=>{
            if(res.code === 20000) {
              this.$message.success("修改成功")
              this.visible = false;
              this.getProjectDetail()
              this.getServiceCaseSubmitList()
              this.getSignServiceList()
            }else{
              this.$message.error("修改失败")
            }
          })
        }else{
          return false;
        }
      })
    }
  },
  filters:{
    //没有值展示'-'
    show_(val){
      if(!val)return '-';
      return val;
    },
    guarantorsList: (arr = []) => {
      return arr.map((i) => i.guarantorName).join("、");
    },
    workingTimeText(val){
      let workingTimeObj = {
        0:'无',
        1:'一年以内',
        2:'1-3年',
        3:'3年以上'
      };
      return workingTimeObj[val];
    },
    goodCasesType(val){
      let goodCasesObj = {
        1:'工业',
        2:'商业',
        3:'住宅',
        0:'其他'
      };
      return goodCasesObj[val];
    },
    caseFileText(val){
      return val === 0 ? "未提交" : "已提交";
    },
    isLawsuitType(val){
      if(!val)return '-';
      let isLawsuitObj = {
        1:'未诉',
        2:'已诉未判决',
        3:'已判决未执行',
        4:'已执行',
        5:'破产'
      };
      return isLawsuitObj[val]
    },
    area:(params) => {
      return getArea(params.provinceCode,params.cityCode,params.areaCode);
    },
    collateralType:(val)=>{
      if(!val)return"-";
      return collateralTypeData.list.find(i=>val === i.value).label;
    }
  },
  components: {
    Breadcrumb,
  },
  created() {
    this.getProjectDetail();
    this.getSignServiceList();
    this.getServiceCaseSubmitList();
  },
};
</script>

<style scoped lang="scss">
.investment-detail-block{
  padding: 16px;
  .detail-wrapper {
    padding: 16px;
    background-color: #fff;
    .detail-conten {
      padding-left: 8px;
      .title2 {
        margin-top: 24px;
        font-weight: bold;
        color: #333333;
        font-size: 14px;
      }
      .title-table{
        margin-top: 24px;
        font-weight: bold;
        color: #333333;
        font-size: 16px;
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
  //我添加的样式
  .plans{
    white-space: nowrap;
    overflow:hidden;
    p{
      margin: 0;
      width: 200px;
      overflow: hidden;
      white-space: pre-wrap;
    }
    &::-webkit-scrollbar{
      width: 3px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 3px;
      background: #d9d9d9;
    }
    &::-webkit-scrollbar-track {
      display: none;
    }
  }
  .plan{
    max-height:60px;
    white-space: nowrap;
    overflow:hidden;
    p{
      margin: 0;
      width: 200px;
      overflow: hidden;
      white-space: pre-wrap;
    }
    &::-webkit-scrollbar{
      width: 3px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 3px;
      background: #d9d9d9;
    }
    &::-webkit-scrollbar-track {
      display: none;
    }
  }
  .ant-radio-button-wrapper {
    margin: 10px;
    border-radius: 2px;
  }
  .tag{
    width: fit-content;
    border-radius: 2px;
    border: 1px dashed #FAAD14;
    font-size: 12px;
    color: #FAAD14;
    padding: 0px 5px;
  }
}
.ant-form-horizontal{
  height: 230px;
}
</style>
<style lang="scss">
.table-block{
  table{
    border-bottom: 1px #E8E8E8 solid;
  }
  tr >td,tr >th{
		border-bottom: none;
  }
  tbody > tr{
    height: 80px;
  }
  tr:nth-child(2n){
    background: #FAFAFA;
  }
}
.title1{
  font-size: 16px;
  color: #333333;
  font-weight: 600;
}
.edit-modal{
  .ant-modal-body{
    padding: 0px;
    .ant-form-item{
      margin-top: 24px;
      height: 32px;
      .editIpt{
        width: 198px;
        height: 32px;
        line-height: 32px;
        position: relative;
        //background-color: pink;
        .numberIpt{
          width: 100%;
          height: 100%;
        }
        span{
          position: absolute;
          top: 2px;
          right: 4px;
          z-index: 100;
          background-color: #FFFFFF;
          height:28px;
          color: rgba(0, 0, 0, 0.25);
        }
      }
    }
  }
  .ant-modal-footer {
    text-align: center;
  }
  .ant-form-explain {
    text-align: left;
    font-size: 12px;
    font-weight: 400;
    color: #f5222d;
  }
}
</style>
