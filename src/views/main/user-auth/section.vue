<template>
  <div class="frame-wrapper">
    <Breadcrumb :source="navData" icon="environment"></Breadcrumb>
    <div class="frame-wrapper-content">
      <div class="frame-query">
        <a-form-model layout="inline" @submit="handleSubmit" @submit.native.prevent>
          <a-form-model-item label="姓名">
            <a-input v-model="queryParams.name" placeholder="请输入姓名" class="custom-prefix-6"/>
          </a-form-model-item>
          <a-form-model-item label="角色">
            <a-select
                v-model="queryParams.roleId"
                placeholder="请选择角色"
                style="width: 180px"
                allowClear
            >
              <a-select-option v-for="item in role" :key="item.id" :value="item.id">{{ item.lable }}</a-select-option>

            </a-select>
          </a-form-model-item>
          <a-form-model-item label="所属部门">
            <a-select
                v-model="queryParams.departmentId"
                placeholder="请选择所属部门"
                style="width: 180px"
                allowClear
            >
              <a-select-option v-for="item in department" :key="item.id" :value="item.id">{{ item.lable }}
              </a-select-option>

            </a-select>
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
          <a-tab-pane key="0" tab="正常账号"></a-tab-pane>
          <a-tab-pane key="1" tab="已删除账号"></a-tab-pane>
        </a-tabs>
        <div style="height: 4px"></div>
        <a-table :columns="column" :data-source="dataSource" size="middle" :pagination="pagination"
                 @change="handleTableChange" :row-key="record => record.id"
        >
          <template slot="auction">
            <a-button type="link" size="small" :style="{paddingLeft: 0}">编辑</a-button>
            <a-divider type="vertical"/>
            <a-button type="link" size="small">重置密码</a-button>
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
const columns = [
  {
    title: '所属部门',
    dataIndex: 'departmentName',
    key: 'departmentName',
  },
  {
    title: '角色',
    dataIndex: 'roleName',
    key: 'roleName',
  },
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '账号',
    dataIndex: 'username',
    key: 'username',
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
        gmtCreate: "2020-12-30",
        id: 0,
        userCount: 6,
      }],
      queryParams: {
        isDeleted: '0', //是否删除（0-否、1-是），默认为0
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
    getTableList(){
      userAuthApi.listUser(this.queryParams).then((res)=>{
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
      const flag = isDeleted === '0';
      const obj = {
        title: `${flag ? '创建' : '删除'}日期`,
        dataIndex: flag ? 'gmtCreate' : 'gmtDeleted',
        key: 'date',
      };
      return [obj, ...columns]
    },
  },
}
</script>

<style scoped lang="scss">

</style>
