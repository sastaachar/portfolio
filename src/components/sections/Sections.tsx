import { FC, MouseEventHandler, RefObject, useRef, useState } from "react";
import ProjectSection from "./ProjectSection";
import WriteAnimationText from "../writeAnimationText/WriteAnimationText";
import Navbar, { HandleScrollTo } from "../navbar/Navbar";

import styles from "./sections.module.scss";
import { jobData } from "./data";

type DivRef = RefObject<HTMLDivElement>;

const Sections = () => {
  const ref = useRef<HTMLDivElement>(null);

  const [section, setSection] = useState<Section>("intro");

  const aboutRef = useRef<HTMLDivElement>(null);
  const projectRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);

  const handleScrollTo = (s: Section) => {
    if (s === section) {
      scrollTo(introRef);
      return;
    }
    switch (s) {
      case "about":
        scrollTo(aboutRef);
        return;
      case "projects":
        scrollTo(projectRef);
        return;
      case "contact":
        scrollTo(contactRef);
        return;
    }
  };

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
      <Navbar section={section} handleScrollTo={handleScrollTo} />
      {/* other sections */}
      <div
        className={styles["sections-wrapper"]}
        onScroll={() => setSection(getScrolledSection())}
        ref={ref}
      >
        <div className={styles.sections}>
          <IntroSection sectionRef={introRef} />
          <ProjectSection sectionRef={projectRef} />
          <AboutSection sectionRef={aboutRef} handleScrollTo={handleScrollTo} />
          <ContactSection sectionRef={contactRef} />
        </div>
      </div>
    </>
  );
};

export const scrollTo = (ref: RefObject<HTMLDivElement>) => {
  ref.current?.scrollIntoView({ behavior: "smooth" });
};
const IntroSection: SectionFC = ({ sectionRef }) => {
  const dynamicTextList = [
    "Hello World !",
    "你好，世界",
    "नमस्ते दुनिया",
    "¿Qué tal?",
  ];
  return (
    <div className={styles.intro} ref={sectionRef}>
      <div className={styles.introLeft}>
        <div className={styles.introLeftWrapper}>
          <div className={styles.helloWorld}>
            <WriteAnimationText values={dynamicTextList} />
          </div>
          <div className={styles.introBio}>
            My name is Justin Mathew i am a Software developer based out of
            <span className={styles.india}> India</span>
          </div>
        </div>
      </div>
    </div>
  );
};
const AboutSection: SectionFC<{ handleScrollTo: HandleScrollTo }> = ({
  sectionRef,
  handleScrollTo,
}) => {
  const getFormattedDate = ({
    month,
    year,
  }: {
    month: string;
    year: number;
  }) => {
    return `${month} ${year % 2000}`;
  };

  return (
    <div className={styles.about} ref={sectionRef}>
      <div className={styles.aboutHeading}>
        <span>Experience</span>
      </div>
      <div className={styles.job}>
        {jobData.map((item) => (
          <div className={styles.jobItem} key={item.company}>
            <div className={styles.companyTitle}>
              <span className={styles.jobCompany}>{item.company}</span>
              <span className={styles.jobTitle}>{item.title}</span>
            </div>
            <div className={styles.jobDates}>
              <span>{getFormattedDate(item.startDate)}</span>
              <span>-</span>
              <span>
                {item.endDate ? getFormattedDate(item.endDate) : "Present"}
              </span>
            </div>
            <div className={styles.desc}>{item.desc}</div>
          </div>
        ))}
      </div>

      <div className={styles.currentStatus}>
        <p>
          I am currently looking for new opportunities , feel free to{" "}
          <span
            className={styles.connect}
            onClick={() => handleScrollTo("contact")}
          >
            connect
          </span>{" "}
          with me.
        </p>
        <p>location : india / remote</p>
      </div>
    </div>
  );
};
const ContactSection: SectionFC = ({ sectionRef }) => {
  const [showPopUp, setShowPopUp] = useState(false);

  const mailId = "justinjohnmathew100@gmail.com";

  const handleMailClick = async () => {
    try {
      await navigator.clipboard.writeText(mailId);
      setShowPopUp(true);
      setTimeout(() => setShowPopUp(false), 1000);
    } catch (err) {
      alert(mailId);
      console.log(err);
    }
  };
  return (
    <div className={styles.contact} ref={sectionRef}>
      {showPopUp && <div className={styles.popup}>copied !</div>}
      <div className={styles.contactContainer}>
        <a
          href="mailto:justinjohnmathew100@gmail.com"
          onClick={handleMailClick}
        >
          {showPopUp ? "justinjohnmathew100@gmail.com" : "mail"}
        </a>
        <a href="https://github.com/sastaachar">github</a>
        <a href="https://www.linkedin.com/in/justinjmathew/">linkedin</a>
        <a href="https://drive.google.com/drive/folders/1MQpPUZATqD-lMLN4gi7e8t0Ilgp8jgi0">
          resume
        </a>
      </div>
    </div>
  );
};

type SectionProps = {
  sectionRef: DivRef;
};
export type SectionFC<T = {}> = FC<SectionProps & T>;
export type Section = "projects" | "about" | "contact" | "intro";
export default Sections;
