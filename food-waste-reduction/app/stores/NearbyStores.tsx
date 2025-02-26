// NearbyStores.tsx

"use client";

import { useEffect, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { storeData } from "./storesData";

const NAVBAR_HEIGHT = 60; // ナビバーの高さがわかっているなら、定数として宣言

const containerStyle = {
  width: "100vw",
  height: `calc(100vh - ${NAVBAR_HEIGHT}px)`, // ナビバーを除いた高さ
  position: "absolute",
  top: `${NAVBAR_HEIGHT}px`, // ナビバーの下から配置
  left: "0",
};

const defaultCenter = { lat: 35.6895, lng: 139.6917 }; // 東京をデフォルト

export default function NearbyStores() {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  // Google Maps API のロード
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey ?? "",
  });

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
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
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
      );
    }
  }, []);

  if (!isLoaded) return <p>マップを読み込み中...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={userLocation || defaultCenter} zoom={14}>
      {/* 🔹 ユーザーの現在地を青い固定サイズのマーカーに変更 */}
      {userLocation && (
        <Marker
          position={userLocation}
          icon={{
            // 🔹 変更: `google` を直接参照するとエラーが出るため、isLoaded をチェックしてから使用
            url:
              "data:image/svg+xml;charset=UTF-8," +
              encodeURIComponent(`
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
                  <circle cx="25" cy="25" r="12" fill="#4285F4" stroke="white" stroke-width="3"/>
                </svg>
              `),
            scaledSize: isLoaded ? new window.google.maps.Size(50, 50) : undefined, // 🔹 修正: `window.google` に変更
            anchor: isLoaded ? new window.google.maps.Point(25, 25) : undefined, // 🔹 修正: `window.google` に変更
          }}
        />
      )}

      {/* 店舗の位置（赤いピン） */}
      {storeData.map((store, index) => (
        <Marker
          key={index}
          position={{ lat: store.lat, lng: store.lng }}
          icon={{
            url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
          }}
        />
      ))}
    </GoogleMap>
  );
}