import { ThemeContext } from "@/context/ThemeContext";
import React, { useContext } from "react";

export default function ReactContent() {
  const personalData = {
    role: "Software Developer",
    fullName: "Justin John Mathew",
    shortName: "Justin Mathew",
    profileLinks: [
      {
        type: "github",
        link: "https://github.com/sastaachar",
      },
      {
        type: "linkedin",
        link: "https://github.com/sastaachar",
      },
    ],
  };

  const [theme, setTheme] = useContext(ThemeContext);

  const handleThemeChange = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="react-wrapper" data-theme={theme}>
      <div className="navbar">
        <div className="navbar-left">
          <span>{personalData.fullName}</span>
        </div>
        <div className="navbar-right" onClick={handleThemeChange}>
          <div className="toggle">
            <div className="toggle-cover">
              <div className={`toggle-ball toggle-ball-${theme}`}> </div>
            </div>
          </div>
        </div>
      </div>

      <span>{personalData.role}</span>
    </div>
  );
}
