import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { sendOrderNotificationToFarmer, sendOrderConfirmationToCustomer } from './emailService.js';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// --- Routes ---

// Farmer Registration
app.post('/api/farmers/register', async (req, res) => {
  const { name, email, password, farmName, aadharNumber, location, description } = req.body;

  // Basic validation
  if (!name || !email || !password || !aadharNumber) {
    return res.status(400).json({ error: "Missing fields" });
  }

  // Aadhar validation (Simulated: 12 digits)
  const aadharRegex = /^\d{12}$/;
  if (!aadharRegex.test(aadharNumber)) {
    return res.status(400).json({ error: "Invalid Aadhar Format. Must be 12 digits." });
  }

  try {
    // Check if exists
    const existing = await prisma.farmer.findFirst({
      where: {
        OR: [{ email }, { aadharNumber }]
      }
    });

    if (existing) {
      return res.status(400).json({ error: "Farmer with this Email or Aadhar already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const farmer = await prisma.farmer.create({
      data: {
        name: farmName || name, // Use Farm Name as display name if provided
        email,
        password: hashedPassword,
        aadharNumber,
        location: location || "Unknown",
        description: description || "New verified local farmer.",
        isVerified: true, // Auto-verify for prototype
        specialties: JSON.stringify([]),
        image: "https://images.unsplash.com/photo-1654526645468-9ae1cde48fe2?q=80&w=1080&auto=format&fit=crop" // Default image
      }
    });

    res.json({ message: "Registration successful", farmerId: farmer.id });
  } catch (error) {
    console.error("Registration invalid:", error);
    res.status(500).json({ error: "Registration failed" });
  }
});

// Farmer Login
app.post('/api/farmers/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const farmer = await prisma.farmer.findUnique({ where: { email } });
    if (!farmer) return res.status(400).json({ error: "Invalid credentials" });

    const isValid = await bcrypt.compare(password, farmer.password);
    if (!isValid) return res.status(400).json({ error: "Invalid credentials" });

    res.json({
      ...farmer,
      specialties: JSON.parse(farmer.specialties || "[]")
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Login failed" });
  }
});

// Get all farmers
app.get('/api/farmers', async (req, res) => {
  try {
    const farmers = await prisma.farmer.findMany({
      include: { products: true }
    });
    const formattedFarmers = farmers.map(f => ({
      ...f,
      specialties: JSON.parse(f.specialties || "[]")
    }));
    res.json(formattedFarmers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch farmers' });
  }
});

// Get single farmer
app.get('/api/farmers/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const farmer = await prisma.farmer.findUnique({
      where: { id },
      include: { products: true }
    });
    if (!farmer) return res.status(404).json({ error: 'Farmer not found' });

    res.json({
      ...farmer,
      specialties: JSON.parse(farmer.specialties || "[]")
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch farmer' });
  }
});

// Get all products
app.get('/api/products', async (req, res) => {
  const { category } = req.query;
  try {
    const where = category && category !== 'All' ? { category: String(category) } : {};
    const products = await prisma.product.findMany({
      where,
      include: { farmer: true }
    });

    const formattedProducts = products.map(p => ({
      ...p,
      farmerName: p.farmer.name
    }));

    res.json(formattedProducts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Create a new product
app.post('/api/products', async (req, res) => {
  const { name, price, unit, category, description, stock, image, farmerId, location } = req.body;

  try {
    const product = await prisma.product.create({
      data: {
        name,
        price: parseFloat(price),
        unit,
        category,
        description,
        stock: parseInt(stock),
        image: image || "https://images.unsplash.com/photo-1717959159782-98c42b1d4f37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXMlMjBmYXJtfGVufDF8fHx8MTc2NzU5NjM3Nnww&ixlib=rb-4.1.0&q=80&w=1080",
        location: location || "Unknown",
        farmerId
      },
      include: { farmer: true }
    });

    res.json({
      ...product,
      farmerName: product.farmer.name
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// Update a product
app.put('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  const { name, price, unit, category, description, stock, image } = req.body;

  try {
    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        price: parseFloat(price),
        unit,
        category,
        description,
        stock: parseInt(stock),
        image
      },
      include: { farmer: true }
    });

    res.json({
      ...product,
      farmerName: product.farmer.name
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// Delete a product
app.delete('/api/products/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.product.delete({
      where: { id }
    });

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// Create new order
app.post('/api/orders', async (req, res) => {
  const { customerName, customerEmail, customerPhone, deliveryAddress, items, totalAmount } = req.body;

  try {
    // Create order with items
    const order = await prisma.order.create({
      data: {
        customerName,
        customerEmail,
        customerPhone,
        deliveryAddress,
        totalAmount,
        items: {
          create: items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price
          }))
        }
      },
      include: {
        items: {
          include: {
            product: {
              include: {
                farmer: true
              }
            }
          }
        }
      }
    });

    // Group items by farmer
    const farmerOrders = {};
    order.items.forEach(item => {
      const farmerId = item.product.farmerId;
      if (!farmerOrders[farmerId]) {
        farmerOrders[farmerId] = {
          farmer: item.product.farmer,
          items: [],
          total: 0
        };
      }
      farmerOrders[farmerId].items.push({
        productName: item.product.name,
        quantity: item.quantity,
        price: item.price
      });
      farmerOrders[farmerId].total += item.price * item.quantity;
    });

    // Send email to each farmer
    for (const farmerId in farmerOrders) {
      const farmerOrder = farmerOrders[farmerId];
      await sendOrderNotificationToFarmer(
        farmerOrder.farmer.email,
        farmerOrder.farmer.name,
        {
          customerName,
          customerEmail,
          customerPhone,
          deliveryAddress,
          items: farmerOrder.items,
          totalAmount: farmerOrder.total
        }
      );
    }

    // Send confirmation email to customer
    await sendOrderConfirmationToCustomer(
      customerEmail,
      customerName,
      {
        deliveryAddress,
        items: order.items.map(item => ({
          productName: item.product.name,
          quantity: item.quantity,
          price: item.price
        })),
        totalAmount
      }
    );

    res.json({ success: true, orderId: order.id });
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Get all orders (for farmers)
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        items: {
          include: {
            product: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
