"use client";

import React from "react";
import { AlertCircle } from "lucide-react";

interface RawJsonEditorProps {
  rawJson: string;
  jsonError: string | null;
  onChange: (value: string) => void;
}

export function RawJsonEditor({ rawJson, jsonError, onChange }: RawJsonEditorProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs text-[#5c554b]">
        <span>Chỉnh sửa trực tiếp dữ liệu JSON schema của khối section:</span>
        <span className="font-mono text-[11px] text-[#76232D]">JSON Format</span>
      </div>

      <textarea
        rows={18}
        value={rawJson}
        onChange={(e) => onChange(e.target.value)}
        className="w-full font-mono text-xs p-3.5 rounded-xl border border-[#dfd7c8] bg-[#1e1e1e] text-[#d4d4d4] focus:outline-hidden focus:ring-2 focus:ring-[#C29B57] leading-relaxed no-scrollbar resize-y"
        placeholder='{ "title": "...", "description": "..." }'
      />

      {jsonError && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
          <span>{jsonError}</span>
        </div>
      )}
    </div>
  );
}
