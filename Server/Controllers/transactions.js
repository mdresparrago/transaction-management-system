const transactionModel = require("../Models/Transactions");

const getRandomStatus = () => {
  const statuses = ["Pending", "Settled", "Failed"];
  const randomIndex = Math.floor(Math.random() * statuses.length);
  return statuses[randomIndex];
};

const getTransactions = async (req, res) => {
  try {
    const transactions = await transactionModel.getTransactions();
    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ error: "Failed to retrieve transactions." });
  }
};

const addTransaction = async (req, res) => {
  try {
    const { date, accountNumber, accountHolderName, amount } = req.body;

    // Basic validation
    if (!date || !accountNumber || !accountHolderName || amount === undefined) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount)) {
      return res.status(400).json({ error: "Amount must be a valid number." });
    }

    const newTransaction = {
      date,
      accountNumber,
      accountHolderName,
      amount: parsedAmount.toFixed(2),
      status: getRandomStatus(),
    };

    const addedTransaction = await transactionModel.addTransaction(
      newTransaction
    );
    res.status(201).json(addedTransaction);
  } catch (error) {
    console.error("Error adding transaction:", error);
    res.status(500).json({ error: "Failed to add transaction." });
  }
};

module.exports = {
  getTransactions,
  addTransaction,
};
