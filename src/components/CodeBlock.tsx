"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CodeBlockProps {
  command: string;
  label?: string;
}

export function CodeBlock({ command, label }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textArea = document.createElement("textarea");
      textArea.value = command;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="terminal-block group">
      {label && (
        <div className="terminal-header">
          <div className="flex gap-1.5">
            <span className="terminal-dot bg-red-500" />
            <span className="terminal-dot bg-yellow-500" />
            <span className="terminal-dot bg-amber-500" />
          </div>
          <span className="text-xs text-white/40 ml-2 font-mono">{label}</span>
        </div>
      )}
      <div className="terminal-body flex items-center justify-between gap-3 min-w-0">
        <code className="text-xs sm:text-sm break-all whitespace-pre-wrap">
          <span className="terminal-prompt">$ </span>
          <span className="terminal-command">{command}</span>
        </code>
        <button
          onClick={handleCopy}
          className="shrink-0 p-2 rounded-lg hover:bg-white/10 transition-colors group/btn"
          title="Copiar comando"
        >
          {copied ? (
            <Check className="w-4 h-4 text-amber-400" />
          ) : (
            <Copy className="w-4 h-4 text-white/30 group-hover/btn:text-white/60 transition-colors" />
          )}
        </button>
      </div>
    </div>
  );
}
