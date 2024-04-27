const express = require("express");
const { default: mongoose } = require("mongoose");
const Product = require("./models/product.model.js");
const productRoute = require("./routes/product.route.js");
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.listen(3000, () => {
  console.log("server is running on port 3000");
});

mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.ge6u4kk.mongodb.net/Node-API-2?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("MongoDb Connected!"))
  .catch(() => console.log("Connection Failed"));

//create product

app.post("/api/product", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get all product

app.get("/api/product", productRoute);

//get specific product by id

app.get("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//updated product

app.put("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/", (req, res) => {
  res.send("Hello World");
});
