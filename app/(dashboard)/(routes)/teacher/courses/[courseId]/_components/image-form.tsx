'use client';

import React, { useState } from 'react';
import * as z from 'zod';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { ImageIcon, Pencil, PlusCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { Course } from '@prisma/client';
import Image from 'next/image';
import FileUpload from '@/components/file-upload';


interface ImageFormProps {
    initialData: Course;
    courseId: string;
}

const formSchema = z.object({
    imageUrl: z.string().min(1,{
        message: 'Imagae is required'
    }),
});

const ImageForm = ({initialData, courseId}: ImageFormProps) => {
    const {toast} = useToast();
    const router =  useRouter();
    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current)

    //api calls
    const onSubmit = async(values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/courses/${courseId}`, values);
            toast({
                title: 'Sucess',
                description: 'Course Updated'
            })
            toggleEdit();
            router.refresh();
        } catch(error) {
            toast({
                variant: 'destructive',
                description: "Something didn't work out! "
            })
        }
    }


  return (
    <div className='mt-6 border rounded-md p-4'>
        
        <div className="font-medium flex items-center justify-between">
            Course Image
            <Button variant='ghost' onClick={toggleEdit}>
                {isEditing && (
                    <>Cancel</>
                )}
                {!isEditing && !initialData.imageUrl && (
                    <>
                        <PlusCircle className='h-4 w-4 mr-2' />
                        Add an image
                    </>
                )}
                {!isEditing && initialData.imageUrl && (
                    <>
                        <Pencil className='h-4 w-4 mr-2'/>
                        Edit Image
                    </>
                )}
            </Button>
        </div>
        {!isEditing && (
            !initialData.imageUrl ? (
                <div className='flex items-center justify-center h-60 bg-slate-200 rounded-md'>
                    <ImageIcon className='h-10 w-10 text-slate-500'/>
                </div>
            ) : (
                <div className="relative aspect-video mt-2">
                    <Image 
                        alt='upload'
                        fill
                        className='object-cover rounded-md'
                        src={initialData.imageUrl}
                    />
                </div>
            )
        )}
        {isEditing && (
            <div className="">
                <FileUpload
                endpoint='courseImage'
                onChange={(url)=> {
                    console.log(url)
                    if(url){
                        onSubmit({imageUrl: url})
                    }
                }}
                />
                <div className="text-xs text-muted-foreground text-center py-2">
                    16:9 aspect ratie recommended
                </div>
            </div>
        )}
    </div>
  )
}

export default ImageForm