import { Center } from '@mantine/core';
import { useSearchParams } from 'react-router-dom';
import SendEmailVerificationForm from '../../components/forms/auth/SendEmailVerificationForm';

export function SendEmailVerificationPage() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');

  return (
    <Center>
      <SendEmailVerificationForm email={email} />
    </Center>
  );
}
export default SendEmailVerificationPage;
