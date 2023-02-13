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

  const handleScrollTo = (s: Section) => {
    if (s === props.section) {
      scrollTo(props.introRef);
      return;
    }
    switch (s) {
      case "about":
        scrollTo(props.aboutRef);
        return;
      case "projects":
        scrollTo(props.projectRef);
        return;
      case "contact":
        scrollTo(props.contactRef);
        return;
    }
  };

  return width > breakpoint ? (
    <DesktopNavbar section={props.section} handleScrollTo={handleScrollTo} />
  ) : (
    <MobileNavbar section={props.section} handleScrollTo={handleScrollTo} />
  );
};

type NavbarProps = {
  introRef: RefObject<HTMLDivElement>;
  projectRef: RefObject<HTMLDivElement>;
  aboutRef: RefObject<HTMLDivElement>;
  contactRef: RefObject<HTMLDivElement>;
  section: Section;
};

export const scrollTo = (ref: RefObject<HTMLDivElement>) => {
  ref.current?.scrollIntoView({ behavior: "smooth" });
};
export const getTitle = (section: Section) =>
  section === "intro" ? "Justin Mathew" : capitalizeFirstLetter(section);
export type HandleScrollTo = (s: Section) => void;

export default Navbar;
