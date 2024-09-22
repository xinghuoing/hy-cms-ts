<template>
  <div class="main-header">
    <div class="icon" @click="handerIconClick">
      <el-icon size="26px" v-if="!isFold"><Expand /></el-icon>
      <el-icon size="26px" v-else><Fold /></el-icon>
    </div>
    <div class="content">
      <div class="breadcrumb">
        <header-crumb />
      </div>
      <div class="info">
        <header-info />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import HeaderInfo from './cpns/header-info.vue'
import HeaderCrumb from './cpns/header-crumb.vue'

const emit = defineEmits(['foldChange'])

const isFold = ref(false)
const handerIconClick = () => {
  // 内部改变状态
  isFold.value = !isFold.value

  // 传递出去
  emit('foldChange', isFold.value)
}
</script>

<style lang="less" scoped>
.main-header {
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;

  .icon {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 18px;
  }
}
</style>
