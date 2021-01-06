<template>
  <div class="frame-wrapper">
    <Breadcrumb :source="navData" icon="environment">
      <template slot="suffix">
        <a-button class="addAccount" @click="handleAccount('add')">
          <a-icon type="user"/>
          添加账号
        </a-button>
      </template>
    </Breadcrumb>
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
          <template slot="auction" slot-scope="text,record">
            <a-button type="link" size="small" :style="{paddingLeft: 0}" @click="handleAccount('edit',record)">编辑
            </a-button>
            <a-divider type="vertical"/>
            <a-button type="link" size="small">重置密码</a-button>
            <a-divider type="vertical"/>
            <a-button type="link" size="small">删除</a-button>
          </template>
        </a-table>
      </div>
    </div>
    <a-modal
        :title="`${modalSign === 'add' ?'添加':'编辑'}账号`"
        v-model="modalVisible"
        :destroyOnClose="true"
        dialogClass="account-modal"
        :maskClosable="false"
        @ok="handleSubmit"
    >
      <div class="account-modal-wrapper">
        <a-form-model
            ref="ruleForm"
            :model="form"
            :rules="rules"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
        >
          <a-form-model-item label="所属部门" prop="departmentId">
            <a-select v-model="form.departmentId" placeholder="请选择部门">
              <a-select-option v-for="item in department" :value="item.id" :key="item.id">
                {{ item.lable }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item label="请选择角色" prop="roleId">
            <a-select v-model="form.roleId" placeholder="请选择角色">
              <a-select-option v-for="item in role" :value="item.id" :key="item.id">
                {{ item.lable }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item ref="name" label="姓名" prop="name">
            <a-input
                v-model="form.name"
                placeholder="请输入姓名"
            />
          </a-form-model-item>
          <a-form-model-item ref="username" label="账号" prop="username">
            <a-input
                v-model="form.username"
                placeholder="请输入账号"
                @blur="handleAutoCompletePsw"
                :maxLength="8"
                style="width: 314px"
            />
          </a-form-model-item>
          <a-form-model-item ref="password" label="密码" prop="password">
            <a-input
                v-model="form.password"
                placeholder="请输入密码"
                :maxLength="20"
            />
          </a-form-model-item>
        </a-form-model>
      </div>
    </a-modal>
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
  name: 'Account',
  nameComment: '内部权限管理/账号管理',
  data() {
    return {
      modalVisible: false,
      modalSign: 'add',
      navData: [
        {id: 1, title: '内部权限管理', path: '/auth/role'},
        {id: 2, title: '账号管理', path: '/provider/role'},
      ],
      role: [
        {id: 1, lable: '招商项目运营'},
        {id: 2, lable: '招商项目评委'},
        {id: 3, lable: '服务商审核'},
        {id: 4, lable: '服务商运营'},
      ],
      department: [
        {id: 1, lable: '测试'},
        {id: 2, lable: 'UI'},
        {id: 3, lable: 'FE'},
        {id: 4, lable: '数据'},
      ],
      rules: {
        departmentId: [
          {required: true, message: '请输入所属部门'},
        ],
        roleId: [
          {required: true, message: '请输入角色'},
        ],
        name: [
          {required: true, message: '请输入姓名'},
          {pattern: /^[\u4e00-\u9fa5a-zA-Z]+$/, message: "仅支持汉字和字母", trigger: 'blur'},
        ],
        username: [
          {required: true, message: '请输入账号'},
          {min: 8, message: '账号格式不正确，需为8位数字工号', trigger: 'blur'},
          {pattern: /^\d+$/, message: '账号格式不正确，需为8位数字工号', trigger: 'blur'},
        ],
        password: [
          {required: true, message: '请输入密码'},
          {min: 6, max: 20, message: '密码长度需6-20位', trigger: 'blur'},
        ],
      },
      labelCol: {span: 5},
      wrapperCol: {span: 16},
      form: {
        departmentId: undefined,
        roleId: undefined,
        name: '',
        username: '',
        password: '',
      },
      dataSource: [{
        departmentName: "测试部门",
        gmtCreate: "2020-12-30",
        gmtDeleted: "2020-12-30",
        id: 2,
        name: "张三",
        roleName: "xxx角色",
        username: "15578499",
      }],
      queryParams: {
        isDeleted: '0', //是否删除（0-否、1-是），默认为0
        name: '',
        page: 1,
        roleId: undefined, //	角色ID
        departmentId: undefined,//部门ID
        sortColumn: '', //排序字段
        sortOrder: '', //排序顺序
        username: '', //账号
      },
      pagination: {
        current: 1,
        total: 1,
        showQuickJumper: true,
        showLessItems: true,
        size: 'middle',
        showTotal: val => `共${val}条信息`,
      },
      disabledDate,
    };
  },
  components: {
    Breadcrumb,
  },
  methods: {
    handleAccount(sign, record) {
      if (sign === 'edit') {
        const obj = {
          departmentId: record.departmentName,
          roleId: undefined,
          name: record.name,
          username: '',
          password: '',
        };
        this.form = obj;
      }
      this.modalVisible = true;
      this.modalSign = sign;
    },
    getTableList() {
      userAuthApi.listUser(this.queryParams).then((res) => {
        console.log(res)
      })
    },
    handleSubmit(e) {
      e.preventDefault();
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          const params = clearProto(this.queryParams);
          console.log(params);
          // userAuthApi.saveUser(params).then((res) => {
          //   console.log(res)
          // })
        } else {
          return false;
        }
      });
    },
    handleTabChange(val) {
      this.queryParams.isDeleted = val;
      // this.getTableList();
    },
    handleTableChange(ev) {
      console.log(ev);
    },
    handleAutoCompletePsw() {
      const username = this.form.username;
      if (/^\d{8}$/.test(username)) {
        let defautlPsw = username.length > 6 ? username.substring(username.length - 6) : username;
        this.form.password = defautlPsw;
      }
    }
  },
  computed: {
    column: function () {
      const {isDeleted} = this.queryParams;
      const flag = isDeleted === '0';
      const dynamicColumn = flag ? columns : columns.slice(0, 4);
      const obj = {
        title: `${flag ? '创建' : '删除'}日期`,
        dataIndex: flag ? 'gmtCreate' : 'gmtDeleted',
        key: 'date',
        sorter: true,
      };
      return [obj, ...dynamicColumn]
    },
  },
}
</script>

<style lang="scss">
.account-modal {
  .ant-modal-footer {
    text-align: center;
  }
}
</style>
