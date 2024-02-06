import RegisterForm from '@/components/forms/RegisterForm';
import { Card, Center } from '@mantine/core';

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
