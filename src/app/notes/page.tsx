"use client"
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useAuth } from "@/hooks/useAuth";
import { useApi } from "@/hooks/useApi";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { apiRoutes } from "@/api/routes";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";

// Zod schema for note validation
const noteSchema = zod.object({
  title: zod.string().min(1, 'Title is required'),
  content: zod.string().min(1, 'Content is required')
});

const convertContentToHTML = (rawContent) => {
  try {
    const rawObject = JSON.parse(rawContent);
    const contentState = convertFromRaw(rawObject);
    return stateToHTML(contentState);
  } catch (e) {
    console.error('Error converting content to HTML:', e);
    return 'Error rendering content';
  }
};

const Note = () => {
  const { auth } = useAuth();
  const [notes, setNotes] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [currentNote, setCurrentNote] = useState({ _id: null, title: '', rawContent: null });
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(noteSchema)
  });

  const [fetchNotesApi] = useApi({ url: '/api/v1/notes', method: 'GET', withAuth: true });
  const [saveNoteApi] = useApi({ url: '/api/v1/notes', method: 'POST', withAuth: true });
  const [updateNoteApi] = useApi({ method: 'PATCH', withAuth: true });
  const [deleteNoteApi] = useApi({ method: 'DELETE', withAuth: true });

  useEffect(() => {
    if (auth?.accessToken) {
      fetchNotes();
    }
  }, [auth.accessToken]);

  const fetchNotes = async () => {
    if (auth?.accessToken) {
      try {
        const { response, result } = await fetchNotesApi();
        if (response.ok) {
          setNotes(result);
        } else {
          throw new Error('Failed to fetch notes'); // Corrected this line
        }
      } catch (error) {
        console.error('Error fetching notes:', error);
        toast.error('Failed to fetch notes');
      }
    } else {
      console.log("Access token is not available. Waiting for token...");
    }
  };
  
  const handleNoteClick = (note) => {
    setCurrentNote({ ...note });
    const contentState = note.content ? convertFromRaw(JSON.parse(note.content)) : EditorState.createEmpty();
    setEditorState(EditorState.createWithContent(contentState));
    setShowPopup(true);
  };

  const updateNote = async (noteId, noteData) => {
    const url = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}${apiRoutes.updateNote(noteId)}`;

    try {
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth?.accessToken}`,
        },
        body: JSON.stringify(noteData)
      });

      if (response.ok) {
        fetchNotes();
        setShowPopup(false);
        toast.success('Note updated successfully!');
        setCurrentNote({ _id: null, title: '', rawContent: null });
        setEditorState(EditorState.createEmpty());
      } else {
        const errMsg = await response.text();
        console.error('Failed to update note:', response.status, errMsg);
        toast.error(`Failed to update the note: ${errMsg}`);
      }
    } catch (error) {
      console.error('Error updating note:', error);
      toast.error('An error occurred while updating the note');
    }
  };

  const handleSaveNote = async () => {
    if (!currentNote.title.trim()) {
      toast.error('Title cannot be empty');
      return;
    }

    const content = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
    const noteData = { title: currentNote.title, content };

    if (currentNote._id) {
      await updateNote(currentNote._id, noteData);
    } else {
      try {
        const requestConfig = {
          method: 'POST',
          body: JSON.stringify(noteData),
          headers: {
            'Content-Type': 'application/json'
          }
        };

        const { response } = await saveNoteApi({ config: requestConfig });
        if (response.ok) {
          fetchNotes();
          setShowPopup(false);
          toast.success('Note created successfully!');
          setCurrentNote({ _id: null, title: '', rawContent: null });
          setEditorState(EditorState.createEmpty());
        } else {
          toast.error('Failed to save the note');
        }
      } catch (error) {
        console.error('Error saving note:', error);
        toast.error('An error occurred while saving the note');
      }
    }
  };

  const handleDeleteNote = async () => {
    if (!currentNote._id) {
      toast.error('Cannot delete an unsaved note');
      return;
    }
    setIsAlertDialogOpen(true);
  };

  const confirmDeleteNote = async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}${apiRoutes.NOTE(currentNote._id)}`;

      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth?.accessToken}`,
        },
      });

      if (response.ok) {
        fetchNotes();
        setShowPopup(false);
        toast.success('Note deleted successfully!');
        setIsAlertDialogOpen(false);
      } else {
        toast.error('Failed to delete the note');
      }
    } catch (error) {
      console.error('Error deleting note:', error);
      toast.error('An error occurred while deleting the note');
    }
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
    if (!showPopup) {
      setCurrentNote({ _id: null, title: '', rawContent: null });
      setEditorState(EditorState.createEmpty());
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
    <div className="container mx-auto p-4 md:px-12 lg:px-16 xl:px-20">
      <Button onClick={togglePopup} className="mb-4">
        Create new note &#43;
      </Button>
      <div className="grid grid-cols-3 gap-6"> {/* Changed this line */}
        {notes.map((note) => (
          <div key={note._id}
            className="bg-white rounded-lg p-6 flex flex-col justify-start max-h-48 overflow-hidden cursor-pointer"
            onClick={() => handleNoteClick(note)}>
            <h3 className="text-gray-900 font-semibold text-md mb-2">{note.title}</h3>
            <div className="text-gray-800 text-sm p-2" style={{ overflowY: 'hidden' }}>
              <p dangerouslySetInnerHTML={{ __html: convertContentToHTML(note.content) }} />
            </div>
          </div>
        ))}
      </div>
    </div>

   
      {showPopup && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-10">
          <div className="relative top-20 mx-auto p-5 border w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-2/5 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-left px-7 py-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg leading-6 font-medium text-gray-900">{currentNote._id ? 'Edit Note' : 'Add a Note'}</h3>
                <button onClick={togglePopup} className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Close</span>
                  &#10005;
                </button>
              </div>
              <div className="w-full h-px bg-gray-300 my-2" />
              <div className="mb-3">
                <label htmlFor="title" className="text-gray-700 font-semibold block">Title</label>
                <Input
                  id="title"
                  placeholder="Enter your title here"
                  value={currentNote.title || ''}
                  onChange={(e) => setCurrentNote({ ...currentNote, title: e.target.value })}
                  className="w-full"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="text-gray-700 font-semibold block">Description</label>
                <div className="border p-3 bg-white rounded-md shadow-sm">
                  <Editor
                    editorState={editorState}
                    onEditorStateChange={setEditorState}
                  />
                </div>
              </div>
              <Dialog>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{currentNote._id ? 'Edit Note' : 'Add a Note'}</DialogTitle>
                  </DialogHeader>
                  <div className="border p-3 bg-white rounded-md shadow-sm">
                    <Editor
                      editorState={editorState}
                      onEditorStateChange={setEditorState}
                    />
                  </div>
                </DialogContent>
                <DialogFooter>
                  {currentNote._id && (
                    <Button onClick={handleDeleteNote} className="bg-red-500 text-white">
                      Delete
                    </Button>
                  )}
                  <Button onClick={handleSaveNote}>
                    {currentNote._id ? 'Update' : 'Save'}
                  </Button>
                </DialogFooter>
              </Dialog>
            </div>
          </div>
        </div>
      )}

      {isAlertDialogOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-20">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4">
            <div className="flex justify-end">
              <button className="text-gray-400 hover:text-gray-500" onClick={() => setIsAlertDialogOpen(false)}>
                &#10005;
              </button>
            </div>
            <AlertDialog isOpen={isAlertDialogOpen}>
              <AlertDialogHeader>Delete Note</AlertDialogHeader>
              <AlertDialogDescription>
                Are you sure you want to delete this note? This action cannot be undone.
              </AlertDialogDescription>
              <AlertDialogFooter className="flex justify-start">
                <Button onClick={confirmDeleteNote} className="bg-red-500 text-white">
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialog>
          </div>
        </div>
      )}
    </div>
  );
};

export default Note;