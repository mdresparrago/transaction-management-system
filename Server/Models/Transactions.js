const fs = require("fs");
const fsp = require("fs").promises;
const path = require("path");
const parse = require("csv-parser");
const { stringify } = require("csv-stringify");

const filePath = path.join(__dirname, "..", "Data", "transactions.csv");

// Read all transactions from the CSV file
const getTransactions = async () => {
  const transactions = [];
  const readableStream = fs
    .createReadStream(filePath)
    .pipe(parse({ columns: true, skip_empty_lines: true }));

  for await (const record of readableStream) {
    transactions.push(record);
  }

  return transactions;
};

// Add a new transaction by reading all data and rewriting the file
const addTransaction = async (newTransaction) => {
  try {
    // Read the existing transactions
    const existingTransactions = await getTransactions();

    // Create a new transaction object with keys that match the CSV headers
    const transactionForCsv = {
      "Transaction Date": newTransaction.date,
      "Account Number": newTransaction.accountNumber,
      "Account Holder Name": newTransaction.accountHolderName,
      Amount: newTransaction.amount,
      Status: newTransaction.status,
    };

    // Add the new transaction to the array
    const updatedTransactions = [...existingTransactions, transactionForCsv];

    // Convert the updated data to CSV format
    const output = await new Promise((resolve, reject) => {
      stringify(updatedTransactions, { header: true }, (err, output) => {
        if (err) {
          return reject(new Error("Failed to convert to CSV."));
        }
        resolve(output);
      });
    });

    // Write the entire updated CSV string back to the file
    await fsp.writeFile(filePath, output);

    // Resolve with the newly added transaction
    return transactionForCsv;
  } catch (error) {
    throw new Error(`Failed to save transaction: ${error.message}`);
  }
};

module.exports = {
  getTransactions,
  addTransaction,
};
