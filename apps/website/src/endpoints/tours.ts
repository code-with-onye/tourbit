import { StepSchema } from "@/components/shared/forms/formSchemas";
import { privateAxiosInstance } from "@/lib/axios";
import { z } from "zod";

class TourService {
  private baseEndpoint = "/tour";
  async createTour(title: string) {
    return await privateAxiosInstance.post(`${this.baseEndpoint}/create`, {
      title,
    });
  }
  async getTours() {
    return await privateAxiosInstance.get(`${this.baseEndpoint}`);
  }

  async getTourById(tourId: string) {
    return await privateAxiosInstance.get(`${this.baseEndpoint}/${tourId}`);
  }

  async updateTour(tourId: string, title: string, status: string) {
    return await privateAxiosInstance.patch(`${this.baseEndpoint}/${tourId}`, {
      title,
      status,
    });
  }

  async addStep({
    data,
    tourId,
  }: {
    data: z.infer<typeof StepSchema>;
    tourId: string;
  }) {
    return await privateAxiosInstance.patch(
      `${this.baseEndpoint}/add-step/${tourId}`,
      data
    );
  }

  async updateStep({
    data,
    tourId,
    stepId,
  }: {
    data: z.infer<typeof StepSchema>;
    tourId: string;
    stepId: string;
  }) {
    return await privateAxiosInstance.patch(
      `${this.baseEndpoint}/${tourId}/steps/${stepId}`,
      data
    );
  }

  async deleteTour(tourId: string) {
    return await privateAxiosInstance.delete(`${this.baseEndpoint}/${tourId}`);
  }

  async deleteStep(tourId: string, stepId: string) {
    return await privateAxiosInstance.patch(
      `${this.baseEndpoint}/${tourId}/steps/${stepId}/delete`
    );
  }
}

export const tourService = new TourService();
