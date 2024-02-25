import { getChapter } from '@/actions/get-chapter';
import { Banner } from '@/components/banner';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react'
import VideoPlayer from './_components/video-player';

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
        attachment,
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
      </div>
    </div>
  )
}

export default ChapterIdPage