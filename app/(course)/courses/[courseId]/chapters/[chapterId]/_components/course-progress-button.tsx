'use client'

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import axios from "axios";
import { CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface CourseProgressButtonProps {
    chapterId: string;
    courseId: string;
    isCompleted?: boolean;
    nextChapterId?: string;
}



const CourseProgressButton = ({
    chapterId,
    courseId,
    isCompleted,
    nextChapterId
}: CourseProgressButtonProps) => {

    const router = useRouter()
    const confetti = useConfettiStore();
    const [isLoading, setIsLoading] = useState(false)

    const onClick = async() => {
        try {
            setIsLoading(true)
            await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
                isCompleted: !isCompleted
            })

            if(!isCompleted && !nextChapterId) {
                confetti.onOpen()
            }

            if(!isCompleted && nextChapterId) {
                router.push(`/courses/${courseId}/chapters/${nextChapterId}`)
            }
            router.refresh()
            toast.success('chapter updated')
            
        } catch (error) {
            toast.error('something went wrong')
        } finally {
            setIsLoading(false)
        }
    }
    const Icon = isCompleted ? XCircle : CheckCircle;

    return (
        <Button
            type="button"
            variant={isCompleted ? 'outline' : 'success'}
            onClick={onClick}
            disabled={isLoading}
        >
            {isCompleted ? "Not completed" : "Mark as complete"}
            <Icon className="h-4 w-4 ml-2"/>
        </Button>
    );
}

export default CourseProgressButton;
