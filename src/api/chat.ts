import { pathToUrl } from "@/lib/utils";
import { apiRoutes } from "./routes";
import {
  IAcceptChatRequestResponse,
  IGetChatRequestResponse,
  IGetChatRequestsResponse,
} from "@/interfaces/chat";

import { usePost, useFetch } from "@/lib/react-query";
import { createQueryKey, isEqualQueryKeys } from "@/lib/react-query/utils";

export const getChatRequestQueryKey = (id: string) =>
  createQueryKey(pathToUrl(apiRoutes.getChatRequest, { id }));
export const getChatRequestsQueryKey = () =>
  createQueryKey(apiRoutes.getChatRequests);
export const getAcceptChatRequestMutationKey = () =>
  createQueryKey(apiRoutes.acceptChatRequest);

/**
 * Custom hook for getting a chat request by id.
 * @param id - The id of the chat request.
 * @returns The query result.
 */
export const useChatRequestQuery = (id: string) =>
  useFetch<IGetChatRequestResponse>(getChatRequestQueryKey(id), {
    staleTime: 1000 * 30,
  });

/**
 * Custom hook for getting all chat requests.
 * @returns The query result.
 */
export const useChatRequestsQuery = () =>
  useFetch<IGetChatRequestsResponse>(getChatRequestsQueryKey());

export const useAcceptChatRequestMutation = (chatRequestId: string) => {
  // create dependent query keys so that they can be invalidated and refetched
  const dependentQueryKeys = [getChatRequestsQueryKey()];
  if (chatRequestId) {
    dependentQueryKeys.push(getChatRequestQueryKey(chatRequestId));
  }
  return usePost<{ id: string }, IAcceptChatRequestResponse>({
    queryKey: getAcceptChatRequestMutationKey(),
    dependentQueryKeys,
    optimisticUpdater: (queryKey, oldQueryData, mutatedData) => {
      console.log(isEqualQueryKeys(queryKey, getChatRequestsQueryKey()));
      if (isEqualQueryKeys(queryKey, getChatRequestsQueryKey())) {
        // remove the accepted chat request from the list
        return {
          ...oldQueryData,
          chatRequests: oldQueryData.chatRequests.filter(
            (chatRequest: any) => chatRequest.id !== mutatedData.id
          ),
        } as IGetChatRequestsResponse;
      } else if (
        chatRequestId &&
        isEqualQueryKeys(queryKey, getChatRequestQueryKey(chatRequestId))
      ) {
        // update the status of the accepted chat request
        return {
          ...oldQueryData,
          chatRequest: {
            ...oldQueryData.chatRequest,
            status: "accepted",
          },
        } as IGetChatRequestResponse;
      }
    },
  });
};