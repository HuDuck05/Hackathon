// page.tsx

"use client";

import { useState } from "react";
import { MapPin, Search, Phone, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import NearbyStores from "./NearbyStores";

export default function StoresPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [stores, setStores] = useState([]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12">
      <div className="container">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">店舗検索</h1>
          <div className="relative max-w-xl">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="店舗名や地域で検索"
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <NearbyStores onUpdateStores={setStores} />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stores.map((store: any, i: number) => (
            <Card key={i} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{store.name}</span>
                  {store.hasDiscount && <Badge className="bg-red-500">セール中</Badge>}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-1" />
                  <div>
                    <p>{store.address}</p>
                    <p className="text-sm text-muted-foreground">約{store.distance.toFixed(2)} km</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <p>{store.phone}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <p>{store.hours}</p>
                </div>
                <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600">
                  この店舗の商品を見る
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}