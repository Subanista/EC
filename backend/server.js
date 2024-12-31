const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');


// Importing routes
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');


const adminRoutes = require('./routes/adminRoutes');
const productRoutes = require('./routes/productsRoutes');
const authRoutes = require ('./routes/authRoutes');
const checkoutRoutes = require ('./routes/checkoutRoutes');


dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());


// Connect to MongoDB
connectDB();

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use(productRoutes);
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/admin', adminRoutes);

app.use('/api', orderRoutes);
// Routes
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

// API routes
app.use('/api', checkoutRoutes);

app.get('/api/products/:id', (req, res) => {
  const productId = req.params.id;
  // Fetch product by ID logic here
});

// Home Route
app.get('/', (req, res) => {
  res.send('Admin Backend is Running');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
