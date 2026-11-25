import { Link } from 'react-router-dom';
import { X, Menu, Phone, MapPin, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import SEO from '../components/SEO';
import { seoFor } from '../seo/pages';

export default function AudioServis() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
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

  return (
    <>
      <SEO {...seoFor("/audio-servis")} structuredData={structuredData} />

      <div className="min-h-screen bg-white relative">
        {/* --- Navigation --- */}
        <button
          onClick={() => setSidebarOpen(true)}
          aria-label="Menü"
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
            <h3 className="text-lg font-bold text-blue-900">Menü</h3>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-1 text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Sidebar Logo */}
          <div className="flex justify-center py-6">
            <img
              src="/images/selaleLogo.jpeg"
              alt="Şelale İşitme Merkezi Logosu"
              className="w-32 h-auto rounded-lg shadow-sm"
            />
          </div>

          <nav className="p-5 space-y-3">
            <Link to="/" onClick={() => setSidebarOpen(false)} className="block text-gray-800 font-medium hover:text-blue-900">
              Anasayfa
            </Link>
            <Link to="/randevu" onClick={() => setSidebarOpen(false)} className="block text-gray-800 font-medium hover:text-blue-900">
              Randevu Alın
            </Link>
            <Link to="/terapi-programi" onClick={() => setSidebarOpen(false)} className="block text-gray-800 font-medium hover:text-blue-900">
              Rehabilitasyon Programı
            </Link>
            <Link to="/urun-katalogu" onClick={() => setSidebarOpen(false)} className="block text-gray-800 font-medium hover:text-blue-900">
              Ürün Kataloğu
            </Link>
            <Link to="/odeme-planlari" onClick={() => setSidebarOpen(false)} className="block text-gray-800 font-medium hover:text-blue-900">
              SGK
            </Link>
            <Link to="/audio-servis" onClick={() => setSidebarOpen(false)} className="block text-blue-900 font-semibold">
              Telefon Uygulaması
            </Link>
            <Link to="/hakkimizda" onClick={() => setSidebarOpen(false)} className="block text-gray-800 font-medium hover:text-blue-900">
              Hakkımızda
            </Link>
            <Link to="/online-test" onClick={() => setSidebarOpen(false)} className="block text-gray-800 font-medium hover:text-blue-900">
              Ücretsiz İşitme Testi
            </Link>
          </nav>

          <div style={{ marginTop: "auto" }} className="p-5 border-t border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <Phone className="w-5 h-5 text-blue-900" />
              <span className="text-gray-800 font-medium">0532 275 24 14</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-blue-900" />
              <span className="text-gray-800 font-medium">Merkez Mah., Sarıyer</span>
            </div>
          </div>
        </aside>

        {/* --- Main Content --- */}
        <div className="py-16 px-4 md:px-12 text-gray-800 max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold text-center mb-8 text-blue-900">Telefon Uygulamaları</h1>
          <p className="text-lg text-center mb-16 max-w-3xl mx-auto">
            İşitme cihazı kullanıcılarının cihazlarını kolaylıkla kontrol etmesini sağlayan mobil çözümler.
          </p>

          <div className="grid md:grid-cols-2 gap-10 items-center mb-24 border-b border-gray-100 pb-12">
            <div>
              <img
                src="/images/products/hearing-aid-app.jpg"
                alt="İşitme cihazı mobil uygulaması kontrol ekranı"
                className="rounded-lg shadow-lg mx-auto w-full max-w-md object-cover"
              />
            </div>

            <div className="space-y-5">
              <h2 className="text-3xl font-bold text-blue-900">Uygulama 1</h2>
              <p className="text-gray-600 text-lg">
                Günlük kullanımı daha konforlu hale getiren, kullanıcı dostu arayüz.
              </p>
              <h3 className="text-xl font-semibold">Temel Özellikler</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Uzaktan kumanda ile işitme cihazı ayarlarını kontrol etme</li>
                <li>Ses düzeyi ve denge ayarlarını kişiselleştirme</li>
                <li>Farklı dinleme programları arasında geçiş yapma</li>
                <li>Batarya seviyesini görüntüleme</li>
                <li>Kullanım istatistiklerini görüntüleme</li>
                <li>iOS ve Android cihazlarla uyumlu</li>
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-10 items-center mb-24">
            <div className="md:order-2">
              <img
                src="/images/products/wp2.jpg"
                alt="Coselgi Effect Uygulama Ekranı"
                className="rounded-lg shadow-lg mx-auto w-full max-w-md object-cover"
              />
            </div>

            <div className="space-y-6 md:order-1">
              <h2 className="text-3xl font-bold text-blue-900">Uygulama 2</h2>
              <p className="text-gray-600 text-lg">
                Bu uygulama ile işitme deneyiminizi tamamen kişiselleştirin ve çevrenizle kesintisiz bağlantıda kalın.
              </p>
              
              <h3 className="text-xl font-semibold">Öne Çıkan Özellikler</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Ortama göre otomatik ses optimizasyonu</li>
                <li>Konuşma netliğini artıran gelişmiş gürültü azaltma</li>
                <li>Doğrudan telefon görüşmeleri ve müzik aktarımı (Streaming)</li>
                <li>"İşitme cihazımı bul" özelliği ile kayıp cihaz takibi</li>
                <li>Kişiselleştirilmiş ses profilleri oluşturma</li>
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-10 items-center border-t border-gray-100 pt-12">
            <div>
              <img
                src="/images/products/wp.jpg"
                alt="Bernafon Uygulama Ekranı"
                className="rounded-lg shadow-lg mx-auto w-full max-w-md object-cover"
              />
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-blue-900">Uygulama 3</h2>
              <p className="text-gray-600 text-lg">
                İşitme cihazlarınızı gizlice ve kolayca kontrol etmeniz için ihtiyacınız olan her şeyi tek bir uygulamada sunar.
              </p>
              
              <h3 className="text-xl font-semibold">Öne Çıkan Özellikler</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Ses seviyesini ve programları anlık olarak değiştirme</li>
                <li>Özelliği ile günlük kullanım hedefleri belirleme</li>
                <li>Akış ekolayzırı ile müzik ve arama seslerini kişiselleştirme</li>
                <li>Kayıp işitme cihazının yerini harita üzerinde tespit etme</li>
                <li>Pil durumunu ve bağlantı kalitesini izleme</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
