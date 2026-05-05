import { useEffect, useState } from "react";
import styles from "./Contact.module.css";

export default function Contact() {
  const city = "New York";

  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${import.meta.env.VITE_OPENWEATHER_KEY}`
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Weather API error");
        }

        setWeather({
          temp: Math.round(data.main.temp),
          desc: data.weather[0].main,
          city: data.name,
          timezoneOffset: data.timezone,
        });

        setLoading(false);
      } catch (err) {
        console.error("Weather fetch failed:", err);
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  const formatTimezone = (offsetSeconds) => {
    if (offsetSeconds === undefined) return "—";
    const hours = offsetSeconds / 3600;
    return `UTC ${hours >= 0 ? "+" : ""}${hours}`;
  };

  const getLocalTime = () => {
    try {
      return new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "America/New_York",
      }).format(new Date());
    } catch {
      return "—";
    }
  };

  return (
    <footer className={styles.footer} id="contact">
      <div className={styles.left}>
        <img src="/assets/me.jpg" className={styles.avatar} alt="Alicia" />

        <div>
          <h2>Let's work together!</h2>
          <p className={styles.email}>a.t.huang@wustl.edu</p>
        </div>
      </div>

      <div className={styles.weatherCircle}>
        <span className={styles.cityOnly}>
          {weather?.city || city}
        </span>
      </div>

      <div className={styles.bottomInfo}>

        {/* time */}
        <div className={styles.infoCard}>
          <span className={styles.cardLabel}>Local Time</span>
          <span className={styles.cardValue}>
            {loading ? "..." : getLocalTime()}
          </span>
          <span className={styles.cardSub}>
            {loading ? "" : formatTimezone(weather?.timezoneOffset)}
          </span>
        </div>
        
        {/* weather */}
        <div className={styles.infoCard}>
          <span className={styles.cardLabel}>Weather</span>
          <span className={styles.cardValue}>
            {loading
              ? "..."
              : `${weather?.desc || "—"} · ${weather?.temp}°F`}
          </span>
        </div>
      </div>

      {/* BOTTOM ROW */}
      <div className={styles.bottom}>
        <span>Food enthusiast | Malatang lover</span>
        <span>© {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}