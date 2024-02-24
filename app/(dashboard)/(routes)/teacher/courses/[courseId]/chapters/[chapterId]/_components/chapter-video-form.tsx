'use client';

import React, { useState } from 'react';
import MuxPlayer from "@mux/mux-player-react";
import * as z from 'zod';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Pencil, Video, VideoIcon } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { Chapter, MuxData } from '@prisma/client';
import FileUpload from '@/components/file-upload';


interface ChapterVideoFormProps {
    initialData: Chapter & {muxData?: MuxData | null};
    courseId: string;
    chapterId: string;
}

const formSchema = z.object({
    videoUrl: z.string().min(1)
});

const ChapterVideoForm = ({initialData, courseId, chapterId}: ChapterVideoFormProps) => {
    const {toast} = useToast();
    const router =  useRouter();
    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current)

    //api calls
    const onSubmit = async(values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
            toast({
                title: 'Sucess',
                description: 'Chapter Updated'
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
            Chapter video
            <Button variant='ghost' onClick={toggleEdit}>
                {isEditing && (
                    <>Cancel</>
                )}
                {!isEditing && !initialData.videoUrl && (
                    <>
                        <Video className='h-4 w-4 mr-2' />
                        Add an video
                    </>
                )}
                {!isEditing && initialData.videoUrl && (
                    <>
                        <Pencil className='h-4 w-4 mr-2'/>
                        Edit Video
                    </>
                )}
            </Button>
        </div>
        {!isEditing && (
            !initialData.videoUrl ? (
                <div className='flex items-center justify-center h-60 bg-slate-200 rounded-md'>
                    <VideoIcon className='h-10 w-10 text-slate-500'/>
                </div>
            ) : (
                <div className="relative aspect-video mt-2">
                    {/* <Image 
                        alt='upload'
                        fill
                        className='object-cover rounded-md'
                        src={initialData.imageUrl}
                    /> */}
                    <MuxPlayer 
                        playbackId={initialData?.muxData?.playbackId || ""}
                    />
                </div>
            )
        )}
        {isEditing && (
            <div className="">
                <FileUpload
                endpoint='chapterVideo'
                onChange={(url)=> {
                    if(url){
                        onSubmit({videoUrl: url})
                    }
                }}
                />
                <div className="text-xs text-muted-foreground text-center py-2">
                    Upload this chapter&apos;s video
                </div>
            </div>
        )}
        {initialData.videoUrl && !isEditing && (
            <div>
                Videos can take a few minutes to process. Refresh the page if video doesn&apos;t apear
            </div>
        )}
    </div>
  )
}

export default ChapterVideoForm