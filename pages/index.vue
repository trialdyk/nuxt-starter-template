<script setup lang="ts">
definePageMeta({
  layout: 'empty',
  description: 'Welcome to your NuxtJS Starter Template!',
  title: 'Welcome to your NuxtJS Starter Template!'
})
</script>

<template>
  <div class="p-4 md:p-8 flex flex-col items-center">
    <BaseCard class="w-full max-w-2xl">
      <template #header>
        <div class="flex items-center space-x-3">
          <BaseIcon name="i-heroicons-sparkles" class="w-8 h-8 text-primary-500 dark:text-primary-400" />
          <h1 class="text-2xl font-semibold text-gray-900 dark:text-white">
            🎉 Welcome to Your NuxtJS Starter Template!
          </h1>
        </div>
      </template>

      <div class="space-y-6">
        <p class="text-gray-700 dark:text-gray-300">
          This is your first page rendered using Nuxt in this project.
          You have successfully integrated Nuxt UI!
        </p>

        <BaseDivider />

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Nuxt Version</p>
            <p class="text-lg font-semibold text-gray-900 dark:text-white">3.17.5</p>
          </div>
          <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Nuxt UI Version</p>
            <p class="text-lg font-semibold text-gray-900 dark:text-white">3.1.3</p>
          </div>
        </div>

        <BaseAlert icon="i-heroicons-light-bulb" color="primary" variant="subtle" title="What's Next?"
          description="Start building your application features, create a more detailed layout, or implement an authentication system." />

        <div class="flex flex-col sm:flex-row justify-end items-center space-y-3 sm:space-y-0 sm:space-x-3 mt-8">
          <BaseButton label="Nuxt UI Documentation" icon="i-heroicons-book-open" color="secondary" variant="ghost"
            to="https://ui.nuxt.com" target="_blank" />
          <BaseButton to="/dashboard" label="Go to Dashboard" icon="i-heroicons-arrow-right-circle"
            color="primary" />
        </div>
      </div>
    </BaseCard>
  </div>
</template>