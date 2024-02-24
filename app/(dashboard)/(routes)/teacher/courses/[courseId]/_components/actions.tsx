"use client"

import { ConfirmModal } from "@/components/modals/confirm-modal"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useConfettiStore } from "@/hooks/use-confetti-store"
import axios from "axios"
import { Trash } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface ActionsProps {
    disabled: boolean,
    courseId: string,
    isPublished: boolean
}


export const Actions = ({
    disabled,
    courseId,
    isPublished
}: ActionsProps) => {

    const {toast} = useToast();
    const router = useRouter();
    const confetti = useConfettiStore();

    const [isLoading, setIsLoading] = useState(false)

    const onClick = async () => {
        try {
            setIsLoading(true);

            if(isPublished){
                await axios.patch(`/api/courses/${courseId}/unpublish`)
            } else {
                await axios.patch(`/api/courses/${courseId}/publish`)
                confetti.onOpen();
            }
        
            toast({
                title: 'Sucess',
                description: "Course updated!"
            });
            router.refresh();
        
        } catch (error) {
            console.log(error);
            toast({
                variant: 'destructive',
                description: "Something went wrong"
            });
        }finally {
            setIsLoading(false);
        }
    }
    const onDelete = async() => {
        try {
            setIsLoading(true)
            await axios.delete(`/api/courses/${courseId}`)
            toast({
                description: 'Course deleted'
            })
            router.push(`/teacher/courses/`)
            router.refresh();
        } catch (error) {
            console.log(error);
            toast({
                variant: 'destructive',
                description: "Something went wrong"
            });
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <div className="flex items-center gap-x-2">
            <Button 
                onClick={onClick}
                disabled={disabled || isLoading}
                size='sm' 
                className="bg-white border text-black hover:text-white">
                {isPublished ? "Unpublish this Course" : "Publish this Course"}
            </Button>
            <ConfirmModal onConfirm={onDelete}>
                <Button size='sm'>
                    <Trash className="h-4 w-4" />
                </Button>
            </ConfirmModal>
        </div>
    )
}