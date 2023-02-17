import { joined } from "@/utils/commonUtils";
import { FC } from "react";
import { Section } from "../sections/Sections";
import { getTitle, HandleScrollTo } from "./Navbar";
import styles from "./navbar.module.scss";

const DesktopNavbar: FC<{
  section: Section;
  handleScrollTo: HandleScrollTo;
}> = (props) => {
  // styles
  const getSectionStyle = (s: Section) =>
    joined(
      props.section === s ? styles.navLinkHighlight : styles.navLink,
      styles.expandedText
    );

  const NavItem = (section: Section) => {
    return (
      <div
        className={getSectionStyle(section)}
        onClick={() => props.handleScrollTo(section)}
      >
        <span>{getTitle(section)}</span>
      </div>
    );
  };
  return (
    <>
      <div className={styles.navbar}>
        <div className={styles.navbarLeft}>
          <div
            className={styles.navLink}
            onClick={() => props.handleScrollTo("intro")}
          >
            <span>Justin Mathew</span>
          </div>
        </div>
        <div className={styles.navbarRight}>
          {NavItem("projects")}
          {NavItem("about")}
          {NavItem("contact")}
        </div>
      </div>
    </>
  );
};

export default DesktopNavbar;
