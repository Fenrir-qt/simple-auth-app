const express = require('express');
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const dbConnection = require("./db");
const cookieParser = require("cookie-parser");
const authMiddleware = require('./middleware/authMiddleware');
const authRoutes = require("./routes/Authentication");
const port = process.env.PORT;

dotenv.config();

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true,              
}));

app.use(express.json());
app.use(cookieParser());

dbConnection();

app.use('/api/auth', authRoutes);


app.get('/', (req, res) => {
  res.json({ message: "Connected Successfully!" });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});
