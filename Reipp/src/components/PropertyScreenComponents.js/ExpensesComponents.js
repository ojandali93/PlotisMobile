import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { convertToDollars, convertHOAString } from '../../../utilities'

import EditMortgages from '../ExpensesComponents/EditMortgages'
import MortgageInsuranceComponent from '../ExpensesComponents/MortgageInsuranceComponent'
import HomeInsuranceComponent from '../ExpensesComponents/HomeInsuranceComponent'
import TaxComponent from '../ExpensesComponents/TaxComponent'
import HOAComponent from '../ExpensesComponents/HOAComponent'
import UtilitiesComponent from '../ExpensesComponents/UtilitiesComponent'
import OtherExpensesComponent from '../ExpensesComponents/OtherExpensesComponent'

const ExpensesComponents = (props) => {
  const {
    currentHome,
    monthlyExpenses,
    setMonthlyExpenses,
    setTotalExpWithoutMortgage,
    setMortgagePandI,
    setTotalDownPayment
  } = props

  console.log(currentHome.resoFacts.hoaFee)

  const [mortgage, setMortgage] = useState()
  const [totalLoanAmount, setTotalLoanAmount] = useState('0')
  const [totalDownPaymentPercent, setTotalDownPaymentPercent] = useState(20)
  const [mortgageInsurance, setMortgageInsurance] = useState(totalDownPaymentPercent >= 20 ? 0 : Math.round(totalLoanAmount * 0.005))
  const [homeInsurance, setHomeInsurance] = useState('1475')
  const [propertyTax, setPropertyTax] = useState(Math.round((currentHome.price * 0.0101)/12))
  const [hoa, setHoa] = useState(currentHome.resoFacts.hoaFee == null ? '0' : convertHOAString(currentHome.resoFacts.hoaFee))
  const [utilities, setUtilities] = useState()
  const [additionalExpenses, setAdditionalExpenses] = useState()

  useEffect(() => {
    if(parseInt(totalDownPaymentPercent) < 20){
      setMortgageInsurance(Math.round(totalLoanAmount * 0.005))
    } else {
      setMortgageInsurance('0')
    }
  }, [totalDownPaymentPercent])

  useEffect(() => {
    setMonthlyExpenses(parseInt(mortgage) +
                     (parseInt(mortgageInsurance/12)) +
                     (Math.round(parseInt(homeInsurance)/12)) +
                     parseInt(propertyTax) +
                     parseInt(hoa) +
                     parseInt(utilities) +
                     parseInt(additionalExpenses))
    setTotalExpWithoutMortgage((Math.round(parseInt(homeInsurance)/12)) +
                                parseInt(propertyTax) +
                                parseInt(hoa) +
                                parseInt(utilities) +
                                parseInt(additionalExpenses))
    setMortgagePandI(parseInt(mortgage))
  }, [mortgage])

  useEffect(() => {
    setMonthlyExpenses(parseInt(mortgage) +
                     (parseInt(mortgageInsurance/12)) +
                     (Math.round(parseInt(homeInsurance)/12)) +
                     parseInt(propertyTax) +
                     parseInt(hoa) +
                     parseInt(utilities) +
                     parseInt(additionalExpenses))
    setTotalExpWithoutMortgage((Math.round(parseInt(homeInsurance)/12)) +
                     parseInt(propertyTax) +
                     parseInt(hoa) +
                     parseInt(utilities) +
                     parseInt(additionalExpenses))
    setMortgagePandI(parseInt(mortgage))
  }, [mortgageInsurance])

  useEffect(() => {
    setMonthlyExpenses(parseInt(mortgage) +
                     (parseInt(mortgageInsurance/12)) +
                     (Math.round(parseInt(homeInsurance)/12)) +
                     parseInt(propertyTax) +
                     parseInt(hoa) +
                     parseInt(utilities) +
                     parseInt(additionalExpenses))
    setTotalExpWithoutMortgage((Math.round(parseInt(homeInsurance)/12)) +
                      parseInt(propertyTax) +
                      parseInt(hoa) +
                      parseInt(utilities) +
                      parseInt(additionalExpenses))
    setMortgagePandI(parseInt(mortgage))
  }, [homeInsurance])

  useEffect(() => {
    setMonthlyExpenses(parseInt(mortgage) +
                     (parseInt(mortgageInsurance/12)) +
                     (Math.round(parseInt(homeInsurance)/12)) +
                     parseInt(propertyTax) +
                     parseInt(hoa) +
                     parseInt(utilities) +
                     parseInt(additionalExpenses))
    setTotalExpWithoutMortgage((Math.round(parseInt(homeInsurance)/12)) +
                     parseInt(propertyTax) +
                     parseInt(hoa) +
                     parseInt(utilities) +
                     parseInt(additionalExpenses))
    setMortgagePandI(parseInt(mortgage))
  }, [propertyTax])

  useEffect(() => {
    setMonthlyExpenses(parseInt(mortgage) +
                     (parseInt(mortgageInsurance/12)) +
                     (Math.round(parseInt(homeInsurance)/12)) +
                     parseInt(propertyTax) +
                     parseInt(hoa) +
                     parseInt(utilities) +
                     parseInt(additionalExpenses))
    setTotalExpWithoutMortgage((Math.round(parseInt(homeInsurance)/12)) +
                     parseInt(propertyTax) +
                     parseInt(hoa) +
                     parseInt(utilities) +
                     parseInt(additionalExpenses))
    setMortgagePandI(parseInt(mortgage))
  }, [hoa])

  useEffect(() => {
    setMonthlyExpenses(parseInt(mortgage) +
                     (parseInt(mortgageInsurance/12)) +
                     (Math.round(parseInt(homeInsurance)/12)) +
                     parseInt(propertyTax) +
                     parseInt(hoa) +
                     parseInt(utilities) +
                     parseInt(additionalExpenses))
    setTotalExpWithoutMortgage((Math.round(parseInt(homeInsurance)/12)) +
                     parseInt(propertyTax) +
                     parseInt(hoa) +
                     parseInt(utilities) +
                     parseInt(additionalExpenses))
    setMortgagePandI(parseInt(mortgage))
  }, [utilities])

  useEffect(() => {
    setMonthlyExpenses(parseInt(mortgage) +
                     (parseInt(mortgageInsurance/12)) +
                     (Math.round(parseInt(homeInsurance)/12)) +
                     parseInt(propertyTax) +
                     parseInt(hoa) +
                     parseInt(utilities) +
                     parseInt(additionalExpenses))
    setTotalExpWithoutMortgage((Math.round(parseInt(homeInsurance)/12)) +
                     parseInt(propertyTax) +
                     parseInt(hoa) +
                     parseInt(utilities) +
                     parseInt(additionalExpenses))
    setMortgagePandI(parseInt(mortgage))
  }, [additionalExpenses])

  return (
    <View style={styles.keyDetailsContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.label}>Expenses (Monthly)</Text>
        <Text style={styles.label}>${convertToDollars(monthlyExpenses)}</Text>
      </View>
      <View style={styles.separateContainer}></View>
      <EditMortgages 
        currentHome={currentHome} 
        mortgage={mortgage} 
        setMortgage={setMortgage}
        setTotalLoanAmount={setTotalLoanAmount}
        setTotalDownPaymentPercent={setTotalDownPaymentPercent}
        setTotalDownPayment={setTotalDownPayment}
      />
      <View style={styles.separateContainer}></View>
      <MortgageInsuranceComponent 
        currentHome={currentHome}
        mortgageInsurance={mortgageInsurance}
        setMortgageInsurance={setMortgageInsurance}
      />
      <View style={styles.separateContainer}></View>
      <HomeInsuranceComponent 
        currentHome={currentHome}
        homeInsurance={homeInsurance}
        setHomeInsurance={setHomeInsurance}
      />
      <View style={styles.separateContainer}></View>
      <TaxComponent 
        currentHome={currentHome} 
        setPropertyTax={setPropertyTax}
        propertyTax={propertyTax}
      />
      <View style={styles.separateContainer}></View>
      <HOAComponent 
        currentHome={currentHome} 
        setHoa={setHoa}
        hoa={hoa}
      />
      <View style={styles.separateContainer}></View>
      <UtilitiesComponent 
        currentHome={currentHome}
        setUtilities={setUtilities}
        utilities={utilities}
      />
      <View style={styles.separateContainer}></View>
      <OtherExpensesComponent 
        currentHome={currentHome} 
        setAdditionalExpenses={setAdditionalExpenses}  
        additionalExpenses={additionalExpenses}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  keyDetailsContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    paddingVertical: 24,
    paddingHorizontal: 8,
    justifyContent: 'space-between'
  },
  headerContainer: {
    width: '100%',
    marginBottom: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  label: {
    fontSize: 22,
    fontWeight: '700'
  },
  separateContainer: {
    width: '94%',
    marginLeft: '3%',
    height: 2,
    backgroundColor: 'grey',
    marginVertical: 8
  }
})

export default ExpensesComponents