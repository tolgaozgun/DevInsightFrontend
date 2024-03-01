import { login } from '@/services/auth/AuthService';
import { Button, Flex, PasswordInput, Stack, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import SubtleLinkButton from '../../buttons/SubtleLinkButton';

const LoginForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  // const { user, isUserLoading, isUserError } = useUser();
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : t('components:forms:login:invalidEmail')),
      password: (value) => (value === '' ? t('components:forms:login:emptyPassword') : null),
    },
  });

  const { mutate: loginMutation } = useMutation({
    mutationKey: ['login'],
    mutationFn: () => login(form.values.email, form.values.password),
    onSuccess: (data) => {
      notifications.show({
        id: 'login-success',
        title: t('components:forms:login:loginSuccessful'),
        message: t('components:forms:login:successfullyLoggedIn'),
        autoClose: 5000,
        withCloseButton: true,
        style: { backgroundColor: 'green' },
        styles: (theme) => ({
          title: { color: theme.white },
          description: { color: theme.white },
        }),
      });

      // dispatch({type: "LOGIN", payload: data.data});

      // let token = {
      // 	accessToken: data.data.accessToken,
      // 	refreshToken: data.data.refreshToken,
      // }

      navigate('/');
    },
    onError: (error: any) => {
      notifications.show({
        id: 'login-fail',
        title: t('components:forms:login:loginFailed'),
        message: error.response
          ? error.response.data.msg
          : t('components:forms:login:somethingWentWrong'),
        autoClose: 5000,
        withCloseButton: true,
        style: { backgroundColor: 'red' },
        styles: (theme) => ({
          title: { color: theme.white },
          description: { color: theme.white },
        }),
      });
    },
  });

  const onLogin = async () => {
    // Validate input fields
    const validation = form.validate();
    if (validation.hasErrors) {
      return;
    }

    // Call login mutation
    loginMutation();
  };

  return (
    <Stack gap={'md'}>
      <Title size="28px">{t('components:forms:login:logInToYourAccount')}</Title>
      <SubtleLinkButton to="/register">
        {t('components:forms:login:dontHaveAccount')}
      </SubtleLinkButton>
      <form>
        <Flex direction={'column'} gap={'xs'}>
          <TextInput
            label={t('components:forms:login:emailLabel')}
            placeholder={t('components:forms:login:emailPlaceholder')}
            {...form.getInputProps('email')}
          />
          <PasswordInput
            label={t('components:forms:login:passwordLabel')}
            placeholder={t('components:forms:login:passwordPlaceholder')}
            {...form.getInputProps('password')}
          />
          <Button onClick={onLogin}>{t('components:forms:login:loginButton')}</Button>
          <Flex direction={'row'} justify={'space-between'} align={'center'}>
            <SubtleLinkButton to="/forgot-password" size="sm">
              {t('components:forms:login:forgotPassword')}
            </SubtleLinkButton>
          </Flex>
        </Flex>
      </form>
    </Stack>
  );
};

export default LoginForm;
