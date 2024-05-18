import React from 'react';
import ActiveLink from './ActiveLink/ActiveLink';
import { IoLanguageSharp } from 'react-icons/io5';

const Links = ({ locale }: { locale: string }) => {
  const links = [
    {
      title: 'About',
      path: '/about',
    },
    {
      title: 'Users',
      path: '/users',
    },
    {
      title: 'Combos',
      path: '/combos',
    },
    {
      title: 'Your Combos',
      path: '/your-combos',
    },
  ];

  return (
    <div className=''>
      <div className='flex gap-[10px]'>
        {links.map(link => (
          <ActiveLink key={link.title} item={link} locale={locale} />
        ))}
      </div>
    </div>
  );
};

export default Links;