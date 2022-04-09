import React from "react";

const themeContext = React.createContext();

export default themeContext;
export const ThemeProvider = themeContext.Provider;
