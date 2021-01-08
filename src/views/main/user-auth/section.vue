<template>
  <div class="frame-wrapper">
    <Breadcrumb :source="navData" icon="environment">
      <template slot="suffix">
        <a-button class="addAccount" @click="handleSection('add')">
          <a-icon type="user"/>
          添加部门
        </a-button>
      </template>
    </Breadcrumb>
    <div class="frame-wrapper-content">
      <div class="frame-query">
        <a-form-model layout="inline">
          <a-form-model-item label="部门名称">
            <a-input v-model="queryParams.departmentName" placeholder="请输入部门姓名" class="custom-prefix-6"/>
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
          <a-tab-pane key="0" tab="正常部门"></a-tab-pane>
          <a-tab-pane key="1" tab="已删除部门"></a-tab-pane>
        </a-tabs>
        <div style="height: 4px"></div>
        <a-table :columns="column" :data-source="dataSource" size="middle" :pagination="pagination"
                 @change="handleTableChange" :row-key="record => record.id"
        >
          <template slot="auction" slot-scope="text,record">
            <a-button type="link" size="small" :style="{paddingLeft: 0}" @click="handleSection('edit',record)">编辑
            </a-button>
            <a-divider type="vertical"/>
            <a-button type="link" size="small" @click="handleDel(record.id)">删除</a-button>
          </template>
        </a-table>
      </div>
      <a-modal
          :title="`${modalSign === 'add' ?'新建':'编辑'}部门`"
          v-model="modalVisible"
          :destroyOnClose="true"
          dialogClass="section-modal"
          :maskClosable="false"
          @ok="handleSubmit"
          @cancel="()=> this.form.departmentName = ''"
      >
        <div class="section-modal-wrapper">
          <a-form-model
              ref="ruleForm"
              :model="form"
              :rules="rules"
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
          >
            <a-form-model-item label="部门名称" prop="departmentName">
              <a-input
                  v-model="form.departmentName"
                  placeholder="请输入部门名称"
              />
            </a-form-model-item>
          </a-form-model>
        </div>
      </a-modal>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/bread-crumb';
import {clearProto} from "@/plugin/tools";
import userAuthApi from '../../../plugin/api/user-auth';
import {SORTER_TYPE} from "./source";

const columnsNormal = [
  {
    title: '创建日期',
    dataIndex: 'gmtCreate',
    key: 'gmtCreate',
    sorter: true,
    customRender: val => val || '-',
  },
  {
    title: '部门名称',
    dataIndex: 'departmentName',
    key: 'departmentName',
    customRender: val => val || '-',
  },
  {
    title: '部门内账号数量',
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
    title: '删除日期',
    dataIndex: 'gmtDel',
    key: 'gmtDel',
    sorter: true,
    customRender: val => val || '-',
  },
  {
    title: '部门名称',
    dataIndex: 'departmentName',
    key: 'departmentName',
    customRender: val => val || '-',
  },
];

export default {
  name: 'Seciton',
  nameComment: '内部权限管理/部门管理',
  data() {
    return {
      modalVisible: false,
      modalSign: 'add',
      labelCol: {span: 5},
      wrapperCol: {span: 16},
      rules: {
        departmentName: [
          {required: true, message: '请输入部门名称'},
          {pattern: /^[\u4e00-\u9fa5a-zA-Z]+$/, message: "仅支持汉字和字母", trigger: 'blur'},
        ],
      },
      navData: [
        {id: 1, title: '内部权限管理', path: '/auth/role'},
        {id: 2, title: '部门管理', path: '/auth/section'},
      ],
      dataSource: [],
      queryParams: {
        isDeleted: '0', //是否删除（0-否、1-是），默认为0
        departmentName: '',
        page: 1,
        sortColumn: '', //排序字段
        sortOrder: '', //排序顺序
      },
      form: {
        departmentName: '',
        id: '',
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
    this.getTableList();
  },
  methods: {
    handleQuery(flag) {
      if (flag === 'reset') {
        this.queryParams.departmentName = ''
      }
      this.getTableList();
    },
    handleSection(sign, record) {
      if (sign === 'edit') {
        this.form.departmentName = record.departmentName;
        this.form.id = record.id;
      }
      this.modalVisible = true;
      this.modalSign = sign;
    },
    getTableList() {
      userAuthApi.getSectionList(this.queryParams).then((res) => {
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
        title: '确定删除此部门？',
        content: '删除部门会同时删除部门内所有账号，且部门删除后，不可恢复',
        onOk: () => {
          userAuthApi.removeSection({id}).then((res) => {
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
    handleSubmit(e) {
      e.preventDefault();
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          const params = clearProto(this.form);
          userAuthApi.addSection(params).then((res) => {
            if (res.code === 20000) {
              this.$message.success('保存成功');
              this.getTableList();
            } else {
              this.$message.warning(res.message);
            }
          }).finally(() => {
            this.form.departmentName = '';
            this.modalVisible = false
          });
        } else {
          return false;
        }
      });
    },
    handleTabChange(val) {
      this.queryParams.isDeleted = val;
      this.queryParams.departmentName = '';
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
}
</script>

<style scoped lang="scss">

</style>
