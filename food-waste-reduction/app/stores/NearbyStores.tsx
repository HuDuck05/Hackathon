// NearbyStores.tsx

"use client";

import { useEffect, useState } from "react";
import { getDistance } from "./getDistance";
import { storeData } from "./storesData";

type Store = {
  name: string;
  address: string;
  phone: string;
  hours: string;
  lat: number;
  lng: number;
  distance: number;
  hasDiscount: boolean;
};

export default function NearbyStores({ onUpdateStores }: { onUpdateStores: (stores: Store[]) => void }) {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        if (result.state === "denied") {
          setError("位置情報の取得が許可されていません。ブラウザの設定を確認してください。");
          return;
        }
      });

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const storeDistances = storeData.map((store) => ({
            ...store,
            distance: getDistance(latitude, longitude, store.lat, store.lng),
          }));

          storeDistances.sort((a, b) => a.distance - b.distance);
          onUpdateStores(storeDistances);
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            setError("位置情報の取得が許可されていません。ブラウザの設定を確認してください。");
          } else if (error.code === error.POSITION_UNAVAILABLE) {
            setError("デバイスの位置情報が利用できません。");
          } else if (error.code === error.TIMEOUT) {
            setError("位置情報の取得に時間がかかりすぎました。もう一度お試しください。");
          } else {
            setError("現在地を取得できませんでした。");
          }
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    }
  }, [onUpdateStores]);

  return error ? <p className="text-red-500">{error}</p> : null;
}