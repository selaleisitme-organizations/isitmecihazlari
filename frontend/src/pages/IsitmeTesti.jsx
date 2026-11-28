import { Check, Headphones, MapPin, Menu, Phone, X } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import { seoFor } from '../seo/pages';

// "Merkezimizde İşitme Testi": what the in-clinic test involves and when to have one. Texts in locales/*.json under
// hearingTestPage; the FAQ's structured data comes from seo/pages.js. Price wording (owner, 2026-11-28): detailed
// tests are paid; the page does not say whether the basic test is free.
export default function IsitmeTesti() {
  const { t } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const list = (key) => t(`hearingTestPage.${key}`, { returnObjects: true });

  const navLinks = [
    { to: "/", label: t("navigation.home"), active: false },
    { to: "/randevu", label: t("navigation.appointment"), active: false },
    { to: "/terapi-programi", label: t("navigation.rehabilitation"), active: false },
    { to: "/urun-katalogu", label: t("navigation.productCatalog"), active: false },
    { to: "/kulak-kalibi", label: t("navigation.earMould"), active: false },
    { to: "/odeme-planlari", label: t("navigation.sgk"), active: false },
    { to: "/audio-servis", label: t("navigation.phoneApp"), active: false },
    { to: "/hakkimizda", label: t("navigation.about"), active: false },
    { to: "/isitme-testi", label: t("navigation.hearingTest"), active: true },
    { to: "/online-test", label: t("navigation.freeHearingTest"), active: false },
  ];

  return (
    <>
      <SEO {...seoFor("/isitme-testi")} />
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
          <p className="text-sm font-semibold tracking-widest uppercase text-blue-700 mb-3">{t("hearingTestPage.eyebrow")}</p>
          <h1 className="text-3xl md:text-4xl font-extrabold text-blue-900 border-l-4 border-blue-900 pl-4 mb-8">
            {t("hearingTestPage.title")}
          </h1>
          <p className="text-lg leading-relaxed text-gray-700 mb-12">{t("hearingTestPage.intro")}</p>

          <section className="mb-12" aria-labelledby="test-ne-zaman">
            <h2 id="test-ne-zaman" className="text-2xl font-bold text-blue-900 mb-4">{t("hearingTestPage.signsTitle")}</h2>
            <ul className="space-y-3">
              {list("signs").map((sign) => (
                <li key={sign} className="flex gap-3 text-gray-800 leading-relaxed">
                  <Check className="w-5 h-5 mt-1 flex-none text-blue-900" aria-hidden="true" />
                  <span>{sign}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-12" aria-labelledby="test-nasil">
            <h2 id="test-nasil" className="text-2xl font-bold text-blue-900 mb-6 flex items-center gap-2">
              <Headphones className="w-6 h-6" aria-hidden="true" />
              {t("hearingTestPage.stepsTitle")}
            </h2>
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

          <section className="mb-12" aria-labelledby="test-odyogram">
            <h2 id="test-odyogram" className="text-2xl font-bold text-blue-900 mb-4">{t("hearingTestPage.resultTitle")}</h2>
            <p className="text-lg leading-relaxed text-gray-700">{t("hearingTestPage.resultText")}</p>
          </section>

          <section className="mb-12" aria-labelledby="test-gelirken">
            <h2 id="test-gelirken" className="text-2xl font-bold text-blue-900 mb-4">{t("hearingTestPage.bringTitle")}</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 leading-relaxed">
              {list("bring").map((item) => <li key={item}>{item}</li>)}
            </ul>
            <p className="mt-6 rounded-lg border-l-4 border-blue-900 bg-blue-50 p-4 text-gray-800">{t("hearingTestPage.priceNote")}</p>
          </section>

          <section className="mb-12 rounded-xl border border-gray-200 bg-gray-50 p-6" aria-labelledby="test-online">
            <h2 id="test-online" className="text-xl font-bold text-blue-900 mb-2">{t("hearingTestPage.onlineTitle")}</h2>
            <p className="text-gray-700 mb-4">{t("hearingTestPage.onlineText")}</p>
            <a href="/online-test" className="inline-block px-5 py-3 rounded-lg border border-blue-900 text-blue-900 font-semibold">
              {t("hearingTestPage.onlineButton")}
            </a>
          </section>

          <section className="mb-12" aria-labelledby="test-sss">
            <h2 id="test-sss" className="text-2xl font-bold text-blue-900 mb-4">{t("hearingTestPage.faqTitle")}</h2>
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
            <h2 className="text-2xl font-bold mb-3">{t("hearingTestPage.ctaTitle")}</h2>
            <p className="text-blue-100 mb-6">{t("hearingTestPage.ctaText")}</p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href="/randevu" className="px-6 py-3 rounded-lg bg-white text-blue-900 font-semibold">
                {t("hearingTestPage.ctaButton")}
              </a>
              <a href="tel:+905322752414" className="px-6 py-3 rounded-lg border border-white font-semibold">
                {t("hearingTestPage.ctaPhone")}
              </a>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
