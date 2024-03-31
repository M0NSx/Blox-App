'use client';

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const ActiveLink = ({ item, locale }: { item: any, locale: string }) => {

    const pathname = usePathname();

  return (
    <div className=''>
      <Link href={`/${locale}${item.path}`} className={`${pathname === `/${locale}${item.path}` ? 'text-slate-300' : ''}`} >{item.title}</Link>
      <div className={`${pathname === `/${locale}${item.path}` ? 'h-[2px] rounded-full bg-cyan-300' : ''}`}></div>
    </div>
  )
}

export default ActiveLink
