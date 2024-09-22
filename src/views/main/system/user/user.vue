<template>
  <div class="user">
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
    />
    <page-model :model-config="modelConfigRef" ref="modelRef" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import PageSearch from '@/components/page-search/page-search.vue'
import PageContent from '@/components/page-content/page-content.vue'
import pageModel from '@/components/page-model/page-model.vue'

import searchConfig from './config/search-config'
import contentConfig from './config/content-config'
import modelConfig from './config/model-config'

import usePageContent from '@/hooks/usePageContent'
import usePageModel from '@/hooks/usePageModel'

import useMainStore from '@/stores/main/main'
import { storeToRefs } from 'pinia'

// 先从store中拿到部门和角色数据
const mainStore = useMainStore()
const { entireRoles, entireDepartments } = storeToRefs(mainStore)

// 对modelConfig中的options添加对应部门和角色内容
const modelConfigRef = computed(() => {
  // 从角色数据中将角色对应的name和id生成新的数组且key换成label和value，这与select中el-option需要的值对应
  const roles = entireRoles.value.map((item) => {
    return { label: item.name, value: item.id }
  })
  const departments = entireDepartments.value.map((item) => {
    return { label: item.name, value: item.id }
  })

  modelConfig.formItems.forEach((item: any) => {
    if (item.prop === 'roleId') {
      item.options = roles
    }
    if (item.prop === 'departmentId') {
      item.options = departments
    }
  })

  return modelConfig
})

// 从hooks中拿到对应操作的逻辑
const { contentRef, handleQueryClick, handleResetClcik } = usePageContent()
// 点击content的新建和编辑操作
const { modelRef, handleNewBtnClick, handleEditBtnClick } = usePageModel()
</script>

<style lang="less" scoped>
.user {
  border-radius: 8px;
  overflow: hidden;
}
</style>
