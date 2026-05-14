import Header from "../../shared/components/Header";
import FileInput from "../../shared/components/FileInput";
import checkCv from "./utils/checkCv";

const ParsePdf = () => {
  const handleChange = async (fileUrl: string) => {
    try {
      const detection = await checkCv(fileUrl);
      console.log(detection);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="h-full w-full overflow-hidden">
      <Header />
      <div>
        <FileInput
          title="Browse File"
          acceptedFormat=".pdf"
          handleClick={handleChange}
        />
      </div>
    </div>
  );
};

export default ParsePdf;
