import { Box, Container, Typography } from '@mui/material';

const MainPage = () => {
  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box textAlign="center">
        <Typography variant="h3" component="h1" gutterBottom>
          Hello world
        </Typography>
        <Typography variant="h6">Hey there! Welcome to the App!</Typography>
      </Box>
    </Container>
  );
};

export default MainPage;
