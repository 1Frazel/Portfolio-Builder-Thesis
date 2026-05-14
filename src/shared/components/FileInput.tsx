import { useState } from "react";

const FileInput = ({
  title,
  acceptedFormat,
  handleClick,
}: {
  title: string;
  acceptedFormat: string;
  handleClick: (fileUrl: string) => void;
}) => {
  const [fileName, setFileName] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentFiles = e.target.files;

    if (!currentFiles) return;

    const newFiles = currentFiles[0];
    const fileUrl = URL.createObjectURL(newFiles);
    handleClick(fileUrl);
    setFileName(newFiles.name);
  };

  return (
    <div className="flex items-center gap-[16px]">
      <label htmlFor="fileUpload">
        <input
          id="fileUpload"
          type="file"
          className="hidden"
          accept={acceptedFormat}
          onChange={handleChange}
        />
        {title}
      </label>
      {fileName}
    </div>
  );
};

export default FileInput;
