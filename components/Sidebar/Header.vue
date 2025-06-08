<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui';
defineProps({
  sidebarExpanded: {
    type: Boolean as PropType<boolean>,
    required: true,
  },
  isMobile: {
    type: Boolean as PropType<boolean>,
    required: true,
  },
  sidebarVisible: {
    type: Boolean as PropType<boolean>,
    required: true,
  },
  userProfileDropdownItems: {
    type: Array as PropType<DropdownMenuItem[][]>, 
    required: true,
  },
});

const emit = defineEmits(['toggle-sidebar']);

const toggleSidebar = () => {
  emit('toggle-sidebar');
};
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700 flex items-center justify-between px-4 transition-all duration-300"
    :class="{
      'lg:pl-[250px]': sidebarExpanded && !isMobile,
      'lg:pl-[70px]': !sidebarExpanded && !isMobile,
      'pl-4': isMobile,
    }">
    <div class="flex items-center">
      <BaseButton color="secondary" variant="ghost" square @click="toggleSidebar" aria-label="Toggle sidebar"
        class="p-2 ml-2 lg:hidden">
        <BaseIcon :name="sidebarVisible ? 'i-heroicons-x-mark' : 'i-heroicons-bars-3'" class="h-5 w-5" />
      </BaseButton>
      <BaseButton color="secondary" variant="ghost" square @click="toggleSidebar" aria-label="Toggle sidebar"
        class="p-2 ml-2 hidden lg:inline-flex">
        <BaseIcon :name="!sidebarExpanded ? 'i-heroicons-bars-3' : 'i-heroicons-x-mark'" class="h-5 w-5" />
      </BaseButton>
    </div>

    <div class="flex items-center gap-2 sm:gap-3">
      <ThemeSwitcher />
      <BaseThemeToggle />
      <AppNotification />
      <UserProfile
        :items="userProfileDropdownItems"
      />
    </div>
  </header>
</template>