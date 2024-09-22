const modelConfig: any = {
  pageName: 'category',
  header: {
    newTitle: '新建商品分类',
    editTitle: '编辑商品分类'
  },
  formItems: [
    {
      type: 'input',
      label: '商品分类',
      prop: 'name',
      placeholder: '请输入商品分类'
    }
  ]
}

export default modelConfig
