'use client'

import { cn } from '@/lib/utils';
import { CheckCircle, Lock, PlayCircle } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react'

interface CourseSidebarItemProps {
    label: string;
    id: string;
    isCompleted: boolean;
    courseId: string;
    isLocked: boolean
}

const CourseSidebarItem = ({
    label,
    id,
    isCompleted,
    courseId,
    isLocked
}: CourseSidebarItemProps) => {
    const pathname = usePathname()
    const router = useRouter();

    const Icon = isLocked ? Lock : (isCompleted ? CheckCircle : PlayCircle);

    const isActive = pathname?.includes(id);
    const onClick = () => {
        router.push(`/courses/${courseId}/chapters/${id}`)
    }

  return (
    <button 
        onClick={onClick}
        type='button'
        className={cn(
            "flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hpver:text-slate-600 hover:bg-slate-300/20",
            isActive && " dark:text-white text-slate-700 bg-slate-200/20 hover:bg-slate-200/20",
            isCompleted && "text-emerald-700 hover:text-emerald-500",
            isActive && isCompleted && "bg-emerald-200/50"
        )}
    >
        <div className='flex items-center gap-x-2 py-4 text-left'>
            <Icon 
                size={22}
                className={cn(
                    'text-slate-500 dark:text-white',
                    isActive && 'text-slate-700',
                    isCompleted && 'text-emerald-700'
                )}
            />
            {label}
        </div>
        <div className={cn(
            'ml-auto opacity-0 border-2 border-black dark:border-white h-full transition-all',
            isActive && 'opacity-100',
            isCompleted && 'border-emerald-700'
        )}/>
    </button>
  )
}

export default CourseSidebarItem