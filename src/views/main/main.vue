<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isCollapse ? '60px' : '240px'">
        <main-menu :is-collapse="isCollapse" />
      </el-aside>
      <el-container>
        <el-header>
          <main-header @fold-change="foldChange" />
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import MainMenu from '@/components/main-menu/main-menu.vue'
import MainHeader from '@/components/main-header/main-header.vue'
import { ref } from 'vue'

const isCollapse = ref(false)
const foldChange = (isFold: boolean) => {
  isCollapse.value = isFold
}
</script>

<style lang="less" scoped>
.main {
  height: 100%;
}
.main-content {
  height: 100%;

  .el-aside {
    overflow-x: hidden;
    overflow-y: auto;
    line-height: 200px;
    text-align: left;
    cursor: pointer;
    background-color: #001529;
    transition: width 0.5s linear;
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .el-header {
    height: 48px !important;
  }

  .el-main {
    color: #333;
    // text-align: center;
    background-color: #f0f2f5;
  }
}
</style>
