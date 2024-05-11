import { Card, Center } from '@mantine/core';
import RegisterForm from '../../components/forms/RegisterForm/RegisterForm';

const RegisterPage = () => {
  return (
    <Center miw={400}>
      <Card radius="md">
        <RegisterForm />
      </Card>
    </Center>
  );
};

export default RegisterPage;
