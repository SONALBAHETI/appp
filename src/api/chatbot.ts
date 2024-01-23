import {
  IGetMessagesResponse,
  IGetRunStatusResponse,
  ISendChatbotMessageResponse,
} from "@/interfaces/chatbot";
import { apiRoutes } from "./routes";
import { usePost, useFetch } from "@/lib/react-query";
import { createQueryKey, isEqualQueryKeys } from "@/lib/react-query/utils";
import { api } from "@/lib/api";
import { QueryClient } from "@tanstack/react-query";

// helper function to get the mutation key for the useSendChatbotMessageMutation hook
export const getSendChatbotMessageMutationKey = () =>
  createQueryKey(apiRoutes.chatbot.messages);

// helper function to get the query key for the useMessages hook
export const getMessagesQueryKey = () =>
  createQueryKey(apiRoutes.chatbot.messages);

/**
 * Invalidates the messages query in the query client.
 * @param queryClient - The query client to invalidate the messages query in.
 */
export const invalidateMessagesQuery = (queryClient: QueryClient) => {
  queryClient.invalidateQueries({
    queryKey: getMessagesQueryKey(),
  });
};

/**
 * Retrieves the run status for a specified run ID.
 *
 * @param runId - The ID of the run
 * @return The retrieved run status response
 */
export const getRunStatus = async (runId: string) => {
  return await api
    .get<IGetRunStatusResponse>(apiRoutes.chatbot.retrieveRunStatus(runId))
    .then((res) => res.data);
};

/**
 * Fetches and returns messages using the useFetch hook.
 *
 * @return The response object containing messages.
 */
export const useMessages = () =>
  useFetch<IGetMessagesResponse>(getMessagesQueryKey());

/**
 * Returns a mutation function for sending a chatbot message.
 * It optimistically adds the sent message with a "temp" id
 * to the messages array in the useMessages hook.
 */
export const useSendChatbotMessageMutation = () =>
  usePost<{ message: string }, ISendChatbotMessageResponse>({
    queryKey: getSendChatbotMessageMutationKey(),
    dependentQueryKeys: [getMessagesQueryKey()],
    optimisticUpdater: (queryKey, oldQueryData, mutatedData) => {
      if (isEqualQueryKeys(queryKey, getMessagesQueryKey())) {
        return {
          ...oldQueryData,
          messages: [
            ...oldQueryData.messages,
            {
              id: "temp",
              content: [{ text: { value: mutatedData.message } }],
              role: "user",
            },
          ],
        } as IGetMessagesResponse;
      }
    },
  });
