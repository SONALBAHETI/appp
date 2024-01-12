"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useAuth } from "@/hooks/useAuth";
import { useApi } from "@/hooks/useApi";
import { toast } from "react-toastify";
import { apiRoutes } from "@/api/routes";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import NoteCard from "@/components/notes/NoteCard";
import { INote } from "@/interfaces/note";
import NoteEditor from "@/components/notes/NoteEditor";
import { useNotesQuery } from "@/api/notes";

const Note = () => {
  const { auth } = useAuth();
  const [showDialog, setShowDialog] = useState(false);
  const [currentNote, setCurrentNote] = useState<INote>({
    title: "",
    content: "",
  });
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const { data, isPending, isError } = useNotesQuery();

  const [saveNoteApi] = useApi({
    url: "/api/v1/notes",
    method: "POST",
    withAuth: true,
  });

  const resetCurrentNote = () => {
    setCurrentNote({ title: "", content: "" });
    setEditorState(EditorState.createEmpty());
  };

  const handleNoteClick = (note: INote) => {
    setCurrentNote({ ...note });
    const editorState = note.content
      ? EditorState.createWithContent(convertFromRaw(JSON.parse(note.content)))
      : EditorState.createEmpty();
    setEditorState(editorState);
  };

  const updateNote = async (
    noteId: string,
    noteData: { title: string; content: string }
  ) => {
    const url = `${
      process.env.NEXT_PUBLIC_SERVER_BASE_URL
    }${apiRoutes.notes.updateNote(noteId)}`;

    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth?.accessToken}`,
        },
        body: JSON.stringify(noteData),
      });

      if (response.ok) {
        // fetchNotes();
        setShowDialog(false);
        toast.success("Note updated successfully!");
      } else {
        const errMsg = await response.text();
        console.error("Failed to update note:", response.status, errMsg);
        toast.error(`Failed to update the note: ${errMsg}`);
      }
    } catch (error) {
      console.error("Error updating note:", error);
      toast.error("An error occurred while updating the note");
    }
  };

  const handleSaveNote = async () => {
    if (!currentNote.title.trim()) {
      toast.error("Title cannot be empty");
      return;
    }

    const content = JSON.stringify(
      convertToRaw(editorState.getCurrentContent())
    );
    const noteData = { title: currentNote.title, content };

    if (currentNote.id) {
      await updateNote(currentNote.id, noteData);
    } else {
      try {
        const requestConfig = {
          method: "POST",
          body: JSON.stringify(noteData),
          headers: {
            "Content-Type": "application/json",
          },
        };

        const { response } = await saveNoteApi({ config: requestConfig });
        if (response.ok) {
          // fetchNotes();
          setShowDialog(false);
          toast.success("Note created successfully!");
        } else {
          toast.error("Failed to save the note");
        }
      } catch (error) {
        console.error("Error saving note:", error);
        toast.error("An error occurred while saving the note");
      }
    }
  };

  const handleDeleteNote = async () => {
    if (!currentNote.id) return;
    try {
      const url = `${
        process.env.NEXT_PUBLIC_SERVER_BASE_URL
      }${apiRoutes.notes.deleteNote(currentNote.id)}`;

      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth?.accessToken}`,
        },
      });

      if (response.ok) {
        // fetchNotes();
        setShowDialog(false);
        toast.success("Note deleted successfully!");
      } else {
        toast.error("Failed to delete the note");
      }
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("An error occurred while deleting the note");
    }
  };

  const toggleDialog = (open: boolean) => {
    setShowDialog(open);
    if (!open) {
      resetCurrentNote();
    }
  };

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong</div>;
  }

  const notes = data.notes;

  return (
    <div className="bg-gray-100 min-h-screen">
      <Dialog open={showDialog} onOpenChange={toggleDialog}>
        <div className="container mx-auto p-4 md:px-12 lg:px-16 xl:px-20">
          <DialogTrigger asChild>
            <Button className="mb-4">Create new note &#43;</Button>
          </DialogTrigger>
          <div className="grid grid-cols-3 gap-6">
            {/* Changed this line */}
            {notes.map((note) => (
              <DialogTrigger
                key={note.id}
                onClick={() => handleNoteClick(note)}
              >
                <NoteCard key={note.id} note={note} />
              </DialogTrigger>
            ))}
          </div>
        </div>
        <NoteEditor
          note={currentNote}
          onChangeNote={setCurrentNote}
          onSaveNote={handleSaveNote}
          onDeleteNote={handleDeleteNote}
          editorState={editorState}
          onEditorStateChange={setEditorState}
        />
      </Dialog>
    </div>
  );
};

export default Note;
