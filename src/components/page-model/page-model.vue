<template>
  <div class="model">
    <el-dialog
      v-model="dialogVisible"
      :title="isNewDate ? modelConfig.header.newTitle : modelConfig.header.editTitle"
      width="30%"
      center
    >
      <div class="form">
        <el-form :model="formData" label-width="80px">
          <template v-for="item in modelConfig.formItems" :key="item.prop">
            <el-form-item
              :label="item.label"
              :prop="item.prop"
              v-if="!(!isNewDate && item.prop === 'password')"
            >
              <template v-if="item.type === 'input'">
                <el-input
                  v-model="formData[item.prop]"
                  :placeholder="item.placeholder"
                  :show-password="item.prop === 'password'"
                ></el-input>
              </template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  v-model="formData[item.prop]"
                  type="daterange"
                  range-separator="To"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  size="large"
                />
              </template>
              <template v-if="item.type === 'select'">
                <el-select v-model="formData[item.prop]" :placeholder="item.placeholder">
                  <template v-for="option in item.options" :key="option.value">
                    <el-option :label="option.label" :value="option.value" />
                  </template>
                </el-select>
              </template>
              <template v-if="item.type === 'custom'">
                <slot :name="item.slotName"></slot>
              </template>
            </el-form-item>
          </template>
        </el-form>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">确认</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import useSystemStore from '@/stores/main/system/system'
import type { IModelProps } from './type'

const props = defineProps<IModelProps>()
const emit = defineEmits(['handleSubmit'])

const dialogVisible = ref(false)

const initialData: any = {}
for (const item of props.modelConfig.formItems) {
  initialData[item.prop] = item.initialValue ?? ''
}
const formData = reactive<any>(initialData)

// 定义一下visible的方法
// 要判断一下是新建数据弹出来，还是编辑数据弹出来
// 编辑数据要对数据进行回显
const isNewDate = ref(true)
const editData = ref()
const setModelVisible = (isNew: boolean = true, itemData?: any) => {
  dialogVisible.value = true
  isNewDate.value = isNew
  // 编辑数据进行的操作
  if (!isNew && itemData) {
    for (const key in formData) {
      formData[key] = itemData[key]
    }
    editData.value = itemData
  } else {
    // 新建数据进行的操作
    for (const key in formData) {
      formData[key] = ''
    }
    editData.value = null
  }
}

// 确认按钮的点击
const systemStore = useSystemStore()
const handleConfirmClick = () => {
  dialogVisible.value = false

  let infoData = formData
  infoData = formData
  if (props.otherInfo) {
    infoData = { ...formData, ...props.otherInfo }
  }

  // 有上传图片的编辑和新建逻辑
  if ('customImg' in formData) {
    // 上传图片就要把这个自定义的属性删掉
    delete formData.customImg
    infoData = formData
    if (!isNewDate.value && editData.value) {
      // 如果携带了图片首先先要把数据库的对应图片删掉再添加图片
      if (props.isSelectphoto) {
        systemStore
          .editPageDataAction(props.modelConfig.pageName, editData.value.id, infoData)
          .then(() => {
            systemStore.deletePhotoDataAction(props.modelConfig.pageName, editData.value.id)
            emit('handleSubmit', editData.value.id)
          })
      } else {
        //没有携带就不用删除数据库图片和添加图片
        systemStore.editPageDataAction(props.modelConfig.pageName, editData.value.id, infoData)
      }
    } else {
      systemStore.createPageDataAction(props.modelConfig.pageName, infoData).then(() => {
        // 创建商品成功后触发goods中上传图片逻辑
        emit('handleSubmit')
      })
    }
  } else {
    // 没有上传图片的编辑和新建逻辑
    if (!isNewDate.value && editData.value) {
      systemStore.editPageDataAction(props.modelConfig.pageName, editData.value.id, infoData)
    } else {
      systemStore.createPageDataAction(props.modelConfig.pageName, infoData)
    }
  }

  // 编辑数据的确认逻辑
  if (!isNewDate.value && editData.value) {
    // 判断formdata中是否含有customImg这个属性
    // if ('customImg' in formData) {
    //   delete formData.customImg
    //   infoData = formData
    //   systemStore
    //     .editPageDataAction(props.modelConfig.pageName, editData.value.id, infoData)
    //     .then(() => {
    //       // 首先先要把数据库的对应图片删掉再添加图片
    //       systemStore.deletePhotoDataAction(props.modelConfig.pageName, editData.value.id)
    //       emit('handleSubmit', editData.value.id)
    //     })
    // } else {
    //   systemStore.editPageDataAction(props.modelConfig.pageName, editData.value.id, infoData)
    // }
  } else {
    // if ('customImg' in formData) {
    //   delete formData.customImg
    //   infoData = formData
    //   // 新建数据的确认逻辑
    //   systemStore.createPageDataAction(props.modelConfig.pageName, infoData).then(() => {
    //     // 创建商品成功后触发goods中上传图片逻辑
    //     emit('handleSubmit')
    //   })
    // }
  }
}

defineExpose({
  setModelVisible
})
</script>

<style lang="less" scoped>
.form {
  padding: 0 24px;
  .el-form-item {
    margin-bottom: 22px;
  }
}
</style>
