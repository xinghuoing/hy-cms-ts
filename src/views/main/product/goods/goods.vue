<template>
  <div class="goods">
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
      <template #category="scope"> {{ mapCategoryIdToName(scope.row.categoryId) }} </template>
      <template #img="scope">
        <el-image
          style="width: 90px; height: 90px"
          :src="scope.row.imgUrl"
          :preview-src-list="[scope.row.imgUrl]"
          :preview-teleported="true"
        />
      </template>
    </page-content>
    <page-model
      :model-config="modelConfigRef"
      ref="modelRef"
      @handle-submit="handleSubmit"
      :is-selectphoto="isSelectphoto"
    >
      <template #uploadImg>
        <el-upload
          ref="uploadRef"
          class="upload"
          :http-request="uploadSubmit"
          :auto-upload="false"
          :limit="1"
          :on-exceed="handleExceed"
          :on-change="handleChange"
          :on-remove="handleRemove"
        >
          <div class="text">图片</div>
          <template #trigger>
            <el-button size="small" type="primary">选取文件</el-button>
          </template>
        </el-upload>
      </template>
    </page-model>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import PageSearch from '@/components/page-search/page-search.vue'
import PageContent from '@/components/page-content/page-content.vue'
import PageModel from '@/components/page-model/page-model.vue'

import searchConfig from './config/search-config'
import contentConfig from './config/content-config'
import modelConfig from './config/model-config'

import usePageContent from '@/hooks/usePageContent'
import usePageModel from '@/hooks/usePageModel'

import type { ElUpload } from 'element-plus'
import axios from 'axios'
import useSystemStore from '@/stores/main/system/system'
import { storeToRefs } from 'pinia'
import useMainStore from '@/stores/main/main'

// 从hooks中拿到对应操作的逻辑
const { contentRef, handleQueryClick, handleResetClcik } = usePageContent()
// 点击content的新建和编辑操作
const { modelRef, handleNewBtnClick, handleEditBtnClick } = usePageModel()

// 1.将分类的categoryId转为分类的名称
// 1.1从mainStore中拿到category的数据
const mainStore = useMainStore()
const { entireCategories } = storeToRefs(mainStore)

const mapCategoryIdToName = (categoryId: number) => {
  for (const item of entireCategories.value) {
    if (item.id === categoryId) {
      return item.name
    }
  }
}
// 商品类别的设置
const modelConfigRef = computed(() => {
  const categoryName = entireCategories.value.map((item) => {
    return { label: item.name, value: item.id }
  })
  // 加入到options中
  modelConfig.formItems.forEach((item: any) => {
    if (item.prop === 'categoryId') {
      item.options = categoryName
    }
  })
  return modelConfig
})

// 2.重要：处理上传图片的逻辑
const systemStore = useSystemStore()
const { goodsId } = storeToRefs(systemStore)
// // 判断是新建的还是编辑传来的id
const currentGoodId = ref(0)
watch(goodsId, (newValue) => {
  currentGoodId.value = newValue
})
const uploadRef = ref<InstanceType<typeof ElUpload>>()
// 这里点击上传逻辑，要发送网络请求
const uploadSubmit = async (options: any) => {
  const formData = new FormData()
  formData.append('photo', options['file'])
  const result = await axios
    .post(`http://localhost:8880/upload/goods_photo/${currentGoodId.value}`, formData)
    .then(() => {
      // 2.新建和编辑成功后重新获取数据（刷新）
      systemStore.fetchPageListAction(modelConfig.pageName, { size: 10, offset: 0 })
    })
  return undefined
}
// 实现下面只显示一张图片
const handleExceed = (files: any) => {
  uploadRef.value!.clearFiles()
  uploadRef.value!.handleStart(files[0])
}
// 点击就把图片上传至服务器(手动上传)
const handleSubmit = (editGoodsId: number) => {
  //如果是新建editGoodsId为Undefined，编辑就传来了对应的id
  if (editGoodsId) {
    currentGoodId.value = editGoodsId
  }
  console.log(currentGoodId.value, editGoodsId)
  uploadRef.value!.submit()
}

// 给page-model传入是否勾上图片
const isSelectphoto = ref(false)
const handleChange = () => {
  isSelectphoto.value = true
}
const handleRemove = () => {
  isSelectphoto.value = false
}
</script>

<style lang="less" scoped>
.upload {
  display: flex;
}
.text {
  position: relative;
  right: 110px;
}
</style>
