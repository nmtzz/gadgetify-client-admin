import {defineStore} from "pinia";
import axios from "axios";
import {ref} from "vue";
import useCloudinaryStore from "@/stores/cloudinary.js";
import {message} from 'ant-design-vue';

const useDanhMucStore = defineStore('danh-muc', () => {
    const cloudinaryStore = useCloudinaryStore();
    let listDanhMuc = ref([]);
    let danhMuc = ref(null);
    const getListDanhMuc = async () => {
        listDanhMuc.value = (await axios.get('/danh-muc')).data.data;
    }
    const getDanhMuc = async (id) => {
        danhMuc.value = (await axios.get(`/danh-muc/${id}`)).data;
    }
    const saveDanhMuc = async (data) => {
        if (data.publicId) {
            await cloudinaryStore.deleteImage(data.publicId);
        }
        data.icon = (await cloudinaryStore.uploadAndGetSecureUrl(data.icon)).secure_url;
        data.publicId = (await cloudinaryStore.uploadAndGetSecureUrl(data.icon)).public_id;
        await axios.post('/danh-muc', data);
        await getListDanhMuc();
        message.success('Lưu danh mục thành công');
    }
    const updateDanhMuc = async (data) => {
        await axios.post('/danh-muc', data);
        await getListDanhMuc();
        message.success('Lưu danh mục thành công');
    }
    const deleteDanhMuc = async (data) => {
        await axios.delete(`/danh-muc/${data.id}`);
        await getListDanhMuc();
        message.success('Xóa danh mục thành công');
    }
    return {listDanhMuc, danhMuc, getListDanhMuc, getDanhMuc, saveDanhMuc, deleteDanhMuc, updateDanhMuc};
})
export default useDanhMucStore;