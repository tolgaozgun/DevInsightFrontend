// NotFoundPage.tsx
import { Box, Button, Container, Text, Title } from '@mantine/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Container component="main">
      <Box
        style={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Title component="h1" variant="h5">
          {t('pages:notFound:title')}
        </Title>
        <Text variant="body1" style={{ mt: 2 }}>
          {t('pages:notFound:description')}
        </Text>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/')}
          style={{ mt: 3, mb: 2 }}
        >
          {t('pages:notFound:goToHomeButton')}
        </Button>
      </Box>
    </Container>
  );
};

export default NotFoundPage;
