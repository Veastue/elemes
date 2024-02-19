import React from 'react'

const CourseIdPage = ({
    params
}: {
    params: {courseId: String}
}) => {
  return (
    <div>CourseIdPage: {params.courseId}</div>
  )
}

export default CourseIdPage