export interface ContactType {
  id: number;
  documentId: string;
  fullName: string;
  email: string;
  message: string;
  createdAt: string;
}

export interface contactTableType {
  id: string;
  documentId: string;
  fullName: string;
  email: string;
  message: string;
}
