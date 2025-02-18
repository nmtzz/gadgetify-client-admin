<template>
 <div class="p-4 md:p-6 bg-white rounded-lg">
  <div class="mb-4 flex justify-between items-center">
   <h1 class="text-2xl font-semibold">Quản lý sản phẩm</h1>
   <a-button type="primary" class="bg-blue-600" @click="handleAdd">
    <template #icon>
     <plus-outlined />
    </template>
    Thêm sản phẩm
   </a-button>
  </div>

  <div class="mb-4 flex gap-4 items-center">
   <span>Lọc theo giá:</span>
   <a-input-number v-model:value="priceRange.min" placeholder="Giá từ" :min="0" class="w-32" />
   <span>-</span>
   <a-input-number v-model:value="priceRange.max" placeholder="Giá đến" :min="0" class="w-32" />
  </div>

  <div class="table-operations mb-4">
   <a-button @click="clearPriceRange">Xóa lọc giá</a-button>
   <a-button @click="clearFilters">Xóa bộ lọc</a-button>
   <a-button @click="clearSort">Xóa sắp xếp</a-button>
   <a-button @click="clearAll">Xóa tất cả bộ lọc và sắp xếp</a-button>
  </div>

  <a-table :columns="columns" :data-source="filteredProducts" :row-selection="rowSelection" :pagination="pagination"
   @change="handleTableChange">
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

   <template #bodyCell="{ column, record }">
    <template v-if="column.dataIndex === 'tenSanPham'">
     <div class="flex items-center gap-3">
      <a-image :src="record.anhDaiDien" :width="40" class="rounded-full object-cover aspect-square" :preview="false" />
      <span>{{ record.tenSanPham }}</span>
     </div>
    </template>

    <template v-if="column.dataIndex === 'trangThai'">
     <a-tag :color="record.trangThai ? 'success' : 'error'">
      {{ record.trangThai ? 'Đang bán' : 'Ngừng bán' }}
     </a-tag>
    </template>

    <template v-if="column.dataIndex === 'action'">
     <a-dropdown>
      <template #overlay>
       <a-menu>
        <a-menu-item key="1" @click="handleEdit(record)">
         <edit-outlined />
         <span>Sửa</span>
        </a-menu-item>
        <a-menu-item key="2" @click="handleDelete(record)">
         <delete-outlined />
         <span>Xóa</span>
        </a-menu-item>
       </a-menu>
      </template>
      <a-button type="link">
       <more-outlined />
      </a-button>
     </a-dropdown>
    </template>
   </template>
  </a-table>
 </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import {
 PlusOutlined,
 SearchOutlined,
 EditOutlined,
 DeleteOutlined,
 MoreOutlined,
} from '@ant-design/icons-vue';
import useSanPhamStore from '@/stores/san-pham';
const sanPhamStore = useSanPhamStore();
onMounted(async () => {
 sanPhamStore.getListSanPham();
})
const searchInput = ref();
const filteredInfo = ref({});
const sortedInfo = ref({});
const priceRange = reactive({
 min: null,
 max: null,
});


const categoryFilters = computed(() => {
 const uniqueCategories = new Set(sanPhamStore.listSanPham.map(product => product.tenDanhMuc));
 return Array.from(uniqueCategories).map(category => ({
  text: category,
  value: category
 }));
});

const filteredProducts = computed(() => {
 let result = [...sanPhamStore.listSanPham];

 if (priceRange.min !== null || priceRange.max !== null) {
  result = result.filter(product => {
   const price = product.giaCoSo;

   if (priceRange.max !== null && priceRange.min !== null && priceRange.max < priceRange.min) {
    return price >= priceRange.min;
   }

   if (priceRange.min !== null && priceRange.max === null) {
    return price >= priceRange.min;
   }

   if (priceRange.max !== null && priceRange.min === null) {
    return price <= priceRange.max;
   }

   if (priceRange.min !== null && priceRange.max !== null) {
    return price >= priceRange.min && price <= priceRange.max;
   }

   return true;
  });
 }

 return result;
});

const rowSelection = {
 onChange: (selectedRowKeys, selectedRows) => {
  console.log('selectedRowKeys:', selectedRowKeys);
  console.log('selectedRows:', selectedRows);
 },
};

const paginationState = reactive({
 current: 1,
 pageSize: 10,
 total: computed(() => filteredProducts.value.length),
 showSizeChanger: true,
});

const pagination = computed(() => ({
 current: paginationState.current,
 pageSize: paginationState.pageSize,
 total: paginationState.total,
 showSizeChanger: paginationState.showSizeChanger,
}));

const columns = computed(() => {
 const filtered = filteredInfo.value || {};
 filtered.danhMuc = { tenDanhMuc: filtered?.danhMuc?.tenDanhMuc };
 const sorted = sortedInfo.value || {};

 return [
  {
   title: 'Mã SP',
   dataIndex: 'maSanPham',
   width: 100,
  },
  {
   title: 'Tên sản phẩm',
   dataIndex: 'tenSanPham',
   customFilterDropdown: true,
   filteredValue: filtered.tenSanPham || null,
   onFilter: (value, record) =>
    record.tenSanPham.toString().toLowerCase().includes(value.toLowerCase()),
  },
  {
   title: 'Danh mục',
   dataIndex: 'tenDanhMuc',
   filters: categoryFilters.value,
   filteredValue: filtered.tenDanhMuc || null,
   onFilter: (value, record) => record.tenDanhMuc === value,
  },
  {
   title: 'Giá',
   dataIndex: 'giaCoSo',
   key: 'giaCoSo',
   sorter: (a, b) => a.giaCoSo - b.giaCoSo,
   sortOrder: sorted.columnKey === 'giaCoSo' && sorted.order,
   render: (text) => `${text.toLocaleString()} đ`,
  },
  {
   title: 'Trạng thái kho',
   dataIndex: 'trangThaiKho',
  },
  {
   title: 'Trạng thái',
   dataIndex: 'trangThai',
   filters: [
    { text: 'Đang bán', value: true },
    { text: 'Ngừng bán', value: false },
   ],
   filteredValue: filtered.trangThai || null,
   onFilter: (value, record) => record.trangThai === value,
  },
  {
   title: 'Thao tác',
   dataIndex: 'action',
   width: 80,
   fixed: 'right',
  },
 ];
});

const clearPriceRange = () => {
 priceRange.min = null;
 priceRange.max = null;
};

const clearFilters = () => {
 filteredInfo.value = {};
};

const clearSort = () => {
 sortedInfo.value = {};
};

const clearAll = () => {
 clearPriceRange();
 clearFilters();
 clearSort();
};

const handleSearch = (selectedKeys, confirm, dataIndex) => {
 confirm();
};

const handleReset = (clearFilters) => {
 clearFilters({ confirm: true });
};

const handleTableChange = (pag, filters, sorter) => {
 paginationState.current = pag.current;
 paginationState.pageSize = pag.pageSize;

 filteredInfo.value = filters;
 sortedInfo.value = sorter;

 pagination.value.total = filteredProducts.value.length;

 console.log('Table change:', pag, filters, sorter);
};

const handleAdd = () => {
 console.log('Add new product');
};

const handleEdit = (record) => {
 console.log('Edit product:', record);
};

const handleDelete = (record) => {
 console.log('Delete product:', record);
};
</script>

<style scoped>
:deep(.ant-image) {
 display: inline-flex;
}

:deep(.ant-image-img) {
 border-radius: 50%;
}

.table-operations {
 margin-bottom: 16px;
}

.table-operations>button {
 margin-right: 8px;
}
</style>
