const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: { type: String, required: true, minlength: 6 },
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
});

const accountSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  balance: { type: Number, required: true },
});

const transactionSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: { type: Number, required: true, min: 1 },
  transactionDate: { type: Date, default: Date.now },
});

const loanSchema = new mongoose.Schema({
  loanId: {
    type: String,
    required: true,
    unique: true,
    default: () => `LOAN-${Date.now()}`,
  },
  lender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  borrower: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  loanAmount: { type: Number, required: true, min: 1 },
  interestRate: { type: Number, required: true, min: 0 }, // interest rate as percentage
  loanDuration: { type: Number, required: true, min: 1 }, // loan duration should be atleast 1 month
  startDate: { type: Date, required: true },
  dueDate: { type: Date, required: true },
  repaymentSchedule: [
    {
      dueDate: { type: Date, required: true },
      amount: { type: Number, required: true },
      status: {
        type: String,
        enum: ["Pending", "Paid", "Overdue"],
        default: "Pending",
      },
    },
  ],
  status: {
    type: String,
    enum: ["Active", "Closed", "Defaulted"],
    default: "Active",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// loan middleware
loanSchema.pre("save", (next) => {
  this.updatedAt = Date.now();
  next();
});

const Loan = mongoose.model("Loan", loanSchema);
const Transaction = mongoose.model("Transaction", transactionSchema);
const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema);

module.exports = { Loan, Transaction, User, Account };
