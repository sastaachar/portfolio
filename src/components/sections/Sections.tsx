import { DivRef } from "@/constants";
import { Dispatch, FC, SetStateAction, useRef, useState } from "react";
import ProjectSection from "./ProjectSection";
import WriteAnimationText from "../WriteAnimationText";

import styles from "./sections.module.scss";
import Navbar from "../navbar/Navbar";

const Sections = () => {
  const ref = useRef<HTMLDivElement>(null);

  const [section, setSection] = useState<Section>("intro");

  const aboutRef = useRef<HTMLDivElement>(null);
  const projectRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);

  const getScrolledSection = (): Section => {
    if (
      !projectRef.current ||
      !ref.current ||
      !aboutRef.current ||
      !contactRef.current ||
      !introRef.current
    )
      return "intro";

    const curScrollHeight = ref.current.scrollTop;

    // offset for the empty space at the end of intro section
    const offset = 150;

    const projectHeight = introRef.current.clientHeight - offset;
    const aboutHeight = projectHeight + projectRef.current.clientHeight;
    const contactHeight = aboutHeight + aboutRef.current.clientHeight;

    if (curScrollHeight <= projectHeight) return "intro";
    else if (curScrollHeight <= aboutHeight) return "projects";
    else if (curScrollHeight <= contactHeight) return "about";
    return "contact";
  };

  return (
    <>
      {/* navbar section */}
      <Navbar
        introRef={introRef}
        projectRef={projectRef}
        aboutRef={aboutRef}
        contactRef={contactRef}
        section={section}
      />
      {/* other sections */}
      <div
        className={styles["sections-wrapper"]}
        onScroll={() => setSection(getScrolledSection())}
        ref={ref}
      >
        <div className={styles.sections}>
          <IntroSection sectionRef={introRef} />
          <ProjectSection sectionRef={projectRef} />
          <AboutSection sectionRef={aboutRef} />
          <ContactSection sectionRef={contactRef} />
        </div>
      </div>
    </>
  );
};

const ContactSection: SectionFC = ({ sectionRef }) => {
  return (
    <div className={styles.contact} ref={sectionRef}>
      <div className="mail">
        <span>Mail</span>
        <span>justinjohnmathew100@gmail.com</span>
      </div>
    </div>
  );
};

type SectionProps = {
  sectionRef: DivRef;
};
export type SectionFC<T = {}> = FC<SectionProps & T>;

const IntroSection: SectionFC = ({ sectionRef }) => {
  const dynamicTextList = ["Hello World ! ", "Hola amigo ! ", "12321 "];
  return (
    <div className={styles.intro} ref={sectionRef}>
      <div className={styles.introLeft}>
        <div className={styles.introLeftWrapper}>
          <div className={styles.helloWorld}>
            <WriteAnimationText values={dynamicTextList} />
          </div>
          <div className={styles.introBio}>
            My name is Justin Mathew i am a Software developer based out of
            India
          </div>
        </div>
      </div>
    </div>
  );
};

type JobData = {
  company: string;
  title: string;
  desc: string;
  startDate: { month: string; year: number };
  present: boolean;
  endDate?: { month: string; year: number };
};

const data: JobData[] = [
  {
    company: "Amazon",
    title: "SDE",
    desc: "Developed Micro services for modeling and transformation of big data using spark and scala.",
    startDate: { month: "Oct", year: 2022 },
    present: true,
  },
  {
    company: "Tata Consultancy Services",
    title: "Systems Engineer",
    desc: "Developed custom tools using CSOM in C# for sharepoint migration and custom Powerapps for clients.",
    startDate: { month: "Sep", year: 2022 },
    present: false,
    endDate: { month: "May", year: 2021 },
  },
  {
    company: "Karunya University",
    title: "Student",
    desc: "Survived on cup noodles while learning a bit about computer science engineering.",
    startDate: { month: "Sep", year: 2022 },
    present: false,
    endDate: { month: "May", year: 2021 },
  },
];

const AboutSection: SectionFC = ({ sectionRef }) => {
  return (
    <div className={styles.about} ref={sectionRef}>
      <div className={styles.aboutHeading}>
        <span>Experience</span>
      </div>

      <div className={styles.job}>
        {data.map((item) => (
          <div className={styles.jobItem} key={item.company}>
            <span className={styles.company}>{item.company}</span>
            <span className={styles.title}>{item.title}</span>
            <span className={styles.desc}>{item.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export type Section = "projects" | "about" | "contact" | "intro";
export default Sections;
