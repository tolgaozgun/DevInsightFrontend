import { TextInput, rem } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { Spotlight, SpotlightActionData, spotlight } from '@mantine/spotlight';
import '@mantine/spotlight/styles.css';
import { IconDashboard, IconFileText, IconHome, IconSearch } from '@tabler/icons-react';

const actions: SpotlightActionData[] = [
  {
    id: 'home',
    label: 'Home',
    description: 'Get to home page',
    onClick: () => console.log('Home'),
    leftSection: <IconHome style={{ width: rem(24), height: rem(24) }} stroke={1.5} />,
  },
  {
    id: 'dashboard',
    label: 'Dashboard',
    description: 'Get full information about current system status',
    onClick: () => console.log('Dashboard'),
    leftSection: <IconDashboard style={{ width: rem(24), height: rem(24) }} stroke={1.5} />,
  },
  {
    id: 'documentation',
    label: 'Documentation',
    description: 'Visit documentation to lean more about all features',
    onClick: () => console.log('Documentation'),
    leftSection: <IconFileText style={{ width: rem(24), height: rem(24) }} stroke={1.5} />,
  },
];

interface SpotlightSearchProps {
  rightSection?: React.ReactNode;
}

const SpotlightSearch = ({ rightSection }: SpotlightSearchProps) => {
  const tablet_match = useMediaQuery('(max-width: 768px)');

  return (
    <>
      <TextInput
        placeholder="Search"
        rightSection={rightSection}
        onClick={(event) => {
          event.preventDefault();
          spotlight.open();
        }}
        ml="md"
        style={{ width: tablet_match ? 'auto' : rem(400) }}
      />
      {/* <Button onClick={spotlight.open}>Open spotlight</Button> */}
      <Spotlight
        actions={actions}
        nothingFound="We could not find your search."
        highlightQuery
        searchProps={{
          leftSection: <IconSearch style={{ width: rem(20), height: rem(20) }} stroke={1.5} />,
          placeholder: 'Search...',
        }}
      />
    </>
  );
};

export default SpotlightSearch;
