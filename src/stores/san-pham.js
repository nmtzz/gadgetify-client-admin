import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";
import { message } from "ant-design-vue";
const useSanPhamStore = defineStore("san-pham", () => {
  let listSanPham = ref([]);
  let sanPham = ref(null);
  const getListSanPham = async () => {
    listSanPham.value = (await axios.get("/san-pham")).data.data;
  };
  const getSanPham = async (id) => {
    sanPham.value = (await axios.get(`/san-pham/${id}`)).data;
  };
  const saveSanPham = async (data) => {
    await axios.post("/san-pham", data);
    await getListSanPham();
    message.success("Lưu sản phẩm thành công");
  };
  const deleteSanPham = async (id) => {
    await axios.delete(`/san-pham/${id}`);
    await getListSanPham();
    message.success("Xóa sản phẩm thành công");
  };
  return {
    listSanPham,
    sanPham,
    getListSanPham,
    getSanPham,
    saveSanPham,
    deleteSanPham,
  };
});
export default useSanPhamStore;
