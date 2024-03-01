import { UserModel } from '@/types';
import { Menu } from '@mantine/core';
import { IconLogout, IconSettings } from '@tabler/icons-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { UserButton } from './UserButton';

interface UserMenuItemProps {
  user?: UserModel | null;
}

const UserMenuItem = ({ user }: UserMenuItemProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  if (!user) {
    return <></>;
  }

  const handleLogout = () => {
    navigate('/logout');
  };

  const handleSettings = () => {
    navigate('/panel/settings');
  };

  return (
    <>
      <UserButton
        image={user.picture}
        name={user.name}
        email={user.email}
        onClick={handleProfileClick}
      />
      {isMenuOpen && (
        <Menu>
          {/* <Menu.Item
                    icon={<IconHeart size="0.9rem" stroke={1.5} />}
                >
                    Liked posts
                </Menu.Item>
                <Menu.Item
                    icon={<IconStar size="0.9rem" stroke={1.5} />}
                >
                    Saved posts
                </Menu.Item>
                <Menu.Item
                    icon={<IconMessage size="0.9rem" stroke={1.5} />}
                >
                    Your comments
                </Menu.Item>

                <Menu.Label>Settings</Menu.Label>
                <Menu.Item icon={<IconSettings size="0.9rem" stroke={1.5} />}>
                    Account settings
                </Menu.Item>
                <Menu.Item icon={<IconSwitchHorizontal size="0.9rem" stroke={1.5} />}>
                    Change account
                </Menu.Item>
                <Menu.Item icon={<IconLogout size="0.9rem" stroke={1.5} />}>Logout</Menu.Item>

                <Menu.Divider />

                <Menu.Label>Danger zone</Menu.Label>
                <Menu.Item icon={<IconPlayerPause size="0.9rem" stroke={1.5} />}>
                    Pause subscription
                </Menu.Item>
                <Menu.Item color="red" icon={<IconTrash size="0.9rem" stroke={1.5} />}>
                    Delete account
                </Menu.Item> */}
          <Menu.Label>Settings</Menu.Label>
          <Menu.Item
            leftSection={<IconSettings size="0.9rem" stroke={1.5} />}
            onClick={handleSettings}
          >
            Account settings
          </Menu.Item>
          <Menu.Item leftSection={<IconLogout size="0.9rem" stroke={1.5} />} onClick={handleLogout}>
            Logout
          </Menu.Item>
        </Menu>
      )}
    </>
  );
};

export default UserMenuItem;
