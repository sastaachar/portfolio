import { Section } from "@/context/AppContexts";
import { RefObject } from "react";

import styles from "./navbar.module.scss";

const space = " ";

const Navbar = ({
  introRef,
  projectRef,
  aboutRef,
  contactRef,
  section,
}: NavbarProps) => {
  // styles
  const navbarLinkStyle = styles["navbar-link"];
  const getSectionStyle = (s: Section) =>
    [navbarLinkStyle, section === s && styles["navbar-link-highlight"]].join(
      space
    );

  // interaction
  const handleScrollTo = (ref: RefObject<HTMLDivElement>, s: Section) => {
    return () => {
      if (s === section) {
        introRef.current?.scrollIntoView({ behavior: "smooth" });
        return;
      }
      ref.current?.scrollIntoView({ behavior: "smooth" });
    };
  };

  return (
    <div className={styles["navbar"]}>
      <div className={styles["navbar-left"]}>
        <div className={navbarLinkStyle}>
          <span>Justin Mathew</span>
        </div>
      </div>
      <div className={styles["navbar-right"]}>
        <div
          className={getSectionStyle("project")}
          onClick={handleScrollTo(projectRef, "project")}
        >
          <span>Projects</span>
        </div>
        <div
          className={getSectionStyle("about")}
          onClick={handleScrollTo(aboutRef, "about")}
        >
          <span>About</span>
        </div>
        <div
          className={getSectionStyle("contact")}
          onClick={handleScrollTo(contactRef, "contact")}
        >
          <span>Contact</span>
        </div>
      </div>
    </div>
  );
};

type NavbarProps = {
  introRef: RefObject<HTMLDivElement>;
  projectRef: RefObject<HTMLDivElement>;
  aboutRef: RefObject<HTMLDivElement>;
  contactRef: RefObject<HTMLDivElement>;
  section: string;
};

export default Navbar;
