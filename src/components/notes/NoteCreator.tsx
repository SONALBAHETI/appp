import { useCreateNoteMutation } from "@/api/notes";
import { EditorState } from "draft-js";
import { useState } from "react";
import { getContentFromState } from "./utils";
import { toast } from "react-toastify";
import NoteEditorPrimitive from "./NoteEditorPrimitive";

const NoteCreator = ({ onDone }: { onDone?: () => void }) => {
  const mutationCreateNote = useCreateNoteMutation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [noteTitle, setNoteTitle] = useState<string>("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleCreateNote = async () => {
    try {
      setIsLoading(true);
      await mutationCreateNote.mutateAsync({
        title: noteTitle,
        content: getContentFromState(editorState),
      });
      setIsLoading(false);
      toast.success("Note created successfully!");
      onDone?.();
    } catch (error) {
      console.error("Error creating note:", error);
      toast.error("An error occurred while creating the note");
    }
  };

  return (
    <NoteEditorPrimitive
      dialogTitle="Add a Note"
      titleValue={noteTitle}
      isLoading={isLoading}
      onTitleChange={(e) => setNoteTitle(e.target.value)}
      editorState={editorState}
      onEditorStateChange={setEditorState}
      saveButtonLabel="Create Note"
      onSaveNote={handleCreateNote}
    />
  );
};

export default NoteCreator;
