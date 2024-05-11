import { Center, Container } from '@mantine/core';
import LoginForm from '../../components/forms/LoginForm/LoginForm';

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
