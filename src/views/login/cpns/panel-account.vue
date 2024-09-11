<template>
  <div class="panel-account">
    <el-form :model="account" label-width="60px" :rules="accountRules" ref="formRef">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { ElForm, FormRules } from 'element-plus'
import useLoginStore from '@/stores/login/login'

const account = reactive({
  name: '',
  password: ''
})

// 校验规则
const accountRules = reactive<FormRules>({
  name: [
    { required: true, message: '必须输入账号信息', trigger: 'blur' },
    { min: 6, max: 20, message: '长度必须为6~20位', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '必须输入密码', trigger: 'blur' },
    { pattern: /^[a-z0-9]{6,}$/, message: '密码必须为6位以上', trigger: 'blur' }
  ]
})

// 执行登录逻辑
const formRef = ref<InstanceType<typeof ElForm>>()
const loginStore = useLoginStore()
const loginAccount = () => {
  // 验证账号密码是否符合规则
  formRef.value?.validate((valid) => {
    if (valid) {
      // 1.获取账号密码
      const name = account.name
      const password = account.password

      // 2.发送网络请求登录(携带上账号密码)
      loginStore.loginAccountAction({ name, password })
    } else {
      ElMessage.error('请输入正确的格式后再尝试')
    }
  })
}

defineExpose({
  loginAccount
})
</script>

<style lang="less" scoped></style>
