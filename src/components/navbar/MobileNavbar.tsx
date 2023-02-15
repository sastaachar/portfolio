import { joined } from "@/utils/commonUtils";
import { FC, useRef, useState } from "react";
import { Section } from "../sections/Sections";
import { getTitle, HandleScrollTo } from "./Navbar";

import styles from "./navbar.module.scss";

const MobileNavbar: FC<{
  section: Section;
  handleScrollTo: HandleScrollTo;
}> = (props) => {
  const [menuOpened, setMenuOpened] = useState(false);

  const { handleScrollTo } = props;

  // to update styles
  const aboutSpanRef = useRef<HTMLSpanElement>(null);
  const projectSpanRef = useRef<HTMLSpanElement>(null);
  const contactSpanRef = useRef<HTMLSpanElement>(null);

  const unMount = () => {
    if (
      !aboutSpanRef.current ||
      !projectSpanRef.current ||
      !contactSpanRef.current
    )
      return;

    const aboutSpan = aboutSpanRef.current;
    aboutSpan.classList.replace(styles.navAbout, styles.navItemUnmountAbout);

    const projectSpan = projectSpanRef.current;
    projectSpan.classList.replace(
      styles.navProject,
      styles.navItemUnmountProject
    );

    const contactSpan = contactSpanRef.current;
    contactSpan.classList.replace(
      styles.navContact,
      styles.navItemUnmountContact
    );

    setTimeout(() => {
      setMenuOpened(false);
    }, 200);
  };

  const getNavItemStyle = (s: Section) => {
    let navClass: string = "";
    switch (s) {
      case "about":
        navClass = styles.navAbout;
        break;
      case "projects":
        navClass = styles.navProject;
        break;
      case "contact":
        navClass = styles.navContact;
        break;
    }
    const highlightClass =
      s === props.section ? styles.navLinkHighlight : styles.navLink;
    return joined(navClass, highlightClass);
  };

  return (
    <div className={styles.navbarMobileWrapper}>
      <div className={styles.navbarMobile}>
        <div className={styles.navLink}> {getTitle(props.section)}</div>
        <div
          className={styles.hamburger}
          onClick={() => (menuOpened ? unMount() : setMenuOpened(true))}
        >
          <div />
          <div />
        </div>
      </div>
      {menuOpened && (
        <div className={styles.navbarMenu}>
          <span
            className={getNavItemStyle("projects")}
            onClick={() => handleScrollTo("projects")}
            ref={projectSpanRef}
          >
            {getTitle("projects")}
          </span>
          <span
            className={getNavItemStyle("about")}
            onClick={() => handleScrollTo("about")}
            ref={aboutSpanRef}
          >
            {getTitle("about")}
          </span>
          <span
            className={getNavItemStyle("contact")}
            ref={contactSpanRef}
            onClick={() => handleScrollTo("contact")}
          >
            {getTitle("contact")}
          </span>
        </div>
      )}
    </div>
  );
};

export default MobileNavbar;
