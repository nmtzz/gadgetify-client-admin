<template>
 <div class="p-4 md:p-6 bg-white rounded-lg">
  <div class="mb-4 flex justify-between items-center">
   <h1 class="text-2xl font-semibold">Quản lý danh mục sản phẩm</h1>
   <a-button type="primary" class="bg-blue-600" @click="handleAdd">
    <template #icon>
     <plus-outlined />
    </template>
    Thêm danh mục
   </a-button>
  </div>

  <a-table :columns="columns" :row-key="record => record.id" :data-source="danhMucStore.listDanhMuc"
   :scroll="{ x: 'max-content' }" class="w-full" :pagination="pagination" @change="handleTableChange">
   <template #customFilterDropdown="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }">
    <div class="p-2">
     <a-input ref="searchInput" :placeholder="`Tìm ${column.title}`" :value="selectedKeys[0]"
      class="mb-2 block w-[200px]" @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
      @pressEnter="handleSearch(selectedKeys, confirm, column.dataIndex)" />
     <div class="flex justify-end gap-2">
      <a-button type="primary" size="small" class="bg-blue-600 w-24"
       @click="handleSearch(selectedKeys, confirm, column.dataIndex)">
       <template #icon>
        <search-outlined />
       </template>
       Tìm kiếm
      </a-button>
      <a-button size="small" class="w-24" @click="handleReset(clearFilters)">
       Đặt lại
      </a-button>
     </div>
    </div>
   </template>

   <template #customFilterIcon="{ filtered }">
    <search-outlined :style="{ color: filtered ? '#1890ff' : undefined }" />
   </template>

   <template #bodyCell="{ text, column, record }">
    <template v-if="state.searchText && state.searchedColumn === column.dataIndex">
     <div class="text-center">
      <template v-for="(fragment, i) in text
       .toString()
       .split(new RegExp(`(?<=${state.searchText})|(?=${state.searchText})`, 'i'))">
       <mark v-if="fragment.toLowerCase() === state.searchText.toLowerCase()" :key="i" class="highlight">
        {{ fragment }}
       </mark>
       <template v-else>{{ fragment }}</template>
      </template>
     </div>
    </template>

    <template v-else-if="column.dataIndex === 'tenDanhMuc'">
     <div class="text-center">{{ text }}</div>
    </template>

    <template v-if="column.dataIndex === 'icon'">
     <div class="flex justify-center items-center">
      <a-image :src="record.icon" :width="50" class="rounded-full object-cover aspect-square" :preview="false" />
     </div>
    </template>

    <template v-if="column.dataIndex === 'action'">
     <div class="flex justify-center gap-2">
      <a-button type="primary" @click="handleEdit(record)">
       <template #icon>
        <edit-outlined />
       </template>
       Sửa
      </a-button>

      <XoaDanhMuc :category="record" />
     </div>
    </template>
   </template>
  </a-table>
  <ThemDanhMuc v-model="showAddModal" />
  <SuaDanhMuc v-model="showEditModal" :category="selectedCategory" />
 </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { EditOutlined, PlusOutlined, SearchOutlined, } from '@ant-design/icons-vue'
import ThemDanhMuc from "@/components/danh-muc/ThemDanhMuc.vue";
import SuaDanhMuc from "@/components/danh-muc/SuaDanhMuc.vue";
import XoaDanhMuc from "@/components/danh-muc/XoaDanhMuc.vue";
import useDanhMucStore from "@/stores/danh-muc.js";

const danhMucStore = useDanhMucStore();
onMounted(async () => {
 await danhMucStore.getListDanhMuc();
 console.log('List danh mục:', danhMucStore.listDanhMuc);
})

const paginationState = reactive({
 current: 1,
 pageSize: 10,
 total: computed(() => danhMucStore.listDanhMuc.length),
 showSizeChanger: true,
})
const pagination = computed(() => ({
 current: paginationState.current,
 pageSize: paginationState.pageSize,
 total: paginationState.total,
 showSizeChanger: paginationState.showSizeChanger,
}))
const handleTableChange = (pag, filters, sorter) => {
 paginationState.current = pag.current
 paginationState.pageSize = pag.pageSize
}
const state = reactive({
 searchText: '',
 searchedColumn: '',
})

const searchInput = ref()

const columns = [
 {
  title: 'ID',
  dataIndex: 'id',
  key: 'id',
  width: 80,
  align: 'center',
 },
 {
  title: 'Icon',
  dataIndex: 'icon',
  key: 'icon',
  width: 120,
  align: 'center',
 },
 {
  title: 'Tên danh mục',
  dataIndex: 'tenDanhMuc',
  key: 'tenDanhMuc',
  width: 200,
  align: 'center',
  customFilterDropdown: true,
  onFilter: (value, record) =>
   record.tenDanhMuc.toString().toLowerCase().includes(value.toLowerCase()),
  onFilterDropdownOpenChange: visible => {
   if (visible) {
    setTimeout(() => {
     searchInput.value?.focus()
    }, 100)
   }
  },
 },
 {
  title: 'Thao tác',
  dataIndex: 'action',
  key: 'action',
  width: 200,
  align: 'center',
  fixed: 'right',
 },
]

const handleSearch = (selectedKeys, confirm, dataIndex) => {
 confirm()
 state.searchText = selectedKeys[0]
 state.searchedColumn = dataIndex
}

const handleReset = (clearFilters) => {
 clearFilters({ confirm: true })
 state.searchText = ''
}


const showEditModal = ref(false)
const selectedCategory = ref({})

const handleEdit = (category) => {
 selectedCategory.value = category
 console.log('Edit category:', category)
 showEditModal.value = true
}

const handleDelete = (record) => {
 console.log('Delete category:', record)
}
const showAddModal = ref(false)

const handleAdd = () => {
 showAddModal.value = true
}
</script>

<style scoped>
.highlight {
 background-color: rgb(255, 192, 105);
 padding: 0;
}

:deep(.ant-image) {
 display: inline-flex;
}

:deep(.ant-image-img) {
 border-radius: 50%;
}
</style>
