import { Link } from 'react-router-dom';
import { X, Menu, Phone, MapPin } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';

export default function AudioServis() {
  const { t } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const navLinks = [
    { to: "/", label: t("navigation.home"), active: false },
    { to: "/randevu", label: t("navigation.appointment"), active: false },
    { to: "/terapi-programi", label: t("navigation.rehabilitation"), active: false },
    { to: "/urun-katalogu", label: t("navigation.productCatalog"), active: false },
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
      <SEO 
        title="İşitme Cihazı Telefon Uygulamaları | Şelale İşitme Sarıyer"
        description="İşitme cihazınızı telefonunuzdan kontrol edin. iOS ve Android uygulamaları, uzaktan kumanda, ses ayarları, kayıp cihaz bulma. ☎️ 0532 275 24 14"
        canonical="https://selaleisitme.com/audio-servis"
        keywords="işitme cihazı uygulaması, işitme cihazı telefon uygulaması, işitme cihazı mobil uygulama, işitme cihazı app, işitme cihazı uzaktan kumanda, işitme cihazı bluetooth, işitme cihazı telefon bağlantısı, işitme cihazı ios, işitme cihazı android, işitme cihazı ses ayarı, işitme cihazı program değiştirme, işitme cihazı volüm kontrolü, işitme cihazı ayar, işitme cihazı kontrol, işitme cihazı uzaktan ayar, işitme cihazı kablosuz kontrol, işitme cihazı telefon kontrolü, işitme cihazı akıllı telefon, işitme cihazı smartphone, işitme cihazı kayıp bulma, işitme cihazı nerede, kayıp işitme cihazı bulma, işitme cihazı find my, işitme cihazı takip, işitme cihazı konum, işitme cihazı streaming, işitme cihazı müzik dinleme, işitme cihazı telefon görüşmesi, işitme cihazı arama, işitme cihazı video izleme, işitme cihazı ses aktarımı, işitme cihazı bluetooth aktarım, işitme cihazı telefon araması, işitme cihazı handsfree, işitme cihazı eller serbest, işitme cihazı direkt arama, işitme cihazı program, işitme cihazı programlar, işitme cihazı ayar programı, işitme cihazı ortam programı, işitme cihazı restoran modu, işitme cihazı müzik modu, işitme cihazı TV modu, işitme cihazı otomobil modu, işitme cihazı açık alan modu, işitme cihazı sessiz mod, işitme cihazı batarya, işitme cihazı pil seviyesi, işitme cihazı şarj durumu, işitme cihazı pil kontrolü, işitme cihazı batarya göstergesi, işitme cihazı kullanım istatistiği, işitme cihazı günlük kullanım, işitme cihazı saat, işitme cihazı veri, işitme cihazı rapor, işitme cihazı gürültü azaltma, işitme cihazı konuşma netliği, işitme cihazı yön odaklama, işitme cihazı tinnitus maskesi, işitme cihazı kulak çınlaması, işitme cihazı ekolayzer, işitme cihazı equalizer, işitme cihazı EQ, işitme cihazı bas, işitme cihazı treble, işitme cihazı tiz ses, işitme cihazı kalın ses, işitme cihazı ses profili, işitme cihazı kişiselleştirme, işitme cihazı özelleştirme, işitme cihazı ses kalitesi, işitme cihazı optimizasyon, işitme cihazı otomatik ayar, işitme cihazı akıllı ayar, işitme cihazı yapay zeka, işitme cihazı AI, işitme cihazı makine öğrenmesi, işitme cihazı adaptasyon, işitme cihazı firmware güncelleme, işitme cihazı yazılım güncelleme, işitme cihazı update, işitme cihazı sürüm, işitme cihazı remote support, işitme cihazı uzaktan destek, işitme cihazı tele audiology, işitme cihazı online ayar, işitme cihazı remote fitting, işitme cihazı uzaktan fitting, işitme cihazı telekonferans, işitme cihazı zoom, işitme cihazı video call, işitme cihazı çift cihaz, işitme cihazı stereo, işitme cihazı binaural, işitme cihazı sağ sol senkron, işitme cihazı çift kulak, işitme cihazı iPhone, işitme cihazı Apple, işitme cihazı iPad, işitme cihazı Apple Watch, işitme cihazı Samsung, işitme cihazı Huawei, işitme cihazı Xiaomi, işitme cihazı Android phone, işitme cihazı tablet, işitme cihazı MFi, işitme cihazı Made for iPhone, işitme cihazı ASHA, işitme cihazı Android streaming, işitme cihazı classic bluetooth, işitme cihazı low energy, işitme cihazı BLE, işitme cihazı 2.4 GHz, isitme cihazi uygulamasi, isitme cihazi telefon uygulamasi, isitme cihazi mobil uygulama, isitme cihazi app, isitme cihazi bluetooth, isitme cihazi uzaktan kumanda, isitme cihazi ios, isitme cihazi android, isitme cihazi ses ayari, isitme cihazi program, isitme cihazi kontrol, isitme cihazi kayip bulma, isitme cihazi streaming, isitme cihazi muzik dinleme, isitme cihazi telefon gorusmesi, isitme cihazi batarya, isitme cihazi pil, işitme cihazı uygulama, işitme cihazı telefon uygulama, işitme cihazı mobil uygulama, işitme cihazı ses ayar, işitme cihazı kayıp bulma, işitme cihazı müzik dinleme, işitme cihazı telefon görüşme, hearing aid app, hearing aid application, hearing aid remote control, hearing aid bluetooth, hearing aid streaming, hearing aid iPhone app, hearing aid Android app, hearing aid mobile app, hearing aid smartphone control, hearing aid wireless control, hearing aid volume control, hearing aid program change, hearing aid sound adjustment, hearing aid find my device, hearing aid music streaming, hearing aid phone calls, hearing aid battery level, hearing aid settings app, hearing aid remote fitting, hearing aid tele audiology, işitme cihazı uygulama indir, işitme cihazı uygulama download, işitme cihazı app store, işitme cihazı google play, işitme cihazı app nasıl kullanılır, işitme cihazı telefona bağlama, işitme cihazı telefon eşleştirme, işitme cihazı pairing, işitme cihazı bluetooth eşleştirme, işitme cihazı bağlantı sorunu, işitme cihazı app sorunu, işitme cihazı uygulama problemi, işitme cihazı bağlanmıyor, işitme cihazı app açılmıyor, işitme cihazı telefon sesi, işitme cihazı WhatsApp, işitme cihazı video, işitme cihazı Netflix, işitme cihazı YouTube, işitme cihazı Spotify"
        ogImage="/images/products/hearing-aid-app.jpg"
        structuredData={structuredData}
      />

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
              <img
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
              <img
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
              <img
                src="/images/products/wp3.png"
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
