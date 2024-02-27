
import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import { CoursesList } from "@/components/courses-list";
import { UserButton, auth } from "@clerk/nextjs";
import { CheckCircle, Clock } from "lucide-react";
import { redirect } from "next/navigation";
import InfoCard from "./_components/info-card";

export default async function Dashboard() {

  const {userId} = auth();

  if(!userId){
    return redirect("/");
  }

  const {
    completedCourse,
    courseInProgress
  } = await getDashboardCourses(userId);

  const currentHour = new Date().getHours();
  const currentMinutes = new Date().getMinutes();

  // Define greeting based on time of day
  let greeting;
  if (currentHour >= 5 && currentHour < 12) {
    greeting = "Good Morning";
  } else if (currentHour >= 12 && currentHour < 18) {
    greeting = "Good Afternoon";
  } else {
    greeting = "Good Evening";
  }

  return (
    <div className="p-6">
      <div className="w-full  flex justify-center md:justify-start items-center mb-5">
        <p className="text-xl ">
        {greeting}, its currently {currentHour}:{currentMinutes}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoCard
          icon={Clock}
          label="In Progress"
          numberOfItems={courseInProgress.length}
        />
        <InfoCard
          icon={CheckCircle}
          label="Completed"
          variant="success"
          numberOfItems={completedCourse.length}
        />
      </div>
      <CoursesList 
        items={[...courseInProgress, ...completedCourse]}
      />
      
    </div>
  );
}
