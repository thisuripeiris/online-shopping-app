const user = require("../models/userModel");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/generateToken");

// Validate email format
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Register a new user
exports.registerUser = async (req, res) => {
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
    // Normalize email (trim + lowercase)
    const normalizedEmail = email.trim().toLowerCase();

    // Check if user already exists
    const existUser = await user.findOne({ email: normalizedEmail });
    if (existUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // DEBUG: Log the email to ensure correct formatting
    console.log("Registering email:", normalizedEmail);

    // Assign role based on whether email contains "adminmonaro_"
    const isAdminEmail = normalizedEmail.includes("adminmonaro_");
    const assignedRole = isAdminEmail ? "admin" : "user";

    // DEBUG: Log role assignment
    console.log(
      `Role assigned: ${assignedRole} (Admin check: ${isAdminEmail})`
    );

    // Create a new user
    const newUser = new user({
      username,
      email: normalizedEmail,
      password: hashedPassword,
      role: assignedRole,
    });

    await newUser.save();
    console.log("User registered successfully:", newUser);

    // Send response with token
    res.status(201).json({
      message: "User registered successfully",
      token: generateToken(newUser._id),
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

// Login a user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  try {
    // Normalize email (trim + lowercase)
    const normalizedEmail = email.trim().toLowerCase();

    // Check if user exists
    const foundUser = await user.findOne({ email: normalizedEmail });
    if (!foundUser) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    console.log("User logged in successfully:", foundUser);

    // Generate token and send response
    res.status(200).json({
      message: "Login successful",
      token: generateToken(foundUser._id),
      user: {
        id: foundUser._id,
        username: foundUser.username,
        email: foundUser.email,
        role: foundUser.role,
      },
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Server error" });
  }
};
