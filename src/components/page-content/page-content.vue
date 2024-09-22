<template>
  <div class="content">
    <div class="header">
      <h2>{{ contentConfig?.header?.title ?? '数据列表' }}</h2>
      <el-button type="primary" @click="handleNewUserBtnClick" v-if="isCreate">
        {{ contentConfig?.header?.btnTitle ?? '新建数据' }}
      </el-button>
    </div>
    <div class="table">
      <el-table :data="pageList" border style="width: 100%" v-bind="contentConfig.childrenTree">
        <template v-for="item in contentConfig.propsList" :key="item.prop">
          <template v-if="item.type === 'timer'">
            <!--<el-table-column align="center" :prop="item.prop" :label="item.label" :width="item.width">-->
            <el-table-column align="center" v-bind="item">
              <template #default="scope"> {{ formatUTC(scope.row[item.prop]) }} </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'handler'">
            <el-table-column align="center" fixed="right" v-bind="item">
              <template #default="scope">
                <el-button
                  v-if="isUpdate"
                  type="primary"
                  size="small"
                  icon="Edit"
                  link
                  @click="handleEditBtnClick(scope.row)"
                >
                  编辑
                </el-button>
                <el-button
                  v-if="isDelete"
                  type="danger"
                  size="small"
                  icon="Delete"
                  link
                  @click="handleDeleteBtnClick(scope.row.id)"
                >
                  删除
                </el-button>
              </template>
            </el-table-column>
          </template>
          <!-- 自定义插槽对数据进行定制化 -->
          <template v-else-if="item.type === 'custom'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                <!-- 自定义作用域插槽，并将原数据v-bind传到插槽中了 -->
                <slot :name="item.slotName" v-bind="scope"></slot>
              </template>
            </el-table-column>
          </template>
          <template v-else>
            <el-table-column align="center" v-bind="item" show-overflow-tooltip />
          </template>
        </template>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 50, 100]"
        size="small"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import useSystemStore from '@/stores/main/system/system'
import { storeToRefs } from 'pinia'
import { formatUTC } from '@/utils/format-date'
import type { IContentProps } from './type'
import usePermisssions from '@/hooks/usePermissions'

const props = defineProps<IContentProps>()
const emit = defineEmits(['newClick', 'editClick'])

// 获取是否有增删改查的权限
const isCreate = usePermisssions(`${props.contentConfig.pageName}:create`)
const isDelete = usePermisssions(`${props.contentConfig.pageName}:delete`)
const isUpdate = usePermisssions(`${props.contentConfig.pageName}:update`)
const isQuery = usePermisssions(`${props.contentConfig.pageName}:query`)

// 定义函数用于发送网络请求
// 发起请求列表数据
const systemStore = useSystemStore()
const pageSize = ref(10)
const currentPage = ref(1)

// 监听action的触发(edit,create,delete),用于重置页码
// 补充：page-model和page-content是兄弟组件，也可以用兄-父-兄的方式传递或者eventBus实现
systemStore.$onAction(({ name, after }) => {
  // after是等action执行完，在执行这个回调函数
  // 为什么要这么做呢？因为可能创建或删除失败
  after(() => {
    if (
      name === 'editPageDataAction' ||
      name === 'createPageDataAction' ||
      name === 'deletePageByIdAction'
    ) {
      currentPage.value = 1
      pageSize.value = 10
    }
  })
})

const fetchPageListData = (searchFrom: any = {}) => {
  // 如果没有查询权限，则不能发送网络请求去查询数据
  if (!isQuery) return

  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const queryInfo = { size, offset, ...searchFrom }
  systemStore.fetchPageListAction(props.contentConfig.pageName, queryInfo)
}
fetchPageListData()

// 获取到pageList数据并展示
const { pageList, pageTotalCount } = storeToRefs(systemStore)

// 页码相关逻辑
const handleSizeChange = () => {
  fetchPageListData()
}
const handleCurrentChange = () => {
  fetchPageListData()
}

// 删除按钮的点击
const handleDeleteBtnClick = (id: number) => {
  ElMessageBox.confirm('你是否要删除这行数据', 'Warning', {
    confirmButtonText: '是的',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      systemStore.deletePageByIdAction(props.contentConfig.pageName, id)
      ElMessage({
        type: 'success',
        message: '删除成功'
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除'
      })
    })
}
// 新建用户的点击
const handleNewUserBtnClick = () => {
  emit('newClick')
}
// 编辑按钮的点击
const handleEditBtnClick = (itemData: any) => {
  emit('editClick', itemData)
}

defineExpose({
  fetchPageListData
})
</script>

<style lang="less" scoped>
.content {
  background-color: #fff;
  margin-top: 20px;
  padding: 20px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end; // 底部对齐
    margin-bottom: 20px;
  }
  .table {
    :deep(.el-table__cell) {
      padding: 12px 0;
    }
    .el-button {
      padding: 5px 8px;
      margin-left: 0px;
    }
  }
}

.pagination {
  display: flex;
  justify-content: flex-end;
  margin: 15px 40px 0 0;
}
</style>
