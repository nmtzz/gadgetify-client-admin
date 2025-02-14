<template>
  <a-popconfirm
      title="Xóa danh mục sản phẩm"
      description="Bạn có chắc chắn muốn xóa danh mục này không?"
      @confirm="handleConfirm"
      ok-text="Có"
      cancel-text="Không"
  >
    <a-button type="primary" danger :loading="loadingStore.isLoading">
      <template #icon>
        <delete-outlined/>
      </template>
      Xóa
    </a-button>
  </a-popconfirm>
</template>

<script setup>
import {DeleteOutlined} from '@ant-design/icons-vue'
import useLoadingStore from "@/stores/loading.js";
import useDanhMucStore from "@/stores/danh-muc.js";

const danhMucStore = useDanhMucStore();
const loadingStore = useLoadingStore();
const props = defineProps({
  category: {
    type: Object,
    default: () => ({})
  }
})

const handleConfirm = async () => {
  console.log('Xóa danh mục:', props.category)
  await danhMucStore.deleteDanhMuc(props.category)
}
</script>