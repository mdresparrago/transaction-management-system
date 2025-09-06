const express = require("express");
const router = express.Router();
const transactionController = require("./transaction.controller");

// GET /transactions
router.get("/", transactionController.getTransactions);

// POST /transactions
router.post("/", transactionController.addTransaction);

module.exports = router;
