export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/dashboard', '/artist', '/calendar', '/appointments', '/clients'],
};
