
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
    addressCountry: "TR"
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 41.1691916,
    longitude: 29.0552123
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday", "Tuesday", "Wednesday",
        "Thursday", "Friday", "Saturday"
      ],
      opens: "09:00",
      closes: "18:00"
    }
  ],
  areaServed: [
    {
      "@type": "City",
      name: "İstanbul"
    },
    {
      "@type": "AdministrativeArea",
      name: "Sarıyer"
    }
  ],
  medicalSpecialty: "Audiology",
  availableService: [
    {
      "@type": "Service",
      name: "İşitme değerlendirmesi"
    },
    {
      "@type": "Service",
      name: "İşitme cihazı uygulaması"
    },
    {
      "@type": "Service",
      name: "Kulağa özel kalıp"
    },
    {
      "@type": "Service",
      name: "İşitme cihazı bakım ve onarımı"
    },
    {
      "@type": "Service",
      name: "İşitsel rehabilitasyon"
    }
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+905322752414",
    contactType: "customer service",
    availableLanguage: ["Turkish"]
  },
  knowsAbout: [
    "İşitme cihazları",
    "İşitme değerlendirmesi",
    "İşitsel rehabilitasyon",
    "İşitme cihazı bakımı",
    "İşitme sağlığı"
  ]
};

export function seoFor(path) {
  return PAGES[path] ?? NOT_FOUND;
}
