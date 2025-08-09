export interface Education {
  id: number;
  field: string;
  institution: string;
  location: string;
  period: string;
  description: string;
  achievements?: string[];
}

export interface Certification {
  id: number;
  title: string;
  issuer: string;
  date: string;
  credential_id?: string;
  description: string;
}
