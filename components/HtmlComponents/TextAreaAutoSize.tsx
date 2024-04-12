'use client'

import React, { useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize';
import { AvatarDemo } from './AvatarDemo';
import { useSession } from 'next-auth/react';
import { Laugh, SendHorizonal, SendIcon } from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';
import Link from 'next/link';

const FilterTypes = ["Recent", "Old", "Top"]

const CommentsComponent = ({ selectedFilterType }: { selectedFilterType: string }) => {

  const { data: session } = useSession();
  const [isCommenting, setIsCommenting] = useState(false);
  const [showEmojiList, setShowEmojiList] = useState(false);

  const handleCommenting = () => {
    setIsCommenting((prevState) => !prevState);
  }

  return (
    <div className='dark:bg-[#212529] rounded-md md:p-10 p-4'>
      <div className='flex'>
        <div className='mr-[8px]'>
          <AvatarDemo userImg={session?.user?.image} userNickName={session?.user?.name} />
        </div>
        
        {isCommenting ? (
        <div className='flex gap-[4px] flex-col items-center border-none p-1 rounded-lg w-full'>
          <TextareaAutosize
            autoFocus
            suppressHydrationWarning
            minRows={1}
            maxLength={600}
            className='border-b-[2px] dark:border-white bg-transparent w-full border-black outline-none text-sm'
            placeholder="Write a comment..."
            style={{ resize: 'none' }}
          />
          <div className={`${showEmojiList ? 'relative' : 'justify-end'} flex sm:justify-between w-full items-center`}>
            <div className='flex flex-col'>
              <div onClick={() => setShowEmojiList(!showEmojiList)} className='p-2 w-fit hidden sm:block cursor-pointer rounded-full dark:hover:bg-stone-800 hover:bg-stone-300'>
                <Laugh className='size-5' />
              </div>
              <div className={`${showEmojiList ? 'block' : 'hidden'} `}>
                <div className=''>
                  <EmojiPicker
                    onEmojiClick={(emoji: any) => console.log(emoji)}
                    className=''
                    emojiStyle={'twitter' as any}
                    theme={'dark' as any}
                  />
                </div>
              </div>
            </div>
            <div className={`flex ${showEmojiList ? 'absolute right-0 top-[2px]' : ''} `}>
              <button type='button' onClick={handleCommenting} className='cursor-pointer px-4 py-1 mr-1 dark:hover:bg-stone-800 hover:bg-stone-300 rounded-2xl'>Cancel</button>
              <div className='flex justify-center w-[60px] px-2 py-1 cursor-pointer rounded-2xl dark:hover:bg-cyan-400 hover:bg-cyan-400'>
                <SendHorizonal className='size-6' />
              </div>
            </div>
          </div>
        </div>
        ) : (
          <div onClick={handleCommenting} className='flex cursor-text gap-[4px] flex-col items-center border-none p-1 rounded-lg w-full'>
            <p className='border-b-[2px] dark:border-white text-zinc-400 w-full border-black outline-none text-sm'>Write a comment...</p>
          </div>
        )}
      </div>
      
      <div className='mt-[30px] flex flex-col'>
        <div className='bg-gray-600 flex w-full tinymax:px-[10px] px-[40px] py-2 rounded-lg items-center'>
          <div className='flex tinymax:gap-1 gap-4 items-center text-sm'>
            <p className='text-zinc-200'>Filter by:</p>
            {FilterTypes.map((filterType) => (
              <Link
                key={filterType}
                href={`?${new URLSearchParams({
                  filter: filterType,
                })}`}
                scroll={false}
                className={`cursor-pointer ${filterType === selectedFilterType ? 'bg-zinc-500 text-white' : 'hover:bg-stone-200 dark:hover:bg-zinc-600'} text-center place-content-center w-[60px] p-1 rounded-sm`}
              >
                {filterType}
              </Link>
            ))}
          </div>
        </div>
        <div className='my-[30px] flex'>
          <div className=''>
            test
          </div>
          <div className=''>
            test 2
          </div>
        </div>
        <div className='bg-gray-600 rounded-full w-full h-[2px]'></div>
      </div>
    </div>
  )
}

export default CommentsComponent