<template>
  <div class="descriptions">
    <el-descriptions class="margin-top" :title="title" :column="column" border>
      <template v-for="(itemData, index) in tableDatas" :key="index">
        <el-descriptions-item>
          <template #label>{{ itemData.name }}</template>
          <el-tag size="small">{{ itemData.description }}</el-tag>
        </el-descriptions-item>
      </template>
    </el-descriptions>
  </div>
</template>

<script setup lang="ts">
interface IProps {
  title: string
  column: number
  tableDatas: any
}
defineProps<IProps>()
</script>

<style scoped>
.description {
  margin-bottom: 20px;
}
</style>
