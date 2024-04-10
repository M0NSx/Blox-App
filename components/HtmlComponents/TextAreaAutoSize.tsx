'use client'

import React, { useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize';
import { AvatarDemo } from './AvatarDemo';
import { useSession } from 'next-auth/react';
import { Laugh } from 'lucide-react';
import AddLikeButton from '../SubmitButtons/SubmitButtons';

const CommentsComponent = () => {

  const { data: session } = useSession();
  const [isCommenting, setIsCommenting] = useState(false);

  const handleCommenting = () => {
    setIsCommenting((prevState) => !prevState);
  }

  return (
    <div className=''>
      <h1 className='text-lg ml-8 mb-5'>11 Comments</h1>
      <div className='grid grid-cols-[1fr,100fr]'>
        <div className='mr-[8px]'>
          <AvatarDemo userImg={session?.user?.image} userNickName={session?.user?.name} />
        </div>
        
        {isCommenting ? (
        <div className='flex gap-[4px] dark:bg-none flex-col items-center border-none p-1 rounded-lg'>
          <TextareaAutosize
            autoFocus
            suppressHydrationWarning
            minRows={1}
            maxRows={5}
            maxLength={300}
            className='border-b-[2px] dark:bg-transparent w-full dark:border-white border-black outline-none text-sm'
            placeholder="Write a comment..."
            style={{ resize: 'none' }}
          />
          <div className=' flex justify-between w-full items-center'>
            <div className='p-2 cursor-pointer rounded-full dark:hover:bg-stone-600 hover:bg-stone-300'>
              <Laugh className='size-5'  />
            </div>
            <div>
              <button onClick={handleCommenting} className='cursor-pointer px-4 py-1 mr-1 dark:hover:bg-stone-600 hover:bg-stone-300 rounded-2xl'>Cancel</button>
              <button className='cursor-pointer px-4 py-1 dark:hover:bg-stone-600 hover:bg-stone-300 rounded-2xl'>Post</button>
            </div>
          </div>
        </div>
        ) : (
          <div className='flex dark:bg-none cursor-text gap-[4px] flex-col items-center border-none p-1 rounded-lg'>
            <p onClick={handleCommenting} className='border-b-[2px] text-zinc-400 w-full dark:border-white border-black outline-none text-sm'>Write a comment...</p>
          </div>
        )}
      </div>
      <div className='mt-[40px]'>
        <div className='border-b-[1px] text-zinc-400 w-full dark:border-white border-black outline-none'></div>
        <div className='flex items-center justify-between p-4'>
          <p>Filters: </p>
          <div className='flex gap-5'>
            <p>Recent</p>
            <p>Old</p>
            <p>Top liked</p>
          </div>
          <div></div>
        </div>
        <div className='border-b-[1px] text-zinc-400 w-full mb-7 dark:border-white border-black outline-none'></div>
        <div className=''>
          <div className='grid grid-cols-[1fr,100fr]'>
            <div className='mr-[8px]'>
              <AvatarDemo userImg={session?.user?.image} userNickName={session?.user?.name} />
            </div>
            <div className='flex gap-[4px] flex-col items-center'>
              <p>random_user1432</p>
              <p>Isoprum dieviena gehudo il vrei gehudo Isoprum dieviena ehudo il vrei gehudo Isoprum dieviena gehudo il vrei</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommentsComponent