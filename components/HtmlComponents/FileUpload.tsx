'use client';

import React from 'react'
import { UploadDropzone } from '@/lib/uploadthing';
import { ourFileRouter } from '@/app/api/uploadthing/core';
import { toast } from 'react-toastify';

interface FileUploadProps {
    onChange: (url?: string) => void
    endPoint: keyof typeof ourFileRouter;
}


export const FileUpload = ({
    onChange,
    endPoint
}: FileUploadProps) => {
  return (
    <div>
      <UploadDropzone 
        endpoint={endPoint}
        onClientUploadComplete={(res) => {
          onChange(res[0].url);
        }}
        onUploadError={(error: Error) => {
          toast.error(`${error.message}`);
        }}
      />
    </div>
  )
}

