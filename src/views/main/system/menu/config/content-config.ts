const contentConfig = {
  pageName: 'menu',
  header: {
    title: '菜单列表',
    btnTitle: '新建菜单'
  },
  propsList: [
    { prop: 'name', label: '菜单名称', width: '140px' },
    { prop: 'type', label: '级别', width: '60px' },
    { prop: 'url', label: '菜单url', width: '160px' },
    { prop: 'icon', label: '菜单icon', width: '140px' },
    { prop: 'permission', label: '权限', width: '170px' },

    { type: 'timer', prop: 'createAt', label: '创建时间' },
    { type: 'timer', prop: 'updateAt', label: '更新时间' }

    // { type: 'handler', label: '操作', width: '160px' }
  ],
  childrenTree: {
    rowKey: 'id',
    treeProps: {
      children: 'children'
    }
  }
}

export default contentConfig
