<template>
  <div class="frame-wrapper">
    <Breadcrumb :source="navData" icon="environment">
      <template slot="suffix">
        <a-button @click="showModal" >
          <a-icon type="snippets"/>项目上传
        </a-button>
      </template>
    </Breadcrumb>
    <div class="content">
      <!--收索框-->
      <a-row class="search_box" type="flex" >
        <a-col :span="11">
          <a-input  v-model="findAll.debtor"  style="width: 90%" placeholder="请输入债务人的名称" class="custom-prefix-6">
            <template slot="prefix" >
              <div class="query-item-prefix">债务人名称</div>
            </template>
          </a-input>
        </a-col>
        <a-col :span="10">
          <span>报名截止日期：</span>
          <a-date-picker
              v-model="findAll.startDate"
              valueFormat="YYYY-MM-D"
              placeholder="搜索范围起始日期"
          />
          <span style="margin: 0 6px">至</span>
          <a-date-picker
              v-model="findAll.endDate"
              valueFormat="YYYY-MM-D"
              placeholder="搜索范围截止日期"
          />
        </a-col>
        <a-col :span="3" style="text-align: right" >
          <a-button class="reset-but" @click="reset" type="primary">重置</a-button>
          <a-button @click="inquire" type="primary">查询</a-button>
        </a-col>
      </a-row>
      <!--展示招商项目表格-->
      <a-table  @change="tableHanges" v-bind="tableSource" rowKey=id >
        <a slot="name" slot-scope="text">{{ text }}</a>
        <template slot="security" slot-scope="text,row">{{row.security|guarantyType}}</template>
        <template slot="debtCaptial" slot-scope="text,row">{{row.debtCaptial|amountTh}}</template>
        <template slot="debtInterest" slot-scope="text,row">{{row.debtInterest|amountTh}}</template>
        <template slot="action" slot-scope="text,row">
          <span class="table-view"  @click="viewDetails(row)">查看详情</span>
        </template>
      </a-table>
    </div>
    <!--弹框对话框文件上传https://www.mocky.io/v2/5cc8019d300000980a055e76-->
    <div>
      <a-modal :centered="true" v-model="visible" title="发布新项目" @ok="handleOk">
        <div class="pop-up">
          <span>招商服务项目信息</span>
          <a-upload
              name="file"
              action="/proxy-api/operator/project/importExcel"
              :headers="headers"
              @change="handleChange"
          >
            <a-button>
              <a-icon type="upload"/>
              点的上传
            </a-button>
          </a-upload>
          <a>导入模板下载</a>
        </div>
        <div class="caution">
          <span>*支持导入单笔及多笔招商服务项目；</span><br>
          <span>请保证招商服务项目信息满足模板要求；</span><br>
          <span>文件最大支持16M；</span><br>
          <span>支持拓展名.xls或.xlsx的文件</span>
        </div>
      </a-modal>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/bread-crumb';
import { projectFind } from "@/plugin/api/investment-center";
//提交代码
const columns = [
  {
    title: '债务人名字',
    dataIndex: 'debtor',
    key: 'name',
    width: 200,
  },
  {
    title: '债权人(万元)',
    dataIndex: 'debtCaptial',
    key: 'debtCaptial',
    scopedSlots: {customRender: 'debtCaptial'},
    width: 200,
  },
  {
    title: '债权利息(万元)',
    dataIndex: 'debtInterest',
    key: 'debtInterest',
    scopedSlots: {customRender: 'debtInterest'},
    width: 200,
  },
  {
    title: '担保方式',
    dataIndex: 'security',
    key: 'security',
    scopedSlots: {customRender: 'security'},
    width: 200,
  },
  {
    title: '项目发布日期',
    dataIndex: 'gmtCreate',
    sorter: true,//排序
    width: 200,
  },
  {
    title: '报名截止日期',
    dataIndex: 'deadline',
    sorter: true,//排序
    width: 200,
  },
  {
    title: '当前报名人数',
    dataIndex: 'numsSignIn',
    width: 200,
  },
  {
    title: '当前方案提交人数',
    dataIndex: 'numsSubmit',
    width: 200,
  },
  {
    title: '操作',
    dataIndex: 'id',
    key: 'action',
    scopedSlots: {customRender: 'action'},
    width: 200,
  },
];
// const data = [
//   {
//     id:12345,
//     debtor: '浙江鲲田实业有限公司',
//     debtCaptial: '6666666',
//     debtInterest: 32,
//     numsSignIn:6,
//     numsSubmit:10,
//     deadline:'2021-01-26',
//     examine: '查看详情',
//     security:1,//担保方式
//     gmtCreate:"2021-01-05"
//   }
// ];
const navData = [
  {id: 1, title: "招商管理", path: "/investment/list"},
  {id: 2, title: "招商项目管理", path: "/investment/list"},
];
export default {
  name: "Investment",
  data() {
    return {
      navData,
      visible: false,
      tableSource:{
        columns,
        dataSource:[],
        pagination: {
          total: 0,
          pageSizeOptions: [ '10', '20', '30',],
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal:(val)=>`共${val}多少条`
        },
      },
      headers: {
        authorization: 'authorization-text',
        token: window.localStorage.token,
      },
      findAll:{
        caseType: 1,
        debtor: "",
        endDate: "",
        id: "",
        page: 1,
        size: 10,
        sortField: 0,
        sortOrder: "",
        startDate: ""
      }
    };
  },
  components: {
    Breadcrumb
  },
  watch: {
    // startValue(val) {
    //   console.log('startValue', val);
    // },
    // endValue(val) {
    //   console.log('endValue', val);
    // },
  },
  created() {
    this.requestInquire()
  },
  methods: {
    //请求封装
    requestInquire(){
      projectFind(this.findAll).then((res)=>{
        console.log(res)
        if(res.code !== 20000 ) return this.$message.error('出问题了')
        this.tableSource.dataSource = res.data.list;
        this.tableSource.pagination.total = res.data.total;
      })
    },
    inquire(){
      this.requestInquire()
      console.log(this.findAll)
    },
    reset(){
      this.findAll.debtor = "";
      this.findAll.endDate = "";
      this.findAll.startDate = "";
      this.requestInquire()
    },
    tableHanges(pagination, filters, sorter,) {
      // console.log(pagination, filters, sorter,)
      //排序
      this.findAll.sortField = sorter.field === 'deadline' ? 1 : 2;
      this.findAll.sortOrder = sorter.order ? sorter.order === "ascend" ? "ASC" : "DESC" : "";
      this.findAll.page = pagination.current;
      this.findAll.size = pagination.pageSize;
      this.requestInquire()
    },
    viewDetails(v) {
      this.$router.push({name: 'investment/item-detail', query: {id: v.id}})
      console.log(v.id)
    },
    showModal() {
      this.visible = true;
    },
    handleOk(e) {
      console.log(e);
      this.visible = false;
    },
    //上传文件
    handleChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file.response)
      }
      // if (info.file.status === 'done') {
      //   this.$message.success(`${info.file.name} file uploaded successfully`);
      // } else if (info.file.status === 'error') {
      //   this.$message.error(`${info.file.name} file upload failed.`);
      // }
    },
  }
};
</script>

<style lang="scss" scoped>
.frame-wrapper{
  padding: 16px;
}
.upProject {
  width: 120px;
  height: 30px;
  background-color: #fff;
  border: #999999 1px solid;
  border-radius: 6px;
}
.search_box {
  margin: 20px 0;
}
.content {
  padding: 20px;
  background-color: #fff;
}
.pop-up {
  display: flex;
  align-items: center;
  button {
    margin: 0 10px;
  }
}
.caution {
  width: 260px;
  margin-top: 20px;
  margin-left: 50%;
  transform: translateX(-50%);
  color: #999999;
}
.table-view{
  color: #0A91B4;
  cursor:pointer;
}
.reset-but{
  margin-right: 16px;
  background-color: #fff;
  color: #666666;
  border: 1px solid #dddddd;
}
</style>
