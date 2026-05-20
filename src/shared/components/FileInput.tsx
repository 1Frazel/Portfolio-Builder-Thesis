import { useState } from "react";

const FileInput = ({
  title,
  acceptedFormat,
  handleClick,
  disabled = false,
}: {
  title: string;
  acceptedFormat: string;
  handleClick: (fileUrl: string) => void;
  disabled?: boolean;
}) => {
  const [fileName, setFileName] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;

    const currentFiles = e.target.files;

    if (!currentFiles) return;

    const newFiles = currentFiles[0];
    const fileUrl = URL.createObjectURL(newFiles);
    handleClick(fileUrl);
    setFileName(newFiles.name);
  };

  return (
    <div className="flex-col justify-center items-center gap-4">
      <div
        className={`flex items-center gap-[16px] w-60 h-10 rounded-lg justify-center ${
          disabled ? "bg-slate-400 cursor-not-allowed" : "bg-[#2951A3]"
        }`}
      >
      <label
        htmlFor="fileUpload"
        className={disabled ? "cursor-not-allowed" : "cursor-pointer"}
      >
        <input
          id="fileUpload"
          type="file"
          className="hidden"
          accept={acceptedFormat}
          disabled={disabled}
          onChange={handleChange}
        />
        <p className="text-white text-center">
          {title}
        </p>
      </label>
    </div>
    <p className="text-sm text-gray-500 text-center mt-4">
      {fileName}
    </p>
  </div>
  );
};

export default FileInput;
