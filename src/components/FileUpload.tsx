"use client";
import React from "react";
import { Inbox, Loader2 } from "lucide-react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import { getS3Url, uploadToS3 } from "@/lib/s3";

export const FileUpload = () => {
  const [uploading, setUploading] = React.useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file.size > 10 * 1024 * 1024) {
        // bigger than 10mb!
        toast.error("File too large");
        return;
      }

      try {
        setUploading(true);
        const data = await uploadToS3(file);

        if (!data?.file_key || !data.file_name) {
          toast.error("Something went wrong");
          return;
        } else {
          toast.success("Document uploaded successfully!");
        }
        // mutate(data, {
        //   onSuccess: ({ chat_id }) => {
        //     toast.success("Chat created!");
        //     router.push(`/chat/${chat_id}`);
        //   },
        //   onError: (err) => {
        //     toast.error("Error creating chat");
        //     console.error(err);
        //   },
        // });
      } catch (error) {
        console.log(error);
      } finally {
        setUploading(false);
      }
    },
  });

  return (
    <div className="p-2 bg-white rounded-xl">
      <div
        {...getRootProps({
          className:
            "border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 py-8 flex justify-center items-center flex-col",
        })}
      >
        <input {...getInputProps()} />
        {uploading ? (
          <>
            {/* loading state */}
            <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
            <p className="mt-2 text-sm text-slate-400">
              Spilling Tea to GPT...
            </p>
          </>
        ) : (
          <>
            <Inbox className="w-10 h-10 text-blue-500" />
            <p className="mt-2 text-sm text-slate-400">Drop PDF Here</p>
          </>
        )}
      </div>
    </div>
  );
};
