<template>
  <div class="frame-wrapper">
    <Breadcrumb :source="navData" icon="environment"></Breadcrumb>
    <div class="frame-wrapper-content">
      <div class="frame-query">
        <a-form-model layout="inline" @submit="handleSubmit" @submit.native.prevent>
          <a-form-model-item label="角色名称">
            <a-input v-model="queryParams.name" placeholder="请输入姓名" class="custom-prefix-6"/>
          </a-form-model-item>
          <a-form-model-item>
            <a-button type="primary" html-type="submit">查询</a-button>
          </a-form-model-item>
          <a-form-model-item>
            <a-button >重置</a-button>
          </a-form-model-item>
        </a-form-model>
      </div>
      <div class="frame-content">
        <a-tabs @change="handleTabChange">
          <a-tab-pane key="1" tab="正常账号"></a-tab-pane>
          <a-tab-pane key="2" tab="已删除账号"></a-tab-pane>
        </a-tabs>
        <div style="height: 4px"></div>
        <a-table :columns="columns" :data-source="dataSource" size="middle" :pagination="pagination"
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

const columns = [
  {
    title: '角色信息',
    dataIndex: 'gmtCreate',
    key: 'gmtCreate',
  },
  {
    title: '创建日期',
    dataIndex: 'departmentName',
    key: 'departmentName',
    width: 80,
  },
  {
    title: '更新日期',
    dataIndex: 'roleName',
    key: 'roleName',
  },
  {
    title: '账号数',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '操作',
    dataIndex: 'auction',
    key: 'auction',
    scopedSlots: {customRender: 'auction'},
    width: 260,
  },
];

export default {
  name: 'Account',
  data() {
    return {
      navData: [
        {id: 1, title: '内部权限管理', path: '/auth/role'},
        {id: 2, title: '角色管理', path: '/provider/role'},
      ],
      columns,
      role: [
        {id: 1, lable: '招商项目运营'},
        {id: 2, lable: '招商项目评委'},
        {id: 3, lable: '服务商审核'},
        {id: 4, lable: '服务商运营'},
      ],
      department:[
        {id: 1, lable: '测试'},
        {id: 2, lable: 'UI'},
        {id: 3, lable: 'FE'},
        {id: 4, lable: '数据'},
      ],
      dataSource: [{
        departmentName: "测试部门",
        gmtCreate: "2020-12-01",
        gmtDeleted: "2020-12-30",
        id: 0,
        name: "张三",
        roleName: "xxx角色",
        username: "15578499",
      }, {
        departmentName: "开发部门",
        gmtCreate: "2020-12-02",
        gmtDeleted: "2020-12-30",
        id: 1,
        name: "张三",
        roleName: "xxx角色",
        username: "15578499",
      }, {
        departmentName: "测试部门",
        gmtCreate: "2020-12-30",
        gmtDeleted: "2020-12-30",
        id: 2,
        name: "张三",
        roleName: "xxx角色",
        username: "15578499",
      }],
      queryParams: {
        isDeleted: '', //是否删除（0-否、1-是），默认为0
        name: '',
        page: 1,
        // roleId: 1, //	角色ID
        sortColumn: '', //排序字段
        sortOrder: '', //排序顺序
        username: '', //账号
      },
      pagination: {},
      disabledDate,
    };
  },
  components: {
    Breadcrumb,
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      console.log(clearProto(this.queryParams));
    },
    handleTabChange(val) {
      console.log(val)
    },
    handleTableChange(ev) {
      console.log(ev);
    },
  },
}
</script>

<style scoped lang="scss">

</style>
