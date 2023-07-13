import { useAtom } from "jotai";
import toast from "react-hot-toast";
import { imageType } from "./DropZone";
import { base64Atom, fileNameAtom } from "~/pages";
import type { ChangeEvent } from "react";

const DropZoneButton = () => {
  const [base64, setBase64] = useAtom(base64Atom);
  const [fileName, setFile] = useAtom(fileNameAtom);

  const handleImput = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const fileReader = new FileReader();
    const file = e.target.files?.item(0);
      if (file) {
        if (imageType.includes(file.type)) {
          fileReader.readAsDataURL(file);
          fileReader.onprogress = () => {
            setFile([...fileName, file.name]);
          };
          fileReader.onload = () => {
            setBase64([...base64, fileReader.result]);
          };
        } else {
          toast.error("That file it's not an image 😥");
        }
    } else {
      toast.error("There was a problem while loading your file");
    }
  };

  return (
    <>
      <input
        type="file"
        onChange={(e) => handleImput(e)}
        className="hidden"
        id="upload"
      />
      <label
        htmlFor="upload"
        className="cursor-pointer self-center rounded-lg bg-indigo-600 px-4 py-2"
      >
        Choose a file
      </label>
    </>
  );
};

export default DropZoneButton;
