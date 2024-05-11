import { Box, Container, Text, Title } from '@mantine/core';

const MainPage = () => {
  return (
    <Container style={{ mt: 4, mb: 4 }}>
      <Box>
        <Title variant="h3" component="h1">
          Hello world
        </Title>
        <Text variant="h6">Hey there! Welcome to the App!</Text>
      </Box>
    </Container>
  );
};

export default MainPage;
