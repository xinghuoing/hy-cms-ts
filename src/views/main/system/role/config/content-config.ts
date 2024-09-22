const contentConfig = {
  pageName: 'role',
  header: {
    title: '角色列表',
    btnTitle: '新建角色'
  },
  propsList: [
    { type: 'selection', label: '选择', width: '55px' },
    { type: 'index', label: '序号', width: '55px' },

    { type: 'normal', prop: 'name', label: '角色名称', width: '140px' },
    { type: 'normal', prop: 'intro', label: '角色权限', width: '140px' },

    // 自定义插槽对数据进行定制化
    // { type: 'custom', prop: 'leader', label: '部门领导', width: '140px', slotName: 'leader' },
    // { type: 'custom', prop: 'parentId', label: '上级部门', width: '140px', slotName: 'parentId' },

    { type: 'timer', prop: 'createAt', label: '创建时间' },
    { type: 'timer', prop: 'updateAt', label: '更新时间' },

    { type: 'handler', label: '操作', width: '180px' }
  ]
}

export default contentConfig
