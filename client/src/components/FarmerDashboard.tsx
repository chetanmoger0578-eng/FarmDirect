import { useState } from "react";
import { Package, ShoppingBag, TrendingUp, Plus, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { OrdersView } from "./farmer/OrdersView";
import { ProductsManagement } from "./farmer/ProductsManagement";
import { AnalyticsView } from "./farmer/AnalyticsView";
import { FarmProfileView } from "./farmer/FarmProfileView";
import { useLanguage } from "../contexts/LanguageContext";
import { Language } from "../lib/translations";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { AIAssistant } from "./AIAssistant";

interface FarmerDashboardProps {
  userData: any;
  onLogout: () => void;
}

export function FarmerDashboard({ userData, onLogout }: FarmerDashboardProps) {
  const [activeTab, setActiveTab] = useState("orders");
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-semibold">{userData.name}</h1>
              <p className="text-xs text-muted-foreground">{t.farmerDashboard}</p>
            </div>
            <div className="flex items-center gap-3">
              <ToggleGroup type="single" value={language} onValueChange={(val: Language) => val && setLanguage(val)} className="bg-white rounded-full p-1 shadow-md border border-green-100 hidden md:flex">
                <ToggleGroupItem value="en" className="rounded-full px-3 py-1 data-[state=on]:bg-green-600 data-[state=on]:text-white text-xs font-bold">EN</ToggleGroupItem>
                <ToggleGroupItem value="hi" className="rounded-full px-3 py-1 data-[state=on]:bg-green-600 data-[state=on]:text-white text-xs font-bold">HI</ToggleGroupItem>
                <ToggleGroupItem value="kn" className="rounded-full px-3 py-1 data-[state=on]:bg-green-600 data-[state=on]:text-white text-xs font-bold">KN</ToggleGroupItem>
              </ToggleGroup>
              <Button variant="outline" onClick={onLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                {t.logout}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t.totalOrders}</CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold text-muted-foreground">-</div>
              <p className="text-xs text-muted-foreground">{t.noOrdersYet}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t.activeProducts}</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold text-muted-foreground">-</div>
              <p className="text-xs text-muted-foreground">{t.addProductsToStart}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t.revenue}</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold text-muted-foreground">-</div>
              <p className="text-xs text-muted-foreground">{t.noRevenueDataYet}</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="orders">{t.orders}</TabsTrigger>
            <TabsTrigger value="products">{t.products}</TabsTrigger>
            <TabsTrigger value="analytics">{t.analytics}</TabsTrigger>
            <TabsTrigger value="profile">{t.farmProfile}</TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="mt-6">
            <OrdersView />
          </TabsContent>

          <TabsContent value="products" className="mt-6">
            <ProductsManagement farmerId={userData.id} />
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <AnalyticsView />
          </TabsContent>

          <TabsContent value="profile" className="mt-6">
            <FarmProfileView userData={userData} />
          </TabsContent>
        </Tabs>
      </div>
      <AIAssistant />
    </div>
  );
}