<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
const appConfig = useAppConfig();
const isOpen = ref(false);

const availablePrimaryColors = [
    { name: 'Indigo', value: 'indigo', swatchClass: 'bg-indigo-500' },
    { name: 'Red', value: 'red', swatchClass: 'bg-red-500' },
    { name: 'Orange', value: 'orange', swatchClass: 'bg-orange-500' },
    { name: 'Amber', value: 'amber', swatchClass: 'bg-amber-500' },
    { name: 'Yellow', value: 'yellow', swatchClass: 'bg-yellow-500' },
    { name: 'Lime', value: 'lime', swatchClass: 'bg-lime-500' },
    { name: 'Green', value: 'green', swatchClass: 'bg-green-500' },
    { name: 'Emerald', value: 'emerald', swatchClass: 'bg-emerald-500' },
    { name: 'Teal', value: 'teal', swatchClass: 'bg-teal-500' },
    { name: 'Cyan', value: 'cyan', swatchClass: 'bg-cyan-500' },
    { name: 'Sky', value: 'sky', swatchClass: 'bg-sky-500' },
    { name: 'Blue', value: 'blue', swatchClass: 'bg-blue-500' },
    { name: 'Violet', value: 'violet', swatchClass: 'bg-violet-500' },
    { name: 'Purple', value: 'purple', swatchClass: 'bg-purple-500' },
    { name: 'Fuchsia', value: 'fuchsia', swatchClass: 'bg-fuchsia-500' },
    { name: 'Pink', value: 'pink', swatchClass: 'bg-pink-500' },
    { name: 'Rose', value: 'rose', swatchClass: 'bg-rose-500' }
];

const availableNeutralColors = [
    { name: 'Slate', value: 'slate', class: 'bg-slate-500' },
    { name: 'Gray', value: 'gray', class: 'bg-neutral-500' },
    { name: 'Zinc', value: 'zinc', class: 'bg-zinc-500' },
    { name: 'Neutral', value: 'neutral', class: 'bg-neutral-500' },
    { name: 'Stone', value: 'stone', class: 'bg-stone-500' }
];

const currentPrimaryColor = computed(() => appConfig.ui?.colors.primary);
const currentNeutralColor = computed(() => appConfig.ui?.colors.neutral);

const setPrimaryColor = (colorValue: string) => {
    if (appConfig.ui) {
        appConfig.ui.colors.primary = colorValue;
        localStorage.setItem('theme-primary-color', colorValue);
    }
};

const setNeutralColor = (colorValue: string) => {
    if (appConfig.ui) {
        appConfig.ui.colors.neutral = colorValue;
        localStorage.setItem('theme-neutral-color', colorValue);
    }
};

onMounted(() => {
    const savedColor = localStorage.getItem('theme-primary-color');
    const savedNeutralColor = localStorage.getItem('theme-neutral-color');

    //@ts-ignore
    if (savedColor && appConfig.ui && availablePrimaryColors.some(c => c.value === savedColor)) {
        appConfig.ui.colors.primary = savedColor;
    } else if (appConfig.ui && appConfig.ui.colors.primary) {
        localStorage.setItem('theme-primary-color', appConfig.ui.colors.primary);
    }

    //@ts-ignore
    if (savedNeutralColor && appConfig.ui && availableNeutralColors.some(c => c.value === savedNeutralColor)) {
        appConfig.ui.colors.neutral = savedNeutralColor;
    } else if (appConfig.ui && appConfig.ui.colors.neutral) {
        localStorage.setItem('theme-neutral-color', appConfig.ui.colors.neutral);
    }
});
</script>

<template>
    <BaseSlideover title="Color Theme">
        <BaseButton icon="i-heroicons-swatch" color="secondary" variant="ghost" aria-label="Change theme color"
            @click="isOpen = true"
            class="rounded-full p-1.5 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors duration-300" />

        <template #body>
            <div class="p-4 space-y-6">
                <p class="text-sm text-muted">
                    Select a primary color for the application theme.
                </p>

                <div>
                    <h3 class="text-sm font-semibold text-default mb-3">
                        Primary
                    </h3>
                    <div class="grid grid-cols-4 gap-2">
                        <button v-for="color in availablePrimaryColors" :key="color.value"
                            @click="setPrimaryColor(color.value)"
                            class="p-2 rounded-lg flex text-center items-center gap-2 justify-center space-y-1.5 focus:outline-none transition-all duration-150"
                            :class="[
                                currentPrimaryColor === color.value
                                    ? `ring-1 bg-${color.value}-50 dark:bg-${color.value}-500/20`
                                    : 'bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 shadow-sm border border-neutral-200 dark:border-neutral-700',
                            ]">
                            <span class="size-3 my-auto rounded-full" :class="color.swatchClass"></span>
                            <span
                                class="text-[11px] my-auto font-medium text-default text-center capitalize">
                                {{ color.name }}
                            </span>
                        </button>
                    </div>
                </div>

                <div>
                    <h3 class="text-sm font-semibold text-default mb-3">
                        Neutral
                    </h3>
                    <div class="flex flex-wrap gap-2">
                        <button v-for="neutralColor in availableNeutralColors" :key="neutralColor.name"
                            @click="setNeutralColor(neutralColor.value)"
                            class="p-2 rounded-lg flex text-center items-center gap-2 justify-center space-y-1.5 bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 shadow-sm border border-neutral-200 dark:border-neutral-700"
                            :class="[
                                currentNeutralColor === neutralColor.value
                                    ? `ring-1 bg-${neutralColor.value}-50 dark:bg-${neutralColor.value}-500/20`
                                    : 'bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 shadow-sm border border-neutral-200 dark:border-neutral-700',
                            ]">
                            <span class="size-3 rounded-full my-auto" :class="neutralColor.class"></span>
                            <span
                                class="text-[11px] font-medium my-auto text-default text-center capitalize">{{
                                    neutralColor.name }}</span>
                        </button>
                    </div>
                </div>
            </div>
        </template>
    </BaseSlideover>
</template>