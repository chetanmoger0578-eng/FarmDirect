import { useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";

interface CheckoutDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    cartItems: any[];
    totalAmount: number;
    onOrderSuccess: () => void;
    customerEmail: string;
    customerName: string;
}

export function CheckoutDialog({
    open,
    onOpenChange,
    cartItems,
    totalAmount,
    onOrderSuccess,
    customerEmail,
    customerName
}: CheckoutDialogProps) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        phone: "",
        address: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('http://localhost:3000/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    customerName,
                    customerEmail,
                    customerPhone: formData.phone,
                    deliveryAddress: formData.address,
                    items: cartItems.map(item => ({
                        productId: item.id,
                        quantity: item.quantity,
                        price: item.price
                    })),
                    totalAmount
                })
            });

            if (!response.ok) throw new Error('Failed to place order');

            const data = await response.json();
            toast.success('Order placed successfully! Check your email for confirmation.');
            onOrderSuccess();
            onOpenChange(false);
            setFormData({ phone: "", address: "" });
        } catch (error: any) {
            toast.error(error.message || 'Failed to place order');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Checkout</DialogTitle>
                    <DialogDescription>
                        Enter your delivery details to complete your order
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            value={customerName}
                            disabled
                            className="bg-muted"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={customerEmail}
                            disabled
                            className="bg-muted"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                            id="phone"
                            type="tel"
                            required
                            placeholder="Enter your phone number"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="address">Delivery Address</Label>
                        <Textarea
                            id="address"
                            required
                            placeholder="Enter your complete delivery address"
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            rows={3}
                        />
                    </div>

                    <div className="bg-muted p-4 rounded-lg">
                        <h3 className="font-semibold mb-2">Order Summary</h3>
                        <div className="space-y-1 text-sm">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex justify-between">
                                    <span>{item.name} x {item.quantity}</span>
                                    <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                            <div className="border-t pt-2 mt-2 flex justify-between font-semibold">
                                <span>Total</span>
                                <span>₹{totalAmount.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            className="flex-1"
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading} className="flex-1">
                            {loading ? "Placing Order..." : "Place Order"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
