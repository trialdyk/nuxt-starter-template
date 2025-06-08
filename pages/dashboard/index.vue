<script setup lang="ts">
import { ref } from 'vue';

useHead({
  title: 'Dashboard',
});

// Dummy data for statistic cards
const stats = ref([
  { label: 'Total Revenue', value: '$54,231.89', icon: 'i-heroicons-chart-bar-square', color: 'bg-blue-500' },
  { label: 'New Users', value: '+1,820', icon: 'i-heroicons-users', color: 'bg-green-500' },
  { label: 'Total Courses', value: '78', icon: 'i-heroicons-academic-cap', color: 'bg-orange-500' },
  { label: 'Pending Payouts', value: '$4,670.00', icon: 'i-heroicons-clock', color: 'bg-red-500' },
]);
</script>

<template>
  <BaseContainer class="py-10">
    <div class="space-y-8">
      <h1 class="text-3xl font-bold text-gray-800 dark:text-white">Dashboard</h1>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <BaseCard v-for="stat in stats" :key="stat.label">
          <div class="flex items-start justify-between">
            <div class="space-y-1">
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400">{{ stat.label }}</p>
              <p class="text-2xl font-semibold text-gray-800 dark:text-white">{{ stat.value }}</p>
            </div>
            <div class="p-2 rounded-lg" :class="stat.color">
              <BaseIcon :name="stat.icon" class="h-6 w-6 text-white" />
            </div>
          </div>
        </BaseCard>
      </div>
    </div>
  </BaseContainer>
</template>