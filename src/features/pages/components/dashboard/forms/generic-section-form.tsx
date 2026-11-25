"use client";

import React from "react";
import { Input } from "@/components/ui/input";

interface GenericSectionFormProps {
  propsData: Record<string, unknown>;
  onChange: (key: string, value: unknown) => void;
}

export function GenericSectionForm({ propsData, onChange }: GenericSectionFormProps) {
  const keys = Object.keys(propsData);

  return (
    <div className="space-y-4">
      {keys.length === 0 ? (
        <div className="p-8 text-center bg-[#FDFBF7] rounded-xl border border-dashed border-[#dfd7c8] text-xs text-[#5c554b]">
          Khối section này chưa có thuộc tính JSON cấu hình nào. Hãy chuyển sang tab &ldquo;Mã JSON&rdquo;
          để thêm cấu hình.
        </div>
      ) : (
        <div className="space-y-3">
          {keys.map((key) => {
            const val = propsData[key];
            const isComplex = typeof val === "object" && val !== null;

            return (
              <div key={key}>
                <label className="text-xs font-bold text-[#292929] block mb-1 font-mono">
                  {key}
                </label>
                {isComplex ? (
                  <textarea
                    rows={3}
                    value={JSON.stringify(val, null, 2)}
                    onChange={(e) => {
                      try {
                        const parsed = JSON.parse(e.target.value);
                        onChange(key, parsed);
                      } catch {
                        // Keep text until valid
                      }
                    }}
                    className="w-full text-xs font-mono p-2 rounded-xl border border-[#dfd7c8] bg-[#FDFBF7]"
                  />
                ) : (
                  <Input
                    value={String(val || "")}
                    onChange={(e) => onChange(key, e.target.value)}
                    className="h-9 text-xs bg-[#FDFBF7]"
                  />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
