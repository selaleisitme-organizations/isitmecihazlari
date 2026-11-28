import { Link } from 'react-router-dom';
import { X, Menu, Phone, MapPin } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import { seoFor } from '../seo/pages';

export default function AudioServis() {
  const { t } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const navLinks = [
    { to: "/", label: t("navigation.home"), active: false },
    { to: "/randevu", label: t("navigation.appointment"), active: false },
    { to: "/terapi-programi", label: t("navigation.rehabilitation"), active: false },
    { to: "/urun-katalogu", label: t("navigation.productCatalog"), active: false },
    { to: "/kulak-kalibi", label: t("navigation.earMould"), active: false },
    { to: "/odeme-planlari", label: t("navigation.sgk"), active: false },
    { to: "/audio-servis", label: t("navigation.phoneApp"), active: true },
    { to: "/hakkimizda", label: t("navigation.about"), active: false },
    { to: "/online-test", label: t("navigation.freeHearingTest"), active: false },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "İşitme Cihazı Mobil Uygulamaları",
    "applicationCategory": "HealthApplication",
    "operatingSystem": ["iOS", "Android"],
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "TRY"
    },
    "description": "İşitme cihazlarınızı akıllı telefonunuzdan kontrol edin. Ses ayarları, program değiştirme, kayıp cihaz bulma ve daha fazlası.",
    "featureList": [
      "Uzaktan kumanda",
      "Ses düzeyi ayarı",
      "Program değiştirme",
      "Batarya seviyesi görüntüleme",
      "Kayıp cihaz bulma",
      "Bluetooth bağlantısı",
      "Müzik ve telefon aktarımı"
    ],
    "provider": {
      "@type": "MedicalBusiness",
      "name": "Şelale İşitme Cihazı Merkezi"
    }
  };

  const app1Features = t("audioServis.app1.features", { returnObjects: true }) || [];
  const app2Features = t("audioServis.app2.features", { returnObjects: true }) || [];
  const app3Features = t("audioServis.app3.features", { returnObjects: true }) || [];

  return (
    <>
      <SEO {...seoFor("/audio-servis")} structuredData={structuredData} />

      <div className="min-h-screen bg-white relative">
        <button
          onClick={() => setSidebarOpen(true)}
          aria-label={t("navigation.menu")}
          className={`fixed top-6 left-6 z-50 bg-blue-900 hover:bg-blue-800 text-white p-3 rounded-lg shadow-lg focus:outline-none transition-opacity duration-300 ${
            sidebarOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <Menu className="w-6 h-6" />
        </button>

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
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setSidebarOpen(false)}
                className={`block font-medium ${link.active ? 'text-blue-900 font-semibold' : 'text-gray-800 hover:text-blue-900'}`}
              >
                {link.label}
              </Link>
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

        {/* Main Content */}
        <div className="py-16 px-4 md:px-12 text-gray-800 max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold text-center mb-8 text-blue-900">{t("audioServis.title")}</h1>
          <p className="text-lg text-center mb-16 max-w-3xl mx-auto">
            {t("audioServis.intro")}
          </p>

          {/* App 1 */}
          <div className="grid md:grid-cols-2 gap-10 items-center mb-24 border-b border-gray-100 pb-12">
            <div>
              <img loading="lazy" decoding="async"
                src="/images/products/hearing-aid-app.jpg"
                alt={t("audioServis.app1.imageAlt")}
                className="rounded-lg shadow-lg mx-auto w-full max-w-md object-cover"
              />
            </div>

            <div className="space-y-5">
              <h2 className="text-3xl font-bold text-blue-900">{t("audioServis.app1.title")}</h2>
              <p className="text-gray-600 text-lg">
                {t("audioServis.app1.description")}
              </p>
              <h3 className="text-xl font-semibold">{t("audioServis.app1.featuresTitle")}</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {Array.isArray(app1Features) && app1Features.map((feat, i) => (
                  <li key={i}>{feat}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* App 2 */}
          <div className="grid md:grid-cols-2 gap-10 items-center mb-24 border-b border-gray-100 pb-12">
            <div className="md:order-2">
              <img loading="lazy" decoding="async"
                src="/images/products/wp2.jpg"
                alt={t("audioServis.app2.imageAlt")}
                className="rounded-lg shadow-lg mx-auto w-full max-w-md object-cover"
              />
            </div>

            <div className="space-y-6 md:order-1">
              <h2 className="text-3xl font-bold text-blue-900">{t("audioServis.app2.title")}</h2>
              <p className="text-gray-600 text-lg">
                {t("audioServis.app2.description")}
              </p>
              
              <h3 className="text-xl font-semibold">{t("audioServis.app2.featuresTitle")}</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {Array.isArray(app2Features) && app2Features.map((feat, i) => (
                  <li key={i}>{feat}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* App 3 */}
          <div className="grid md:grid-cols-2 gap-10 items-center mb-24">
            <div>
              <img loading="lazy" decoding="async"
                src="/images/products/hearing-aid-app.jpg"
                alt={t("audioServis.app3.imageAlt")}
                className="rounded-lg shadow-lg mx-auto w-full max-w-md object-cover"
              />
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-blue-900">{t("audioServis.app3.title")}</h2>
              <p className="text-gray-600 text-lg">
                {t("audioServis.app3.description")}
              </p>
              
              <h3 className="text-xl font-semibold">{t("audioServis.app3.featuresTitle")}</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {Array.isArray(app3Features) && app3Features.map((feat, i) => (
                  <li key={i}>{feat}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div> 
    </>
  );
}
