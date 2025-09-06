const express = require("express");
const router = express.Router();
const transactionController = require("../Controllers/transactions");

// GET /transactions
router.get("/", transactionController.getTransactions);

// POST /transactions
router.post("/", transactionController.addTransaction);

module.exports = router;
