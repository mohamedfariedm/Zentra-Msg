import React, { useEffect } from 'react';
import './assets/scss/themes.scss'; // Always import LTR
import Route from './Routes';
import fakeBackend from "./helpers/AuthType/fakeBackend";

fakeBackend();

function App() {
  useEffect(() => {
    const lang = localStorage.getItem("I18N_LANGUAGE") || "en";
    const isRTL = lang === "ar";

    // Set HTML direction
    document.documentElement.setAttribute("dir", isRTL ? "rtl" : "ltr");

    // Load RTL stylesheet if needed
    const existingRtlLink = document.getElementById("rtl-style");

    if (isRTL) {
      if (!existingRtlLink) {
        const link = document.createElement("link");
        link.id = "rtl-style";
        link.rel = "stylesheet";
        link.href = `${process.env.PUBLIC_URL}/rtl.css`;
        document.head.appendChild(link);
      }
    } else {
      if (existingRtlLink) {
        existingRtlLink.remove();
      }
    }
  }, []);

  return <Route />;
}

export default App;
