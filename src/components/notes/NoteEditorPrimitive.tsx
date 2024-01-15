"use client";

import dynamic from "next/dynamic";
import { EditorState } from "draft-js";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { EditorProps } from "react-draft-wysiwyg";
import ConfirmDelete from "./ConfirmDelete";
import { Button } from "../ui/button";
const Editor = dynamic<EditorProps>(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Icon, { IconType } from "../ui/Icon";

const NoteEditorPrimitive = (props: {
  dialogTitle: string;
  titleValue?: string;
  isLoading?: boolean;
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  editorState: EditorState;
  onEditorStateChange: (editorState: EditorState) => void;
  showDeleteButton?: boolean;
  saveButtonLabel: string;
  onDeleteNote?: () => void;
  onSaveNote: () => void;
}) => {
  return (
    <DialogContent className="max-h-[90vh] flex flex-col">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-4">
          {props.dialogTitle}
          {props.isLoading && (
            <Icon
              type={IconType.LOADING}
              className="mr-2 h-4 w-4 animate-spin"
            />
          )}
        </DialogTitle>
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
      <div className="border p-3 bg-white rounded-md shadow-sm flex-grow overflow-y-auto">
        <Editor
          editorState={props.editorState}
          onEditorStateChange={props.onEditorStateChange}
        />
      </div>
      <DialogFooter>
        {props.showDeleteButton && (
          <ConfirmDelete
            disabled={props.isLoading}
            onConfirmDelete={props.onDeleteNote ? props.onDeleteNote : () => {}}
          />
        )}
        <Button disabled={props.isLoading} onClick={props.onSaveNote}>
          {props.saveButtonLabel}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default NoteEditorPrimitive;
