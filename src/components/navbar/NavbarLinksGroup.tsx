import { PanelLink } from '@/types';
import { Box, Collapse, Group, Text, ThemeIcon, UnstyledButton, rem } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import classes from './NavbarLinksGroup.module.css';

interface LinksGroupProps {
  label: string;
  icon: React.ElementType;
  link: string;
  initiallyOpened?: boolean;
  links?: PanelLink[];
}

export function LinksGroup({ icon: Icon, label, initiallyOpened, link, links }: LinksGroupProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(location.pathname.includes(link) || !!initiallyOpened);
  const ChevronIcon = IconChevronRight;
  const items = (hasLinks ? links : []).map((link) => (
    <Text<'a'>
      component="a"
      className={
        classes.link + (location.pathname.includes(link.link) ? ' ' + classes.linkSelected : '')
      }
      key={link.label}
      onClick={(event) => {
        event.preventDefault();
        navigate(link.link);
      }}
    >
      {link.label}
    </Text>
  ));

  return (
    <>
      <UnstyledButton
        onClick={() => {
          if (!links && link) {
            navigate(link);
            return;
          }
          setOpened((o) => !o);
        }}
        className={classes.control}
      >
        <Group justify="space-between" gap={0}>
          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <ThemeIcon variant="light" size={30}>
              <Icon size="1.1rem" />
            </ThemeIcon>
            <Box ml="md">{label}</Box>
          </Box>
          {hasLinks && (
            <ChevronIcon
              className={classes.chevron}
              size="1rem"
              stroke={1.5}
              style={{
                width: rem(16),
                height: rem(16),
                transform: opened ? 'rotate(-90deg)' : 'none',
              }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
}
