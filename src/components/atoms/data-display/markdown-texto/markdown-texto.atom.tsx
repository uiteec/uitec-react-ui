"use client";

import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownTextoAtomProps {
  texto: string;
}

const COMPONENTES: Components = {
  h1: ({ children }) => (
    <h3 className="text-base font-semibold mt-3 mb-1 first:mt-0" style={{ color: "var(--font-default)" }}>
      {children}
    </h3>
  ),
  h2: ({ children }) => (
    <h4 className="text-sm font-semibold mt-3 mb-1 first:mt-0" style={{ color: "var(--font-default)" }}>
      {children}
    </h4>
  ),
  h3: ({ children }) => (
    <h5 className="text-sm font-semibold mt-2 mb-1 first:mt-0" style={{ color: "var(--font-default)" }}>
      {children}
    </h5>
  ),
  p: ({ children }) => (
    <p className="text-sm leading-relaxed mb-2" style={{ color: "var(--font-vector)" }}>
      {children}
    </p>
  ),
  ul: ({ children }) => <ul className="list-disc pl-5 mb-2 flex flex-col gap-1">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal pl-5 mb-2 flex flex-col gap-1">{children}</ol>,
  li: ({ children }) => (
    <li className="text-sm leading-relaxed" style={{ color: "var(--font-vector)" }}>
      {children}
    </li>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold" style={{ color: "var(--font-default)" }}>
      {children}
    </strong>
  ),
  a: ({ children, href }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="underline"
      style={{ color: "var(--primary-default)" }}
    >
      {children}
    </a>
  ),
  hr: () => <hr className="my-3" style={{ borderColor: "var(--background-divisor)" }} />,
  blockquote: ({ children }) => (
    <blockquote
      className="pl-3 my-2 text-sm italic"
      style={{ borderLeft: "3px solid var(--background-divisor)", color: "var(--font-vector)" }}
    >
      {children}
    </blockquote>
  ),
  code: ({ children }) => (
    <code
      className="px-1 py-0.5 rounded text-xs"
      style={{ background: "var(--background-divisor)", color: "var(--font-default)" }}
    >
      {children}
    </code>
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto mb-2">
      <table className="text-sm w-full border-collapse">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th
      className="text-left px-2 py-1 font-semibold"
      style={{ borderBottom: "1px solid var(--background-divisor)", color: "var(--font-default)" }}
    >
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td
      className="px-2 py-1"
      style={{ borderBottom: "1px solid var(--background-divisor)", color: "var(--font-vector)" }}
    >
      {children}
    </td>
  ),
};

export function MarkdownTextoAtom({ texto }: MarkdownTextoAtomProps) {
  return (
    <div className="app-markdown">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={COMPONENTES}>
        {texto}
      </ReactMarkdown>
    </div>
  );
}
