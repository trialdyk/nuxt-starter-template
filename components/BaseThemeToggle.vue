<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core';

const isDark = useDark();
const toggleDarkMode = useToggle(isDark);
</script>

<template>
  <button
    class="rounded-full border border-slate-300 dark:border-slate-700 flex justify-center items-center p-1.5 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors duration-300"
    @click="toggleDarkMode()"
    aria-label="Toggle dark mode"
  >
    <Transition name="fade" mode="out-in">
      <BaseIcon v-if="!isDark" name="i-heroicons-sun-20-solid"
        class="h-5 w-5 text-yellow-500" key="light-icon" />
      <BaseIcon v-else name="i-heroicons-moon-20-solid" class="h-5 w-5 text-yellow-400" key="dark-icon" />
    </Transition>
  </button>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
</style>