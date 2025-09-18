import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../stores/slices/themeSlice";

const Theme = () => {
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

  //change the whole body background when user click theme buton
  useEffect(() => {
    // Clear any existing theme classes first
    document.body.classList.remove("text-black", "text-white");
    
    if (theme === "dark") {
      // Dark mode: dark background with light text
      document.body.style.backgroundColor = "#1a202c"; // bg-gray-900 equivalent
      document.body.classList.add("text-white");
    } else {
      // Light mode: light background with dark text
      document.body.style.backgroundColor = "white";
      document.body.classList.add("text-black");
    }
  }, [theme]);

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className="bg-gray-200 p-2 rounded-md"
    >
      {theme === "light" ? "Dark Mode" : "Light Mode"}
    </button>
  );
};

// change background color of the whole page

export default Theme;
