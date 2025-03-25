import React, { createContext, useState, useContext, useEffect } from "react";

const ThemeContext = createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
  const themesContext = import.meta.glob("../assets/themes/*.json", {
    eager: true,
  });

  const themes = Object.keys(themesContext).reduce((acc, themePath) => {
    const themeName = themePath
      .replace("../assets/themes/", "")
      .replace(".json", "");
    acc[themeName] = themesContext[themePath].default;
    return acc;
  }, {});

  const [themeName, setThemeName] = useState(Object.keys(themes)[0]);
  const [currentTheme, setCurrentTheme] = useState(themes[themeName]);

  const switchTheme = (name) => {
    setThemeName(name);
    setCurrentTheme(themes[name]);
  };

  useEffect(() => {
    localStorage.setItem("theme", themeName);
  }, [themeName]);

  return (
    <ThemeContext.Provider
      value={{ themes, themeName, currentTheme, switchTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
