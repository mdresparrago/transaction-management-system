<template>
  <q-layout view="lHh Lpr lff" class="modern-bg">
    <q-page-container>
      <q-page class="flex flex-center q-pa-md">
        <q-card class="main-card-modern">
          <q-card-section class="q-pb-none">
            <div class="row items-center justify-between q-mb-md">
              <div class="text-h5 text-dark-grey">TRANSACTIONS</div>
              <div class="q-gutter-sm">
                <q-btn
                  icon="add"
                  label="Add Transaction"
                  no-caps
                  @click="showModal = true"
                  class="add-transaction-btn"
                />
              </div>
            </div>

            <div class="row q-col-gutter-sm q-mb-md">
              <div class="col-xs-12 col-sm-3">
                <q-select
                  outlined
                  rounded
                  dense
                  :model-value="filter.status"
                  @update:model-value="setFilter({ status: $event })"
                  :options="statusOptions"
                  label="Status"
                  clearable
                  class="filter-select"
                />
              </div>

              <div class="col-xs-12 col-sm-6">
                <q-input
                  outlined
                  rounded
                  dense
                  :model-value="filter.accountNumber"
                  @update:model-value="setFilter({ accountNumber: $event })"
                  label="Account Number"
                  clearable
                  class="filter-input"
                />
              </div>
            </div>

            <q-table
              :rows="filteredTransactions"
              :columns="columns"
              row-key="Account Number"
              :loading="loading"
              hide-bottom
              :rows-per-page-options="[0]"
              :pagination="{ rowsPerPage: 0 }"
              flat
              class="modern-table"
              :grid="$q.screen.lt.md"
            >
              <template v-slot:item="props">
                <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition">
                  <q-card bordered flat class="q-pa-md modern-grid-card">
                    <q-list dense>
                      <q-item v-for="col in props.cols" :key="col.name">
                        <q-item-section>
                          <q-item-label>{{ col.label }}</q-item-label>
                        </q-item-section>
                        <q-item-section side>
                          <q-item-label :class="{ 'text-bold': col.name === 'amount' }">
                            <q-badge
                              v-if="col.name === 'status'"
                              :color="getStatusColor(col.value)"
                              class="q-pa-xs"
                            >
                              {{ col.value }}
                            </q-badge>
                            <span v-else>{{ col.value }}</span>
                          </q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-card>
                </div>
              </template>

              <template v-slot:no-data>
                <div class="full-width row flex-center text-grey q-pa-sm">
                  No transactions found.
                </div>
              </template>

              <template v-slot:body-cell-status="props">
                <q-td :props="props">
                  <q-badge :color="getStatusColor(props.row.Status)" class="q-pa-xs">
                    {{ props.row.Status }}
                  </q-badge>
                </q-td>
              </template>
            </q-table>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>

    <q-dialog v-model="showModal" persistent>
      <q-card style="min-width: 350px; border-radius: 25px">
        <q-card-section>
          <div class="text-h6">Add New Transaction</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form @submit.prevent="submitAndReset" class="q-gutter-md">
            <q-input
              rounded
              outlined
              v-model="newTransaction.date"
              label="Transaction Date"
              hint="YYYY-MM-DD"
              mask="####-##-##"
              :rules="[
                (val) => !!val || 'Date is required',
                (val) =>
                  this.isNotFutureDate(val) ||
                  'You cannot put transactions prior to today or no advance input of transactions',
              ]"
            />
            <q-input
              rounded
              outlined
              mask="####-####-####"
              v-model="newTransaction.accountNumber"
              label="Account Number"
              :rules="[(val) => !!val || 'Account number is required']"
            />
            <q-input
              rounded
              outlined
              v-model="newTransaction.accountHolderName"
              label="Account Holder Name"
              :rules="[(val) => !!val || 'Name is required']"
            />
            <q-input
              rounded
              outlined
              v-model.number="newTransaction.amount"
              label="Amount"
              type="number"
              :rules="[(val) => !!val || 'Amount is required']"
            />
            <div class="row justify-end q-gutter-sm">
              <q-btn label="Cancel" color="negative" flat @click="showModal = false" />
              <q-btn
                label="Add Transaction"
                type="submit"
                class="add-transaction-btn"
                :loading="loading"
              />
            </div>
          </q-form>
          <q-banner v-if="error" inline-actions class="text-white bg-red q-mt-md">
            {{ error }}
          </q-banner>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useTransactionStore } from '../stores/transactions.js'
import { useQuasar } from 'quasar'

export default {
  name: 'IndexPage',
  setup() {
    const $q = useQuasar()
    return { $q }
  },
  data() {
    return {
      showModal: false,
      showWelcome: true,
      newTransaction: {
        date: '',
        accountNumber: '',
        accountHolderName: '',
        amount: null,
      },
      statusOptions: ['Pending', 'Settled', 'Failed'],
      columns: [
        {
          name: 'date',
          label: 'TRANSACTION DATE',
          align: 'left',
          field: 'Transaction Date',
          sortable: true,
          format: (val) => {
            if (val) {
              const date = new Date(val)
              const year = date.getFullYear()
              const month = String(date.getMonth() + 1).padStart(2, '0')
              const day = String(date.getDate()).padStart(2, '0')
              return `${year}-${month}-${day}`
            }
            return ''
          },
        },
        { name: 'accountNumber', label: 'ACCOUNT NUMBER', align: 'left', field: 'Account Number' },
        {
          name: 'accountHolderName',
          label: 'NAME',
          align: 'left',
          field: 'Account Holder Name',
        },
        { name: 'amount', label: 'AMOUNT', align: 'right', field: 'Amount', sortable: true },
        { name: 'status', label: 'STATUS', align: 'left', field: 'Status', sortable: true },
      ],
    }
  },
  computed: {
    ...mapState(useTransactionStore, ['loading', 'error', 'filteredTransactions', 'filter']),
  },
  methods: {
    // Correctly map the store actions here
    ...mapActions(useTransactionStore, ['fetchTransactions', 'addTransaction', 'setFilter']),
    async submitAndReset() {
      // Create the data object to be sent to the store action
      const transactionData = {
        date: this.newTransaction.date,
        accountNumber: this.newTransaction.accountNumber,
        accountHolderName: this.newTransaction.accountHolderName,
        amount: this.newTransaction.amount,
      }

      try {
        // Call the store action to add the transaction
        await this.addTransaction(transactionData)
        // On success, close the modal and reset the form
        this.showModal = false
        this.newTransaction = {
          date: '',
          accountNumber: '',
          accountHolderName: '',
          amount: null,
        }
        this.$q.notify({
          type: 'positive',
          message: 'Transaction added successfully.',
        })
      } catch (err) {
        console.log('Error adding transaction:', err)
        // The store handles the error, but we can notify the user here
        this.$q.notify({
          type: 'negative',
          message: `Failed to add transaction: ${this.error || 'Unknown error'}`,
        })
      }
    },
    getStatusColor(status) {
      switch (status) {
        case 'Pending':
          return 'yellow'
        case 'Settled':
          return 'green'
        case 'Failed':
          return 'red'
        default:
          return 'grey'
      }
    },
  },
  mounted() {
    this.fetchTransactions()
    setTimeout(() => {
      this.showWelcome = false
    }, 2000)
  },
}
</script>

<style scoped>
.modern-bg {
  background: linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.main-card-modern {
  width: 100%;
  max-width: 1500px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  padding: 20px;
}

.text-dark-grey {
  color: #6070ea;
  font-weight: 600;
}

.add-transaction-btn {
  background-color: #6070ea;
  color: #fff;
  border-radius: 20px;
  font-weight: 600;
  padding: 8px 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  text-transform: capitalize;
}
.add-transaction-btn:hover {
  background-color: #8c96e0;
}

.modern-table {
  background-color: #fff;
  border-radius: 15px;
  overflow: hidden;
}
.modern-table thead tr {
  background-color: #f8f8f8;
  color: #888;
  font-weight: 600;
  font-size: 0.9em;
}
.modern-table tbody tr {
  border-bottom: 1px solid #eee;
  color: #555;
}
.modern-table tbody tr:last-child {
  border-bottom: none;
}
.modern-table tbody tr:hover {
  background-color: #f0f0f0;
}
.modern-table td {
  padding: 12px 16px;
  font-size: 0.9em;
  border-color: #eee;
}
.modern-table th {
  padding: 12px 16px;
  border-color: #eee;
}

.filter-select .q-field__control,
.filter-input .q-field__control {
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 0 10px;
  width: 50px;
}
.welcome-screen-modern {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.modern-grid-card {
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}
</style>
