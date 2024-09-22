<template>
  <div class="department">
    <page-search
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClcik"
    />
    <page-content
      :content-config="contentConfig"
      ref="contentRef"
      @new-click="handleNewBtnClick"
      @edit-click="handleEditBtnClick"
    >
      <template #parentId="scope">{{ mapParentIdToName(scope.row.parentId) }}</template>
    </page-content>
    <page-model :model-config="modelConfigRef" ref="modelRef" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import useMainStore from '@/stores/main/main'

import PageSearch from '@/components/page-search/page-search.vue'
import PageContent from '@/components/page-content/page-content.vue'
import PageModel from '@/components/page-model/page-model.vue'

import searchConfig from '../user/config/search-config'
import contentConfig from './config/content-config'
import modelConfig from './config/model-config'

import usePageContent from '@/hooks/usePageContent'
import usePageModel from '@/hooks/usePageModel'
import { storeToRefs } from 'pinia'

// modelConfig传入组件之前进行一些操作,动态的获取上级部门
// 获取departments数据
const mainStore = useMainStore()
const { entireDepartments } = storeToRefs(mainStore)

const modelConfigRef = computed(() => {
  const departments = entireDepartments.value.map((item) => {
    return { label: item.name, value: item.id }
  })

  // 加入到options中
  modelConfig.formItems.forEach((item: any) => {
    if (item.prop === 'parentId') {
      item.options = departments
    }
  })
  return modelConfig
})

// setup中相同逻辑的抽取:hooks
//点击search操作
const { contentRef, handleQueryClick, handleResetClcik } = usePageContent()

// 点击content的新建和编辑操作
const { modelRef, handleNewBtnClick, handleEditBtnClick } = usePageModel()

// 根据上级部门id返回上级部门名称
const mapParentIdToName = (parentId: number) => {
  for (const item of entireDepartments.value) {
    if (parentId === item.id) {
      return item.name
    }
  }
}
</script>

<style lang="less" scoped></style>
