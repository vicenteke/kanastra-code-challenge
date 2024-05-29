import { ReactElement } from "react";
import { FileProvider } from "./file";
import { FileUploader } from "./file-uploader";
import { FileList } from "./file-list";

function Layout(): ReactElement {
  return (
    <FileProvider>
      <main className="flex flex-col">
        <FileUploader />
        <FileList />
      </main>
    </FileProvider>
  );
}

export { Layout };
