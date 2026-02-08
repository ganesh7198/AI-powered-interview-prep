import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs';
import User from "../models/user.models.js"


const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign(
    { id: userId },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1d" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    maxAge: 24 * 60 * 60 * 1000
  });

  return token;
};


export const signupController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: "Email already exists"
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    generateTokenAndSetCookie(user._id, res);

    res.status(201).json({
      message: "Signup successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.log("Error in signup controller:", error.message);

    // handle duplicate email edge-case (race condition)
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Email already exists"
      });
    }

    res.status(500).json({
      message: "Internal server error"
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    generateTokenAndSetCookie(existingUser._id, res);

    res.status(200).json({
      message: "Login successful",
      user: {
        _id: existingUser._id,
        name: existingUser.name,
        username: existingUser.username,
        email: existingUser.email
      }
    });

  } catch (error) {
    console.log("Error in login controller:", error.message);
    res.status(500).json({
      message: "Internal server error"
    });
  }
};

export const getUserProfile= async (req,res)=>{
   try{
    const userid=req.user._id;
	const userProfile=await User.findById(userid).select("-password");
	if(!userProfile){
		return res.status(404).json({message:"user not found "});
	}
	res.status(200).json({data:userProfile})
   }catch(error){
        console.log('error in the get user profile controller ',error.message);
		res.status(500).json({message:"intrnal server error "})  
   }
}

export const logoutController = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict"
    });

    res.status(200).json({
      message: "User logged out successfully"
    });

  } catch (error) {
    console.log("error in the logout controller", error.message);
    res.status(500).json({
      message: "Internal server error"
    });
  }
};
