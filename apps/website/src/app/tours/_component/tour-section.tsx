"use client";
import { StepForm } from "@/components/shared/forms/step-form";
import { TourForm } from "@/components/shared/forms/tour-form";
import { TooltipWrapper } from "@/components/shared/tooltip-wrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCopyToClipboard } from "@/hooks/copy-to-clipboard";
import {
  useCreateTour,
  useDeleteTour,
  useGetTourById,
  useGetTours,
} from "@/hooks/server/tour";
import { handleError, handleSuccess } from "@/lib/form-handler";
import { formatPostDate } from "@/lib/formatPostDate";
import { TourSchema } from "@/schemas/tour";
import { useTourStore } from "@/store/tourStore";
import { ChevronRight, Delete, Workflow } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";
import { TourPreview } from "./tour-preview";
import clsx from "clsx";
import { EmptyState } from "@/components/shared/empty-state";
import Loader from "@/components/ui/loader";

export const TourSection = () => {
  return (
    <section>
      <TourHeader />
      <TourMain />
    </section>
  );
};

const TourHeader = () => {
  const { mutate: createTour } = useCreateTour();
  const handleCreateTour = () => {
    createTour(
      {
        title: "Untitled tour",
      },
      {
        onSuccess(data) {
          console.log(data);
          handleSuccess("Tour created!");
        },
        onError(error) {
          handleError(error);
        },
      }
    );
  };
  return (
    <header className="w-full flex items-center justify-between border-b pb-2 px-4">
      <h3 className="text-sm font-semibold">Tours</h3>
      <Button
        icon={ChevronRight}
        iconPosition="right"
        onClick={() => handleCreateTour()}
        id="tour1"
      >
        Create Tour
      </Button>
    </header>
  );
};

const TourMain = () => {
  const { data, isPending } = useGetTours();
  const router = useRouter();
  const searchParams = useSearchParams();
  const tourId = searchParams.get("tourId");
  const { data: tourData, isPending: isTourPending } = useGetTourById(
    tourId as string
  );
  const { copyToClipboard } = useCopyToClipboard();
  const { mutate: deleteTour } = useDeleteTour();

  if (isPending) {
    return <Loader />;
  }

  if (!data.length) {
    return (
      <div className="h-[calc(100vh-125px)] flex flex-col items-center justify-center gap-4 p-6">
        <div className="text-center space-y-3">
          <Workflow className="w-32 h-32 text-muted-foreground/30 mx-auto" />
          <h3 className="text-2xl font-semibold text-muted-foreground">
            No Tours Found
          </h3>
          <p className="text-sm text-muted-foreground/70">
            Create your first tour to get started with product walkthroughs
          </p>
        </div>
        <Button onClick={() => {}} className="mt-4" size="lg">
          <ChevronRight className="w-4 h-4 mr-2" />
          Create Your First Tour
        </Button>
      </div>
    );
  }

  const handleDeleteTour = (currentTourId: string) => {
    deleteTour(
      {
        tourId: currentTourId,
      },
      {
        onSuccess() {
          handleSuccess("Tour deleted!");

          // If there are remaining tours, select the first one
          if (data.length > 0) {
            const nextTourId = data[0]._id;
            router.push(`?tourId=${nextTourId}`);
          } else {
            router.push("/");
          }
        },
        onError(error) {
          handleError(error);
        },
      }
    );
  };

  return (
    <main className="w-full h-[calc(100vh-125px)] flex items-center">
      {/* View section */}
      <section className="w-[30%] border-r p-6 h-full overflow-y-auto flex flex-col gap-y-2">
        {data.map((tour) => (
          <TourCard tours={tour} key={tour._id} />
        ))}
      </section>

      {/* Create section */}
      <section className="w-[30%] p-4 h-full overflow-y-auto border-r flex flex-col">
        {!tourId ? (
          <EmptyState
            icon={Workflow}
            title="Create Your First Step"
            description=" Select a tour from the left to start creating interactive steps"
          />
        ) : (
          <div className="w-full flex flex-col space-y-6">
            <div className="flex items-center justify-between">
              <button
                className="flex items-center gap-x-2 px-2 py-1 rounded-md transition-colors 
                hover:bg-red-50 text-red-600 border border-red-200 hover:border-red-300"
                onClick={() => handleDeleteTour(tourId as string)}
              >
                <Delete className="w-4 h-4" />
                <span className="text-xs font-medium">Delete Tour</span>
              </button>

              {isTourPending ? (
                <div className="animate-pulse bg-slate-200 h-6 w-24 rounded" />
              ) : (
                <TooltipWrapper content="Click to copy tour ID">
                  <div
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-md cursor-pointer
                    transition-colors text-slate-600 font-mono text-xs"
                    onClick={() => copyToClipboard(tourData.alias)}
                  >
                    {tourData.alias}
                  </div>
                </TooltipWrapper>
              )}
            </div>

            <div className="space-y-6 bg-white p-2 rounded-lg shadow-sm">
              <div>
                <h3 className="mb-4 text-sm font-medium text-gray-500">
                  Tour Details
                </h3>
                <TourForm tourId={tourId} />
              </div>
            </div>

            <div className="space-y-6 bg-white p-2 rounded-lg shadow-sm">
              <div>
                <h3 className="mb-4 text-sm font-medium text-gray-500">
                  Tour Steps
                </h3>
                <StepForm tourId={tourId} />
              </div>
            </div>
          </div>
        )}
      </section>

      {/* View Section */}
      <section
        className={clsx([
          "w-[40%] p-6 h-full overflow-y-auto flex items-center justify-center bg-gray-200",
          { hidden: !tourId },
        ])}
      >
        <TourPreview />
      </section>
    </main>
  );
};

const TourCard = ({ tours }: { tours: z.infer<typeof TourSchema> }) => {
  const router = useRouter();
  const { setCurrentStepIndex } = useTourStore();
  const handleClickTour = (tourId: string) => {
    router.push(`/tours?tourId=${tourId}`);
    setCurrentStepIndex(0);
  };

  return (
    <div
      className=" shadow-sm w-full p-4 border  rounded-xl cursor-pointer flex items-start justify-between hover:bg-slate-50"
      onClick={() => handleClickTour(tours._id)}
    >
      <div className="flex  flex-col gap-y-12">
        <h3 className="text-sm font-semibold">{tours.title}</h3>
        <Badge
          variant={
            tours.status === "draft"
              ? "pending"
              : tours.status === "active"
                ? "success"
                : "destructive"
          }
        >
          {tours.status}
        </Badge>
      </div>

      <p className="text-xs">{formatPostDate(tours.updatedAt)}</p>
    </div>
  );
};
