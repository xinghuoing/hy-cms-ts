<template>
  <div class="category">
    <page-content
      :content-config="contentConfig"
      ref="contentRef"
      @new-click="handleNewBtnClick"
      @edit-click="handleEditBtnClick"
    />
    <page-model :model-config="modelConfig" ref="modelRef" />
  </div>
</template>

<script setup lang="ts">
import pageContent from '@/components/page-content/page-content.vue'
import pageModel from '@/components/page-model/page-model.vue'

import contentConfig from './config/content-config'
import modelConfig from './config/model-config'

import usePageContent from '@/hooks/usePageContent'
import usePageModel from '@/hooks/usePageModel'

// 从hooks中拿到对应操作的逻辑
const { contentRef } = usePageContent()
// 点击content的新建和编辑操作
const { modelRef, handleNewBtnClick, handleEditBtnClick } = usePageModel()
</script>

<style lang="less" scoped></style>
