const modelConfig: any = {
  pageName: 'goods',
  header: {
    newTitle: '新建商品',
    editTitle: '编辑商品'
  },
  formItems: [
    {
      type: 'input',
      label: '商品名称',
      prop: 'name',
      placeholder: '请输入商品名称'
    },
    {
      type: 'select',
      label: '商品类别',
      prop: 'categoryId',
      placeholder: '请输入商品类别',
      options: []
    },
    {
      type: 'input',
      label: '原价',
      prop: 'oldPrice',
      placeholder: '请输入原价'
    },
    {
      type: 'input',
      label: '现价',
      prop: 'newPrice',
      placeholder: '请输入现价'
    },
    {
      type: 'input',
      label: '库存数',
      prop: 'inventoryCount',
      placeholder: '请输入库存数'
    },
    {
      type: 'input',
      label: '销售量',
      prop: 'saleCount',
      placeholder: '请输入销售量'
    },
    {
      type: 'input',
      label: '收藏个数',
      prop: 'favorCount',
      placeholder: '请输入收藏个数'
    },
    {
      type: 'input',
      label: '发货地',
      prop: 'address',
      placeholder: '请输入发货地'
    },
    {
      type: 'custom',
      prop: 'customImg',
      slotName: 'uploadImg'
    }
  ]
}

export default modelConfig
