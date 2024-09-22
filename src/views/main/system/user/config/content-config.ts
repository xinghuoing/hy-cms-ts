const contentConfig = {
  pageName: 'users',
  header: {
    title: '用户列表',
    btnTitle: '新建用户'
  },
  propsList: [
    { type: 'selection', label: '选择', width: '55px' },
    { type: 'index', label: '序号', width: '55px' },

    { type: 'normal', prop: 'name', label: '用户名', width: '140px' },
    { type: 'normal', prop: 'cellphone', label: '电话号码', width: '140px' },

    // { type: 'custom', prop: 'enable', label: '状态', width: '140px', slotName: 'enable' },

    // 自定义插槽对数据进行定制化
    // { type: 'custom', prop: 'leader', label: '部门领导', width: '140px', slotName: 'leader' },
    // { type: 'custom', prop: 'parentId', label: '上级部门', width: '140px', slotName: 'parentId' },

    { type: 'timer', prop: 'createAt', label: '创建时间' },
    { type: 'timer', prop: 'updateAt', label: '更新时间' },

    { type: 'handler', label: '操作', width: '180px' }
  ]
}

export default contentConfig
