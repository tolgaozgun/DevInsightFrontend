import {
  Box,
  Button,
  Flex,
  PasswordInput,
  Popover,
  Progress,
  Stack,
  Text,
  TextInput,
  Title,
  rem,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { RegisterDetails } from '@/types';
import { useTranslation } from 'react-i18next';
import { register as registerFn } from '../../services/auth/AuthService';
import SubtleLinkButton from '../buttons/SubtleLinkButton';

function PasswordRequirement({ meets, label }: { meets: boolean; label: string }) {
  return (
    <Text
      c={meets ? 'teal' : 'red'}
      style={{ display: 'flex', alignItems: 'center' }}
      mt={7}
      size="sm"
    >
      {meets ? (
        <IconCheck style={{ width: rem(14), height: rem(14) }} />
      ) : (
        <IconX style={{ width: rem(14), height: rem(14) }} />
      )}{' '}
      <Box ml={10}>{label}</Box>
    </Text>
  );
}

function getConfirmStrength(
  confirmRequirements: Array<any>,
  password: string,
  confirmPassword: string
) {
  let multiplier = password === confirmPassword ? 0 : 1;
  return Math.max(100 - (100 / (confirmRequirements.length + 1)) * multiplier, 10);
}

function getStrength(
  requirements: {
    re: RegExp;
    label: string;
  }[],
  password: string
) {
  let multiplier = password.length > 5 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
}

const RegisterForm = () => {
  const { t } = useTranslation();

  const requirements = [
    {
      re: /[0-9]/,
      label: t('components:forms:register:passwordRequirements:number'),
    },
    {
      re: /[a-z]/,
      label: t('components:forms:register:passwordRequirements:lowercase'),
    },
    {
      re: /[A-Z]/,
      label: t('components:forms:register:passwordRequirements:uppercase'),
    },
    {
      re: /[$&+,:;=?@#|'<>.^*()%!-]/,
      label: t('components:forms:register:passwordRequirements:specialSymbol'),
    },
  ];

  const confirmRequirements = [
    {
      re: '',
      label: t('components:forms:register:passwordRequirements:passwordsMatch'),
    },
  ];

  const form = useForm({
    initialValues: {
      name: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: {
      name: (value) =>
        value === '' ? t('components:forms:register:validationMessages:nameEmpty') : null,
      username: (value) =>
        value === '' ? t('components:forms:register:validationMessages:usernameEmpty') : null,
      email: (value) =>
        /^\S+@\S+$/.test(value)
          ? null
          : t('components:forms:register:validationMessages:invalidEmail'),
      password: (value) =>
        value === '' ? t('components:forms:register:validationMessages:passwordEmpty') : null,
      confirmPassword: (value, values) =>
        value !== values.password
          ? t('components:forms:register:validationMessages:passwordsNotMatching')
          : null,
    },
  });

  const [popoverOpened, setPopoverOpened] = useState(false);
  const [popoverOpenedConfirm, setPopoverOpenedConfirm] = useState(false);
  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      meets={requirement.re.test(form.values.password)}
    />
  ));

  const confirmChecks = confirmRequirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      meets={form.values.password === form.values.confirmPassword}
    />
  ));

  const confirmStrength = getConfirmStrength(
    confirmRequirements,
    form.values.password,
    form.values.confirmPassword
  );
  const confirmColor = confirmStrength === 100 ? 'teal' : confirmStrength >= 50 ? 'yellow' : 'red';

  const strength = getStrength(requirements, form.values.password);
  const color = strength === 100 ? 'teal' : strength > 50 ? 'yellow' : 'red';

  const navigate = useNavigate();

  const onRegister = async () => {
    const validation = form.validate();
    if (validation.hasErrors) {
      return;
    }
    let res;

    const registerInfo: RegisterDetails = {
      name: form.values.name,
      username: form.values.username,
      email: form.values.email,
      password: form.values.password,
    };

    res = await registerFn(registerInfo);
    if (!res) {
      notifications.show({
        id: 'registration-fail',
        title: t('components:forms:register:registrationFailedTitle'),
        message: t('components:forms:register:registrationFailedMessage'),
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
      id: 'registration-success',
      title: t('components:forms:register:registrationSuccessTitle'),
      message: t('components:forms:register:registrationSuccessMessage'),
      autoClose: 5000,
      withCloseButton: true,
      style: { backgroundColor: 'green' },
      styles: (theme) => ({
        title: { color: theme.white },
        description: { color: theme.white },
      }),
    });

    navigate('/');
  };

  return (
    <Stack gap={'xl'}>
      <Title size={32}>{t('components:forms:register:title')}</Title>
      <form>
        <Flex direction={'column'} gap={'xs'}>
          <TextInput
            label={t('components:forms:register:nameLabel')}
            {...form.getInputProps('name')}
          />
          <TextInput
            label={t('components:forms:register:usernameLabel')}
            {...form.getInputProps('username')}
          />
          <TextInput
            label={t('components:forms:register:emailLabel')}
            {...form.getInputProps('email')}
          />

          <Popover
            opened={popoverOpened}
            position="bottom"
            width="target"
            transitionProps={{ transition: 'pop' }}
          >
            <Popover.Target>
              <div
                onFocusCapture={() => setPopoverOpened(true)}
                onBlurCapture={() => setPopoverOpened(false)}
              >
                <PasswordInput
                  label={t('components:forms:register:passwordLabel')}
                  {...form.getInputProps('password')}
                />
              </div>
            </Popover.Target>
            <Popover.Dropdown>
              <Progress color={color} value={strength} size={5} mb="xs" />
              <PasswordRequirement
                label={t('components:forms:register:passwordRequirements:minLength')}
                meets={form.values.password.length > 5}
              />
              {checks}
            </Popover.Dropdown>
          </Popover>

          <Popover
            opened={popoverOpenedConfirm}
            position="bottom"
            width="target"
            transitionProps={{ transition: 'pop' }}
          >
            <Popover.Target>
              <div
                onFocusCapture={() => setPopoverOpenedConfirm(true)}
                onBlurCapture={() => setPopoverOpenedConfirm(false)}
              >
                <PasswordInput
                  label={t('components:forms:register:confirmPasswordLabel')}
                  {...form.getInputProps('confirmPassword')}
                />
              </div>
            </Popover.Target>
            <Popover.Dropdown>
              <Progress color={confirmColor} value={confirmStrength} size={5} mb="xs" />
              <PasswordRequirement
                label={t('components:forms:register:passwordRequirements:minLength')}
                meets={form.values.confirmPassword.length > 5}
              />
              {confirmChecks}
            </Popover.Dropdown>
          </Popover>

          <Button onClick={onRegister}>{t('components:forms:register:registerButton')}</Button>
          <SubtleLinkButton to="/login" size="sm">
            {t('components:forms:register:loginPrompt')}
          </SubtleLinkButton>
        </Flex>
      </form>
    </Stack>
  );
};

export default RegisterForm;
