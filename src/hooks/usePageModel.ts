import { ref } from 'vue'
import type PageModel from '@/components/page-model/page-model.vue'

function usePageModel(newCallback?: () => void, editCallback?: (data: any) => void) {
  const modelRef = ref<InstanceType<typeof PageModel>>()
  const handleNewBtnClick = () => {
    modelRef.value?.setModelVisible()
    if (newCallback) newCallback()
  }
  const handleEditBtnClick = (itemData: any) => {
    modelRef.value?.setModelVisible(false, itemData)
    if (editCallback) editCallback(itemData)
  }

  return { modelRef, handleNewBtnClick, handleEditBtnClick }
}

export default usePageModel
