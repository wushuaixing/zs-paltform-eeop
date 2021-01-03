<template>
  <div>
    <Breadcrumb :source="navData" icon="environment">
      <template slot="suffix">
        <button>
          <a-icon type="snippets"/>
          项目上传
        </button>
      </template>
    </Breadcrumb>
    <div class="content">
      <!--收索框-->
      <a-row type="flex">
        <a-col :span="12">
          <a-input placeholder="请输入债务人的名称"/>
        </a-col>
        <a-col :span="10">
          <span>报名截止日期:</span>
          <a-date-picker
              v-model="startValue"
              format="YYYY-MM-DD HH:mm:ss"
          />
          <span>至</span>
          <a-date-picker
              v-model="endValue"
              format="YYYY-MM-DD HH:mm:ss"
          />
        </a-col>
        <a-col :span="2">
          <a-button>查询</a-button>
        </a-col>
      </a-row>
      <!--展示招商项目管理-->
      <a-table :pagination="{
         total:40,
         pageSizeOptions:['5','10','15','20'],
         showSizeChanger:true,
         showQuickJumper:true
     }" @change="changes" :columns="columns" :data-source="data">
        <a slot="name" slot-scope="text">{{ text }}</a>
        <template slot="action" slot-scope="text,row">
          <span style="color: #0A91B4" @click="click(row)">查看详情</span>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/bread-crumb';
//提交代码
const columns = [
  {
    title: '债务人名字',
    dataIndex: 'name',
    key: 'name',
    width: 200,
  },
  {
    title: '债权人(万元)',
    dataIndex: 'age',
    width: 200,
  },
  {
    title: '债权利息(万元)',
    dataIndex: 'set',
    width: 200,
  },
  {
    title: '担保方式',
    dataIndex: 'address',
    width: 200,
  },
  {
    title: '项目发布日期',
    dataIndex: 'address1',
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
    dataIndex: 'address3',
    width: 200,
  },
  {
    title: '当前方案提交人数',
    dataIndex: 'address4',
    width: 200,
  },
  {
    title: '操作',
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
    address: 'New York No. 1 Lake Park, New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: '浙江混天1111',
    age: 42,
    address: 'London No. 2 Lake Park, London No. 2 Lake Park',
  },
  {
    key: '3',
    name: '浙江混天222',
    age: 32,
    address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',

  },
];

export default {
  name: "Investment",
  data() {
    return {
      navData: [
        {id: 1, title: "招商管理", path: "/investment/list"},
        {id: 2, title: "招商项目管理", path: "/investment/list"},
      ],
      data,
      columns,
      startValue: null,
      endValue: null,
    };
  },
  components: {
    Breadcrumb
  },
  watch: {
    startValue(val) {
      console.log('startValue', val);
    },
    endValue(val) {
      console.log('endValue', val);
    },
  },
  methods: {
    changes(a, b, c) {
      console.log(a, b, c)
    },
    click(v){
      this.$router.push('/investment/list/detail/' + 12321)
      console.log(v)
    }
  }
};
</script>

<style lang="scss" scoped>

.content {
  padding: 20px;
  background-color: #fff;
}

</style>
