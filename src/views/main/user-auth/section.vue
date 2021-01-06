<template>
  <div class="frame-wrapper">
    <Breadcrumb :source="navData" icon="environment"></Breadcrumb>
    <div class="frame-wrapper-content">
      <div class="frame-query">
        <a-form-model layout="inline" @submit="handleSubmit" @submit.native.prevent>
          <a-form-model-item label="部门名称">
            <a-input v-model="queryParams.departmentName" placeholder="请输入部门姓名" class="custom-prefix-6"/>
          </a-form-model-item>
          <a-form-model-item>
            <a-button type="primary" html-type="submit">查询</a-button>
          </a-form-model-item>
          <a-form-model-item>
            <a-button>重置</a-button>
          </a-form-model-item>
        </a-form-model>
      </div>
      <div class="frame-content">
        <a-tabs @change="handleTabChange">
          <a-tab-pane key="0" tab="正常部门"></a-tab-pane>
          <a-tab-pane key="1" tab="已删除部门"></a-tab-pane>
        </a-tabs>
        <div style="height: 4px"></div>
        <a-table :columns="column" :data-source="dataSource" size="middle" :pagination="pagination"
                 @change="handleTableChange" :row-key="record => record.id"
        >
          <template slot="auction">
            <a-button type="link" size="small" :style="{paddingLeft: 0}">编辑</a-button>
            <a-divider type="vertical"/>
            <a-button type="link" size="small">删除</a-button>
          </template>
        </a-table>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/bread-crumb';
import {clearProto, disabledDate} from "@/plugin/tools";
import userAuthApi from '../../../plugin/api/user-auth';

const columnsNormal = [
  {
    title: '创建日期',
    dataIndex: 'gmtCreate',
    key: 'gmtCreate',
    sorter: true,
  },
  {
    title: '部门名称',
    dataIndex: 'departmentName',
    key: 'departmentName',
  },
  {
    title: '部门内账号数量',
    dataIndex: 'userCount',
    key: 'userCount',
  },
  {
    title: '操作',
    dataIndex: 'auction',
    key: 'auction',
    scopedSlots: {customRender: 'auction'},
    width: 260,
  },
];
const columnsDel = [
  {
    title: '删除日期',
    dataIndex: 'gmtDel',
    key: 'gmtDel',
    sorter: true,
  },
  {
    title: '部门名称',
    dataIndex: 'departmentName',
    key: 'departmentName',
  },
];

export default {
  name: 'Seciton',
  nameComment: '内部权限管理/部门管理',
  data() {
    return {
      navData: [
        {id: 1, title: '内部权限管理', path: '/auth/role'},
        {id: 2, title: '账号管理', path: '/provider/role'},
      ],
      dataSource: [{
        departmentName: "测试部门",
        gmtCreate: "2020-12-08",
        gmtDel: "2020-12-30",
        id: 0,
        userCount: 6,
      },{
        departmentName: "前端部门",
        gmtCreate: "2020-12-13",
        gmtDel: "2020-12-02",
        id: 1,
        userCount: 8,
      }],
      queryParams: {
        isDeleted: '0', //是否删除（0-否、1-是），默认为0
        departmentName: '',
        page: 1,
        // roleId: 1, //	角色ID
        sortColumn: '', //排序字段
        sortOrder: '', //排序顺序
      },
      pagination:{
        current:1,
        total:1,
        showQuickJumper:true,
        showLessItems:true,
        size:'middle',
        showTotal:val=>`共${val}条信息`,
      },
      disabledDate,
    };
  },
  components: {
    Breadcrumb,
  },
  methods: {
    getTableList() {
      userAuthApi.listUser(this.queryParams).then((res) => {
        console.log(res)
      })
    },
    handleSubmit(e) {
      e.preventDefault();
      console.log(clearProto(this.queryParams));
    },
    handleTabChange(val) {
      this.queryParams.isDeleted = val;
      this.getTableList();
    },
    handleTableChange(ev) {
      console.log(ev);
    },
  },
  computed: {
    column: function () {
      const {isDeleted} = this.queryParams;
      if (isDeleted === '0') {
        return columnsNormal;
      } else {
        return columnsDel;
      }
    },
  },
}
</script>

<style scoped lang="scss">

</style>
