import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useApi, User } from "./TourbitProvider";
import { TourPopup } from "./TourPopup";
import {
  FeatureTourProps,
  useFeatureTourState,
  useHighlightElement,
  useKeyboardNavigation,
  usePositioning,
} from "@tourbit/utils";

const Tourbit: React.FC<FeatureTourProps> = ({ tourId, customStyles = {} }) => {
  const { tourbitInstance, userId, user } = useApi();

  // Fetch tour data
  const {
    data: tourData,
    isLoading: tourLoading,
    isError: tourError,
  } = useQuery({
    queryKey: ["tourbit-tour"],
    queryFn: () => tourbitInstance.get(`/tour/public-tour/${tourId}`),
  });

  // Fetch progress data
  const {
    data: progressData,
    isLoading: progressLoading,
    isError: progressError,
  } = useQuery({
    queryKey: ["tour-progress"],
    queryFn: () =>
      tourbitInstance.get(`/tour/progress?user=${userId}&tour=${tourId}`),
  });

  const steps = progressData?.data?.tourDetails?.steps || [];

  const { mutate: createUser, isPending: isCreatingUser } = useMutation({
    mutationKey: ["create-user"],
    mutationFn: async (data: {
      userId: string;
      tourId: string;
      user: User;
    }) => {
      const { userId, user } = data;
      return tourbitInstance.post("/user/create", {
        tourId,
        userId,
        name: user?.name,
        email: user?.email,
      });
    },
    onError: (error) => {
      console.error("Failed to create user:", error);
    },
  });

  const { mutate: createTourProgress, isPending: isCreatingProgress } =
    useMutation({
      mutationKey: ["create-tour-progress"],
      mutationFn: async (data: { userId: string; tourId: string }) => {
        return tourbitInstance.post("/tour/progress", {
          tour: data.tourId,
          user: data.userId,
        });
      },
      onError: (error) => {
        console.error("Failed to create tour progress:", error);
      },
    });

  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    if (
      userId &&
      user &&
      !hasInitialized &&
      !isCreatingUser &&
      !isCreatingProgress
    ) {
      setHasInitialized(true);
      createUser(
        { userId, user, tourId },
        {
          onSuccess: () => {
            createTourProgress({ userId, tourId });
          },
        }
      );
    }
  }, [
    userId,
    user,
    hasInitialized,
    isCreatingUser,
    isCreatingProgress,
    createUser,
    createTourProgress,
    tourId,
  ]);

  // Update progress
  const { mutate: updateProgress } = useMutation({
    mutationKey: ["tour-progress-update"],
    mutationFn: (increment: number) =>
      tourbitInstance.patch(
        `/tour/progress?user=${userId}&tour=${tourId}&increment=${increment}&totalStep=${steps.length - 1}`
      ),
    onError: (error) => {
      console.error("Failed to update progress:", error);
    },
  });

  const [hasBeenSeen, setHasBeenSeen] = useState(false);
  const [lastUpdatedStep, setLastUpdatedStep] = useState<number | null>(null);

  // Local derived variables
  const status = tourData?.data?.status || "draft";
  const isCompleted = progressData?.data?.isCompleted;
  const completedStep = progressData?.data?.completedSteps || 0;

  // Handle step changes and progress updates
  const handleSteps = (steps: number) => {
    if (lastUpdatedStep !== steps) {
      setLastUpdatedStep(steps);
      updateProgress(steps);
    }
  };

  // Sync hasBeenSeen state with completion status
  useEffect(() => {
    setHasBeenSeen(isCompleted || false);
  }, [isCompleted]);

  // Feature tour state and utilities
  const { currentStep, handleNext, handlePrev, handleClose } =
    useFeatureTourState(steps, completedStep, handleSteps, () => {
      setHasBeenSeen(true);
    });

  const position = usePositioning(steps, currentStep);

  useKeyboardNavigation(handleNext, handlePrev, handleClose);
  useHighlightElement(steps.length > currentStep ? steps : [], currentStep);

  // Loading or error states
  if (tourLoading || progressLoading) {
    return null;
  }

  if (tourError || progressError) {
    console.error(tourError || progressError);
    return <div>Failed to load the tour. Please try again later.</div>;
  }

  // Skip rendering if tour is not active, steps are unavailable, or tour is already completed
  if (
    status !== "active" ||
    !steps.length ||
    currentStep >= steps.length ||
    hasBeenSeen
  ) {
    return null;
  }

  return (
    <>
      <style>
        {`
          .feature-tour-highlight {
            position: relative;
            z-index: 50;
            box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.5);
          }
        `}
      </style>

      <TourPopup
        step={steps[currentStep]}
        position={position}
        currentStep={currentStep}
        totalSteps={steps.length}
        onNext={handleNext}
        onPrev={handlePrev}
        onClose={handleClose}
        customStyles={customStyles}
        animation="bounce"
        onSkip={handleClose}
        showSpotlight
        mode="live"
      />
    </>
  );
};

export { Tourbit };
