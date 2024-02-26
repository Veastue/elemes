"use client"

import { useConfettiStore } from "@/hooks/use-confetti-store"
import { cn } from "@/lib/utils"
import MuxPlayer from "@mux/mux-player-react"
import axios from "axios"
import { Loader2, Lock } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import dynamic from 'next/dynamic';
import toast from "react-hot-toast"

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

interface VideoPlayerProps {
    playbackId: string;
    courseId:string;
    chapterId: string;
    nextChapterId?: string;
    isLocked: boolean;
    completeOnEnd: boolean;
    title?: string;
    //////
    chapterVideoUrl?: string
}

const VideoPlayer = ({
    playbackId,
    courseId,
    chapterId,
    nextChapterId,
    isLocked,
    completeOnEnd,
    title,
    /////
    chapterVideoUrl
}: VideoPlayerProps) => {

    const [isReady, setIsReady] = useState(false);
    const router = useRouter()
    const confetti = useConfettiStore();

    useEffect(() => setIsReady(true), [chapterVideoUrl]);

    // this will happen once since isCompleted is null on first try
    // we may delete if(complete){} to enable repeated routing
    const onEnd = async() => {
        try {
            if(completeOnEnd){
                await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
                    isCompleted: true
                })
            }
            if(!nextChapterId){
                confetti.onOpen()
            }
            router.refresh()
            toast.success('chapter updated')
            
            if (nextChapterId) {
                router.push(`/courses/${courseId}/chapters/${nextChapterId}`)
            }

        } catch (error) {
            toast.error('something went wrong')
        }
    }

    return (
        <div className="relative aspect-video ">
            {!isReady && !isLocked && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
                    <Loader2 className="h-8 w-8 animate-spin text-secondary" />
                </div>
            )}
            {isLocked && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary">

                    <Lock className="h-8 w-8 "/>
                    <p className="text-sm">
                        This chapter is Locked
                    </p>
                </div>
            )}
            {!isLocked && (
                <MuxPlayer 
                    title={title}
                    className={cn(
                        ' z-[100] hidden',
                        !isReady && 'hidden'
                    )}
                    onCanPlay={() => setIsReady(true)}
                    onEnded={() => {}}
                    autoPlay
                    playbackId={playbackId!}
                />
            )}
            {/* if Mux is not premium you may activate this for now */}
            {!isLocked && (
                <div className="sm:w-screen md:w-full flex items-center justify-center md:h-auto">
                    <ReactPlayer
                        url={chapterVideoUrl}
                        width='100'
                        height='100'
                        controls={true}
                        onEnded={onEnd}
                    />
                </div>
            )}
        </div>
    )
}

export default VideoPlayer