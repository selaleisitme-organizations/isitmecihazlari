// One place for every page's search snippet. The pages read it through the SEO component (browser), and
// scripts/prerender.mjs writes the same tags into each page's HTML at build time, so crawlers that do not run
// JavaScript (Bing, ChatGPT, link previews) see the real title, description and canonical.
//
// Wording rules (owner, 2026-11-25): no device brand or model names (medical device advertising rules), no
// superlatives or guarantees, no try-before-you-buy, and the clinic test is not called free. The online test
// on this site is free, so it may say so.

export const SITE_URL = "https://www.selaleisitme.com";
export const SITE_NAME = "Şelale İşitme";
export const DEFAULT_OG_IMAGE = "/images/anasayfaBigPic.jpeg";

export const PAGES = {
  "/": {
    title: "Sarıyer İşitme Cihazı Merkezi | Şelale İşitme",
    description:
      "Sarıyer'de işitme testi, kulağınıza özel kalıpla işitme cihazı uygulaması, bakım ve adaptasyon takibi. SGK katkılı cihaz desteği. ☎ 0532 275 24 14",
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
  "/terapi-programi": {
    title: "İşitsel Rehabilitasyon ve Kulak Çınlaması | Şelale İşitme",
    description:
      "İşitme cihazına alışmayı destekleyen işitsel rehabilitasyon, kulak çınlaması programı ve kişiye özel takip süreci. Randevu: 0532 275 24 14",
    ogImage: "/images/kid.png",
  },
  "/odeme-planlari": {
    title: "SGK İşitme Cihazı Desteği ve Ödeme | Şelale İşitme",
    description:
      "SGK katkısıyla işitme cihazı alma süreci ve ödeme seçenekleri hakkında bilgi alın. Ayrıntılar için Sarıyer merkezimizi arayın.",
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
  name: "Şelale İşitme Cihazları",
  description:
    "Sarıyer'de işitme testi, kulağa özel kalıpla işitme cihazı uygulaması, cihaz bakım ve onarımı, adaptasyon takibi ve işitsel rehabilitasyon.",
  url: `${SITE_URL}/`,
  telephone: "+905322752414",
  image: `${SITE_URL}/images/selaleLogo.jpeg`,
  logo: `${SITE_URL}/images/selaleLogo.jpeg`,
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
  areaServed: ["Sarıyer", "İstanbul"],
  medicalSpecialty: "Audiology",
  availableService: [
    { "@type": "MedicalProcedure", name: "İşitme testi" },
    { "@type": "MedicalProcedure", name: "Kulağa özel kalıp" },
    { "@type": "MedicalProcedure", name: "İşitme cihazı bakım ve onarımı" },
    { "@type": "MedicalTherapy", name: "İşitsel rehabilitasyon" },
  ],
};

export function seoFor(path) {
  return PAGES[path] ?? NOT_FOUND;
}
