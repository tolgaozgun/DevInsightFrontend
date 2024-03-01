import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import loginformEN from './locales/en/components/forms/login_form.json';
import registerFormEN from './locales/en/components/forms/register_form.json';
import sendEmailVerificationFormEN from './locales/en/components/forms/send_email_verification_form.json';
import verifyEmailFormEN from './locales/en/components/forms/verify_email_form.json';
import ErrorPageEN from './locales/en/pages/error_page.json';
import NotFoundPageEN from './locales/en/pages/not_found_page.json';
import loginformTR from './locales/tr/components/forms/login_form.json';
import registerFormTR from './locales/tr/components/forms/register_form.json';
import sendEmailVerificationFormTR from './locales/tr/components/forms/send_email_verification_form.json';
import verifyEmailFormTR from './locales/tr/components/forms/verify_email_form.json';
import ErrorPageTR from './locales/tr/pages/error_page.json';
import NotFoundPageTR from './locales/tr/pages/not_found_page.json';

const resources = {
  en: {
    components: {
      forms: {
        register: registerFormEN,
        login: loginformEN,
        sendEmailVerification: sendEmailVerificationFormEN,
        verifyEmail: verifyEmailFormEN,
      },
    },
    pages: {
      notFound: NotFoundPageEN,
      error: ErrorPageEN,
    },
  },

  tr: {
    components: {
      forms: {
        register: registerFormTR,
        login: loginformTR,
        sendEmailVerification: sendEmailVerificationFormTR,
        verifyEmail: verifyEmailFormTR,
      },
    },
    pages: {
      notFound: NotFoundPageTR,
      error: ErrorPageTR,
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
