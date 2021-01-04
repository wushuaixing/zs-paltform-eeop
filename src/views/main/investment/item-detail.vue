<template>
  <div>
    <Breadcrumb :source="navData" icon="environment"/>
    <div class="detail-wrapper">
      <h2>基本信息</h2>
      <div class="detail-conten">
        <!-- 债权基本信息-->
        <div>
          <h3 class="title2">债权基本信息</h3>
          <a-row type="flex">
            <a-col :span="8" >
              资产包所属机构：<span>A结构</span>
            </a-col>
            <a-col :span="8" >
              资产包收益权所属机构：<span>A结构</span>
            </a-col>
            <a-col :span="8" >
              当前诉讼状态：<span>未诉</span>
            </a-col>
          </a-row>
          <a-row type="flex">
            <a-col :span="8" >
              资产包名称：<span>XXXXX的666户资产包</span>
            </a-col>
            <a-col :span="8" >
              资产包收购时间：<span>2020-09-25</span>
            </a-col>
            <a-col :span="8" >
              担保方式：<span>抵押+担保</span>
            </a-col>
          </a-row>
          <a-row type="flex">
            <a-col :span="8" >
              债务人名称：<span>浙江混天绫实业有限公司</span>
            </a-col>
            <a-col :span="8" >
              保证人：<span>张三、李四、王五</span>
            </a-col>
          </a-row>
          <a-row type="flex">
            <a-col :span="8" >
              债权本金：<span>781.4万元</span>
            </a-col>
            <a-col :span="8" >
              债权利息：<span>781.4万元</span>
            </a-col>
          </a-row>
          <div class="guarantee">
             <P>抵押物类型：</P>
             <div>
               <p>1. 住宅，浙江省杭州市西湖区，xxx位于浙江省杭州市西湖区紫金名门1幢203的面积为207㎡的住宅一套</p>
             </div>
          </div>
          <a-row type="flex">
            <a-col :span="8" >
              所属业务团队：<span>浙萧</span>
            </a-col>
            <a-col :span="8" >
              项目经理：<span>李经理</span>
            </a-col>
            <a-col :span="8" >
              联系方式：<span>135666666666</span>
            </a-col>
          </a-row>
        </div>
        <!--项目招商信息-->
        <div>
          <h3 class="title2">项目招商信息</h3>
          <a-row type="flex">
            <a-col :span="8" >
              报名截止日期：<span>2020-09-25</span>
            </a-col>
            <a-col :span="8" >
              方案提交截止日期：<span>2020-09-25</span>
            </a-col>
          </a-row>
          <a-row type="flex">
            <a-col :span="8" >
              期限上限：<span>3年</span>
            </a-col>
            <a-col :span="8" >
              目标回款金额下限：<span>81.6万</span>
            </a-col>
          </a-row>
        </div>
        <!--债权清收情况 -->
        <div>
          <h3 class="title2">债权清收情况</h3>
          <a-row type="flex">
            <a-col :span="8" >
              是否有代理律师：<span>2020-09-25</span>
            </a-col>
            <a-col :span="8" >
              代理律师联系方式：<span>2020-09-25</span>
            </a-col>
            <a-col :span="8" >
              代理截止日期：<span>2020-09-25</span>
            </a-col>
          </a-row>
          <a-row type="flex">
            <a-col :span="8" >
              代理律师姓名：<span>张律师</span>
            </a-col>
            <a-col :span="8" >
              目标汇款金额下限：<span>81.4万</span>
            </a-col>
          </a-row>
          <div class="creditor-condition">已请收情况：<span>这是一段描述</span></div>
          <div class="creditor-condition">司法进展情况：<span>这是一段描述</span></div>
          <div class="creditor-condition">财产线索情况：<span>这是一段描述</span></div>
          <div class="creditor-condition">处置简述：<span>这是一段描述</span></div>
          <a-row type="flex">
            <a-col :span="8" >
              业务部门计划清收目标：<span>100万元</span>
            </a-col>
            <a-col :span="8" >
              业务部门计划清收时间：<span>12月</span>
            </a-col>
          </a-row>
          <div class="creditor-condition">处置难点：<span>这是一段描述</span></div>
          <div class="creditor-condition">债务人现状：<span>这是一段描述</span></div>
          <div class="creditor-condition">保证人现状：<span>这是一段描述</span></div>
          <div class="creditor-condition">抵质押人现状：<span>这是一段描述</span></div>
        </div>
        <!--报名服务商列表-->
        <div>
          <h3 class="title2">报名服务商列表2</h3>
          <a-table :pagination="{
         total:40,
         pageSizeOptions:['5','10','15','20'],
         showSizeChanger:true,
         showQuickJumper:true
     }"  :columns="columns" :data-source="data">
            <a slot="name" slot-scope="text">{{ text }}</a>
          </a-table>
        </div>
        <!--服务商提交方案列表-->
        <div>
          <h3 class="title2">服务商提交方案列表</h3>
<!--          <button class="scheme-but">有效方案1</button>-->
<!--          <button class="scheme-but">末通过系统筛选2</button>-->
          <a-radio-group v-model="size" style="margin-bottom: 16px">
            <a-radio-button value="small">
              有效方案1
            </a-radio-button>
            <a-radio-button value="default">
              末通过系统筛选2
            </a-radio-button>
          </a-radio-group>
          <a-table :pagination="{
         total:40,
         pageSizeOptions:['5','10','15','20'],
         showSizeChanger:true,
         showQuickJumper:true
     }"  :columns="columns2" :data-source="data2">
            <a slot="name" slot-scope="text">{{ text }}</a>
          </a-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//表名服务商表数据
const columns = [
  {
    title: '联络人',
    dataIndex: 'name',
    key: 'name',
    width: 200,
  },
  {
    title: '联系方式',
    dataIndex: 'age',
    width: 200,
  },
  {
    title: '服务商类型',
    dataIndex: 'set',
    width: 200,
  },
  {
    title: '机构名称/挂靠律所',
    dataIndex: 'address',
    width: 200,
  },
  {
    title: '从业不良时间',
    dataIndex: 'address1',
    sorter: true,//排序
    width: 200,
  },
  {
    title: '擅长业务区域',
    dataIndex: 'address2',
    sorter: true,//排序
    width: 200,
  },
  {
    title: '擅长业类型',
    dataIndex: 'address3',
    width: 200,
  },
  {
    title: '报名日期',
    dataIndex: 'address4',
    width: 200,
  },
  {
    title: '服务方案提交日期',
    dataIndex: 'address5',
    width: 200,
  },
  {
    title: '方案提交情况',
    dataIndex: 'action',
    key:'action',
    scopedSlots:{customRender: 'action'},
    width: 200,
  },
];
const data = [
  {
    key: '1',
    name: '浙江鲲田实业有限公司',
    set: '6666666',
    age: 32,
    examine:'查看详情',
    address: ' 1 Lake Park',
  },
  {
    key: '2',
    name: '浙江混天1111',
    age: 42,
    address: ' 2 Lake Park',
  },
  {
    key: '3',
    name: '浙江混天222',
    age: 32,
    address: ' 1 Lake Park',
  },
];

//服务商提交方案表数据
const columns2 = [
  {
    title: '服务方案提交日期',
    dataIndex: 'name',
    key: 'name',
    width: 200,
    sorter: true,//排序
  },
  {
    title: '联络人',
    dataIndex: 'age',
    width: 200,
  },
  {
    title: '联系方式',
    dataIndex: 'set',
    width: 200,
  },
  {
    title: '服务商类型',
    dataIndex: 'address',
    width: 200,
  },
  {
    title: '机构名称/挂靠律所',
    dataIndex: 'address1',
    width: 200,
  },
  {
    title: '服务期限',
    dataIndex: 'address2',
    width: 200,
  },
  {
    title: '回款目标(万元)',
    dataIndex: 'address3',
    width: 200,
  },
  {
    title: '处置计划',
    dataIndex: 'address4',
    width: 200,
  },
  {
    title: '服务方案文档',
    dataIndex: 'address5',
    width: 200,
  },
];
const data2 = [
  {
    key: '1',
    name: '浙江鲲田实业有限公司',
    set: '6666666',
    age: 32,
    examine:'查看详情',
    address: ' 1 Lake Park',
  },
  {
    key: '2',
    name: '浙江混天1111',
    age: 42,
    address: ' 2 Lake Park',
  },
  {
    key: '3',
    name: '浙江混天222',
    age: 32,
    address: ' 1 Lake Park',
  },
];

const navData = [
  {id:1,title:'招商管理',path:'/investment/list'},
  {id:2,title:'招商项目管理',path:'/investment/list'},
  {id:2,title:'招商项目详情',path:''},
];
import Breadcrumb from '@/components/bread-crumb';
export default {
  name: 'ItemDetail',
  data() {
    return {
      data,
      columns,
      columns2,
      data2,
      navData,
      size: 'small',
    };
  },
  components:{
    Breadcrumb
  },
  created() {
    console.log(this.$route.query)
  },
  methods:{

  }
}
</script>

<style scoped lang="scss">
.detail-wrapper{
  padding: 16px;
  background-color: #fff;
  .detail-conten{
    padding-left: 8px;
    .title2{
      margin-top: 24px;
      font-weight: bold;
    }
    .ant-row-flex{
       padding-left:8px ;
       margin-top: 24px ;
       .ant-col{
         color: #666666;
         font-size: 14px;
         span{
         color: #333333;
         }
       }
     }
    .creditor-condition{
      padding-left:8px ;
      margin-top: 24px ;
      color: #666666;
      font-size: 14px;
      span{
        color: #333333;
      }
    }
    .guarantee{
      display: flex;
      padding-left:8px ;
      margin-top: 24px ;
    }
  }
}
.ant-radio-button-wrapper{
  margin: 10px;
  border-radius: 6px;
}
</style>
