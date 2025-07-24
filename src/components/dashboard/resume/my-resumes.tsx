"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useResumesQuery } from "@/hooks/api/resumes/use-resumes-query";
import { DashboardContainer } from "../dashboard-container";
import { EmptyCard } from "./empty-card";
import { ResumeCard } from "./resume-card";

export default function MyResumes() {
  const { data: resumes, isPending, isError } = useResumesQuery();

  const renderSkeletons = (count = 3) =>
    Array.from({ length: count }).map((_, i) => (
      <div key={i} className="flex flex-col gap-2 p-4 rounded-lg border shadow-sm h-40">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-30 w-full mt-4 rounded-md" />
      </div>
    ));

  return (
    <DashboardContainer>
      <div className="py-4 border-b mb-4">
        <h1 className="text-2xl font-semibold">My Resumes</h1>
      </div>
      {isPending ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {renderSkeletons(6)}
        </div>
      ) : isError ? (
        <div className="text-muted-foreground">
          <p className="text-lg">Failed to load resumes. Please try again later.</p>
        </div>
      ) : resumes && resumes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <EmptyCard />
          {resumes.map((resume) => (
            <ResumeCard key={resume.id} resume={resume} />
          ))}
        </div>
      ) : (
        <div>
          <p className="text-lg mb-4">{"You haven't created any resumes yet."}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-muted-foreground">
            <EmptyCard />
          </div>
        </div>
      )}
    </DashboardContainer>
  );
}
