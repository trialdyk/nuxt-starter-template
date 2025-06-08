<script setup lang="ts">
import type { NavItem } from '~/types';
import type { DropdownMenuItem } from '@nuxt/ui';

const sidebarExpanded: Ref<boolean> = ref(true);
const sidebarVisible: Ref<boolean> = ref(false);
const isMobile: Ref<boolean> = ref(false);

const route = useRoute();
const appConfig = useAppConfig();

useHead({
    titleTemplate: (titleChunk) => {
        return titleChunk ? `${titleChunk} - Course Platform` : 'Course Platform';
    },
});

const toggleSidebar = (): void => {
    if (isMobile.value) {
        sidebarVisible.value = !sidebarVisible.value;
    } else {
        sidebarExpanded.value = !sidebarExpanded.value;
    }
};

const closeSidebar = (): void => {
    sidebarVisible.value = false;
};

const checkIfMobile = (): void => {
    if (typeof window !== 'undefined') {
        isMobile.value = window.innerWidth < 1024;
        if (isMobile.value) {
            sidebarVisible.value = false;
        }
    }
};

// Mengambil data navigasi dari root app.config, bukan dari ui.navigation
const rawNavigationItemsDefinition = appConfig.navigation;

const initializeNavItems = (items: Omit<NavItem, 'active' | 'open'>[]): NavItem[] => {
    return items.map(item => ({
        ...item,
        active: item.isSectionTitle ? undefined : false,
        open: item.isSectionTitle ? undefined : false,
        children: item.children ? initializeNavItems(item.children) : undefined,
    }));
};

const updateActiveStatesRecursive = (items: NavItem[], currentPath: string): NavItem[] => {
    return items.map(item => {
        if (item.isSectionTitle) {
            return { ...item };
        }

        let isLinkActive = false;
        if (item.href && item.href !== '#') {
            const normalizedItemPath = item.href === '/' ? '/' : item.href.replace(/\/$/, "");
            const normalizedCurrentPath = currentPath === '/' ? '/' : currentPath.replace(/\/$/, "");
            if (normalizedCurrentPath === normalizedItemPath ||
                (normalizedItemPath !== '/' && normalizedCurrentPath.startsWith(normalizedItemPath + '/'))) {
                isLinkActive = true;
            }
        }

        let areChildrenActive = false;
        let processedChildren = item.children;
        if (item.children && item.children.length > 0) {
            processedChildren = updateActiveStatesRecursive(item.children, currentPath);
            areChildrenActive = processedChildren.some(child => child.active);
        }

        const finalIsActive = isLinkActive || areChildrenActive;

        return {
            ...item,
            active: finalIsActive,
            children: processedChildren,
            open: item.open || areChildrenActive || false,
        };
    });
};

const navigationItems: Ref<NavItem[]> = ref(initializeNavItems(rawNavigationItemsDefinition));

const updateUserNavigationState = () => {
    const currentPath = route.path;
    let baseItems = initializeNavItems(rawNavigationItemsDefinition);

    const transferOpenStates = (targetItems: NavItem[], sourceItems: NavItem[]): void => {
        targetItems.forEach(targetItem => {
            if (targetItem.isSectionTitle) return;
            const sourceItem = sourceItems.find(s => !s.isSectionTitle && s.name === targetItem.name);
            if (sourceItem) {
                targetItem.open = sourceItem.open;
                if (targetItem.children && sourceItem.children) {
                    transferOpenStates(targetItem.children, sourceItem.children);
                }
            }
        });
    };

    transferOpenStates(baseItems, navigationItems.value);
    navigationItems.value = updateActiveStatesRecursive(baseItems, currentPath);
};

onMounted(() => {
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
});

onUnmounted(() => {
    window.removeEventListener('resize', checkIfMobile);
});

watch(() => route.path, () => {
    updateUserNavigationState();
    if (isMobile.value) {
        closeSidebar();
    }
}, { deep: true, immediate: true });


const userProfileDropdownItems = ref<DropdownMenuItem[][]>([
    [{ label: 'John Doe', slot: 'account', disabled: true }],
    [{ label: 'Profile', icon: 'i-heroicons-user-circle', click: () => navigateTo('/profile') }],
    [{
        label: 'Logout', icon: 'i-heroicons-arrow-left-on-rectangle', click: async () => {
            await $fetch('/api/logout', { method: 'POST' });
            await navigateTo('/login');
        }
    }],
]);

const notificationDropdownItems = ref<DropdownMenuItem[][]>([
    [{ label: 'No new notifications', disabled: true, slot: 'empty-notification' }]
]);

</script>

<template>
    <div class="min-h-screen bg-neutral-50 dark:bg-neutral-900">
        <SidebarHeader :sidebar-expanded="sidebarExpanded" :is-mobile="isMobile" :sidebar-visible="sidebarVisible"
            :notification-dropdown-items="notificationDropdownItems"
            :user-profile-dropdown-items="userProfileDropdownItems" @toggle-sidebar="toggleSidebar" />

        <Sidebar :sidebar-expanded="sidebarExpanded" :is-mobile="isMobile" :sidebar-visible="sidebarVisible"
            :navigation-items="navigationItems" />

        <SidebarMobileBackdrop :is-mobile="isMobile" :sidebar-visible="sidebarVisible" @close-sidebar="closeSidebar" />

        <main class="transition-all duration-300 pt-16" :class="{
            'lg:pl-[250px]': sidebarExpanded && !isMobile,
            'lg:pl-[70px]': !sidebarExpanded && !isMobile,
        }">
            <div class="p-1 lg:p-3">
                <slot />
            </div>
        </main>
    </div>
</template>