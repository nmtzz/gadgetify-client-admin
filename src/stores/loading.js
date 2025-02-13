import {defineStore} from "pinia";
import {useLoading} from 'vue-loading-overlay'

const useLoadingStore = defineStore('loading', () => {
    let loader = null;
    const loading = useLoading({
        loader: 'dots',
        color: '#4295f0',
        enforceFocus: true,
        lockScroll: true,
    });

    function show() {
        loader = loading.show();
    }

    function hide() {
        loader.hide();
    }

    return {show, hide}
})
export default useLoadingStore;