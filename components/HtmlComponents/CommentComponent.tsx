'use client';

import React, { useState } from 'react'
import { AvatarDemo } from './AvatarDemo'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { useFormStatus } from "react-dom";

type Comment = {
  id: string;
  text: string;
  comboId: string;
  userId: string;
  userName: string;
  userImage: string;
  user: {
    name: string | null;
    image: string | null;
  };
  likes: CommentLike[];
}

type CommentLike = {
  id: string;
  commentId: string;
  userId: string;
  createdAt: Date;
}

type CommentProps = {
  commentId: string
  isInLikeList: boolean
  commentLikes: CommentLike[]
  comments: Comment[];
}

const CommentComponent = ({ comments, commentId, commentLikes, isInLikeList }: CommentProps) => {

  const [fullComment, setFullComment] = useState(false);
  const { pending } = useFormStatus();
  const pathName = usePathname();
 
  return (
    <div>
      { comments.length === 0 && comments.length === 0 ? (
        <div className='w-full border rounded-lg p-4 mt-[45px] flex justify-center'>
          <h1 className='text-bold place-self-center'>No comments to show.</h1>
        </div>
      ) : (
        comments.map((comment) => (
          <div key={comment.id} className='p-2 mt-[15px] petitmax:flex-col flex gap-[15px] border rounded-lg'>
            <div className='flex items-start'>
              <div className='flex items-center gap-1'>
                <div className=''>
                  {isInLikeList ? (
                    <form >
                      <input type="hidden" name="LikeId" value={comment.likes[0]?.id} />
                      <input type="hidden" name="pathName" value={pathName} />
                      <button type='submit' className='px-[11px] cursor-pointer border-1 hover:border-lime-400 h-[25px] place-content-center bg-zinc-500 text-white rounded-full font-bold'>
                        <>
                          {pending ? <span>+{comment.likes?.length - 1}</span> : <span>+{comment.likes?.length}</span>}
                        </>
                      </button>
                    </form>
                  ) : (
                    <form >
                      <input type="hidden" name='pathName' value={pathName} />
                      <input type="hidden" name='commentId' value={commentId} />
                      <button type='submit' className='px-[11px] cursor-pointer border-1 hover:border-lime-400 h-[25px] place-content-center bg-zinc-500 text-white rounded-full font-bold'>
                        <>
                          {pending ? <span>+{comment.likes?.length + 1}</span> : <span>+{comment.likes?.length}</span>}
                        </>
                      </button>
                    </form>
                  )}
                </div>
                <Link scroll={false} href={'#'} className='cursor-pointer'>
                  <AvatarDemo className='' userImg={comment.userImage} userNickName={comment.userName} />
                </Link>
              </div>
            </div>
            <div className='flex flex-col text-sm'>
              {fullComment? (
                <div>
                  <p className='petitmax:text-[13px]'>{comment.text}</p>
                  <p className='cursor-pointer underline' onClick={() => setFullComment(!fullComment)}>{`Show Less... >`}</p>
                </div>
              ) : (
                <div>
                  {comment.text && comment.text.length < 429 ? (
                    <p className='petitmax:text-[13px]'>{comment.text}</p>
                  ) : (
                    <div>
                      {comment.text && (
                        <>
                          <p className='petitmax:text-[13px]'>{comment.text.slice(0, 430)}...</p>
                          <p className='cursor-pointer underline' onClick={() => setFullComment(!fullComment)}>{`Show More... >`}</p>
                        </>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default CommentComponent