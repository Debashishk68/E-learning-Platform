import React from "react";

export default function TextArea({ label, ...props }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-700 font-medium">{label}</label>
      <textarea
        rows={4}
        {...props}
        className="px-4 py-2 border rounded-md outline-none resize-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
