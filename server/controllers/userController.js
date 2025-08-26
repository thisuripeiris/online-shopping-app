import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

// Validate email format
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// REGISTER
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (!isValidEmail(email)) {
    return res
      .status(400)
      .json({ message: "Please enter a valid email address" });
  }

  try {
    const normalizedEmail = email.trim().toLowerCase();

    // Check if user already exists
    const existUser = await User.findOne({ email: normalizedEmail });
    if (existUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Assign role (admin if email contains "adminmonaro_")
    const isAdminEmail = normalizedEmail.includes("adminmonaro_");
    const assignedRole = isAdminEmail ? "admin" : "user";

    // Create new user
    const newUser = new User({
      username,
      email: normalizedEmail,
      password: hashedPassword,
      role: assignedRole,
    });

    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      token: generateToken(newUser), // ✅ Pass full user object
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// LOGIN
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  try {
    const normalizedEmail = email.trim().toLowerCase();

    const foundUser = await User.findOne({ email: normalizedEmail });
    if (!foundUser) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, foundUser.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Success
    res.status(200).json({
      message: "Login successful",
      token: generateToken(foundUser),
      user: {
        id: foundUser._id,
        username: foundUser.username,
        email: foundUser.email,
        role: foundUser.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
