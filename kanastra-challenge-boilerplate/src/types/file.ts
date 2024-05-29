import { ReactNode } from "react";

enum FileActionType {
  SET_FILE,
  ERROR,
  SET_LIST,
  SET_LOADING,
  RESET,
}

type ReducerAction<T, P> = {
  type: T;
  payload?: Partial<P>;
};


type FileContextState = {
  isLoading: boolean;
  file: File | null;
  fileList: Array<{
    filename: string;
    size: number;
    original_filename: string;
    uploaded_at: number;
  }>;
  error?: string;
};

type FileAction = ReducerAction<
  FileActionType,
  Partial<FileContextState>
>;

type FileDispatch = ({ type, payload }: FileAction) => void;

type FileContextType = {
  state: FileContextState;
  dispatch: FileDispatch;
};

type FileProviderProps = { children: ReactNode };

export type {
  FileContextState,
  FileAction,
  FileDispatch,
  FileContextType,
  FileProviderProps,
}

export {
  FileActionType,
}
