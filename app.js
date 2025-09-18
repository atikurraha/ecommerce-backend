const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// রাউট ইমপোর্ট
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const categoryRoutes = require('./routes/categories');
const orderRoutes = require('./routes/orders');
const userRoutes = require('./routes/users');
const reviewRoutes = require('./routes/reviews');
const wishlistRoutes = require('./routes/wishlist');
const cartRoutes = require('./routes/cart');
const pageRoutes = require('./routes/pages');
const blogRoutes = require('./routes/blog');

// এনভায়রনমেন্ট ভেরিয়েবল লোড
dotenv.config();

const app = express();

// মিডলওয়্যার
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// স্ট্যাটিক ফাইল সার্ভ
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ডাটাবেস কানেকশন
mongoose.connect(process.env.MONGODB_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// API রাউট
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/pages', pageRoutes);
app.use('/api/blog', blogRoutes);

// প্রোডাকশনে ফ্রন্টএন্ড সার্ভ
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
