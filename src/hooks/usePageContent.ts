import { ref } from 'vue'
import type PageContent from '@/components/page-content/page-content.vue'

function usePageContent() {
  const contentRef = ref<InstanceType<typeof PageContent>>()
  const handleQueryClick = (searchFrom: any) => {
    contentRef.value?.fetchPageListData(searchFrom)
  }
  const handleResetClcik = () => {
    contentRef.value?.fetchPageListData()
  }

  return { contentRef, handleQueryClick, handleResetClcik }
}

export default usePageContent
