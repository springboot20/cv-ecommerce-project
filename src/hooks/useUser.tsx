import { useParams } from "react-router-dom";
import { useGetCurrentUserQuery, useUpdateUserMutation } from "../features/users/users.slice";

export const useUser = () => {
  const { id } = useParams();
  const { data, isLoading, refetch } = useGetCurrentUserQuery(id!);


  return {
    data,
    isLoading,
    refetch,
  };
};
