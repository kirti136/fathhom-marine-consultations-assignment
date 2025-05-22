require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const connectDB = require("./config/db.js");
const userRoute = require("./routes/user.routes.js");
const marineRoute = require("./routes/marine.routes.js");

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/api/user", userRoute);
app.use("/api/marine", marineRoute);

connectDB();
const PORT = process.env.PORT || 4567;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
