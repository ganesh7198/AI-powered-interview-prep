import jwt from "jsonwebtoken";
import User from "../models/user.models.js";

const protect = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Not authorized, no token"
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // ✅ correct query
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    req.user = user; // attach full user object
    next();

  } catch (error) {
    return res.status(401).json({
      message: "Not authorized, invalid token"
    });
  }
};

export default protect;
