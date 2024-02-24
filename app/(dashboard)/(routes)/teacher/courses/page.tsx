
import React from 'react'
import { DataTable } from './_components/data-table'
import { columns } from './_components/columns'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import Link from 'next/link'
import { Button } from '@/components/ui/button'


const CoursesPage = async() => {

  const {userId} = auth();

  if(!userId){
    redirect('/')
  }

  const courses = await db.course.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

/*   const transformedArray: CourseWithStringPublished[] = courses.map((course) => ({
    ...course,
    isPublished: course.isPublished ? 'published' : 'not published'
  }));
 */
  return (
    <div className='p-6 flex flex-col gap-5'>
      <DataTable columns={columns} data={courses} />
    </div>
  )
}

export default CoursesPage