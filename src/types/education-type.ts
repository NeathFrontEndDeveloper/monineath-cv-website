export interface Education {
  id: number;
  degree: string;
  field: string;
  institution: string;
  location: string;
  period: string;
  gpa?: string;
  description: string;
  achievements?: string[];
  relevant_courses?: string[];
}

export interface Certification {
  id: number;
  title: string;
  issuer: string;
  date: string;
  credential_id?: string;
  description: string;
}
