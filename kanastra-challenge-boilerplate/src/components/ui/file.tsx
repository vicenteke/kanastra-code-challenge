import { createContext, useContext, useReducer } from "react";
import {
  FileAction,
  FileActionType,
  FileContextState,
  FileContextType,
  FileProviderProps,
} from "../../types";



export const FileContextInitialValues: Partial<FileContextState> = {
  file: null,
  isLoading: false,
};

const FileContext = createContext({} as FileContextType);

const FileReducer = (
  state: FileContextState,
  action: FileAction,
): FileContextState => {
  switch (action.type) {
    case FileActionType.SET_FILE:
      // select file to be uploaded
      return {
        ...state,
        file: action.payload?.file || null,
        error: undefined,
      }
    case FileActionType.ERROR:
      // set error
      return {
        ...state,
        error: action.payload?.error
      }
    case FileActionType.SET_LIST:
      // update fileList
      return {
        ...state,
        fileList: action.payload?.fileList!
      }
    case FileActionType.SET_LOADING:
      // update fileList
      return {
        ...state,
        isLoading: !!action.payload?.isLoading
      }
    case FileActionType.RESET:
      // update fileList
      return {
        ...state,
        isLoading: false,
        file: null,
        error: undefined,
      }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const FileProvider = ({ children }: FileProviderProps) => {
  const [state, dispatch] = useReducer(
    FileReducer,
    FileContextInitialValues as FileContextState,
  );

  return (
    <FileContext.Provider value={{ state, dispatch }}>
      {children}
    </FileContext.Provider>
  );
};

const useFileContext = () => {
  const context = useContext(FileContext);

  if (context === undefined)
    throw new Error("useFileContext must be used within a FileProvider");

  return context;
};

export {
  FileProvider,
  useFileContext,
}
