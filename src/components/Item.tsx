import Image from "next/image";
import toast from "react-hot-toast";
import { useAtom } from "jotai";
import Spinner from "~/components/Spinner";
import { base64Atom, fileNameAtom } from "~/pages";

type Props = { index: number };

const Item = ({ index }: Props) => {
  const [base64Array] = useAtom(base64Atom);
  const [fileName] = useAtom(fileNameAtom);
  const base64 = base64Array[index];
  const handleClick = () => {
    navigator.clipboard
      .writeText(base64 ? base64.toString() : "")
      .then(() => toast.success("Copied to Clipboard"))
      .catch(() => toast.error("There was an unexpected error 😥"));
  };
  return (
    <div className="h-18 mb-2 flex w-full items-center justify-between rounded-lg bg-slate-900 p-2">
      {base64 ? (
        <Image
          src={base64.toString()}
          width={100}
          height={100}
          className="h-14 w-14"
          alt="preview"
        />
      ) : (
        <Spinner />
      )}
      <p>{fileName[index]}</p>
      <button
        className="rounded-lg bg-indigo-600 px-4 py-2 disabled:bg-slate-400"
        onClick={() => handleClick()}
      >
        Copy to Clipboard
      </button>
    </div>
  );
};

export default Item;
