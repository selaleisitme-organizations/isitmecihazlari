
import { useEffect, useMemo, useState } from "react";
import "./RandevuForm.css";

const API_BASE = (import.meta.env.VITE_API_URL || "")
  .replace(/\/+$/, "");

const TIME_SLOTS = [
  "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "12:00", "12:30",
  "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30",
  "17:00", "17:30",
];

const TOPICS = [
  "İşitme testi",
  "İşitme cihazı danışmanlığı",
  "Cihaz ayarı / kontrolü",
  "Cihaz bakım ve servis",
  "Diğer",
];

function Icon({ name, size = 20, className = "" }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className,
    "aria-hidden": true,
  };

  const paths = {
    arrow: <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>,
    back: <><path d="M19 12H5"/><path d="m11 18-6-6 6-6"/></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 10h18"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    check: <><path d="m5 12 4 4L19 6"/></>,
    shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/></>,
    heart: <><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0l-1 1-1-1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/></>,
    sparkle: <><path d="m12 3 1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6L12 3Z"/></>,
  };

  return <svg {...common}>{paths[name] || paths.check}</svg>;
}

function turkeyToday() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Istanbul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());

  const values = Object.fromEntries(
    parts.map(({ type, value }) => [type, value])
  );

  return `${values.year}-${values.month}-${values.day}`;
}

function maxBookableDay(today) {
  const date = new Date(`${today}T12:00:00Z`);
  date.setUTCDate(date.getUTCDate() + 90);
  return date.toISOString().slice(0, 10);
}

function formatTurkishDate(day) {
  if (!day) return "Henüz seçilmedi";

  const date = new Date(`${day}T12:00:00Z`);
  return new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

const initialForm = {
  name: "",
  phone: "",
  email: "",
  age: "",
  topic: "",
  note: "",
};

export default function RandevuForm() {
  const today = turkeyToday();

  const [form, setForm] = useState(initialForm);
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");
  const [bookedTimes, setBookedTimes] = useState([]);
  const [availabilityState, setAvailabilityState] = useState("idle");
  const [availabilityError, setAvailabilityError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState("");
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [completed, setCompleted] = useState(null);

  const maxDay = useMemo(() => maxBookableDay(today), [today]);
  const busySet = useMemo(() => new Set(bookedTimes), [bookedTimes]);

  useEffect(() => {
    if (!day) {
      setBookedTimes([]);
      setAvailabilityState("idle");
      setAvailabilityError("");
      return;
    }

    if (!API_BASE) {
      setAvailabilityState("error");
      setAvailabilityError("Backend adresi tanımlanmamış.");
      return;
    }

    const controller = new AbortController();

    setAvailabilityState("loading");
    setAvailabilityError("");
    setBookedTimes([]);
    setTime("");

    async function loadTimes() {
      try {
        const response = await fetch(
          `${API_BASE}/api/appointments/booked?date=${encodeURIComponent(day)}`,
          { signal: controller.signal }
        );

        const json = await response.json().catch(() => ({}));

        if (!response.ok || !Array.isArray(json.times)) {
          throw new Error(
            json.error || "Uygun saatler şu anda alınamıyor."
          );
        }

        setBookedTimes(json.times);
        setAvailabilityState("ready");
      } catch (error) {
        if (error.name === "AbortError") return;

        setAvailabilityState("error");
        setAvailabilityError(
          error.message || "Saatler yüklenemedi."
        );
      }
    }

    loadTimes();
    return () => controller.abort();
  }, [day, reloadKey]);

  function updateField(event) {
    const { name, value } = event.target;

    setForm(current => ({
      ...current,
      [name]: value,
    }));

    setSubmitError("");
  }

  function changeDay(event) {
    setDay(event.target.value);
    setTime("");
    setSubmitError("");
  }

  function isInPast(selectedTime) {
    if (!day) return false;

    return new Date(
      `${day}T${selectedTime}:00+03:00`
    ).getTime() <= Date.now();
  }

  async function submit(event) {
    event.preventDefault();
    setSubmitError("");

    if (sending) return;

    if (
      !form.name.trim() ||
      !form.phone.trim() ||
      !form.email.trim()
    ) {
      setSubmitError(
        "Ad soyad, telefon ve e-posta alanlarını doldurun."
      );
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      setSubmitError("Geçerli bir e-posta adresi girin.");
      return;
    }

    const phoneDigits = form.phone.replace(/\D/g, "");

    if (phoneDigits.length < 10 || phoneDigits.length > 15) {
      setSubmitError("Geçerli bir telefon numarası girin.");
      return;
    }

    if (
      form.age !== "" &&
      (
        !Number.isInteger(Number(form.age)) ||
        Number(form.age) < 0 ||
        Number(form.age) > 120
      )
    ) {
      setSubmitError("Yaş 0 ile 120 arasında olmalıdır.");
      return;
    }

    if (
      !day ||
      !time ||
      availabilityState !== "ready" ||
      busySet.has(time) ||
      isInPast(time)
    ) {
      setSubmitError("Lütfen uygun bir tarih ve saat seçin.");
      return;
    }

    if (!consent) {
      setSubmitError(
        "Lütfen kişisel veri bilgilendirmesini okuyup onaylayın."
      );
      return;
    }

    const issue = [
      form.topic,
      form.note.trim()
    ].filter(Boolean).join(" — ");

    const payload = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      age: form.age === "" ? null : Number(form.age),
      issue: issue || "",
      date: day,
      time,
      website,
    };

    setSending(true);

    try {
      const response = await fetch(
        `${API_BASE}/api/appointments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload),
        }
      );

      const json = await response.json().catch(() => ({}));

      if (response.status === 409) {
        setTime("");
        setReloadKey(value => value + 1);
        setSubmitError(
          json.error || "Bu saat doldu. Başka bir saat seçin."
        );
        return;
      }

      if (!response.ok) {
        throw new Error(
          json.error || "Randevu talebiniz doğrulanamadı."
        );
      }

      setCompleted({
        name: form.name.trim(),
        day,
        time
      });
    } catch (error) {
      setSubmitError(
        `Talebinizin kaydedildiği doğrulanamadı. Tekrar göndermeden önce işletmeyle iletişime geçin. (${error.message})`
      );
    } finally {
      setSending(false);
    }
  }

  function startAgain() {
    setCompleted(null);
    setForm(initialForm);
    setDay("");
    setTime("");
    setBookedTimes([]);
    setConsent(false);
    setWebsite("");
    setSubmitError("");
  }

  return (
    <div className="sf-page">
      <div className="sf-orb sf-orb-one" aria-hidden="true" />
      <div className="sf-orb sf-orb-two" aria-hidden="true" />

      <header className="sf-header">
        <a
          href="https://www.selaleisitme.com/"
          className="sf-brand"
        >
          <span className="sf-brand-mark">
            <Icon name="heart" size={23} />
          </span>

          <span className="sf-brand-copy">
            <strong>Şelale İşitme</strong>
            <small>İşitme Cihazları Merkezi</small>
          </span>
        </a>

        <a
          className="sf-home-link"
          href="https://www.selaleisitme.com/"
        >
          <Icon name="back" size={16} />
          <span>Ana siteye dön</span>
        </a>
      </header>

      <main className="sf-layout">
        <section className="sf-intro">
          <span className="sf-eyebrow">
            <Icon name="sparkle" size={17} />
            ONLINE RANDEVU
          </span>

          <h1>
            Daha iyi duymak için <em>ilk adımı</em> atın.
          </h1>

          <p className="sf-intro-text">
            Size uygun günü ve saati seçin.
            Randevu talebinizi birkaç kolay adımda oluşturun.
          </p>

          <div className="sf-steps">
            <div className="sf-step">
              <span className="sf-step-icon">
                <Icon name="calendar" size={21} />
              </span>
              <span>
                <strong>01 · Tarihinizi seçin</strong>
                <small>Size uygun günü ve saati belirleyin.</small>
              </span>
            </div>

            <div className="sf-step">
              <span className="sf-step-icon">
                <Icon name="heart" size={21} />
              </span>
              <span>
                <strong>02 · Bilgilerinizi paylaşın</strong>
                <small>Kısa randevu talep formunu doldurun.</small>
              </span>
            </div>

            <div className="sf-step">
              <span className="sf-step-icon">
                <Icon name="check" size={21} />
              </span>
              <span>
                <strong>03 · Onay bekleyin</strong>
                <small>Ekibimiz randevunuzu değerlendirsin.</small>
              </span>
            </div>
          </div>

          <div className="sf-intro-footer">
            <Icon name="shield" size={18} />
            Bilgileriniz yalnızca randevu sürecinde kullanılır.
          </div>
        </section>

        <section className="sf-form-card">
          {completed ? (
            <div className="sf-success" role="status">
              <span className="sf-success-icon">
                <Icon name="check" size={39} />
              </span>

              <span className="sf-mini-kicker">
                TALEP ALINDI
              </span>

              <h2>Randevu talebiniz ulaştı!</h2>

              <p>
                Teşekkürler, <strong>{completed.name}</strong>.
                Talebiniz incelemeye alındı;
                randevunuz henüz kesinleşmedi.
              </p>

              <div className="sf-confirmation">
                <span>
                  <Icon name="calendar" size={17} />
                  {formatTurkishDate(completed.day)}
                </span>
                <span>
                  <Icon name="clock" size={17} />
                  {completed.time}
                </span>
              </div>

              <button
                type="button"
                className="sf-primary"
                onClick={startAgain}
              >
                Yeni randevu talebi
                <Icon name="arrow" size={19} />
              </button>

              <a
                className="sf-secondary-link"
                href="https://www.selaleisitme.com/"
              >
                Ana sayfaya dön
              </a>
            </div>
          ) : (
            <>
              <div className="sf-form-heading">
                <span className="sf-mini-kicker">
                  RANDEVU OLUŞTUR
                </span>
                <h2>Sizin için uygun zamanı bulalım.</h2>
                <p>Yıldızlı (*) alanlar zorunludur.</p>
              </div>

              <form className="sf-form" onSubmit={submit}>
                <div className="sf-section-heading">
                  <span>1</span>
                  <strong>İletişim bilgileriniz</strong>
                </div>

                <div className="sf-fields">
                  <label className="sf-field sf-field-wide">
                    <span>Ad Soyad *</span>
                    <input
                      name="name"
                      value={form.name}
                      onChange={updateField}
                      placeholder="Adınız ve soyadınız"
                      autoComplete="name"
                      maxLength={120}
                      required
                    />
                  </label>

                  <label className="sf-field">
                    <span>Telefon *</span>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={updateField}
                      placeholder="05XX XXX XX XX"
                      autoComplete="tel"
                      maxLength={24}
                      required
                    />
                  </label>

                  <label className="sf-field">
                    <span>E-posta *</span>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={updateField}
                      placeholder="ornek@mail.com"
                      autoComplete="email"
                      maxLength={180}
                      required
                    />
                  </label>

                  <label className="sf-field sf-age-field">
                    <span>Yaş (isteğe bağlı)</span>
                    <input
                      name="age"
                      type="number"
                      min="0"
                      max="120"
                      step="1"
                      value={form.age}
                      onChange={updateField}
                      placeholder="Örn. 32"
                    />
                  </label>

                  <label className="sf-field sf-topic-field">
                    <span>Başvuru konusu (isteğe bağlı)</span>
                    <select
                      name="topic"
                      value={form.topic}
                      onChange={updateField}
                    >
                      <option value="">Konu seçiniz</option>
                      {TOPICS.map(topic => (
                        <option key={topic} value={topic}>
                          {topic}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <div className="sf-section-heading sf-second">
                  <span>2</span>
                  <strong>Randevu tarihi ve saati</strong>
                </div>

                <div className="sf-date-label">
                  <Icon name="calendar" size={18} />
                  <span>Randevu günü *</span>
                </div>

                <input
                  className="sf-date-picker"
                  type="date"
                  min={today}
                  max={maxDay}
                  value={day}
                  onChange={changeDay}
                  required
                />

                <div className="sf-time-title">
                  <span>
                    <Icon name="clock" size={18} />
                    Uygun saatler *
                  </span>
                  <small>Türkiye saati (GMT+3)</small>
                </div>

                {!day && (
                  <p className="sf-hint">
                    Uygun saatleri görmek için önce tarih seçin.
                  </p>
                )}

                {day && availabilityState === "loading" && (
                  <p className="sf-hint">
                    Uygun saatler kontrol ediliyor...
                  </p>
                )}

                {day && availabilityState === "error" && (
                  <div className="sf-inline-error">
                    {availabilityError}
                    <button
                      type="button"
                      onClick={() => setReloadKey(x => x + 1)}
                    >
                      Tekrar dene
                    </button>
                  </div>
                )}

                {day && availabilityState === "ready" && (
                  <div className="sf-time-grid">
                    {TIME_SLOTS.map(slot => {
                      const unavailable =
                        busySet.has(slot) || isInPast(slot);

                      return (
                        <button
                          key={slot}
                          type="button"
                          disabled={unavailable}
                          aria-pressed={time === slot}
                          className={
                            `sf-time ${
                              time === slot ? "sf-time-selected" : ""
                            }`
                          }
                          onClick={() => {
                            setTime(slot);
                            setSubmitError("");
                          }}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                )}

                {day && availabilityState === "ready" && (
                  <div className="sf-time-legend">
                    <span>
                      <i className="sf-dot sf-dot-free" />
                      Uygun
                    </span>
                    <span>
                      <i className="sf-dot sf-dot-full" />
                      Dolu / geçmiş
                    </span>
                  </div>
                )}

                <label className="sf-field sf-note">
                  <span>Ek not (isteğe bağlı)</span>
                  <textarea
                    name="note"
                    value={form.note}
                    onChange={updateField}
                    maxLength={350}
                    rows={3}
                    placeholder="Eklemek istediğiniz kısa bir not varsa yazabilirsiniz."
                  />
                </label>

                <div className="sf-honeypot" aria-hidden="true">
                  <label htmlFor="sf-website">Website</label>
                  <input
                    id="sf-website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={website}
                    onChange={event =>
                      setWebsite(event.target.value)
                    }
                  />
                </div>

                <div className="sf-privacy">
                  <label className="sf-consent">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={event =>
                        setConsent(event.target.checked)
                      }
                    />
                    <span>
                      Randevu talebime ilişkin kişisel veri
                      bilgilendirmesini okudum. *
                    </span>
                  </label>

                  <p>
                    İlettiğiniz bilgiler randevu talebinizi
                    değerlendirmek ve sizinle iletişime geçmek
                    için kullanılır. Yayın öncesinde kurumun
                    KVKK aydınlatma metni buraya bağlanmalıdır.
                  </p>
                </div>

                {submitError && (
                  <div
                    role="alert"
                    className="sf-submit-error"
                  >
                    {submitError}
                  </div>
                )}

                <button
                  type="submit"
                  className="sf-primary"
                  disabled={
                    sending ||
                    availabilityState !== "ready" ||
                    !time ||
                    !consent
                  }
                >
                  {sending
                    ? "Talebiniz gönderiliyor..."
                    : "Randevu Talebi Gönder"}

                  {!sending && (
                    <Icon name="arrow" size={19} />
                  )}
                </button>

                <p className="sf-bottom-note">
                  <Icon name="shield" size={16} />
                  Randevu, işletme tarafından onaylandığında kesinleşir.
                </p>
              </form>
            </>
          )}
        </section>
      </main>

      <footer className="sf-footer">
        © {new Date().getFullYear()} Şelale İşitme Cihazları
        · Sağlıklı iletişime bir adım daha yakın.
      </footer>
    </div>
  );
}
