export const accountColumns = [
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
export const sectionNormalColumns = [
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
export const sectionDelColumns = [
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
export const roleNormalColumns = [
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
export const roleDelColumns = [
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

//排序 + 字段
export const SORTER_TYPE = {
    ascend: 'ASC',
    descend: 'DESC',
    gmtCreate: 'GMT_CREATE',
    gmtModify: 'GMT_MODIFIED',
    gmtDelete: 'GMT_DELETED',
    gmtDeleted: 'GMT_DELETED',
};