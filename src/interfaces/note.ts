export interface INote {
  id?: string;
  title: string;
  content: string;
  createdBy?: string | object;
  reference?: string | object;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IGetNotesResponse {
  notes: INote[];
}

export interface ICreateNoteResponse {
  note: INote;
}

export interface IUpdateNoteResponse {
  note: INote;
}

export interface IDeleteNoteResponse {}
