import mongoose from "mongoose";
import { config } from "dotenv";
config();
const DBConnect = () => {
     mongoose.connect(process.env.MONGODB_URL, {
          useNewUrlParser: true,
          useUnifiedTopology: true
     }).then((data) => {
          console.log(`Mongodb connected successfully at ${data.connection.host}/${data.connection.port}`);
     }).catch((err) => {
          console.log("Mongodb connection faild");
          console.log(err.message);
          process.exit(1);
     })
}

export default DBConnect;
