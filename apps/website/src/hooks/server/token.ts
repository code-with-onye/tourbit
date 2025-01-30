import { tokenService } from "@/endpoints/token";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreateTorbitToken = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ["create-torbit-token"],
    mutationFn: async () => await tokenService.createToken(),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["get-torbit-token"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return { mutate, isPending };
};

export const useGetTorbitToken = () => {
  const { data, isPending } = useQuery({
    queryKey: ["get-torbit-token"],
    queryFn: async () => await tokenService.getToken(),
  });

  return { data: data?.data, isPending };
};
