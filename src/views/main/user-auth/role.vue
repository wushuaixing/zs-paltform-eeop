<template>
  <div class="frame-wrapper">
    <Breadcrumb :source="navData" icon="environment"></Breadcrumb>
    <div class="frame-wrapper-content">
      <div class="frame-query">
        <a-form-model layout="inline" @submit="handleSubmit" @submit.native.prevent>
          <a-form-model-item label="角色名称">
            <a-input v-model="queryParams.roleName" placeholder="请输入角色名称" class="custom-prefix-6"/>
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
          <a-tab-pane key="0" tab="正常角色"></a-tab-pane>
          <a-tab-pane key="1" tab="已删除角色"></a-tab-pane>
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
    title: '角色名称',
    dataIndex: 'roleName',
    key: 'roleName',
  },
  {
    title: '创建日期',
    dataIndex: 'gmtCreate',
    key: 'gmtCreate',
    sorter: true,
  },
  {
    title: '更新日期',
    dataIndex: 'gmtModify',
    key: 'gmtModify',
    sorter: true,
  },
  {
    title: '账号数',
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
    title: '角色名称',
    dataIndex: 'roleName',
    key: 'roleName',
  },
  {
    title: '删除日期',
    dataIndex: 'gmtDelete',
    key: 'gmtDelete',
    sorter: true,
  },
]

export default {
  name: 'Account',
  nameComment: '内部权限管理/账号管理',
  data() {
    return {
      navData: [
        {id: 1, title: '内部权限管理', path: '/auth/role'},
        {id: 2, title: '账号管理', path: '/provider/role'},
      ],
      dataSource: [{
        gmtDelete: "2020-12-01",
        gmtCreate: "2020-12-02",
        gmtModify: "2020-12-30",
        id: 0,
        roleName: "xxx角色",
        userCount: 34,
      }, {
        gmtDelete: "2020-12-03",
        gmtCreate: "2020-12-05",
        gmtModify: "2020-12-06",
        id: 1,
        roleName: "yyy角色",
        userCount: 34,
      }, {
        gmtDelete: "2020-12-01",
        gmtCreate: "2020-12-02",
        gmtModify: "2020-12-30",
        id: 2,
        roleName: "zzz角色",
        userCount: 34,
      }],
      queryParams: {
        isDeleted: '0', //是否删除（0-否、1-是），默认为0
        roleName: '',
        page: 1,
        sortColumn: '', //排序字段
        sortOrder: '', //排序顺序
      },
      pagination: {},
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
