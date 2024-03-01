import { Avatar, Group, Text, UnstyledButton, UnstyledButtonProps, rem } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import { MouseEventHandler } from 'react';
import classes from './UserButton.module.css';

interface UserButtonProps extends UnstyledButtonProps {
  image: string;
  name: string;
  email: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  icon?: React.ReactNode;
}

export function UserButton({ image, name, email, onClick, icon, ...others }: UserButtonProps) {
  return (
    <UnstyledButton onClick={onClick} className={classes.user} {...others}>
      <Group>
        <Avatar src={image} radius="xl" />

        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            {name}
          </Text>

          <Text c="dimmed" size="xs">
            {email}
          </Text>
        </div>

        <IconChevronRight style={{ width: rem(14), height: rem(14) }} stroke={1.5} />
      </Group>
    </UnstyledButton>
  );
}
