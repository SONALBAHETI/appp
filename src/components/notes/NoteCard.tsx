import { INote } from "@/interfaces/note";
import { stateToHTML } from "draft-js-export-html";
import { convertFromRaw } from "draft-js";
import DOMPurify from "dompurify";

interface INoteCardProps {
  note: INote;
  onClick?: (note: INote) => void;
}

export default function NoteCard({ note, onClick }: INoteCardProps) {
  const convertContentToHTML = (rawContent: string) => {
    try {
      const rawObject = JSON.parse(rawContent);
      const contentState = convertFromRaw(rawObject);
      return stateToHTML(contentState);
    } catch (e) {
      console.error("Error converting content to HTML:", e);
      return "Error rendering content";
    }
  };

  const createMarkup = (html: string) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  return (
    <div
      key={note.id}
      className="bg-white rounded-lg p-6 flex flex-col justify-start max-h-48 overflow-hidden cursor-pointer"
      onClick={() => onClick && onClick(note)}
    >
      <h3 className="text-gray-900 font-semibold text-md mb-2">{note.title}</h3>
      <div
        className="text-gray-800 text-sm p-2"
        style={{ overflowY: "hidden" }}
      >
        {note.content ? (
          <p
            dangerouslySetInnerHTML={createMarkup(
              convertContentToHTML(note.content)
            )}
          />
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
}
