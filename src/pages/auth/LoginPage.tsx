import LoginForm from '@/components/forms/LoginForm/LoginForm';
import { Center, Container } from '@mantine/core';

const LoginPage = () => {
  return (
    <Center h="60vh">
      <Container>
        <LoginForm />
      </Container>
    </Center>
  );
};

export default LoginPage;
