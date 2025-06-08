<script setup lang="ts">
import type { ThemeColor, ThemeVariant } from '~/types';

interface NotificationAction {
    label: string;
    click: () => void;
    color?: ThemeColor;
    variant?: ThemeVariant;
    icon?: string;
}

interface Notification {
    id: number;
    avatar?: { src: string; alt?: string };
    icon?: string;
    title: string;
    description: string;
    time: string;
    read?: boolean;
    actions?: NotificationAction[];
}

const exampleNotifications = ref<Notification[]>([
    {
        id: 1,
        icon: 'i-heroicons-chat-bubble-left-ellipsis',
        title: 'Pesan Baru dari Jane Doe',
        description: 'Hei, apa kamu sudah lihat update terbaru di proyek X?',
        time: '5 menit lalu',
        read: false,
        actions: [{ label: 'Balas', click: () => console.log('Balas 1'), color: 'primary', variant: 'soft', icon: 'i-heroicons-chat-bubble-left-right' }]
    },
    {
        id: 2,
        avatar: { src: 'https://i.pravatar.cc/40?u=team', alt: 'Tim IT' },
        title: 'Update Sistem Terjadwal',
        description: 'Maintenance sistem akan dilakukan malam ini pukul 23:00 hingga 02:00.',
        time: '2 jam lalu',
        read: true,
    },
    {
        id: 3,
        icon: 'i-heroicons-exclamation-triangle-solid',
        title: 'Peringatan Keamanan Akun',
        description: 'Terdeteksi upaya login yang mencurigakan pada akun Anda dari lokasi yang tidak dikenal. Segera amankan akun Anda.',
        time: '1 hari lalu',
        read: false,
        actions: [{ label: 'Lihat Detail & Amankan Akun', click: () => console.log('Detail Keamanan 3'), color: 'error', variant: 'outline' }]
    },
    {
        id: 4,
        icon: 'i-heroicons-check-circle-solid',
        title: 'Laporan Bulanan Siap',
        description: 'Laporan performa bulan April telah berhasil di-generate dan siap untuk diunduh.',
        time: '3 hari lalu',
        read: true,
    }
]);

const markAllAsRead = () => {
    exampleNotifications.value.forEach(n => n.read = true);
    console.log('Semua notifikasi ditandai sudah dibaca');
};

</script>

<template>
    <BaseSlideover title="Notifications" >
        <BaseButton
            class="rounded-full bg-transparent border border-slate-300 dark:border-slate-700 flex justify-center items-center p-1.5 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors duration-300 relative"
            aria-label="Notifications">
            <BaseIcon name="i-heroicons-bell" class="h-5 w-5" />
            <span v-if="exampleNotifications.some(n => !n.read)"
                class="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
        </BaseButton>
        <template #body>
            <div v-if="exampleNotifications.length === 0" class="p-6 flex flex-col items-center justify-center h-full">
                <BaseIcon name="i-heroicons-archive-box-x-mark" class="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p class="text-gray-500 dark:text-gray-400">You have no new notifications.</p>
                <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">Come back later!</p>
            </div>

            <div v-else>
                <div v-for="notification in exampleNotifications" :key="notification.id"
                    class="p-4 sm:px-6 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer border-b border-gray-200 dark:border-gray-700 last:border-b-0"
                    :class="!notification.read ? 'bg-primary-50 dark:bg-primary-900/20' : ''"
                    @click="notification.read = true">
                    <div class="flex gap-3">
                        <BaseAvatar v-if="notification.avatar" v-bind="notification.avatar" size="md" />
                        <BaseIcon v-else-if="notification.icon" :name="notification.icon"
                            class="h-10 w-10 p-2.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                        <div class="w-0 flex-1">
                            <p class="text-sm font-medium text-gray-900 dark:text-white">
                                {{ notification.title }}
                            </p>
                            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                                {{ notification.description }}
                            </p>
                            <p class="mt-2 text-xs text-gray-400 dark:text-gray-500">
                                {{ notification.time }}
                            </p>
                            <div v-if="notification.actions && notification.actions.length > 0"
                                class="mt-3 flex space-x-2">
                                <BaseButton v-for="action in notification.actions" :key="action.label"
                                    :label="action.label" :icon="action.icon" :color="action.color || 'primary'"
                                    :variant="action.variant || 'solid'" size="xs" @click.stop="action.click" />
                            </div>
                        </div>
                        <div v-if="!notification.read" class="ml-auto flex-shrink-0 self-start mt-1">
                            <span
                                class="inline-block h-2.5 w-2.5 rounded-full bg-primary-500 dark:bg-primary-400"></span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex justify-end" v-if="exampleNotifications.filter(n => !n.read).length > 0">
                <BaseButton label="Mark all as read" variant="link" color="secondary" size="sm"
                    @click="markAllAsRead" />
            </div>
        </template>
    </BaseSlideover>
</template>