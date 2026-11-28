import { Link } from 'react-router-dom';
import { X, Menu, Phone, MapPin } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import { seoFor } from '../seo/pages'; 

export default function TerapiProgrami() {
  const { t } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navLinks = [
    { to: "/", label: t("navigation.home"), active: false },
    { to: "/randevu", label: t("navigation.appointment"), active: false },
    { to: "/terapi-programi", label: t("navigation.rehabilitation"), active: true },
    { to: "/urun-katalogu", label: t("navigation.productCatalog"), active: false },
    { to: "/kulak-kalibi", label: t("navigation.earMould"), active: false },
    { to: "/odeme-planlari", label: t("navigation.sgk"), active: false },
    { to: "/audio-servis", label: t("navigation.phoneApp"), active: false },
    { to: "/hakkimizda", label: t("navigation.about"), active: false },
    { to: "/isitme-testi", label: t("navigation.hearingTest"), active: false },
    { to: "/online-test", label: t("navigation.freeHearingTest"), active: false },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    "name": "İşitsel Rehabilitasyon Programı",
    "description": "İşitme kaybı olan bireyler için kişiselleştirilmiş işitsel rehabilitasyon ve terapi programları. İşitme cihazı kullanımını destekleme ve iletişim becerilerini geliştirme.",
    "procedureType": "Rehabilitation",
    "bodyLocation": "Ear",
    "medicalSpecialty": "Otolaryngology" // Kulak Burun Boğaz
  };

  return (
    <>
      <SEO {...seoFor("/terapi-programi")} structuredData={structuredData} />
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
        <section id="isitme-rehabilitasyonu" className="max-w-6xl mx-auto my-16 px-6 bg-white rounded-xl shadow-md text-gray-800">
          <h1 className="text-3xl font-semibold text-blue-900 border-l-4 border-blue-900 pl-3 mb-6">
            {t("therapyPage.title")}
          </h1>

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Text Column */}
            <div className="flex-1 space-y-6">
              <p>{t("therapyPage.paragraph1")}</p>
              <p>{t("therapyPage.paragraph2")}</p>
              <p>{t("therapyPage.paragraph3")}</p>
              <p>{t("therapyPage.paragraph4")}</p>
              <span className="text-red-700 font-semibold block">
                {t("therapyPage.warning")}
              </span>
            </div>

            {/* Image Column */}
            <div className="flex-1 flex justify-end">
              <img loading="lazy" decoding="async"
                src="/images/kid.webp"
                alt={t("therapyPage.imageAlt")}
                className="max-w-full h-auto rounded-lg shadow-md"
              />
            </div>
          </div>
        </section>
      </div> 
    </>
  );
}
