import { EditorState, convertToRaw } from "draft-js";

export const getContentFromState = (editorState: EditorState) => {
  const rawContentState = convertToRaw(editorState.getCurrentContent());
  return JSON.stringify(rawContentState);
};
