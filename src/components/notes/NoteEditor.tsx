"use client";

import dynamic from "next/dynamic";
import { INote } from "@/interfaces/note";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { EditorState } from "draft-js";
import { EditorProps } from "react-draft-wysiwyg";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { useDeleteNoteMutation, useUpdateNoteMutation } from "@/api/notes";
import { toast } from "react-toastify";
const Editor = dynamic<EditorProps>(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

const DeleteNoteButton = ({
  onConfirmDelete,
}: {
  onConfirmDelete: () => void;
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>Delete Note</AlertDialogHeader>
        <AlertDialogDescription>
          Are you sure you want to delete this note? This action cannot be
          undone.
        </AlertDialogDescription>
        <AlertDialogFooter className="flex justify-start">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              onClick={onConfirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Confirm Delete
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const NoteEditorPrimitive = (props: {
  dialogTitle: string;
  titleValue?: string;
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  editorState: EditorState;
  onEditorStateChange: (editorState: EditorState) => void;
  showDeleteButton: boolean;
  saveButtonLabel: string;
  onDeleteNote?: () => void;
  onSaveNote: () => void;
}) => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{props.dialogTitle}</DialogTitle>
      </DialogHeader>
      <div className="mb-3">
        <label htmlFor="title" className="text-gray-700 font-semibold block">
          Title
        </label>
        <Input
          placeholder="Enter your title here"
          value={props.titleValue || ""}
          className="w-full"
          onChange={props.onTitleChange}
        />
      </div>
      <div className="border p-3 bg-white rounded-md shadow-sm">
        <Editor
          editorState={props.editorState}
          onEditorStateChange={props.onEditorStateChange}
        />
      </div>
      <DialogFooter>
        {props.showDeleteButton && (
          <DeleteNoteButton
            onConfirmDelete={props.onDeleteNote ? props.onDeleteNote : () => {}}
          />
        )}
        <Button onClick={props.onSaveNote}>{props.saveButtonLabel}</Button>
      </DialogFooter>
    </DialogContent>
  );
};

interface INoteEditorProps {
  note: INote;
  onChangeNote: (note: INote) => void;
  onDeleteNote: () => void;
  onSaveNote: () => void;
  editorState: EditorState;
  onEditorStateChange: (editorState: EditorState) => void;
}

const NoteCreator = (props: {
  note: INote;
  onChangeNote: (note: INote) => void;
  onSaveNote: () => void;
  editorState: EditorState;
  onEditorStateChange: (editorState: EditorState) => void;
}) => {
  return (
    <NoteEditorPrimitive
      dialogTitle="Add a Note"
      titleValue={props.note.title}
      onTitleChange={(e) =>
        props.onChangeNote({ ...props.note, title: e.target.value })
      }
      editorState={props.editorState}
      onEditorStateChange={props.onEditorStateChange}
      showDeleteButton={false}
      saveButtonLabel="Save Note"
      onSaveNote={props.onSaveNote}
    />
  );
};

const NoteEditor = (props: INoteEditorProps) => {
  const mutationUpdateNote = useUpdateNoteMutation(props.note.id!);
  const mutationDeleteNote = useDeleteNoteMutation(props.note.id!);

  const handleSaveNote = async () => {
    try {
      await mutationUpdateNote.mutateAsync({
        title: props.note.title,
        content: props.note.content,
      });
    } catch (error) {
      console.error("Error saving note:", error);
      toast.error("An error occurred while saving the note");
    }
  };

  const handleDeleteNote = async () => {
    try {
      await mutationDeleteNote.mutateAsync(undefined);
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("An error occurred while deleting the note");
    }
  };

  return (
    <NoteEditorPrimitive
      dialogTitle="Edit Note"
      titleValue={props.note.title}
      onTitleChange={(e) =>
        props.onChangeNote({ ...props.note, title: e.target.value })
      }
      editorState={props.editorState}
      onEditorStateChange={props.onEditorStateChange}
      showDeleteButton
      onDeleteNote={handleDeleteNote}
      saveButtonLabel="Update Note"
      onSaveNote={handleSaveNote}
    />
  );
};

export default function NoteEditorComponent({
  note,
  onChangeNote,
  onDeleteNote,
  onSaveNote,
  editorState,
  onEditorStateChange,
}: INoteEditorProps) {
  if (!note.id) {
    return (
      <NoteCreator
        note={note}
        onChangeNote={onChangeNote}
        onSaveNote={onSaveNote}
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
      />
    );
  } else {
    return (
      <NoteEditor
        note={note}
        onChangeNote={onChangeNote}
        onDeleteNote={onDeleteNote}
        onSaveNote={onSaveNote}
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
      />
    );
  }
}
