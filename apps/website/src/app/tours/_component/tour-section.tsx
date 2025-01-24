"use client";
import { StepForm } from "@/components/shared/forms/step-form";
import { TourForm } from "@/components/shared/forms/tour-form";
import { TooltipWrapper } from "@/components/shared/tooltip-wrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCopyToClipboard } from "@/hooks/copy-to-clipboard";
import {
  useCreateTour,
  useGetTourById,
  useGetTours,
} from "@/hooks/server/tour";
import { handleError, handleSuccess } from "@/lib/form-handler";
import { formatPostDate } from "@/lib/formatPostDate";
import { TourSchema } from "@/schemas/tour";
import { useTourStore } from "@/store/tourStore";
import { ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";

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
    <header className="w-full flex items-center justify-between border-b pb-3 px-4">
      <h3 className="font-semibold text-lg">Tours</h3>
      <Button
        icon={ChevronRight}
        iconPosition="right"
        onClick={() => handleCreateTour()}
      >
        Create Tour
      </Button>
    </header>
  );
};

const TourMain = () => {
  const { data, isPending } = useGetTours();
  const searchParams = useSearchParams();
  const tourId = searchParams.get("tourId");
  const { data: tourData, isPending: isTourPending } = useGetTourById(
    tourId as string
  );
  const { copyToClipboard } = useCopyToClipboard();

  if (isPending) {
    return <div>loading...</div>;
  }

  return (
    <main className="w-full h-[calc(100vh-125px)] flex items-center">
      {/* View section */}
      <section className="w-[30%] border-r p-6 h-full overflow-y-auto flex flex-col gap-y-2">
        {data.map((tour) => (
          <TourCard tours={tour} key={tour._id} />
        ))}
      </section>

      {/* Create section */}
      <section className="w-[30%] p-6 h-full overflow-y-auto border-r flex flex-col">
        <div className="w-full flex justify-end">
          {isTourPending ? (
            <p>Loading...</p>
          ) : (
            <TooltipWrapper content="click to copy">
              <div
                className="text-[0.70rem] cursor-pointer border px-1 rounded"
                onClick={() => copyToClipboard(tourData.alias)}
              >
                <p>{tourData.alias}</p>
              </div>
            </TooltipWrapper>
          )}
        </div>

        <TourForm tourId={tourId} />
        <div className="mt-6">
          <StepForm tourId={tourId} />
        </div>
      </section>

      {/* View Section */}
      <section className="w-[40%] p-6 h-full overflow-y-auto">View</section>
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
      className="bg-slate-100 w-full p-3 rounded-md cursor-pointer flex items-start justify-between"
      onClick={() => handleClickTour(tours._id)}
    >
      <div className="flex  flex-col gap-y-3">
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
