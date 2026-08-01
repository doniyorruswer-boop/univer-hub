export type { Locale, I18nMessages } from './types';
export { uz } from './uz';
export { ru } from './ru';
export { en } from './en';

import type { Locale, I18nMessages } from './types';
import { uz } from './uz';
import { ru } from './ru';
import { en } from './en';

export const messages: Record<Locale, I18nMessages> = { uz, ru, en };
