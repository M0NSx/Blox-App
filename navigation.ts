 import {createSharedPathnamesNavigation} from 'next-intl/navigation';
 
export const locales = ['en', 'it', 'fr', 'de', 'pt', 'cn', 'kr', 'jp'] as const;
export const localePrefix = 'always'; // Default
 
export const {Link, redirect, usePathname, useRouter} =
  createSharedPathnamesNavigation({locales, localePrefix});
