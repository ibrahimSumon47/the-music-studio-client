import React, { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { themeChange } from "theme-change";

const BtnLightDark = () => {
  const [isLight, setIsLight] = useState(true);

  useEffect(() => {
    themeChange(isLight ? "light" : "business");
  }, [isLight]);

  const handleToggleTheme = () => {
    setIsLight((prevState) => !prevState);
  };

  return (
    <div>
      {isLight ? (
        <FaSun data-set-theme="light" className="text-white w-10 h-8" onClick={handleToggleTheme} />
      ) : (
        <FaMoon data-set-theme="business" className="text-dark w-10 h-8" onClick={handleToggleTheme} />
      )}
    </div>
  );
};

export default BtnLightDark;
