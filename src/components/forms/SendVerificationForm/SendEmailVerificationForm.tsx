import {
  Anchor,
  Box,
  Button,
  Center,
  Container,
  Group,
  Paper,
  Text,
  TextInput,
  Title,
  createStyles,
  rem,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconArrowLeft } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: rem(26),
    fontWeight: 900,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  controls: {
    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column-reverse',
    },
  },

  control: {
    [theme.fn.smallerThan('xs')]: {
      width: '100%',
      textAlign: 'center',
    },
  },
}));

interface SendEmailVerificationFormProps {
  email?: string | null;
}

export function SendEmailVerificationForm({ email }: SendEmailVerificationFormProps) {
  const { t } = useTranslation();
  const { classes } = useStyles();
  const { resendVerification } = useResendEmailVerification();
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: email ? email : '',
    },

    validate: {
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : t('components:forms:sendEmailVerification:invalidEmail'),
    },
  });

  const sendVerification = async () => {
    const validation = form.validate();
    if (validation.hasErrors) {
      return;
    }

    const emailResendRequest: EmailResendRequest = {
      email: form.values.email,
    };

    const res = await resendVerification(emailResendRequest);

    if (isErrorResponse(res)) {
      notifications.show({
        id: 'resend-fail',
        title: t('components:forms:sendEmailVerification:resendFailedTitle'),
        message: res.msg,
        autoClose: 5000,
        withCloseButton: true,
        style: { backgroundColor: 'red' },
        styles: (theme) => ({
          title: { color: theme.white },
          description: { color: theme.white },
        }),
      });
      return;
    }

    notifications.show({
      id: 'resend-success',
      title: t('components:forms:sendEmailVerification:resendSuccessfulTitle'),
      message: t('components:forms:sendEmailVerification:resendSuccessfulMessage'),
      autoClose: 5000,
      withCloseButton: true,
      style: { backgroundColor: 'green' },
      styles: (theme) => ({
        title: { color: theme.white },
        description: { color: theme.white },
      }),
    });
    navigate('/verify-email/step-2?email=' + form.values.email);
  };

  const onBackToLogin = () => {
    navigate('/login');
  };

  const onForwardToVerify = () => {
    navigate('/verify-email/step-2');
  };

  return (
    <Container size={460} my={30}>
      <Title className={classes.title} align="center">
        {t('components:forms:sendEmailVerification:title')}
      </Title>
      <Text c="dimmed" fz="sm" ta="center">
        {t('components:forms:sendEmailVerification:instruction')}
      </Text>

      <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
        <form>
          <TextInput
            label={t('components:forms:sendEmailVerification:emailLabel')}
            placeholder={t('components:forms:sendEmailVerification:emailPlaceholder')}
            {...form.getInputProps('email')}
          />
          <Group position="apart" mt="lg" className={classes.controls}>
            <Anchor onClick={onBackToLogin} color="dimmed" size="sm" className={classes.control}>
              <Center inline>
                <IconArrowLeft size={rem(12)} stroke={1.5} />
                <Box ml={5}>{t('components:forms:sendEmailVerification:backToLogin')}</Box>
              </Center>
            </Anchor>
            <Anchor
              onClick={onForwardToVerify}
              color="dimmed"
              size="sm"
              className={classes.control}
            >
              <Center inline>
                <Box ml={5}>{t('components:forms:sendEmailVerification:alreadyHaveCode')}</Box>
              </Center>
            </Anchor>
            <Button onClick={sendVerification} className={classes.control}>
              {t('components:forms:sendEmailVerification:sendVerificationButton')}
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
}
export default SendEmailVerificationForm;
