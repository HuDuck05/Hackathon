// Dummy data for the store list

type Store = {
  name: string;
  address: string;
  phone: string;
  hours: string;
  lat: number;
  lng: number;
  hasDiscount: boolean;
  image: string; // 🆕 画像URLを追加
};

export const storeData: Store[] = [
  // 🔹 東京の店舗
  { name: "東京エコフード 渋谷店", address: "東京都渋谷区渋谷1-1-1", phone: "03-1234-5678", hours: "9:00-22:00", lat: 35.6613, lng: 139.7034, hasDiscount: true, image: "/images/onigiri.png" },
  { name: "東京エコフード 新宿店", address: "東京都新宿区新宿2-2-2", phone: "03-2345-6789", hours: "10:00-21:00", lat: 35.6938, lng: 139.7034, hasDiscount: true, image: "/images/onigiri.png" },
  { name: "東京エコフード 池袋店", address: "東京都豊島区池袋3-3-3", phone: "03-3456-7890", hours: "9:00-23:00", lat: 35.728, lng: 139.7104, hasDiscount: false, image: "/images/onigiri.png" },
  { name: "東京エコフード 上野店", address: "東京都台東区上野4-5-6", phone: "03-1111-2222", hours: "10:00-20:00", lat: 35.7138, lng: 139.7770, hasDiscount: true, image: "/images/onigiri.png" },
  { name: "東京エコフード 銀座店", address: "東京都中央区銀座7-8-9", phone: "03-3333-4444", hours: "11:00-22:00", lat: 35.6717, lng: 139.7642, hasDiscount: false, image: "/images/onigiri.png" },

  // 🔹 千葉の店舗
  { name: "千葉エコフード 船橋店", address: "千葉県船橋市本町1-1-1", phone: "047-123-4567", hours: "9:00-21:00", lat: 35.694, lng: 139.982, hasDiscount: true, image: "/images/onigiri.png" },
  // 🔹 船橋周辺の5店舗
  { name: "千葉エコフード 船橋北口店", address: "千葉県船橋市本町2-2-2", phone: "047-411-2222", hours: "9:00-21:00", lat: 35.7014, lng: 139.9834, hasDiscount: true, image: "/images/onigiri.png" },
  { name: "千葉エコフード 船橋南口店", address: "千葉県船橋市本町3-3-3", phone: "047-422-3333", hours: "10:00-22:00", lat: 35.6987, lng: 139.9852, hasDiscount: false, image: "/images/onigiri.png" },
  { name: "千葉エコフード 西船橋店", address: "千葉県船橋市西船4-4-4", phone: "047-433-4444", hours: "8:30-20:30", lat: 35.7075, lng: 139.9608, hasDiscount: true, image: "/images/onigiri.png" },
  { name: "千葉エコフード 東船橋店", address: "千葉県船橋市東船橋5-5-5", phone: "047-444-5555", hours: "9:00-21:30", lat: 35.6992, lng: 140.0021, hasDiscount: true, image: "/images/onigiri.png" },
  { name: "千葉エコフード 南船橋店", address: "千葉県船橋市浜町1-6-1", phone: "047-455-6666", hours: "10:00-22:00", lat: 35.6817, lng: 139.9886, hasDiscount: false, image: "/images/onigiri.png" },
  { name: "千葉エコフード 津田沼店", address: "千葉県習志野市津田沼1-1-1", phone: "047-123-7777", hours: "9:00-21:00", lat: 35.6900, lng: 140.0180, hasDiscount: true, image: "/images/sakana.png" },
 // { name: "千葉エコフード 京成津田沼店", address: "千葉県習志野市津田沼2-2-2", phone: "047-234-8888", hours: "9:30-20:30", lat: 35.6830, lng: 140.0205, hasDiscount: false, image: "/images/yaoya.png" },
  { name: "千葉エコフード ミーナ津田沼店", address: "千葉県習志野市津田沼3-3-3", phone: "047-345-9999", hours: "10:00-22:00", lat: 35.6945, lng: 140.0160, hasDiscount: true, image: "/images/super_yakiimo_machine.png" },
  { name: "千葉エコフード モリシア津田沼店", address: "千葉県習志野市津田沼4-4-4", phone: "047-456-0000", hours: "8:30-20:30", lat: 35.6897, lng: 140.0143, hasDiscount: false, image: "/images/convenience_store_24.png" },
  { name: "千葉エコフード 谷津店", address: "千葉県習志野市谷津5-5-5", phone: "047-567-1111", hours: "9:00-21:30", lat: 35.6794, lng: 140.0172, hasDiscount: true, image: "/images/building_convenience_store3_notime.png" },
  { name: "千葉エコフード 奏の杜店", address: "千葉県習志野市奏の杜6-6-6", phone: "047-678-2222", hours: "10:00-22:00", lat: 35.6912, lng: 140.0125, hasDiscount: true, image: "/images/lawson.png" },
  { name: "千葉エコフード 新津田沼店", address: "千葉県習志野市津田沼7-7-7", phone: "047-789-3333", hours: "9:00-23:00", lat: 35.6948, lng: 140.0200, hasDiscount: false, image: "/images/building_convenience_store2_notime.png" },
  { name: "千葉エコフード パルコ店", address: "千葉県習志野市津田沼8-8-8", phone: "047-890-4444", hours: "8:00-20:00", lat: 35.6955, lng: 140.0155, hasDiscount: true, image: "/images/panya.png" },
  { name: "千葉エコフード 津田沼おにぎり店", address: "千葉県習志野市津田沼9-9-9", phone: "047-901-5555", hours: "7:00-21:00", lat: 35.6925, lng: 140.0178, hasDiscount: true, image: "/images/onigiri.png" },
  { name: "千葉エコフード 津田沼ピザ店", address: "千葉県習志野市津田沼10-10-10", phone: "047-902-6666", hours: "11:00-23:00", lat: 35.6932, lng: 140.0195, hasDiscount: false, image: "/images/pizza_store.png" },
];
