// One place for every page's search snippet. The pages read it through the SEO component (browser), and
// scripts/prerender.mjs writes the same tags into each page's HTML at build time, so crawlers that do not run
// JavaScript (Bing, ChatGPT, link previews) see the real title, description and canonical.
//
// The build needs every export below (SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE, PAGES, NOT_FOUND, BUSINESS, seoFor):
// scripts/prerender.mjs and src/entry-server.jsx import them. Removing one breaks every deploy.
//
// Wording rules (owner, 2026-11-25): no device brand or model names (medical device advertising rules), no
// superlatives or guarantees, no try-before-you-buy, and the clinic test is not called free. The online test
// on this site is free, so it may say so. The clinic is SGK-contracted (confirmed 2026-11-25).
import tr from "../locales/tr.json";

export const SITE_URL = "https://www.selaleisitme.com";
export const SITE_NAME = "Şelale İşitme";
export const DEFAULT_OG_IMAGE = "/images/anasayfaBigPic.jpeg";

// FAQ answers as Google reads them (schema.org FAQPage), from the same Turkish texts the page shows.
function faqPage(items) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

export const PAGES = {
  "/": {
    title: "Sarıyer İşitme Cihazı Merkezi | Şelale İşitme",
    description:
      "SGK anlaşmalı işitme merkezi. Sarıyer'de işitme testi, kulağınıza özel kalıpla işitme cihazı uygulaması, bakım ve adaptasyon takibi. ☎ 0532 275 24 14",
    ogImage: DEFAULT_OG_IMAGE,
  },
  "/randevu": {
    title: "İşitme Testi Randevusu | Şelale İşitme Sarıyer",
    description: "Sarıyer Şelale İşitme'de işitme testi ve değerlendirme için online randevu talebinizi oluşturun.",
  },
  "/urun-katalogu": {
    title: "İşitme Cihazı Modelleri | Şelale İşitme Sarıyer",
    description:
      "Kanal içi, kulak arkası, şarjlı ve Bluetooth işitme cihazı tiplerinin özelliklerini inceleyin; size uygun tipi testten sonra birlikte seçelim.",
    ogImage: "/images/products/SR_Li_8.png",
  },
  "/kulak-kalibi": {
    title: "Kulağa Özel İşitme Cihazı Kalıbı | Şelale İşitme Sarıyer",
    description:
      "Hazır numaralı başlık yerine kulağınızdan ölçü alarak size özel kalıp hazırlıyoruz. Süreç, bakım ve sık sorulan sorular. ☎ 0532 275 24 14",
    structuredData: faqPage(tr.earMouldPage.faq),
  },
  "/terapi-programi": {
    title: "İşitsel Rehabilitasyon ve Kulak Çınlaması | Şelale İşitme",
    description:
      "İşitme cihazına alışmayı destekleyen işitsel rehabilitasyon, kulak çınlaması programı ve kişiye özel takip süreci. Randevu: 0532 275 24 14",
    ogImage: "/images/kid.png",
  },
  "/odeme-planlari": {
    title: "SGK Anlaşmalı İşitme Cihazı ve Ödeme | Şelale İşitme",
    description:
      "SGK anlaşmalı merkezimizde SGK katkısıyla işitme cihazı alma süreci ve ödeme seçenekleri. Ayrıntılar için Sarıyer merkezimizi arayın.",
    structuredData: faqPage(tr.sgkPage.faq),
  },
  "/audio-servis": {
    title: "İşitme Cihazı Telefon Uygulamaları | Şelale İşitme",
    description:
      "İşitme cihazınızı telefondan yönetin: ses ve program ayarı, pil durumu, kayıp cihazı bulma. Kurulumda yardımcı oluyoruz.",
    ogImage: "/images/products/hearing-aid-app.jpg",
  },
  "/hakkimizda": {
    title: "Hakkımızda | Şelale İşitme Sarıyer",
    description:
      "Şelale İşitme; Sarıyer'de işitme değerlendirmesi, kulağa özel kalıp, işitme cihazı uygulaması ve satış sonrası bakımla hizmet verir.",
  },
  "/isitme-testi": {
    title: "Sarıyer'de İşitme Testi | Şelale İşitme",
    description:
      "Merkezimizde işitme testi: nasıl yapılır, odyogram nasıl okunur, ne zaman test yaptırmalı. Ayrıntılı testler ücretlidir; bilgi için arayın. ☎ 0532 275 24 14",
    structuredData: faqPage(tr.hearingTestPage.faq),
  },
  "/online-test": {
    title: "Ücretsiz Online İşitme Testi | Şelale İşitme",
    description:
      "Birkaç dakikalık ücretsiz online işitme testiyle işitmenizi kontrol edin; sonucu merkezimizde ayrıntılı testle değerlendirelim.",
    ogImage: "/images/IC.png",
  },
};

export const NOT_FOUND = {
  title: "Sayfa bulunamadı | Şelale İşitme",
  description: "Aradığınız sayfa bulunamadı. Anasayfaya dönebilir ya da bizi arayabilirsiniz: 0532 275 24 14",
};

// The clinic as Google's local results know it. Read by the home page and written into every page's HTML.
export const BUSINESS = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "@id": `${SITE_URL}/#business`,
  name: "Şelale İşitme",
  alternateName: "Şelale İşitme Cihazları",
  description:
    "Şelale İşitme, İstanbul Sarıyer'de hizmet veren SGK anlaşmalı bir işitme merkezidir. İşitme değerlendirmesi, işitme cihazı uygulaması, kulağa özel kalıp, cihaz bakım ve onarımı, adaptasyon takibi ve işitsel rehabilitasyon hizmetleri sunar.",
  url: `${SITE_URL}/`,
  telephone: "+905322752414",
  email: "selaleisitme@gmail.com",
  image: `${SITE_URL}/images/selaleLogo.jpeg`,
  logo: `${SITE_URL}/images/selaleLogo.jpeg`,
  hasMap: "https://maps.app.goo.gl/BXqB7sb4okM2u4hD9",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Merkez Mahallesi, Şehit Mithat Yılmaz Caddesi No:47 D:7",
    addressLocality: "Sarıyer",
    postalCode: "34396",
    addressRegion: "İstanbul",
    addressCountry: "TR",
  },
  // From the Google Business Profile listing, so the map pin and this page agree.
  geo: { "@type": "GeoCoordinates", latitude: 41.1691916, longitude: 29.0552123 },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  areaServed: [
    { "@type": "City", name: "İstanbul" },
    { "@type": "AdministrativeArea", name: "Sarıyer" },
  ],
  medicalSpecialty: "Audiology",
  availableService: [
    { "@type": "Service", name: "İşitme değerlendirmesi", url: `${SITE_URL}/isitme-testi` },
    { "@type": "Service", name: "İşitme cihazı uygulaması" },
    { "@type": "Service", name: "Kulağa özel kalıp", url: `${SITE_URL}/kulak-kalibi` },
    { "@type": "Service", name: "İşitme cihazı bakım ve onarımı" },
    { "@type": "Service", name: "İşitsel rehabilitasyon" },
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+905322752414",
    contactType: "customer service",
    availableLanguage: ["Turkish"],
  },
  knowsAbout: [
    "İşitme cihazları",
    "İşitme değerlendirmesi",
    "İşitsel rehabilitasyon",
    "İşitme cihazı bakımı",
    "İşitme sağlığı",
  ],
};

export function seoFor(path) {
  return PAGES[path] ?? NOT_FOUND;
}
