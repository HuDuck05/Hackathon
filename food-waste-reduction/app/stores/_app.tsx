import { useEffect } from "react";
import "@/styles/globals.css"; // グローバルスタイル（もしあれば）

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css";
    link.crossOrigin = "anonymous";
    document.head.appendChild(link);
  }, []);

  return <Component {...pageProps} />;
}