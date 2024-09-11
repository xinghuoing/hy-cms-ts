<template>
  <div class="login-panel">
    <!-- 顶部 -->
    <h1 class="title">泓源后台管理系统</h1>

    <!-- 内容 -->
    <div class="tabs">
      <el-tabs type="border-card" stretch v-model="activeName">
        <el-tab-pane label="账号登录" name="account">
          <template #label>
            <div class="label">
              <el-icon><UserFilled /></el-icon>
              <span class="text">账号登录</span>
            </div>
          </template>
          <!-- 账号密码在这个组件里面 -->
          <panel-account ref="panelAccountRef" />
        </el-tab-pane>
        <el-tab-pane label="手机登录" name="phone">
          <template #label>
            <div class="label">
              <el-icon><Cellphone /></el-icon>
              <span class="text">手机登录</span>
            </div>
          </template>
          <panel-phone />
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 底部 -->
    <div class="controls">
      <el-checkbox v-model="isRemPwd" label="记住密码" size="large" />
      <el-link href="/" type="primary">忘记密码</el-link>
    </div>
    <el-button class="login-btn" type="primary" size="large" @click="handleLoginBtnClick"
      >立即登录
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PanelAccount from './panel-account.vue'
import PanelPhone from './panel-phone.vue'

const activeName = ref('account')
const isRemPwd = ref(false)
const panelAccountRef = ref<InstanceType<typeof PanelAccount>>()

const handleLoginBtnClick = () => {
  if (activeName.value === 'account') {
    panelAccountRef.value?.loginAccount()
  } else {
    console.log('用户在手机登录')
  }
}
</script>

<style lang="less" scoped>
.login-panel {
  width: 330px;
  margin-bottom: 150px;

  .title {
    text-align: center;
    margin-bottom: 12px;
  }

  .label {
    display: flex;
    align-items: center;
    justify-content: center;

    .text {
      margin-left: 5px;
    }
  }

  .controls {
    margin-top: 12px;
    display: flex;
    justify-content: space-between;
  }

  .login-btn {
    margin-top: 10px;
    width: 100%;
  }
}
</style>
