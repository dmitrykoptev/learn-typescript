import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { setTheme, Theme } from "./theme-slice";
import { themeSelector } from "./theme-selectors";

export const useTheme = (): [Theme, () => void] => {
  const dispatch = useDispatch();
  const theme = useSelector(themeSelector);

  const toggleTheme = () => {
    dispatch(setTheme(theme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return [theme, toggleTheme];
};
