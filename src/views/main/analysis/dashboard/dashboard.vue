<template>
  <div class="dashboard">
    <!-- 顶部数据的展示 -->
    <div class="header">
      <el-row :gutter="10">
        <template v-for="item in amountList" :key="item">
          <el-col :span="6" :xs="24" :sm="12" :md="8" :lg="6">
            <count-cart v-bind="item" />
          </el-col>
        </template>
      </el-row>
    </div>

    <!-- 中间部分的图表 -->
    <el-row :gutter="10">
      <el-col :span="7">
        <chart-cart>
          <pie-echart :pie-data="showGoodsCategoryCount" />
        </chart-cart>
      </el-col>
      <el-col :span="10">
        <chart-cart>
          <map-echart :map-data="showGoodsAddressSale" />
        </chart-cart>
      </el-col>
      <el-col :span="7">
        <chart-cart>
          <rose-echart :rose-data="showGoodsCategorySale" />
        </chart-cart>
      </el-col>
    </el-row>

    <!-- 底部的图表 -->
    <el-row :gutter="10">
      <el-col :span="12">
        <chart-cart>
          <line-echart v-bind="showGoodsCategorySaleLine" />
        </chart-cart>
      </el-col>
      <el-col :span="12">
        <chart-cart>
          <bar-echart v-bind="showGoodCategoryFavor" />
        </chart-cart>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import useDashboardStore from '@/stores/main/analysis/dashboard'
import CountCart from './cpns/count-cart/count-cart.vue'
import ChartCart from './cpns/chart-cart/chart-cart.vue'
import { storeToRefs } from 'pinia'

import { PieEchart, LineEchart, RoseEchart, BarEchart, MapEchart } from '@/components/page-echarts'
import { computed } from 'vue'

// 1.发起请求
const dashboardStore = useDashboardStore()
dashboardStore.fetchDashboardDataAction()
// 2.拿到数据
const { amountList, goodCategoryCount, goodCategorySale, goodCategoryFavor, goodsAddressSale } =
  storeToRefs(dashboardStore)

// 3.对数据进行转化
const showGoodsCategoryCount = computed(() => {
  return goodCategoryCount.value.map((item) => ({
    name: item.name,
    value: item.goodsCount
  }))
})
const showGoodsAddressSale = computed(() => {
  return goodsAddressSale.value.map((item) => ({
    name: item.address,
    value: item.count
  }))
})
const showGoodsCategorySale = computed(() => {
  return goodCategorySale.value.map((item) => ({
    name: item.name,
    value: item.goodsSale
  }))
})
const showGoodsCategorySaleLine = computed(() => {
  const labels = goodCategorySale.value.map((item) => item.name)
  const values = goodCategorySale.value.map((item) => item.goodsSale)
  return { labels, values }
})
const showGoodCategoryFavor = computed(() => {
  const labels = goodCategoryFavor.value.map((item) => item.name)
  const values = goodCategoryFavor.value.map((item) => item.goodsFavor)
  return { labels, values }
})
</script>

<style lang="less" scoped>
.dashboard {
  .header {
    margin-bottom: 12px;
  }
}
</style>
