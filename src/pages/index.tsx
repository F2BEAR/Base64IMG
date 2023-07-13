import Head from "next/head";
import { Toaster } from "react-hot-toast";
import { atom, useAtom } from "jotai";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import DropZone from "~/components/DropZone";
import Item from "~/components/Item";

export type Base64 = string | ArrayBuffer | null;
export const base64Atom = atom<Base64[]>([]);
export const fileNameAtom = atom<string[]>([]);

export default function Home() {
  const [fileName] = useAtom(fileNameAtom);

  return (
    <>
      <Head>
        <title>Base64IMG</title>
        <meta
          name="description"
          content="A simple app to convert images to base64 strings"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-between bg-slate-950 text-slate-200">
        <Header />
        <section className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <DropZone />
          <ul className="w-full">
            {fileName.map((_file, i) => (
              <Item key={i} index={i} />
            ))}
          </ul>
        </section>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: { color: "#E2E8F0", backgroundColor: "#1F2937" },
          }}
        />
        <Footer />
      </main>
    </>
  );
}
