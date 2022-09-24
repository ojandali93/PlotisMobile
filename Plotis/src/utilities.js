const convertToDollars = (price) => {
  let dollarUSLocale = Intl.NumberFormat('en-US')
  let dollarAmount = dollarUSLocale.format(price)
  return dollarAmount
}

module.exports = {
  convertToDollars
}