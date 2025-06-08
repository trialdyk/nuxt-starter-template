export default defineAppConfig({
  ui: {
    
  },
  navigation: [
      {
        name: 'General',
        isSectionTitle: true,
      },
      {
        name: 'Dashboard',
        icon: 'i-heroicons-home',
        href: '/dashboard',
      },
      {
        name: 'My Courses',
        icon: 'i-heroicons-academic-cap',
        href: '/my-courses',
      },
      {
        name: 'Browse Courses',
        icon: 'i-heroicons-magnifying-glass',
        href: '/courses',
      },
      {
        name: 'Instructor Tools',
        isSectionTitle: true,
      },
      {
        name: 'Manage Courses',
        icon: 'i-heroicons-video-camera',
        children: [
          {
            name: 'My Published',
            icon: 'i-heroicons-check-circle',
            href: '/instructor/courses',
          },
          {
            name: 'Create New Course',
            icon: 'i-heroicons-plus-circle',
            href: '/instructor/create',
          },
        ],
      },
      {
        name: 'Analytics',
        icon: 'i-heroicons-chart-pie',
        href: '/instructor/analytics',
      },
      {
        name: 'Account',
        isSectionTitle: true,
      },
      {
        name: 'Settings',
        icon: 'i-heroicons-cog-6-tooth',
        href: '/settings',
      },
    ]
})