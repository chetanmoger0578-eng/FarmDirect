import { useState } from "react";
import { Package, ShoppingBag, TrendingUp, Plus, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { OrdersView } from "./farmer/OrdersView";
import { ProductsManagement } from "./farmer/ProductsManagement";
import { AnalyticsView } from "./farmer/AnalyticsView";
import { FarmProfileView } from "./farmer/FarmProfileView";

interface FarmerDashboardProps {
  userData: any;
  onLogout: () => void;
}

export function FarmerDashboard({ userData, onLogout }: FarmerDashboardProps) {
  const [activeTab, setActiveTab] = useState("orders");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-semibold">{userData.name}</h1>
              <p className="text-xs text-muted-foreground">Farmer Dashboard</p>
            </div>
            <Button variant="outline" onClick={onLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold text-muted-foreground">-</div>
              <p className="text-xs text-muted-foreground">No orders yet</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold text-muted-foreground">-</div>
              <p className="text-xs text-muted-foreground">Add products to get started</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold text-muted-foreground">-</div>
              <p className="text-xs text-muted-foreground">No revenue data yet</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="profile">Farm Profile</TabsTrigger>
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
    </div>
  );
}