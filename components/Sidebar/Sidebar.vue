<script setup lang="ts">
import type { NavItem } from '~/types';

const props = defineProps({
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
  navigationItems: {
    type: Array as PropType<NavItem[]>,
    required: true,
  }
});

const localNavItems = ref<NavItem[]>([]);

watch(() => props.navigationItems, (newNavItems) => {
  localNavItems.value = JSON.parse(JSON.stringify(newNavItems));
}, { deep: true, immediate: true });


const toggleParentItem = (item: NavItem): void => {
  if (item.children && item.children.length > 0) {
    item.open = !item.open;
  }
};

const performNavigation = (item: NavItem): void => {
  if (item.href && item.href !== '#') {
    navigateTo(item.href);
  }
};

const sidebarWidthClass = computed(() => {
  if (props.isMobile) return 'w-[280px]';
  return props.sidebarExpanded ? 'w-[250px]' : 'w-[70px]';
});

const sidebarTranslationClass = computed(() => {
  if (props.isMobile) {
    return props.sidebarVisible ? 'translate-x-0' : '-translate-x-full';
  }
  return 'translate-x-0';
});

const NuxtLink = resolveComponent('NuxtLink');
</script>

<template>
  <aside
    class="fixed top-0 left-0 h-full bg-white dark:bg-neutral-800 border-r border-neutral-200 dark:border-neutral-700 z-30 flex flex-col transition-all duration-300 ease-in-out"
    :class="[sidebarWidthClass, sidebarTranslationClass]">
    <div class="h-16 flex items-center shrink-0"
      :class="!sidebarExpanded && !isMobile ? 'px-2.5 justify-center' : 'px-4 justify-start'">
      <NuxtLink to="/" class="flex items-center gap-2">
      <div
        class="h-8 w-8 rounded-md bg-primary-600 dark:bg-primary-500 flex items-center justify-center text-white font-bold flex-shrink-0">
        A
      </div>
      <span v-if="sidebarExpanded || isMobile" class="text-lg font-semibold text-neutral-800 dark:text-white">Nuxt App</span>
      </NuxtLink>
    </div>

    <nav class="flex-1 p-2.5 space-y-1 overflow-y-auto">
      <template v-for="item in localNavItems" :key="item.name">
        <div v-if="item.isSectionTitle" class="px-2 pt-4 pb-1 select-none">
          <span v-if="sidebarExpanded || isMobile" class="text-xs font-semibold uppercase text-neutral-500 dark:text-neutral-400 tracking-wider">
            {{ item.name }}
          </span>
          <hr v-else-if="!isMobile" class="my-2 border-neutral-300 dark:border-neutral-600">
        </div>

        <div v-else>
          <component :is="item.href && (!item.children || item.children.length === 0) ? NuxtLink : 'button'"
            :to="item.href && (!item.children || item.children.length === 0) ? item.href : undefined"
            @click="item.children && item.children.length > 0 ? toggleParentItem(item) : performNavigation(item)"
            type="button"
            class="flex items-center justify-between w-full p-2 rounded-md transition-colors text-sm group"
            :class="[
              item.active
                ? 'bg-primary-100 dark:bg-primary-700/30 text-primary-600 dark:text-primary-300 font-semibold'
                : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700',
              (!sidebarExpanded && !isMobile) ? 'justify-center' : ''
            ]">
            <div class="flex items-center overflow-hidden"
                 :class="{
                   'justify-center': !sidebarExpanded && !isMobile,
                   'justify-start': sidebarExpanded || isMobile
                 }">
              <BaseIcon v-if="item.icon" :name="item.icon" class="h-5 w-5 flex-shrink-0"
                :class="{ 'mr-3': sidebarExpanded || isMobile }" />
              <span v-if="sidebarExpanded || isMobile" class="font-medium truncate transition-opacity duration-200">
                {{ item.name }}
              </span>
            </div>
            <BaseIcon v-if="(sidebarExpanded || isMobile) && item.children && item.children.length > 0"
              name="i-heroicons-chevron-down-20-solid"
              class="h-5 w-5 transition-transform duration-200 flex-shrink-0 text-neutral-500 dark:text-neutral-400"
              :class="{ 'rotate-180': item.open }"
            />
          </component>

          <transition
            enter-active-class="transition-[max-height,opacity] ease-out duration-300"
            enter-from-class="opacity-0 max-h-0"
            enter-to-class="opacity-100 max-h-[1000px]"
            leave-active-class="transition-[max-height,opacity] ease-in duration-200"
            leave-from-class="opacity-100 max-h-[1000px]"
            leave-to-class="opacity-0 max-h-0"
          >
            <div v-if="item.open && (sidebarExpanded || isMobile) && item.children && item.children.length > 0"
              class="mt-1 space-y-1 overflow-hidden"
              :style="{ paddingLeft: (sidebarExpanded || isMobile) ? '1.25rem' : '0' }">
              <template v-for="child in item.children" :key="child.name">
                <div>
                  <component :is="child.href && (!child.children || child.children.length === 0) ? NuxtLink : 'button'"
                    :to="child.href && (!child.children || child.children.length === 0) ? child.href : undefined"
                    @click="child.children && child.children.length > 0 ? toggleParentItem(child) : performNavigation(child)"
                    type="button"
                    class="flex items-center justify-between w-full p-2 rounded-md transition-colors text-xs group"
                    :class="[
                      child.active
                        ? 'bg-primary-100 dark:bg-primary-700/20 text-primary-600 dark:text-primary-400 font-medium'
                        : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700/70',
                      (!sidebarExpanded && !isMobile) ? 'justify-center' : ''
                    ]">
                    <div class="flex items-center overflow-hidden"
                         :class="{
                           'justify-center': !sidebarExpanded && !isMobile,
                           'justify-start': sidebarExpanded || isMobile
                         }">
                      <BaseIcon v-if="child.icon" :name="child.icon" class="h-4 w-4 flex-shrink-0"
                        :class="{ 'mr-2.5': sidebarExpanded || isMobile }" />
                      <span v-if="sidebarExpanded || isMobile" class="font-medium truncate">
                        {{ child.name }}
                      </span>
                    </div>
                    <BaseIcon v-if="(sidebarExpanded || isMobile) && child.children && child.children.length > 0"
                      name="i-heroicons-chevron-down-20-solid"
                      class="h-4 w-4 transition-transform duration-200 flex-shrink-0 text-neutral-500 dark:text-neutral-400"
                      :class="{ 'rotate-180': child.open }"
                    />
                  </component>

                  <transition
                    enter-active-class="transition-[max-height,opacity] ease-out duration-300"
                    enter-from-class="opacity-0 max-h-0"
                    enter-to-class="opacity-100 max-h-[1000px]"
                    leave-active-class="transition-[max-height,opacity] ease-in duration-200"
                    leave-from-class="opacity-100 max-h-[1000px]"
                    leave-to-class="opacity-0 max-h-0"
                  >
                    <div v-if="child.open && (sidebarExpanded || isMobile) && child.children && child.children.length > 0"
                      class="mt-1 space-y-1 overflow-hidden"
                      :style="{ paddingLeft: (sidebarExpanded || isMobile) ? '1.25rem' : '0' }">
                      <template v-for="grandchild in child.children" :key="grandchild.name">
                        <component :is="grandchild.href ? NuxtLink : 'button'"
                          :to="grandchild.href ? grandchild.href : undefined"
                          @click="performNavigation(grandchild)" type="button"
                          class="flex items-center justify-between w-full p-2 rounded-md transition-colors text-xs group"
                          :class="[
                              grandchild.active
                                ? 'bg-primary-100 dark:bg-primary-700/10 text-primary-600 dark:text-primary-500 font-normal'
                                : 'text-neutral-500 dark:text-neutral-400/80 hover:bg-neutral-100 dark:hover:bg-neutral-700/50',
                              (!sidebarExpanded && !isMobile) ? 'justify-center' : ''
                          ]">
                          <div class="flex items-center overflow-hidden"
                               :class="{
                                 'justify-center': !sidebarExpanded && !isMobile,
                                 'justify-start': sidebarExpanded || isMobile
                               }">
                            <BaseIcon v-if="grandchild.icon" :name="grandchild.icon" class="h-4 w-4 flex-shrink-0" :class="{ 'mr-2.5': sidebarExpanded || isMobile }" />
                            <span v-if="sidebarExpanded || isMobile" class="font-normal truncate">
                                {{ grandchild.name }}
                            </span>
                          </div>
                        </component>
                      </template>
                    </div>
                  </transition>
                </div>
              </template>
            </div>
          </transition>
        </div>
      </template>
    </nav>
  </aside>
</template>