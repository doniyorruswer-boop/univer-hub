export const mainWebsiteUrl = 'https://namdtu.uz/';

export interface PlatformMeta {
  id: string;
  url: string;
  icon: string;
}

export const webPlatformMeta: PlatformMeta[] = [
  { id: 'official-site', url: 'https://namdtu.uz/', icon: 'language' },
  { id: 'hemis-student', url: 'https://student.namdtu.uz/dashboard/login', icon: 'school' },
  { id: 'hemis-staff', url: 'https://hemis.namdtu.uz/dashboard/login', icon: 'badge' },
  { id: 'reg-office', url: 'https://regoffice.namdtu.uz/', icon: 'assignment_ind' },
  { id: 'arm-library', url: 'https://library.namdtu.uz/', icon: 'library_books' },
  { id: 'lms-elearning', url: 'https://student-elms.namdtu.uz/', icon: 'laptop_chromebook' },
];

export const telegramBotMeta: PlatformMeta[] = [
  { id: 'tech-support-bot', url: 'https://t.me/nstu_tech_support_bot', icon: 'smart_toy' },
  { id: 'registrator-bot', url: 'https://t.me/nstu_registrator_office_bot', icon: 'support_agent' },
  { id: 'library-bot', url: 'https://t.me/nammtikutubxonabot', icon: 'auto_stories' },
];
