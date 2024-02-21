'use client';

import React, { useState } from 'react';
import * as z from 'zod';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { File, ImageIcon, Loader2, Pencil, PlusCircle, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { Attachment, Course } from '@prisma/client';
import Image from 'next/image';
import FileUpload from '@/components/file-upload';


interface AttahcmentFormProps {
    initialData: Course & {attachments: Attachment[]};
    courseId: string;
}

const formSchema = z.object({
    url: z.string().min(1),
});

const AttahcmentForm = ({initialData, courseId}: AttahcmentFormProps) => {
    const {toast} = useToast();
    const router =  useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [deletingId, setDeletingId] = useState<String | null>(null)

    const toggleEdit = () => setIsEditing((current) => !current)

    //api calls
    const onSubmit = async(values: z.infer<typeof formSchema>) => {
        try {
            await axios.post(`/api/courses/${courseId}/attachments`, values);
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

    const onDelete = async (id: string) => {
        try {
            setDeletingId(id);
            await axios.delete(`/api/courses/${courseId}/attachments/${id}`);
            toast({
                title: 'Sucess',
                description: 'Course Updated'
            });
            router.refresh();
        } catch (error) {
            toast({
                variant: 'destructive',
                description: "Something went wrong"
            })
        } finally {
            setDeletingId(null)
        }
    }


  return (
    <div className='mt-6 border rounded-md p-4'>
        
        <div className="font-medium flex items-center justify-between">
            Course attachments
            <Button variant='ghost' onClick={toggleEdit}>
                {isEditing && (
                    <>Cancel</>
                )}
                {!isEditing &&(
                    <>
                        <PlusCircle className='h-4 w-4 mr-2' />
                        Add a file
                    </>
                )}
            </Button>
        </div>
        {!isEditing && (
            <>
                {initialData.attachments.length === 0 && (
                    <p className='text-sm mt-2 text-slate-500 italic'>
                        No attachments yet!
                    </p>
                )}
                {initialData.attachments.length > 0 && (
                    <div className="space-y-2">
                        {initialData.attachments.map((attachment)=>(
                            <div
                                key={attachment.id}
                                className='flex items-center p-3 w-full bg-rose-100 border-rose-200 border text-rose-700 rounded-md'
                            >
                                <File className='h-4 w-4 mr-2 flex-shrink-0'/>
                                <p className='text-xs truncate'>
                                    {attachment.name}
                                </p>
                                {deletingId === attachment.id && (
                                    <div className='ml-auto hover:opacity-75 transition'>
                                        <Loader2 className='h-4 w-4 animate-spin'/>
                                    </div>
                                )}
                                {deletingId !== attachment.id && (
                                    <button 
                                        onClick={()=> onDelete(attachment.id)}
                                        className='ml-auto hover:opacity-75 transition'>
                                        <X className='h-4 w-4 '/>
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </>
        )}
        {isEditing && (
            <div className="">
                <FileUpload
                endpoint='courseAttachment'
                onChange={(url)=> {
                    console.log(url)
                    if(url){
                        onSubmit({url: url})
                    }
                }}
                />
                <div className="text-xs text-muted-foreground text-center py-2">
                    Add anything your students might need to complete the course.
                </div>
            </div>
        )}
    </div>
  )
}

export default AttahcmentForm