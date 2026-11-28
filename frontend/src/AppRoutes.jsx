import { Route, Routes } from "react-router-dom";

import Anasayfa from "./pages/Anasayfa";
import AudioServis from "./pages/AudioServisiUygulamasi";
import Hakkimizda from "./pages/Hakkimizda.jsx";
import KulakKalibi from "./pages/KulakKalibi.jsx";
import NotFound from "./pages/NotFound.jsx";
import OdemePlanlari from "./pages/OdemePlanlari";
import OnlineTest from "./pages/OnlineTest.jsx";
import RandevuSistemi from "./pages/RandevuSistemi";
import TerapiProgrami from "./pages/TerapiProgrami";
import UrunKatalogu from "./pages/UrunKatalogu";

// The routes without a router, so the browser (BrowserRouter in App.jsx) and the build-time prerender
// (StaticRouter in entry-server.jsx) render exactly the same pages.
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Anasayfa />} />
      <Route path="/randevu" element={<RandevuSistemi />} />
      <Route path="/urun-katalogu" element={<UrunKatalogu />} />
      <Route path="/kulak-kalibi" element={<KulakKalibi />} />
      <Route path="/terapi-programi" element={<TerapiProgrami />} />
      <Route path="/odeme-planlari" element={<OdemePlanlari />} />
      <Route path="/audio-servis" element={<AudioServis />} />
      <Route path="/hakkimizda" element={<Hakkimizda />} />
      <Route path="/online-test" element={<OnlineTest />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
