import { X, Menu, Phone, MapPin, Headphones } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Tone from "tone";
import SEO from '../components/SEO'; 

export default function OnlineTest() { 
  const { t } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navLinks = [
    { to: "/", label: t("navigation.home"), active: false },
    { to: "/randevu", label: t("navigation.appointment"), active: false },
    { to: "/terapi-programi", label: t("navigation.rehabilitation"), active: false },
    { to: "/urun-katalogu", label: t("navigation.productCatalog"), active: false },
    { to: "/odeme-planlari", label: t("navigation.sgk"), active: false },
    { to: "/audio-servis", label: t("navigation.phoneApp"), active: false },
    { to: "/hakkimizda", label: t("navigation.about"), active: false }, 
    { to: "/online-test", label: t("navigation.freeHearingTest"), active: true }, 
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MedicalTest",
    "name": "Online İşitme Testi",
    "description": "Ücretsiz online işitme kaybı testi. 6 farklı frekansta işitme eşiğinizi ölçün.",
    "usedToDiagnose": {
      "@type": "MedicalCondition",
      "name": "İşitme Kaybı"
    }
  };

  const [step, setStep] = useState(0);
  const [ear, setEar] = useState("left");
  const [frequencyIndex, setFrequencyIndex] = useState(0);
  const [volume, setVolume] = useState(-10);
  const [result, setResult] = useState({ left: [], right: [] });
  const [playing, setPlaying] = useState(false);
  const [testDone, setTestDone] = useState(false);
  const [headphonesChecked, setHeadphonesChecked] = useState(false);

  const frequencies = [250, 500, 1000, 2000, 4000, 8000];
  const dbLevels = [-10, 0, 25, 30, 40, 45, 55, 75, 90, 95];

  const snapToNearestLevel = (val) => {
    return dbLevels.reduce((prev, curr) => 
      Math.abs(curr - val) < Math.abs(prev - val) ? curr : prev
    );
  };

  const playTone = async () => {
    try {
      await Tone.start();
      const panner = new Tone.Panner(ear === "left" ? -1 : 1).toDestination();
      const synth = new Tone.Oscillator(frequencies[frequencyIndex], "sine").connect(panner);
      const toneVolume = volume - 95;
      synth.volume.value = toneVolume;
      
      synth.start();
      setPlaying(true);
      
      setTimeout(() => {
        synth.stop();
        synth.dispose();
        panner.dispose();
        setPlaying(false);
      }, 1500);
    } catch (error) {
      console.error("Error playing tone:", error);
      setPlaying(false);
    }
  };

  const handleContinue = () => {
    if (frequencyIndex < frequencies.length - 1) {
      setResult((prev) => ({
        ...prev,
        [ear]: [...prev[ear], { freq: frequencies[frequencyIndex], vol: volume }],
      }));
      setFrequencyIndex((prev) => prev + 1);
      setVolume(-10);
    } else if (ear === "left") {
      setResult((prev) => ({
        ...prev,
        left: [...prev.left, { freq: frequencies[frequencyIndex], vol: volume }],
      }));
      setEar("right");
      setFrequencyIndex(0);
      setVolume(-10);
    } else {
      setResult((prev) => ({
        ...prev,
        right: [...prev.right, { freq: frequencies[frequencyIndex], vol: volume }],
      }));
      setTestDone(true);
    }
  };

  const getHearingAssessment = (dbValue) => {
    if (dbValue >= -10 && dbValue <= 25) return { level: t("onlineTest.results.normal"), color: "text-green-600" };
    if (dbValue >= 26 && dbValue <= 40) return { level: t("onlineTest.results.possibleHearingLoss"), color: "text-yellow-600" };
    if (dbValue >= 41 && dbValue <= 55) return { level: t("onlineTest.results.hearingLoss"), color: "text-orange-500" };
    if (dbValue >= 56 && dbValue <= 90) return { level: t("onlineTest.results.advancedHearingLoss"), color: "text-red-600" };
    return { level: t("onlineTest.results.veryAdvancedHearingProblem"), color: "text-red-800" };
  };

  const hasAnyHearingLoss = (earResults) => {
    return earResults.some(r => r.vol > 25);
  };

  const checkAsymmetricLoss = () => {
    const leftAvg = calculateAverageHearing(result.left);
    const rightAvg = calculateAverageHearing(result.right);
    return Math.abs(leftAvg - rightAvg) >= 16;
  };

  const calculateAverageHearing = (earResults) => {
    if (!earResults || earResults.length === 0) return 0;
    const avg = earResults.reduce((sum, r) => sum + r.vol, 0) / earResults.length;
    return Math.round(avg);
  };

  const earLabel = ear === "left" ? t("onlineTest.instructions.leftEar") : t("onlineTest.instructions.rightEar");

  return (
    <>
      <SEO 
        title="Ücretsiz Online İşitme Testi | Şelale İşitme Merkezi Sarıyer İstanbul"
        description="İstanbul Sarıyer'de ücretsiz online işitme testi. İşitme kaybı testi, odyogram, işitme cihazı danışmanlığı. Hemen test olun, randevu alın. ☎️ 0532 275 24 14"
        keywords="işitme testi, çevrimiçi işitme testi, online işitme testi, ücretsiz işitme testi, işitme kaybı testi, odyogram, işitme cihazı, Sarıyer işitme merkezi, İstanbul işitme testi, işitme problemi, kulak testi, hearing test turkey, hearing test"
        ogImage="/images/IC.png"
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

        {/* Ana İçerik */}
        <section className="max-w-3xl mx-auto my-12 px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-8">
            {t("onlineTest.pageTitle")}
          </h1>
          {!headphonesChecked && step === 0 && (
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-8 mb-8">
              <Headphones className="w-16 h-16 text-blue-900 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-blue-900 mb-4">
                {t("onlineTest.headphoneCheck.title")}
              </h2>
              <p className="text-gray-700 mb-6">
                {t("onlineTest.headphoneCheck.description")}
              </p>
              <div className="bg-white rounded-lg p-4 mb-6 text-left">
                <h3 className="font-semibold mb-2">{t("onlineTest.headphoneCheck.checklistTitle")}</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>{t("onlineTest.headphoneCheck.checklist.headphones")}</li>
                  <li>{t("onlineTest.headphoneCheck.checklist.quietEnvironment")}</li>
                  <li>{t("onlineTest.headphoneCheck.checklist.volume")}</li>
                  <li>{t("onlineTest.headphoneCheck.checklist.listenCarefully")}</li>
                </ul>
              </div>
              <button
                className="bg-blue-900 text-white px-8 py-3 rounded-lg hover:bg-blue-800 font-semibold cursor-pointer"
                onClick={() => setHeadphonesChecked(true)}
              >
                {t("onlineTest.headphoneCheck.startButton")}
              </button>
            </div>
          )}

          {headphonesChecked && !testDone && (
            <>
              {step === 0 && (
                <div>
                  <h2 className="text-2xl font-semibold text-blue-900 mb-4">
                    {t("onlineTest.instructions.earTestTitle", { ear: earLabel })}
                  </h2>
                  <p className="text-gray-600 mb-6">
                    {t("onlineTest.instructions.description", { count: frequencies.length })}
                  </p>
                  <button
                    className="bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-800 cursor-pointer"
                    onClick={() => setStep(1)}
                  >
                    {t("onlineTest.instructions.startButton")}
                  </button>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-6">
                  <div className="bg-blue-50 rounded-lg p-4 mb-4">
                    <h3 className="text-2xl font-semibold text-blue-900">
                      {earLabel} – {frequencies[frequencyIndex]} Hz
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                      {t("onlineTest.instructions.frequencyLabel", { current: frequencyIndex + 1, total: frequencies.length })}
                    </p>
                  </div>
                  
                  <p className="text-gray-600">
                    {t("onlineTest.instructions.volumeInstruction")}
                  </p>

                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-blue-900">{volume} {t("onlineTest.instructions.volumeUnit")}</span>
                    </div>

                    <div className="flex items-center justify-center gap-4 mb-4">
                      <button 
                        type="button"
                        className="flex items-center justify-center text-3xl font-bold w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer" 
                        onClick={() => {
                          const newVol = Math.max(-10, volume - 5);
                          setVolume(newVol);
                        }}
                      >
                        <span className="leading-none">−</span>
                      </button>
                      
                      <div className="flex-1 px-4">
                        <div className="w-full h-3 bg-gray-200 rounded-full relative overflow-hidden">
                          <div 
                            className="h-full bg-blue-900 rounded-full transition-all duration-200"
                            style={{
                              width: `${((volume + 10) / 105) * 100}%`
                            }}
                          />
                        </div>
                      </div>
                      
                      <button 
                        type="button"
                        className="flex items-center justify-center text-3xl font-bold w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer" 
                        onClick={() => {
                          const newVol = Math.min(95, volume + 5);
                          setVolume(newVol);
                        }}
                      >
                        <span className="leading-none">+</span>
                      </button>
                    </div>

                    <div className="flex justify-center gap-6 mt-6">
                      <button 
                        onClick={playTone} 
                        disabled={playing} 
                        className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold cursor-pointer"
                      >
                        {playing ? t("onlineTest.instructions.playingButton") : t("onlineTest.instructions.playButton")}
                      </button>

                      <button 
                        onClick={handleContinue} 
                        className="bg-blue-900 text-white px-8 py-3 rounded-lg hover:bg-blue-800 font-semibold cursor-pointer"
                      >
                        {t("onlineTest.instructions.continueButton")}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {testDone && (
            <div className="mt-10">
              <h2 className="text-3xl font-bold text-green-600 mb-6">{t("onlineTest.results.completedTitle")}</h2>
              
              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4 mb-8">
                <p className="text-gray-700 font-semibold">
                  {t("onlineTest.results.disclaimer")}
                </p>
              </div>

              {(hasAnyHearingLoss(result.left) || hasAnyHearingLoss(result.right)) && (
                <div className="bg-orange-50 border-2 border-orange-300 rounded-lg p-4 mb-6">
                  <p className="text-orange-800 font-semibold mb-3">
                    {t("onlineTest.results.possibleLossWarning")}
                  </p>
                  <button
                    onClick={() => window.location.href = '/randevu'}
                    className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 font-semibold transition-all cursor-pointer"
                  >
                    {t("onlineTest.results.appointmentButton")}
                  </button>
                </div>
              )}

              {checkAsymmetricLoss() && (
                <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 mb-6">
                  <p className="text-red-800 font-semibold mb-3">
                    {t("onlineTest.results.asymmetryWarning")}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4 text-blue-900">{t("onlineTest.results.leftEar")}</h3>
                  <div className="space-y-2 text-left">
                    {result.left.map((r, i) => {
                      const assessment = getHearingAssessment(r.vol);
                      return (
                        <div key={i} className="flex justify-between items-center bg-white rounded p-2">
                          <span className="font-medium">{r.freq} Hz</span>
                          <span className={`font-bold ${assessment.color}`}>{r.vol} {t("onlineTest.instructions.volumeUnit")}</span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-4 pt-4 border-t-2 border-blue-200">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">{t("onlineTest.results.averageThreshold")}</span>
                      <span className={`font-bold text-lg ${getHearingAssessment(calculateAverageHearing(result.left)).color}`}>
                        {calculateAverageHearing(result.left)} {t("onlineTest.instructions.volumeUnit")}
                      </span>
                    </div>
                    <p className={`text-sm mt-2 ${getHearingAssessment(calculateAverageHearing(result.left)).color}`}>
                      {getHearingAssessment(calculateAverageHearing(result.left)).level}
                    </p>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4 text-blue-900">{t("onlineTest.results.rightEar")}</h3>
                  <div className="space-y-2 text-left">
                    {result.right.map((r, i) => {
                      const assessment = getHearingAssessment(r.vol);
                      return (
                        <div key={i} className="flex justify-between items-center bg-white rounded p-2">
                          <span className="font-medium">{r.freq} Hz</span>
                          <span className={`font-bold ${assessment.color}`}>{r.vol} {t("onlineTest.instructions.volumeUnit")}</span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-4 pt-4 border-t-2 border-blue-200">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">{t("onlineTest.results.averageThreshold")}</span>
                      <span className={`font-bold text-lg ${getHearingAssessment(calculateAverageHearing(result.right)).color}`}>
                        {calculateAverageHearing(result.right)} {t("onlineTest.instructions.volumeUnit")}
                      </span>
                    </div>
                    <p className={`text-sm mt-2 ${getHearingAssessment(calculateAverageHearing(result.right)).color}`}>
                      {getHearingAssessment(calculateAverageHearing(result.right)).level}
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => window.location.href = '/randevu'}
                className="mb-8 bg-blue-900 text-white px-8 py-3 rounded-lg hover:bg-blue-800 font-semibold text-lg shadow-lg hover:shadow-xl transition-all cursor-pointer"
              >
                {t("onlineTest.results.professionalAppointmentButton")}
              </button>

              <div className="bg-white rounded-lg shadow-md p-6 text-left">
                <h3 className="text-lg font-semibold mb-3 text-blue-900">{t("onlineTest.results.hearingLevelsTitle")}</h3>
                <ul className="space-y-2 text-sm">
                  <li><span className="text-green-600 font-semibold">{t("onlineTest.results.levels.normal")}</span></li>
                  <li><span className="text-yellow-600 font-semibold">{t("onlineTest.results.levels.mild")}</span></li>
                  <li><span className="text-orange-500 font-semibold">{t("onlineTest.results.levels.moderate")}</span></li>
                  <li><span className="text-red-600 font-semibold">{t("onlineTest.results.levels.advanced")}</span></li>
                  <li><span className="text-red-800 font-semibold">{t("onlineTest.results.levels.veryAdvanced")}</span></li>
                </ul>
              </div>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
