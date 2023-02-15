export type Project = {
  id: number;
  projectLink: string;
  githubLink: string;
  content: string;
};

export type Job = {
  company: string;
  title: string;
  desc: string;
  startDate: { month: string; year: number };
  present: boolean;
  endDate?: { month: string; year: number };
};
