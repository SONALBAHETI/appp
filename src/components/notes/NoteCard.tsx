import { INote } from "@/interfaces/note";
import { stateToHTML } from "draft-js-export-html";
import { convertFromRaw } from "draft-js";
import DOMPurify from "dompurify";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface INoteCardProps {
  note: INote;
  className?: string;
  onClick?: (note: INote) => void;
}

export default function NoteCard({ note, className, onClick }: INoteCardProps) {
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
    <Card
      className={cn("rounded-xl max-h-48 shadow-sm hover:shadow-md overflow-hidden", className)}
      onClick={() => onClick && onClick(note)}
    >
      <CardHeader className="pb-4">
        <CardTitle className="text-md">{note.title}</CardTitle>
      </CardHeader>
      <CardContent
        className="text-card-foreground/60 text-sm"
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
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
