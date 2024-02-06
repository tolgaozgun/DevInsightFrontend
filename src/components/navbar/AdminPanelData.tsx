import { PanelItem } from '@/types';
import { IconAdjustments, IconGauge, IconUsersGroup } from '@tabler/icons-react';

export const AdminPanelData: PanelItem[] = [
  { label: 'Dashboard', icon: IconGauge, link: '/panel/dashboard' },
  {
    label: 'Users',
    link: '/users',
    icon: IconUsersGroup,
    links: [
      { label: 'List Users', link: '/panel/users/list' },
      { label: 'Add User', link: '/panel/users/add' },
    ],
  },
  {
    label: 'Settings',
    link: '/settings',
    icon: IconAdjustments,
    links: [
      { label: 'Account Settings', link: '/panel/settings/account' },
      { label: 'Preferences', link: '/panel/settings/preferences' },
    ],
  },
];
