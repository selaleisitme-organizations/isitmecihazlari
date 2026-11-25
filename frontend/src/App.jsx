import { BrowserRouter } from "react-router-dom";

import AppRoutes from "./AppRoutes.jsx";
import KvkkPopup from "./components/KvkkPopup.jsx";
import LanguageSwitcher from "./components/LanguageSwitcher";
import SpecialDayPopup from "./components/SpecialDayPopup";

function App() {
  return (
    <>
      {/* KVKK popup (appears on all pages) */}
      <KvkkPopup />

      {/* Special‑day popup (shows once per session on configured dates) */}
      <SpecialDayPopup />

      {/* Floating language switcher (top‑right corner, all pages) */}
      <div style={{ position: "fixed", top: 16, right: 110, zIndex: 9999 }}>
        <LanguageSwitcher />
      </div>

      {/* Main Router */}
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;
