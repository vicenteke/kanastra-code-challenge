import axios from "axios";
import { FileActionType } from "../types";
import { useFileContext } from "../components/ui/file";

export const MAX_FILE_SIZE = 200 * 1024 * 1024;
export const FILE_TYPES = ['text/csv'];

const useFileUploader = () => {
  const { state, dispatch } = useFileContext();

  const validate = (file?: File) => {
    const _file = file || state.file;
    let error = undefined;
    if (!_file)
      error = 'Please select a file';
    else if (_file.size === 0)
      error = 'File has no content';
    else if (_file.size > MAX_FILE_SIZE)
      error = 'File is larger than 200 MB';
    else if (!_file.name)
      error = 'File has no name';
    else if (!FILE_TYPES.includes(_file.type))
      error = 'Format not accepted, please select a CSV file';

    dispatch({
      type: FileActionType.ERROR,
      payload: { error }
    });

    return !error;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files;
    if (file && file.length > 0) {
      dispatch({
        type: FileActionType.SET_FILE,
        payload: {
          file: file[0],
        }
      });
      validate(file[0]);
    };
  };

  const handleUpload = async () => {
    if (state.isLoading)
      return;

    if (validate()) {
      dispatch({
        type: FileActionType.SET_LOADING,
        payload: {
          isLoading: true
        }
      });

      // prevent deadlock
      const timeout = setTimeout(() => {
        dispatch({
          type: FileActionType.SET_LOADING,
          payload: {
            isLoading: false
          }
        });
      }, 60000);

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      };

      const formData = new FormData();
      formData.append('file', state.file!);

      try {
        await axios.post('http://localhost:8000/files/', formData, config).then(response => {
          if (response.status === 201) {
            dispatch({
              type: FileActionType.RESET
            });
          } else {
            dispatch({
              type: FileActionType.ERROR,
              payload: {
                error: response.data.detail
              }
            });
          }
        }).catch((reason) => {
          dispatch({
            type: FileActionType.ERROR,
            payload: {
              error: reason.response.data.detail
            }
          });
        });
      } catch (e) {
        console.error('Failed to upload file:', e);
        dispatch({
          type: FileActionType.ERROR,
          payload: {
            error: 'Failed to upload file, something wrong happened'
          }
        });
      }

      dispatch({
        type: FileActionType.SET_LOADING,
        payload: {
          isLoading: false
        }
      });
      if (timeout) clearInterval(timeout);
      fetchFileList();
    };
  };

  const fetchFileList = async () => {
    try {
      const response = await axios.get('http://localhost:8000/files/');
      dispatch({
        type: FileActionType.SET_LIST,
        payload: {
          fileList: response.data
        }
      });
    } catch (e) {
      console.error('Failed to refresh file list:', e);
    };
  }

  return {
    fetchFileList,
    handleChange,
    handleUpload,
    validate,
  }
};

export default useFileUploader;
