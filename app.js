const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const productRoutes = require("./routes/productRoutes");

const app = express();
app.use(express.json());

// Connect to MongoDB
const MONGO_URI = "mongodb://localhost:27017/gym-store"; // Update this to your MongoDB URI
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("DB Connection Error:", err));

// Routes
app.use("/products", productRoutes);

// Home route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Gym Store API" });
});

// Create a new product
router.post("/add", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json({ message: "Product added", product: newProduct });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

fetch('http://localhost:3000/products/add', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: "Whey Protein",
    price: 1999,
    category: "Supplements",
    imageUrl: "https://example.com/images/whey.png",
    description: "High-quality protein for muscle gain"
  })
})
.then(response => response.json())  // Get the JSON response
.then(data => console.log(data))    // Print the response in the console
.catch(error => console.error('Error:', error));  // Handle any errors

// Start server
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});


