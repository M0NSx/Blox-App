import { AvatarDemo } from '@/components/HtmlComponents/AvatarDemo';
import { HoverComboAuthor } from '@/components/HtmlComponents/HoverComboAuthor';
import MoreVerticalBtn from '@/components/HtmlComponents/MoreVertical';
import AddLikeButton, { AddFavoriteButton, DeleteFavoriteButton, DeleteLikeButton } from '@/components/SubmitButtons/SubmitButtons';
import { addComboFavorite, addComboLike, getCombo, removeComboFavorite, removeComboLike } from '@/lib/actions/actions'
import { getServerSession } from 'next-auth';
import { headers } from 'next/headers';
import Image from 'next/image';
import React from 'react'
import prisma from '@/lib/prisma';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ComboLike {
  id: string;
  comboId: string;
  userId: string;
  createdAt: Date;
}

interface Favorite {
  id: string;
  comboId: string;
  userId: string;
  createdAt: Date;
}

interface Combo {
  id: string
  combotitle: string
  combodescription: string
  fightingstyle: string
  weapon: string
  fruit: string
  race: string
  sword: string
  specialty: string
  mainStats: string
  comboVideo: string
  createdAt: Date
  author: string
  authorImage: string
  authorCreatedAt: Date
  comboLikes: ComboLike[];
  favorites: Favorite[];
}

interface Props {
  params: {
    slug: string
  }
}

export default async function page({ params }: Props) {
  const session = await getServerSession();
  const user = await prisma.user.findUnique({
    where: {
      email: session?.user.email!
    },
  })

  const heads = headers()
  const pathname = heads ? heads.get('next-url') : '';

  const { slug } = params;
  const decodedSlug = decodeURIComponent(slug);
  const combo: Combo | null = await getCombo(decodedSlug);

  const likeId = combo?.comboLikes && combo.comboLikes[0]?.id
  const favoriteId = combo?.favorites && combo.favorites[0]?.id

  const isInLikeList = Array.isArray(combo?.comboLikes) && combo.comboLikes.length > 0
  const isInFavoriteList= Array.isArray(combo?.favorites) && combo.favorites.length > 0
  const likes = 71687;

  function formatNumber(num: number): string {
    if (num < 1000) {
      return num.toString();
    } else if (num < 1000000) {
      return (num / 1000).toFixed(1) + 'k';
    } else {
      return (num / 1000000).toFixed(2) + 'm';
    }
  };


  return (
    <div className='p-2 md:p-0'>
      <div className='flex flex-col gap-[10px] rounded-md border-1 border-slate-400 p-1 mb-[10px]'>
        <div className='flex justify-between mt-2'>
          <div className='flex w-full items-center gap-2 border rounded-[8px] p-2'>
            <div className='grow'>
              <p className='text-[12px]'>You are viewing the combo <span className='font-bold'>{combo?.combotitle}</span></p>
            </div>
          </div>
        </div>
        <div className=''>
          <div className='flex w-fit gap-2'>
            <Image
              src={combo?.fightingstyle || ''}
              className='border rounded-[8px]'
              alt=""
              width={60}
              height={60}
            />
            <Image
              src={combo?.fruit || ''}
              className='border rounded-[8px]'
              alt=""
              width={60}
              height={60}
            />
            <Image
              src={combo?.sword || ''}
              className='border rounded-[8px]'
              alt=""
              width={60}
              height={60}
            />
            <Image
              src={combo?.weapon || ''}
              className='border rounded-[8px]'
              alt=""
              width={60}
              height={60}
            />
          </div>
          <p className='text-[12px]'>
            {combo?.combotitle} by
            <>
              <HoverComboAuthor
                authorCreatedAt={combo?.authorCreatedAt.toDateString()}
                comboAuthor={combo?.author}
                authorImage={combo?.authorImage}
              />
            </>
          </p>
          {session?.user && session?.user?.email! === user?.email && (
            <div className='flex gap-[5px] items-center mt-[-6px]'>
              {isInFavoriteList ? (
                <form action={removeComboFavorite}>
                  <input type="hidden" name='pathName' value={pathname || ''} />
                  <input type="hidden" name='favoriteId' value={favoriteId} />
                  <DeleteFavoriteButton />
                </form>
              ) : (
                <form action={addComboFavorite}>
                  <input type="hidden" name='pathName' value={pathname || ''} />
                  <input type="hidden" name='comboId' value={combo?.id} />
                  <AddFavoriteButton />
                </form>
              )}       
              {isInLikeList ? (
                <form className='mt-1' action={removeComboLike}>
                  <input type="hidden" name='pathName' value={pathname || ''} />
                  <input type="hidden" name='likeId' value={likeId} />
                  <DeleteLikeButton />
                </form>
              ) : (
                <form className='mt-1' action={addComboLike}>
                  <input type="hidden" name='pathName' value={pathname || ''} />
                  <input type="hidden" name='comboId' value={combo?.id} />
                  <AddLikeButton />
                </form>
              )}
              <p title={`${combo?.comboLikes.length} likes`} className='text-[12px]'>{formatNumber(likes)}</p>
            </div>
          )}
        </div>
        <div >
          <p className='grid place-items-center'>Description:</p>
          <ScrollArea className='h-[75px] w-full'>
            <p className='text-[12px]'>{combo?.combodescription}</p>
          </ScrollArea>
        </div>
        <div className='grid grid-cols-2'>
          <p>Difficulty: Hard</p>
          <p>Main Stat: {combo?.mainStats}</p>
          <p>Specialty: {combo?.specialty}</p>
          <p>Race: {combo?.race}</p>
        </div>
        <div className='my-[10px]'>
          {combo?.comboVideo && (
            combo.comboVideo
          )}
        </div>
      </div>
      <div className='flex flex-col gap-[10px] rounded-md border-1 border-slate-400 p-1'>
        <div className="w-80">
          <div className="flex justify-between space-x-4">
            <div>
              <Avatar>
                <AvatarImage 
                  src={combo?.authorImage}
                  alt={combo?.author}
                /> 
                <AvatarFallback>VC</AvatarFallback>
              </Avatar>
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">{combo?.author}</h4>
              <p className="text-sm">
                The React Framework – created and maintained by @vercel.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}