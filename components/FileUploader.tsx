"use client"

import { convertFileToUrl } from '@/lib/utils'
import Image from 'next/image'
import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

type FileUploaderProps={
  files: File[] | undefined,
  onChange: (files:File[])=> void
}

const FileUploader=({files,onChange}: FileUploaderProps)=> {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onChange(acceptedFiles)
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()} className='file-upload'>
      <input {...getInputProps()} />
      {files && files?.length > 0 ? (
        <Image
        src={convertFileToUrl(files[0])}
        alt='Image Upload'
        height={1000}
        width={1000}
        className='max-h-[400px] overflow-hidden object-cover'/>
      ) : (
        <>
          <Image
          src="/upload.png"
          alt="upload"
          height={40}
          width={40}/>
          <div className='file-upload_label'>
            <p className='text-14-regular'>
              <span className='text-purple-400'>
                Click to upload
              </span> or drag and drop
            </p>
            <p>
              JPG,PNG,SVG or GIF (Max 800*400)
            </p>
          </div>
        </>
      )}
      
    </div>
  )
}

export default FileUploader;