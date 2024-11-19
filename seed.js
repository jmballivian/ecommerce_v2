const axios = require('axios');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('ecommerce', 'root', 'Icaro2024', {
  host: 'localhost',
  dialect: 'mysql'
});

const Product = sequelize.define('Product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false
  },
  stock: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  imageURL: {
    type: Sequelize.STRING,
    allowNull: true
  }
});

// Product templates by category
const productTemplates = {
  Electronics: [
    {
      basePrice: 999.99,
      variants: [
        { name: 'Pro Laptop 15"', desc: 'Professional laptop with 15" display, 16GB RAM, 512GB SSD' },
        { name: 'Ultra Laptop 13"', desc: 'Ultralight laptop with 13" display, 8GB RAM, 256GB SSD' },
        { name: 'Gaming Laptop 17"', desc: 'Gaming laptop with 17" display, 32GB RAM, 1TB SSD' },
        { name: 'Business Laptop 14"', desc: 'Business laptop with 14" display, 16GB RAM, 512GB SSD' }
      ],
      imageURL: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=400'
    },
    {
      basePrice: 199.99,
      variants: [
        { name: 'Wireless Noise-Cancelling Headphones', desc: 'Premium wireless headphones with active noise cancellation' },
        { name: 'Sport Wireless Earbuds', desc: 'Waterproof wireless earbuds for sports' },
        { name: 'Studio Headphones', desc: 'Professional studio-quality headphones' }
      ],
      imageURL: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400'
    },
    // Add more electronics templates...
  ],
  Clothing: [
    {
      basePrice: 79.99,
      variants: [
        { name: 'Classic Denim Jacket', desc: 'Timeless denim jacket in blue wash' },
        { name: 'Leather Jacket', desc: 'Premium leather jacket in black' },
        { name: 'Winter Parka', desc: 'Warm winter parka with fur hood' }
      ],
      imageURL: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&q=80&w=400'
    },
    // Add more clothing templates...
  ],
  Home: [
    {
      basePrice: 159.99,
      variants: [
        { name: 'Smart Coffee Maker', desc: 'Programmable coffee maker with smartphone control' },
        { name: 'Professional Blender', desc: 'High-power blender for smoothies and food prep' },
        { name: 'Air Fryer Deluxe', desc: 'Digital air fryer with multiple cooking modes' }
      ],
      imageURL: 'https://images.unsplash.com/photo-1517914309068-0db3b47715cc?auto=format&fit=crop&q=80&w=400'
    },
    // Add more home templates...
  ],
  Books: [
    {
      basePrice: 29.99,
      variants: [
        { name: 'Programming Fundamentals', desc: 'Complete guide to programming basics' },
        { name: 'Web Development Master Guide', desc: 'Comprehensive web development tutorial' },
        { name: 'Data Science Handbook', desc: 'Essential guide to data science and analytics' }
      ],
      imageURL: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=400'
    },
    // Add more book templates...
  ],
  Toys: [
    {
      basePrice: 49.99,
      variants: [
        { name: 'Educational Robot Kit', desc: 'Build-your-own robot kit for learning' },
        { name: 'Science Experiment Set', desc: 'Complete science lab kit for kids' },
        { name: 'Creative Building Blocks', desc: 'Advanced building blocks set with 1000+ pieces' }
      ],
      imageURL: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80&w=400'
    },
    // Add more toy templates...
  ]
};

// Function to generate price variation
const generatePrice = (basePrice) => {
  const variation = Math.random() * 0.4 - 0.2; // -20% to +20%
  return (basePrice * (1 + variation)).toFixed(2);
};

// Generate 100 products
const generateProducts = () => {
  const products = [];
  const categories = Object.keys(productTemplates);
  
  for (let i = 0; i < 100; i++) {
    const category = categories[i % categories.length];
    const template = productTemplates[category][Math.floor(Math.random() * productTemplates[category].length)];
    const variant = template.variants[Math.floor(Math.random() * template.variants.length)];
    
    products.push({
      name: `${variant.name} - Model ${Math.floor(Math.random() * 1000)}`,
      price: generatePrice(template.basePrice),
      description: variant.desc,
      category: category,
      stock: Math.floor(Math.random() * 100) + 1,
      imageURL: template.imageURL
    });
  }
  
  return products;
};

const seedProducts = async () => {
  try {
    // Drop existing tables
    await sequelize.query('DROP TABLE IF EXISTS OrderItems');
    await sequelize.query('DROP TABLE IF EXISTS CartItems');
    await sequelize.query('DROP TABLE IF EXISTS Reviews');
    await sequelize.query('DROP TABLE IF EXISTS Favorites');
    await sequelize.query('DROP TABLE IF EXISTS Products');
    await sequelize.sync();

    // Generate and create products
    const products = generateProducts();
    await Product.bulkCreate(products);
    console.log('Database seeded successfully with 100 products!');
  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    await sequelize.close();
  }
};

seedProducts();