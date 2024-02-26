import { getChapter } from '@/actions/get-chapter';
import { Banner } from '@/components/banner';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react'
import VideoPlayer from './_components/video-player';
import CourseEnrollButton from './_components/course-enroll-button';
import { Separator } from '@/components/ui/separator';
import { Preview } from '@/components/preview';
import { File } from 'lucide-react';

const ChapterIdPage = async({
    params
}: {params : {courseId: string; chapterId: string}}) => {
    
    const {userId} = auth()
  
    if(!userId) {
        redirect('/')
    }

    const {
        chapter,
        course,
        muxData,
        attachments,
        nextChapter,
        userProgress,
        purchase
    } = await getChapter({
        userId,
        chapterId: params.chapterId,
        courseId: params.courseId
      })

    const isLocked = !chapter?.isFree && !purchase;
    const completeOnEnd = !!purchase && !userProgress?.isCompleted;

    console.log(purchase)
    
    return (
    <div>
      {userProgress?.isCompleted && (
        <Banner 
        variant='success'
          label="You already completed this chapter"
        />
      )}
      {isLocked && (
        <Banner 
          variant ='warning'
          label="You need to purchase this course to watch this chapter"
        />
      )}
      <div className='flex flex-col max-w-4xl mx-auto pb-20'>
        <div className="p-4">
          <VideoPlayer 
            chapterId={params.chapterId}
            title={chapter?.title}
            courseId={params.courseId}
            nextChapterId={nextChapter?.id}
            playbackId={muxData?.playbackId!}
            isLocked={isLocked}
            completeOnEnd={completeOnEnd}
            ///
            chapterVideoUrl={chapter?.videoUrl!}
          />
          {/* TODO Another Video Player for none MuX */}
        </div>
        <div>
          <div className="p-4 flex flex-col md:flex-row items-center justify-between">
            <h2 className='text-xl font-semibold mb-2 uppercase'>
              {chapter?.title}
            </h2>
            {purchase ? (
              //// ToDo add progress Button
              <div>

              </div>
            ) : (
              <CourseEnrollButton 
                courseId={params.courseId}
                price={course?.price!}
              />
            )}
          </div>
          <Separator />
          <div>
            <Preview value={chapter?.description!}/>
          </div>
          {!!attachments?.length && (
            <>
              <Separator />
              <div className="p-4 flex flex-col gap-2">
                <h2 className="text-lg font-semibold mb-2 text-center sm:text-start">Attachment</h2>
                {attachments.map((attachment) => (
                  <a 
                    key={attachment.id}
                    href={attachment.url}
                    target='_blank'
                    className=' text-sm flex items-center p-3 w-full bg-rose-100/50 border dark:bg-rose-500 text-rose-700 dark:text-white rounded-md hover:underline shadow-sm'
                    >
                      <File size={16} className='mr-2'/>
                    <p className='line-clamp-1'>
                      {attachment.name}
                    </p>
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ChapterIdPage