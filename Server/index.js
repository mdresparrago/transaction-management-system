const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");

const transactionRoutes = require("./Routes/transactions.js");

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: "http://localhost:9000", // Replace with your Quasar app's origin
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use("/api/transactions", transactionRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
