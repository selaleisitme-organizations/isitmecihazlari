import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'tr', label: 'Türkçe' },
    { code: 'en', label: 'English' },
    { code: 'ar', label: 'العربية' },
  ];

  const currentLang = i18n.resolvedLanguage || i18n.language || 'tr';

  useEffect(() => {
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLang;
  }, [currentLang]);

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    i18n.changeLanguage(selectedLanguage);
    localStorage.setItem('language', selectedLanguage);
  };

  return (
    <div className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 shadow-sm">
      <Globe size={18} className="text-gray-600" />
      <select
        value={currentLang}
        onChange={handleLanguageChange}
        aria-label="Select website language"
        className="cursor-pointer bg-transparent text-sm text-gray-800 outline-none"
      >
        {languages.map((language) => (
          <option key={language.code} value={language.code}>
            {language.label}
          </option>
        ))}
      </select>
    </div>
  );
}
