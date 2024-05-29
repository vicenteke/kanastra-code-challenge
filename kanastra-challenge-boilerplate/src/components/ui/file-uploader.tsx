import { useFileContext } from "./file";
import { bytesToHumanFileSize, escapeHtml } from "../../lib/utils";
import useFileUploader, { FILE_TYPES, MAX_FILE_SIZE } from "../../hooks/file-uploader";
import Badge from "./badge";


const FileUploader = () => {
  const { state } = useFileContext();
  const {
    handleChange,
    handleUpload,
  } =  useFileUploader();
  

  return (
    <div className="flex flex-col justify-center items-center bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-500 animated-background overflow-hidden"
      style={{ minHeight: '100svh' }}
    >
      <div className="flex gap-6 w-screen justify-center">
        <div className="w-3/5 bg-gray-100 rounded overflow-hidden shadow-lg px-8 py-10">
          <img src='/logo.webp' width='250px' height='auto' className="rounded-lg" style={{ margin: '30px auto 60px auto' }}/>
          {/* https://tw-elements.com/docs/react/forms/file-input/ */}
          <div>
            <label
              htmlFor="file"
              className="mb-2 inline-block text-neutral-200 bg-cyan-600 sr-only"
            >
              Choose a file
            </label>
            <input
              id="file"
              type="file"
              placeholder="Select a file"
              accept="text/csv"
              onChange={handleChange}
              disabled={state.isLoading}
              className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-400 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-cyan-800 file:px-3 file:py-[0.32rem] file:text-white file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-cyan-900 focus:shadow-te-primary focus:outline-none disabled:opacity-60 dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
            />
          </div>
          {state.error &&
            <span className="text-red-700 text-sm inline-box pt-2">
              {state.error}
            </span>
          }
          {!state.file &&
            <div className='h-24 mt-5 flex items-center justify-center'>
              <span className='text-lg text-neutral-400'>please select a file</span>
            </div>
          }
          {state.file && (
            <section className="pt-4 pb-2">
              <span className="pb-1 mr-3">{escapeHtml(state.file.name)}</span>
              <div className="inline-flex gap-2">
                <Badge error={state.file.size <= 0 || state.file.size > MAX_FILE_SIZE}>
                  {bytesToHumanFileSize(state.file.size)}
                </Badge>
                <Badge error={!FILE_TYPES.includes(state.file.type)}>
                  {escapeHtml(state.file.type) || 'invalid format'}
                </Badge>
              </div>
            </section>
          )}
          {state.file &&
            <button
              className="mt-6 w-full rounded-lg bg-cyan-800 text-white px-4 py-2 border-none font-semibold disabled:bg-cyan-800/40 disabled:cursor-not-allowed"
              onClick={handleUpload}
              disabled={state.isLoading || !!state.error}
            >
              {state.isLoading ?
                <span>Uploading {escapeHtml(state.file.name)}...</span>
                : <span>Upload {escapeHtml(state.file.name)}</span>
              }
            </button>
          }
        </div>
      </div>
    </div>
  );
};

export { FileUploader };
