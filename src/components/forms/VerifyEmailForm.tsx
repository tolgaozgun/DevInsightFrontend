import {
    createStyles,
    Paper,
    Title,
    Text,
    TextInput,
    Button,
    Container,
    Group,
    Anchor,
    Center,
    Box,
    rem,
  } from '@mantine/core';
  import { IconArrowLeft } from '@tabler/icons-react';
import { EmailVerificationRequest } from '../../../types/VerificationTypes';
import { useForm } from '@mantine/form';
import { isErrorResponse } from '../../../utils/utils';
import { notifications } from '@mantine/notifications';
import { useNavigate } from 'react-router';
import { useVerifyEmail } from '../../../hooks/verification/useVerifyEmail';
import { useTranslation } from 'react-i18next';
  
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

  interface VerifyEmailFormProps {
    email?: string | null;
    token?: string | null;
  }
  
  export function VerifyEmailForm({email, token}: VerifyEmailFormProps) {
    const { t } = useTranslation();
    const { classes } = useStyles();
    const { verify } = useVerifyEmail();
    const navigate = useNavigate();
	const form = useForm({
		initialValues: {
			email: email ? email : '',
      verificationCode: token ? token : '',
		},

		validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : t("components:forms:verifyEmail:invalidEmail")),
      verificationCode: (value) => (value === '' ? t("components:forms:verifyEmail:emptyVerificationCode") : null),
    },
	});

    const onVerify = async () => {
		const validation = form.validate();
		if (validation.hasErrors) {
			return;
		}

		const emailVerifyRequest: EmailVerificationRequest = {
			email: form.values.email,
      verificationCode: form.values.verificationCode,
		};

		const res = await verify(emailVerifyRequest);
        
		if (isErrorResponse(res)) {
			notifications.show({
				id: 'verify-fail',
        title: t("components:forms:verifyEmail:verifyEmailFailedTitle"),
				message: res.msg,
				autoClose: 5000,
				withCloseButton: true,
				style: { backgroundColor: 'red' },
				styles: (theme) => ({
					title: { color: theme.white },
					description: { color: theme.white }
				})
			});
			return;
		}

		notifications.show({
			id: 'verify-success',
			title: t("components:forms:verifyEmail:verifyEmailSuccessTitle"),
      message: t("components:forms:verifyEmail:verifyEmailSuccessMessage"),
      autoClose: 5000,
			withCloseButton: true,
			style: { backgroundColor: 'green' },
			styles: (theme) => ({
				title: { color: theme.white },
				description: { color: theme.white }
			})
		});
		navigate('/login');
	};

    const onBackToLogin = () => {
        navigate('/login');
    }

    const onForwardToVerify = () => {
        navigate('/verify-email?email=' + form.values.email);
    }
  
    return (
      <Container size={460} my={30}>
        <Title className={classes.title} align="center">
          {t("components:forms:verifyEmail:verifyEmailTitle")}
        </Title>
        <Text c="dimmed" fz="sm" ta="center">
          {t("components:forms:verifyEmail:verificationCodePlaceholder")}
        </Text>
  
        <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
            <form>
          <TextInput 
            label={t("components:forms:verifyEmail:yourEmailLabel")} 
            placeholder="email@email.com" 
            {...form.getInputProps('email')}
             />
             <TextInput 
               label={t("components:forms:verifyEmail:yourVerificationCodeLabel")} 
               {...form.getInputProps('verificationCode')}
                />
          <Group position="apart" mt="lg" className={classes.controls}>
            <Anchor onClick={onBackToLogin} color="dimmed" size="sm" className={classes.control}>
              <Center inline>
                <IconArrowLeft size={rem(12)} stroke={1.5} />
                <Box ml={5}>{t("components:forms:verifyEmail:backToLoginPage")}</Box>
              </Center>
            </Anchor>
            <Anchor onClick={onForwardToVerify} color="dimmed" size="sm" className={classes.control}>
              <Center inline>
                <Box ml={5}>{t("components:forms:verifyEmail:noVerificationCode")}</Box>
              </Center>
            </Anchor>
            <Button onClick={onVerify} className={classes.control}>{t("components:forms:verifyEmail:sendVerificationCodeButton")}</Button>
          </Group>
          </form>
        </Paper>
      </Container>
    );
  }
  export default VerifyEmailForm;
  