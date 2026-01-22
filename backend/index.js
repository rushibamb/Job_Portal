import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js"
import companyRoute from "./routes/company.route.js"
import jobRoute from "./routes/job.route.js"
import applicantionRoute from "./routes/application.route.js"





dotenv.config(); // 🔑 load environment variables

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Allow localhost on any port (for development)
    if (origin.startsWith('http://localhost:') || origin.startsWith('https://localhost:')) {
      return callback(null, true);
    }
    
    // You can add production origins here
    callback(null, true);
  },
  credentials: true,
};
app.use(cors(corsOptions));

const PORT = process.env.PORT || 5000;

//api's
app.use("/api/v1/user",userRoute);
app.use("/api/v1/company",companyRoute);
app.use("/api/v1/job",jobRoute);
app.use("/api/v1/application",applicantionRoute);


// Test route
app.get("/api/test", (req, res) => {
    res.json({ message: "Server is running!" });
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
