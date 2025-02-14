<template>
  <a-modal style="top: 15px" v-model:open="visible" title="Thêm danh mục sản phẩm" @cancel="handleCancel" :footer="null"
           :width="modalWidth">
    <a-form :model="formState" name="addCategoryForm" :label-col="{ span: 24 }" :wrapper-col="{ span: 24 }"
            @finish="onFinish" @finishFailed="onFinishFailed">
      <a-form-item label="Tên danh mục" name="tenDanhMuc"
                   :rules="[{ required: true, message: 'Vui lòng nhập tên danh mục!' }]">
        <a-input v-model:value="formState.tenDanhMuc" placeholder="Nhập tên danh mục"/>
      </a-form-item>

      <a-form-item label="Icon danh mục" name="icon">
        <div class="flex flex-col items-center gap-4">
          <a-upload v-model:fileList="fileList" :before-upload="beforeUpload" @remove="handleRemove" :maxCount="1"
                    accept="image/*" list-type="picture">
            <a-button>
              <template #icon>
                <upload-outlined/>
              </template>
              Tải ảnh lên
            </a-button>
          </a-upload>

          <div v-if="imageUrl" class="mt-4">
            <a-image :src="imageUrl" :width="100" class="rounded-full object-cover aspect-square"/>
          </div>
        </div>
      </a-form-item>

      <a-form-item :wrapper-col="{ span: 24 }" class="mb-0">
        <div class="flex justify-end gap-2">
          <a-button @click="handleCancel">Hủy</a-button>
          <a-button type="primary" html-type="submit" :loading="loadingStore.isLoading" class="bg-blue-600">
            Thêm danh mục
          </a-button>
        </div>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup>
import {computed, reactive, ref} from 'vue'
import {UploadOutlined} from '@ant-design/icons-vue'
import {message} from 'ant-design-vue'
import useDanhMucStore from "@/stores/danh-muc.js";
import useLoadingStore from "@/stores/loading.js";

const visible = defineModel()
const danhMucStore = useDanhMucStore();
const loadingStore = useLoadingStore();
const formState = reactive({
  tenDanhMuc: '',
  icon: undefined
})

const fileList = ref([])
const imageUrl = ref('')

const modalWidth = computed(() => {
  return window.innerWidth < 640 ? '95%' : '500px'
})

const beforeUpload = (file) => {
  const isImage = file.type.startsWith('image/')
  if (!isImage) {
    message.error('Bạn chỉ có thể tải lên file hình ảnh!')
    return false
  }

  const isLt10M = file.size / 1024 / 1024 < 10
  if (!isLt10M) {
    message.error('Hình ảnh phải nhỏ hơn 10MB!')
    return false
  }

  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = (e) => {
    imageUrl.value = e.target.result
    formState.icon = file
    fileList.value = [file]
  }

  return false
}

const handleRemove = () => {
  imageUrl.value = ''
  formState.icon = undefined
  fileList.value = []
}

const handleCancel = () => {
  visible.value = false
  resetForm()
}

const resetForm = () => {
  formState.tenDanhMuc = ''
  formState.icon = undefined
  imageUrl.value = ''
  fileList.value = []
}

const onFinish = async (values) => {
  if (!formState.icon) {
    message.error('Vui lòng tải lên icon danh mục!')
    return
  }


  console.log(values)
  await danhMucStore.saveDanhMuc(values);
  resetForm();
}

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo)
}
</script>

<style scoped>
:deep(.ant-upload-list-item) {
  border-radius: 8px;
}

:deep(.ant-modal-content) {
  padding: 24px;
}

:deep(.ant-form-item:last-child) {
  margin-bottom: 0;
}

:deep(.ant-image) {
  display: inline-flex;
}

:deep(.ant-image-img) {
  border-radius: 50%;
}
</style>