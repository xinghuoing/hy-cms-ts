<template>
  <div class="header-info">
    <div class="opration">
      <span>
        <el-icon size="20px"><Message /></el-icon>
      </span>
      <span>
        <span class="dot"></span>
        <el-icon size="20px"><ChatDotRound /></el-icon>
      </span>
      <span>
        <el-icon size="20px"><Service /></el-icon>
      </span>
    </div>
    <div class="info">
      <el-dropdown>
        <span class="user-info">
          <div class="avatar">
            <el-avatar :size="34" :src="avatarImg" />
          </div>
          <span class="name">{{ loginStore.userInfo.name }}</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleExitClick">
              <el-icon><CircleClose /></el-icon>
              <span>退出系统</span>
            </el-dropdown-item>
            <el-dropdown-item divided>
              <el-icon><InfoFilled /></el-icon>
              <span>个人信息</span>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-icon><Edit /></el-icon>
              <span>修改密码</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import avatarImg from '@/assets/img/avatar.png'
import { LOGIN_TOKEN } from '@/global/constants'
import useLoginStore from '@/stores/login/login'
import { localCache } from '@/utils/cache'
import { useRouter } from 'vue-router'

const router = useRouter()
const loginStore = useLoginStore()

const handleExitClick = () => {
  localCache.removeCache(LOGIN_TOKEN)
  router.push('/login')
}
</script>

<style lang="less" scoped>
.header-info {
  display: flex;
  .opration {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    span {
      position: relative;
      width: 30px;
      margin: 0 3px;
      &:hover {
        background: #f2f2f2;
      }

      i {
        font-size: 20px;
      }

      .dot {
        display: inline-block;
        position: absolute;
        top: 2px;
        right: -4px;
        z-index: 10;
        width: 6px;
        height: 6px;
        border-radius: 100%;
        background-color: red;
        // border-radius: 50%;
      }
    }
  }

  .info {
    .user-info {
      display: flex;
      align-items: center;
      cursor: pointer;
      .avatar {
        padding: 0 10px;
        margin-left: 10px;
      }
    }
    // 去除点击avatar的黑边框
    :deep(.el-tooltip__trigger:focus-visible) {
      outline: unset;
    }
    // 设置avatar的menu样式
    :global(.el-dropdown-menu__item) {
      line-height: 30px !important;
      padding: 6px 20px;
    }
  }
}
</style>
