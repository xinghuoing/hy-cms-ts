<template>
  <div class="menu">
    <page-content
      :content-config="contentConfig"
      ref="contentRef"
      @new-click="handleNewBtnClick"
      @edit-click="handleEditBtnClick"
    />
  </div>
</template>

<script setup lang="ts">
import PageContent from '@/components/page-content/page-content.vue'
import contentConfig from './config/content-config'
import usePageContent from '@/hooks/usePageContent'
import usePageModel from '@/hooks/usePageModel'

//点击search操作
const { contentRef } = usePageContent()

// 点击content的新建和编辑操作
const { handleNewBtnClick, handleEditBtnClick } = usePageModel()
</script>

<style lang="less" scoped></style>
