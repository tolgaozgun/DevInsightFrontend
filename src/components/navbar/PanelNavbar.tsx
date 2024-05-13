import { PanelItem } from '@/types';
import { ActionIcon, Code, Flex, Group, ScrollArea, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconX } from '@tabler/icons-react';
import useAxiosSecure from '../../hooks/auth/useAxiosSecure';
import RepositoryDropdown from '../RepositoryDropdown/RepositoryDropdown';
import { LinksGroup } from './NavbarLinksGroup';
import classes from './PanelNavbar.module.css';

interface PanelNavbarProps {
  hidden: boolean;
  panelName: string;
  panelData: PanelItem[];
  onClose: () => void;
}
export function PanelNavbar({ hidden, panelName, panelData, onClose }: PanelNavbarProps) {
  const axiosSecure = useAxiosSecure();
  const theme = useMantineTheme();
  const tablet_match = useMediaQuery('(max-width: 768px)');
  const links = panelData.map((item) => <LinksGroup {...item} key={item.label} />);

  return (
    <nav className={classes.navbar}>
      <div className={classes.header}>
        <Flex justify="space-between" align="center" gap="sm">
          <Group justify="space-between">
            {/* <Logo style={{ width: rem(120) }} /> */}
            <Code fw={700}>{panelName}</Code>
          </Group>
          {tablet_match && (
            <ActionIcon onClick={onClose} variant="transparent">
              <IconX color="white" />
            </ActionIcon>
          )}
        </Flex>
      </div>

      <RepositoryDropdown />

      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>

      <div className={classes.footer}>{/* <UserMenuItem user={user} /> */}</div>
    </nav>
  );
}
