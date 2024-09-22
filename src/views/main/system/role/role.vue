<template>
  <div class="role">
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
    <page-model :model-config="modelConfig" ref="modelRef" :other-info="otherInfo">
      <template #menuList>
        <el-tree
          ref="eltreeRef"
          :data="entireMenus"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleElTreeCheck"
        />
      </template>
    </page-model>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue'
import { storeToRefs } from 'pinia'
import type { ElTree } from 'element-plus'
import PageSearch from '@/components/page-search/page-search.vue'
import PageContent from '@/components/page-content/page-content.vue'
import PageModel from '@/components/page-model/page-model.vue'

import searchConfig from './config/search-config'
import contentConfig from './config/content-config'
import modelConfig from './config/model-config'

import usePageContent from '@/hooks/usePageContent'
import usePageModel from '@/hooks/usePageModel'
import useMainStore from '@/stores/main/main'
import { mapMenusToIds } from '@/utils/map-menus'

// 拿到全部菜单并且展示
const mainStore = useMainStore()
const { entireMenus } = storeToRefs(mainStore)

// 处理点击复选框的逻辑，并将数据与formData合并一起传入服务器
const otherInfo = ref({})

const handleElTreeCheck = (data1: any, data2: any) => {
  const menuList = [...data2.checkedKeys, ...data2.halfCheckedKeys]
  otherInfo.value = { menuList }
}

// 通过传入回调函数的方式拿到对应用户的数据（包括权限数据）进行回显
// 因为handleEditBtnClick封装成hook了，不好再直接修改
const eltreeRef = ref<InstanceType<typeof ElTree>>()
const newCallback = () => {
  nextTick(() => {
    eltreeRef.value?.setCheckedKeys([])
  })
}
const editCallback = (itemData: any) => {
  nextTick(() => {
    const menuIds = mapMenusToIds(itemData.menuList)
    eltreeRef.value?.setCheckedKeys(menuIds)
  })
}

//点击search操作
const { contentRef, handleQueryClick, handleResetClcik } = usePageContent()

// 点击content的新建和编辑操作
const { modelRef, handleNewBtnClick, handleEditBtnClick } = usePageModel(newCallback, editCallback)
</script>

<style lang="less" scoped></style>
