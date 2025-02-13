<template>
  <main class="bg-gray-100">
    <div class="min-h-screen flex flex-col">
      <header class="bg-white shadow-sm sticky top-0 z-50">
        <div class="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16 items-center">
            <button
                @click="open = true"
                id="mobile-menu-button"
                class="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100">
              <MenuOutlined class="h-6 w-6" style="font-size: large"/>
            </button>

            <div class="flex-shrink-0 flex items-center">
              <h1 class="text-xl font-bold text-gray-800">Gadgetify</h1>
            </div>

            <div class="flex items-center space-x-4">
              <button
                  class="p-2 text-gray-600 hover:text-gray-800 rounded-full hover:bg-gray-100"
              >
                <NotificationOutlined class="h-6 w-6" style="font-size: large"/>

              </button>
              <div class="relative">
                <button class="flex items-center space-x-2">
                  <img
                      class="h-8 w-8 rounded-full"
                      src="https://ui-avatars.com/api/?name=A"
                      alt="User avatar"
                  />
                  <span
                      class="hidden sm:block text-sm font-medium text-gray-700"
                  >Admin</span
                  >
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div class="flex flex-1">
        <!-- Sidebar for desktop -->
        <nav
            id="desktop-sidebar"
            style="position: fixed; height: 100vh; overflow-y: auto"
            class="hidden lg:block w-64 bg-white shadow-sm">
          <div class="h-full px-3 py-4">
            <div class="space-y-1">
              <a
                  href="#"
                  class="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-md">
                <HomeOutlined class="h-5 w-5 mr-3" style="font-size: large"/>
                Trang Chủ
              </a>
              <a
                  href="#"
                  class="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
              >
                <UnorderedListOutlined class="h-5 w-5 mr-3" style="font-size: large"/>
                Danh Mục
              </a>
              <a
                  href="#"
                  class="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
              >
                <AppstoreOutlined class="h-5 w-5 mr-3" style="font-size: large"/>
                Sản Phẩm
              </a>
              <a
                  href="#"
                  class="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
              >
                <ShoppingCartOutlined class="h-5 w-5 mr-3" style="font-size: large"/>
                Đơn Hàng
              </a>
            </div>
          </div>
        </nav>

        <a-drawer
            :width="295"
            title="Basic Drawer"
            placement="left"
            :closable="false"
            style="color: red"
            :open="open"
            @close="onClose"
            class="text-gray-700"
        >
          <div class="fixed inset-y-0 left-0 w-64 bg-white">
            <div class="h-full px-3 py-4">
              <div class="flex items-center justify-between px-4">
                <h2 class="text-xl font-bold text-gray-800">Gadgetify</h2>
              </div>
              <div class="mt-4 space-y-1">
                <a
                    href="#"
                    class="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-md">
                  <HomeOutlined class="h-5 w-5 mr-3" style="font-size: large"/>
                  Trang Chủ
                </a>
                <a
                    href="#"
                    class="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                >
                  <UnorderedListOutlined class="h-5 w-5 mr-3" style="font-size: large"/>
                  Danh Mục
                </a>
                <a
                    href="#"
                    class="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                >
                  <AppstoreOutlined class="h-5 w-5 mr-3" style="font-size: large"/>
                  Sản Phẩm
                </a>
                <a
                    href="#"
                    class="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                >
                  <ShoppingCartOutlined class="h-5 w-5 mr-3" style="font-size: large"/>
                  Đơn Hàng
                </a>
              </div>
            </div>
          </div>
        </a-drawer>


        <main class="flex-1 p-4 sm:p-6 lg:ml-[250px] overflow-y-auto">

        </main>
      </div>
    </div>
  </main>
</template>
<script setup>
import {ref} from "vue";
import {
  MenuOutlined,
  NotificationOutlined,
  HomeOutlined,
  UnorderedListOutlined,
  AppstoreOutlined,
  ShoppingCartOutlined
} from "@ant-design/icons-vue";

const open = ref(false);

function onClose() {
  open.value = false;
}
</script>