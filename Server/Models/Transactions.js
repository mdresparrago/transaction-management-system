const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parser");
const { stringify } = require("csv-stringify");

const filePath = path.join(__dirname, "Data/transactions.csv");

const getTransactions = () => {
  return new Promise((resolve, reject) => {
    const transactions = [];
    fs.createReadStream(filePath)
      .pipe(parse({ columns: true }))
      .on("data", (data) => transactions.push(data))
      .on("end", () => resolve(transactions))
      .on("error", (error) => reject(error));
  });
};

const addTransaction = (newTransaction) => {
  return new Promise((resolve, reject) => {
    const transactionData = [
      [
        newTransaction.date,
        newTransaction.accountNumber,
        newTransaction.accountHolderName,
        newTransaction.amount,
        newTransaction.status,
      ],
    ];

    stringify(transactionData, (err, output) => {
      if (err) {
        return reject(err);
      }
      fs.appendFile(filePath, `\n${output.trim()}`, (err) => {
        if (err) {
          return reject(err);
        }
        resolve(newTransaction);
      });
    });
  });
};

module.exports = {
  getTransactions,
  addTransaction,
};
