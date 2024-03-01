// ErrorPage.tsx
import { Box, Button, Container, Typography } from '@mui/material';
import React from 'react';

interface ErrorPageProps {
  errorCode?: number;
  message?: string;
  onGoBack?: () => void;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ errorCode, message, onGoBack }) => {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Error {errorCode}
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          {message || 'An error occurred'}
        </Typography>
        {onGoBack && (
          <Button variant="contained" color="primary" onClick={onGoBack} sx={{ mt: 3, mb: 2 }}>
            Go Back
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default ErrorPage;
