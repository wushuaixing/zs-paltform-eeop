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
          <template slot="auction" slot-scope="text,record">
            <a-button type="link" size="small" :style="{paddingLeft: 0}" @click="handleAccount('edit',record)">编辑
            </a-button>
            <a-divider type="vertical"/>
            <a-button type="link" size="small">删除</a-button>
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
          <a-form-model-item ref="roleName" label="角色名称" prop="roleName">
            <a-input
                v-model="form.roleName"
                placeholder="请输入姓名"
            />
          </a-form-model-item>
          <div class="part-title">角色权限配置</div>
          <a-form-model-item prop="roleManage">
            <a-checkbox v-model="form.roleManage">
              服务商名单管理
            </a-checkbox>
          </a-form-model-item>
          <template v-if="form.roleManage">
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
          <a-form-model-item prop="orgManage">
            <a-checkbox v-model="form.orgManage">
              招商项目管理
            </a-checkbox>
          </a-form-model-item>
          <template v-if="form.orgManage">
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
      modalSign: 'add',
      modalVisible: false,
      navData: [
        {id: 1, title: '内部权限管理', path: '/auth/role'},
        {id: 2, title: '角色管理', path: '/provider/role'},
      ],
      dataSource: [],
      queryParams: {
        isDeleted: '0', //是否删除（0-否、1-是），默认为0
        roleName: '',
        page: 1,
        sortColumn: '', //排序字段
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
        roleManage: false,
        orgManage: false,
        projectManage: '',//项目管理权限（1：发布及进展管理，2：仅查看）
        roleName: '',
        exportPermission: '',//导出权限（1：有，2：无）
        managePermission: '',//管理权限（1：审核，2：仅查看）
        readScope: '' //查看范围（1：全阶段名单，2：仅入库名单）
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
  methods: {
    handleAccount(sign) {
      this.modalVisible = true;
      this.modalSign = sign;
    },
    getTableList() {
      userAuthApi.listRole(this.queryParams).then((res) => {
        console.log(res)
      })
    },
    handleSubmit(e) {
      e.preventDefault();
      const {roleManage, orgManage} = this.form;
      if (!(roleManage || orgManage)) {
        this.$message.warning('至少勾选1个模块')
      } else {
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            const {roleName,projectManage,exportPermission,managePermission,readScope} = clearProto(this.form);
            const params = {
              roleName,
              attractInvestmentManage:{
                projectManage,
              },
              serviceUserManage:{
                exportPermission,
                managePermission,
                readScope
              }
            };
            userAuthApi.saveRole(params).then((res)=>{
              console.log(res)
            })
          } else {
            return false;
          }
        });
      }
    },
    handleTabChange(val) {
      this.queryParams.isDeleted = val;
      // this.getTableList();
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
