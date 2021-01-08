<template>
  <div class="frame-wrapper">
    <Breadcrumb :source="navData" icon="environment">
      <template slot="suffix">
        <a-button class="addAccount" @click="handleAccount('add')">
          <a-icon type="user"/>
          新建角色
        </a-button>
      </template>
    </Breadcrumb>
    <div class="frame-wrapper-content">
      <div class="frame-query">
        <a-form-model layout="inline">
          <a-form-model-item label="角色名称">
            <a-input v-model="queryParams.roleName" placeholder="请输入角色名称" class="custom-prefix-6"/>
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
          <a-tab-pane key="0" tab="正常角色"></a-tab-pane>
          <a-tab-pane key="1" tab="已删除角色"></a-tab-pane>
        </a-tabs>
        <div style="height: 4px"></div>
        <a-table :columns="column" :data-source="dataSource" size="middle" :pagination="pagination"
                 @change="handleTableChange" :row-key="record => record.id"
        >
          <template slot="auction" slot-scope="text,record">
            <a-button type="link" size="small" :style="{paddingLeft: 0}" @click="handleAccount('edit',record)">编辑
            </a-button>
            <a-divider type="vertical"/>
            <a-button type="link" size="small" @click="handleDel(record.id)" :disabled="Boolean(record.userCount)">删除
            </a-button>
          </template>
        </a-table>
      </div>
    </div>
    <a-modal
        :title="`${modalSign === 'add' ?'新增':'编辑'}角色`"
        v-model="modalVisible"
        :destroyOnClose="true"
        dialogClass="role-modal"
        :maskClosable="false"
        @ok="handleSubmit"
        @cancel="handleResetFields"
    >
      <div class="role-modal-wrapper">
        <a-form-model
            ref="ruleForm"
            :model="form"
            :rules="rules"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
        >
          <div class="part-title">角色名称</div>
          <a-form-model-item label="角色名称" prop="roleName">
            <a-input
                v-model="form.roleName"
                placeholder="请输入姓名"
            />
          </a-form-model-item>
          <div class="part-title">角色权限配置</div>
          <a-form-model-item prop="serviceUserManage">
            <a-checkbox v-model="form.serviceUserManage">
              服务商名单管理
            </a-checkbox>
          </a-form-model-item>
          <template v-if="form.serviceUserManage">
            <a-form-model-item label="管理权限" prop="managePermission">
              <a-radio-group v-model="form.managePermission">
                <a-radio value="1">
                  审核
                </a-radio>
                <a-radio value="2">
                  仅查看
                </a-radio>
              </a-radio-group>
            </a-form-model-item>
            <template v-if="form.managePermission === '2'">
              <a-form-model-item label="查看范围" prop="readScope">
                <a-radio-group v-model="form.readScope">
                  <a-radio value="1">
                    全阶段名单
                  </a-radio>
                  <a-radio value="2">
                    仅入库名单
                  </a-radio>
                </a-radio-group>
              </a-form-model-item>
            </template>
            <a-form-model-item label="导出权限" prop="exportPermission">
              <a-radio-group v-model="form.exportPermission">
                <a-radio value="1">
                  有
                </a-radio>
                <a-radio value="2">
                  无
                </a-radio>
              </a-radio-group>
            </a-form-model-item>
          </template>
          <a-form-model-item prop="attractInvestmentManage">
            <a-checkbox v-model="form.attractInvestmentManage">
              招商项目管理
            </a-checkbox>
          </a-form-model-item>
          <template v-if="form.attractInvestmentManage">
            <a-form-model-item label="服务项目查看" prop="projectManage">
              <a-radio-group v-model="form.projectManage">
                <a-radio value="1">
                  发布及进展管理
                </a-radio>
                <a-radio value="2">
                  仅查看
                </a-radio>
              </a-radio-group>
            </a-form-model-item>
          </template>
        </a-form-model>
      </div>
    </a-modal>
  </div>
</template>

<script>
import Breadcrumb from '@/components/bread-crumb';
import {clearProto, disabledDate} from "@/plugin/tools";
import userAuthApi from '../../../plugin/api/user-auth';
import {SORTER_TYPE} from "./source";

const columnsNormal = [
  {
    title: '角色名称',
    dataIndex: 'roleName',
    key: 'roleName',
    customRender: val => val || '-',
  },
  {
    title: '创建日期',
    dataIndex: 'gmtCreate',
    key: 'gmtCreate',
    sorter: true,
    customRender: val => val || '-',
  },
  {
    title: '更新日期',
    dataIndex: 'gmtModify',
    key: 'gmtModify',
    sorter: true,
    customRender: val => val || '-',
  },
  {
    title: '账号数',
    dataIndex: 'userCount',
    key: 'userCount',
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

const columnsDel = [
  {
    title: '角色名称',
    dataIndex: 'roleName',
    key: 'roleName',
    customRender: val => val || '-',
  },
  {
    title: '删除日期',
    dataIndex: 'gmtDelete',
    key: 'gmtDelete',
    sorter: true,
    customRender: val => val || '-',
  },
]

export default {
  name: 'Account',
  nameComment: '内部权限管理/账号管理',
  data() {
    return {
      modalSign: 'add',
      modalVisible: false,
      navData: [
        {id: 1, title: '内部权限管理', path: '/auth/role'},
        {id: 2, title: '角色管理', path: '/auth/role'},
      ],
      dataSource: [],
      queryParams: {
        isDeleted: '0', //是否删除（0-否、1-是），默认为0
        roleName: '',
        page: 1,
        sortColumn: 'DEFAULT', //排序字段
        sortOrder: '', //排序顺序
      },
      pagination: {
        current: 1,
        total: 1,
        showQuickJumper: true,
        showLessItems: true,
        size: 'middle',
        showTotal: val => `共${val}条信息`,
      },
      labelCol: {span: 5},
      wrapperCol: {span: 16},
      form: {
        serviceUserManage: false,
        attractInvestmentManage: false,
        projectManage: '',//项目管理权限（1：发布及进展管理，2：仅查看）
        roleName: '',
        exportPermission: '',//导出权限（1：有，2：无）
        managePermission: '',//管理权限（1：审核，2：仅查看）
        readScope: '',//查看范围（1：全阶段名单，2：仅入库名单）
        id: '',
      },
      rules: {
        roleName: [
          {required: true, message: '请输入角色名称'},
          {pattern: /^[\u4e00-\u9fa5a-zA-Z]+$/, message: "仅支持汉字和字母", trigger: 'blur'},
        ],
        projectManage: [
          {required: true, message: '请选择项目管理权限', trigger: 'change'},
        ],
        exportPermission: [
          {required: true, message: '请选择导出权限', trigger: 'change'},
        ],
        managePermission: [
          {required: true, message: '请选择管理权限', trigger: 'change'},
        ],
        readScope: [
          {required: true, message: '请选择查看范围', trigger: 'change'},
        ],
      },
      disabledDate,
    };
  },
  components: {
    Breadcrumb,
  },
  created() {
    this.getTableList();
  },
  methods: {
    handleResetFields() {
      this.form = {
        serviceUserManage: false,
        attractInvestmentManage: false,
        projectManage: '',
        roleName: '',
        exportPermission: '',
        managePermission: '',
        readScope: '',
        id: '',
      }
    },
    handleAccount(sign, record) {
      if (sign === 'edit') {
        userAuthApi.findConfig(record.id).then((res) => {
          if (res.code === 20000) {
            const data = res.data;
            this.form = {
              id: record.id,
              roleName: record.roleName,
              attractInvestmentManage: data.attractInvestmentManage,
              serviceUserManage: data.serviceUserManage,
              exportPermission: data.exportPermission && data.exportPermission.toString() || '',
              managePermission: data.managePermission && data.managePermission.toString() || '',
              readScope: data.readScope && data.readScope.toString() || '',
              projectManage: data.projectManage && data.projectManage.toString() || '',
            }
          }
        })
      }
      this.modalSign = sign;
      this.modalVisible = true;
    },
    getTableList() {
      userAuthApi.listRole(clearProto(this.queryParams)).then((res) => {
        if (res.code === 20000) {
          const data = res.data;
          this.dataSource = data.list;
          this.pagination.total = data.total;
        } else {
          this.$message.error(res.message)
        }
      })
    },
    handleDel(id) {
      this.$confirm({
        title: '确定删除这个角色吗？',
        content: '',
        onOk: () => {
          userAuthApi.deleteRole({id}).then((res) => {
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
    handleQuery(flag) {
      if (flag === 'reset') {
        this.queryParams.roleName = ''
      }
      this.getTableList();
    },
    handleSubmit(e) {
      e.preventDefault();
      const {serviceUserManage, attractInvestmentManage} = this.form;
      if (!(serviceUserManage || attractInvestmentManage)) {
        this.$message.warning('至少勾选1个模块')
      } else {
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            const {id, roleName, projectManage, exportPermission, managePermission, readScope} = clearProto(this.form);
            const params = {
              id,
              roleName,
              attractInvestmentManage: {
                projectManage,
              },
              serviceUserManage: {
                exportPermission,
                managePermission,
                readScope
              }
            };
            userAuthApi.saveRole(params).then((res) => {
              if (res.code === 20000) {
                this.$message.warning('保存成功');
                this.getTableList();
              } else {
                this.$message.warning(res.message);
              }
            }).finally(() => {
              this.handleResetFields();
              this.modalVisible = false
            });
          } else {
            return false;
          }
        });
      }
    },
    handleTabChange(val) {
      this.queryParams.isDeleted = val;
      this.queryParams.roleName = '';
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
  watch: {
    'form.attractInvestmentManage'() {
      if (!this.form.attractInvestmentManage) {
        this.form.projectManage = '';
      }
    },
    'form.serviceUserManage'() {
      if (!this.form.serviceUserManage) {
        this.form.exportPermission = '';
        this.form.managePermission = '';
        this.form.readScope = '';
      }
    },
  }
}
</script>

<style lang="scss">
.role-modal {
  width: 680px !important;

  .ant-modal-body {
    .role-modal-wrapper {
      .part-title {
        font-weight: bold;
        color: #333333;
        font-size: 16px;
        padding: 12px;
      }
    }
  }

  .ant-modal-footer {
    text-align: center;
  }
}
</style>
