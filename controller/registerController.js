import User from "../models/registerModel.js";

export const registerUser = async (req, res) => {
     try {
          const { name, email, password } = req.body;
          const user = await User.create({
               name,
               email,
               password,
               avatar: {
                    public_id: "this is sample id",
                    url: "sample image url"
               }
          })

          const token = user.getJwtToke()

          res.status(201).json({
               success: true,
               token
          })

     } catch (error) {
          res.status(500).json({
               success: false,
               error: error.message
          })
     }
};


// Login User
export const loginUser = async (req, res) => {
     try {
          const { email, password } = req.body;
          if (!email || !password) {
               res.status(400).json({
                    success: false,
                    message: "Please Enter Email & Password"
               })
          }
          const user = await User.findOne({ email }).select("+password");

          if (!user) {
               res.status(401).json({
                    success: false,
                    message: "Invalid Email & Password"
               })
          }

          const isPasswordMatch = await user.comparePassword(password);
          if (!isPasswordMatch) {
               res.status(401).json({
                    success: false,
                    message: "Invalid Email & Password"
               })
          }

     } catch (error) {

     }
}