import {
  AppShell,
  AppShellMain,
  AppShellNavbar,
  AppShellNavbarConfiguration,
  Container,
  rem,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import FooterNav from './components/footer/FooterNav';
import HeaderNav from './components/header/HeaderNav';
import { AdminPanelData } from './components/navbar/AdminPanelData';
import { PanelNavbar } from './components/navbar/PanelNavbar';

const Layout = () => {
  const theme = useMantineTheme();
  const { pathname } = useLocation();

  const tablet_match = useMediaQuery('(max-width: 768px)');
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const [opened, setOpened] = useState(false);
  const { setColorScheme, colorScheme } = useMantineColorScheme();

  const checkLink = (link: string) => {
    return pathname.toLowerCase().startsWith(link);
  };

  const tabs = [
    {
      name: 'Ana Sayfa',
      link: '/',
    },
  ];

  let header = null;
  let navbar = null;
  let footer = null;

  if (checkLink('/panel')) {
    navbar = (
      <PanelNavbar
        onClose={() => setOpened(false)}
        hidden={!opened}
        panelName="Panel"
        panelData={AdminPanelData}
      />
    );
    header = (
      <AppShell.Header
        style={{
          height: rem(60),
          border: 'none',
          boxShadow: tablet_match ? theme.shadows.md : theme.shadows.sm,
        }}
      >
        <Container fluid py="sm" px="lg">
          <HeaderNav
            opened={opened}
            handleOpen={() => setOpened((o) => !o)}
            desktopOpened={desktopOpened}
            mobileOpened={mobileOpened}
            toggleDesktop={toggleDesktop}
            toggleMobile={toggleMobile}
          />
        </Container>
      </AppShell.Header>
    );
    footer = (
      <AppShell.Footer p="md">
        <Container fluid px="lg">
          <FooterNav />
        </Container>
      </AppShell.Footer>
    );
  } else if (!checkLink('/login') && !checkLink('/register')) {
    // header = <AppShell.Header></AppShell.Header>;
  }
  let headerHeight = header ? 60 : 0;
  let navbarProps: AppShellNavbarConfiguration = navbar
    ? {
        width: 300,
        breakpoint: 'md',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }
    : { width: 0, breakpoint: '' };

  return (
    <main className="App">
      <AppShell
        padding="md"
        bg={colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0]}
        header={{ height: headerHeight }}
        navbar={navbarProps}
        // styles={(theme) => ({
        //   main: {
        //     backgroundColor:
        //       theme.colorScheme === "dark"
        //         ? theme.colors.dark[8]
        //         : theme.colors.gray[0],wh

        //   },
        // })}
      >
        {header && header}
        {navbar && <AppShellNavbar>{navbar}</AppShellNavbar>}
        {footer && footer}
        <AppShellMain mt={30}>
          <Outlet />
        </AppShellMain>
      </AppShell>
    </main>
  );
};

export default Layout;
