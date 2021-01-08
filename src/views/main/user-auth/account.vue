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
        <a-form-model layout="inline">
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
              <a-select-option v-for="item in role" :key="item.id" :value="item.id">{{ item.value }}</a-select-option>

            </a-select>
          </a-form-model-item>
          <a-form-model-item label="所属部门">
            <a-select
                v-model="queryParams.departmentId"
                placeholder="请选择所属部门"
                style="width: 180px"
                allowClear
            >
              <a-select-option v-for="item in department" :key="item.id" :value="item.id">{{ item.value }}
              </a-select-option>

            </a-select>
          </a-form-model-item>
          <a-form-model-item>
            <a-button type="primary" @click="handleQuery('search')">查询</a-button>
          </a-form-model-item>
          <a-form-model-item>
            <a-button @click="handleQuery('reset')">重置</a-button>
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
            <a-button type="link" size="small" @click="handleResetPsd(record.id)">重置密码</a-button>
            <a-divider type="vertical"/>
            <a-button type="link" size="small" @click="handleDel(record.id)">删除</a-button>
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
        @cancel="handleResetFields('form')"
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
                {{ item.value }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item label="请选择角色" prop="roleId">
            <a-select v-model="form.roleId" placeholder="请选择角色">
              <a-select-option v-for="item in role" :value="item.id" :key="item.id">
                {{ item.value }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item ref="name" label="姓名" prop="name">
            <a-input
                v-model="form.name"
                placeholder="请输入姓名"
            />
          </a-form-model-item>
          <template>
            <template v-if="modalSign === 'add'">
              <a-form-model-item ref="username" label="账号" prop="username">
                <a-input
                    v-model="form.username"
                    placeholder="请输入账号"
                    @blur="handleAutoCompletePsw"
                    :maxLength="8"
                    style="width: 314px"
                />
              </a-form-model-item>
            </template>
            <template v-else>
              <a-form-model-item label="账号">
                {{ form.username }}
              </a-form-model-item>
            </template>
          </template>
          <template v-if="modalSign === 'add'">
            <a-form-model-item ref="password" label="密码" prop="password">
              <a-input
                  v-model="form.password"
                  placeholder="请输入密码"
                  :maxLength="20"
              />
            </a-form-model-item>
          </template>
        </a-form-model>
      </div>
    </a-modal>
  </div>
</template>

<script>
import Breadcrumb from '@/components/bread-crumb';
import {clearProto} from "@/plugin/tools";
import {encryptInfo} from "@/plugin/tools/encrypt";
import userAuthApi from '@/plugin/api/user-auth';
import {SORTER_TYPE} from "./source";

const columns = [
  {
    title: '所属部门',
    dataIndex: 'departmentName',
    key: 'departmentName',
    customRender: val => val || '-',
  },
  {
    title: '角色',
    dataIndex: 'roleName',
    key: 'roleName',
    customRender: val => val || '-',
  },
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    customRender: val => val || '-',
  },
  {
    title: '账号',
    dataIndex: 'username',
    key: 'username',
    customRender: val => val || '-',
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
        {id: 2, title: '账号管理', path: '/auth/account'},
      ],
      role: [],
      department: [],
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
      dataSource: [],
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
    };
  },
  components: {
    Breadcrumb,
  },
  created() {
    userAuthApi.getSectionListManagement().then((res) => {
      if (res.code === 20000) {
        this.department = res.data.length ? res.data : [];
      } else {
        this.$message.error(res.message);
      }
    });
    userAuthApi.getSimpleListUser().then((res) => {
      if (res.code === 20000) {
        this.role = res.data.length ? res.data : [];
      } else {
        this.$message.error(res.message);
      }
    });
    this.getTableList();
  },
  methods: {
    handleResetFields(flag) {
      if (flag === 'form') {
        this.form = {
          departmentId: undefined,
          roleId: undefined,
          name: '',
          username: '',
          password: '',
        }
      } else {
        this.queryParams = {
          isDeleted: '0',
          name: '',
          page: 1,
          roleId: undefined,
          departmentId: undefined,
          sortColumn: '',
          sortOrder: '',
          username: '',
        }
      }
    },
    handleAccount(sign, record) {
      if (sign === 'edit') {
        const obj = {
          ...this.form,
          departmentId: this.handleFindKey(record.departmentName, this.department),
          id: record.id,
          roleId: this.handleFindKey(record.roleName, this.role),
          username: record.username,
          name: record.name
        };
        this.form = obj;
      }
      this.modalVisible = true;
      this.modalSign = sign;
    },
    handleFindKey(val, arr) {
      if (!arr.length) return '';
      const list = arr.find(i => i.value === val);
      return list ? list.id : '';
    },
    getTableList() {
      userAuthApi.listUser(clearProto(this.queryParams)).then((res) => {
        if (res.code === 20000) {
          const data = res.data;
          this.dataSource = data.list;
          this.pagination.total = data.total;
        } else {
          this.$message.error(res.message)
        }
      })
    },
    handleSubmit(e) {
      e.preventDefault();
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          const params = clearProto(this.form);
          userAuthApi.saveUser(encryptInfo(params)).then((res) => {
            if (res.code === 20000) {
              this.$message.success('保存成功');
              this.getTableList();
            } else {
              this.$message.warning(res.message);
            }
          }).finally(() => {
            this.handleResetFields('form');
            this.modalVisible = false
          });
        } else {
          return false;
        }
      });
    },
    handleQuery(flag) {
      if (flag === 'reset') {
        this.handleResetFields('query');
      }
      this.getTableList();
    },
    handleDel(id) {
      this.$confirm({
        title: '确定删除账号？',
        content: '账号删除后，不可恢复',
        onOk: () => {
          userAuthApi.deleteUser({id}).then((res) => {
            if (res.code === 20000) {
              this.$message.success('删除成功');
              this.getTableList();
            } else {
              this.$message.error(res.message);
            }
          })
        },
      });
    },
    handleResetPsd(id) {
      this.$confirm({
        title: '确定重置密码？',
        content: '重置后用户的密码将变更为账号后6位',
        onOk: () => {
          userAuthApi.resetPassword({id}).then((res) => {
            if (res.code === 20000) {
              this.$message.success('重置密码成功');
              this.getTableList();
            } else {
              this.$message.error(res.message);
            }
          })
        },
      });
    },
    handleTabChange(val) {
      this.queryParams.isDeleted = val;
      this.getTableList();
    },
    handleTableChange(pgt, filters, sorter) {
      const params = {...this.queryParams};
      this.pagination.current = pgt.current;
      params.page = pgt.current;
      params.sortOrder = SORTER_TYPE[sorter.order];
      params.sortColumn = SORTER_TYPE[sorter.field];
      this.queryParams = params;
      this.getTableList();
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
        customRender: val => val || '-',
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
