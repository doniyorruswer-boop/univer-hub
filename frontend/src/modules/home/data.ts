import {
  appsOutline,
  flashOutline,
  phonePortraitOutline,
} from 'ionicons/icons';

export const mainWebsiteUrl = 'https://namdtu.uz/';

/** Non-translatable metric values — order must match i18n.metrics */
export const metricsValues: string[] = ['1', '3', '6+'];

/** Icon per hero point — order must match i18n.heroPoints */
export const heroPointIcons: string[] = [appsOutline, flashOutline, phonePortraitOutline];

/** Technical data per service card — order must match i18n.services */
export const serviceLinks = [
  {
    href: 'https://t.me/nstu_tech_support_bot',
    theme: 'theme-support',
    logoSrc: '/logo-arm.png',
  },
  {
    href: 'https://t.me/nstu_registrator_office_bot',
    theme: 'theme-registrator',
    logoSrc: '/logo-registrator.png',
  },
  {
    href: 'https://t.me/nammtikutubxonabot',
    theme: 'theme-library',
    logoSrc: '/logo-tech-support.jpg',
  },
];

/** Technical data per platform card — order must match i18n.platforms */
export const platformLinks = [
  {
    href: 'https://namdtu.uz/',
    theme: 'theme-site',
    logoSrc: '/logo-namdtu.jpeg',
  },
  {
    href: 'https://student.namdtu.uz/dashboard/login',
    theme: 'theme-student',
    logoSrc: '/logo-namdtu.jpeg',
  },
  {
    href: 'https://hemis.namdtu.uz/dashboard/login',
    theme: 'theme-staff',
    logoSrc: '/logo-namdtu.jpeg',
  },
  {
    href: 'https://regoffice.namdtu.uz/',
    theme: 'theme-regoffice',
    logoSrc: '/logo-registrator.png',
  },
  {
    href: 'https://library.namdtu.uz/',
    theme: 'theme-library-web',
    logoSrc: '/logo-arm.png',
  },
  {
    href: 'https://student-elms.namdtu.uz/',
    theme: 'theme-lms',
    logoSrc: '/logo-namdtu.jpeg',
  },
];

