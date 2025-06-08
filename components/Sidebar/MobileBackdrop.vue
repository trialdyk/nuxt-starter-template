<script setup lang="ts">
const props = defineProps({
  isMobile: {
    type: Boolean as PropType<boolean>,
    required: true,
  },
  sidebarVisible: {
    type: Boolean as PropType<boolean>,
    required: true,
  }
});

const emit = defineEmits(['close-sidebar']);

const closeSidebar = () => {
  emit('close-sidebar');
};
</script>

<template>
  <div v-if="isMobile && sidebarVisible" @click="closeSidebar" class="fixed inset-0 bg-black/50 z-20 lg:hidden">
  </div>
</template>