// app/(main)/resume/_components/preview/MarkdownPreview.jsx
"use client";

import MDEditor from "@uiw/react-md-editor";

export default function MarkdownPreview({ markdown = "" }) {
  return (
    <div className="border rounded p-3 bg-white" data-color-mode="light">
      <MDEditor.Markdown source={markdown} />
    </div>
  );
}
