export interface Link {
  label: string;
  url: string;
}

export interface DateRange {
  from: string; // e.g. "2020-06" (YYYY-MM) or "2020" for year only
  to?: string; // optional end date, same format as from
}

export interface Activity {
  title: string;
  organisation?: string;
  dateRange: DateRange;
}

export interface WorkExperience {
  company: string;
  location?: string;
  dateRange: DateRange;
  title: string;
  description: string[]; // bullet points
}

export interface Education {
  institute: string;
  dateRange: DateRange; // year only, so "from" and "to" can be "2020"
  course: string;
  description?: string;
}

export interface Project {
  type: string; // e.g., "Personal", "Work", "Open Source"
  dateRange: DateRange;
  title: string;
  description: string[]; // bullet points
}

export interface ResumeData {
  fullName: string;
  location?: {
    city?: string;
    country?: string;
  };
  email: string;
  currentRole: string;
  links?: Link[];
  skills?: string[];
  activities?: Activity[];
  workExperience?: WorkExperience[];
  education?: Education[];
  projects?: Project[];
}
