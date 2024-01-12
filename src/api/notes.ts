import { pathToUrl } from "@/lib/utils";
import { apiRoutes } from "./routes";
import {
  IGetNotesResponse,
  ICreateNoteResponse,
  IUpdateNoteResponse,
  IDeleteNoteResponse,
  INote,
} from "@/interfaces/note";

import { usePost, useFetch, usePatch, useDelete } from "@/lib/react-query";
import { createQueryKey, isEqualQueryKeys } from "@/lib/react-query/utils";

export const getGetNotesQueryKey = () =>
  createQueryKey(apiRoutes.notes.getNotes);

export const getUpdateNoteMutationKey = (id: string) =>
  createQueryKey(apiRoutes.notes.updateNote(id));

export const getDeleteNoteMutationKey = (id: string) =>
  createQueryKey(apiRoutes.notes.deleteNote(id));

/**
 * Custom hook for getting a chat request by id.
 * @param id - The id of the chat request.
 * @returns The query result.
 */
export const useNotesQuery = () =>
  useFetch<IGetNotesResponse>(getGetNotesQueryKey(), {
    staleTime: 1000 * 30,
  });

/**
 * Generates a mutation hook for updating a note.
 *
 * @param {string} id - The ID of the note to update.
 * @return The mutation hook for updating the note.
 */
export const useUpdateNoteMutation = (id: string) => {
  const dependentQueryKeys = [getGetNotesQueryKey()];
  return usePatch<{ title: string; content: string }, IUpdateNoteResponse>({
    queryKey: getUpdateNoteMutationKey(id),
    dependentQueryKeys,
    // optimistically update the content of the note
    optimisticUpdater: (queryKey, oldQueryData, mutatedData) => {
      // check if this function is called for the getNotes query
      if (isEqualQueryKeys(queryKey, getGetNotesQueryKey())) {
        return {
          ...oldQueryData,
          notes: oldQueryData.notes.map((note: INote) => {
            // if this is the updated note, return the updated data
            if (note.id === id) {
              return { ...note, ...mutatedData };
            }
            return note;
          }),
        } as IGetNotesResponse;
      }
    },
  });
};

/**
 * Custom hook for deleting a note.
 * 
 * @param id The ID of the note to delete.
 * @returns The result of the delete operation.
 */
export const useDeleteNoteMutation = (id: string) => {
  // Query keys that the delete operation is dependent on
  const dependentQueryKeys = [getGetNotesQueryKey()];

  // Use the useDelete hook to perform the delete operation
  return useDelete<IDeleteNoteResponse>({
    // The query key for the delete operation
    queryKey: getDeleteNoteMutationKey(id),

    // The dependent query keys that should be updated after the delete operation
    dependentQueryKeys,

    // Optimistic updater function to update the query data optimistically
    optimisticUpdater: (queryKey, oldQueryData) => {
      if (isEqualQueryKeys(queryKey, getGetNotesQueryKey())) {
        // Filter out the deleted note from the old query data
        return {
          ...oldQueryData,
          notes: oldQueryData.notes.filter((note: INote) => note.id !== id),
        } as IGetNotesResponse;
      }
    },
  });
};
