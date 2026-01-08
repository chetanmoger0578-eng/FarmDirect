import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Package } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { toast } from "sonner";

interface ProductFormData {
  name: string;
  price: string;
  unit: string;
  category: string;
  description: string;
  stock: string;
  imageUrl: string;
}

interface ProductsManagementProps {
  farmerId: string;
}

export function ProductsManagement({ farmerId }: ProductsManagementProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, [farmerId]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/products');
      const allProducts = await response.json();
      // Filter to only show this farmer's products
      const myProducts = allProducts.filter((p: any) => p.farmerId === farmerId);
      setProducts(myProducts);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    price: "",
    unit: "",
    category: "",
    description: "",
    stock: "",
    imageUrl: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          price: formData.price,
          unit: formData.unit,
          category: formData.category,
          description: formData.description,
          stock: formData.stock,
          image: formData.imageUrl,
          farmerId: farmerId,
          location: "Farm Location" // You can make this dynamic later
        })
      });

      if (!response.ok) throw new Error('Failed to create product');

      await fetchProducts(); // Refresh the product list
      setIsAddDialogOpen(false);
      setFormData({
        name: "",
        price: "",
        unit: "",
        category: "",
        description: "",
        stock: "",
        imageUrl: "",
      });
      toast.success("Product added successfully!");
    } catch (error: any) {
      toast.error(error.message || 'Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3000/api/products/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Failed to delete product');

      await fetchProducts(); // Refresh the product list
      toast.success("Product deleted");
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete product');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Product Management</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add New Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>
                Add a new product to your farm's inventory
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Organic Carrots"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Vegetables">Vegetables</SelectItem>
                      <SelectItem value="Fruits">Fruits</SelectItem>
                      <SelectItem value="Dairy">Dairy</SelectItem>
                      <SelectItem value="Eggs">Eggs</SelectItem>
                      <SelectItem value="Pantry">Pantry</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unit">Unit</Label>
                  <Input
                    id="unit"
                    required
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    placeholder="e.g., per lb, per bag"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="stock">Stock Quantity</Label>
                <Input
                  id="stock"
                  type="number"
                  required
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  placeholder="0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe your product..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="imageUrl">Image URL (optional)</Label>
                <Input
                  id="imageUrl"
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="https://..."
                />
              </div>

              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add Product</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id}>
            <CardHeader className="p-0">
              <div className="aspect-square overflow-hidden rounded-t-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <CardTitle className="text-lg">{product.name}</CardTitle>
                <Badge variant="secondary">{product.category}</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div>
                  <span className="font-semibold">₹{product.price.toFixed(2)}</span>
                  <span className="text-muted-foreground ml-1">{product.unit}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Package className="w-3 h-3" />
                  <span>{product.stock} in stock</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Pencil className="w-3 h-3 mr-1" />
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => handleDelete(product.id)}
              >
                <Trash2 className="w-3 h-3 mr-1" />
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}