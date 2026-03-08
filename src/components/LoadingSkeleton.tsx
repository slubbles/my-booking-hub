import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

const Skeleton = ({ className }: SkeletonProps) => (
  <div className={cn("animate-pulse rounded-lg bg-secondary", className)} />
);

const PageSkeleton = () => (
  <div className="py-20 md:py-28">
    <div className="container mx-auto px-6 max-w-2xl">
      <Skeleton className="h-4 w-20 mb-3" />
      <Skeleton className="h-10 w-72 mb-2" />
      <Skeleton className="h-5 w-96 mb-12" />
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="border border-border rounded-xl p-6">
            <Skeleton className="h-5 w-40 mb-3" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4 mb-4" />
            <div className="flex gap-2">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-14 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const HeroSkeleton = () => (
  <div className="py-20 md:py-32">
    <div className="container mx-auto px-6">
      <div className="max-w-3xl">
        <div className="flex items-center gap-3 mb-10">
          <Skeleton className="w-14 h-14 rounded-full" />
          <div>
            <Skeleton className="h-5 w-32 mb-1.5 rounded-full" />
            <Skeleton className="h-3 w-40" />
          </div>
        </div>
        <Skeleton className="h-16 w-[80%] mb-3" />
        <Skeleton className="h-16 w-[60%] mb-6" />
        <Skeleton className="h-5 w-[50%] mb-2" />
        <Skeleton className="h-5 w-[40%] mb-10" />
        <div className="flex gap-3 mb-20">
          <Skeleton className="h-12 w-40 rounded-full" />
          <Skeleton className="h-12 w-32 rounded-full" />
        </div>
        <div className="flex gap-16">
          {[...Array(3)].map((_, i) => (
            <div key={i}>
              <Skeleton className="h-10 w-16 mb-2" />
              <Skeleton className="h-3 w-24" />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export { Skeleton, PageSkeleton, HeroSkeleton };
