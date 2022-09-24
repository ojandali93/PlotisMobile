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

const convertPriceOptions = (value) => {
  const options = {
    0:'0',
    50000:'50K',
    100000:'100K',
    150000:'150K',
    200000:'200K',
    250000:'250K',
    300000:'300K',
    350000:'350K',
    400000:'400K',
    450000:'450K',
    500000:'500K',
    550000:'550K',
    600000:'600K',
    650000:'650K',
    700000:'700K',
    750000:'750K',
    800000:'800K',
    850000:'850K',
    900000:'900K',
    950000:'950K',
    1000000:'1M',
    1500000:'1.5M',
    2000000:'2M',
    2500000:'2.5M',
    3000000:'3M',
    3500000:'3.5M',
    4000000:'4M',
    4500000:'4.5M',
    5000000:'6M',
    6000000:'6.5M',
    7000000:'7M',
    8000000:'8M',
    9000000:'9M',
    10000000:'10M',
    11000000:'11M+',
  }
  return options[value]
}

const convertSqftOptions = (value) => {
  const options = {
    0:'0',
    500:'500',
    1000:'1,000',
    1500:'1,500',
    2000:'2,000',
    2500:'2,500',
    3000:'3,000',
    3500:'3,500',
    4000:'4,000',
    5000:'5,000',
    6000:'6,000',
    7000:'7,000'
  }
  return options[value]
}

module.exports = {
  convertToDollars,
  convertFirstUpper,
  convertPriceOptions,
  convertSqftOptions
}