<template>
  <div class="search" v-if="isQuery">
    <el-form :model="searchForm" ref="formRef" label-width="80px" size="large">
      <el-row :gutter="10">
        <template v-for="item in searchConfig.formItems" :key="item.prop">
          <el-col :span="8" :xs="24" :sm="24" :md="12" :lg="8">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input
                  v-model="searchForm[item.prop]"
                  :placeholder="item.placeholder"
                ></el-input>
              </template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  v-model="searchForm[item.prop]"
                  type="daterange"
                  range-separator="To"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  size="large"
                />
              </template>
              <template v-if="item.type === 'select'">
                <el-select v-model="searchForm[item.prop]" :placeholder="item.placeholder">
                  <template v-for="option in item.options" :key="option.value">
                    <el-option :label="option.lable" :value="option.value" />
                  </template>
                </el-select>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="btns">
      <el-button size="large" icon="refresh" @click="handleResetClick">重置</el-button>
      <el-button type="primary" icon="Search" size="large" @click="handleSearchClick">
        搜索
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import usePermisssions from '@/hooks/usePermissions'
import { formatUTCStart, formatUTCEnd } from '@/utils/format-date'
import type { ElForm } from 'element-plus'
import { reactive, ref } from 'vue'

// ts中prop父子组件也可以这样传值
interface ISearchProps {
  searchConfig: {
    pageName: string
    formItems: any[]
  }
}
const props = defineProps<ISearchProps>()
const emit = defineEmits(['queryClick', 'resetClick'])

const isQuery = usePermisssions(`${props.searchConfig.pageName}:query`)

const initialForm: any = {}
for (const item of props.searchConfig.formItems) {
  initialForm[item.prop] = ''
}
// 动态的将渲染什么表单传进去
const searchForm = reactive<any>(initialForm)

// 重置操作(简单的多了)
const formRef = ref<InstanceType<typeof ElForm>>()
const handleResetClick = () => {
  // 拿到form对象，里面有重置方法，
  // 而且重置之前el - form - item要绑定prop对应上el - form的model中的属性
  formRef.value?.resetFields()
  emit('resetClick')
}

const handleSearchClick = () => {
  // 对创建时间进行格式化操作
  if (searchForm.createAt) {
    searchForm.createAt[0] = formatUTCStart(searchForm.createAt[0])
    searchForm.createAt[1] = formatUTCEnd(searchForm.createAt[1])
  }
  emit('queryClick', searchForm)
}
</script>

<style lang="less" scoped>
.search {
  background-color: #fff;
  padding: 20px 50px 0 0;

  .el-form-item {
    padding: 10px;
    margin-bottom: 10px;
  }

  .btns {
    text-align: right;
    padding: 0 50px 10px 0;

    .el-button {
      height: 36px;
    }
  }
}
</style>
