import createMiddleware from 'next-intl/middleware';
 
export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'it', 'fr', 'de', 'pt', 'cn', 'kr', 'jp'],
 
  // Used when no locale matches
  defaultLocale: 'en'
});
 
export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(de|en|pt|fr|it|cn|kr|jp)/:path*']
};