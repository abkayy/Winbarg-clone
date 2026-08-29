"use client";

import "@mdxeditor/editor/style.css";
import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  linkPlugin,
  linkDialogPlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  codeBlockPlugin,
  codeMirrorPlugin,
  toolbarPlugin,
  BoldItalicUnderlineToggles,
  BlockTypeSelect,
  CreateLink,
  InsertThematicBreak,
  ListsToggle,
  InsertCodeBlock,
  UndoRedo,
  type MDXEditorMethods,
} from "@mdxeditor/editor";
import { useRef, useEffect } from "react";

interface MarkdownEditorProps {
  value: string;
  onChange: (markdown: string) => void;
  placeholder?: string;
  minHeight?: string;
}

export default function MarkdownEditor({
  value,
  onChange,
  placeholder = "Write your blog content here…",
  minHeight = "420px",
}: MarkdownEditorProps) {
  const editorRef = useRef<MDXEditorMethods>(null);

  // Sync external value resets (e.g. when edit page loads blog data)
  useEffect(() => {
    if (editorRef.current && editorRef.current.getMarkdown() !== value) {
      editorRef.current.setMarkdown(value || "");
    }
    // Only run once on mount / when value arrives for the first time
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="rounded-xl border border-slate-200 bg-white overflow-hidden focus-within:ring-2 focus-within:ring-brand-primary/30 focus-within:border-brand-primary transition-all"
      style={{ minHeight }}
    >
      <MDXEditor
        ref={editorRef}
        markdown={value || ""}
        onChange={onChange}
        placeholder={placeholder}
        contentEditableClassName="prose prose-slate max-w-none font-['Plus_Jakarta_Sans'] min-h-[380px] px-6 py-4 text-slate-800 focus:outline-none"
        plugins={[
          headingsPlugin(),
          listsPlugin(),
          quotePlugin(),
          linkPlugin(),
          linkDialogPlugin(),
          thematicBreakPlugin(),
          markdownShortcutPlugin(),
          codeBlockPlugin({ defaultCodeBlockLanguage: "text" }),
          codeMirrorPlugin({
            codeBlockLanguages: {
              js: "JavaScript",
              ts: "TypeScript",
              tsx: "TypeScript (React)",
              jsx: "JavaScript (React)",
              css: "CSS",
              html: "HTML",
              json: "JSON",
              bash: "Bash",
              text: "Plain Text",
            },
          }),
          toolbarPlugin({
            toolbarContents: () => (
              <div className="flex flex-wrap items-center gap-1 px-2 py-1.5 border-b border-slate-200 bg-slate-50">
                <UndoRedo />
                <div className="w-px h-5 bg-slate-200 mx-1" />
                <BlockTypeSelect />
                <div className="w-px h-5 bg-slate-200 mx-1" />
                <BoldItalicUnderlineToggles />
                <div className="w-px h-5 bg-slate-200 mx-1" />
                <ListsToggle />
                <div className="w-px h-5 bg-slate-200 mx-1" />
                <CreateLink />
                <InsertCodeBlock />
                <InsertThematicBreak />
              </div>
            ),
          }),
        ]}
      />
    </div>
  );
}
