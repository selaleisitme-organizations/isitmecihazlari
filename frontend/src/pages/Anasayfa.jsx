import { useState, useEffect } from 'react';
import {
  Heart, Users, Award, Phone, MapPin, Clock,
  ChevronRight, ChevronLeft, Star, Volume2, TrendingUp, Menu, X
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';

export default function Anasayfa() {
  const { t } = useTranslation();
  const [hoveredCard, setHoveredCard] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentTestImage, setCurrentTestImage] = useState(0);
  const [currentHeaderImage, setCurrentHeaderImage] = useState(0);
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);

  const testImages = [
    '/images/hastaTest.jpeg', 
    '/images/HearingTest.jpeg', 
  ];
  const headerImages = [
    '/images/anasayfaBigPic.jpeg',
    '/images/waterfall.jpg'
  ];
  
  const carouselImages = [
    '/images/H1.png',
    '/images/H2.png',
    '/images/H3.png',
    '/images/H4.png',
    '/images/H5.jpeg',
  ];
  const slideInterval = 5000;

  // Header image rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeaderImage(prev => (prev + 1) % headerImages.length);
    }, slideInterval);
    return () => clearInterval(timer);
  }, []);
  
  // Test images rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestImage(prevIndex => (prevIndex + 1) % testImages.length);
    }, slideInterval);
    return () => clearInterval(timer);
  }, [testImages.length]);

  // Carousel rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentCarouselIndex(prev => (prev + 1) % carouselImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Manuel Slide
  const nextTestImage = () => {
    setCurrentTestImage(prevIndex => (prevIndex + 1) % testImages.length);
  };

  const prevTestImage = () => {
    setCurrentTestImage(prevIndex => (prevIndex - 1 + testImages.length) % testImages.length);
  };

  const navLinks = [
    { to: "/", label: t("navigation.home"), active: true },
    { to: "/randevu", label: t("navigation.appointment"), active: false },
    { to: "/terapi-programi", label: t("navigation.rehabilitation"), active: false },
    { to: "/urun-katalogu", label: t("navigation.productCatalog"), active: false },
    { to: "/odeme-planlari", label: t("navigation.sgk"), active: false },
    { to: "/audio-servis", label: t("navigation.phoneApp"), active: false },
    { to: "/hakkimizda", label: t("navigation.about"), active: false },
    { to: "/online-test", label: t("navigation.freeHearingTest"), active: false },
  ];

  const scrollToTest = () => {
    const section = document.getElementById("ucretsiz-test");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const structuredData = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "name": "Şelale İşitme Cihazı Merkezi",
  "description": "İstanbul Sarıyer'de işitme cihazları, işitme testleri ve rehabilitasyon hizmetleri. SGK anlaşmalı, 30+ yıl deneyim.",
  "url": "https://www.selaleisitme.com",
  "telephone": "+905322752414",
  "address": {
  "@type": "PostalAddress",
  "streetAddress": "Merkez Mahallesi, Şehit Mithat Yılmaz Caddesi No:47 D:7",
  "addressLocality": "Sarıyer",
  "postalCode": "34396",
  "addressRegion": "İstanbul",
  "addressCountry": "TR"
},
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "41.1666",
    "longitude": "29.0520"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "09:00",
      "closes": "18:00"
    }
  ],
  "priceRange": "$$",
  "image": "https://www.selaleisitme.com/images/selaleLogo.jpeg",
  "medicalSpecialty": "Audiology",
  "availableService": [
    {
      "@type": "MedicalProcedure",
      "name": "İşitme Testi"
    },
    {
      "@type": "MedicalTherapy",
      "name": "İşitme Rehabilitasyonu"
    }
  ]
};

  const diseasesData = t("anasayfa.diseases.items", { returnObjects: true });
  const diseases = Array.isArray(diseasesData) ? diseasesData : [];

  const faqsData = t("anasayfa.faqs.items", { returnObjects: true });
  const faqs = Array.isArray(faqsData) ? faqsData : [];

  const servicesData = t("anasayfa.about.services", { returnObjects: true });
  const services = Array.isArray(servicesData) ? servicesData : [];

  const benefitsData = t("anasayfa.hearingDevices.benefits", { returnObjects: true });
  const benefits = Array.isArray(benefitsData) ? benefitsData : [];

  return (
    <>
  <SEO 
    title="İşitme Cihazı Merkezi Sarıyer İstanbul | SGK Anlaşmalı | Şelale İşitme"
    description="İstanbul Sarıyer'de işitme cihazı, ücretsiz işitme testi, rehabilitasyon programı. SGK anlaşmalı, 30+ yıl deneyim. ☎️ 0532 275 24 14"
    keywords="işitme cihazı, işitme cihazı fiyatları, işitme merkezi, işitme testi, işitme kaybı tedavisi, işitme cihazı Sarıyer, işitme cihazı İstanbul, SGK işitme cihazı, işitme cihazı SGK, kulak cihazı, kulak cihazı fiyatları, odyolog, odyoloji merkezi, işitme problemi, işitme kaybı, presbiakuzi, tinnitus tedavisi, kulak çınlaması, işitme cihazı modelleri, dijital işitme cihazı, şarjlı işitme cihazı, bluetooth işitme cihazı, görünmez işitme cihazı, kulak içi işitme cihazı, kulak arkası işitme cihazı, çocuk işitme cihazı, bebek işitme cihazı, yaşlı işitme cihazı, işitme cihazı bakımı, işitme cihazı servisi, işitme cihazı teknik servis, işitme cihazı pili, işitme cihazı aksesuarları, ücretsiz işitme testi, odyogram, odyometri, işitme testi ücretsiz, online işitme testi, işitme ölçümü, işitme kontrolü, işitme taraması, işitme değerlendirmesi, konuşma odyometrisi, timpanometri, refleks testi, OAE testi, ABR testi, BERA testi, işitme rehabilitasyonu, konuşma terapisi, dil terapisi, işitme cihazı uyum süreci, işitme cihazı alıştırma, işitme eğitimi, odyolojik rehabilitasyon, SGK işitme cihazı, SGK anlaşmalı işitme merkezi, işitme cihazı SGK ödemesi, işitme cihazı devlet desteği, işitme cihazı sigorta, işitme cihazı raporu, işitme engelli raporu, özürlü raporu işitme, SGK işitme cihazı başvurusu, sosyal güvenlik işitme cihazı, emekli sandığı işitme cihazı, bağkur işitme cihazı, yeşil kart işitme cihazı, Sarıyer işitme merkezi, Sarıyer işitme cihazı, İstanbul işitme merkezi, İstanbul işitme cihazı, Maslak işitme cihazı, Levent işitme cihazı, Etiler işitme cihazı, Beşiktaş işitme cihazı, Şişli işitme cihazı, Mecidiyeköy işitme cihazı, Beyoğlu işitme cihazı, Kadıköy işitme cihazı, Avrupa yakası işitme cihazı, işitme sağlığı, kulak sağlığı, KBB işitme cihazı, odyoloji uzmanı, işitme uzmanı, işitme protezi, kulak protezi, işitme implantı, koklear implant, kemik ankrajlı işitme cihazı, BAHA, işitme amplifikatörü, kulak amplifikatörü, TV dinleme cihazı, telefon dinleme cihazı, FM sistem, Roger sistem, işitme cihazı aksesuarı, işitme cihazı kulaklığı, işitme cihazı şarj cihazı, işitme cihazı kurutucu, işitme cihazı temizlik seti, cerumen koruyucu, wax guard, dome, kulak kalıbı, kulak küpü, özel kalıp, işitme cihazı garantisi, işitme cihazı iadesi, işitme cihazı taksit, işitme cihazı kredi, işitme cihazı kampanya, işitme cihazı indirim, ikinci el işitme cihazı, işitme cihazı kiralama, işitme cihazı deneme, işitme cihazı karşılaştırma, en iyi işitme cihazı, işitme cihazı yorumları, işitme cihazı tavsiye, işitme cihazı önerisi, işitme cihazı seçimi, hangi işitme cihazı, işitme cihazı nasıl alınır, işitme cihazı fiyat listesi, işitme cihazı 2024, işitme cihazı 2025, hearing aid Turkey, hearing aid Istanbul, hearing center Istanbul, audiology Istanbul, hearing test Istanbul, hearing loss treatment, hearing aid prices Turkey, hearing device, ear device, hearing amplifier, digital hearing aid, rechargeable hearing aid, bluetooth hearing aid, invisible hearing aid, behind the ear hearing aid, in the ear hearing aid, hearing aid for elderly, hearing aid for children, hearing aid battery, hearing aid accessories, free hearing test Istanbul, audiogram, audiometry, speech therapy, hearing rehabilitation, tinnitus treatment, ear ringing treatment, Meniere's disease, presbycusis, noise induced hearing loss, congenital hearing loss, sensorineural hearing loss, conductive hearing loss, mixed hearing loss, sudden hearing loss, age related hearing loss, hearing aid fitting, hearing aid adjustment, hearing aid maintenance, hearing aid repair, hearing aid technical service, insurance hearing aid, state support hearing aid, hearing disability report, SGK hearing aid Turkey, social security hearing aid, isitme cihazi, isitme merkezi, isitme testi, isitme kaybi, kulak cihazi, odyoloji, odyolog, SGK isitme cihazi, Sariyer isitme merkezi, Istanbul isitme merkezi, ucretsiz isitme testi, isitme rehabilitasyonu, konusma terapisi, tinnitus, kulak cinlamasi, presbiakuzi, isitme sorunu, isitme problemi, kulak problemi, duyma sorunu, sesiitme problemi, işitme ciazı, işitme cihası, isitme cihazı fiyatlari, isitme cihazi fiyatlari, isitme cihazı fiyatı, kulak cihazı fiyatı, işitme cihaz fiyatları, isitme cihaz, kulak cihaz, işitme aleti, kulak aleti, isitme aparatı, kulak aparati"
    ogImage="/images/anasayfaBigPic.jpeg"
    structuredData={structuredData}
  />
      <div className="min-h-screen bg-white relative">
        {/* Navigation Button */}
        <button
          onClick={() => setSidebarOpen(true)}
          aria-label={t("navigation.menu")}
          className={`fixed top-6 left-6 z-50 bg-blue-900 hover:bg-blue-800 text-white p-3 rounded-lg shadow-lg focus:outline-none transition-opacity duration-300 ${
            sidebarOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Sidebar Navigation */}
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

          {/* Sidebar Logo */}
          <div className="flex justify-center py-6">
            <img
              src="/images/selaleLogo.jpeg"
              alt="Şelale İşitme Merkezi Logosu"
              className="w-32 h-auto rounded-lg shadow-sm"
            />
          </div>

          {/* Navigation Links */}
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

        {/* Top-right Logo */}
        <div className="fixed top-4 right-6 z-40">
          <img
            src="/images/selaleLogo.jpeg"
            alt="Şelale İşitme Merkezi Logosu"
            className="w-20 h-auto rounded-lg shadow-md border border-gray-200"
          />
        </div>

        <div className="relative">
          {/* Animated Background Elements */}
          <div className="fixed inset-0 -z-10 overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
          </div>

          {/* HEADER */}
          <header className="relative pt-20 pb-32 overflow-hidden">
            {/* Image Slideshow */}
            {headerImages.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  currentHeaderImage === index ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  backgroundImage: `url(${image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              />
            ))}

            <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
              <div className="text-center space-y-8">
                <h1 className="text-6xl sm:text-7xl font-bold text-white leading-tight drop-shadow-2xl" style={{
                  textShadow: '2px 2px 8px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.5)'
                }}>
                  {t("anasayfa.title")}
                </h1>

                <p className="text-xl sm:text-2xl text-white max-w-2xl mx-auto leading-relaxed font-semibold drop-shadow-lg" style={{
                  textShadow: '1px 1px 4px rgba(0,0,0,0.8)'
                }}>
                  {t("anasayfa.heroSubtitle")}
                </p>

                <p className="text-xl sm:text-2xl text-white max-w-2xl mx-auto leading-relaxed font-semibold drop-shadow-lg" style={{
                  textShadow: '1px 1px 4px rgba(0,0,0,0.8)'
                }}>
                  <strong>{t("anasayfa.heroQuestion")}</strong> 
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <a href="/randevu" className="group bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white font-bold py-4 px-8 rounded-lg transition transform hover:scale-105 flex items-center justify-center gap-2 shadow-xl">
                    {t("anasayfa.bottomCta.button")}
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                  </a>
                 
                  <button
                    onClick={scrollToTest}
                    className="border-2 border-white bg-white bg-opacity-90 text-blue-900 hover:bg-opacity-100 font-bold py-4 px-8 rounded-lg transition shadow-xl"
                  >
                    {t("anasayfa.freeTestButton")}
                  </button>
                </div>
              </div>
            </div>
          </header>

          {/* Stats Section */}
          <section className="relative py-16">
            <div className="max-w-6xl mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { icon: Users, label: t("anasayfa.stats.satisfiedPatients"), value: t("anasayfa.stats.patientsValue") },
                  { icon: Award, label: t("anasayfa.stats.successRate"), value: t("anasayfa.stats.successValue") },
                  { icon: TrendingUp, label: t("anasayfa.stats.yearsExperience"), value: t("anasayfa.stats.experienceValue") },
                  { icon: Heart, label: t("anasayfa.stats.healthProfessional"), value: t("anasayfa.stats.healthProfessionalName") }
                ].map((stat, i) => (
                  <div key={i} className="group relative">
                    <div className="absolute inset-0 bg-linear-to-r from-blue-900 to-purple-900 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
                    <div className="relative bg-white p-8 rounded-lg backdrop-blur-sm">
                      <stat.icon className="w-8 h-8 text-blue-900 mb-3" />
                      <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* About Section */}
          <section className="py-24 bg-linear-to-br from-blue-50 to-purple-50">
            <div className="max-w-6xl mx-auto px-4">
              <div className="grid md:grid-cols-2 gap-16 items-center">
                <div>
                  <h2 className="text-4xl font-bold text-blue-900 mb-6">{t("anasayfa.about.title")}</h2>
                  <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                    {t("anasayfa.about.paragraph1")}
                  </p>
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    {t("anasayfa.about.paragraph2")}
                  </p>

                  <p className="text-lg font-semibold text-gray-900 mb-4">
                    {t("anasayfa.about.servicesIntro")}
                  </p>
                  <div className="space-y-3">
                    {services.map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-linear-to-r from-blue-900 to-purple-900 rounded-full"></div>
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>

                  <p className="text-lg text-gray-700 mt-6 leading-relaxed">
                    {t("anasayfa.about.closing")}
                  </p>
                </div>

                {/* image */}
                <div className="relative h-96 rounded-2xl shadow-2xl overflow-hidden">
                  <img
                    src="/images/NedenSelale.jpeg"
                    alt={t("anasayfa.about.imageAlt")}
                    className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Diseases Section */}
          <section className="py-24">
            <div className="max-w-6xl mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-blue-900 mb-4">{t("anasayfa.diseases.sectionTitle")}</h2>
                <p className="text-gray-600 text-lg">{t("anasayfa.diseases.sectionSubtitle")}</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {diseases.map((disease, idx) => (
                  <div
                    key={idx}
                    onMouseEnter={() => setHoveredCard(idx)}
                    onMouseLeave={() => setHoveredCard(null)}
                    className="group relative"
                  >
                    <div className="absolute inset-0 bg-linear-to-r from-blue-900 to-purple-900 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500"></div>
                    <div className="relative bg-white p-8 rounded-2xl border border-gray-100 group-hover:border-blue-200 transition overflow-hidden">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{disease.name}</h3>
                      {disease.shortDesc && (
                        <p className="text-sm text-blue-900 font-semibold mb-3">{disease.shortDesc}</p>
                      )}
                      <p className="text-gray-600 mb-6">{disease.description}</p>

                      {disease.symptoms && Array.isArray(disease.symptoms) && (
                        <div className={`space-y-2 overflow-hidden transition-all duration-300 ${hoveredCard === idx ? 'max-h-48' : 'max-h-0'}`}>
                          <p className="font-semibold text-gray-900 text-sm">{t("anasayfa.diseases.symptomsTitle")}:</p>
                          {disease.symptoms.map((symptom, i) => (
                            <p key={i} className="text-sm text-gray-600 flex items-start gap-2">
                              <span className="text-blue-900">✓</span>
                              <span>{symptom}</span>
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Image Carousel Section */}
          <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50 overflow-hidden">
            <div className="w-full">
              <div className="relative h-[500px] flex items-center justify-center">
                {carouselImages.map((image, index) => {
                  const offset = (index - currentCarouselIndex + carouselImages.length) % carouselImages.length;
                  const isCurrent = offset === 0;
                  
                  let translateX = 0;
                  let scale = 0.7;
                  let opacity = 0.4;
                  let zIndex = 0;
                  
                  if (isCurrent) {
                    translateX = 0;
                    scale = 1;
                    opacity = 1;
                    zIndex = 30;
                  } else if (offset === 1) {
                    translateX = 450;
                    scale = 0.85;
                    opacity = 0.6;
                    zIndex = 20;
                  } else if (offset === carouselImages.length - 1) {
                    translateX = -450;
                    scale = 0.85;
                    opacity = 0.6;
                    zIndex = 20;
                  } else if (offset === 2) {
                    translateX = 800;
                    scale = 0.7;
                    opacity = 0.3;
                    zIndex = 10;
                  } else if (offset === carouselImages.length - 2) {
                    translateX = -800;
                    scale = 0.7;
                    opacity = 0.3;
                    zIndex = 10;
                  } else {
                    opacity = 0;
                  }
                  
                  return (
                    <div
                      key={index}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/3 transition-all duration-700 ease-in-out"
                      style={{
                        transform: `translate(calc(-50% + ${translateX}px), -50%) scale(${scale})`,
                        opacity: opacity,
                        zIndex: zIndex
                      }}
                    >
                      <div className={`rounded-2xl overflow-hidden shadow-2xl ${isCurrent ? 'ring-4 ring-blue-500' : ''}`}>
                        <img
                          src={image}
                          alt={`${t("anasayfa.carousel.imageAlt")} ${index + 1}`}
                          className="w-[400px] h-[400px] object-cover"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Carousel indicators */}
              <div className="flex justify-center gap-2 mt-8">
                {carouselImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentCarouselIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentCarouselIndex === index 
                        ? 'bg-blue-900 w-8' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`${t("anasayfa.carousel.imageAlt")} ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Importance of Hearing Devices Section */}
          <section className="py-24 bg-linear-to-br from-blue-50 to-purple-50">
            <div className="max-w-6xl mx-auto px-6 text-center">
              <h2 className="text-4xl font-bold text-blue-900 mb-6">
                {t("anasayfa.hearingDevices.title")}
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-16">
                {t("anasayfa.hearingDevices.description")}
              </p>

              <div className="grid md:grid-cols-3 gap-10">
                {benefits.map((benefit, i) => (
                  <div key={i} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                ))}
              </div>

              <div className="mt-16">
                <p className="text-gray-700 text-lg max-w-3xl mx-auto">
                  <strong>{t("anasayfa.hearingDevices.closingTitle")} </strong> 
                  {t("anasayfa.hearingDevices.closingText")}
                </p>
              </div>
            </div>
          </section>

          {/* Test Section */}
          <section id="ucretsiz-test" className="py-24 bg-gray-100">
            <div className="max-w-6xl mx-auto px-6">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Image Carousel */}
                <div className="order-2 md:order-1 relative h-[500px] rounded-lg shadow-xl overflow-hidden">
                  {testImages.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${t("anasayfa.hearingTest.imageAlt")} ${index + 1}`}
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
                        currentTestImage === index ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  ))}

                  <button
                    onClick={prevTestImage}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-black/40 text-white hover:bg-black/60 rounded-full transition"
                    aria-label={t("anasayfa.hearingTest.previousImage")}
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextTestImage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-black/40 text-white hover:bg-black/60 rounded-full transition"
                    aria-label={t("anasayfa.hearingTest.nextImage")}
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                  
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                    {testImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentTestImage(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          currentTestImage === index ? 'bg-white scale-110' : 'bg-gray-400 opacity-60'
                        }`}
                        aria-label={`${t("anasayfa.hearingTest.imageAlt")} ${index + 1}`}
                      ></button>
                    ))}
                  </div>
                </div>

                {/* Text Content */}
                <div className="order-1 md:order-2 text-center md:text-left">
                  <h2 className="text-4xl font-bold text-blue-900 mb-6">
                    {t("anasayfa.hearingTest.title")}
                  </h2>
                  <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                    {t("anasayfa.hearingTest.description")}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                      href="/randevu"
                      className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-4 px-10 rounded-lg transition transform hover:scale-105 inline-flex items-center justify-center gap-2 text-lg shadow-md"
                    >
                      {t("anasayfa.hearingTest.appointmentButton")}
                      <ChevronRight className="w-6 h-6" />
                    </a>
                    <a
                      href="/online-test"
                      className="bg-white hover:bg-blue-200 text-blue-900 font-bold py-4 px-10 rounded-lg transition transform hover:scale-105 inline-flex items-center justify-center gap-2 text-lg shadow-md"
                    >
                      {t("anasayfa.hearingTest.startButton")}
                      <ChevronRight className="w-6 h-6" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQs Section */}
          <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-blue-900 mb-4">{t("anasayfa.faqs.title")}</h2>
                <p className="text-lg text-gray-600">{t("anasayfa.faqs.subtitle")}</p>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <details key={i} className="group bg-white rounded-xl border border-gray-200 shadow-sm">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 text-lg font-semibold text-blue-900 marker:content-none">
                      <span>{faq.question}</span>
                      <span className="text-2xl text-blue-700 transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                    </summary>
                    <p className="px-6 pb-6 leading-relaxed text-gray-700">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="py-24 bg-linear-to-br from-blue-900 via-blue-800 to-purple-900 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full mix-blend-screen filter blur-3xl"></div>
            </div>

            <div className="max-w-6xl mx-auto px-4 relative z-10">
              <h2 className="text-4xl font-bold mb-16 text-center">{t("anasayfa.contact.title")}</h2>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Left card */}
                <div className="bg-white text-blue-900 rounded-2xl p-10 shadow-xl flex flex-col justify-center">
                  <h3 className="text-2xl font-bold mb-6">{t("anasayfa.contact.informationTitle")}</h3>

                  <div className="mb-4">
                    <p className="text-lg font-semibold">📞 {t("anasayfa.contact.phoneLabel")}</p>
                    <p className="text-xl font-bold mt-1">{t("navigation.phone")}</p>
                  </div>

                  <div>
                    <p className="text-lg font-semibold">🕓 {t("anasayfa.contact.hoursLabel")}</p>
                    <p className="mt-1 whitespace-pre-line">
                      {t("anasayfa.contact.workingDays")}{"\n"}{t("anasayfa.contact.workingHours")}
                    </p>
                  </div>
                </div>

                {/* Right card: Map */}
                <a
                  href="https://maps.app.goo.gl/BXqB7sb4okM2u4hD9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative block rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition duration-300"
                >
                  <img
                    src="/images/Location.jpeg"
                    alt={t("anasayfa.contact.mapAlt")}
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition">
                    <span className="text-white text-xl font-bold">
                      📍 {t("anasayfa.contact.mapButton")}
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </section>

          {/* Bottom CTA Section */}
          <section className="py-24">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <h2 className="text-5xl font-bold text-blue-900 mb-6">{t("anasayfa.bottomCta.title")}</h2>
              <p className="text-xl text-gray-600 mb-12 leading-relaxed">
                {t("anasayfa.bottomCta.description")}
              </p>
              <a
                href="/randevu"
                className="group bg-linear-to-r from-blue-900 to-purple-900 hover:from-blue-800 hover:to-purple-800 text-white font-bold py-4 px-12 rounded-lg transition transform hover:scale-105 inline-flex items-center gap-2 text-lg shadow-lg" 
              >
                {t("anasayfa.bottomCta.button")}
                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition" />
              </a>
            </div>
          </section>
        </div>

        {/* Floating WhatsApp Button */}
        <a
          href={`https://api.whatsapp.com/send?phone=905322752414&text=${encodeURIComponent(t("anasayfa.whatsapp.message"))}`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition transform hover:scale-110"
          aria-label={t("anasayfa.whatsapp.ariaLabel")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            fill="currentColor"
            className="w-8 h-8"
          >
            <path d="M16.003 3.002c-7.18 0-13 5.82-13 13 0 2.288.602 4.528 1.747 6.487L3 29l6.67-1.726A12.923 12.923 0 0 0 16 29c7.18 0 13-5.82 13-13s-5.82-13-12.997-13zm0 23.733c-2.1 0-4.154-.547-5.967-1.585l-.427-.247-3.96 1.025 1.058-3.862-.277-.437A10.969 10.969 0 0 1 5.034 16c0-6.05 4.919-10.969 10.969-10.969 6.05 0 10.969 4.919 10.969 10.969s-4.919 10.735-10.969 10.735zm5.97-8.07c-.327-.164-1.946-.962-2.248-1.07-.302-.109-.522-.164-.743.164-.218.327-.854 1.07-1.047 1.292-.191.218-.382.246-.708.082-.327-.164-1.381-.51-2.63-1.625-.972-.867-1.625-1.94-1.818-2.268-.191-.327-.021-.505.144-.668.149-.148.327-.382.491-.573.164-.191.218-.327.327-.546.109-.218.055-.41-.027-.573-.082-.164-.743-1.795-1.018-2.459-.267-.64-.537-.55-.743-.561l-.637-.011c-.218 0-.573.082-.873.382-.3.3-1.145 1.118-1.145 2.724 0 1.606 1.172 3.157 1.337 3.374.164.218 2.309 3.525 5.593 4.946.782.337 1.392.538 1.868.687.785.25 1.498.214 2.063.13.63-.094 1.946-.795 2.22-1.562.273-.764.273-1.42.191-1.562-.082-.137-.3-.218-.627-.382z" />
          </svg>
        </a>
      </div>
    </>
  );
}
