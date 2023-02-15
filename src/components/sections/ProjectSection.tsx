import { FC, useState } from "react";
import { SectionFC } from "./Sections";

import styles from "./sections.module.scss";
import { joined } from "@/utils/commonUtils";
import { projectData } from "./data";

const ProjectSection: SectionFC = ({ sectionRef }) => {
  // styles

  return (
    <div className={styles.projects} ref={sectionRef}>
      {projectData.map((item) => (
        <ProjectItem
          classId={item.id}
          content={item.content}
          githubLink={item.githubLink}
          projectLink={item.projectLink}
          key={item.id}
        />
      ))}
    </div>
  );
};

type ProjectItemProps = {
  classId: number;
  content: string;
  projectLink: string;
  githubLink: string;
};

const ProjectItem: FC<ProjectItemProps> = ({
  classId,
  content,
  projectLink,
  githubLink,
}) => {
  const [visible, setVisible] = useState(false);

  const getProjectItemClassName = (idx: number) =>
    joined(styles.projectItem, styles[`project-${idx}`]);

  const projectItemClass = joined(
    styles.projectItemDetails,
    visible ? styles.show : ""
  );

  return (
    <div
      className={getProjectItemClassName(classId)}
      onClick={() => setVisible(!visible)}
    >
      {visible && (
        <div className={projectItemClass}>
          <div className={styles.projectItemContent}>{content}</div>
          <div className={styles.projectItemLinks}>
            <a href={projectLink} onClick={(e) => e.stopPropagation()}>
              site
            </a>
            <a href={githubLink} onClick={(e) => e.stopPropagation()}>
              github
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectSection;
