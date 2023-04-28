const sendToken = (user, statusCode, message, res) => {
     const token = user.getJwtToke()

     //option store in cookies
     const option = {
          expire: Date(
               Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
          ),
          httpOnly: true,
     }
     // console.log(option.expire);
     res.status(statusCode).cookie("token", token, option).json({
          success: true,
          message:message,
          user,
          token

     })
}

export default sendToken;