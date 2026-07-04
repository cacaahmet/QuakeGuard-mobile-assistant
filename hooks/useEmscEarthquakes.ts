import { useEffect, useState } from "react";

const EMSC_URL =
  "https://www.seismicportal.eu/fdsnws/event/1/query?format=json&limit=50";

export default function useEmscEarthquakes() {
  const [earthquakes, setEarthquakes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("EMSC HOOK ÇALIŞTI");

    const fetchEarthquakes = async () => {
      try {
        const response = await fetch(EMSC_URL);
        const data = await response.json();
        setEarthquakes(data.features);
      } catch (error) {
        console.log("EMSC API Hatası:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEarthquakes();
  }, []);

  return { earthquakes, loading };
}