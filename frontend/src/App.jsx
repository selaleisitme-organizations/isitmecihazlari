import { BrowserRouter } from "react-router-dom";

import AppRoutes from "./AppRoutes.jsx";
import KvkkPopup from "./components/KvkkPopup.jsx";

function App() {
  return (
    <>
      {/* KVKK popup (appears on all pages) */}
      <KvkkPopup />

      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;
