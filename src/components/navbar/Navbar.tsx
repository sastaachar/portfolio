import { capitalizeFirstLetter, joined } from "@/utils/commonUtils";
import { FC, RefObject, useEffect, useRef, useState } from "react";
import { Section } from "../sections/Sections";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";

const Navbar: FC<NavbarProps> = (props) => {
  const [width, setWidth] = useState(0);
  const breakpoint = 600;

  useEffect(() => {
    setWidth(window.innerWidth);
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);

    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  // interaction

  return width > breakpoint ? (
    <DesktopNavbar
      section={props.section}
      handleScrollTo={props.handleScrollTo}
    />
  ) : (
    <MobileNavbar
      section={props.section}
      handleScrollTo={props.handleScrollTo}
    />
  );
};

type NavbarProps = {
  handleScrollTo: HandleScrollTo;
  section: Section;
};

export const getTitle = (section: Section) =>
  section === "intro" ? "Justin Mathew" : capitalizeFirstLetter(section);
export type HandleScrollTo = (s: Section) => void;

export default Navbar;
