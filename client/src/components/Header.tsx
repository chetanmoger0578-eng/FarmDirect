import { ShoppingCart, Sprout, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
  userName?: string;
  onLogout?: () => void;
}

export function Header({ cartItemCount, onCartClick, userName, onLogout }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100">
              <Sprout className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h1 className="font-semibold">FarmDirect</h1>
              <p className="text-xs text-muted-foreground">Local farms to your table</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {userName && (
              <span className="text-sm text-muted-foreground">Welcome, {userName}</span>
            )}
            <Button variant="outline" className="relative" onClick={onCartClick}>
              <ShoppingCart className="w-4 h-4 mr-2" />
              Cart
              {cartItemCount > 0 && (
                <Badge className="ml-2 px-1.5 min-w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </Badge>
              )}
            </Button>
            {onLogout && (
              <Button variant="outline" onClick={onLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}