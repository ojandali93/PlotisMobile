const calculateLoanAmount = (price, downPayment) => {
  let loaAmount = price - downPayment
  return loaAmount
}

const calculateDownPaymentPercent = (price, amountDown) => {
  let downPayment = Math.round((amountDown / price) * 100)
  return downPayment
}

const calculateDownPaymentAmount = (price, percentDown) => {
  let downPayment = price * (percentDown / 100)
  return Math.round(downPayment)
}

const calculateClosingCost = (loanAmount) => {
  let closingCost = loanAmount * .03
  return closingCost.toFixed(2)
}

const calculateMortgagePayment = (loanAmount, ir) => {
  let interestRate = (ir / 100)/12
  let powerRate = Math.pow(1 + interestRate, 360)
  let monthlyPayment = loanAmount * ((interestRate * powerRate) / (powerRate - 1))
  return Math.round(monthlyPayment)
}

module.exports = {
  calculateLoanAmount,
  calculateDownPaymentPercent,
  calculateDownPaymentAmount,
  calculateClosingCost,
  calculateMortgagePayment
} 