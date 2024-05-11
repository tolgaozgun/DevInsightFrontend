// ErrorPage.tsx
import { Box, Button, Container, Text, Title } from '@mantine/core';
import React from 'react';

interface ErrorPageProps {
  errorCode?: number;
  message?: string;
  onGoBack?: () => void;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ errorCode, message, onGoBack }) => {
  return (
    <Container>
      <Box
        style={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Title component="h1" variant="h5">
          Error {errorCode}
        </Title>
        <Text variant="body1" style={{ mt: 2 }}>
          {message || 'An error occurred'}
        </Text>
        {onGoBack && (
          <Button variant="contained" color="primary" onClick={onGoBack} style={{ mt: 3, mb: 2 }}>
            Go Back
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default ErrorPage;
