import toast from "react-hot-toast";
import { useAtom } from "jotai";
import DropZoneSvg from "~/components/DopZoneSvg";
import DropZoneButton from "~/components/DropZoneButton";
import { base64Atom, fileNameAtom } from "~/pages";
import type { DragEvent } from "react";

export const imageType = [
  "image/bmp",
  "image/jpeg",
  "image/x-png",
  "image/png",
  "image/gif",
];

const DropZone = () => {
  const [base64, setBase64] = useAtom(base64Atom);
  const [fileName, setFile] = useAtom(fileNameAtom);
  const dragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const dropHandler = (e: DragEvent) => {
    e.preventDefault();
    const fileReader = new FileReader();
    [...e.dataTransfer.files].forEach((file) => {
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
    });
  };
  return (
    <div
      onDragOver={(e) => dragOver(e)}
      onDrop={(e) => dropHandler(e)}
      className="flex h-64 w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-200"
    >
      <DropZoneSvg />
      <p className="text-indigo-400 underline underline-offset-8">
        Drag an image here!
      </p>
      <p>or</p>
      <DropZoneButton />
    </div>
  );
};

export default DropZone;
