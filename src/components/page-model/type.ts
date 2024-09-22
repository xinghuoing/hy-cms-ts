export interface IModelProps {
  modelConfig: {
    pageName: string
    header: {
      newTitle: string
      editTitle: string
    }
    formItems: any[]
  }
  otherInfo?: any
  isSelectphoto?: boolean
}
