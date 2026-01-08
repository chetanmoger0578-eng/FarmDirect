import { Clock, CheckCircle, XCircle, Package } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface Order {
  id: string;
  customerName: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  date: string;
}

const mockOrders: Order[] = [
  {
    id: "ORD-001",
    customerName: "John Doe",
    items: [
      { name: "Organic Mixed Greens", quantity: 2, price: 120 },
      { name: "Heritage Tomatoes", quantity: 1, price: 80 },
    ],
    total: 320,
    status: "pending",
    date: "2026-01-06",
  },
  {
    id: "ORD-002",
    customerName: "Jane Smith",
    items: [
      { name: "Farm Fresh Eggs", quantity: 1, price: 180 },
    ],
    total: 180,
    status: "confirmed",
    date: "2026-01-05",
  },
  {
    id: "ORD-003",
    customerName: "Mike Johnson",
    items: [
      { name: "Organic Mixed Greens", quantity: 3, price: 120 },
      { name: "Heritage Tomatoes", quantity: 2, price: 80 },
      { name: "Farm Fresh Eggs", quantity: 1, price: 180 },
    ],
    total: 700,
    status: "completed",
    date: "2026-01-04",
  },
];

const getStatusBadge = (status: Order["status"]) => {
  const variants = {
    pending: { variant: "outline" as const, icon: Clock, label: "Pending" },
    confirmed: { variant: "default" as const, icon: Package, label: "Confirmed" },
    completed: { variant: "secondary" as const, icon: CheckCircle, label: "Completed" },
    cancelled: { variant: "destructive" as const, icon: XCircle, label: "Cancelled" },
  };
  const { variant, icon: Icon, label } = variants[status];
  return (
    <Badge variant={variant} className="flex items-center gap-1 w-fit">
      <Icon className="w-3 h-3" />
      {label}
    </Badge>
  );
};

export function OrdersView() {
  const pendingOrders = mockOrders.filter(o => o.status === "pending");
  const confirmedOrders = mockOrders.filter(o => o.status === "confirmed");
  const completedOrders = mockOrders.filter(o => o.status === "completed");

  const OrderCard = ({ order }: { order: Order }) => (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{order.id}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{order.customerName}</p>
            <p className="text-xs text-muted-foreground">{order.date}</p>
          </div>
          {getStatusBadge(order.status)}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 mb-4">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex justify-between text-sm">
              <span>{item.name} x{item.quantity}</span>
              <span>₹{(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center pt-4 border-t">
          <span className="font-semibold">Total: ₹{order.total.toFixed(2)}</span>
          {order.status === "pending" && (
            <div className="flex gap-2">
              <Button size="sm" variant="outline">Decline</Button>
              <Button size="sm">Confirm</Button>
            </div>
          )}
          {order.status === "confirmed" && (
            <Button size="sm">Mark Complete</Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Orders</h2>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList>
          <TabsTrigger value="pending">
            Pending ({pendingOrders.length})
          </TabsTrigger>
          <TabsTrigger value="confirmed">
            Confirmed ({confirmedOrders.length})
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed ({completedOrders.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4 mt-6">
          {pendingOrders.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No pending orders</p>
          ) : (
            pendingOrders.map(order => <OrderCard key={order.id} order={order} />)
          )}
        </TabsContent>

        <TabsContent value="confirmed" className="space-y-4 mt-6">
          {confirmedOrders.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No confirmed orders</p>
          ) : (
            confirmedOrders.map(order => <OrderCard key={order.id} order={order} />)
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4 mt-6">
          {completedOrders.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No completed orders</p>
          ) : (
            completedOrders.map(order => <OrderCard key={order.id} order={order} />)
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}