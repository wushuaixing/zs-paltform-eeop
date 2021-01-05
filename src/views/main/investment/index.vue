<template>
  <div>
    <Breadcrumb :source="navData" icon="environment">
      <template slot="suffix">
        <button @click="showModal" class="upProject">
          <a-icon type="snippets"/>
          项目上传
        </button>
      </template>
    </Breadcrumb>
    <div class="content">
      <!--收索框-->
      <a-row class="search_box" type="flex">
        <a-col :span="12">
          <a-input  v-model="debtorInquiry.debtorName" addon-before="债务人名称" style="width: 90%" placeholder="请输入债务人的名称"/>
        </a-col>
        <a-col :span="10">
          <span>报名截止日期：</span>
          <a-date-picker
              v-model="debtorInquiry.startValue"
              valueFormat="YYYY-MM-D"
          />
          <span style="margin: 0 6px">至</span>
          <a-date-picker
              v-model="debtorInquiry.endValue"
              format="YYYY-MM-DD"
          />
        </a-col>
        <a-col :span="2">
          <a-button @click="inquire" type="primary">查询</a-button>
        </a-col>
      </a-row>
      <!--展示招商项目表格-->
      <a-table  @change="changes" v-bind="tableSource">2
        <a slot="name" slot-scope="text">{{ text }}</a>
        <template slot="action" slot-scope="text,row">
          <span  style="color: #0A91B4;cursor:pointer;" @click="click(row)">查看详情</span>
        </template>
      </a-table>
    </div>
    <!--弹框对话框-->
    <div>
      <a-modal :centered="true" v-model="visible" title="发布新项目" @ok="handleOk">
        <div class="pop-up">
          <span>招商服务项目信息</span>
          <a-upload
              name="file"
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              :headers="headers"
              @change="handleChange"
              :beforeUpload="beforeUpload"
              accept="application/pdf,.doc,.docx,application/msword"
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
    width: 200,
  },
  {
    title: '债权利息(万元)',
    dataIndex: 'debtInterest',
    width: 200,
  },
  {
    title: '担保方式',
    dataIndex: 'address',
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
    dataIndex: 'address2',
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
    dataIndex: 'action',
    key: 'action',
    scopedSlots: {customRender: 'action'},
    width: 200,
  },
];
const data = [
  {
    key: '1',
    debtor: '浙江鲲田实业有限公司',
    debtCaptial: '6666666',
    debtInterest: 32,
    numsSignIn:6,
    numsSubmit:10,
    examine: '查看详情',
    address: 'New York No. 1 Lake Park, New York No. 1 Lake Park',
  },
];
const navData = [
  {id: 1, title: "招商管理", path: "/investment/list"},
  {id: 2, title: "招商项目管理", path: "/investment/list"},
];
export default {
  name: "Investment",
  data() {
    return {
      navData,
      debtorInquiry:{
        debtorName:null,
        startValue: null,
        endValue: null,
      },
      visible: false,
      tableSource:{
        columns,
        dataSource:[...data],
        pagination: {
          total: 40,
          pageSizeOptions: ['5', '10', '15', '20'],
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal:(val)=>`共${val}多少条`
        },
      },
      headers: {
        authorization: 'authorization-text',
        token: '',
      },

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
  methods: {
    inquire(){
      console.log(this.debtorInquiry)
    },
    changes(a, b, c) {
      console.log(a, b, c)
    },
    click(v) {
      this.$router.push({name: 'investment/item-detail', query: {id: 12321321}})
      console.log(v)
    },
    showModal() {
      this.visible = true;
    },
    handleOk(e) {
      console.log(e);
      this.visible = false;
    },
    beforeUpload(file, fileList) {
      console.log(file, fileList)
      // const  format1 = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      // const  format2 = "application/vnd.ms-excel";
      // if(file.type === format1 || file.type ===  format2){
      //   this.$message.success("上传成功");
      // }else {
      //   this.$message.error("格式不正确");
      // }
    },
    //上传文件
    handleChange(info) {
      if (info.file.status !== 'uploading') {
        // console.log(info.file, info.fileList);
        console.log(info.file)
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
</style>
