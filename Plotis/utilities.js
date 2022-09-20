const convertToDollars = (price) => {
  let dollarUSLocale = Intl.NumberFormat('en-US')
  let dollarAmount = dollarUSLocale.format(price)
  return dollarAmount
}

const convertFirstUpper = (text) => {
  let formattedText
  if(text.includes('_')){
    let textToConvert = text.toLowerCase()
    let reformatedText = textToConvert.replace('_', ' ')
    formattedText = reformatedText.charAt(0).toUpperCase() + reformatedText.slice(1)
  } else {
    formattedText = text.toLowerCase()
  }

  return formattedText
}

module.exports = {
  convertToDollars,
  convertFirstUpper
}