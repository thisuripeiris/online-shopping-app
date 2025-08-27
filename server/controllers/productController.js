import Product from "../models/productModel.js";

//Add new products - Admin only
export const addProduct = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  const {
    code,
    name,
    category,
    subCategory,
    price,
    description,
    image,
    isCustomizable,
  } = req.body;

  try {
    const newProduct = new Product({
      code,
      name,
      category,
      subCategory,
      price,
      description,
      image,
      isCustomizable,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

//Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

//Get product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get products by category (resin / non-resin)
export const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params; // "resin" or "non-resin"
    const products = await Product.find({ category });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products by category" });
  }
};

//Get products by sub-category
export const getProductsBySubCategory = async (req, res) => {
  try {
    const { subCategory } = req.params;
    const products = await Product.find({ subCategory: subCategory });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products by subCategory" });
  }
};

//Update product - Admin only
export const updateProduct = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

//Delete product - Admin only
export const deleteProduct = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
