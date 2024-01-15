import { pathToUrl } from "@/lib/utils";
import { apiRoutes } from "./routes";
import {
  IGetNotesResponse,
  IGetSingleNoteResponse,
  ICreateNoteResponse,
  IUpdateNoteResponse,
  IDeleteNoteResponse,
  INote,
} from "@/interfaces/note";

import { usePost, useFetch, usePatch, useDelete } from "@/lib/react-query";
import { createQueryKey, isEqualQueryKeys } from "@/lib/react-query/utils";

export const getGetNotesQueryKey = () =>
  createQueryKey(apiRoutes.notes.getNotes);

export const getGetSingleNoteQueryKey = (id: string) =>
  createQueryKey(apiRoutes.notes.getNote(id));

export const getUpdateNoteMutationKey = (id: string) =>
  createQueryKey(apiRoutes.notes.updateNote(id));

export const getCreateNoteMutationKey = () =>
  createQueryKey(apiRoutes.notes.createNote);

export const getDeleteNoteMutationKey = (id: string) =>
  createQueryKey(apiRoutes.notes.deleteNote(id));

/**
 * Custom hook for getting notes.
 * @param id - The id of the note.
 * @returns The query result.
 */
export const useNotesQuery = () =>
  useFetch<IGetNotesResponse>(getGetNotesQueryKey(), {
    staleTime: 1000 * 30,
  });

/**
 * Custom hook for getting a single note by id.
 * @param id - The id of the note.
 * @returns The query result.
 */
export const useSingleNoteQuery = (id: string) =>
  useFetch<IGetSingleNoteResponse>(getGetSingleNoteQueryKey(id), {
    staleTime: 1000 * 30,
  });

/**
 * Generates a mutation hook for updating a note.
 *
 * @param id - The ID of the note to update.
 * @return The mutation hook for updating the note.
 */
export const useUpdateNoteMutation = (id: string) => {
  const dependentQueryKeys = [
    getGetNotesQueryKey(),
    getGetSingleNoteQueryKey(id),
  ];
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
 * Generates a mutation hook for creating a note.
 *
 * @return The mutation hook for creating the note.
 */
export const useCreateNoteMutation = () => {
  const dependentQueryKeys = [getGetNotesQueryKey()];
  return usePost<{ title: string; content: string }, ICreateNoteResponse>({
    queryKey: getCreateNoteMutationKey(),
    dependentQueryKeys,
    // optimistically create the content of the note
    optimisticUpdater: (queryKey, oldQueryData, mutatedData) => {
      // check if this function is called for the getNotes query
      if (isEqualQueryKeys(queryKey, getGetNotesQueryKey())) {
        return {
          ...oldQueryData,
          notes: [
            ...oldQueryData.notes,
            { ...mutatedData, id: "temporary" } as INote, // temporary id to prevent the missing key prop error in console
          ],
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

    // Optimistically delete the note from the old query data
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
