"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import NoteCard from "@/components/notes/NoteCard";
import { INote } from "@/interfaces/note";
import NoteEditor from "@/components/notes/NoteEditor";
import { useNotesQuery } from "@/api/notes";
import NoteCreator from "@/components/notes/NoteCreator";
import NoteGridSkeleton from "@/components/notes/NoteGridSkeleton";
import Icon, { IconType } from "@/components/ui/Icon";

const Note = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [currentNoteId, setCurrentNoteId] = useState("");
  const { data, isPending, isError } = useNotesQuery();

  const handleNoteClick = (note: INote) => {
    setCurrentNoteId(note.id);
  };

  const toggleDialog = (open: boolean) => {
    setShowDialog(open);
    if (!open) {
      setCurrentNoteId("");
    }
  };

  if (isError) {
    return <div>Something went wrong</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Dialog open={showDialog} onOpenChange={toggleDialog}>
        <div className="container mx-auto p-4 md:px-12 lg:px-16 xl:px-20">
          <DialogTrigger asChild>
            <Button className="mb-4 flex gap-2 items-center">
              <Icon type={IconType.PLUS} size={18} />
              Create new note
            </Button>
          </DialogTrigger>
          {isPending ? (
            <NoteGridSkeleton />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.notes.map((note) => (
                <DialogTrigger
                  key={note.id}
                  asChild
                  onClick={() => handleNoteClick(note)}
                >
                  <div key={note.id}>
                    <NoteCard className="h-full cursor-pointer" note={note} />
                  </div>
                </DialogTrigger>
              ))}
            </div>
          )}
        </div>
        {!currentNoteId ? (
          <NoteCreator onDone={() => toggleDialog(false)} />
        ) : (
          <NoteEditor
            noteId={currentNoteId}
            onDone={() => toggleDialog(false)}
          />
        )}
      </Dialog>
    </div>
  );
};

export default Note;
