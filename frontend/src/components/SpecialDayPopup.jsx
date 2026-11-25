import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./SpecialDayPopup.css";

/**
 * Popup that appears on pre‑defined special dates.
 * Dates and messages are stored in the i18n translation files under the key "specialDays".
 * The component shows the popup only once per browser session.
 */
export default function SpecialDayPopup() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    // Do not show again in the same session
    if (sessionStorage.getItem("specialDaySeen")) return;

    const today = new Date();
    const month = today.getMonth() + 1; // 1‑12
    const day = today.getDate();

    // Pull the array from the translation file (returnObjects:true returns the raw array)
    const days = t("specialDays", { returnObjects: true });
    if (!Array.isArray(days)) return;

    const todaySpecial = days.find(d => d.month === month && d.day === day);
    if (todaySpecial) {
      setMsg(todaySpecial.msg);
      setVisible(true);
      sessionStorage.setItem("specialDaySeen", "true");
    }
  }, [t]);

  if (!visible) return null;

  return (
    <div className="special-overlay">
      <div className="special-modal">
        <p>{msg}</p>
        <button onClick={() => setVisible(false)}>
          {t("specialDayClose", "Kapat")}
        </button>
      </div>
    </div>
  );
}

