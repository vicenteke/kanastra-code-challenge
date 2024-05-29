import { ReactElement, useEffect } from "react";
import { useFileContext } from "./file";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableCell,
  TableRow
} from "./table";
import useFileUploader from "../../hooks/file-uploader";
import { bytesToHumanFileSize, unescapeHtml } from "../..//lib/utils";


function FileList(): ReactElement {
  const { state } = useFileContext();

  const {
    fetchFileList,
  } =  useFileUploader();

  useEffect(() => {
    fetchFileList();
  }, []);

  return (
    <div className="flex flex-col m-auto w-5/6 pb-20 min-h-screen">
      <span className="text-4xl pl-2 pb-4 pt-10">Uploads</span>
      <Table>
        <TableHeader>
          <TableRow className="bg-cyan-900 hover:bg-cyan-900">
            <TableHead className="font-bold text-white">
              File
            </TableHead>
            <TableHead className="font-bold text-white">
              Size
            </TableHead>
            <TableHead className="font-bold text-white">
              Uploaded At
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {state.fileList?.map((file) => {
            const datetime = new Date(file.uploaded_at);
            const uploadedAt = datetime.toLocaleString();
            return <TableRow key={file.filename}>
              <TableCell key={file.filename + 'original'}>
                {unescapeHtml(file.original_filename)}
              </TableCell>
              <TableCell key={file.filename + 'size'}>
                {bytesToHumanFileSize(file.size)}
              </TableCell>
              <TableCell key={file.filename + 'timestamp'}>
                {uploadedAt}
              </TableCell>
            </TableRow>
          })}
        </TableBody>
      </Table>
      {(!state.fileList || state.fileList.length === 0) &&
        <div className="flex justify-center w-full mt-4">
          <span className="text-neutral-400 text-lg text-center">
            no uploads yet,<br />use the card above to upload CSV files
          </span>
        </div>
      }
    </div>
  );
}

export { FileList };
