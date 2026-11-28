import { Check, Ear, MapPin, Menu, Phone, X } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import { seoFor } from '../seo/pages';

// "Kulağınıza Özel Kalıp": the clinic's main difference from other centres (a mould made from an impression of the
// patient's ear instead of a ready-made, numbered dome). Texts live in locales/*.json under earMouldPage; the FAQ's
// structured data is built from the Turkish texts in seo/pages.js. No device brand or model names (medical device
// advertising rules).
export default function KulakKalibi() {
  const { t } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const list = (key) => t(`earMouldPage.${key}`, { returnObjects: true });

  const navLinks = [
    { to: "/", label: t("navigation.home"), active: false },
    { to: "/randevu", label: t("navigation.appointment"), active: false },
    { to: "/terapi-programi", label: t("navigation.rehabilitation"), active: false },
    { to: "/urun-katalogu", label: t("navigation.productCatalog"), active: false },
    { to: "/kulak-kalibi", label: t("navigation.earMould"), active: true },
    { to: "/odeme-planlari", label: t("navigation.sgk"), active: false },
    { to: "/audio-servis", label: t("navigation.phoneApp"), active: false },
    { to: "/hakkimizda", label: t("navigation.about"), active: false },
    { to: "/isitme-testi", label: t("navigation.hearingTest"), active: false },
    { to: "/online-test", label: t("navigation.freeHearingTest"), active: false },
  ];

  return (
    <>
      <SEO {...seoFor("/kulak-kalibi")} />
      <div className="min-h-screen bg-white relative">
        {/* Menü Açma Butonu */}
        <button
          onClick={() => setSidebarOpen(true)}
          aria-label={t("navigation.menu")}
          className={`fixed top-6 left-6 z-50 bg-blue-900 hover:bg-blue-800 text-white p-3 rounded-lg shadow-lg focus:outline-none transition-opacity duration-300 ${
            sidebarOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Sidebar Navigasyon */}
        <aside
          className={`fixed top-0 left-0 h-full w-64 max-w-[70vw] z-40 transform transition-transform duration-300 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          style={{
            background: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            boxShadow: "0 10px 30px rgba(2,6,23,0.12)",
            borderRight: "1px solid rgba(0,0,0,0.06)",
          }}
        >
          <div className="flex items-center justify-between p-5 border-b border-gray-200">
            <h3 className="text-lg font-bold text-blue-900">{t("navigation.menu")}</h3>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-1 text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex justify-center py-6">
            <img
              src="/images/selaleLogo.jpeg"
              alt="Şelale İşitme Merkezi Logosu"
              className="w-32 h-auto rounded-lg shadow-sm"
            />
          </div>

          <nav className="p-5 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.to}
                href={link.to}
                onClick={() => setSidebarOpen(false)}
                className={`block font-medium ${link.active ? 'text-blue-900 font-semibold' : 'text-gray-800 hover:text-blue-900'}`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div style={{ marginTop: "auto" }} className="p-5 border-t border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <Phone className="w-5 h-5 text-blue-900" />
              <span className="text-gray-800 font-medium">{t("navigation.phone")}</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-blue-900" />
              <span className="text-gray-800 font-medium">{t("navigation.address")}</span>
            </div>
          </div>
        </aside>

        <main className="max-w-5xl mx-auto my-16 px-6 bg-white rounded-xl shadow-md text-gray-800 p-8 md:p-12">
          <p className="text-sm font-semibold tracking-widest uppercase text-blue-700 mb-3">{t("earMouldPage.eyebrow")}</p>
          <h1 className="text-3xl md:text-4xl font-extrabold text-blue-900 border-l-4 border-blue-900 pl-4 mb-8">
            {t("earMouldPage.title")}
          </h1>
          <p className="text-lg leading-relaxed text-gray-700 mb-12">{t("earMouldPage.intro")}</p>

          <section className="mb-12" aria-labelledby="kalip-nedir">
            <h2 id="kalip-nedir" className="text-2xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <Ear className="w-6 h-6" aria-hidden="true" />
              {t("earMouldPage.whatTitle")}
            </h2>
            <p className="text-lg leading-relaxed text-gray-700">{t("earMouldPage.whatText")}</p>
          </section>

          <section className="mb-12" aria-labelledby="kalip-fark">
            <h2 id="kalip-fark" className="text-2xl font-bold text-blue-900 mb-6">{t("earMouldPage.compareTitle")}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">{t("earMouldPage.readyTitle")}</h3>
                <ul className="space-y-3">
                  {list("readyPoints").map((point) => (
                    <li key={point} className="text-gray-700 leading-relaxed">{point}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border-2 border-blue-900 bg-blue-50 p-6">
                <h3 className="text-xl font-bold text-blue-900 mb-4">{t("earMouldPage.customTitle")}</h3>
                <ul className="space-y-3">
                  {list("customPoints").map((point) => (
                    <li key={point} className="flex gap-3 text-gray-800 leading-relaxed">
                      <Check className="w-5 h-5 mt-1 flex-none text-blue-900" aria-hidden="true" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12" aria-labelledby="kalip-surec">
            <h2 id="kalip-surec" className="text-2xl font-bold text-blue-900 mb-6">{t("earMouldPage.stepsTitle")}</h2>
            <ol className="space-y-5">
              {list("steps").map((step, index) => (
                <li key={step.title} className="flex gap-4">
                  <span className="flex-none w-9 h-9 rounded-full bg-blue-900 text-white font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{step.title}</h3>
                    <p className="text-gray-700 leading-relaxed">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="mb-12" aria-labelledby="kalip-cihaz">
            <h2 id="kalip-cihaz" className="text-2xl font-bold text-blue-900 mb-4">{t("earMouldPage.devicesTitle")}</h2>
            <p className="text-lg leading-relaxed text-gray-700">{t("earMouldPage.devicesText")}</p>
          </section>

          <section className="mb-12" aria-labelledby="kalip-bakim">
            <h2 id="kalip-bakim" className="text-2xl font-bold text-blue-900 mb-4">{t("earMouldPage.careTitle")}</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 leading-relaxed">
              {list("carePoints").map((point) => <li key={point}>{point}</li>)}
            </ul>
          </section>

          <section className="mb-12" aria-labelledby="kalip-sss">
            <h2 id="kalip-sss" className="text-2xl font-bold text-blue-900 mb-4">{t("earMouldPage.faqTitle")}</h2>
            <div className="space-y-3">
              {list("faq").map((item) => (
                <details key={item.q} className="rounded-lg border border-gray-200 p-4">
                  <summary className="cursor-pointer font-semibold text-gray-900">{item.q}</summary>
                  <p className="mt-3 text-gray-700 leading-relaxed">{item.a}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="rounded-xl bg-blue-900 text-white p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">{t("earMouldPage.ctaTitle")}</h2>
            <p className="text-blue-100 mb-6">{t("earMouldPage.ctaText")}</p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href="/randevu" className="px-6 py-3 rounded-lg bg-white text-blue-900 font-semibold">
                {t("earMouldPage.ctaButton")}
              </a>
              <a href="tel:+905322752414" className="px-6 py-3 rounded-lg border border-white font-semibold">
                {t("earMouldPage.ctaPhone")}
              </a>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
