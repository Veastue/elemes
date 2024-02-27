import { db } from "@/lib/db";
import { Category, Chapter, Course } from "@prisma/client"
import { getProgress } from "./get-progress";

type CourseWithProgressWithCategory = Course & {
    category: Category;
    chapters: Chapter[];
    progress: number | null
}

type DashboardCourse = {
    completedCourse: any[]
    courseInProgress: any[]
}

export const getDashboardCourses = async(userId: string): Promise<DashboardCourse> => {
    try {
        const purchaseCourses = await db.purchase.findMany({
            where: {
                userId
            },
            select: {
                course: {
                    include: {
                        category: true,
                        chapters: {
                            where: {
                                isPublished: true
                            }
                        }
                    }
                }
            }
        });

        const courses = purchaseCourses.map((purchase)=> purchase.course) as CourseWithProgressWithCategory[]

        for (let course of courses){
            const progress = await getProgress(userId, course.id);
            course['progress'] = progress 
        }

        const completedCourse = courses.filter((course) => course.progress === 100);
        const courseInProgress = courses.filter((course) => (course.progress ?? 0) < 100)

        return {
            completedCourse,
            courseInProgress
        }
    } catch (error) {
        console.log("[GET_DASHBOARD_COURSES]", error)
        return {
            completedCourse:[],
            courseInProgress: []
        }
    }
}