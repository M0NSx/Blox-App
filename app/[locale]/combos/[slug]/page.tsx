import { AvatarDemo } from '@/components/HtmlComponents/AvatarDemo';
import AddLikeButton, { AddFavoriteButton, DeleteFavoriteButton, DeleteLikeButton } from '@/components/SubmitButtons/SubmitButtons';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { addComboFavorite, addComboLike, getCombo, removeComboFavorite, removeComboLike } from '@/lib/actions/actions'
import { headers } from 'next/headers';
import React from 'react'

interface Props {
  params: {
    slug: string
  }
}

export default async function page({ params }: Props ) {

  const { slug } = params;
  const decodedSlug = decodeURIComponent(slug);
  const combo = await getCombo(decodedSlug);
  console.log(combo)

  const isInFavoriteList = Array.isArray(combo?.favorites) && combo.favorites.length > 0
  const isInLikeList = Array.isArray(combo?.comboLikes) && combo.comboLikes.length > 0
  const favoriteId = combo?.favorites && combo.favorites[0]?.id
  const comboId = combo?.id
  const likeId = combo?.comboLikes && combo.comboLikes[0]?.id
  const heads = headers()
  const pathName = heads ? heads.get('next-url') : '';

  return (
    <div className='p-2 md:p-0'>
      <div>
        <div className='justify-between items-center mb-4'>
          <h1 className='text-[24px] font-bold'>{combo?.combotitle} by {combo?.author}</h1>
          <div className='flex items-center gap-2'>
            {isInFavoriteList ? (
              <form action={removeComboFavorite}>
                <input type="hidden" name='pathName' value={pathName || ''} />
                <input type="hidden" name='favoriteId' value={favoriteId} />
                <DeleteFavoriteButton />
              </form>
            ) : (
              <form action={addComboFavorite}>
              <input type="hidden" name='pathName' value={pathName || ''} />
                <input type="hidden" name='comboId' value={comboId} />
                <AddFavoriteButton />
              </form>
            )}
            {isInLikeList ? (
              <form className='mt-1' action={removeComboLike}>
                <input type="hidden" name='pathName' value={pathName || ''} />
                <input type="hidden" name='likeId' value={likeId} />
                <DeleteLikeButton />
              </form>
            ) : (
              <form className='mt-1' action={addComboLike}>
                <input type="hidden" name='pathName' value={pathName || ''} />
                <input type="hidden" name='comboId' value={comboId} />
                <AddLikeButton />
              </form>
            )}
          </div>
        </div>
        <div>
          <div className='flex flex-col items-center'>
            <p className=''>Description:</p>
            <ScrollArea className='h-[150px] w-full rounded-md border'>
              {combo?.combodescription}
              <ScrollBar className='w-2.5 border-l border-l-transparent p-[1px]' orientation='vertical' />
            </ScrollArea>
          </div>
          <div className='grid grid-cols-2'>
            <p>Difficulty: </p>
            <p>Specialty: {combo?.specialty}</p>
            <p>Stats: {}</p>
            <p>Race: {}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
