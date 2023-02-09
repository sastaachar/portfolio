import { DivRef } from "@/constants";
import { Section } from "@/context/AppContexts";
import { Dispatch, FC, SetStateAction, useRef } from "react";
import ProjectSection from "./ProjectSection";
import WriteAnimationText from "../WriteAnimationText";

import styles from "./sections.module.scss";

type SectionsProps = {
  introRef: DivRef;
  aboutRef: DivRef;
  projectRef: DivRef;
  contactRef: DivRef;
  setSection: Dispatch<SetStateAction<Section>>;
};

const getScrolledSection = (scroll: number): Section => {
  if (scroll <= 0.2) {
    return "intro";
  } else if (scroll <= 0.45) {
    return "project";
  } else if (scroll <= 0.7) {
    return "about";
  }
  return "contact";
};
const Sections = ({
  introRef,
  projectRef,
  contactRef,
  aboutRef,
  setSection,
}: SectionsProps) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      className={styles["sections-wrapper"]}
      onScroll={() => {
        if (!ref.current || !setSection) return;
        const scroll = ref.current.scrollTop / ref.current.scrollHeight;
        setSection(getScrolledSection(scroll));
      }}
      ref={ref}
    >
      <div className={styles["sections"]}>
        <IntroSection sectionRef={introRef} />
        <ProjectSection sectionRef={projectRef} />
        <AboutSection sectionRef={aboutRef} />
        <div className={styles["contact"]} ref={contactRef}>
          contact
        </div>
      </div>
    </div>
  );
};

type SectionProps = {
  sectionRef: DivRef;
};
export type SectionFC<T = {}> = FC<SectionProps & T>;

const AboutSection: SectionFC = ({ sectionRef }) => {
  return (
    <div className="about" ref={sectionRef}>
      <span>Experience</span>
      <div className="job">
        <div className="job-item">
          <span className="company">Amazon</span>
          <span className="title">SDE</span>
          <span className="desc">awdawdd</span>
        </div>
      </div>
    </div>
  );
};

const IntroSection: SectionFC = ({ sectionRef }) => {
  const dynamicTextList = ["Hello World ! ", "Hola amigo ! ", "12321 "];
  return (
    <div className={styles["intro"]} ref={sectionRef}>
      <div className={styles["intro-left"]}>
        <div className={styles["intro-left-wrapper"]}>
          <div className={styles["hello-world"]}>
            <WriteAnimationText values={dynamicTextList} />
          </div>
          <div className={styles["intro-bio"]}>
            My name is Justin Mathew i am a Software developer based out of
            India
          </div>
        </div>
      </div>
      <div className={styles["intro-right"]} />
    </div>
  );
};
export default Sections;
