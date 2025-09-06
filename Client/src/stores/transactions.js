import { defineStore } from 'pinia'

export const useTransactionStore = defineStore('transactions', {
  state: () => ({
    transactions: [],
    loading: false,
    error: null,
    filter: {
      status: null,
      date: null,
      accountNumber: null,
    },
  }),
  getters: {
    filteredTransactions: (state) => {
      const { status, date, accountNumber } = state.filter
      const sorted = [...state.transactions].reverse()

      return sorted.filter((transaction) => {
        const matchesStatus = !status || transaction.Status === status
        const matchesDate = !date || transaction['Transaction Date'] === date
        const matchesAccountNumber =
          !accountNumber || transaction['Account Number'].includes(accountNumber)
        return matchesStatus && matchesDate && matchesAccountNumber
      })
    },
  },
  actions: {
    async fetchTransactions() {
      this.loading = true
      this.error = null
      try {
        const response = await fetch('http://localhost:3000/api/transactions')
        if (!response.ok) {
          throw new Error('Failed to fetch transactions')
        }
        const data = await response.json()
        this.transactions = data

        console.log('Fetched transactions:', data)
        console.log('Fetched transactions:', this.data)
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },
    async addTransaction(newTransaction) {
      this.loading = true
      this.error = null
      try {
        const response = await fetch('http://localhost:3000/api/transactions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newTransaction),
        })
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Failed to add transaction')
        }
        const addedTransaction = await response.json()
        this.transactions.push(addedTransaction)
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },
    setFilter(newFilter) {
      this.filter = { ...this.filter, ...newFilter }
    },
    clearFilters() {
      this.filter = { status: null, date: null, accountNumber: null }
    },
  },
})
