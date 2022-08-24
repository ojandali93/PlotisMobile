const numberOfColumns = 3

const homeTypeOptions1 = [
  {
    key: 1,
    value: 'Houses',
    image: require('./src/assets/home.png')
  },
  {
    key: 2,
    value: 'Condos',
    image: require('./src/assets/building.png')
  },
  {
    key: 3,
    value: 'Lot/Land',
    image: require('./src/assets/management.png')
  },
  {
    key: 4,
    value: 'Multi-family',
    image: require('./src/assets/multi-family.png')
  },
  {
    key: 5,
    value: 'Manufactured',
    image: require('.//src/assets/tiny-house.png')
  },
  {
    key: 6,
    value: 'Townhomes',
    image: require('.//src/assets/townhouse.png')
  }
]

const sliderOptions = [
  0,50000,100000,150000,200000,250000,300000,350000,400000,450000,500000,
  550000,600000,650000,700000,750000,800000,850000,900000,950000,1000000,
  1500000,2000000,2500000,3000000,3500000,4000000,4500000,5000000,6000000,
  7000000,8000000,9000000,10000000,11000000
]

const sqftSliderOptions = [
  0,500,1000,1500,2000,2500,3000,3500,4000,5000,6000,7000
]

const bedBathAmount = [
  {key:0, value:'Any', amount:0},
  {key:1, value:'1+', amount:1},
  {key:2, value:'2+', amount:2},
  {key:3, value:'3+', amount:3},
  {key:4, value:'4+', amount:4},
  {key:5, value:'5+', amount:5},
  {key:6, value:'6+', amount:6},
]

module.exports = {
  numberOfColumns, 
  homeTypeOptions1, 
  sliderOptions,
  bedBathAmount,
  sqftSliderOptions
}