import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { NOT_FOUND } from "../seo/pages";

// Unknown addresses: told apart from real pages with noindex here and a real 404 status from Vercel
// (dist/404.html, written by scripts/prerender.mjs), so they never enter Google's index as copies of the home page.
export default function NotFound() {
  return (
    <>
      <SEO {...NOT_FOUND} noindex />
      <main className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 text-center bg-white">
        <h1 className="text-3xl font-bold text-blue-900">Sayfa bulunamadı</h1>
        <p className="text-gray-600 max-w-md">
          Aradığınız sayfa taşınmış ya da kaldırılmış olabilir. Anasayfadan devam edebilir ya da bizi arayabilirsiniz.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link to="/" className="px-5 py-3 rounded-lg bg-blue-900 text-white font-semibold">Anasayfa</Link>
          <a href="tel:+905322752414" className="px-5 py-3 rounded-lg border border-blue-900 text-blue-900 font-semibold">0532 275 24 14</a>
        </div>
      </main>
    </>
  );
}
