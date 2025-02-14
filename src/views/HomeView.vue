<template>
  <section>
    <div class="max-w-7xl mx-auto">
      <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6"
      >
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-medium text-gray-900">Statistics</h3>
          <p class="mt-2 text-gray-600">Your daily statistics overview</p>
        </div>
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-medium text-gray-900">Performance</h3>
          <p class="mt-2 text-gray-600">Weekly performance metrics</p>
        </div>
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-medium text-gray-900">Analytics</h3>
          <p class="mt-2 text-gray-600">Monthly analytics data</p>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="p-6">
          <h2 class="text-lg font-medium text-gray-900">
            Recent Activity
          </h2>
          <div class="mt-4 overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead>
              <tr>
                <th
                    class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                    class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                    class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Date
                </th>
              </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
              <tr>
                <td class="px-6 py-4 whitespace-nowrap">John Doe</td>
                <td class="px-6 py-4 whitespace-nowrap">Active</td>
                <td class="px-6 py-4 whitespace-nowrap">2025-02-07</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
