export type ProjectData = {
  projects: Project[];
};
type Project = {
  id: number;
  projectLink: string;
  githubLink: string;
  content: string;
};
