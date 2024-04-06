'use client'

import React from 'react'
import TextareaAutosize from 'react-textarea-autosize';

const TextAreaAutoSize = () => {
  return (
    <TextareaAutosize
      suppressHydrationWarning
      minRows={1}
      maxRows={5}
      maxLength={300}
      className='border-b-[2px] w-full border-black outline-none text-sm' 
      placeholder="Write a comment..."
      style={{ resize: 'none' }}
    />
  )
}

export default TextAreaAutoSize