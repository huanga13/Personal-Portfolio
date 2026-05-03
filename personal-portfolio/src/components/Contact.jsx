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
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_OPENWEATHER_KEY}`
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Weather API error");
        }

        setWeather({
          temp: Math.round(data.main.temp),
          desc: data.weather[0].main,
          city: data.name,
          timezoneOffset: data.timezone, // seconds offset from UTC
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

  return (
    <footer className={styles.footer} id="contact">
      <div className={styles.left}>
        <img src="/assets/me.jpg" className={styles.avatar} alt="Alicia" />

        <div>
          <h2>Let's work together!</h2>
          <p className={styles.email}>a.t.huang@wustl.edu</p>

          {/* EMAIL BLOCK */}
          <div className={styles.infoBlock}>
            <span className={styles.label}>Email</span>
            <span className={styles.value}>a.t.huang@wustl.edu</span>
          </div>

          {/* TIMEZONE BLOCK */}
          <div className={styles.infoBlock}>
            <span className={styles.label}>Timezone</span>
            <span className={styles.value}>
              {loading ? "Loading..." : formatTimezone(weather?.timezoneOffset)}
            </span>
          </div>

          {/* CONDITIONS BLOCK */}
          <div className={styles.infoBlock}>
            <span className={styles.label}>Conditions</span>
            <span className={styles.value}>
              {loading ? "Loading..." : weather?.desc || "—"}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.weatherCircle}>
        {loading ? (
          <p>Loading...</p>
        ) : weather ? (
          <>
            <span className={styles.temp}>{weather.temp}°</span>
            <span className={styles.city}>{weather.city}</span>
            <span className={styles.desc}>{weather.desc}</span>
          </>
        ) : (
          <p>Weather unavailable</p>
        )}
      </div>

      <div className={styles.bottom}>
        <span>AI/LLM enthusiast | Web3 builder</span>
        <span>© {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}