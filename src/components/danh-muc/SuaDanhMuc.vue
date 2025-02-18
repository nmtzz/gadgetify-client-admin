<template>
  <a-modal
      style="top: 20px"
      v-model:open="visible"
      title="Chỉnh sửa danh mục sản phẩm"
      @cancel="handleCancel"
      :footer="null"
      :width="modalWidth"
  >
    <a-form
        :model="formState"
        name="editCategoryForm"
        :label-col="{ span: 24 }"
        :wrapper-col="{ span: 24 }"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
    >
      <a-form-item
          label="ID danh mục"
          name="id"
      >
        <a-input v-model:value="formState.id" disabled/>
      </a-form-item>

      <a-form-item
          label="Tên danh mục"
          name="tenDanhMuc"
          :rules="[{ required: true, message: 'Vui lòng nhập tên danh mục!' }]"
      >
        <a-input v-model:value="formState.tenDanhMuc" placeholder="Nhập tên danh mục"/>
      </a-form-item>

      <a-form-item
          label="Icon danh mục"
          name="icon"
      >
        <div class="flex flex-col items-center gap-4">
          <div v-if="currentImageUrl && !imageUrl" class="mb-4">
            <p class="text-gray-500 mb-2 text-center">Ảnh hiện tại:</p>
            <a-image
                :src="currentImageUrl"
                :width="100"
                class="rounded-full object-cover aspect-square"
            />
          </div>

          <a-upload
              v-model:fileList="fileList"
              :before-upload="beforeUpload"
              @remove="handleRemove"
              :maxCount="1"
              accept="image/*"
              list-type="picture"
          >
            <a-button>
              <template #icon>
                <upload-outlined/>
              </template>
              Tải ảnh mới
            </a-button>
          </a-upload>

          <div v-if="imageUrl" class="mt-4">
            <p class="text-gray-500 mb-2 text-center">Ảnh mới:</p>
            <a-image
                :src="imageUrl"
                :width="100"
                class="rounded-full object-cover aspect-square"
            />
          </div>
        </div>
      </a-form-item>

      <a-form-item :wrapper-col="{ span: 24 }" class="mb-0">
        <div class="flex justify-end gap-2">
          <a-button @click="handleCancel">Hủy</a-button>
          <a-button type="primary" html-type="submit" :loading="loadingStore.isLoading" class="bg-blue-600">
            Lưu thay đổi
          </a-button>
        </div>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup>
import {computed, reactive, ref, watch} from 'vue'
import {UploadOutlined} from '@ant-design/icons-vue'
import {message} from 'ant-design-vue'
import useDanhMucStore from "@/stores/danh-muc.js";
import useLoadingStore from "@/stores/loading.js";

const danhMucStore = useDanhMucStore();
const loadingStore = useLoadingStore();
const props = defineProps({
  category: {
    type: Object,
    required: true,
    default: () => ({
      id: '',
      tenDanhMuc: '',
      icon: '',
      publicId: ''
    })
  }
})

const visible = defineModel()

const formState = reactive({
  id: '',
  tenDanhMuc: '',
  icon: undefined,
})

const fileList = ref([])
const imageUrl = ref('')
const currentImageUrl = ref('')

watch(() => props.category, (newCategory) => {
  if (newCategory) {
    formState.id = newCategory.id
    formState.tenDanhMuc = newCategory.tenDanhMuc
    currentImageUrl.value = newCategory.icon
  }
}, {immediate: true})

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
  formState.tenDanhMuc = props?.category?.tenDanhMuc
  formState.icon = undefined
  imageUrl.value = ''
  fileList.value = []
}

const onFinish = async (values) => {

  if (values.icon) {
    await danhMucStore.saveDanhMuc({
      id: formState.id,
      tenDanhMuc: formState.tenDanhMuc,
      icon: formState.icon,
      publicId: props?.category?.publicId
    })
  } else {
    await danhMucStore.updateDanhMuc({
      id: formState.id,
      tenDanhMuc: formState.tenDanhMuc,
      icon: currentImageUrl.value,
      publicId: props?.category?.publicId
    })
  }
  resetForm()
  visible.value = false
}

const onFinishFailed = (errorInfo) => {
  console.log('Lỗi:', errorInfo)
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