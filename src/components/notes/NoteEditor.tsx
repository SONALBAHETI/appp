"use client";

import { EditorState, convertFromRaw } from "draft-js";
import {
  useDeleteNoteMutation,
  useSingleNoteQuery,
  useUpdateNoteMutation,
} from "@/api/notes";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import NoteEditorPrimitive from "./NoteEditorPrimitive";
import { getContentFromState } from "./utils";

interface INoteEditorProps {
  noteId: string;
  onDone?: () => void;
}

export default function NoteEditor({ noteId, onDone }: INoteEditorProps) {
  const { data, isPending, isError } = useSingleNoteQuery(noteId);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [noteTitle, setNoteTitle] = useState<string>("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const mutationUpdateNote = useUpdateNoteMutation(noteId);
  const mutationDeleteNote = useDeleteNoteMutation(noteId);

  useEffect(() => {
    if (data?.note) {
      setNoteTitle(data.note.title);
      setEditorState(
        EditorState.createWithContent(
          convertFromRaw(JSON.parse(data.note.content))
        )
      );
    }
  }, [data]);

  const handleSaveNote = async () => {
    try {
      setIsLoading(true);
      await mutationUpdateNote.mutateAsync({
        title: noteTitle,
        content: getContentFromState(editorState),
      });
      setIsLoading(false);
      toast.success("Note saved successfully!");
      onDone?.();
    } catch (error) {
      console.error("Error saving note:", error);
      toast.error("An error occurred while saving the note");
    }
  };

  const handleDeleteNote = async () => {
    try {
      setIsLoading(true);
      await mutationDeleteNote.mutateAsync(undefined);
      setIsLoading(false);
      toast.success("Note deleted successfully!");
      onDone?.();
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("An error occurred while deleting the note");
    }
  };

  if (isError) {
    // TODO: Style this in a better way
    return <div>Something went wrong</div>;
  }

  return (
    <NoteEditorPrimitive
      dialogTitle="Edit Note"
      titleValue={noteTitle}
      onTitleChange={(e) => setNoteTitle(e.target.value)}
      editorState={editorState}
      isLoading={isPending || isLoading}
      onEditorStateChange={setEditorState}
      showDeleteButton
      onDeleteNote={handleDeleteNote}
      saveButtonLabel="Save Note"
      onSaveNote={handleSaveNote}
    />
  );
}
