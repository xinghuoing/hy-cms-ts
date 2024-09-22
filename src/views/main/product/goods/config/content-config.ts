const contentConfig = {
  pageName: 'goods',
  header: {
    title: '商品列表',
    btnTitle: '新建商品'
  },
  propsList: [
    { type: 'selection', label: '选择', width: '40px' },
    { type: 'index', label: '序号', width: '55px' },

    { type: 'normal', prop: 'name', label: '商品名称', width: '90px' },

    { type: 'custom', prop: 'categoryId', label: '商品类别', width: '90px', slotName: 'category' },

    { type: 'normal', prop: 'oldPrice', label: '原价', width: '60px' },
    { type: 'normal', prop: 'newPrice', label: '现价', width: '60px' },
    { type: 'normal', prop: 'inventoryCount', label: '库存数', width: '70px' },
    { type: 'normal', prop: 'saleCount', label: '销售量', width: '70px' },
    { type: 'normal', prop: 'favorCount', label: '收藏个数', width: '90px' },
    { type: 'normal', prop: 'address', label: '发货地', width: '70px' },
    // 自定义插槽对数据进行定制化
    { type: 'custom', prop: 'imgUrl', label: '图片', width: '130px', slotName: 'img' },
    // { type: 'custom', prop: 'parentId', label: '上级部门', width: '140px', slotName: 'parentId' },

    { type: 'timer', prop: 'createAt', label: '创建时间' },
    { type: 'timer', prop: 'updateAt', label: '更新时间' },

    { type: 'handler', label: '操作', width: '140px' }
  ]
}

export default contentConfig
