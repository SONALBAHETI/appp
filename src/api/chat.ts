import { pathToUrl } from "@/lib/utils";
import { apiRoutes } from "./routes";
import {
  IUpdateChatRequestResponse,
  IGetChatRequestResponse,
  IGetChatRequestsResponse,
  IChatCredentials,
} from "@/interfaces/chat";

import { usePost, useFetch } from "@/lib/react-query";
import { createQueryKey, isEqualQueryKeys } from "@/lib/react-query/utils";

export const getChatRequestQueryKey = (id: string) =>
  createQueryKey(pathToUrl(apiRoutes.chat.getChatRequest, { id }));
export const getChatRequestsQueryKey = () =>
  createQueryKey(apiRoutes.chat.getChatRequests);
export const getChatCredentialsQueryKey = () =>
  createQueryKey(apiRoutes.chat.getCredentials);
export const getAcceptChatRequestMutationKey = () =>
  createQueryKey(apiRoutes.chat.acceptChatRequest);
export const getRejectChatRequestMutationKey = () =>
  createQueryKey(apiRoutes.chat.rejectChatRequest);

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

/**
 * Custom hook for getting chat and calls credentials.
 * @returns The query result.
 */
export const useChatCredentialsQuery = () =>
  useFetch<IChatCredentials>(getChatCredentialsQueryKey(), {
    staleTime: Infinity,
  });

/**
 * Generates a mutation hook for accepting a chat request.
 *
 * @param chatRequestId - The ID of the chat request to accept.
 * @returns The mutation hook for accepting a chat request.
 */
export const useAcceptChatRequestMutation = (chatRequestId: string) => {
  // create dependent query keys so that they can be invalidated and refetched
  const dependentQueryKeys = [getChatRequestsQueryKey()];
  // invalidate the get query key for the accepted chat request
  dependentQueryKeys.push(getChatRequestQueryKey(chatRequestId));
  return usePost<{ id: string }, IUpdateChatRequestResponse>({
    queryKey: getAcceptChatRequestMutationKey(),
    dependentQueryKeys,
    optimisticUpdater: (queryKey, oldQueryData, mutatedData) => {
      if (isEqualQueryKeys(queryKey, getChatRequestsQueryKey())) {
        // remove the accepted chat request from the list
        return {
          ...oldQueryData,
          chatRequests: oldQueryData.chatRequests.filter(
            (chatRequest: any) => chatRequest.id !== mutatedData.id
          ),
        } as IGetChatRequestsResponse;
      } else if (
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

/**
 * Generates a mutation hook for rejecting a chat request.
 *
 * @param chatRequestId - The ID of the chat request to reject.
 * @returns The mutation hook for rejecting a chat request.
 */
export const useRejectChatRequestMutation = (chatRequestId: string) => {
  // create dependent query keys so that they can be invalidated and refetched
  const dependentQueryKeys = [getChatRequestsQueryKey()];
  // invalidate the get query key for the rejected chat request
  dependentQueryKeys.push(getChatRequestQueryKey(chatRequestId));
  return usePost<{ id: string }, IUpdateChatRequestResponse>({
    queryKey: getRejectChatRequestMutationKey(),
    dependentQueryKeys,
    optimisticUpdater: (queryKey, oldQueryData, mutatedData) => {
      if (isEqualQueryKeys(queryKey, getChatRequestsQueryKey())) {
        // remove the rejected chat request from the chat requests list (optimistically)
        return {
          ...oldQueryData,
          chatRequests: oldQueryData.chatRequests.filter(
            (chatRequest: any) => chatRequest.id !== mutatedData.id
          ),
        } as IGetChatRequestsResponse;
      } else if (
        isEqualQueryKeys(queryKey, getChatRequestQueryKey(chatRequestId))
      ) {
        // update the status of the rejected chat request
        return {
          ...oldQueryData,
          chatRequest: {
            ...oldQueryData.chatRequest,
            status: "rejected",
          },
        } as IGetChatRequestResponse;
      }
    },
  });
};
