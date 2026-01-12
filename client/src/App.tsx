import { useState, useEffect } from "react";
import { Search, Loader2 } from "lucide-react";
import { Header } from "./components/Header";
import { ProductCard } from "./components/ProductCard";
import { FarmerCard } from "./components/FarmerCard";
import { CartSidebar } from "./components/CartSidebar";
import { CheckoutDialog } from "./components/CheckoutDialog";
import { FarmerDialog } from "./components/FarmerDialog";
import { LoginPage } from "./components/LoginPage";
import { FarmerDashboard } from "./components/FarmerDashboard";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { categories } from "./lib/constants";
import { getFarmers, getProducts } from "./lib/api";
import { Product, Farmer, CartItem } from "./types";
import { toast } from "sonner";
import { useLanguage } from "./contexts/LanguageContext";
import { Language } from "./lib/translations";
import { ToggleGroup, ToggleGroupItem } from "./components/ui/toggle-group";
import { AIAssistant } from "./components/AIAssistant";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<"customer" | "farmer" | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedFarmer, setSelectedFarmer] = useState<Farmer | null>(null);
  const [isFarmerDialogOpen, setIsFarmerDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [fetchedFarmers, fetchedProducts] = await Promise.all([
          getFarmers(),
          getProducts() // Fetch all products initially for client-side filtering
        ]);
        setFarmers(fetchedFarmers);
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        toast.error("Failed to connect to server. Please ensure backend is running.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleLogin = (type: "customer" | "farmer", data: any) => {
    setUserType(type);
    setUserData(data);
    setIsLoggedIn(true);
    toast.success(`Welcome, ${data.name}!`);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserType(null);
    setUserData(null);
    setCartItems([]);
    toast.success("Logged out successfully");
  };

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.product.id === product.id);
      if (existingItem) {
        toast.success(`Updated ${product.name} quantity`);
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      toast.success(`Added ${product.name} to cart`);
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity === 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    toast.success("Item removed from cart");
  };

  const handleFarmerClick = (farmer: Farmer) => {
    setSelectedFarmer(farmer);
    setIsFarmerDialogOpen(true);
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.farmerName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  // Show Farmer Dashboard for farmers
  if (userType === "farmer") {
    return <FarmerDashboard userData={userData} onLogout={handleLogout} />;
  }

  // Show Customer Marketplace for customers
  return (
    <div className="min-h-screen bg-background">
      <Header
        cartItemCount={cartItemCount}
        onCartClick={() => setIsCartOpen(true)}
        userName={userData?.name}
        onLogout={handleLogout}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-green-50 to-background py-12 md:py-16 relative">
        <div className="absolute top-4 right-4 z-40 hidden md:block">
          <ToggleGroup type="single" value={language} onValueChange={(val: Language) => val && setLanguage(val)} className="bg-white rounded-full p-1 shadow-md border border-green-100">
            <ToggleGroupItem value="en" className="rounded-full px-3 py-1 data-[state=on]:bg-green-600 data-[state=on]:text-white text-xs font-bold">EN</ToggleGroupItem>
            <ToggleGroupItem value="hi" className="rounded-full px-3 py-1 data-[state=on]:bg-green-600 data-[state=on]:text-white text-xs font-bold">HI</ToggleGroupItem>
            <ToggleGroupItem value="kn" className="rounded-full px-3 py-1 data-[state=on]:bg-green-600 data-[state=on]:text-white text-xs font-bold">KN</ToggleGroupItem>
          </ToggleGroup>
        </div>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              {t.heroTitle}
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              {t.heroSubtitle}
            </p>
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder={t.searchPlaceholder}
                className="pl-10 h-12"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="products" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="products">{t.browseProducts}</TabsTrigger>
              <TabsTrigger value="farmers">{t.meetFarmers}</TabsTrigger>
            </TabsList>

            <TabsContent value="products" className="space-y-6">
              {/* Category Filters */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category === "All" ? t.all : category}
                  </Button>
                ))}
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">{t.noProductsFound}</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="farmers" className="space-y-6">
              <div>
                <h3 className="font-semibold text-xl mb-4">{t.localFarmers}</h3>
                <p className="text-muted-foreground mb-6">
                  {t.farmersDescription}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {farmers.map((farmer) => (
                  <FarmerCard
                    key={farmer.id}
                    farmer={farmer}
                    onClick={() => handleFarmerClick(farmer)}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t mt-16 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold mb-3">{t.aboutFarmDirect}</h4>
              <p className="text-sm text-muted-foreground">
                {t.aboutDescription}
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">{t.forFarmers}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>{t.listProducts}</li>
                <li>{t.reachCustomers}</li>
                <li>{t.growBusiness}</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">{t.contact}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>support@farmdirect.com</li>
                <li>(555) 987-6543</li>
                <li>Mon-Sat: 8am-6pm</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p className="mb-2">© 2026 {t.title}. {t.rightsReserved}</p>
            <p>{t.createdBy} <span className="font-semibold text-green-700">{t.teamInnovators}</span></p>
          </div>
        </div>
      </footer>

      {/* Cart Sidebar */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => {
          if (userType !== "customer") {
            toast.error("Please login as a customer to place orders");
            return;
          }
          setIsCheckoutOpen(true);
        }}
      />

      {/* Checkout Dialog */}
      <CheckoutDialog
        open={isCheckoutOpen}
        onOpenChange={setIsCheckoutOpen}
        cartItems={cartItems}
        totalAmount={cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0) + 50}
        customerEmail={userData?.email || ""}
        customerName={userData?.name || ""}
        onOrderSuccess={() => {
          setCartItems([]);
          setIsCartOpen(false);
          toast.success("Order placed successfully!");
        }}
      />

      <FarmerDialog
        farmer={selectedFarmer}
        isOpen={isFarmerDialogOpen}
        onClose={() => setIsFarmerDialogOpen(false)}
      />
      <AIAssistant />
    </div>
  );
}