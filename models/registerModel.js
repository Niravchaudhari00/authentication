import { Schema, model } from "mongoose";
import validator from "validator";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";


const registerSchema = new Schema({
     name: {
          type: String,
          required: [true, "Please Enter User Name"],
          maxLength: [30, "Name cannot exceed thirty character "],
          minLength: [4, "Name should have more then four charater"]
     },

     email: {
          type: String,
          required: [true, "Please Enter Email"],
          unique: true,
          validate: [validator.isEmail, "Please Enter a valid Email"]
     },
     password: {
          type: String,
          required: [true, "Please Enter Password"],
          minLength: [8, "Password should bee a greaterthan 8 charaters"],
          select: false
     },
     avatar: {

          public_id: {
               type: String,
               required: true
          },
          url: {
               type: String,
               required: true
          }
     },
     // clouldner use in frontend
     role: {
          type: String,
          default: "user"
     },
     createdAt: {
          type: Date,
          default: Date.now()
     },
     resetPasswordToken: String,
     resetPasswordExpire: String,
});

registerSchema.pre("save", async function (next) {
     if (!this.isModified("password")) {
          next();
     }

     try {
          this.password = await bcryptjs.hash(this.password, 10)
     } catch (error) {
          console.log(error.message);
     }
})
// JWT_TOKEN
registerSchema.methods.getJwtToke = function () {
     return jwt.sign({ id: this._id }, process.env.JWT_SECRATE_KEY, {
          expiresIn: process.env.JWT_EXPIRE,
     })
}

// Compare Password when user login
registerSchema.methods.comparePassword = async function (enterPassword) {
     return await bcryptjs.compare(enterPassword, this.password);
}

export default model("Register", registerSchema)