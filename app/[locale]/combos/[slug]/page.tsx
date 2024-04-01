import { AvatarDemo } from '@/components/HtmlComponents/AvatarDemo';
import { getCombo } from '@/lib/actions/actions'
import { getServerSession } from 'next-auth';
import React from 'react'

interface Props {
  params: {
    slug: string
  }
}

export default async function page({ params }: Props) {

  const { slug } = params;
  const session = await getServerSession();

  const combo = await getCombo(slug);
  console.log(combo)



  return (
    <div className='p-2 md:p-0'>
      <div>
        <div className='flex justify-between items-center'>
          <h1 className='text-[24px] font-bold'>{combo?.combotitle}</h1>
          <div className='flex w-[300px] items-center p-2 rounded-[8px] border gap-2'>
            <AvatarDemo userImg={session?.user.image} nickname={session?.user.name} />
            <div className='grow'>
              <p className='text-[16px] font-bold'>@{session?.user.name}</p>
              <p className='text-[12px]'>you are viewing the combo {combo?.combotitle}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
