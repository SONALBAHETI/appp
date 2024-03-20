"use client";
import { cn } from "@/lib/utils";
import { Check, Clipboard } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

export default function CopyToClipboard({
  text,
  className,
  copiedIconClassName,
}: {
  text: string;
  className?: string;
  copiedIconClassName?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
      toast.success("Copied to clipboard", {
        autoClose: 1000,
      });
    } catch (error) {
      console.error("Failed to copy text: ", error);
    }
  };

  return (
    <div className={className}>
      {!copied ? (
        <Clipboard
          onClick={handleCopy}
          className={cn("h-4 w-4 cursor-pointer", className)}
        />
      ) : (
        <Check className={cn("h-4 w-4", copiedIconClassName)} />
      )}
    </div>
  );
}