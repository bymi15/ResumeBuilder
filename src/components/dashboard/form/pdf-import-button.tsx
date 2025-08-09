"use client";

import { ResumeSchema } from "@/lib/schemas/resume-schema";
import { UploadCloud } from "lucide-react"; // Modern upload icon
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

export function PdfImportButton({ onImport }: { onImport: (data: ResumeSchema) => void }) {
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      try {
        if (!acceptedFiles.length) return;

        const file = acceptedFiles[0];
        // const data = await parseResumePDF(file);
        // onImport(data);
      } catch (err) {
        console.error("Error parsing PDF:", err);
        toast.error("Failed to parse file. Please ensure the file is a valid PDF.");
      }
    },
    [onImport]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    multiple: false,
    onDrop,
  });

  return (
    <div
      {...getRootProps()}
      className={`flex flex-col items-center justify-center w-full p-8 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-200 ${
        isDragActive
          ? "border-blue-500 bg-blue-50 dark:bg-blue-950 shadow-lg"
          : "border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-950 hover:border-blue-400"
      }`}
    >
      <input {...getInputProps()} />
      <UploadCloud
        className={`w-10 h-10 mb-3 ${isDragActive ? "text-blue-500" : "text-gray-400"}`}
      />
      <p className="text-sm text-gray-600 dark:text-gray-200 text-center">
        {isDragActive ? (
          <span className="font-medium text-blue-600">Drop your PDF here</span>
        ) : (
          <>
            <span className="font-medium">Drag & drop</span> your PDF resume here, <br /> or{" "}
            <span className="text-blue-500">click to upload</span>
          </>
        )}
      </p>
      <p className="mt-2 text-xs text-gray-400">Only PDF files are supported</p>
    </div>
  );
}
