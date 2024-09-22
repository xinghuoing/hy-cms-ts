const searchConfig = {
  pageName: 'goods',
  formItems: [
    {
      type: 'input',
      label: '服装名称',
      prop: 'name',
      placeholder: '请输入要查询的服装名称'
    },
    {
      type: 'input',
      label: '商品类别',
      prop: 'categoryId',
      placeholder: '请输入商品类别'
    },
    {
      type: 'input',
      label: '原价',
      prop: 'oldPrice',
      placeholder: '请输入要查询的服装原价'
    },
    {
      type: 'input',
      label: '现价',
      prop: 'newPrice',
      placeholder: '请输入要查询的服装现价'
    },
    {
      type: 'input',
      prop: 'inventoryCount',
      label: '库存数',
      placeholder: '请输入要查询的库存数'
    },
    {
      type: 'input',
      prop: 'saleCount',
      label: '销售量',
      placeholder: '请输入要查询的销售量'
    },
    {
      type: 'input',
      prop: 'favorCount',
      label: '收藏个数',
      placeholder: '请输入要查询的收藏个数'
    },
    {
      type: 'input',
      label: '发货地',
      prop: 'address',
      placeholder: '请输入要查询的发货地'
    },
    {
      type: 'date-picker',
      label: '创建时间',
      prop: 'createAt'
    }
  ]
}

export default searchConfig
