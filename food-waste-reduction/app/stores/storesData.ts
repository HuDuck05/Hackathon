// Dummy data for the store list

type Store = {
    name: string;
    address: string;
    phone: string;
    hours: string;
    lat: number;
    lng: number;
    hasDiscount: boolean;
  };
  
  export const storeData: Store[] = [
    { name: "東京エコフード 渋谷店", address: "東京都渋谷区渋谷1-1-1", phone: "03-1234-5678", hours: "9:00-22:00", lat: 35.6613, lng: 139.7034, hasDiscount: true },
    { name: "東京エコフード 新宿店", address: "東京都新宿区新宿2-2-2", phone: "03-2345-6789", hours: "10:00-21:00", lat: 35.6938, lng: 139.7034, hasDiscount: true },
    { name: "東京エコフード 池袋店", address: "東京都豊島区池袋3-3-3", phone: "03-3456-7890", hours: "9:00-23:00", lat: 35.728, lng: 139.7104, hasDiscount: false },
    { name: "千葉エコフード 船橋店", address: "千葉県船橋市本町1-1-1", phone: "047-123-4567", hours: "9:00-21:00", lat: 35.694, lng: 139.982, hasDiscount: true },
    { name: "千葉エコフード 千葉中央店", address: "千葉県千葉市中央区中央1-1-1", phone: "043-234-5678", hours: "10:00-20:00", lat: 35.6075, lng: 140.1065, hasDiscount: false },
    { name: "千葉エコフード 松戸店", address: "千葉県松戸市松戸1-1-1", phone: "047-345-6789", hours: "9:00-22:00", lat: 35.7835, lng: 139.9008, hasDiscount: true },
  ];