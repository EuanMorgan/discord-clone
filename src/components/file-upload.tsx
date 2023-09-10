'use client';

import {X} from 'lucide-react';
import Image from 'next/image';

import type {OurFileRouter} from '@/app/api/uploadthing/core';
import {UploadDropzone} from '@/lib/uploadthing';

import '@uploadthing/react/styles.css';

interface FileUploadProps {
  endpoint: keyof OurFileRouter;
  value: string;
  onChange: (url?: string) => void;
}

const FileUpload = ({endpoint, onChange, value}: FileUploadProps) => {
  const fileType = value?.split('.').pop();

  if (value && fileType !== 'pdf') {
    return (
      <div className='relative h-20 w-20'>
        <Image fill src={value} alt='Upload' className='rounded-full' />
        <button
          type='button'
          className='bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm'
          onClick={() => onChange('')}
        >
          <X className='h-4 w-4' />
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={res => {
        onChange(res?.[0].url);
      }}
      onUploadError={(err: Error) => {
        console.error(err);
      }}
    />
  );
};

export default FileUpload;
