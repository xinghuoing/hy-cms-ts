<template>
  <div class="main-menu">
    <div class="logo">
      <img class="img" src="@/assets/img/logo.svg" alt="logo" />
      <span class="title" v-show="!isCollapse">泓源后台管理系统</span>
    </div>
    <div class="menu">
      <el-menu
        :default-active="defaultActive"
        text-color="#b7bdc3"
        active-text-color="#fff"
        background-color="#001529"
        :collapse="isCollapse"
      >
        <template v-for="item in userMenus" :key="item.id">
          <el-sub-menu :index="String(item.id)">
            <template #title>
              <!-- 字符串el-icon-monitor -->
              <!-- 使用动态组件显示不同的图标 item.icon.split('el-icon-')[1]字符串截取[1]为右边的 -->
              <!-- 原本的用法<el-icon><UserFilled /></el-icon> -->
              <el-icon>
                <component :is="item.icon.split('el-icon-')[1]" />
              </el-icon>
              <span>{{ item.name }}</span>
            </template>

            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item :index="String(subitem.id)" @click="handleMenuItemClick(subitem)">
                {{ subitem.name }}
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import useLoginStore from '@/stores/login/login'
import { mapPathToMenu } from '@/utils/map-menus'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

defineProps({
  isCollapse: {
    type: Boolean,
    default: false
  }
})

const loginStore = useLoginStore()
// const { userMenus } = storeToRefs(loginStore)
const userMenus = loginStore.userMenus //这样拿store中的数据就不是响应式的了

// 处理菜单的点击
const router = useRouter()
const handleMenuItemClick = (item: any) => {
  router.push({
    path: item.url ?? '/not-found'
  })
}

// ElMenu的默认菜单
// 刷新的时候默认菜单是当前菜单，所以先拿到对应的route路径，拿路径去匹配菜单
// 拿到当前route
const route = useRoute()

// 重要：当路径改变时要重新计算对应的菜单和defaultActive默认活跃的菜单
const defaultActive = computed(() => {
  const pathMenu = mapPathToMenu(route.path, userMenus)
  return String(pathMenu.id)
})
</script>

<style lang="less" scoped>
.main-menu {
  height: 100%;
  background-color: #001529;
}
.logo {
  display: flex;
  height: 28px;
  padding: 12px 10px;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  .img {
    height: 100%;
    margin: 0 10px;
  }

  .title {
    margin-right: 10px;
    font-size: 16px;
    font-weight: 700;
    color: white;
  }
}

.el-menu {
  border-right: none;
  user-select: none;
}

.el-sub-menu {
  .el-menu-item {
    padding-left: 50px !important;
    background-color: #0c2135;
  }

  .el-menu-item:hover {
    color: #fff;
  }

  .el-menu-item.is-active {
    background-color: #0a60bd;
  }
}
</style>
